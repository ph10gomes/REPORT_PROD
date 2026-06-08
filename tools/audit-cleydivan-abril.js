const mysql = require('mysql2/promise');
require('dotenv').config();

async function main() {
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    dateStrings: true
  });

  const base = `
    STR_TO_DATE(DATA, '%d/%m/%Y') >= ?
    AND STR_TO_DATE(DATA, '%d/%m/%Y') < ?
    AND UPPER(NOME_SUPERVISOR) LIKE ?
  `;
  const params = ['2026-04-01', '2026-05-01', '%CLEYDIVAN%'];

  const [tipos] = await pool.query(`
    SELECT TIPO_EQUIPE, COUNT(DISTINCT COD_EQUIPE) equipes, COUNT(*) linhas
    FROM report_csc_hoje
    WHERE ${base}
    GROUP BY TIPO_EQUIPE
    ORDER BY equipes DESC, TIPO_EQUIPE
  `, params);

  const [equipes] = await pool.query(`
    SELECT COD_EQUIPE, NOME_EQUIPE, TIPO_EQUIPE, COUNT(*) linhas,
           MIN(STR_TO_DATE(DATA, '%d/%m/%Y')) min_data,
           MAX(STR_TO_DATE(DATA, '%d/%m/%Y')) max_data
    FROM report_csc_hoje
    WHERE ${base}
    GROUP BY COD_EQUIPE, NOME_EQUIPE, TIPO_EQUIPE
    ORDER BY TIPO_EQUIPE, NOME_EQUIPE
  `, params);

  console.log(JSON.stringify({ tipos, totalEquipes: equipes.length, equipes }, null, 2));
  await pool.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
