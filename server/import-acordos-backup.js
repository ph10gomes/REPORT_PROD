const fs = require("fs");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const { getPool } = require("./mysql");
const { sanitizeTableName } = require("./util");

function getStateTableName() {
  return sanitizeTableName(process.env.MYSQL_TABLE_STATE_ACORDOS || "painel_acordos_estado");
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

function parseArgs(argv) {
  const args = { file: "", date: "", dryRun: false };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = String(argv[i] || "");

    if (arg === "--dry-run") {
      args.dryRun = true;
      continue;
    }

    if (arg === "--date") {
      args.date = String(argv[i + 1] || "").trim();
      i += 1;
      continue;
    }

    if (!args.file) {
      args.file = arg;
    }
  }

  return args;
}

function loadBaseFromFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const json = JSON.parse(raw);

  if (json && typeof json === "object" && !Array.isArray(json)) {
    if (json.tipo === "backup-acordos-painel" && json.dados && typeof json.dados === "object") {
      return json.dados;
    }

    return json;
  }

  throw new Error("Arquivo JSON inválido.");
}

function filterBaseByDate(base, dateRef) {
  if (!dateRef) return base;

  const filtered = {};
  for (const [contextKey, payload] of Object.entries(base || {})) {
    if (String(payload?.data || "").trim() === dateRef) {
      filtered[contextKey] = payload;
    }
  }
  return filtered;
}

async function main() {
  const args = parseArgs(process.argv);
  if (!args.file) {
    throw new Error("Uso: node server/import-acordos-backup.js <arquivo.json> [--date YYYY-MM-DD] [--dry-run]");
  }

  const absoluteFile = path.resolve(process.cwd(), args.file);
  if (!fs.existsSync(absoluteFile)) {
    throw new Error(`Arquivo não encontrado: ${absoluteFile}`);
  }

  const base = loadBaseFromFile(absoluteFile);
  const filteredBase = filterBaseByDate(base, args.date);
  const entries = Object.entries(filteredBase);

  console.log("Arquivo:", absoluteFile);
  console.log("Filtro data:", args.date || "(sem filtro)");
  console.log("Registros encontrados:", entries.length);

  if (!entries.length) {
    return;
  }

  const resumo = entries.slice(0, 10).map(([contextKey, payload]) => ({
    context_key: contextKey,
    data: payload?.data || "",
    uo: payload?.uo || "",
    tipoVisao: payload?.tipoVisao || "",
    supervisor: payload?.supervisor || "",
    acordos: Object.keys(payload?.acordos || {}).length,
    justificativas: Object.keys(payload?.justificativas || {}).length
  }));

  console.table(resumo);

  if (args.dryRun) {
    console.log("Dry-run: nada foi gravado no MySQL.");
    return;
  }

  const pool = getPool();
  const table = getStateTableName();
  await ensureStateTable(pool, table);

  let total = 0;
  for (const [contextKey, payload] of entries) {
    const registro = payload && typeof payload === "object" && !Array.isArray(payload) ? payload : {};
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
        String(contextKey),
        String(registro.data || "").trim() || null,
        String(registro.uo || "").trim() || null,
        String(registro.tipoVisao || "").trim() || null,
        String(registro.supervisor || "").trim() || null,
        JSON.stringify(registro)
      ]
    );
    total += 1;
  }

  await pool.end();
  console.log(`Importação concluída. Registros gravados: ${total}`);
}

main().catch((error) => {
  console.error("ERRO IMPORTAÇÃO:", error?.message || error);
  process.exitCode = 1;
});
