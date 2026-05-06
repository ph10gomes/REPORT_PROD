// backend/src/runImportOnce.js
require("dotenv").config();
const fs = require("fs");
const path = require("path");

console.log("🚀 runImportOnce iniciado");
console.log("📌 PWD:", process.cwd());
console.log("📌 __dirname:", __dirname);
console.log("📌 EXCEL_PATH (.env):", process.env.EXCEL_PATH);

const importar = require("./importarExcel");

(async () => {
  const logDir = path.resolve(__dirname, "..", "logs");
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

  const logFile = path.join(logDir, "import.log");
  const now = new Date().toISOString();

  try {
    const r = await importar();
    const msg = `${now} ✅ Import OK | ${JSON.stringify(r)}\n`;
    fs.appendFileSync(logFile, msg);
    console.log(msg.trim());
    process.exit(0);
  } catch (e) {
    const msg = `${now} ❌ Import FAIL | ${e.message}\n`;
    fs.appendFileSync(logFile, msg);
    console.error(msg.trim());
    process.exit(1);
  }
})();