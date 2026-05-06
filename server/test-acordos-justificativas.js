const path = require("path");

const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const { getPool } = require("./mysql");
const { sanitizeTableName } = require("./util");

function getStateTableName() {
  return sanitizeTableName(process.env.MYSQL_TABLE_STATE_ACORDOS || "painel_acordos_estado");
}

function getHistoryTableName(envName, fallbackName) {
  return sanitizeTableName(process.env[envName] || fallbackName);
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
      PRIMARY KEY (id)
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
      PRIMARY KEY (id)
    )
  `);
}

function nowMysql() {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
}

async function main() {
  const pool = getPool();
  const stateTable = getStateTableName();
  const histAcordosTable = getHistoryTableName("MYSQL_TABLE_HIST_ACORDOS", "historico_acordos");
  const histJustTable = getHistoryTableName("MYSQL_TABLE_HIST_JUSTIFICATIVAS", "historico_justificativas");

  await ensureStateTable(pool, stateTable);
  await ensureHistoryAcordosTable(pool, histAcordosTable);
  await ensureHistoryJustificativasTable(pool, histJustTable);

  const sufixo = Date.now();
  const contextKey = `2026-04-10||TESTE_UO||supervisor||SUP_${sufixo}`;
  const payload = {
    data: "2026-04-10",
    uo: "TESTE_UO",
    tipoVisao: "supervisor",
    supervisor: `SUP_${sufixo}`,
    analisadasD: 1,
    acordos: {
      "EQ001": {
        codigo: "EQ001",
        equipe: "Equipe Teste",
        metaDiaAcordo: 10,
        metaAcordo: 8,
        prodAcordo: 6,
        faixaAcordo: "D",
        percAcordo: 75,
        salvoEm: new Date().toISOString()
      }
    },
    justificativas: {
      "EQ001": {
        codigo: "EQ001",
        equipe: "Equipe Teste",
        justificativa: "OPERACIONAL - ATRASO: teste automatizado",
        motivoGrupo: "OPERACIONAL",
        motivoGrupos: ["OPERACIONAL"],
        motivoDescricao: "ATRASO",
        motivoDescricoes: ["ATRASO"],
        detalhe: "teste automatizado",
        salvoEm: new Date().toISOString()
      }
    }
  };

  await pool.query(
    `INSERT INTO \`${stateTable}\` (
      context_key, data_ref, uo, tipo_visao, supervisor, payload_json, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, NOW())
    ON DUPLICATE KEY UPDATE
      data_ref = VALUES(data_ref),
      uo = VALUES(uo),
      tipo_visao = VALUES(tipo_visao),
      supervisor = VALUES(supervisor),
      payload_json = VALUES(payload_json),
      updated_at = NOW()`,
    [contextKey, payload.data, payload.uo, payload.tipoVisao, payload.supervisor, JSON.stringify(payload)]
  );

  await pool.query(
    `INSERT INTO \`${histAcordosTable}\` (
      data_ref, uo, tipo_visao, supervisor, hora_referencia,
      codigo_equipe, equipe, acao, meta_dia_acordo, meta_acordo,
      prod_acordo, faixa_acordo, perc_acordo, usuario_salvo, salvo_em
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.data,
      payload.uo,
      payload.tipoVisao,
      payload.supervisor,
      "13",
      "EQ001",
      "Equipe Teste",
      "MARCAR",
      10,
      8,
      6,
      "D",
      75,
      "script_teste",
      nowMysql()
    ]
  );

  await pool.query(
    `INSERT INTO \`${histJustTable}\` (
      data_ref, uo, tipo_visao, supervisor, hora_referencia,
      codigo_equipe, equipe, justificativa, motivo_grupo, motivo_grupos,
      motivo_descricao, motivo_descricoes, detalhe, acao, usuario_salvo, salvo_em
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      payload.data,
      payload.uo,
      payload.tipoVisao,
      payload.supervisor,
      "13",
      "EQ001",
      "Equipe Teste",
      "OPERACIONAL - ATRASO: teste automatizado",
      "OPERACIONAL",
      JSON.stringify(["OPERACIONAL"]),
      "ATRASO",
      JSON.stringify(["ATRASO"]),
      "teste automatizado",
      "SALVAR",
      "script_teste",
      nowMysql()
    ]
  );

  const [stateRows] = await pool.query(
    `SELECT context_key, payload_json, updated_at
     FROM \`${stateTable}\`
     WHERE context_key = ?`,
    [contextKey]
  );

  const [histAcordosRows] = await pool.query(
    `SELECT id, data_ref, hora_referencia, codigo_equipe, acao, salvo_em
     FROM \`${histAcordosTable}\`
     WHERE supervisor = ?
     ORDER BY id DESC
     LIMIT 1`,
    [payload.supervisor]
  );

  const [histJustRows] = await pool.query(
    `SELECT id, data_ref, hora_referencia, codigo_equipe, acao, justificativa, salvo_em
     FROM \`${histJustTable}\`
     WHERE supervisor = ?
     ORDER BY id DESC
     LIMIT 1`,
    [payload.supervisor]
  );

  console.log("STATE_TABLE:", stateTable);
  console.log("STATE_ROW_FOUND:", stateRows.length > 0);
  console.log("STATE_CONTEXT_KEY:", contextKey);
  console.log("STATE_PAYLOAD_KEYS:", Object.keys(JSON.parse(stateRows[0]?.payload_json || "{}")));
  console.log("HIST_ACORDOS_TABLE:", histAcordosTable);
  console.log("HIST_ACORDOS_LAST:", histAcordosRows[0] || null);
  console.log("HIST_JUST_TABLE:", histJustTable);
  console.log("HIST_JUST_LAST:", histJustRows[0] || null);

  await pool.end();
}

main().catch((error) => {
  console.error("ERRO TESTE ACORDOS/JUSTIFICATIVAS:", error?.message || error);
  process.exitCode = 1;
});
