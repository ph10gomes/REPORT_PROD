const pool = require("./config/db");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

function formatarParaMySQL(date) {
  if (!date) return null;
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return null;

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

function converterData(valor) {
  if (valor === null || valor === undefined || valor === "") return null;

  if (typeof valor === "number") {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const ms = valor * 86400000;
    const d = new Date(excelEpoch.getTime() + ms);

    const local = new Date(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      d.getUTCHours(),
      d.getUTCMinutes(),
      d.getUTCSeconds()
    );

    return formatarParaMySQL(local);
  }

  if (typeof valor === "string" && valor.includes("/")) {
    const s = valor.trim();
    const [dataParte, horaParteRaw] = s.split(" ");
    const [dia, mes, ano] = dataParte.split("/");
    if (!dia || !mes || !ano) return null;

    let horaParte = (horaParteRaw || "00:00:00").trim();
    if (/^\d{1,2}:\d{2}$/.test(horaParte)) horaParte = `${horaParte}:00`;

    const m = horaParte.match(/^(\d{1,2}):(\d{2}):(\d{2})$/);
    const hh = m ? String(m[1]).padStart(2, "0") : "00";
    const mi = m ? String(m[2]).padStart(2, "0") : "00";
    const ss = m ? String(m[3]).padStart(2, "0") : "00";

    return `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")} ${hh}:${mi}:${ss}`;
  }

  const d = new Date(valor);
  if (!isNaN(d.getTime())) return formatarParaMySQL(d);

  return null;
}

function limitarTexto(v, max) {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  if (!s) return null;
  return s.length > max ? s.slice(0, max) : s;
}

function normalizarHora(v) {
  if (v === null || v === undefined) return "";
  const s = String(v).trim();
  if (!s) return "";

  if (/^\d{1,2}$/.test(s)) return s.padStart(2, "0");

  const n = Number(s);
  if (!Number.isNaN(n) && Number.isFinite(n) && n >= 0 && n <= 23) {
    return String(Math.trunc(n)).padStart(2, "0");
  }

  return s;
}

function extrairDataDia(datetimeMySQL) {
  if (!datetimeMySQL) return null;
  return String(datetimeMySQL).slice(0, 10); // YYYY-MM-DD
}

function normalizarCodUo(v) {
  if (v === null || v === undefined || v === "") return 0;
  const n = Number(v);
  if (Number.isFinite(n)) return Math.trunc(n);
  return 0;
}
function pegarCampo(obj, ...campos) {
  for (const c of campos) {
    const v = obj?.[c];
    if (v !== null && v !== undefined && String(v).trim() !== "") return v;
  }
  return null;
}

function pegarTexto(obj, max, ...campos) {
  const v = pegarCampo(obj, ...campos);
  return limitarTexto(v, max);
}
function obterDataBaseDaLinha(linha) {
  return (
    converterData(linha.INICIO_JORNADA) ||
    converterData(linha.PRIMEIRO_ATENDIMENTO) ||
    converterData(linha.INICIO_REFEICAO) ||
    converterData(linha.ULTIMO_ATENDIMENTO) ||
    converterData(linha.FIM_JORNADA) ||
    null
  );
}

async function importar() {
  const rel = process.env.EXCEL_PATH || "./uploads/jornadas.xlsx";

  // ✅ resolve relativo ao backend/ (porque estamos em src/)
  const caminho = path.resolve(__dirname, "..", rel);

  console.log("📄 EXCEL (resolvido):", caminho);

  if (!fs.existsSync(caminho)) {
    console.log("❌ Excel não encontrado:", caminho);
    return { inserted: 0, updated: 0, reason: "excel_not_found" };
  }

  const stat = fs.statSync(caminho);
  console.log("📄 Modificado:", stat.mtime.toISOString(), "| Tamanho:", stat.size);

  const workbook = XLSX.readFile(caminho);
  const sheetName = workbook.SheetNames[0];
  const dados = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: null });

  console.log("🧾 Colunas detectadas (linha 1):", Object.keys(dados[0] || {}));
  console.log("🧾 Exemplo de linha 1:", dados[0]);

  console.log("📊 Linhas no Excel:", dados.length);
  if (!dados.length) return { inserted: 0, updated: 0, reason: "empty_excel" };

  const linhas = [];

  for (const linha of dados) {
    const codUo = normalizarCodUo(linha.COD_UO);
    const nomeEqp = limitarTexto(linha.NOME_EQUIPE, 255);

    const inicioJornada = converterData(linha.INICIO_JORNADA);
    const dataBase = inicioJornada || obterDataBaseDaLinha(linha);
    const dataDia = extrairDataDia(converterData(linha.DATA) || dataBase);
    const horaKey = normalizarHora(linha.HORA);

    if (!dataDia || !nomeEqp) continue;

   linhas.push({
  COD_UO: codUo,

  // ✅ aceita variações do Excel
  SUPERVISOR_EQUIPE: pegarTexto(linha, 255, "SUPERVISOR_EQUIPE", "NOME_SUPERVISOR", "SUPERVISOR"),
  LIDER_CONTROLADOR: pegarTexto(linha, 255, "LIDER_CONTROLADOR", "NOME_LIDER", "LIDER"),
  NOME_CONTROLADOR: pegarTexto(linha, 255, "NOME_CONTROLADOR", "CONTROLADOR"),

  NOME_EQUIPE: nomeEqp,
  COD_CLASSIFICACAO_DINAMICO: pegarTexto(linha, 50, "COD_CLASSIFICACAO_DINAMICO", "CLASSIFICACAO", "COD_CLASSIFICACAO"),
  META: pegarCampo(linha, "META"),
  US_EXEC: pegarCampo(linha, "US_EXEC"),
  EXECUTADOS: pegarCampo(linha, "EXECUTADOS"),
  PRODUTIVOS: pegarCampo(linha, "PRODUTIVOS"),
  IMPRODUTIVOS: pegarCampo(linha, "IMPRODUTIVOS"),

  INICIO_JORNADA: inicioJornada,
  PRIMEIRO_ATENDIMENTO: converterData(linha.PRIMEIRO_ATENDIMENTO),
  INICIO_REFEICAO: converterData(linha.INICIO_REFEICAO),
  TERMINO_REFEICAO: converterData(linha.TERMINO_REFEICAO),
  ULTIMO_ATENDIMENTO: converterData(linha.ULTIMO_ATENDIMENTO),
  FIM_JORNADA: converterData(linha.FIM_JORNADA),

  HORA: horaKey,
  DATA_DIA: dataDia,
});
  }

 // ✅ AGORA É SÓ INSERT (SEM UPDATE)
let inserted = 0;
let replaced = 0;

const conn = await pool.getConnection();
try {
  await conn.beginTransaction();

  /* const datasParaSubstituir = Array.from(
    new Set(linhas.map((r) => r.DATA_DIA).filter(Boolean))
  );

  if (datasParaSubstituir.length) {
    const [result] = await conn.query(
      "DELETE FROM jornadas WHERE DATA_DIA IN (?)",
      [datasParaSubstituir]
    );
    deleted = result?.affectedRows ?? 0;
    console.log("Removidos (datas do Excel):", deleted);
  } */

  // Nao apaga o dia todo: apenas substitui a mesma equipe/hora/dia.
  if (linhas.length) {
    const tuples = linhas.map((r) => [r.DATA_DIA, r.COD_UO, r.NOME_EQUIPE, r.HORA]);
    const CHUNK = 200;

    for (let i = 0; i < tuples.length; i += CHUNK) {
      const chunk = tuples.slice(i, i + CHUNK);
      const placeholders = chunk.map(() => "(?, ?, ?, ?)").join(", ");
      const flat = chunk.flat();

      const [result] = await conn.query(
        `DELETE FROM jornadas WHERE (DATA_DIA, COD_UO, NOME_EQUIPE, HORA) IN (${placeholders})`,
        flat
      );

      replaced += result?.affectedRows ?? 0;
    }
  }

  for (const r of linhas) {
    await conn.query(
      `
      INSERT INTO jornadas (
        COD_UO,
        SUPERVISOR_EQUIPE,
        LIDER_CONTROLADOR,
        NOME_CONTROLADOR,
        NOME_EQUIPE,
        COD_CLASSIFICACAO_DINAMICO,
        META,
        US_EXEC,
        EXECUTADOS,
        PRODUTIVOS,
        IMPRODUTIVOS,
        INICIO_JORNADA,
        PRIMEIRO_ATENDIMENTO,
        INICIO_REFEICAO,
        TERMINO_REFEICAO,
        ULTIMO_ATENDIMENTO,
        FIM_JORNADA,
        HORA,
        DATA_DIA
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        r.COD_UO,
        r.SUPERVISOR_EQUIPE,
        r.LIDER_CONTROLADOR,
        r.NOME_CONTROLADOR,
        r.NOME_EQUIPE,
        r.COD_CLASSIFICACAO_DINAMICO,
        r.META,
        r.US_EXEC,
        r.EXECUTADOS,
        r.PRODUTIVOS,
        r.IMPRODUTIVOS,
        r.INICIO_JORNADA,
        r.PRIMEIRO_ATENDIMENTO,
        r.INICIO_REFEICAO,
        r.TERMINO_REFEICAO,
        r.ULTIMO_ATENDIMENTO,
        r.FIM_JORNADA,
        r.HORA,
        r.DATA_DIA,
      ]
    );

    inserted++;
  }

  await conn.commit();
  console.log(`✅ Importação OK | inseridos=${inserted}`);
  return { inserted, replaced, total: linhas.length };
} catch (e) {
  await conn.rollback();
  console.error("❌ Importação falhou (rollback):", e.code, e.message);
  throw e;
} finally {
  conn.release();
}
}

module.exports = importar;
