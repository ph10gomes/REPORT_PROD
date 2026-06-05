const path = require("path");
const fs = require("fs/promises");
const { execFile } = require("child_process");
const { randomUUID } = require("crypto");

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
app.use(express.json({ limit: "5mb" }));

const PORT = Number(process.env.PORT || 3001);
const REPORT_COMPACT_COLUMNS = [
  "id",
  "DATA",
  "COD_UO",
  "COD_EQUIPE",
  "NUM_EQUIPE",
  "hora_atualizacao",
  "hora_ini_jornada",
  "INICIO_JORNADA",
  "META",
  "US_EXEC",
  "EXECUTADOS",
  "PRODUTIVOS",
  "COD_CLASSIFICACAO_DINAMICO",
  "CLASSIFICACAO_EXEC_META",
  "CLASSIFICACAO_PREV_META",
  "NOME_EQUIPE",
  "NOME",
  "TIPO_EQUIPE",
  "TIPO",
  "TIPO_VEICULO",
  "MODALIDADE",
  "PERFIL_EQUIPE",
  "NOME_SUPERVISOR",
  "NOME_LIDER",
  "NOME_CONTROLADOR",
  "PRIMEIRO_ATENDIMENTO",
  "ULTIMO_ATENDIMENTO",
  "INICIO_REFEICAO",
  "TERMINO_REFEICAO",
  "FIM_JORNADA",
  "OBS"
];

const REPORT_TABELA_GERAL_COLUMNS = [
  "id",
  "DATA",
  "COD_UO",
  "COD_EQUIPE",
  "NUM_EQUIPE",
  "hora_atualizacao",
  "META",
  "US_EXEC",
  "EXECUTADOS",
  "PRODUTIVOS",
  "COD_CLASSIFICACAO_DINAMICO",
  "CLASSIFICACAO_EXEC_META",
  "CLASSIFICACAO_PREV_META",
  "NOME_EQUIPE",
  "NOME",
  "TIPO_EQUIPE",
  "TIPO",
  "TIPO_VEICULO",
  "MODALIDADE",
  "PERFIL_EQUIPE",
  "NOME_SUPERVISOR",
  "NOME_LIDER",
  "NOME_CONTROLADOR"
];

function getHistoryTableName(envName, fallbackName) {
  return sanitizeTableName(process.env[envName] || fallbackName);
}

function getStateTableName() {
  return sanitizeTableName(process.env.MYSQL_TABLE_STATE_ACORDOS || "painel_acordos_estado");
}

function getRc07FlagsDbName() {
  return sanitizeTableName(process.env.MYSQL_RC07_FLAGS_DATABASE || "aompanhamento_impedimento");
}

function getRc07FlagsTableName() {
  return sanitizeTableName(process.env.MYSQL_RC07_FLAGS_TABLE || "rc07_equipes_flegadas");
}

function buildRc07ContextKey(dataRef, uo, supervisor) {
  return [String(dataRef || ""), String(uo || ""), String(supervisor || "")].join("|");
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
  const start = new Date(date);
  start.setDate(date.getDate() - day);
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

function buildDataRangeWhere(startValue, endValue, where, params) {
  const start = parseFlexibleDateRef(startValue);
  const end = parseFlexibleDateRef(endValue);
  if (!start && !end) return;

  const min = start && end ? (start <= end ? start : end) : (start || end);
  const max = start && end ? (start <= end ? end : start) : (start || end);
  const startDate = new Date(`${min}T00:00:00`);
  const endDate = new Date(`${max}T00:00:00`);
  const diffDays = Math.round((endDate - startDate) / 86400000);

  if (Number.isFinite(diffDays) && diffDays >= 0 && diffDays <= 62) {
    const isoDates = [];
    const brDates = [];
    const cursor = new Date(startDate);
    while (cursor <= endDate) {
      const iso = [
        cursor.getFullYear(),
        String(cursor.getMonth() + 1).padStart(2, "0"),
        String(cursor.getDate()).padStart(2, "0")
      ].join("-");
      isoDates.push(iso);
      brDates.push(`${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}`);
      cursor.setDate(cursor.getDate() + 1);
    }
    const placeholdersIso = isoDates.map(() => "?").join(",");
    const placeholdersBr = brDates.map(() => "?").join(",");
    where.push(`(
      DATA BETWEEN ? AND ?
      OR CAST(DATA AS CHAR) IN (${placeholdersIso})
      OR CAST(DATA AS CHAR) IN (${placeholdersBr})
    )`);
    params.push(min, max, ...isoDates, ...brDates);
    return;
  }

  where.push(`(
    DATE(DATA) BETWEEN ? AND ?
    OR STR_TO_DATE(CAST(DATA AS CHAR), '%d/%m/%Y') BETWEEN ? AND ?
    OR (
      CAST(DATA AS CHAR) REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}'
      AND LEFT(CAST(DATA AS CHAR), 10) BETWEEN ? AND ?
    )
  )`);
  params.push(min, max, min, max, min, max);
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

async function ensureRc07FlagsTable(pool) {
  const database = getRc07FlagsDbName();
  const table = getRc07FlagsTableName();

  await pool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`${database}\`.\`${table}\` (
      id BIGINT NOT NULL AUTO_INCREMENT,
      context_key VARCHAR(255) NOT NULL,
      data_ref VARCHAR(20) NOT NULL,
      uo VARCHAR(50) NULL,
      supervisor VARCHAR(255) NULL,
      hora_referencia VARCHAR(20) NULL,
      codigo_equipe VARCHAR(50) NOT NULL,
      frota VARCHAR(50) NULL,
      equipe VARCHAR(255) NULL,
      meta_dia DECIMAL(15,3) NULL,
      prod_dia DECIMAL(15,3) NULL,
      faixa_dia VARCHAR(20) NULL,
      perc_prod DECIMAL(10,2) NULL,
      ativo TINYINT(1) NOT NULL DEFAULT 1,
      criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uk_rc07_contexto_equipe (context_key, codigo_equipe),
      KEY idx_rc07_contexto (data_ref, uo, supervisor),
      KEY idx_rc07_ativo (ativo, atualizado_em)
    )
  `);

  return { database, table };
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

    const data = req.query.data;
    const uo = req.query.uo;
    const codEquipe = req.query.codEquipe;
    const codAtiv = req.query.codAtiv;

    const dateCols = [];
    const colDataAtualizacao = pickCol(["DATA_ATUALIZACAO", "DATA ATUALIZACAO", "DATA_ATUALIZAÇÃO", "DATA_ATUALIZACAO_D"]);
    if (!colDataAtualizacao) {
      return res.status(400).json({ ok: false, error: "Coluna DATA_ATUALIZACAO nao encontrada na tabela de controle de servicos." });
    }
    const colDataDesignacao = pickCol(["DATA_DESIGNACAO", "DESIGNACAO", "DATA DESIGNACAO"]);
    const colDataTermino = pickCol(["DATA_TERMINO_REAL", "ENCERRAMENTO", "DATA_TERMINO"]);
    const dataRef = String(req.query.dataRef || "").trim().toLowerCase();
    const colDataFiltro = dataRef === "designacao" && colDataDesignacao
      ? colDataDesignacao
      : (dataRef === "termino" || dataRef === "data_termino" || dataRef === "data_termino_real") && colDataTermino
        ? colDataTermino
        : colDataAtualizacao;
    dateCols.push(colDataFiltro);

    if (data) {
      addDateFilterForColumns(data, dateCols, where, params);
    }

    if (req.query.dataInicio) {
      where.push(`DATE(\`${colDataFiltro}\`) >= ?`);
      params.push(String(req.query.dataInicio).slice(0, 10));
    }

    if (req.query.dataFim) {
      where.push(`DATE(\`${colDataFiltro}\`) <= ?`);
      params.push(String(req.query.dataFim).slice(0, 10));
    }

    const colUo = pickCol(["COD_UO", "UO"]);
    if (uo && colUo) {
      where.push(`\`${colUo}\` = ?`);
      params.push(String(uo));
    }

    const colEq = pickCol(["COD_EQUIPE_WM", "COD_EQUIPE", "NUM_EQUIPE"]);
    if (codEquipe && colEq) {
      where.push(`\`${colEq}\` = ?`);
      params.push(String(codEquipe));
    }

    const colAtivCandidates = ["COD_ATIV", "COD ATIV", "CODATIV", "COD_ATIVIDADE", "CODIGO_ATIVIDADE", "TIPO_SERVICO"];
    const colsAtiv = colAtivCandidates.map((name) => pickCol([name])).filter(Boolean);
    if (codAtiv && colsAtiv.length) {
      where.push(`(${colsAtiv.map((col) => `UPPER(TRIM(CAST(\`${col}\` AS CHAR))) = UPPER(TRIM(?))`).join(" OR ")})`);
      params.push(...colsAtiv.map(() => String(codAtiv)));
    }

    const limitRaw = req.query.limit ?? "20000";
    const limit = Math.max(1, Math.min(200000, Number(limitRaw)));
    if (!Number.isFinite(limit)) {
      return res.status(400).json({ ok: false, error: "Parametro invalido: limit." });
    }

    let sql = `SELECT * FROM \`${table}\``;
    if (where.length) sql += ` WHERE ${where.join(" AND ")}`;
    const orderCol = colDataFiltro || pickCol(["DATA_ATUALIZACAO", "DATA_ATUALIZACAO_D", "DATA_ACIONAMENTO", "DATA_DESIGNACAO", "DATA_TERMINO_REAL", "DATA_LOCALIZACAO", "DATA", "ID", "id"]);
    if (orderCol) sql += ` ORDER BY \`${orderCol}\` ASC`;
    sql += " LIMIT ?";
    params.push(limit);

    let [rows] = await pool.query(sql, params);

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

app.get("/api/rc07/flags", async (req, res) => {
  try {
    const pool = getPool();
    const { database, table } = await ensureRc07FlagsTable(pool);

    const dataRef = String(req.query.data_ref || req.query.data || "").trim();
    const uo = String(req.query.uo || "").trim();
    const supervisor = String(req.query.supervisor || "").trim();
    const contextKey = buildRc07ContextKey(dataRef, uo, supervisor);

    if (!dataRef) {
      return res.status(400).json({ ok: false, error: "data_ref obrigatoria." });
    }

    const [rows] = await pool.query(
      `SELECT
        codigo_equipe, frota, equipe, hora_referencia, meta_dia, prod_dia, faixa_dia, perc_prod, atualizado_em
       FROM \`${database}\`.\`${table}\`
       WHERE context_key = ? AND ativo = 1
       ORDER BY equipe, codigo_equipe`,
      [contextKey]
    );

    const marcados = {};
    rows.forEach((row) => {
      const codigo = String(row.codigo_equipe || "").trim();
      if (codigo) marcados[codigo] = true;
    });

    res.json({ ok: true, database, table, context_key: contextKey, marcados, rows });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.post("/api/rc07/flags/item", async (req, res) => {
  try {
    const pool = getPool();
    const { database, table } = await ensureRc07FlagsTable(pool);
    const body = req.body || {};

    const dataRef = String(body.data_ref || body.data || "").trim();
    const uo = String(body.uo || "").trim();
    const supervisor = String(body.supervisor || "").trim();
    const horaReferencia = String(body.hora_referencia || body.hora || "").trim() || null;
    const codigo = String(body.codigo_equipe || body.codigo || "").trim();
    const checked = Boolean(body.checked);
    const contextKey = buildRc07ContextKey(dataRef, uo, supervisor);

    if (!dataRef) {
      return res.status(400).json({ ok: false, error: "data_ref obrigatoria." });
    }
    if (!codigo) {
      return res.status(400).json({ ok: false, error: "codigo_equipe obrigatorio." });
    }

    if (!checked) {
      await pool.query(
        `DELETE FROM \`${database}\`.\`${table}\` WHERE context_key = ? AND codigo_equipe = ?`,
        [contextKey, codigo]
      );
      return res.json({ ok: true, database, table, context_key: contextKey, codigo_equipe: codigo, checked: false, deleted: true });
    }

    await pool.query(
      `INSERT INTO \`${database}\`.\`${table}\` (
        context_key, data_ref, uo, supervisor, hora_referencia, codigo_equipe,
        frota, equipe, meta_dia, prod_dia, faixa_dia, perc_prod, ativo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        data_ref = VALUES(data_ref),
        uo = VALUES(uo),
        supervisor = VALUES(supervisor),
        hora_referencia = VALUES(hora_referencia),
        frota = VALUES(frota),
        equipe = VALUES(equipe),
        meta_dia = VALUES(meta_dia),
        prod_dia = VALUES(prod_dia),
        faixa_dia = VALUES(faixa_dia),
        perc_prod = VALUES(perc_prod),
        ativo = VALUES(ativo),
        atualizado_em = CURRENT_TIMESTAMP`,
      [
        contextKey,
        dataRef,
        uo || null,
        supervisor || null,
        horaReferencia,
        codigo,
        String(body.frota || "").trim() || null,
        String(body.equipe || "").trim() || null,
        body.meta_dia === null || body.meta_dia === undefined || body.meta_dia === "" ? null : Number(body.meta_dia),
        body.prod_dia === null || body.prod_dia === undefined || body.prod_dia === "" ? null : Number(body.prod_dia),
        String(body.faixa_dia || "").trim() || null,
        body.perc_prod === null || body.perc_prod === undefined || body.perc_prod === "" ? null : Number(body.perc_prod),
        checked ? 1 : 0
      ]
    );

    res.json({ ok: true, database, table, context_key: contextKey, codigo_equipe: codigo, checked });
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
    } else if (req.query.dataStart || req.query.dataEnd) {
      buildDataRangeWhere(req.query.dataStart, req.query.dataEnd, where, params);
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
      const compact = String(req.query.compact || "") === "1" || String(req.query.compact || "").toLowerCase() === "true";
      const view = String(req.query.view || "").trim();
      const compactColumnSource = view === "tabelaGeralPeriodo"
        ? REPORT_TABELA_GERAL_COLUMNS
        : REPORT_COMPACT_COLUMNS;
      const availableColumns = compact ? new Set(await getTableColumns(pool, table)) : null;
      const compactColumns = compact
        ? compactColumnSource.filter((col) => availableColumns.has(col))
        : [];
      const selectCols = compact
        ? compactColumns.map((col) => `r.\`${col}\``).join(",\n          ")
        : "r.*";
      sql = `
        SELECT ${selectCols}
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
    const reportTable = sanitizeTableName(requireEnv("MYSQL_TABLE"));

    const [rows] = await pool.query(`
      SELECT
        lp.DATA,
        lp.COD_EQUIPE,
        report.NOME_EQUIPE,
        report.NOME_SUPERVISOR,
        lp.VALOR_US,
        lp.META,
        lp.VALOR_US_MES,
        lp.META_MES,
        lp.FAIXA_DIA
      FROM \`${database}\`.\`${view}\` lp
      LEFT JOIN (
        SELECT
          TRIM(CAST(COD_EQUIPE AS CHAR)) AS COD_EQUIPE,
          SUBSTRING_INDEX(
            GROUP_CONCAT(NULLIF(TRIM(CAST(NOME_EQUIPE AS CHAR)), '') ORDER BY CASE WHEN DATA IS NOT NULL THEN 1 ELSE 0 END DESC, STR_TO_DATE(DATA, '%d/%m/%Y') DESC, id DESC SEPARATOR '\u001F'),
            '\u001F',
            1
          ) AS NOME_EQUIPE,
          SUBSTRING_INDEX(
            GROUP_CONCAT(NULLIF(TRIM(CAST(NOME_SUPERVISOR AS CHAR)), '') ORDER BY CASE WHEN DATA IS NOT NULL THEN 1 ELSE 0 END DESC, STR_TO_DATE(DATA, '%d/%m/%Y') DESC, id DESC SEPARATOR '\u001F'),
            '\u001F',
            1
          ) AS NOME_SUPERVISOR
        FROM \`${reportTable}\`
        WHERE COD_EQUIPE IS NOT NULL AND TRIM(CAST(COD_EQUIPE AS CHAR)) <> ''
        GROUP BY TRIM(CAST(COD_EQUIPE AS CHAR))
      ) report ON report.COD_EQUIPE = TRIM(CAST(lp.COD_EQUIPE AS CHAR))
      WHERE lp.DATA IS NOT NULL
        AND ASCII(UPPER(TRIM(CAST(COALESCE(lp.FAIXA_DIA, '') AS CHAR)))) = 68
      ORDER BY lp.DATA ASC, lp.COD_EQUIPE ASC
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
    const reportTable = sanitizeTableName(requireEnv("MYSQL_TABLE"));
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
        lp.DATA,
        lp.COD_EQUIPE,
        report.NOME_EQUIPE,
        report.NOME_SUPERVISOR,
        lp.VALOR_US,
        lp.META,
        lp.VALOR_US_MES,
        lp.META_MES,
        lp.FAIXA_DIA
      FROM \`${database}\`.\`${view}\` lp
      LEFT JOIN (
        SELECT
          TRIM(CAST(COD_EQUIPE AS CHAR)) AS COD_EQUIPE,
          SUBSTRING_INDEX(
            GROUP_CONCAT(NULLIF(TRIM(CAST(NOME_EQUIPE AS CHAR)), '') ORDER BY CASE WHEN DATA IS NOT NULL THEN 1 ELSE 0 END DESC, STR_TO_DATE(DATA, '%d/%m/%Y') DESC, id DESC SEPARATOR '\u001F'),
            '\u001F',
            1
          ) AS NOME_EQUIPE,
          SUBSTRING_INDEX(
            GROUP_CONCAT(NULLIF(TRIM(CAST(NOME_SUPERVISOR AS CHAR)), '') ORDER BY CASE WHEN DATA IS NOT NULL THEN 1 ELSE 0 END DESC, STR_TO_DATE(DATA, '%d/%m/%Y') DESC, id DESC SEPARATOR '\u001F'),
            '\u001F',
            1
          ) AS NOME_SUPERVISOR
        FROM \`${reportTable}\`
        WHERE COD_EQUIPE IS NOT NULL AND TRIM(CAST(COD_EQUIPE AS CHAR)) <> ''
        GROUP BY TRIM(CAST(COD_EQUIPE AS CHAR))
      ) report ON report.COD_EQUIPE = TRIM(CAST(lp.COD_EQUIPE AS CHAR))
      WHERE ${where.map((part) => `lp.${part}`).join(" AND ")}
      ORDER BY lp.DATA ASC, lp.COD_EQUIPE ASC
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
          CLASSIFICACAO_EXEC_META,
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
          CLASSIFICACAO_EXEC_META,
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

function analiticoNumber(value) {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return 0;
    const normalized = trimmed.includes(",")
      ? trimmed.replace(/\./g, "").replace(",", ".")
      : trimmed;
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function analiticoTimeToMinutes(value) {
  const match = String(value || "").match(/(\d{1,2}):(\d{2})/);
  if (!match) return Number.NaN;
  return Number(match[1]) * 60 + Number(match[2]);
}

function analiticoMinutesToTime(value) {
  if (!Number.isFinite(value)) return "--:--";
  const total = Math.max(0, Math.round(value));
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function analiticoAverage(values) {
  const list = values.filter(Number.isFinite);
  return list.length ? list.reduce((acc, value) => acc + value, 0) / list.length : Number.NaN;
}

function analiticoFlagProdutivo(row) {
  const value = String(row.PRODUTIVO || "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
  if (["SIM", "S", "T", "1", "TRUE", "PRODUTIVO"].includes(value)) return "SIM";
  if (["NAO", "N", "F", "0", "FALSE", "IMPRODUTIVO", "IMPEDIMENTO"].includes(value)) return "NAO";
  return "";
}

function analiticoTipoEquipe(row = {}) {
  const text = `${row.TIPO_EQUIPE || ""} ${row.NOME_EQUIPE || row.NOME || ""}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
  if (text.includes("MOTO") || text.includes("MTVP")) return "MOTO";
  return "MULTI";
}

function analiticoClassificarFaixa(percentual) {
  const value = Number(percentual);
  if (!Number.isFinite(value)) return "-";
  if (value >= 95) return "AA";
  if (value >= 85) return "A";
  if (value >= 75) return "B";
  if (value >= 65) return "C";
  return "D";
}

function analiticoEquipeD(percentual) {
  const value = Number(percentual);
  return Number.isFinite(value) && value <= 75;
}

function analiticoProdutividadeMes(row = {}) {
  const metaMes = analiticoNumber(row.META_MES);
  const valorMes = analiticoNumber(row.VALOR_US_MES);
  return metaMes > 0 ? (valorMes / metaMes) * 100 : 0;
}

function analiticoFaixaPeso(faixa) {
  const value = String(faixa || "").trim().toUpperCase();
  if (value === "AA") return 5;
  if (value === "A") return 4;
  if (value === "B") return 3;
  if (value === "C") return 2;
  if (value === "D") return 1;
  return null;
}

function analiticoFaixaPorPeso(peso) {
  if (!Number.isFinite(peso)) return "-";
  if (peso >= 4.5) return "AA";
  if (peso >= 3.5) return "A";
  if (peso >= 2.5) return "B";
  if (peso >= 1.5) return "C";
  return "D";
}

function analiticoDateParams(req) {
  const dataInicio = parseFlexibleDateRef(req.query.dataInicio) || "2026-04-01";
  const dataFim = parseFlexibleDateRef(req.query.dataFim) || "2026-04-30";
  return { dataInicio, dataFim };
}

function analiticoAddMonths(date, months) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1));
}

function analiticoMonthKey(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 7);
  }
  const text = String(value || "");
  const br = text.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  if (br) return `${br[3]}-${br[2]}`;
  return text.slice(0, 7);
}

function analiticoMonthLabel(monthKey) {
  const [, year = "", month = ""] = String(monthKey || "").match(/^(\d{4})-(\d{2})$/) || [];
  const labels = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const index = Number(month) - 1;
  return labels[index] && year ? `${labels[index]}/${year.slice(2)}` : String(monthKey || "");
}

function edgeExecutablePath() {
  const candidates = [
    process.env.EDGE_EXECUTABLE,
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
  ].filter(Boolean);
  return candidates[0];
}

function runFile(command, args) {
  return new Promise((resolve, reject) => {
    execFile(command, args, { windowsHide: true }, (error, stdout, stderr) => {
      if (error) {
        error.message = `${error.message}${stderr ? `\n${stderr}` : ""}`;
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

function sanitizeDownloadName(value) {
  return String(value || "painel-analitico.png")
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, "-")
    .slice(0, 120);
}

app.get("/api/painel-analitico/supervisores", async (req, res) => {
  try {
    const pool = getPool();
    const { dataInicio, dataFim } = analiticoDateParams(req);
    const [rows] = await pool.query(`
      SELECT TRIM(NOME_SUPERVISOR) AS supervisor, COUNT(DISTINCT COD_EQUIPE) AS equipes
      FROM report_csc_hoje
      WHERE STR_TO_DATE(DATA, '%d/%m/%Y') >= ?
        AND STR_TO_DATE(DATA, '%d/%m/%Y') <= ?
        AND NULLIF(TRIM(NOME_SUPERVISOR), '') IS NOT NULL
      GROUP BY TRIM(NOME_SUPERVISOR)
      ORDER BY supervisor
    `, [dataInicio, dataFim]);
    res.json({ ok: true, dataInicio, dataFim, rows });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.get("/api/painel-analitico", async (req, res) => {
  try {
    const supervisor = String(req.query.supervisor || "").trim();
    if (!supervisor) return res.status(400).json({ ok: false, error: "Informe o parametro supervisor." });

    const pool = getPool();
    const { dataInicio, dataFim } = analiticoDateParams(req);
    const reportWhere = `
      STR_TO_DATE(DATA, '%d/%m/%Y') >= ?
      AND STR_TO_DATE(DATA, '%d/%m/%Y') <= ?
      AND UPPER(TRIM(NOME_SUPERVISOR)) = UPPER(TRIM(?))
    `;

    const [reportRows] = await pool.query(`
      SELECT r.*
      FROM report_csc_hoje r
      JOIN (
        SELECT MAX(id) AS id
        FROM report_csc_hoje
        WHERE ${reportWhere}
        GROUP BY DATA, COD_EQUIPE
      ) latest ON latest.id = r.id
      ORDER BY STR_TO_DATE(r.DATA, '%d/%m/%Y'), r.NOME_EQUIPE
    `, [dataInicio, dataFim, supervisor]);

    const codigos = [...new Set(reportRows.map((row) => String(row.COD_EQUIPE || "").trim()).filter(Boolean))];
    const databaseLote = sanitizeTableNameUnicode(process.env.MYSQL_DATABASE_LOTE_PROD || "producao");
    const viewLote = sanitizeTableNameUnicode(process.env.MYSQL_VIEW_LOTE_PROD || "nivel_1_meta");
    let loteRows = [];
    let controleRows = [];
    if (codigos.length) {
      const placeholders = codigos.map(() => "?").join(",");
      const [rows] = await pool.query(`
        SELECT *
        FROM controle_servico
        WHERE COD_EQUIPE_WM IN (${placeholders})
          AND DATE(DATA_DESIGNACAO) >= ?
          AND DATE(DATA_DESIGNACAO) <= ?
      `, [...codigos, dataInicio, dataFim]);
      controleRows = rows;

      const [rowsLote] = await pool.query(`
        SELECT
          DATA,
          TRIM(CAST(COD_EQUIPE AS CHAR)) AS COD_EQUIPE,
          VALOR_US,
          VALOR_US_MES,
          META_MES,
          META,
          FAIXA_DIA,
          FAIXA_MES
        FROM \`${databaseLote}\`.\`${viewLote}\`
        WHERE DATA IS NOT NULL
          AND DATA >= ?
          AND DATA <= ?
          AND TRIM(CAST(COD_EQUIPE AS CHAR)) IN (${placeholders})
      `, [dataInicio, dataFim, ...codigos]);
      loteRows = rowsLote;
    }

    const reportByTeam = new Map();
    reportRows.forEach((row) => {
      const codigo = String(row.COD_EQUIPE || "").trim();
      if (!reportByTeam.has(codigo)) reportByTeam.set(codigo, []);
      reportByTeam.get(codigo).push(row);
    });

    const servicesByTeam = new Map();
    controleRows.forEach((row) => {
      const codigo = String(row.COD_EQUIPE_WM || "").trim();
      if (!servicesByTeam.has(codigo)) servicesByTeam.set(codigo, []);
      servicesByTeam.get(codigo).push(row);
    });

    const tipoPorCodigo = new Map();
    reportRows.forEach((row) => {
      const codigo = String(row.COD_EQUIPE || "").trim();
      if (codigo && !tipoPorCodigo.has(codigo)) tipoPorCodigo.set(codigo, analiticoTipoEquipe(row));
    });

    const totalMetaLote = loteRows.reduce((acc, row) => acc + analiticoNumber(row.META), 0);
    const totalExecLote = loteRows.reduce((acc, row) => acc + analiticoNumber(row.VALOR_US), 0);
    const performanceGeral = totalMetaLote > 0 ? (totalExecLote / totalMetaLote) * 100 : 0;
    const performanceTipo = (tipo) => {
      const rows = loteRows.filter((row) => tipoPorCodigo.get(String(row.COD_EQUIPE || "").trim()) === tipo);
      const meta = rows.reduce((acc, row) => acc + analiticoNumber(row.META), 0);
      const prod = rows.reduce((acc, row) => acc + analiticoNumber(row.VALOR_US), 0);
      return meta > 0 ? (prod / meta) * 100 : 0;
    };
    const lotePorEquipe = new Map();
    const loteMensalPorEquipe = new Map();
    loteRows.forEach((row) => {
      const codigo = String(row.COD_EQUIPE || "").trim();
      if (!codigo) return;
      const dataRow = String(row.DATA || "").slice(0, 10);
      const mensalAtual = loteMensalPorEquipe.get(codigo);
      if (!mensalAtual || dataRow >= String(mensalAtual.DATA || "").slice(0, 10)) {
        loteMensalPorEquipe.set(codigo, row);
      }
      const atual = lotePorEquipe.get(codigo) || { meta: 0, prod: 0, ratioTotal: 0, ratioCount: 0, faixaTotal: 0, faixaCount: 0 };
      const metaDia = analiticoNumber(row.META);
      const prodDia = analiticoNumber(row.VALOR_US);
      const faixaPeso = analiticoFaixaPeso(row.FAIXA_DIA);
      atual.meta += analiticoNumber(row.META);
      atual.prod += analiticoNumber(row.VALOR_US);
      if (metaDia > 0) {
        atual.ratioTotal += (prodDia / metaDia) * 100;
        atual.ratioCount += 1;
      }
      if (faixaPeso !== null) {
        atual.faixaTotal += faixaPeso;
        atual.faixaCount += 1;
      }
      lotePorEquipe.set(codigo, atual);
    });
    const equipesDLote = Array.from(loteMensalPorEquipe.values()).filter((item) => {
      const percentual = analiticoProdutividadeMes(item);
      return analiticoEquipeD(percentual);
    }).length;

    const firstTimes = reportRows.map((row) => analiticoTimeToMinutes(row.PRIMEIRO_ATENDIMENTO));
    const lastTimes = reportRows.map((row) => analiticoTimeToMinutes(row.ULTIMO_ATENDIMENTO));
    const jornadaTimes = reportRows.map((row) => {
      const first = analiticoTimeToMinutes(row.PRIMEIRO_ATENDIMENTO);
      const last = analiticoTimeToMinutes(row.ULTIMO_ATENDIMENTO);
      return Number.isFinite(first) && Number.isFinite(last) && last >= first ? last - first : Number.NaN;
    });
    const jornadasValidas = jornadaTimes.filter(Number.isFinite).length;
    const jornadasIncompletas = jornadaTimes.filter((min) => Number.isFinite(min) && min < 7 * 60).length;

    const executados = controleRows.filter((row) => row.DATA_TERMINO_REAL && ["SIM", "NAO"].includes(analiticoFlagProdutivo(row)));
    const improdutivos = executados.filter((row) => analiticoFlagProdutivo(row) === "NAO");
    const indiceImpedimento = executados.length ? (improdutivos.length / executados.length) * 100 : 0;
    const indiceImpTipo = (tipo) => {
      const rows = executados.filter((row) => tipoPorCodigo.get(String(row.COD_EQUIPE_WM || "").trim()) === tipo);
      const imp = rows.filter((row) => analiticoFlagProdutivo(row) === "NAO").length;
      return rows.length ? (imp / rows.length) * 100 : 0;
    };

    let historicoVozes = [];
    try {
      const fimDate = new Date(`${dataFim}T00:00:00Z`);
      const inicioHistoricoDate = analiticoAddMonths(new Date(Date.UTC(fimDate.getUTCFullYear(), fimDate.getUTCMonth(), 1)), -1);
      const inicioHistorico = inicioHistoricoDate.toISOString().slice(0, 10);
      const mesesHistorico = Array.from({ length: 2 }, (_, index) => {
        const date = analiticoAddMonths(inicioHistoricoDate, index);
        return date.toISOString().slice(0, 7);
      });

      const [historicoReportRows] = await pool.query(`
        SELECT r.*
        FROM report_csc_hoje r
        JOIN (
          SELECT MAX(id) AS id
          FROM report_csc_hoje
          WHERE STR_TO_DATE(DATA, '%d/%m/%Y') >= ?
            AND STR_TO_DATE(DATA, '%d/%m/%Y') <= ?
            AND UPPER(TRIM(NOME_SUPERVISOR)) = UPPER(TRIM(?))
          GROUP BY DATA, COD_EQUIPE
        ) latest ON latest.id = r.id
        ORDER BY STR_TO_DATE(r.DATA, '%d/%m/%Y'), r.NOME_EQUIPE
      `, [inicioHistorico, dataFim, supervisor]);

      const historicoCodigos = [...new Set(historicoReportRows.map((row) => String(row.COD_EQUIPE || "").trim()).filter(Boolean))];
      let historicoControleRows = [];
      let historicoLoteRows = [];
      if (historicoCodigos.length) {
        const historicoPlaceholders = historicoCodigos.map(() => "?").join(",");
        const [rowsControle] = await pool.query(`
          SELECT *
          FROM controle_servico
          WHERE COD_EQUIPE_WM IN (${historicoPlaceholders})
            AND DATE(DATA_DESIGNACAO) >= ?
            AND DATE(DATA_DESIGNACAO) <= ?
        `, [...historicoCodigos, inicioHistorico, dataFim]);
        historicoControleRows = rowsControle;

        const [rowsLoteHistorico] = await pool.query(`
          SELECT
            DATA,
            TRIM(CAST(COD_EQUIPE AS CHAR)) AS COD_EQUIPE,
            VALOR_US,
            META
          FROM \`${databaseLote}\`.\`${viewLote}\`
          WHERE DATA IS NOT NULL
            AND DATA >= ?
            AND DATA <= ?
            AND TRIM(CAST(COD_EQUIPE AS CHAR)) IN (${historicoPlaceholders})
        `, [inicioHistorico, dataFim, ...historicoCodigos]);
        historicoLoteRows = rowsLoteHistorico;
      }

      const historicoTipoPorCodigo = new Map();
      historicoReportRows.forEach((row) => {
        const codigo = String(row.COD_EQUIPE || "").trim();
        if (codigo && !historicoTipoPorCodigo.has(codigo)) historicoTipoPorCodigo.set(codigo, analiticoTipoEquipe(row));
      });

      const porMes = new Map(mesesHistorico.map((mes) => [mes, {
        mes,
        label: analiticoMonthLabel(mes),
        meta: 0,
        prod: 0,
        executados: 0,
        improdutivos: 0,
        jornadasValidas: 0,
        jornadasIncompletas: 0
      }]));

      historicoLoteRows.forEach((row) => {
        const mes = analiticoMonthKey(row.DATA);
        const item = porMes.get(mes);
        if (!item) return;
        item.meta += analiticoNumber(row.META);
        item.prod += analiticoNumber(row.VALOR_US);
      });

      historicoControleRows.forEach((row) => {
        const codigo = String(row.COD_EQUIPE_WM || "").trim();
        if (!historicoTipoPorCodigo.has(codigo) || !row.DATA_TERMINO_REAL) return;
        const mes = analiticoMonthKey(row.DATA_DESIGNACAO || row.DATA_TERMINO_REAL);
        const item = porMes.get(mes);
        if (!item) return;
        const flag = analiticoFlagProdutivo(row);
        if (!["SIM", "NAO"].includes(flag)) return;
        item.executados += 1;
        if (flag === "NAO") item.improdutivos += 1;
      });

      historicoReportRows.forEach((row) => {
        const mes = analiticoMonthKey(row.DATA);
        const item = porMes.get(mes);
        if (!item) return;
        const first = analiticoTimeToMinutes(row.PRIMEIRO_ATENDIMENTO);
        const last = analiticoTimeToMinutes(row.ULTIMO_ATENDIMENTO);
        if (!Number.isFinite(first) || !Number.isFinite(last) || last < first) return;
        item.jornadasValidas += 1;
        if (last - first < 7 * 60) item.jornadasIncompletas += 1;
      });

      historicoVozes = mesesHistorico.map((mes) => {
        const item = porMes.get(mes);
        const impedimento = item.executados ? (item.improdutivos / item.executados) * 100 : 0;
        const produtividade = item.meta > 0 ? (item.prod / item.meta) * 100 : 0;
        const jornadaIncompleta = item.jornadasValidas ? (item.jornadasIncompletas / item.jornadasValidas) * 100 : 0;
        return {
          mes: item.mes,
          label: item.label,
          impedimento,
          produtividade,
          jornada: Math.max(0, Math.min(100, 100 - jornadaIncompleta)),
          executados: item.executados,
          improdutivos: item.improdutivos,
          jornadasValidas: item.jornadasValidas,
          jornadasIncompletas: item.jornadasIncompletas
        };
      });
    } catch (_) {
      historicoVozes = [];
    }

    const equipes = codigos.map((codigo) => {
      const report = reportByTeam.get(codigo) || [];
      const services = servicesByTeam.get(codigo) || [];
      const exec = services.filter((row) => row.DATA_TERMINO_REAL && ["SIM", "NAO"].includes(analiticoFlagProdutivo(row)));
      const imp = exec.filter((row) => analiticoFlagProdutivo(row) === "NAO");
      const produtivos = exec.filter((row) => analiticoFlagProdutivo(row) === "SIM");
      const loteEquipe = lotePorEquipe.get(codigo);
      const loteMensalEquipe = loteMensalPorEquipe.get(codigo);
      const meta = loteEquipe?.meta ?? report.reduce((acc, row) => acc + analiticoNumber(row.META), 0);
      const prod = loteEquipe?.prod ?? report.reduce((acc, row) => acc + analiticoNumber(row.US_EXEC), 0);
      const jornadaEquipeTimes = report.map((row) => {
        const first = analiticoTimeToMinutes(row.PRIMEIRO_ATENDIMENTO);
        const last = analiticoTimeToMinutes(row.ULTIMO_ATENDIMENTO);
        return Number.isFinite(first) && Number.isFinite(last) && last >= first ? last - first : Number.NaN;
      });
      const first = report[0] || {};
      const performance = loteMensalEquipe
        ? analiticoProdutividadeMes(loteMensalEquipe)
        : (loteEquipe?.ratioCount ? loteEquipe.ratioTotal / loteEquipe.ratioCount : (meta > 0 ? (prod / meta) * 100 : 0));
      const faixaSistema = loteMensalEquipe
        ? (String(loteMensalEquipe.FAIXA_MES || "").trim().toUpperCase() || "-")
        : (loteEquipe?.faixaCount ? analiticoFaixaPorPeso(loteEquipe.faixaTotal / loteEquipe.faixaCount) : analiticoClassificarFaixa(performance));
      return {
        codigo,
        equipe: first.NOME_EQUIPE || services[0]?.NOME || codigo,
        tipo: analiticoTipoEquipe(first),
        totalServicos: services.length,
        executados: exec.length,
        produtivos: produtivos.length,
        improdutivos: imp.length,
        impedimento: exec.length ? (imp.length / exec.length) * 100 : 0,
        performance,
        jornadaProdutiva: analiticoMinutesToTime(analiticoAverage(jornadaEquipeTimes)),
        faixa: faixaSistema,
        dias: new Set(report.map((row) => String(row.DATA || "").slice(0, 10))).size
      };
    });

    const totalEquipes = codigos.length;
    const totalServicos = controleRows.length;
    const totalDiasEquipe = equipes.reduce((acc, item) => acc + item.dias, 0);
    const topEquipes = equipes
      .slice()
      .sort((a, b) => b.totalServicos - a.totalServicos || a.equipe.localeCompare(b.equipe, "pt-BR"))
      .slice(0, 10)
      .map((item, index, arr) => {
        const perc = totalServicos ? (item.totalServicos / totalServicos) * 100 : 0;
        const acumulado = arr.slice(0, index + 1).reduce((acc, row) => acc + (totalServicos ? (row.totalServicos / totalServicos) * 100 : 0), 0);
        return { ...item, perc, acumulado };
      });

    const porImpedimento = equipes.filter((item) => item.executados > 0).sort((a, b) => b.impedimento - a.impedimento);
    const maiorImpedimento = porImpedimento[0] || null;
    const menorImpedimento = porImpedimento.slice().reverse()[0] || null;
    const equipesAcima30 = equipes.filter((item) => item.impedimento > 30).length;
    const faixasBase = [
      { label: ">= 50%", min: 50, max: Infinity },
      { label: "40% a 49%", min: 40, max: 50 },
      { label: "30% a 39%", min: 30, max: 40 },
      { label: "20% a 29%", min: 20, max: 30 },
      { label: "10% a 19%", min: 10, max: 20 },
      { label: "< 10%", min: -Infinity, max: 10 }
    ];
    res.json({
      ok: true,
      filtros: { supervisor, dataInicio, dataFim },
      supervisor,
      periodo: { dataInicio, dataFim },
      processo: "ANALITICO",
      totalEquipes,
      totalServicos,
      mediaMensalServicos: totalEquipes ? totalServicos / totalEquipes : 0,
      mediaServEquipeDia: totalDiasEquipe ? totalServicos / totalDiasEquipe : 0,
      performance: {
        geral: performanceGeral,
        moto: performanceTipo("MOTO"),
        multi: performanceTipo("MULTI"),
        equipesD: equipesDLote
      },
      jornada: {
        mediaPrimeiroAtendimento: analiticoMinutesToTime(analiticoAverage(firstTimes)),
        mediaUltimoAtendimento: analiticoMinutesToTime(analiticoAverage(lastTimes)),
        mediaJornadaProdutiva: analiticoMinutesToTime(analiticoAverage(jornadaTimes)),
        percentualIncompleta: jornadasValidas ? (jornadasIncompletas / jornadasValidas) * 100 : 0
      },
      eficiencia: {
        indiceImpedimento,
        improdutivoMoto: indiceImpTipo("MOTO"),
        improdutivoMulti: indiceImpTipo("MULTI"),
        executados: executados.length,
        improdutivos: improdutivos.length
      },
      topEquipes,
      estatisticas: {
        maiorImpedimento,
        menorImpedimento,
        equipesAcima30,
        equipesAcima30Perc: totalEquipes ? (equipesAcima30 / totalEquipes) * 100 : 0,
        top5Perc: topEquipes.reduce((acc, item) => acc + item.perc, 0),
        top10Perc: topEquipes.reduce((acc, item) => acc + item.perc, 0)
      },
      faixasImpedimento: faixasBase.map((faixa) => {
        const quantidade = equipes.filter((item) => item.impedimento >= faixa.min && item.impedimento < faixa.max).length;
        return { ...faixa, quantidade, percentual: totalEquipes ? (quantidade / totalEquipes) * 100 : 0 };
      }),
      historicoVozes,
      equipes
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.get("/api/painel-servicos-analitico", async (req, res) => {
  try {
    const supervisor = String(req.query.supervisor || "").trim();
    if (!supervisor) return res.status(400).json({ ok: false, error: "Informe o parametro supervisor." });

    const pool = getPool();
    const { dataInicio, dataFim } = analiticoDateParams(req);
    const reportWhere = `
      STR_TO_DATE(DATA, '%d/%m/%Y') >= ?
      AND STR_TO_DATE(DATA, '%d/%m/%Y') <= ?
      AND UPPER(TRIM(NOME_SUPERVISOR)) = UPPER(TRIM(?))
    `;

    const [reportRows] = await pool.query(`
      SELECT r.*
      FROM report_csc_hoje r
      JOIN (
        SELECT MAX(id) AS id
        FROM report_csc_hoje
        WHERE ${reportWhere}
        GROUP BY DATA, COD_EQUIPE
      ) latest ON latest.id = r.id
      ORDER BY STR_TO_DATE(r.DATA, '%d/%m/%Y'), r.NOME_EQUIPE
    `, [dataInicio, dataFim, supervisor]);

    const codigos = [...new Set(reportRows.map((row) => String(row.COD_EQUIPE || "").trim()).filter(Boolean))];
    const controleTable = sanitizeTableNameUnicode(process.env.MYSQL_TABLE_CONTROLE_SERVICO || "controle_servico");
    const columns = await getTableColumns(pool, controleTable);
    const tipoServicoCol = columns.find((col) => ["TIPO_SERVICO", "TIPO SERVICO"].includes(String(col).toUpperCase()));
    const tipoExpr = tipoServicoCol
      ? `TRIM(COALESCE(\`${tipoServicoCol}\`, ''))`
      : `TRIM(COALESCE(\`TIPO_SERVICO\`, \`TIPO SERVICO\`, ''))`;
    const nomeEquipeCol = columns.find((col) => ["NOME_EQUIPE", "NOME", "EQUIPE"].includes(String(col).toUpperCase()));
    const equipeExpr = nomeEquipeCol
      ? `COALESCE(NULLIF(TRIM(CAST(\`${nomeEquipeCol}\` AS CHAR)), ''), TRIM(CAST(COD_EQUIPE_WM AS CHAR)))`
      : `TRIM(CAST(COD_EQUIPE_WM AS CHAR))`;
    const valorUsCol = columns.find((col) => ["VALOR_US", "US_EXEC", "US EXEC", "US_EXECUTADAS"].includes(String(col).toUpperCase()));
    const metaCol = columns.find((col) => ["META", "META_US", "META US"].includes(String(col).toUpperCase()));
    const valorUsExpr = valorUsCol ? `\`${valorUsCol}\`` : "0";
    const metaExpr = metaCol ? `\`${metaCol}\`` : "0";

    let controleRows = [];
    if (codigos.length) {
      const placeholders = codigos.map(() => "?").join(",");
      const [rows] = await pool.query(`
        SELECT
          ${tipoExpr} AS tipoServico,
          TRIM(CAST(COD_EQUIPE_WM AS CHAR)) AS COD_EQUIPE_WM,
          ${equipeExpr} AS equipe,
          ${valorUsExpr} AS VALOR_US,
          ${metaExpr} AS META,
          PRODUTIVO,
          DATA_TERMINO_REAL
        FROM \`${controleTable}\`
        WHERE DATE(DATA_DESIGNACAO) >= ?
          AND DATE(DATA_DESIGNACAO) <= ?
          AND TRIM(CAST(COD_EQUIPE_WM AS CHAR)) IN (${placeholders})
      `, [dataInicio, dataFim, ...codigos]);
      controleRows = rows;
    }

    const totalServicos = controleRows.length;
    const tiposMap = new Map();
    let totalExecutados = 0;
    let totalProdutivos = 0;
    let totalImprodutivos = 0;

    controleRows.forEach((row) => {
      const tipo = String(row.tipoServico || '').trim() || 'OUTROS';
      const item = tiposMap.get(tipo) || { tipo, totalServicos: 0, executados: 0, produtivos: 0, improdutivos: 0, usExec: 0, usMeta: 0 };
      item.totalServicos += 1;
      item.usExec += analiticoNumber(row.VALOR_US);
      item.usMeta += analiticoNumber(row.META);
      const flag = analiticoFlagProdutivo(row);
      if (flag === 'SIM' || flag === 'NAO') {
        item.executados += 1;
        totalExecutados += 1;
        if (flag === 'SIM') {
          item.produtivos += 1;
          totalProdutivos += 1;
        } else {
          item.improdutivos += 1;
          totalImprodutivos += 1;
        }
      }
      tiposMap.set(tipo, item);
    });

    const tipos = [...tiposMap.values()]
      .map((item) => ({
        ...item,
        produtividade: item.executados ? (item.produtivos / item.executados) * 100 : 0,
        improdutividade: item.executados ? (item.improdutivos / item.executados) * 100 : 0,
        participacaoImprodutivos: totalImprodutivos ? (item.improdutivos / totalImprodutivos) * 100 : 0,
        percentual: totalServicos ? (item.totalServicos / totalServicos) * 100 : 0
      }))
      .sort((a, b) => b.totalServicos - a.totalServicos || a.tipo.localeCompare(b.tipo, 'pt-BR'));

    const topTipos = tipos.slice(0, 5);
    const tipoMaisFrequente = topTipos[0] || null;
    const tipoMaisProdutivo = [...tipos]
      .filter((item) => item.executados > 0)
      .sort((a, b) => b.produtividade - a.produtividade || b.totalServicos - a.totalServicos)[0] || null;
    const tipoMaisImprodutivo = [...tipos]
      .filter((item) => item.improdutivos > 0)
      .sort((a, b) => b.improdutivos - a.improdutivos || b.improdutividade - a.improdutividade || b.totalServicos - a.totalServicos)[0] || null;
    const topTiposImprodutivos = [...tipos]
      .filter((item) => item.improdutivos > 0)
      .sort((a, b) => b.improdutivos - a.improdutivos || b.improdutividade - a.improdutividade || a.tipo.localeCompare(b.tipo, 'pt-BR'))
      .slice(0, 5);

    const equipesMap = new Map();
    controleRows.forEach((row) => {
      const codigo = String(row.COD_EQUIPE_WM || '').trim();
      if (!codigo) return;
      const atual = equipesMap.get(codigo) || { codigo, equipe: row.equipe || codigo, totalServicos: 0, executados: 0, improdutivos: 0 };
      atual.totalServicos += 1;
      const flag = analiticoFlagProdutivo(row);
      if (flag === 'SIM' || flag === 'NAO') {
        atual.executados += 1;
        if (flag === 'NAO') atual.improdutivos += 1;
      }
      equipesMap.set(codigo, atual);
    });

    const equipes = [...equipesMap.values()].map((item) => ({
      ...item,
      percImprodutivo: item.executados ? (item.improdutivos / item.executados) * 100 : 0
    }));

    const topEquipes = equipes
      .sort((a, b) => b.totalServicos - a.totalServicos || a.equipe.localeCompare(b.equipe, 'pt-BR'))
      .slice(0, 5);
    const topEquipesImprodutivas = equipes
      .filter((item) => item.improdutivos > 0)
      .sort((a, b) => b.improdutivos - a.improdutivos || b.percImprodutivo - a.percImprodutivo || a.equipe.localeCompare(b.equipe, 'pt-BR'))
      .slice(0, 5);

    const mediaServDia = totalServicos && reportRows.length ? totalServicos / reportRows.length : 0;
    const produtividadeGeral = totalExecutados ? (totalProdutivos / totalExecutados) * 100 : 0;
    const improdutividadeGeral = totalExecutados ? (totalImprodutivos / totalExecutados) * 100 : 0;

    const vozes = [
      tipoMaisFrequente
        ? `O tipo de serviço mais frequente é ${tipoMaisFrequente.tipo} com ${tipoMaisFrequente.totalServicos} serviços (${tipoMaisFrequente.percentual.toFixed(1)}% do total).`
        : 'Não há serviços registrados no período para este supervisor.',
      totalExecutados
        ? `A produtividade geral dos serviços executados é de ${produtividadeGeral.toFixed(1)}%, com ${totalProdutivos} produtivos e ${totalImprodutivos} improdutivos.`
        : 'Não há serviços executados registrados no período.',
      topEquipes[0]
        ? `A equipe com maior volume de serviços é ${topEquipes[0].equipe} com ${topEquipes[0].totalServicos} serviços.`
        : 'Nenhuma equipe com serviços cadastrados neste período.'
    ];

    res.json({
      ok: true,
      filtros: { supervisor, dataInicio, dataFim },
      supervisor,
      periodo: { dataInicio, dataFim },
      totalServicos,
      totalExecutados,
      totalProdutivos,
      totalImprodutivos,
      produtividadeGeral,
      improdutividadeGeral,
      totalTipos: tipos.length,
      topTipos,
      topTiposImprodutivos,
      tipos,
      topEquipes,
      topEquipesImprodutivas,
      totalEquipes: equipesMap.size,
      mediaServDia,
      tipoMaisFrequente: tipoMaisFrequente?.tipo || '-',
      tipoMaisProdutivo: tipoMaisProdutivo?.tipo || '-',
      tipoMaisImprodutivo: tipoMaisImprodutivo?.tipo || '-',
      vozes
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.get("/api/painel-jornada-analitico", async (req, res) => {
  try {
    const supervisor = String(req.query.supervisor || "").trim();
    if (!supervisor) return res.status(400).json({ ok: false, error: "Informe o parametro supervisor." });

    const pool = getPool();
    const { dataInicio, dataFim } = analiticoDateParams(req);
    const reportWhere = `
      STR_TO_DATE(DATA, '%d/%m/%Y') >= ?
      AND STR_TO_DATE(DATA, '%d/%m/%Y') <= ?
      AND UPPER(TRIM(NOME_SUPERVISOR)) = UPPER(TRIM(?))
    `;

    const [reportRows] = await pool.query(`
      SELECT r.*
      FROM report_csc_hoje r
      JOIN (
        SELECT MAX(id) AS id
        FROM report_csc_hoje
        WHERE ${reportWhere}
        GROUP BY DATA, COD_EQUIPE
      ) latest ON latest.id = r.id
      ORDER BY STR_TO_DATE(r.DATA, '%d/%m/%Y'), r.NOME_EQUIPE
    `, [dataInicio, dataFim, supervisor]);

    const jornadaProdutivaIdealMin = 7 * 60 + 30;
    const codigos = [...new Set(reportRows.map((row) => String(row.COD_EQUIPE || "").trim()).filter(Boolean))];
    const porEquipe = new Map();
    reportRows.forEach((row) => {
      const codigo = String(row.COD_EQUIPE || "").trim();
      if (!codigo) return;
      if (!porEquipe.has(codigo)) {
        porEquipe.set(codigo, {
          codigo,
          equipe: row.NOME_EQUIPE || row.NOME || codigo,
          inicio: [],
          primeiro: [],
          ultimo: [],
          fim: [],
          trabalhoInicio: [],
          trabalhoFim: [],
          trabalho: [],
          jornada: [],
          refeicaoOk: 0,
          dias: 0,
          incompletas: 0,
          semPrimeiro: 0,
          semUltimo: 0,
          inicioTardio: 0,
          ultimoCedo: 0
        });
      }
      const item = porEquipe.get(codigo);
      item.dias += 1;
      const inicio = analiticoTimeToMinutes(row.INICIO_JORNADA);
      const primeiro = analiticoTimeToMinutes(row.PRIMEIRO_ATENDIMENTO);
      const ultimo = analiticoTimeToMinutes(row.ULTIMO_ATENDIMENTO);
      const fim = analiticoTimeToMinutes(row.FIM_JORNADA);
      const inicioRef = analiticoTimeToMinutes(row.INICIO_REFEICAO);
      const terminoRef = analiticoTimeToMinutes(row.TERMINO_REFEICAO);

      if (Number.isFinite(inicio)) item.inicio.push(inicio);
      if (Number.isFinite(primeiro)) item.primeiro.push(primeiro);
      if (Number.isFinite(ultimo)) item.ultimo.push(ultimo);
      if (Number.isFinite(fim)) item.fim.push(fim);
      if (Number.isFinite(inicio) && Number.isFinite(fim) && fim >= inicio) {
        item.trabalhoInicio.push(inicio);
        item.trabalhoFim.push(fim);
        item.trabalho.push(fim - inicio);
      }
      if (Number.isFinite(inicioRef) || Number.isFinite(terminoRef)) item.refeicaoOk += 1;
      if (!Number.isFinite(primeiro)) item.semPrimeiro += 1;
      if (!Number.isFinite(ultimo)) item.semUltimo += 1;
      if (Number.isFinite(inicio) && inicio > 9 * 60) item.inicioTardio += 1;
      if (Number.isFinite(ultimo) && ultimo < 16 * 60) item.ultimoCedo += 1;
      if (Number.isFinite(primeiro) && Number.isFinite(ultimo) && ultimo >= primeiro) {
        const jornada = ultimo - primeiro;
        item.jornada.push(jornada);
        if (jornada < jornadaProdutivaIdealMin) item.incompletas += 1;
      }
    });

    const media = (values) => analiticoAverage(values);
    const equipes = Array.from(porEquipe.values()).map((item) => {
      const mediaTrabalho = media(item.trabalho);
      const mediaJornada = media(item.jornada);
      return {
        codigo: item.codigo,
        equipe: item.equipe,
        dias: item.dias,
        mediaInicio: analiticoMinutesToTime(media(item.inicio)),
        mediaInicioTrabalho: analiticoMinutesToTime(media(item.trabalhoInicio)),
        mediaPrimeiro: analiticoMinutesToTime(media(item.primeiro)),
        mediaUltimo: analiticoMinutesToTime(media(item.ultimo)),
        mediaFim: analiticoMinutesToTime(media(item.fim)),
        mediaFimTrabalho: analiticoMinutesToTime(media(item.trabalhoFim)),
        mediaTrabalhoMin: Number.isFinite(mediaTrabalho) ? mediaTrabalho : 0,
        mediaTrabalho: analiticoMinutesToTime(mediaTrabalho),
        mediaJornadaMin: Number.isFinite(mediaJornada) ? mediaJornada : 0,
        mediaJornada: analiticoMinutesToTime(mediaJornada),
        incompletas: item.incompletas,
        semRefeicao: Math.max(0, item.dias - item.refeicaoOk),
        semPrimeiro: item.semPrimeiro,
        semUltimo: item.semUltimo,
        inicioTardio: item.inicioTardio,
        ultimoCedo: item.ultimoCedo
      };
    });

    const jornadas = equipes.map((item) => item.mediaJornadaMin).filter((value) => Number.isFinite(value) && value > 0);
    const totalDias = equipes.reduce((acc, item) => acc + item.dias, 0);
    const totalIncompletas = equipes.reduce((acc, item) => acc + item.incompletas, 0);
    const totalSemRefeicao = equipes.reduce((acc, item) => acc + item.semRefeicao, 0);
    const totalSemPrimeiro = equipes.reduce((acc, item) => acc + item.semPrimeiro, 0);
    const totalSemUltimo = equipes.reduce((acc, item) => acc + item.semUltimo, 0);
    const totalInicioTardio = equipes.reduce((acc, item) => acc + item.inicioTardio, 0);
    const totalUltimoCedo = equipes.reduce((acc, item) => acc + item.ultimoCedo, 0);
    const topRisco = equipes
      .slice()
      .filter((item) => item.mediaJornadaMin > 0)
      .sort((a, b) =>
        a.mediaJornadaMin - b.mediaJornadaMin ||
        b.incompletas - a.incompletas ||
        a.equipe.localeCompare(b.equipe, "pt-BR")
      )
      .slice(0, 5);
    const porJornada = equipes.filter((item) => item.mediaJornadaMin > 0).sort((a, b) => a.mediaJornadaMin - b.mediaJornadaMin);
    const menorJornada = porJornada[0] || null;
    const maiorJornada = porJornada.slice().reverse()[0] || null;
    const maisTardio = equipes
      .filter((item) => item.mediaInicio !== "--:--")
      .sort((a, b) => analiticoTimeToMinutes(b.mediaInicio) - analiticoTimeToMinutes(a.mediaInicio))[0] || null;
    const maiorRecorrenciaProdMenor730 = equipes
      .filter((item) => item.incompletas > 0)
      .sort((a, b) => b.incompletas - a.incompletas || a.mediaJornadaMin - b.mediaJornadaMin || a.equipe.localeCompare(b.equipe, "pt-BR"))[0] || null;

    const faixasBase = [
      { label: ">= 7h30", min: jornadaProdutivaIdealMin, max: Infinity },
      { label: "7h a 7h29", min: 7 * 60, max: jornadaProdutivaIdealMin },
      { label: "6h a 6h59", min: 6 * 60, max: 7 * 60 },
      { label: "5h a 5h59", min: 5 * 60, max: 6 * 60 },
      { label: "< 5h", min: -Infinity, max: 5 * 60 },
      { label: "Sem jornada", min: null, max: null }
    ];

    res.json({
      ok: true,
      filtros: { supervisor, dataInicio, dataFim },
      supervisor,
      periodo: { dataInicio, dataFim },
      processo: "JORNADA",
      totalEquipes: codigos.length,
      totalDias,
      jornada: {
        mediaInicio: analiticoMinutesToTime(analiticoAverage(equipes.flatMap((item) => porEquipe.get(item.codigo)?.trabalhoInicio || []))),
        mediaPrimeiro: analiticoMinutesToTime(analiticoAverage(equipes.flatMap((item) => porEquipe.get(item.codigo)?.primeiro || []))),
        mediaUltimo: analiticoMinutesToTime(analiticoAverage(equipes.flatMap((item) => porEquipe.get(item.codigo)?.ultimo || []))),
        mediaFim: analiticoMinutesToTime(analiticoAverage(equipes.flatMap((item) => porEquipe.get(item.codigo)?.trabalhoFim || []))),
        mediaTrabalho: analiticoMinutesToTime(analiticoAverage(equipes.flatMap((item) => porEquipe.get(item.codigo)?.trabalho || []))),
        mediaProdutiva: analiticoMinutesToTime(analiticoAverage(equipes.flatMap((item) => porEquipe.get(item.codigo)?.jornada || []))),
        percentualIncompleta: totalDias ? (totalIncompletas / totalDias) * 100 : 0,
        percentualSemRefeicao: totalDias ? (totalSemRefeicao / totalDias) * 100 : 0,
        percentualSemPrimeiro: totalDias ? (totalSemPrimeiro / totalDias) * 100 : 0,
        percentualSemUltimo: totalDias ? (totalSemUltimo / totalDias) * 100 : 0,
        percentualInicioTardio: totalDias ? (totalInicioTardio / totalDias) * 100 : 0,
        percentualUltimoCedo: totalDias ? (totalUltimoCedo / totalDias) * 100 : 0
      },
      topRisco,
      estatisticas: {
        menorJornada,
        maiorJornada,
        maisTardio,
        maiorRecorrenciaProdMenor7h: maiorRecorrenciaProdMenor730,
        maiorRecorrenciaProdMenor730,
        equipesComIncompleta: equipes.filter((item) => item.incompletas > 0).length,
        equipesSemRefeicao: equipes.filter((item) => item.semRefeicao > 0).length
      },
      faixasJornada: faixasBase.map((faixa) => {
        const quantidade = faixa.min === null
          ? equipes.filter((item) => !item.mediaJornadaMin).length
          : equipes.filter((item) => item.mediaJornadaMin >= faixa.min && item.mediaJornadaMin < faixa.max).length;
        return { ...faixa, quantidade, percentual: codigos.length ? (quantidade / codigos.length) * 100 : 0 };
      }),
      equipes
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
});

app.post("/api/painel-analitico/export-image", async (req, res) => {
  const exportDir = path.join(__dirname, "..", "tmp", "exports");
  const id = randomUUID();
  const htmlPath = path.join(exportDir, `${id}.html`);
  const pngPath = path.join(exportDir, `${id}.png`);

  try {
    const width = Math.max(320, Math.min(3000, Number(req.body?.width) || 1280));
    const height = Math.max(320, Math.min(3000, Number(req.body?.height) || 900));
    const css = String(req.body?.css || "");
    const panelHtml = String(req.body?.html || "");
    if (!panelHtml.trim()) {
      return res.status(400).json({ ok: false, error: "Painel vazio para exportação." });
    }

    await fs.mkdir(exportDir, { recursive: true });
    const documentHtml = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <style>
    ${css}
    html, body { margin: 0; padding: 0; background: #f7f8f4; }
    .panel { margin: 0 !important; box-shadow: none !important; }
  </style>
</head>
<body>${panelHtml}</body>
</html>`;
    await fs.writeFile(htmlPath, documentHtml, "utf8");

    await runFile(edgeExecutablePath(), [
      "--headless",
      "--disable-gpu",
      "--no-first-run",
      `--window-size=${width},${height}`,
      `--screenshot=${pngPath}`,
      `file:///${htmlPath.replace(/\\/g, "/")}`
    ]);

    const png = await fs.readFile(pngPath);
    const filename = sanitizeDownloadName(req.body?.filename || "painel-analitico.png");
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Disposition", `attachment; filename="${filename.endsWith(".png") ? filename : `${filename}.png`}"`);
    res.send(png);
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error?.message || error) });
  } finally {
    await Promise.all([
      fs.unlink(htmlPath).catch(() => {}),
      fs.unlink(pngPath).catch(() => {})
    ]);
  }
});

app.use(express.static(path.join(__dirname, ".."), { dotfiles: "ignore" }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server on http://localhost:${PORT}`);
});
