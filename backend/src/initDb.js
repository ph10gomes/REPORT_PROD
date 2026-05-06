require("dotenv").config();
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

async function main() {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASS;
  const port = Number(process.env.DB_PORT || 3306);
  const database = process.env.DB_NAME;

  if (!host || !user || !database) {
    throw new Error("Defina DB_HOST, DB_USER e DB_NAME no .env");
  }

  const conn = await mysql.createConnection({
    host,
    user,
    password,
    port,
    multipleStatements: true,
  });

  try {
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    await conn.query(`USE \`${database}\``);

    const schemaPath = path.resolve(__dirname, "..", "sql", "schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf8");
    await conn.query(schemaSql);
  } finally {
    await conn.end();
  }

  console.log(`OK: banco "${database}" pronto (tabela jornadas criada/validada).`);
}

main().catch((err) => {
  console.error("FAIL db:init:", err.message);
  process.exit(1);
});

