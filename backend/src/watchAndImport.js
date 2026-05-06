require("dotenv").config();
const fs = require("fs");
const path = require("path");

const importar = require("./importarExcel");

function resolveExcelPath() {
  const rel = process.env.EXCEL_PATH || "./uploads/jornadas.xlsx";
  return path.resolve(__dirname, "..", rel);
}

function ensureLogDir() {
  const logDir = path.resolve(__dirname, "..", "logs");
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
  return logDir;
}

function appendLog(line) {
  const logDir = ensureLogDir();
  const logFile = path.join(logDir, "import-watch.log");
  fs.appendFileSync(logFile, `${new Date().toISOString()} ${line}\n`);
}

let running = false;
let pending = false;
let timer = null;

async function runImport(reason) {
  if (running) {
    pending = true;
    return;
  }

  running = true;
  pending = false;

  try {
    appendLog(`START reason=${reason}`);
    const r = await importar();
    appendLog(`OK ${JSON.stringify(r)}`);
    console.log("Import OK:", r);
  } catch (e) {
    appendLog(`FAIL ${e.message}`);
    console.error("Import FAIL:", e.message);
  } finally {
    running = false;
    if (pending) runImport("pending");
  }
}

function debounceImport(reason) {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => runImport(reason), 800);
}

function watchFile(excelPath) {
  console.log("👀 Watch:", excelPath);
  appendLog(`WATCH ${excelPath}`);

  // fs.watch funciona bem na maioria dos casos; se falhar, cai no polling.
  try {
    fs.watch(excelPath, { persistent: true }, () => debounceImport("fs.watch"));
  } catch {
    fs.watchFile(
      excelPath,
      { interval: 1000, persistent: true },
      (curr, prev) => {
        if (curr.mtimeMs !== prev.mtimeMs) debounceImport("fs.watchFile");
      }
    );
  }
}

const excelPath = resolveExcelPath();

// roda uma vez ao iniciar
runImport("startup");

// garante diretório do arquivo (evita crash se ainda não existir)
fs.mkdirSync(path.dirname(excelPath), { recursive: true });

watchFile(excelPath);

