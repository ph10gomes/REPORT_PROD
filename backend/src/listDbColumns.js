const pool = require("./config/db");

function parseArgs(argv) {
  const args = { table: null, json: false };
  for (let i = 2; i < argv.length; i++) {
    const value = argv[i];
    if (value === "--json") {
      args.json = true;
      continue;
    }
    if (value === "--table" && argv[i + 1]) {
      args.table = argv[i + 1];
      i++;
      continue;
    }
    if (value.startsWith("--table=")) {
      args.table = value.slice("--table=".length);
      continue;
    }
    if (!value.startsWith("--") && !args.table) {
      args.table = value;
    }
  }
  return args;
}

async function main() {
  const { table, json } = parseArgs(process.argv);
  const schema = process.env.DB_NAME;
  if (!schema) {
    throw new Error("DB_NAME não definido (ex: DB_NAME=report_csc_hoje).");
  }

  const params = [schema];
  let whereTable = "";
  if (table) {
    whereTable = " AND TABLE_NAME = ?";
    params.push(table);
  }

  const [rows] = await pool.query(
    `
    SELECT
      TABLE_NAME,
      COLUMN_NAME,
      ORDINAL_POSITION,
      COLUMN_TYPE,
      IS_NULLABLE,
      COLUMN_KEY,
      COLUMN_DEFAULT,
      EXTRA
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = ?${whereTable}
    ORDER BY TABLE_NAME, ORDINAL_POSITION
    `,
    params
  );

  if (json) {
    process.stdout.write(JSON.stringify(rows, null, 2) + "\n");
    return;
  }

  if (!rows.length) {
    console.log(
      table
        ? `Nenhuma coluna encontrada para a tabela "${table}" no schema "${schema}".`
        : `Nenhuma coluna encontrada no schema "${schema}".`
    );
    return;
  }

  let currentTable = null;
  for (const row of rows) {
    if (row.TABLE_NAME !== currentTable) {
      currentTable = row.TABLE_NAME;
      process.stdout.write(`\nTABLE: ${currentTable}\n`);
    }
    const defaultValue =
      row.COLUMN_DEFAULT === null || row.COLUMN_DEFAULT === undefined
        ? ""
        : ` default=${JSON.stringify(row.COLUMN_DEFAULT)}`;
    const keyValue = row.COLUMN_KEY ? ` key=${row.COLUMN_KEY}` : "";
    const extraValue = row.EXTRA ? ` extra=${row.EXTRA}` : "";
    process.stdout.write(
      `  - ${row.COLUMN_NAME} (${row.COLUMN_TYPE}) null=${row.IS_NULLABLE}${keyValue}${defaultValue}${extraValue}\n`
    );
  }
}

main()
  .catch((err) => {
    console.error("Erro ao listar colunas:", err?.message || err);
    process.exitCode = 1;
  })
  .finally(async () => {
    try {
      await pool.end();
    } catch {
      // ignore
    }
  });

