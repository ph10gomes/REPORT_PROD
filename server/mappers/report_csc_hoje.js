function parseTimeToMinutes(value) {
  if (value === null || value === undefined) return null;

  const s = String(value).trim();
  if (!s) return null;

  const timePart = (() => {
    if (s.includes("T")) return s.split("T").pop();
    if (s.includes(" ")) return s.split(" ").pop();
    return s;
  })();

  const match = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(timePart);
  if (!match) return null;

  const h = Number(match[1]);
  const m = Number(match[2]);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
  if (h < 0 || h > 47 || m < 0 || m > 59) return null;

  return h * 60 + m;
}

function extractHHMM(value) {
  if (value === null || value === undefined) return "";
  const s = String(value).trim();
  if (!s) return "";
  const m = /(\d{1,2}):(\d{2})/.exec(s);
  if (!m) return "";
  return `${String(Number(m[1])).padStart(2, "0")}:${m[2]}`;
}

function minutesToHHMM(totalMinutes) {
  if (!Number.isFinite(totalMinutes) || totalMinutes < 0) return "-";
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function computeJornadaProdutiva(row) {
  const start = parseTimeToMinutes(row.PRIMEIRO_ATENDIMENTO);
  const end = parseTimeToMinutes(row.ULTIMO_ATENDIMENTO);
  if (start === null || end === null) return "-";
  if (end < start) return "-";
  return minutesToHHMM(end - start);
}

function computeStatusJornada(row) {
  const primeiro = String(row.PRIMEIRO_ATENDIMENTO || "").trim();
  if (!primeiro) return "SEM ATENDIMENTO";

  // Regra combinada: se a Jornada Produtiva for >= 07:00, considerar como jornada completa.
  const start = parseTimeToMinutes(row.PRIMEIRO_ATENDIMENTO);
  const end = parseTimeToMinutes(row.ULTIMO_ATENDIMENTO);
  if (start === null || end === null) return "INCOMPLETA";
  if (end < start) return "INCOMPLETA";

  return end - start >= 7 * 60 ? "COMPLETA" : "INCOMPLETA";
}

function firstNonEmpty(...values) {
  for (const value of values) {
    const s = value === null || value === undefined ? "" : String(value).trim();
    if (s) return value;
  }
  return "";
}

function normalizeSpaces(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function mapHoraAtualizacaoToFaixa(value) {
  const n = Number(String(value ?? "").trim());
  if (!Number.isFinite(n)) return "";
  if (n < 7) return "";
  if (n <= 9) return "09";
  if (n <= 11) return "11";
  if (n <= 13) return "13";
  if (n <= 15) return "15";
  return "17";
}

function mapReportCscHojeRow(dbRow) {
  // Retorna somente o conjunto de colunas que o frontend usa (evita payload duplicado/triplicado).
  const codUo = dbRow.COD_UO ?? "";
  const codEquipe = dbRow.COD_EQUIPE ?? "";
  const numEquipe = dbRow.NUM_EQUIPE ?? "";
  const data = dbRow.DATA ?? "";
  const hora = mapHoraAtualizacaoToFaixa(dbRow.hora_atualizacao);
  const horaAtualizacaoRaw = dbRow.hora_atualizacao ?? "";

  const metaProg = dbRow.META ?? "";
  const producao = dbRow.US_EXEC ?? "";
  const classificacao = firstNonEmpty(
    dbRow.COD_CLASSIFICACAO_DINAMICO,
    dbRow.CLASSIFICACAO_EXEC_META,
    dbRow.CLASSIFICACAO_PREV_META
  );

  const nomeEquipe = firstNonEmpty(dbRow.NOME_EQUIPE, dbRow.NOME);

  const primeiroAtendRaw = firstNonEmpty(dbRow.PRIMEIRO_ATENDIMENTO, dbRow["1Âº Atendimento"], dbRow["1º Atendimento"]);
  const ultimoAtendRaw = firstNonEmpty(dbRow.ULTIMO_ATENDIMENTO, dbRow["Ult. Atendimento"]);
  const inicioRefeicaoRaw = firstNonEmpty(
    dbRow._INICIO_REFEICAO_ANY,
    dbRow.INICIO_REFEICAO,
    dbRow["INICIO REFEICAO"],
    dbRow["INICIO REFEIÇÃO"]
  );
  const terminoRefeicaoRaw = firstNonEmpty(
    dbRow._TERMINO_REFEICAO_ANY,
    dbRow.TERMINO_REFEICAO,
    dbRow["TERMINO REFEICAO"],
    dbRow["TERMINO REFEIÇÃO"]
  );
  const primeiroAtend = extractHHMM(primeiroAtendRaw) || String(primeiroAtendRaw || "");
  const ultimoAtend = extractHHMM(ultimoAtendRaw) || String(ultimoAtendRaw || "");
  const inicioRefeicao = extractHHMM(inicioRefeicaoRaw) || String(inicioRefeicaoRaw || "");
  const terminoRefeicao = extractHHMM(terminoRefeicaoRaw) || String(terminoRefeicaoRaw || "");
  const fimJornadaRaw = firstNonEmpty(dbRow._FIM_JORNADA_ANY, dbRow.FIM_JORNADA);
  const fimJornada = extractHHMM(fimJornadaRaw) || String(fimJornadaRaw || "");

  const jornadaProd = computeJornadaProdutiva(dbRow);
  const statusJornada = computeStatusJornada(dbRow);

  return {
    Data: data,
    Hora: hora,
    hora_atualizacao: horaAtualizacaoRaw,
    "Meta Prog.": metaProg,
    Executados: dbRow.EXECUTADOS ?? "",
    Produtivos: dbRow.PRODUTIVOS ?? "",
    Nome: nomeEquipe,
    NOME_EQUIPE: nomeEquipe,

    // UO/equipe (inclui variantes para compatibilidade com encoding)
    "Cód.UO": codUo,
    "CÃ³d.UO": codUo,
    "CÃƒÂ³d.UO": codUo,

    "Cód. Equipe": codEquipe,
    "CÃ³d. Equipe": codEquipe,
    "CÃƒÂ³d. Equipe": codEquipe,

    NUM_EQUIPE: numEquipe,
    TIPO_EQUIPE: firstNonEmpty(dbRow.TIPO_EQUIPE, dbRow.TIPO, dbRow.TIPO_VEICULO, dbRow.MODALIDADE, dbRow.PERFIL_EQUIPE),

    "SUPERVISOR - SETOR": normalizeSpaces(dbRow.NOME_SUPERVISOR ?? ""),
    "LIDER DE POSTO - SETOR": normalizeSpaces(dbRow.NOME_LIDER ?? ""),
    "CONTROLADOR - SETOR": normalizeSpaces(dbRow.NOME_CONTROLADOR ?? ""),

    // Classificação/produção (inclui variantes)
    "Classificação": classificacao,
    "ClassificaÃ§Ã£o": classificacao,

    "Produção": producao,
    "ProduÃ§Ã£o": producao,
    "ProduÃƒÂ§ÃƒÂ£o": producao,

    "1Âº Atendimento": primeiroAtend,
    "1º Atendimento": primeiroAtend,
    "Ult. Atendimento": ultimoAtend,

    INICIO_JORNADA: extractHHMM(dbRow.INICIO_JORNADA) || dbRow.INICIO_JORNADA,
    INICIO_REFEICAO: inicioRefeicao,
    TERMINO_REFEICAO: terminoRefeicao,
    FIM_JORNADA: fimJornada,
    "Fim Jornada": fimJornada,
    PRIMEIRO_ATENDIMENTO: extractHHMM(dbRow.PRIMEIRO_ATENDIMENTO) || dbRow.PRIMEIRO_ATENDIMENTO,
    ULTIMO_ATENDIMENTO: extractHHMM(dbRow.ULTIMO_ATENDIMENTO) || dbRow.ULTIMO_ATENDIMENTO,

    "Jornada Produtiva": jornadaProd,
    "Status Jornada": statusJornada,

    // Observações (quando existirem no banco)
    OBS: normalizeSpaces(dbRow.OBS ?? "")
  };
}

module.exports = { mapReportCscHojeRow };
