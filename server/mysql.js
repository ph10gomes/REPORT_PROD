const mysql = require("mysql2/promise");

const { requireEnv } = require("./util");

let pool;

function getPool() {
  if (pool) return pool;

  pool = mysql.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_PORT || 3306),
    user: requireEnv("MYSQL_USER"),
    password: requireEnv("MYSQL_PASSWORD"),
    database: requireEnv("MYSQL_DATABASE"),
    waitForConnections: true,
    connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT || 10),
    maxIdle: Number(process.env.MYSQL_MAX_IDLE || 10),
    idleTimeout: Number(process.env.MYSQL_IDLE_TIMEOUT_MS || 60000),
    dateStrings: true,
    queueLimit: 0
  });

  return pool;
}

module.exports = { getPool };
