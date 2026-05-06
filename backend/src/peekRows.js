const pool = require("./config/db");

function parseArgs(argv) {
  const args = { table: null, limit: 3, columns: null, json: false };
  for (let i = 2; i < argv.length; i++) {
    const value = argv[i];
    if (value === "--json") {
      args.json = true;
      continue;
    }
    if ((value === "--table" || value === "-t") && argv[i + 1]) {
      args.table = argv[i + 1];
      i++;
      continue;
    }
    if (value.startsWith("--table=")) {
      args.table = value.slice("--table=".length);
      continue;
    }
    if ((value === "--limit" || value === "-n") && argv[i + 1]) {
      const n = Number(argv[i + 1]);
      if (Number.isFinite(n) && n > 0) args.limit = Math.trunc(n);
      i++;
      continue;
    }
    if (value.startsWith("--limit=")) {
      const n = Number(value.slice("--limit=".length));
      if (Number.isFinite(n) && n > 0) args.limit = Math.trunc(n);
      continue;
    }
    if ((value === "--columns" || value === "-c") && argv[i + 1]) {
      args.columns = String(argv[i + 1])
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      i++;
      continue;
    }
  }
  return args;
}

function quoteIdent(name) {
  if (!/^[A-Za-z0-9_]+$/.test(name)) throw new Error(`Ident inválido: ${name}`);
  return `\`${name}\``;
}

async function main() {
  const { table, limit, columns, json } = parseArgs(process.argv);
  if (!table) throw new Error("Informe a tabela: --table report_csc_hoje");

  const selectList =
    columns && columns.length
      ? columns.map(quoteIdent).join(", ")
      : "*";

  const sql = `SELECT ${selectList} FROM ${quoteIdent(table)} ORDER BY id DESC LIMIT ?`;
  const [rows] = await pool.query(sql, [limit]);

  if (json) {
    process.stdout.write(JSON.stringify(rows, null, 2) + "\n");
    return;
  }

  console.log(`Tabela: ${table} | linhas=${rows.length}`);
  console.dir(rows, { depth: 3, colors: true, maxArrayLength: 5 });
}

main()
  .catch((err) => {
    console.error("Erro ao buscar linhas:", err?.message || err);
    process.exitCode = 1;
  })
  .finally(async () => {
    try {
      await pool.end();
    } catch {
      // ignore
    }
  });

