const path = require("path");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const { getPool } = require("./mysql");
const { requireEnv, sanitizeTableName, sanitizeTableNameUnicode } = require("./util");
const { mapReportCscHojeRow } = require("./mappers/report_csc_hoje");

const app = express();
app.disable("x-powered-by");

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const PORT = Number(process.env.PORT || 3001);

function getHistoryTableName(envName, fallbackName) {
  return sanitizeTableName(process.env[envName] || fallbackName);
}

function getStateTableName() {
  return sanitizeTableName(process.env.MYSQL_TABLE_STATE_ACORDOS || "painel_acordos_estado");
}

function toMysqlDateTime(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 19).replace("T", " ");
  return date.toISOString().slice(0, 19).replace("T", " ");
}

function parseFlexibleDateRef(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return raw;
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
    const [d, m, y] = raw.split("/");
    return `${y}-${m}-${d}`;
  }

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function getWeekRangeFromIsoDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;

  const day = date.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const start = new Date(date);
  start.setDate(date.getDate() + diffToMonday);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const toIso = (dt) => dt.toISOString().slice(0, 10);
  return {
    start: toIso(start),
    end: toIso(end)
  };
}

function buildDataWhere(value, where, params) {
  const raw = String(value ?? "");
  if (!raw) return;

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const [y, m, d] = raw.split("-");
    const br = `${d}/${m}/${y}`;
    // Suporta DATA como DATE/DATETIME (DATE(DATA)) ou como texto (CAST(DATA AS CHAR)).
    where.push("(DATE(DATA) = ? OR CAST(DATA AS CHAR) = ? OR CAST(DATA AS CHAR) = ?)");
    params.push(raw, raw, br);
    return;
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
    const [d, m, y] = raw.split("/");
    const iso = `${y}-${m}-${d}`;
    where.push("(DATE(DATA) = ? OR CAST(DATA AS CHAR) = ? OR CAST(DATA AS CHAR) = ?)");
    params.push(iso, iso, raw);
    return;
  }

  where.push("DATA = ?");
  params.push(raw);
}

function addDateFilterForColumns(value, columns, where, params) {
  const raw = String(value ?? "").trim();
  if (!raw || !columns || !columns.length) return;

  let iso = null;
  let br = null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const [y, m, d] = raw.split("-");
    iso = raw;
    br = `${d}/${m}/${y}`;
  } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
    const [d, m, y] = raw.split("/");
    iso = `${y}-${m}-${d}`;
    br = raw;
  }

  const orParts = [];
  columns.forEach((col) => {
    if (iso && br) {
      orParts.push(`(DATE(\`${col}\`) = ? OR CAST(\`${col}\` AS CHAR) = ? OR CAST(\`${col}\` AS CHAR) = ?)`);
      params.push(iso, iso, br);
    } else {
      orParts.push(`\`${col}\` = ?`);
      params.push(raw);
    }
  });

  if (orParts.length) {
    where.push(`(${orParts.join(" OR ")})`);
  }
}

function addPendingPreviousDayFilters(pickCol, where, params) {
  const colSituacao = pickCol(["SITUACAO", "SITUAÇÃO", "SITUACAO_SERVICO"]);
  const colProdutivo = pickCol(["PRODUTIVO", "PRODUTIVOS"]);
  const colUsExec = pickCol(["US_EXEC", "US EXEC", "US_EXECUTADAS"]);
  const colTermino = pickCol(["DATA_TERMINO_REAL", "ENCERRAMENTO", "DATA_TERMINO"]);

  if (colSituacao) {
    where.push(`UPPER(TRIM(CAST(\`${colSituacao}\` AS CHAR))) = ?`);
    params.push("D");
  }

  if (colProdutivo) {
    where.push(`(
      \`${colProdutivo}\` IS NULL
      OR TRIM(CAST(\`${colProdutivo}\` AS CHAR)) = ''
      OR UPPER(TRIM(CAST(\`${colProdutivo}\` AS CHAR))) NOT IN ('T', 'SIM', 'S', '1', 'TRUE')
    )`);
  }

  if (colUsExec) {
    where.push(`(
      \`${colUsExec}\` IS NULL
      OR TRIM(CAST(\`${colUsExec}\` AS CHAR)) = ''
      OR CAST(REPLACE(CAST(\`${colUsExec}\` AS CHAR), ',', '.') AS DECIMAL(15,3)) = 0
    )`);
  }

  if (colTermino) {
    where.push(`(\`${colTermino}\` IS NULL OR TRIM(CAST(\`${colTermino}\` AS CHAR)) = '')`);
  }
}

async function getTableColumns(pool, table) {
  const [rows] = await pool.query(`SHOW COLUMNS FROM \`${table}\``);
  return rows.map((row) => String(row.Field)).filter(Boolean);
}

async function ensureStateTable(pool, table) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`${table}\` (
      context_key VARCHAR(255) NOT NULL,
      data_ref VARCHAR(20) NULL,
      uo VARCHAR(50) NULL,
      tipo_visao VARCHAR(50) NULL,
      supervisor VARCHAR(255) NULL,
      payload_json LONGTEXT NOT NULL,
      updated_at DATETIME NOT NULL,
      PRIMARY KEY (context_key)
    )
  `);
}

async function ensureHistoryAcordosTable(pool, table) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`${table}\` (
      id BIGINT NOT NULL AUTO_INCREMENT,
      data_ref VARCHAR(20) NOT NULL,
      uo VARCHAR(50) NULL,
      tipo_visao VARCHAR(50) NOT NULL,
      supervisor VARCHAR(255) NULL,
      hora_referencia VARCHAR(20) NOT NULL,
      codigo_equipe VARCHAR(50) NOT NULL,
      equipe VARCHAR(255) NULL,
      acao VARCHAR(20) NOT NULL,
      meta_dia_acordo DECIMAL(15,3) NULL,
      meta_acordo DECIMAL(15,3) NULL,
      prod_acordo DECIMAL(15,3) NULL,
      faixa_acordo VARCHAR(20) NULL,
      perc_acordo DECIMAL(10,2) NULL,
      usuario_salvo VARCHAR(255) NULL,
      salvo_em DATETIME NOT NULL,
      PRIMARY KEY (id),
      KEY idx_hist_acordos_contexto (data_ref, tipo_visao, hora_referencia, codigo_equipe),
      KEY idx_hist_acordos_salvo_em (salvo_em)
    )
  `);
}

async function ensureHistoryJustificativasTable(pool, table) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`${table}\` (
      id BIGINT NOT NULL AUTO_INCREMENT,
      data_ref VARCHAR(20) NOT NULL,
      uo VARCHAR(50) NULL,
      tipo_visao VARCHAR(50) NOT NULL,
      supervisor VARCHAR(255) NULL,
      hora_referencia VARCHAR(20) NOT NULL,
      codigo_equipe VARCHAR(50) NOT NULL,
      equipe VARCHAR(255) NULL,
      justificativa LONGTEXT NULL,
      motivo_grupo VARCHAR(255) NULL,
      motivo_grupos LONGTEXT NULL,
      motivo_descricao VARCHAR(255) NULL,
      motivo_descricoes LONGTEXT NULL,
      detalhe LONGTEXT NULL,
      acao VARCHAR(20) NOT NULL,
      usuario_salvo VARCHAR(255) NULL,
      salvo_em DATETIME NOT NULL,
      PRIMARY KEY (id),
      KEY idx_hist_just_contexto (data_ref, tipo_visao, hora_referencia, codigo_equipe),
      KEY idx_hist_just_salvo_em (salvo_em)
    )
  `);
}

app.get("/api/health", async (_req, res) => {
  try {
    const pool = getPool();
    await pool.query("SELECT 1");
    res.json({ ok: true, mysql: true, time: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ ok: false, mysql: false, error: String(error?.message || error) });
  }
});

app.get("/api/status/dados", async (_req, res) => {
  try {
    const pool = getPool();
    const reportTable = sanitizeTableName(requireEnv("MYSQL_TABLE"));
    const controleTable = sanitizeTableNameUnicode(process.env.MYSQL_TABLE_CONTROLE_SERVICO || "controle_servico");
    const codxTable = sanitizeTableName(process.env.MYSQL_TABLE_CODX || "report_csc_cod_x");

    const [[agora]] = await pool.query(`
      SELECT
        DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s') AS now_mysql,
        DATE_FORMAT(NOW(), '%d/%m/%Y %H:%i:%s') AS now_br,
        DATE_FORMAT(CURDATE(), '%d/%m/%Y') AS hoje_br,
        HOUR(NOW()) AS hora_atual,
        @@system_time_zone AS system_tz,
        TIMEDIFF(NOW(), UTC_TIMESTAMP()) AS offset_mysql
    `);

    const [[reportUltimaData] = [{}]] = await pool.query(`
      SELECT DATA, COUNT(*) AS total_linhas, MAX(hora_atualizacao) AS ultima_hora, MAX(id) AS max_id
      FROM \`${reportTable}\`
      GROUP BY DATA
      ORDER BY STR_TO_DATE(DATA, '%d/%m/%Y') DESC, DATA DESC
      LIMIT 1
    `);

    let reportUltimaHora = null;
    if (reportUltimaData?.DATA !== undefined && reportUltimaData?.ultima_hora !== undefined) {
      const [[linhaHora] = [{}]] = await pool.query(`
        SELECT COUNT(*) AS total_linhas, MIN(id) AS min_id, MAX(id) AS max_id
        FROM \`${reportTable}\`
        WHERE DATA = ? AND hora_atualizacao = ?
      `, [reportUltimaData.DATA, reportUltimaData.ultima_hora]);
      reportUltimaHora = linhaHora;
    }

    const [[controle] = [{}]] = await pool.query(`
      SELECT
        COUNT(*) AS total_linhas,
        DATE_FORMAT(MAX(DATA_ATUALIZACAO), '%Y-%m-%d %H:%i:%s') AS ultima_atualizacao,
        DATE_FORMAT(MAX(DATA_ATUALIZACAO), '%d/%m/%Y %H:%i:%s') AS ultima_atualizacao_br,
        TIMESTAMPDIFF(MINUTE, MAX(DATA_ATUALIZACAO), NOW()) AS atraso_minutos,
        DATE_FORMAT(MAX(DATA_DESIGNACAO), '%d/%m/%Y %H:%i:%s') AS ultima_designacao_br,
        DATE_FORMAT(MAX(DATA_ACIONAMENTO), '%d/%m/%Y %H:%i:%s') AS ultimo_acionamento_br,
        DATE_FORMAT(MAX(DATA_TERMINO_REAL), '%d/%m/%Y %H:%i:%s') AS ultimo_encerramento_br
      FROM \`${controleTable}\`
    `);

    const [[codx] = [{}]] = await pool.query(`
      SELECT COUNT(*) AS total_linhas, MAX(id) AS max_id
      FROM \`${codxTable}\`
    `);

    const reportHoraAtual = Number(agora?.hora_atual ?? 0);
    const reportUltimaHoraNum = Number(reportUltimaData?.ultima_hora ?? -1);
    const reportEhHoje = String(reportUltimaData?.DATA || "") === String(agora?.hoje_br || "");
    const reportAtrasoHoras = reportEhHoje && reportUltimaHoraNum >= 0
      ? Math.max(reportHoraAtual - reportUltimaHoraNum, 0)
      : null;
    const reportStatus = !reportEhHoje || reportAtrasoHoras === null || reportAtrasoHoras >= 2
      ? "atrasado"
      : reportAtrasoHoras >= 1
        ? "atencao"
        : "ok";

    const controleAtraso = Number(controle?.atraso_minutos ?? 0);
    const controleStatus = !controle?.ultima_atualizacao
      ? "atrasado"
      : controleAtraso >= 90
        ? "atrasado"
        : controleAtraso >= 60
          ? "atencao"
          : "ok";

    res.json({
      ok: true,
      timezone: {
        label: "Horário de Brasília",
        system: agora?.system_tz || "",
        offset: agora?.offset_mysql || "-03:00:00",
        now: agora?.now_mysql || "",
        now_br: agora?.now_br || ""
      },
      report_csc_hoje: {
        table: reportTable,
        status: reportStatus,
        ultima_data: reportUltimaData?.DATA || "",
        ultima_hora: reportUltimaData?.ultima_hora ?? null,
        atraso_horas: reportAtrasoHoras,
        total_dia: reportUltimaData?.total_linhas ?? 0,
        total_ultima_hora: reportUltimaHora?.total_linhas ?? 0,
        min_id_ultima_hora: reportUltimaHora?.min_id ?? null,
        max_id: reportUltimaData?.max_id ?? null
      },
      controle_servico: {
        table: controleTable,
        status: controleStatus,
        ultima_atualizacao: controle?.ultima_atualizacao || "",
        ultima_atualizacao_br: controle?.ultima_atualizacao_br || "",
        atraso_minutos: controle?.atraso_minutos ?? null,
        total_linhas: controle?.total_linhas ?? 0,
        ultima_designacao_br: controle?.ultima_designacao_br || "",
        ultimo_acionamento_br: controle?.ultimo_acionamento_br || "",
        ultimo_encerramento_br: controle?.ultimo_encerramento_br || ""
      },
      report_csc_cod_x: {
        table: codxTable,
        total_linhas: codx?.total_linhas ?? 0,
        max_id: codx?.max_id ?? null
      }
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.get("/api/columns", async (_req, res) => {
  try {
    const pool = getPool();
    const table = sanitizeTableName(requireEnv("MYSQL_TABLE"));
    const [rows] = await pool.query(`SHOW COLUMNS FROM \`${table}\``);
    res.json({ table, columns: rows });
  } catch (error) {
    res.status(500).json({ error: String(error?.message || error) });
  }
});

app.get("/api/rows", async (req, res) => {
  try {
    const pool = getPool();
    const table = sanitizeTableName(requireEnv("MYSQL_TABLE"));

    const limitRaw = req.query.limit ?? "50";
    const offsetRaw = req.query.offset ?? "0";
    const limit = Math.max(1, Math.min(500, Number(limitRaw)));
    const offset = Math.max(0, Number(offsetRaw));

    if (!Number.isFinite(limit) || !Number.isFinite(offset)) {
      return res.status(400).json({ error: "Parâmetros inválidos: limit/offset." });
    }

    const [rows] = await pool.query(`SELECT * FROM \`${table}\` LIMIT ? OFFSET ?`, [limit, offset]);
    res.json({ table, limit, offset, rows });
  } catch (error) {
    res.status(500).json({ error: String(error?.message || error) });
  }
});

app.get("/api/controle-servico/columns", async (_req, res) => {
  try {
    const pool = getPool();
    const tableRaw = process.env.MYSQL_TABLE_CONTROLE_SERVICO || "controle_servico";
    const table = sanitizeTableNameUnicode(tableRaw);
    const [rows] = await pool.query(`SHOW COLUMNS FROM \`${table}\``);
    res.json({ ok: true, table, columns: rows });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.get("/api/controle-servico/sample", async (req, res) => {
  try {
    const pool = getPool();
    const tableRaw = process.env.MYSQL_TABLE_CONTROLE_SERVICO || "controle_servico";
    const table = sanitizeTableNameUnicode(tableRaw);
    const limitRaw = req.query.limit ?? "5";
    const limit = Math.max(1, Math.min(50, Number(limitRaw)));
    if (!Number.isFinite(limit)) {
      return res.status(400).json({ ok: false, error: "Parametro invalido: limit." });
    }
    const [rows] = await pool.query(`SELECT * FROM \`${table}\` LIMIT ?`, [limit]);
    res.json({ ok: true, table, count: rows.length, rows });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.get("/api/controle-servico", async (req, res) => {
  try {
    const pool = getPool();
    const tableRaw = process.env.MYSQL_TABLE_CONTROLE_SERVICO || "controle_servico";
    const table = sanitizeTableNameUnicode(tableRaw);
    const columns = await getTableColumns(pool, table);
    const colMap = new Map(columns.map((c) => [String(c).toLowerCase(), c]));

    const pickCol = (candidates) => {
      for (const c of candidates) {
        const key = String(c).toLowerCase();
        if (colMap.has(key)) return colMap.get(key);
      }
      return null;
    };

    const where = [];
    const params = [];
    let reportOnlyStartedJourney = false;
    const whereSemUo = [];
    const paramsSemUo = [];

    const data = req.query.data;
    const uo = req.query.uo;
    const codEquipe = req.query.codEquipe;

    const dateCols = [];
    const colDataAtualizacao = pickCol(["DATA_ATUALIZACAO", "DATA ATUALIZACAO", "DATA_ATUALIZAÇÃO", "DATA_ATUALIZACAO_D"]);
    if (!colDataAtualizacao) {
      return res.status(400).json({ ok: false, error: "Coluna DATA_ATUALIZACAO nao encontrada na tabela de controle de servicos." });
    }
    dateCols.push(colDataAtualizacao);

    if (data) {
      addDateFilterForColumns(data, dateCols, where, params);
      addDateFilterForColumns(data, dateCols, whereSemUo, paramsSemUo);
    }

    if (req.query.dataInicio) {
      where.push(`DATE(\`${colDataAtualizacao}\`) >= ?`);
      params.push(String(req.query.dataInicio).slice(0, 10));
      whereSemUo.push(`DATE(\`${colDataAtualizacao}\`) >= ?`);
      paramsSemUo.push(String(req.query.dataInicio).slice(0, 10));
    }

    if (req.query.dataFim) {
      where.push(`DATE(\`${colDataAtualizacao}\`) <= ?`);
      params.push(String(req.query.dataFim).slice(0, 10));
      whereSemUo.push(`DATE(\`${colDataAtualizacao}\`) <= ?`);
      paramsSemUo.push(String(req.query.dataFim).slice(0, 10));
    }

    const colUo = pickCol(["COD_UO", "UO"]);
    const usouUo = Boolean(uo && colUo);
    if (uo && colUo) {
      where.push(`\`${colUo}\` = ?`);
      params.push(String(uo));
    }

    const colEq = pickCol(["COD_EQUIPE_WM", "COD_EQUIPE", "NUM_EQUIPE"]);
    if (codEquipe && colEq) {
      where.push(`\`${colEq}\` = ?`);
      params.push(String(codEquipe));
      whereSemUo.push(`\`${colEq}\` = ?`);
      paramsSemUo.push(String(codEquipe));
    }

    const limitRaw = req.query.limit ?? "20000";
    const limit = Math.max(1, Math.min(50000, Number(limitRaw)));
    if (!Number.isFinite(limit)) {
      return res.status(400).json({ ok: false, error: "Parametro invalido: limit." });
    }

    let sql = `SELECT * FROM \`${table}\``;
    if (where.length) sql += ` WHERE ${where.join(" AND ")}`;
    const orderCol = pickCol(["DATA_ATUALIZACAO", "DATA_ATUALIZACAO_D", "DATA_ACIONAMENTO", "DATA_DESIGNACAO", "DATA_TERMINO_REAL", "DATA_LOCALIZACAO", "DATA", "ID", "id"]);
    if (orderCol) sql += ` ORDER BY \`${orderCol}\` ASC`;
    sql += " LIMIT ?";
    params.push(limit);

    let [rows] = await pool.query(sql, params);

    if (!rows.length && usouUo) {
      let sqlSemUo = `SELECT * FROM \`${table}\``;
      if (whereSemUo.length) sqlSemUo += ` WHERE ${whereSemUo.join(" AND ")}`;
      if (orderCol) sqlSemUo += ` ORDER BY \`${orderCol}\` ASC`;
      sqlSemUo += " LIMIT ?";
      paramsSemUo.push(limit);
      [rows] = await pool.query(sqlSemUo, paramsSemUo);
    }

    res.json({ ok: true, table, count: rows.length, rows });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.get("/api/folha-ponto", async (req, res) => {
  try {
    const pool = getPool();
    const database = sanitizeTableNameUnicode(process.env.MYSQL_DATABASE_FOLHA_PONTO || "equipe_func");
    const table = sanitizeTableNameUnicode(process.env.MYSQL_TABLE_FOLHA_PONTO || "folha_ponto");
    const vinculoTable = sanitizeTableNameUnicode(process.env.MYSQL_TABLE_EQUIPE_FUNCIONARIO || "equipe_funcionario");

    const where = ["fp.DATA IS NOT NULL"];
    const params = [];

    if (req.query.dataInicio) {
      where.push("DATE(fp.DATA) >= ?");
      params.push(String(req.query.dataInicio).slice(0, 10));
    }
    if (req.query.dataFim) {
      where.push("DATE(fp.DATA) <= ?");
      params.push(String(req.query.dataFim).slice(0, 10));
    }
    if (req.query.uo) {
      where.push("ef.COD_UO = ?");
      params.push(String(req.query.uo).replace(/[^\d]/g, ""));
    }

    const limitRaw = req.query.limit ?? "50000";
    const limit = Math.max(1, Math.min(100000, Number(limitRaw)));
    if (!Number.isFinite(limit)) {
      return res.status(400).json({ ok: false, error: "Parametro invalido: limit." });
    }

    params.push(limit);

    const [rows] = await pool.query(`
      SELECT
        fp.*,
        ef.COD_EQUIPE,
        ef.COD_UO,
        ef.NOME_EQUIPE,
        ef.NOME_FUNCIONARIO,
        ef.STATUS AS STATUS_EQUIPE_FUNC
      FROM \`${database}\`.\`${table}\` fp
      LEFT JOIN \`${database}\`.\`${vinculoTable}\` ef
        ON ef.COD_FUNC = fp.COD_FUNC
       AND (ef.DATA_FIM IS NULL OR ef.DATA_FIM >= fp.DATA)
      WHERE ${where.join(" AND ")}
      ORDER BY fp.DATA ASC, ef.COD_UO ASC, ef.COD_EQUIPE ASC, fp.COD_FUNC ASC
      LIMIT ?
    `, params);

    res.json({ ok: true, database, table, count: rows.length, rows });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.get("/api/sdca/equipes", async (req, res) => {
  try {
    const pool = getPool();
    const table = sanitizeTableName(requireEnv("MYSQL_TABLE"));
    const where = ["DATA IS NOT NULL", "TRIM(CAST(COD_EQUIPE AS CHAR)) <> ''"];
    const params = [];

    if (req.query.dataInicio) {
      where.push("STR_TO_DATE(DATA, '%d/%m/%Y') >= ?");
      params.push(String(req.query.dataInicio).slice(0, 10));
    }
    if (req.query.dataFim) {
      where.push("STR_TO_DATE(DATA, '%d/%m/%Y') <= ?");
      params.push(String(req.query.dataFim).slice(0, 10));
    }
    if (req.query.uo) {
      where.push("CAST(COD_UO AS CHAR) = ?");
      params.push(String(req.query.uo).replace(/[^\d]/g, ""));
    }

    if (!req.query.dataInicio && !req.query.dataFim) {
      where.push(`STR_TO_DATE(DATA, '%d/%m/%Y') = (
        SELECT MAX(STR_TO_DATE(DATA, '%d/%m/%Y'))
        FROM \`${table}\`
        WHERE DATA IS NOT NULL
      )`);
    }

    const [rows] = await pool.query(`
      SELECT
        DATA,
        COD_UO,
        COD_EQUIPE,
        COALESCE(NULLIF(NOME_EQUIPE, ''), NULLIF(NOME, ''), COD_EQUIPE) AS NOME_EQUIPE,
        NOME_SUPERVISOR,
        MAX(CAST(REPLACE(CAST(META AS CHAR), ',', '.') AS DECIMAL(15,4))) AS META,
        MAX(CAST(REPLACE(CAST(US_EXEC AS CHAR), ',', '.') AS DECIMAL(15,4))) AS US_EXEC,
        COALESCE(
          MAX(NULLIF(COD_CLASSIFICACAO_DINAMICO, '')),
          MAX(NULLIF(CLASSIFICACAO_EXEC_META, '')),
          MAX(NULLIF(CLASSIFICACAO_PREV_META, ''))
        ) AS FAIXA_DIA,
        MIN(NULLIF(INICIO_JORNADA, '')) AS INICIO_JORNADA,
        MAX(NULLIF(ULTIMO_ATENDIMENTO, '')) AS ULTIMO_ATENDIMENTO
      FROM \`${table}\`
      WHERE ${where.join(" AND ")}
      GROUP BY DATA, COD_UO, COD_EQUIPE, NOME_EQUIPE, NOME, NOME_SUPERVISOR
      ORDER BY NOME_EQUIPE ASC
    `, params);

    res.json({ ok: true, table, count: rows.length, rows });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.get("/api/controle-servico/designados-resumo", async (req, res) => {
  try {
    const pool = getPool();
    const tableRaw = process.env.MYSQL_TABLE_CONTROLE_SERVICO || "controle_servico";
    const table = sanitizeTableNameUnicode(tableRaw);
    const columns = await getTableColumns(pool, table);
    const colMap = new Map(columns.map((c) => [String(c).toLowerCase(), c]));

    const pickCol = (candidates) => {
      for (const c of candidates) {
        const key = String(c).toLowerCase();
        if (colMap.has(key)) return colMap.get(key);
      }
      return null;
    };

    const colDataAtualizacao = pickCol(["DATA_ATUALIZACAO", "DATA ATUALIZACAO", "DATA_ATUALIZAÇÃO"]);
    const colEquipe = pickCol(["COD_EQUIPE_WM", "COD_EQUIPE", "NUM_EQUIPE"]);
    const colUo = pickCol(["COD_UO", "UO"]);

    if (!colDataAtualizacao) {
      return res.status(400).json({ ok: false, error: "Coluna DATA_ATUALIZACAO nao encontrada na tabela de controle de servicos." });
    }
    if (!colEquipe) {
      return res.status(400).json({ ok: false, error: "Coluna de equipe nao encontrada na tabela de controle de servicos." });
    }

    const where = [];
    const params = [];
    const data = req.query.data;
    const uo = req.query.uo;

    if (data) {
      addDateFilterForColumns(data, [colDataAtualizacao], where, params);
    }

    if (uo && colUo) {
      where.push(`\`${colUo}\` = ?`);
      params.push(String(uo));
    }

    let sql = `
      SELECT
        TRIM(CAST(\`${colEquipe}\` AS CHAR)) AS codigo_equipe,
        COUNT(*) AS servicos_designados
      FROM \`${table}\`
    `;
    if (where.length) sql += ` WHERE ${where.join(" AND ")}`;
    sql += `
      GROUP BY TRIM(CAST(\`${colEquipe}\` AS CHAR))
      ORDER BY servicos_designados DESC, codigo_equipe ASC
    `;

    const [rows] = await pool.query(sql, params);
    const mapa = {};
    rows.forEach((row) => {
      const codigo = String(row?.codigo_equipe || "").trim();
      if (!codigo) return;
      mapa[codigo] = Number(row?.servicos_designados || 0);
    });

    res.json({
      ok: true,
      table,
      filtros: {
        data: data ?? null,
        uo: uo ?? null
      },
      count: rows.length,
      rows,
      mapa
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.get("/api/controle-servico/resumo-equipes", async (req, res) => {
  try {
    const pool = getPool();
    const tableRaw = process.env.MYSQL_TABLE_CONTROLE_SERVICO || "controle_servico";
    const table = sanitizeTableNameUnicode(tableRaw);
    const columns = await getTableColumns(pool, table);
    const colMap = new Map(columns.map((c) => [String(c).toLowerCase(), c]));

    const pickCol = (candidates) => {
      for (const c of candidates) {
        const key = String(c).toLowerCase();
        if (colMap.has(key)) return colMap.get(key);
      }
      return null;
    };

    const colDataAtualizacao = pickCol(["DATA_ATUALIZACAO", "DATA ATUALIZACAO", "DATA_ATUALIZAÇÃO"]);
    const colEquipe = pickCol(["COD_EQUIPE_WM", "COD_EQUIPE", "NUM_EQUIPE"]);
    const colUo = pickCol(["COD_UO", "UO"]);
    const colProdutivo = pickCol(["PRODUTIVO", "PRODUTIVOS"]);
    const colDataDesignacao = pickCol(["DATA_DESIGNACAO", "DESIGNACAO", "DATA DESIGNACAO"]);
    const colDataAcionamento = pickCol(["DATA_ACIONAMENTO", "ACIONAMENTO", "DATA ACIONAMENTO"]);
    const colDataLocalizacao = pickCol(["DATA_LOCALIZACAO", "LOCALIZACAO", "DATA LOCALIZACAO"]);
    const colDataTermino = pickCol(["DATA_TERMINO_REAL", "ENCERRAMENTO", "DATA_TERMINO"]);

    if (!colDataAtualizacao) {
      return res.status(400).json({ ok: false, error: "Coluna DATA_ATUALIZACAO nao encontrada na tabela de controle de servicos." });
    }
    if (!colEquipe) {
      return res.status(400).json({ ok: false, error: "Coluna de equipe nao encontrada na tabela de controle de servicos." });
    }

    const where = [];
    const params = [];
    const data = req.query.data;
    const uo = req.query.uo;

    if (data) {
      addDateFilterForColumns(data, [colDataAtualizacao], where, params);
    }

    if (uo && colUo) {
      where.push(`\`${colUo}\` = ?`);
      params.push(String(uo));
    }

    const eqExpr = `TRIM(CAST(\`${colEquipe}\` AS CHAR))`;
    const simExpr = colProdutivo
      ? `UPPER(TRIM(CAST(\`${colProdutivo}\` AS CHAR))) IN ('T', 'SIM', 'S', '1', 'TRUE')`
      : "0 = 1";
    const naoExpr = colProdutivo
      ? `UPPER(TRIM(CAST(\`${colProdutivo}\` AS CHAR))) IN ('F', 'NAO', 'NÃO', 'N', '0', 'FALSE')`
      : "0 = 1";
    const inicioExpr = colDataDesignacao ? `DATE_FORMAT(MIN(\`${colDataDesignacao}\`), '%H:%i')` : "NULL";
    const primeiroExpr = colDataAcionamento ? `DATE_FORMAT(MIN(\`${colDataAcionamento}\`), '%H:%i')` : "NULL";
    const ultimoBaseExpr = colDataTermino
      ? `COALESCE(\`${colDataTermino}\`, ${colDataLocalizacao ? `\`${colDataLocalizacao}\`,` : ""} ${colDataAcionamento ? `\`${colDataAcionamento}\`` : "NULL"})`
      : (colDataLocalizacao
          ? `COALESCE(\`${colDataLocalizacao}\`, ${colDataAcionamento ? `\`${colDataAcionamento}\`` : "NULL"})`
          : (colDataAcionamento ? `\`${colDataAcionamento}\`` : "NULL"));
    const ultimoExpr = `DATE_FORMAT(MAX(${ultimoBaseExpr}), '%H:%i')`;
    const jornadaExpr = colDataAcionamento
      ? `CASE
          WHEN MIN(\`${colDataAcionamento}\`) IS NULL OR MAX(${ultimoBaseExpr}) IS NULL THEN NULL
          ELSE DATE_FORMAT(SEC_TO_TIME(TIMESTAMPDIFF(SECOND, MIN(\`${colDataAcionamento}\`), MAX(${ultimoBaseExpr}))), '%H:%i')
        END`
      : "NULL";

    let sql = `
      SELECT
        ${eqExpr} AS codigo_equipe,
        COUNT(*) AS servicos_designados,
        SUM(CASE WHEN ${simExpr} THEN 1 ELSE 0 END) AS servicos_produtivos,
        SUM(CASE WHEN ${naoExpr} THEN 1 ELSE 0 END) AS servicos_improdutivos,
        SUM(CASE WHEN (${simExpr}) OR (${naoExpr}) THEN 1 ELSE 0 END) AS servicos_realizados,
        ${inicioExpr} AS inicio_jornada,
        ${primeiroExpr} AS primeiro_atendimento,
        ${ultimoExpr} AS ultimo_atendimento,
        ${jornadaExpr} AS jornada_produtiva
      FROM \`${table}\`
    `;
    if (where.length) sql += ` WHERE ${where.join(" AND ")}`;
    sql += `
      GROUP BY ${eqExpr}
      ORDER BY servicos_designados DESC, codigo_equipe ASC
    `;

    const [rows] = await pool.query(sql, params);
    const mapa = {};
    rows.forEach((row) => {
      const codigo = String(row?.codigo_equipe || "").trim();
      if (!codigo) return;
      mapa[codigo] = {
        servicosDesignados: Number(row?.servicos_designados || 0),
        servicosProdutivos: Number(row?.servicos_produtivos || 0),
        servicosImprodutivos: Number(row?.servicos_improdutivos || 0),
        servicosRealizados: Number(row?.servicos_realizados || 0),
        inicioJornada: row?.inicio_jornada || "-",
        primeiroAtend: row?.primeiro_atendimento || "-",
        ultimoAtend: row?.ultimo_atendimento || "-",
        jornadaProd: row?.jornada_produtiva || "-"
      };
    });

    res.json({
      ok: true,
      table,
      filtros: {
        data: data ?? null,
        uo: uo ?? null
      },
      count: rows.length,
      rows,
      mapa
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.post("/api/historico/acordos", async (req, res) => {
  try {
    const pool = getPool();
    const table = getHistoryTableName("MYSQL_TABLE_HIST_ACORDOS", "historico_acordos");
    await ensureHistoryAcordosTable(pool, table);
    const body = req.body || {};

    const payload = [
      String(body.data_ref || "").trim(),
      String(body.uo || "").trim(),
      String(body.tipo_visao || "").trim(),
      String(body.supervisor || "").trim(),
      String(body.hora_referencia || "").trim(),
      String(body.codigo_equipe || "").trim(),
      String(body.equipe || "").trim(),
      String(body.acao || "").trim().toUpperCase(),
      body.meta_dia_acordo ?? null,
      body.meta_acordo ?? null,
      body.prod_acordo ?? null,
      body.faixa_acordo ?? null,
      body.perc_acordo ?? null,
      body.usuario_salvo ? String(body.usuario_salvo).trim() : null,
      toMysqlDateTime(body.salvo_em)
    ];

    if (!payload[0] || !payload[2] || !payload[4] || !payload[5] || !payload[7]) {
      return res.status(400).json({ error: "Campos obrigatorios ausentes para historico de acordos." });
    }

    const [result] = await pool.query(
      `INSERT INTO \`${table}\` (
        data_ref, uo, tipo_visao, supervisor, hora_referencia,
        codigo_equipe, equipe, acao, meta_dia_acordo, meta_acordo,
        prod_acordo, faixa_acordo, perc_acordo, usuario_salvo, salvo_em
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      payload
    );

    res.json({ ok: true, table, id: result.insertId });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.get("/api/historico/acordos", async (req, res) => {
  try {
    const pool = getPool();
    const table = getHistoryTableName("MYSQL_TABLE_HIST_ACORDOS", "historico_acordos");
    await ensureHistoryAcordosTable(pool, table);

    const periodo = String(req.query.periodo || "diario").trim().toLowerCase();
    const dataRef = String(req.query.data || "").trim();
    const mesRef = String(req.query.mes || "").trim();
    const uo = String(req.query.uo || "").trim();
    const supervisor = String(req.query.supervisor || "").trim();
    const tipoVisao = String(req.query.tipo_visao || "").trim();
    const limitRaw = req.query.limit ?? "1000";
    const limit = Math.max(1, Math.min(5000, Number(limitRaw)));

    if (!Number.isFinite(limit)) {
      return res.status(400).json({ ok: false, error: "Parametro invalido: limit." });
    }

    const where = [];
    const params = [];

    if (uo) {
      where.push("uo = ?");
      params.push(uo);
    }

    if (supervisor) {
      where.push("UPPER(TRIM(COALESCE(supervisor, ''))) = ?");
      params.push(supervisor.toUpperCase());
    }

    if (tipoVisao) {
      where.push("tipo_visao = ?");
      params.push(tipoVisao);
    }

    let sql = `SELECT * FROM \`${table}\``;
    if (where.length) sql += ` WHERE ${where.join(" AND ")}`;
    sql += " ORDER BY salvo_em DESC LIMIT ?";
    params.push(limit);

    const [rows] = await pool.query(sql, params);

    const filtradas = rows.filter((row) => {
      const dataNormalizada = parseFlexibleDateRef(row?.data_ref);
      if (!dataNormalizada) return false;

      if (periodo === "mensal") {
        return !!mesRef && dataNormalizada.slice(0, 7) === mesRef;
      }

      if (periodo === "semanal") {
        if (!dataRef) return true;
        const intervalo = getWeekRangeFromIsoDate(dataRef);
        if (!intervalo) return true;
        return dataNormalizada >= intervalo.start && dataNormalizada <= intervalo.end;
      }

      if (!dataRef) return true;
      return dataNormalizada === dataRef;
    }).map((row) => ({
      ...row,
      data_ref_iso: parseFlexibleDateRef(row?.data_ref)
    }));

    res.json({
      ok: true,
      table,
      periodo,
      filtros: {
        data: dataRef || null,
        mes: mesRef || null,
        uo: uo || null,
        supervisor: supervisor || null,
        tipo_visao: tipoVisao || null
      },
      count: filtradas.length,
      rows: filtradas
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.post("/api/historico/justificativas", async (req, res) => {
  try {
    const pool = getPool();
    const table = getHistoryTableName("MYSQL_TABLE_HIST_JUSTIFICATIVAS", "historico_justificativas");
    await ensureHistoryJustificativasTable(pool, table);
    const body = req.body || {};

    const payload = [
      String(body.data_ref || "").trim(),
      String(body.uo || "").trim(),
      String(body.tipo_visao || "").trim(),
      String(body.supervisor || "").trim(),
      String(body.hora_referencia || "").trim(),
      String(body.codigo_equipe || "").trim(),
      String(body.equipe || "").trim(),
      body.justificativa ? String(body.justificativa) : null,
      body.motivo_grupo ? String(body.motivo_grupo) : null,
      Array.isArray(body.motivo_grupos) ? JSON.stringify(body.motivo_grupos) : null,
      body.motivo_descricao ? String(body.motivo_descricao) : null,
      Array.isArray(body.motivo_descricoes) ? JSON.stringify(body.motivo_descricoes) : null,
      body.detalhe ? String(body.detalhe) : null,
      String(body.acao || "SALVAR").trim().toUpperCase(),
      body.usuario_salvo ? String(body.usuario_salvo).trim() : null,
      toMysqlDateTime(body.salvo_em)
    ];

    if (!payload[0] || !payload[2] || !payload[4] || !payload[5] || !payload[13]) {
      return res.status(400).json({ error: "Campos obrigatorios ausentes para historico de justificativas." });
    }

    const [result] = await pool.query(
      `INSERT INTO \`${table}\` (
        data_ref, uo, tipo_visao, supervisor, hora_referencia,
        codigo_equipe, equipe, justificativa, motivo_grupo, motivo_grupos,
        motivo_descricao, motivo_descricoes, detalhe, acao, usuario_salvo, salvo_em
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      payload
    );

    res.json({ ok: true, table, id: result.insertId });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.get("/api/historico/justificativas", async (req, res) => {
  try {
    const pool = getPool();
    const table = getHistoryTableName("MYSQL_TABLE_HIST_JUSTIFICATIVAS", "historico_justificativas");
    await ensureHistoryJustificativasTable(pool, table);

    const periodo = String(req.query.periodo || "diario").trim().toLowerCase();
    const dataRef = String(req.query.data || "").trim();
    const mesRef = String(req.query.mes || "").trim();
    const uo = String(req.query.uo || "").trim();
    const supervisor = String(req.query.supervisor || "").trim();
    const tipoVisao = String(req.query.tipo_visao || "").trim();
    const limitRaw = req.query.limit ?? "1000";
    const limit = Math.max(1, Math.min(5000, Number(limitRaw)));

    if (!Number.isFinite(limit)) {
      return res.status(400).json({ ok: false, error: "Parametro invalido: limit." });
    }

    const where = [];
    const params = [];

    if (uo) {
      where.push("uo = ?");
      params.push(uo);
    }

    if (supervisor) {
      where.push("UPPER(TRIM(COALESCE(supervisor, ''))) LIKE ?");
      params.push(`%${supervisor.toUpperCase()}%`);
    }

    if (tipoVisao) {
      where.push("tipo_visao = ?");
      params.push(tipoVisao);
    }

    let sql = `SELECT * FROM \`${table}\``;
    if (where.length) sql += ` WHERE ${where.join(" AND ")}`;
    sql += " ORDER BY salvo_em DESC LIMIT ?";
    params.push(limit);

    const [rows] = await pool.query(sql, params);

    const filtradas = rows.filter((row) => {
      const dataNormalizada = parseFlexibleDateRef(row?.data_ref);
      if (!dataNormalizada) return false;

      if (periodo === "mensal") {
        return !!mesRef && dataNormalizada.slice(0, 7) === mesRef;
      }

      if (periodo === "semanal") {
        if (!dataRef) return true;
        const intervalo = getWeekRangeFromIsoDate(dataRef);
        if (!intervalo) return true;
        return dataNormalizada >= intervalo.start && dataNormalizada <= intervalo.end;
      }

      if (!dataRef) return true;
      return dataNormalizada === dataRef;
    }).map((row) => ({
      ...row,
      data_ref_iso: parseFlexibleDateRef(row?.data_ref)
    }));

    res.json({
      ok: true,
      table,
      periodo,
      filtros: {
        data: dataRef || null,
        mes: mesRef || null,
        uo: uo || null,
        supervisor: supervisor || null,
        tipo_visao: tipoVisao || null
      },
      count: filtradas.length,
      rows: filtradas
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.get("/api/state/acordos", async (_req, res) => {
  try {
    const pool = getPool();
    const table = getStateTableName();
    await ensureStateTable(pool, table);

    const [rows] = await pool.query(
      `SELECT context_key, payload_json, updated_at FROM \`${table}\` ORDER BY updated_at DESC`
    );

    const base = {};
    rows.forEach((row) => {
      try {
        const payload = JSON.parse(String(row.payload_json || "{}"));
        if (payload && typeof payload === "object" && !Array.isArray(payload)) {
          base[String(row.context_key)] = payload;
        }
      } catch (_) {
        // ignora registros corrompidos para nao derrubar a carga inteira
      }
    });

    res.json({ ok: true, table, base });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.post("/api/state/acordos/item", async (req, res) => {
  try {
    const pool = getPool();
    const table = getStateTableName();
    await ensureStateTable(pool, table);

    const body = req.body || {};
    const contextKey = String(body.context_key || "").trim();
    const payload = body.payload;
    const dataRef = String(body.data_ref || "").trim() || null;
    const uo = String(body.uo || "").trim() || null;
    const tipoVisao = String(body.tipo_visao || "").trim() || null;
    const supervisor = String(body.supervisor || "").trim() || null;

    if (!contextKey) {
      return res.status(400).json({ ok: false, error: "context_key obrigatorio." });
    }

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      await pool.query(`DELETE FROM \`${table}\` WHERE context_key = ?`, [contextKey]);
      return res.json({ ok: true, table, deleted: true, context_key: contextKey });
    }

    await pool.query(
      `INSERT INTO \`${table}\` (
        context_key, data_ref, uo, tipo_visao, supervisor, payload_json, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, NOW())
      ON DUPLICATE KEY UPDATE
        data_ref = VALUES(data_ref),
        uo = VALUES(uo),
        tipo_visao = VALUES(tipo_visao),
        supervisor = VALUES(supervisor),
        payload_json = VALUES(payload_json),
        updated_at = NOW()`,
      [
        contextKey,
        dataRef,
        uo,
        tipoVisao,
        supervisor,
        JSON.stringify(payload)
      ]
    );

    res.json({ ok: true, table, context_key: contextKey });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.post("/api/state/acordos/base", async (req, res) => {
  try {
    const pool = getPool();
    const table = getStateTableName();
    await ensureStateTable(pool, table);

    const body = req.body || {};
    const base = body.base;

    if (!base || typeof base !== "object" || Array.isArray(base)) {
      return res.status(400).json({ ok: false, error: "base invalida." });
    }

    const entries = Object.entries(base);
    const keys = entries.map(([contextKey]) => String(contextKey));

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      if (keys.length) {
        const placeholders = keys.map(() => "?").join(", ");
        await conn.query(`DELETE FROM \`${table}\` WHERE context_key NOT IN (${placeholders})`, keys);
      } else {
        await conn.query(`DELETE FROM \`${table}\``);
      }

      for (const [contextKey, payload] of entries) {
        const registro = payload && typeof payload === "object" && !Array.isArray(payload) ? payload : {};
        await conn.query(
          `INSERT INTO \`${table}\` (
            context_key, data_ref, uo, tipo_visao, supervisor, payload_json, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, NOW())
          ON DUPLICATE KEY UPDATE
            data_ref = VALUES(data_ref),
            uo = VALUES(uo),
            tipo_visao = VALUES(tipo_visao),
            supervisor = VALUES(supervisor),
            payload_json = VALUES(payload_json),
            updated_at = NOW()`,
          [
            String(contextKey),
            String(registro.data || "").trim() || null,
            String(registro.uo || "").trim() || null,
            String(registro.tipoVisao || "").trim() || null,
            String(registro.supervisor || "").trim() || null,
            JSON.stringify(registro)
          ]
        );
      }

      await conn.commit();
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }

    res.json({ ok: true, table, count: entries.length });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.get("/api/report", async (req, res) => {
  try {
    const pool = getPool();
    const table = sanitizeTableName(requireEnv("MYSQL_TABLE"));

    const where = [];
    const params = [];

    // Para `report_csc_hoje`, o painel precisa de linhas com DATA preenchida.
    if (table.toLowerCase() === "report_csc_hoje") {
      where.push("DATA IS NOT NULL");

      const onlyStartedJourney =
        String(req.query.onlyStartedJourney ?? process.env.MYSQL_ONLY_STARTED_JOURNEY ?? "").toLowerCase() === "true" ||
        String(req.query.onlyStartedJourney ?? process.env.MYSQL_ONLY_STARTED_JOURNEY ?? "") === "1";

      // Se ativado, entra na contagem apenas equipes que iniciaram jornada.
      if (onlyStartedJourney) {
        // Além de existir início de jornada, garante que o início aconteceu ATÉ a hora do snapshot.
        // Isso evita equipes de turno noturno (ex.: INICIO_JORNADA 21:03) aparecerem em snapshots 17h.
        where.push("((hora_atualizacao IS NOT NULL) AND ((hora_ini_jornada IS NOT NULL AND hora_ini_jornada <= hora_atualizacao) OR (hora_ini_jornada IS NULL AND INICIO_JORNADA IS NOT NULL AND INICIO_JORNADA <> '' AND CAST(SUBSTRING_INDEX(TRIM(INICIO_JORNADA), ':', 1) AS UNSIGNED) <= hora_atualizacao)))");
      }

      const strictHours =
        String(req.query.strictHours ?? process.env.MYSQL_STRICT_HOURS ?? "").toLowerCase() === "true" ||
        String(req.query.strictHours ?? process.env.MYSQL_STRICT_HOURS ?? "") === "1";

      // Se ativado, só retorna snapshots exatamente nas faixas do painel.
      if (strictHours) {
        where.push("hora_atualizacao IN (9,11,13,15,17)");
      }

    }

    if (req.query.data) {
      buildDataWhere(req.query.data, where, params);
    }
    if (req.query.uo) {
      where.push("COD_UO = ?");
      params.push(String(req.query.uo));
    }

    let sql = "";

    // Para evitar duplicidade no programa, sempre pegar o último snapshot (maior id)
    // por DATA + COD_UO + COD_EQUIPE + hora_atualizacao.
    if (table.toLowerCase() === "report_csc_hoje") {
      const whereSql = where.length ? ` WHERE ${where.join(" AND ")}` : "";
      sql = `
        SELECT r.*
        FROM \`${table}\` r
        JOIN (
          SELECT
            CAST(SUBSTRING_INDEX(
              GROUP_CONCAT(
                id
                ORDER BY
                  CASE
                    WHEN (INICIO_REFEICAO IS NOT NULL AND TRIM(CAST(INICIO_REFEICAO AS CHAR)) <> '')
                      OR (TERMINO_REFEICAO IS NOT NULL AND TRIM(CAST(TERMINO_REFEICAO AS CHAR)) <> '')
                    THEN 1
                    ELSE 0
                  END DESC,
                  id DESC
              ),
              ',',
              1
            ) AS UNSIGNED) AS id
          FROM \`${table}\`
          ${whereSql}
          GROUP BY DATA, COD_UO, COD_EQUIPE, hora_atualizacao
        ) m ON r.id = m.id
        ORDER BY r.id ASC
      `;
    } else {
      sql = `SELECT * FROM \`${table}\``;
      if (where.length) sql += ` WHERE ${where.join(" AND ")}`;
      sql += " ORDER BY id ASC";
    }

    const [rows] = await pool.query(sql, params);

    const mappedRows =
      table.toLowerCase() === "report_csc_hoje"
        ? rows.map(mapReportCscHojeRow)
        : rows;

    res.json({ table, count: mappedRows.length, rows: mappedRows });
  } catch (error) {
    res.status(500).json({ error: String(error?.message || error) });
  }
});

app.get("/api/lote-prod", async (req, res) => {
  try {
    const pool = getPool();
    const database = sanitizeTableNameUnicode(process.env.MYSQL_DATABASE_LOTE_PROD || "producao");
    const view = sanitizeTableNameUnicode(process.env.MYSQL_VIEW_LOTE_PROD || "nivel_1_meta");

    const [rows] = await pool.query(`
      SELECT
        DATA,
        SUM(COALESCE(VALOR_US, 0)) AS VALOR_US,
        SUM(COALESCE(META, 0)) AS META,
        SUM(CASE WHEN ASCII(UPPER(TRIM(CAST(COALESCE(FAIXA_DIA, '') AS CHAR)))) = 68 THEN 1 ELSE 0 END) AS EQUIPES_D
      FROM \`${database}\`.\`${view}\`
      WHERE DATA IS NOT NULL
      GROUP BY DATA
      ORDER BY DATA ASC
    `);

    res.json({ database, view, count: rows.length, rows });
  } catch (error) {
    res.status(500).json({ error: String(error?.message || error) });
  }
});

app.get("/api/lote-prod/equipes-d", async (req, res) => {
  try {
    const pool = getPool();
    const database = sanitizeTableNameUnicode(process.env.MYSQL_DATABASE_LOTE_PROD || "producao");
    const view = sanitizeTableNameUnicode(process.env.MYSQL_VIEW_LOTE_PROD || "nivel_1_meta");

    const [rows] = await pool.query(`
      SELECT
        DATA,
        COD_EQUIPE,
        VALOR_US,
        META,
        VALOR_US_MES,
        META_MES,
        FAIXA_DIA
      FROM \`${database}\`.\`${view}\`
      WHERE DATA IS NOT NULL
        AND ASCII(UPPER(TRIM(CAST(COALESCE(FAIXA_DIA, '') AS CHAR)))) = 68
      ORDER BY DATA ASC, COD_EQUIPE ASC
    `);

    res.json({ database, view, count: rows.length, rows });
  } catch (error) {
    res.status(500).json({ error: String(error?.message || error) });
  }
});

app.get("/api/lote-prod/equipes", async (req, res) => {
  try {
    const pool = getPool();
    const database = sanitizeTableNameUnicode(process.env.MYSQL_DATABASE_LOTE_PROD || "producao");
    const view = sanitizeTableNameUnicode(process.env.MYSQL_VIEW_LOTE_PROD || "nivel_1_meta");
    const where = ["DATA IS NOT NULL"];
    const params = [];

    if (req.query.dataInicio) {
      where.push("DATA >= ?");
      params.push(String(req.query.dataInicio).slice(0, 10));
    }
    if (req.query.dataFim) {
      where.push("DATA <= ?");
      params.push(String(req.query.dataFim).slice(0, 10));
    }

    if (!req.query.dataInicio && !req.query.dataFim) {
      where.push(`DATA >= (
        SELECT DATE_SUB(MAX(DATA), INTERVAL 31 DAY)
        FROM \`${database}\`.\`${view}\`
        WHERE DATA IS NOT NULL
      )`);
    }

    const [rows] = await pool.query(`
      SELECT
        DATA,
        COD_EQUIPE,
        VALOR_US,
        META,
        VALOR_US_MES,
        META_MES,
        FAIXA_DIA
      FROM \`${database}\`.\`${view}\`
      WHERE ${where.join(" AND ")}
      ORDER BY DATA ASC, COD_EQUIPE ASC
    `, params);

    res.json({ database, view, count: rows.length, rows });
  } catch (error) {
    res.status(500).json({ error: String(error?.message || error) });
  }
});

app.get("/api/codx", async (req, res) => {
  try {
    const pool = getPool();

    const table = sanitizeTableName(process.env.MYSQL_TABLE_CODX || "report_csc_cod_x");

    const where = [];
    const params = [];

    if (req.query.data) {
      buildDataWhere(req.query.data, where, params);
    }
    if (req.query.uo) {
      where.push("COD_UO = ?");
      params.push(String(req.query.uo));
    }
    if (req.query.codEquipe) {
      where.push("COD_EQUIPE = ?");
      params.push(String(req.query.codEquipe));
    }

    const limitRaw = req.query.limit ?? "2000";
    const limit = Math.max(1, Math.min(5000, Number(limitRaw)));
    if (!Number.isFinite(limit)) {
      return res.status(400).json({ error: "Parâmetro inválido: limit." });
    }

    let sql = `SELECT * FROM \`${table}\``;
    if (where.length) sql += ` WHERE ${where.join(" AND ")}`;
    sql += " LIMIT ?";
    params.push(limit);

    const [rows] = await pool.query(sql, params);
    res.json({ table, count: rows.length, rows });
  } catch (error) {
    res.status(500).json({ error: String(error?.message || error) });
  }
});

app.get("/api/debug/grouping", async (req, res) => {
  try {
    const pool = getPool();
    const table = sanitizeTableName(requireEnv("MYSQL_TABLE"));

    if (table.toLowerCase() !== "report_csc_hoje") {
      return res.status(400).json({ error: "Debug disponível apenas para MYSQL_TABLE=report_csc_hoje." });
    }

    const where = [];
    const params = [];

    where.push("DATA IS NOT NULL");

    const onlyStartedJourney =
      String(req.query.onlyStartedJourney ?? process.env.MYSQL_ONLY_STARTED_JOURNEY ?? "").toLowerCase() === "true" ||
      String(req.query.onlyStartedJourney ?? process.env.MYSQL_ONLY_STARTED_JOURNEY ?? "") === "1";
    if (onlyStartedJourney) {
      where.push("((INICIO_JORNADA IS NOT NULL AND INICIO_JORNADA <> '') OR (hora_ini_jornada IS NOT NULL))");
    }

    const strictHours =
      String(req.query.strictHours ?? process.env.MYSQL_STRICT_HOURS ?? "").toLowerCase() === "true" ||
      String(req.query.strictHours ?? process.env.MYSQL_STRICT_HOURS ?? "") === "1";
    if (strictHours) {
      where.push("hora_atualizacao IN (9,11,13,15,17)");
    }


    if (req.query.data) {
      buildDataWhere(req.query.data, where, params);
    }
    if (req.query.uo) {
      where.push("COD_UO = ?");
      params.push(String(req.query.uo));
    }

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const [totRows] = await pool.query(
      `SELECT COUNT(*) AS total FROM \`${table}\` ${whereSql}`,
      params
    );

    const [supRows] = await pool.query(
      `
      SELECT
        NULLIF(TRIM(COALESCE(NOME_SUPERVISOR, '')), '') AS supervisor,
        COUNT(*) AS total
      FROM \`${table}\`
      ${whereSql}
      GROUP BY supervisor
      ORDER BY total DESC
      LIMIT 200
      `,
      params
    );

    const [liderRows] = await pool.query(
      `
      SELECT
        NULLIF(TRIM(COALESCE(NOME_LIDER, '')), '') AS lider,
        COUNT(*) AS total
      FROM \`${table}\`
      ${whereSql}
      GROUP BY lider
      ORDER BY total DESC
      LIMIT 200
      `,
      params
    );

    const [ctrlRows] = await pool.query(
      `
      SELECT
        NULLIF(TRIM(COALESCE(NOME_CONTROLADOR, '')), '') AS controlador,
        COUNT(*) AS total
      FROM \`${table}\`
      ${whereSql}
      GROUP BY controlador
      ORDER BY total DESC
      LIMIT 200
      `,
      params
    );

    res.json({
      table,
      filtros: {
        data: req.query.data ?? null,
        uo: req.query.uo ?? null,
        strictHours,
        onlyStartedJourney
      },
      totalRows: Number(totRows?.[0]?.total || 0),
      porSupervisor: supRows,
      porLider: liderRows,
      porControlador: ctrlRows
    });
  } catch (error) {
    res.status(500).json({ error: String(error?.message || error) });
  }
});

app.get("/jornadas", async (req, res) => {
  try {
    const pool = getPool();
    const table = sanitizeTableName(process.env.JORNADAS_TABLE || process.env.MYSQL_TABLE || "report_csc_hoje");
    const dataInicio = parseFlexibleDateRef(req.query.dataInicio);
    const dataFim = parseFlexibleDateRef(req.query.dataFim);

    const reportDateExpr = "STR_TO_DATE(DATA, '%d/%m/%Y')";
    const reportWhere = [];
    const reportParams = [];
    const jornadasDateExpr = "COALESCE(DATA_DIA, DATE(atualizado_em))";
    const jornadasWhere = [];
    const jornadasParams = [];

    if (dataInicio) {
      reportWhere.push(`${reportDateExpr} >= ?`);
      reportParams.push(dataInicio);
      jornadasWhere.push(`${jornadasDateExpr} >= ?`);
      jornadasParams.push(dataInicio);
    }
    if (dataFim) {
      reportWhere.push(`${reportDateExpr} <= ?`);
      reportParams.push(dataFim);
      jornadasWhere.push(`${jornadasDateExpr} <= ?`);
      jornadasParams.push(dataFim);
    }
    if (!dataInicio && !dataFim) {
      reportWhere.push(`${reportDateExpr} = (SELECT MAX(${reportDateExpr}) FROM report_csc_hoje WHERE DATA IS NOT NULL)`);
      jornadasWhere.push(`${jornadasDateExpr} = (SELECT MAX(${jornadasDateExpr}) FROM \`${table}\`)`);
    }

    const sql =
      table === "report_csc_hoje"
        ? `
        SELECT
          COD_UO,
          COALESCE(NULLIF(TRIM(CAST(COD_EQUIPE AS CHAR)), ''), NULLIF(TRIM(CAST(NUM_EQUIPE AS CHAR)), '')) AS COD_EQUIPE,
          NUM_EQUIPE,
          NOME_SUPERVISOR AS SUPERVISOR_EQUIPE,
          NOME_LIDER AS LIDER_CONTROLADOR,
          NOME_CONTROLADOR,
          NOME_EQUIPE,
          COD_CLASSIFICACAO_DINAMICO,
          META,
          US_EXEC AS PRODUCAO,
          EXECUTADOS AS SERVICOS_EXECUTADOS,
          PRODUTIVOS,
          IMPRODUTIVOS,

          DATE_FORMAT(STR_TO_DATE(INICIO_JORNADA, '%d/%m/%Y %H:%i:%s'), '%H:%i') AS INICIO_JORNADA,
          DATE_FORMAT(STR_TO_DATE(PRIMEIRO_ATENDIMENTO, '%d/%m/%Y %H:%i:%s'), '%H:%i') AS PRIMEIRO_ATENDIMENTO,
          DATE_FORMAT(STR_TO_DATE(INICIO_REFEICAO, '%d/%m/%Y %H:%i:%s'), '%H:%i') AS INICIO_REFEICAO,
          DATE_FORMAT(STR_TO_DATE(TERMINO_REFEICAO, '%d/%m/%Y %H:%i:%s'), '%H:%i') AS TERMINO_REFEICAO,
          DATE_FORMAT(STR_TO_DATE(ULTIMO_ATENDIMENTO, '%d/%m/%Y %H:%i:%s'), '%H:%i') AS ULTIMO_ATENDIMENTO,
          DATE_FORMAT(STR_TO_DATE(FIM_JORNADA, '%d/%m/%Y %H:%i:%s'), '%H:%i') AS FIM_JORNADA,

          LPAD(hora_ini_jornada, 2, '0') AS HORA,
          DATE_FORMAT(STR_TO_DATE(DATA, '%d/%m/%Y'), '%Y-%m-%d') AS DATA_DIA,
          DATE_FORMAT(STR_TO_DATE(ULTIMA_ATUALIZACAO_DADOS, '%d/%m/%Y %H:%i:%s'), '%Y-%m-%d %H:%i:%s') AS atualizado_em
        FROM report_csc_hoje
        WHERE ${reportWhere.join(" AND ")}
        ORDER BY
          STR_TO_DATE(DATA, '%d/%m/%Y') DESC,
          STR_TO_DATE(ULTIMA_ATUALIZACAO_DADOS, '%d/%m/%Y %H:%i:%s') DESC,
          NOME_EQUIPE ASC
      `
        : `
        SELECT
          COD_UO,
          TRIM(CAST(COD_EQUIPE AS CHAR)) AS COD_EQUIPE,
          SUPERVISOR_EQUIPE,
          LIDER_CONTROLADOR,
          NOME_CONTROLADOR,
          NOME_EQUIPE,
          COD_CLASSIFICACAO_DINAMICO,
          META,
          US_EXEC AS PRODUCAO,
          EXECUTADOS AS SERVICOS_EXECUTADOS,
          PRODUTIVOS,
          IMPRODUTIVOS,

          DATE_FORMAT(INICIO_JORNADA, '%H:%i') AS INICIO_JORNADA,
          DATE_FORMAT(PRIMEIRO_ATENDIMENTO, '%H:%i') AS PRIMEIRO_ATENDIMENTO,
          DATE_FORMAT(INICIO_REFEICAO, '%H:%i') AS INICIO_REFEICAO,
          DATE_FORMAT(TERMINO_REFEICAO, '%H:%i') AS TERMINO_REFEICAO,
          DATE_FORMAT(ULTIMO_ATENDIMENTO, '%H:%i') AS ULTIMO_ATENDIMENTO,
          DATE_FORMAT(FIM_JORNADA, '%H:%i') AS FIM_JORNADA,

          HORA,
          COALESCE(
            DATE_FORMAT(DATA_DIA, '%Y-%m-%d'),
            DATE_FORMAT(atualizado_em, '%Y-%m-%d')
          ) AS DATA_DIA,

          DATE_FORMAT(atualizado_em, '%Y-%m-%d %H:%i:%s') AS atualizado_em
        FROM \`${table}\`
        WHERE ${jornadasWhere.join(" AND ")}
        ORDER BY
          COALESCE(DATA_DIA, DATE(atualizado_em)) DESC,
          atualizado_em DESC,
          NOME_EQUIPE ASC
      `;

    const [rows] = await pool.query(sql, table === "report_csc_hoje" ? reportParams : jornadasParams);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: String(error?.message || error) });
  }
});

app.use(express.static(path.join(__dirname, ".."), { dotfiles: "ignore" }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server on http://localhost:${PORT}`);
});
