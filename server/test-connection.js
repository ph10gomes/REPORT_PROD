const path = require("path");

const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const { getPool } = require("./mysql");

function redactedConfig() {
  return {
    MYSQL_HOST: process.env.MYSQL_HOST || "localhost",
    MYSQL_PORT: Number(process.env.MYSQL_PORT || 3306),
    MYSQL_USER: process.env.MYSQL_USER || "",
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || "",
    MYSQL_TABLE: process.env.MYSQL_TABLE || ""
  };
}

async function main() {
  // eslint-disable-next-line no-console
  console.log("Config:", redactedConfig());

  try {
    const pool = getPool();
    await pool.query("SELECT 1");
    // eslint-disable-next-line no-console
    console.log("OK: conectou no MySQL.");

    const table = process.env.MYSQL_TABLE;
    if (table) {
      const [rows] = await pool.query(`SELECT COUNT(*) AS total FROM \`${table}\``);
      // eslint-disable-next-line no-console
      console.log(`OK: tabela \`${table}\` acessível. Linhas:`, rows?.[0]?.total);
    }
  } catch (error) {
    const code = error && error.code ? String(error.code) : "";
    // eslint-disable-next-line no-console
    console.error("ERRO:", error?.message || error);

    if (code === "ER_ACCESS_DENIED_ERROR") {
      // eslint-disable-next-line no-console
      console.error(
        "Dica: usuário/senha sem permissão. Confira `MYSQL_USER`/`MYSQL_PASSWORD` e se o usuário tem acesso ao host."
      );
    }
    if (code === "ER_BAD_DB_ERROR") {
      // eslint-disable-next-line no-console
      console.error("Dica: `MYSQL_DATABASE` não existe (ou o usuário não tem permissão nele).");
    }
    if (code === "ER_NO_SUCH_TABLE") {
      // eslint-disable-next-line no-console
      console.error("Dica: `MYSQL_TABLE` não existe dentro de `MYSQL_DATABASE`.");
    }

    process.exitCode = 1;
  }
}

main();

