"use strict";

/* =========================
   CONFIG
========================= */
const API_URL = `${window.location.origin}/jornadas`;
const JUSTIFICATIVA_STORAGE_KEY = "jornada_justificativas_v1";
const LINHAS_POR_PAGINA = 20;
const SUPERVISORES_CONTAGEM = [
  "OTAVIO BARBOSA DE SOUZA",
  "CINTIA DEMARIA ALVES",
  "GILBERTO RODRIGO SILVA PAULO",
  "RALF DA SILVA",
  "MARCOS GIOVANE OLIVEIRA PINHEIRO",
  "WASHINGTON LEMES DO NASCIMENTO",
  "CLEYDIVAN NASCIMENTO SILVA",
  "LUIZ LAN APARECIDO DE SOUZA PINTO",
  "RENAN SILVA SANTOS MACHADO",
  "MARCONI CESAR TEIXEIRA JUNIOR",
];
const SUPERVISORES_CONTAGEM_SET = new Set(SUPERVISORES_CONTAGEM.map(normalizarTextoComparacao));
let dados = [];
let filtroKpiAtivo = null;
let justificativaAtual = null;
let paginaAtual = 1;
let filtrosColuna = {};

const COLUNAS_TABELA = [
  { key: "NOME_EQUIPE", label: "Equipes", filtravel: true },
  { key: "INICIO_JORNADA", label: "Início Jornada" },
  { key: "STATUS_INICIO", label: "Status Início", filtravel: true },
  { key: "PRIMEIRO_ATENDIMENTO", label: "1º Atend." },
  { key: "STATUS_PRIMEIRO", label: "Status 1º", filtravel: true },
  { key: "INICIO_REFEICAO", label: "Início Refeição" },
  { key: "TERMINO_REFEICAO", label: "Término Refeição" },
  { key: "STATUS_REFEICAO", label: "Status Refeição", filtravel: true },
  { key: "ULTIMO_ATENDIMENTO", label: "Último Serv." },
  { key: "STATUS_FINAL", label: "Status Final", filtravel: true },
  { key: "JORNADA_PROD", label: "Jornada Prod." },
  { key: "STATUS_PROD", label: "Status Prod.", filtravel: true },
  { key: "FIM_JORNADA", label: "Fim Jornada" },
  { key: "JORNADA", label: "Jornada" },
  { key: "STATUS_JORNADA", label: "Status", filtravel: true }
];

/* =========================
   METAS (por CLUSTER/PROCESSO)
   - tempos em minutos
========================= */
const METAS = {
  MFCA:    { PROCESSO: "EMERGÊNCIAL",    IMPRODUTIVO_PCT: 12, JORNADA_MIN: 450, P1_MIN: 60,  ULTIMO_MIN: 30 },
  MFIN:    { PROCESSO: "INSPEÇÃO",       IMPRODUTIVO_PCT: 12, JORNADA_MIN: 450, P1_MIN: 60,  ULTIMO_MIN: 30 },
  MFLG:    { PROCESSO: "LIGAÇÃO",        IMPRODUTIVO_PCT: 12, JORNADA_MIN: 420, P1_MIN: 90,  ULTIMO_MIN: 30 },
  MFPLD:   { PROCESSO: "EMERGÊNCIAL",    IMPRODUTIVO_PCT: 12, JORNADA_MIN: 450, P1_MIN: 60,  ULTIMO_MIN: 30 },
  MFPLT:   { PROCESSO: "EMERGÊNCIAL",    IMPRODUTIVO_PCT: 12, JORNADA_MIN: 450, P1_MIN: 60,  ULTIMO_MIN: 30 },
  MTCT:    { PROCESSO: "CORTE - RELIGA", IMPRODUTIVO_PCT: 15, JORNADA_MIN: 420, P1_MIN: 90,  ULTIMO_MIN: 30 },
  MTIN:    { PROCESSO: "INSPEÇÃO",       IMPRODUTIVO_PCT: 15, JORNADA_MIN: 450, P1_MIN: 60,  ULTIMO_MIN: 30 },
  MTMN:    { PROCESSO: "EMERGÊNCIAL",    IMPRODUTIVO_PCT: 15, JORNADA_MIN: 450, P1_MIN: 60,  ULTIMO_MIN: 30 },
  MTPL:    { PROCESSO: "EMERGÊNCIAL",    IMPRODUTIVO_PCT: 15, JORNADA_MIN: 450, P1_MIN: 60,  ULTIMO_MIN: 30 },
  MTRL:    { PROCESSO: "CORTE - RELIGA", IMPRODUTIVO_PCT: 15, JORNADA_MIN: 420, P1_MIN: 90,  ULTIMO_MIN: 30 },
  MTTOP20: { PROCESSO: "CORTE-RELIGA",   IMPRODUTIVO_PCT: 15, JORNADA_MIN: 420, P1_MIN: 90,  ULTIMO_MIN: 30 },
  MTVP:    { PROCESSO: "VISTORIA",       IMPRODUTIVO_PCT: 15, JORNADA_MIN: 450, P1_MIN: 60,  ULTIMO_MIN: 30 },
  MTAMI:   { PROCESSO: "OAMI",           IMPRODUTIVO_PCT: 15, JORNADA_MIN: 390, P1_MIN: 120, ULTIMO_MIN: 30 },
  MFPMG:   { PROCESSO: "EMERGÊNCIAL",    IMPRODUTIVO_PCT: 12, JORNADA_MIN: 450, P1_MIN: 60,  ULTIMO_MIN: 30 },
  MFAMI:   { PROCESSO: "OAMI",           IMPRODUTIVO_PCT: 15, JORNADA_MIN: 420, P1_MIN: 90,  ULTIMO_MIN: 30 },
};

/* =========================
   HORÁRIOS DE ENTRADA POR CLUSTER
   - ajuste conforme sua planilha
========================= */
const HORARIOS_ENTRADA = {
  MFCA:  ["05:00", "06:00", "07:00", "10:00", "13:00", "16:00", "17:00", "20:00", "21:00", "22:00"],
  MFPLD: ["05:00", "06:00", "07:00", "10:00", "13:00", "16:00", "17:00", "20:00", "21:00", "22:00"],
  MFPLT: ["05:00", "06:00", "07:00", "10:00", "13:00", "16:00", "17:00", "20:00", "21:00", "22:00"],
  MFPMG: ["05:00", "06:00", "07:00", "10:00", "13:00", "16:00", "17:00", "20:00", "21:00", "22:00"],


  MFIN:  ["05:00", "06:00", "07:00", "10:00", "13:00", "16:00", "17:00", "20:00", "21:00", "22:00"],
  MFLG:  ["05:00", "06:00", "07:00", "10:00", "13:00", "16:00", "17:00", "20:00", "21:00", "22:00"],
  MTCT:  ["07:00"],
  MTIN:  ["05:00", "06:00", "07:00", "10:00", "13:00", "16:00", "17:00", "20:00", "21:00", "22:00"],
  MTMN:  ["05:00", "06:00", "07:00", "10:00", "13:00", "16:00", "17:00", "20:00", "21:00", "22:00"],
  MTPL:  ["05:00", "06:00", "07:00", "10:00", "13:00", "16:00", "17:00", "20:00", "21:00", "22:00"],
  MTRL:  ["05:00", "06:00", "07:00", "10:00", "13:00", "16:00", "17:00", "20:00", "21:00", "22:00"],
  MTTOP20:["07:00"],
  MTVP:  ["07:00"],
  MTAMI: ["07:00"],
  MFAMI: ["07:00"]
};

/* =========================
   LIMITES
========================= */
const TOLERANCIA_ENTRADA_MIN = 15;
const LIMITE_REFEICAO_MIN = 60;
const REFEICAO_OBRIGATORIA_APOS_MIN = 240;
const TOLERANCIA_JORNADA_MIN = 15;
const SEM_ENCERRAMENTO_APOS_MIN = 120;
const MINUTOS_MINIMOS_PARA_VIRADA_DIA = 720;

function abrirMenuPrincipal() {
  window.parent.document.getElementById("btnMenuModo")?.click();
}

function informarAlturaParaPai() {
  if (window.parent === window) return;

  const bodyHeight = document.body ? document.body.scrollHeight : 0;
  const docHeight = document.documentElement ? document.documentElement.scrollHeight : 0;
  const altura = Math.max(bodyHeight, docHeight, 600);

  window.parent.postMessage({
    type: "jornada:height",
    height: altura
  }, "*");
}

function abrirModalPosicionado(modal, origemEl) {
  if (!modal) return;

  const topoOrigem = origemEl?.getBoundingClientRect?.().top ?? 24;
  const topoCalculado = Math.max(16, topoOrigem - 20);

  modal.style.paddingTop = `${Math.round(topoCalculado)}px`;
  modal.classList.add("aberto");
}

function exibirStatus(mensagem = "-", tipo = "info") {
  const status = document.getElementById("statusBar");
  if (!status) return;
  status.textContent = mensagem;
  status.style.background = tipo === "erro" ? "#ffd6d6" : "#fff5c2";
  status.style.color = tipo === "erro" ? "#941c1c" : "#313131";
}

function debounce(func, wait = 180) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarFiltrosPeriodo();
  prepararCabecalhosComFiltro();
  registrarEventosUmaVez();
  carregarDados();
  setInterval(() => carregarDados(true), 60000);
  informarAlturaParaPai();
  window.addEventListener("resize", informarAlturaParaPai);
  document.addEventListener("click", fecharDropdownFiltrosAoClicarFora);
});

/* =========================
   CARREGAR DADOS
========================= */
async function carregarDados(silencioso = false) {
  exibirStatus("Atualizando dados...");

  try {
    const res = await fetch(montarUrlJornadas(), { cache: "no-store" });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`HTTP ${res.status}: ${txt}`);
    }

    const novo = await res.json();
    if (!Array.isArray(novo)) throw new Error("API não retornou um array.");

    dados = novo.map(normalizarRegistro);
    sincronizarFiltroData();

    atualizarFiltrosCascata(true);
    atualizarTudo();
    informarAlturaParaPai();

    exibirStatus(`Dados carregados: ${dados.length} linhas. Última atualização ${new Date().toLocaleTimeString()}`);

    if (!silencioso) {
      console.log("✅ Dados carregados:", dados.length);
      console.log("Exemplo:", dados[0]);
    }
  } catch (e) {
    console.error("❌ Erro ao carregar dados:", e.message);
    exibirStatus(`Erro ao carregar dados: ${e.message}`, "erro");
  }
}

/* =========================
   NORMALIZAÇÃO + REGRAS
========================= */
function normalizarRegistro(r) {
  const SUP = pegarCampo(r, "SUPERVISOR_EQUIPE", "NOME_SUPERVISOR", "SUPERVISOR");
  const LID = pegarCampo(r, "LIDER_CONTROLADOR", "NOME_LIDER", "LIDER");
  const CTRL = pegarCampo(r, "NOME_CONTROLADOR", "CONTROLADOR");

  const inicio = hora(r.INICIO_JORNADA);
  const primeiro = hora(r.PRIMEIRO_ATENDIMENTO);
  const iniRef = hora(r.INICIO_REFEICAO ?? r.INI_REFEICAO);
  const fimRef = hora(r.TERMINO_REFEICAO ?? r.FIM_REFEICAO);
  const ultimo = hora(r.ULTIMO_ATENDIMENTO);
  const fimJornada = hora(r.FIM_JORNADA);
  const horaTurno = extrairHoraTurno(r.atualizado_em) || String(r.HORA ?? "").padStart(2, "0");

  const dataDiaISO = somenteData(r.DATA_DIA) || somenteData(r.atualizado_em);

  const base = {
    ...r,
    COD_UO: r.COD_UO ?? "",
    SUPERVISOR_EQUIPE: String(SUP || "").trim(),
    LIDER_CONTROLADOR: String(LID || "").trim(),
    NOME_CONTROLADOR: String(CTRL || "").trim(),
    NOME_EQUIPE: String(r.NOME_EQUIPE || "").trim(),
    COD_CLASSIFICACAO_DINAMICO: String(r.COD_CLASSIFICACAO_DINAMICO || "").trim(),
    HORA: r.HORA ?? "",
    HORA_TURNO: horaTurno,
    INICIO_JORNADA: inicio,
    PRIMEIRO_ATENDIMENTO: primeiro,
    INICIO_REFEICAO: iniRef,
    TERMINO_REFEICAO: fimRef,
    ULTIMO_ATENDIMENTO: ultimo,
    FIM_JORNADA: fimJornada,
    DATA_DIA: dataDiaISO,
  };

  const calc = calcularStatusPorMeta(base);

  return {
    ...base,
    JORNADA: calc.JORNADA_TXT,
    JORNADA_PROD: calc.JORNADA_PROD_TXT,

    STATUS_INICIO: calc.STATUS_INICIO,
    STATUS_PRIMEIRO: calc.STATUS_PRIMEIRO,
    STATUS_REFEICAO: calc.STATUS_REFEICAO,
    STATUS_FINAL: calc.STATUS_ULTIMO,
    STATUS_PROD: calc.STATUS_PROD,
    STATUS_JORNADA: calc.STATUS_JORNADA,

    CLUSTER: calc.CLUSTER,
    PROCESSO: calc.PROCESSO,

    _MIN_P1: calc.MIN_P1,
    _MIN_REF: calc.MIN_REF,
    _MIN_ULTIMO: calc.MIN_ULTIMO,
    _MIN_JORNADA_PROD: calc.MIN_JORNADA_PROD,
    _MIN_JORNADA: calc.MIN_JORNADA,
  };
}

/* =========================
   REGRAS / RELAÇÕES (metas)
========================= */
function extrairCluster(nomeEquipe) {
  const s = String(nomeEquipe || "");
  const parts = s.split("-");
  if (parts.length >= 2) return parts[1].trim().toUpperCase();
  return "";
}

function horarioValidoParaCluster(cluster, horaReal) {
  if (!cluster || !horaReal) return false;

  const horarios = HORARIOS_ENTRADA[cluster] || [];
  const realMin = hhmmToMin(horaReal);

  if (realMin === null) return false;

  return horarios.some(h => {
    const previstoMin = hhmmToMin(h);
    return previstoMin !== null && Math.abs(realMin - previstoMin) <= TOLERANCIA_ENTRADA_MIN;
  });
}

function calcularStatusPorMeta(reg) {
  const cluster = extrairCluster(reg.NOME_EQUIPE);
  const meta = METAS[cluster] || null;

  const inicio = reg.INICIO_JORNADA;
  const primeiro = reg.PRIMEIRO_ATENDIMENTO;
  const iniRef = reg.INICIO_REFEICAO;
  const fimRef = reg.TERMINO_REFEICAO;
  const ultimo = reg.ULTIMO_ATENDIMENTO;
  const fim = reg.FIM_JORNADA;

  const temMovimento = !!(inicio || primeiro || iniRef || fimRef || ultimo || fim);

  const MIN_P1 = (inicio && primeiro) ? diffMin(inicio, primeiro) : null;
  const referenciaOperacao = obterReferenciaOperacao(reg, fim, ultimo);
  const MIN_REF = (iniRef && fimRef) ? diffMinComVirada(iniRef, fimRef) : null;
  const MIN_ULTIMO = (ultimo && fim) ? diffMin(ultimo, fim) : null;
  const MIN_JORNADA_PROD = (primeiro && ultimo)
    ? diffMinComVirada(primeiro, ultimo, { permitirVirada: true })
    : null;

  const fimParcial = inicio ? (fim || referenciaOperacao) : null;
  const MIN_JORNADA = (inicio && fimParcial)
    ? diffMinComVirada(inicio, fimParcial, { permitirVirada: true })
    : null;

  // 1) STATUS INÍCIO
  let STATUS_INICIO = "NÃO INICIADA";
  if (inicio) {
    STATUS_INICIO = horarioValidoParaCluster(cluster, inicio)
      ? "NORMAL"
      : "DIVERGÊNCIA";
  } else if (temMovimento) {
    STATUS_INICIO = "DIVERGÊNCIA";
  }

  // 2) STATUS 1º ATENDIMENTO
  let STATUS_PRIMEIRO = "";
  if (inicio) {
    if (!primeiro) {
      STATUS_PRIMEIRO = "ACIMA DO PREVISTO";
    } else {
      const limite = meta?.P1_MIN ?? 60;
      STATUS_PRIMEIRO = (MIN_P1 !== null && MIN_P1 <= limite)
        ? "NORMAL"
        : "ACIMA DO PREVISTO";
    }
  }

  // 3) STATUS REFEIÇÃO
  let STATUS_REFEICAO = "";
  const MIN_DESDE_INICIO = (inicio && referenciaOperacao)
    ? diffMinComVirada(inicio, referenciaOperacao, { permitirVirada: true })
    : null;
  if (!iniRef && !fimRef) {
    if (!inicio) {
      STATUS_REFEICAO = "";
    } else {
      STATUS_REFEICAO = (MIN_DESDE_INICIO !== null && MIN_DESDE_INICIO >= REFEICAO_OBRIGATORIA_APOS_MIN)
        ? "NÃO REGISTRADA"
        : "AGUARDANDO REFEIÇÃO";
    }
  } else if (iniRef && !fimRef) {
    const minEmRefeicao = referenciaOperacao ? diffMinComVirada(iniRef, referenciaOperacao) : null;
    STATUS_REFEICAO = (minEmRefeicao !== null && minEmRefeicao <= LIMITE_REFEICAO_MIN)
      ? "EM REFEIÇÃO"
      : "ATRASO RETORNO";
  } else if (!iniRef && fimRef) {
    STATUS_REFEICAO = "DIVERGÊNCIA";
  } else if (iniRef && fimRef) {
    STATUS_REFEICAO = (MIN_REF !== null && MIN_REF <= LIMITE_REFEICAO_MIN)
      ? "NORMAL"
      : "ATRASO RETORNO";
  }

  // 4) STATUS ÚLTIMO SERVIÇO
  let STATUS_ULTIMO = "";
  let MIN_ULTIMO_REAL = null;

  if (ultimo && inicio) {
    const referenciaFinal = obterReferenciaUltimoServico(reg, fim);
    MIN_ULTIMO_REAL = referenciaFinal
      ? diffMinComVirada(ultimo, referenciaFinal, { permitirVirada: true })
      : null;

    const limite = meta?.ULTIMO_MIN ?? 30;
    STATUS_ULTIMO = (MIN_ULTIMO_REAL !== null && MIN_ULTIMO_REAL <= limite)
      ? "NORMAL"
      : "TEMPO PARADO EXCESSIVO";
  }

  // 5) STATUS JORNADA
  let STATUS_JORNADA = "NÃO INICIADA";
  let JORNADA_TXT = "";

  // Jornada Prod = ultimo - primeiro atendimento
  let STATUS_PROD = "";
  let JORNADA_PROD_TXT = "";
  if (MIN_JORNADA_PROD !== null && MIN_JORNADA_PROD >= 0) {
    JORNADA_PROD_TXT = minToHHMM(MIN_JORNADA_PROD);
    STATUS_PROD = MIN_JORNADA_PROD >= 420 ? "COMPLETA" : "INCOMPLETA";
  }

  if (inicio) {
    if (MIN_JORNADA !== null && MIN_JORNADA >= 0) {
      JORNADA_TXT = minToHHMM(MIN_JORNADA);
    }

    if (!fim) {
      const minNec = meta?.JORNADA_MIN ?? 420;
      const passouMuitoDoPrevisto = MIN_JORNADA !== null && MIN_JORNADA > (minNec + SEM_ENCERRAMENTO_APOS_MIN);
      STATUS_JORNADA = (!registroEhHoje(reg) || passouMuitoDoPrevisto)
        ? "SEM ENCERRAMENTO"
        : "EM ANDAMENTO";
    } else {
      const minNec = meta?.JORNADA_MIN ?? 420;
      STATUS_JORNADA = (MIN_JORNADA !== null && MIN_JORNADA >= (minNec - TOLERANCIA_JORNADA_MIN))
        ? "NORMAL"
        : "INCOMPLETA";
    }
  } else if (temMovimento) {
    STATUS_JORNADA = "DIVERGÊNCIA";
  }

  return {
    CLUSTER: cluster,
    PROCESSO: meta?.PROCESSO ?? "",

    STATUS_INICIO,
    STATUS_PRIMEIRO,
    STATUS_REFEICAO,
    STATUS_ULTIMO,
    STATUS_JORNADA,
    STATUS_PROD,

    JORNADA_TXT,
    JORNADA_PROD_TXT,

    MIN_P1,
    MIN_REF,
    MIN_ULTIMO: MIN_ULTIMO_REAL,
    MIN_JORNADA_PROD,
    MIN_JORNADA
  };
}

/* =========================
   EVENTOS
========================= */
function registrarEventosUmaVez() {
  const changeHandler = debounce(() => {
    paginaAtual = 1;
    atualizarFiltrosCascata(false);
    atualizarTudo();
  }, 120);

  const periodoHandler = debounce(() => {
    paginaAtual = 1;
    filtroKpiAtivo = null;
    filtrosColuna = {};
    atualizarVisibilidadeFiltrosPeriodo();
    carregarDados();
  }, 180);

  ["filtroUO", "filtroSupervisor", "filtroLider", "filtroControlador", "filtroTurno"]
    .forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("change", changeHandler);
    });

  ["filtroTipoPeriodo", "filtroDataAnalisada", "filtroSemanaAnalisada", "filtroMesAnalisado", "filtroDataInicio", "filtroDataFim"]
    .forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("change", periodoHandler);
    });

  bindKpi("kpiTotalEqpDia", "TOTAL");
  bindKpi("kpiTotalEqpDDia", "D");
  bindKpi("kpiEqpAtivas", "NAO_INICIADA");
  bindKpi("kpiTotalEqpEfetivaDia", "EFETIVA");
  bindKpi("kpiAtrasoInicio", "ATRASO_INICIO");
  bindKpi("kpiDemoraAtend", "DEMORA_ATEND");
  bindKpi("kpiDesvioUltAtend", "DESVIO_ULT");
  bindKpi("kpiJornadaIncompleta", "JORNADA_INCOMPLETA");

  const modal = document.getElementById("modalDetalhes");
  const btnFecharModal = document.getElementById("modalClose");
  const btnDownloadModal = document.getElementById("btnDownloadModal");
  const btnExportarTabelaImagem = document.getElementById("btnExportarTabelaImagem");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("aberto");
        modal.style.paddingTop = "";
        const titulo = modal.querySelector("h2");
        if (titulo) titulo.textContent = "Detalhes da Equipe";
      }
    });
  }
  if (btnFecharModal) {
    btnFecharModal.addEventListener("click", () => {
      if (!modal) return;
      modal.classList.remove("aberto");
      modal.style.paddingTop = "";
      const titulo = modal.querySelector("h2");
      if (titulo) titulo.textContent = "Detalhes da Equipe";
    });
  }
  if (btnDownloadModal && btnDownloadModal.dataset.bound !== "true") {
    btnDownloadModal.dataset.bound = "true";
    btnDownloadModal.addEventListener("click", () => {
      const area = modal?.querySelector(".modal-content");
      if (!area || !window.html2canvas) return exibirStatus("html2canvas não carregado", "erro");

      html2canvas(area, { backgroundColor: "white", scale: 2 })
        .then(canvas => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = `modal_${hojeISO()}.png`;
          link.click();
          exibirStatus("Imagem do modal gerada");
        })
        .catch(err => {
          exibirStatus("Falha ao gerar imagem", "erro");
          console.error(err);
        });
    });
  }
  if (btnExportarTabelaImagem && btnExportarTabelaImagem.dataset.bound !== "true") {
    btnExportarTabelaImagem.dataset.bound = "true";
    btnExportarTabelaImagem.addEventListener("click", exportarTabelaComoImagem);
  }
}

function exportarTabelaComoImagem() {
  const tabela = document.getElementById("tabelaRelatorio");
  if (!tabela || !window.html2canvas) {
    exibirStatus("Não foi possível exportar a imagem da tabela.", "erro");
    return;
  }

  const area = document.createElement("div");
  area.className = "area-exportacao-imagem";
  area.innerHTML = `
    <div class="cabecalho-exportacao-imagem">
      <div>
        <span>Report Jornada</span>
        <strong>Painel Analítico</strong>
      </div>
      <div class="periodo-exportacao-imagem">${safe(obterTextoPeriodoExportacao())}</div>
    </div>
  `;

  const kpis = document.querySelector(".kpi-strip");
  if (kpis) {
    const kpisClone = kpis.cloneNode(true);
    kpisClone.classList.add("kpi-strip-exportacao");
    area.appendChild(kpisClone);
  }

  const tabelaClone = tabela.cloneNode(true);
  tabelaClone.querySelectorAll(".dropdown-filtro-coluna").forEach(el => el.remove());
  tabelaClone.querySelectorAll(".btn-filtro-cabecalho").forEach((btn) => {
    const th = btn.closest("th");
    if (th) th.innerHTML = btn.querySelector("span")?.innerHTML || th.textContent;
  });
  area.appendChild(tabelaClone);
  document.body.appendChild(area);

  html2canvas(area, {
    backgroundColor: "#ffffff",
    scale: 2,
    windowWidth: Math.max(area.scrollWidth, 1600),
    windowHeight: area.scrollHeight
  })
    .then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `report_jornada_${obterSufixoPeriodoArquivo()}.png`;
      link.click();
      exibirStatus("Imagem da tabela gerada.");
    })
    .catch((error) => {
      console.error(error);
      exibirStatus("Falha ao gerar imagem da tabela.", "erro");
    })
    .finally(() => {
      area.remove();
    });
}

function exportarParaCsv(dadosCsv) {
  if (!dadosCsv || !dadosCsv.length) {
    exibirStatus("Nada para exportar", "erro");
    return;
  }

  const colunas = [
    "NOME_EQUIPE", "COD_UO", "SUPERVISOR_EQUIPE", "LIDER_CONTROLADOR", "NOME_CONTROLADOR", "DATA_DIA", "HORA",
    "INICIO_JORNADA", "STATUS_INICIO", "PRIMEIRO_ATENDIMENTO", "STATUS_PRIMEIRO",
    "INICIO_REFEICAO", "TERMINO_REFEICAO", "STATUS_REFEICAO",
    "ULTIMO_ATENDIMENTO", "STATUS_FINAL", "FIM_JORNADA", "STATUS_JORNADA", "JORNADA", "JUSTIFICATIVA"
  ];

  const linhas = [colunas.join(",")];
  dadosCsv.forEach(reg => {
    const valores = colunas.map(c => {
      const bruto = c === "JUSTIFICATIVA" ? obterJustificativa(reg) : reg[c];
      return `"${String(bruto ?? "").replace(/"/g, '""')}"`;
    });
    linhas.push(valores.join(","));
  });

  const blob = new Blob([linhas.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `jornada_${hojeISO()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  exibirStatus("Exportação CSV concluída", "info");
}


function bindKpi(idNumeroKpi, tipo) {
  const elNumero = document.getElementById(idNumeroKpi);
  if (!elNumero) return;
  const card = elNumero.closest(".kpi-item") || elNumero;
  card.style.cursor = "pointer";
  card.addEventListener("click", () => ativarKpi(tipo, card));
}

function ativarKpi(tipo, cardClicado) {
  filtroKpiAtivo = (filtroKpiAtivo === tipo) ? null : tipo;
  paginaAtual = 1;
  document.querySelectorAll(".kpi-item").forEach(k => k.classList.remove("ativa"));
  if (filtroKpiAtivo && cardClicado?.classList) cardClicado.classList.add("ativa");
  preencherTabela();
  informarAlturaParaPai();
}

function inicializarFiltrosPeriodo() {
  const dataHoje = hojeISO();
  setValorSeVazio("filtroMesAnalisado", dataHoje.slice(0, 7));
  setValorSeVazio("filtroDataInicio", dataHoje);
  setValorSeVazio("filtroDataFim", dataHoje);
  setValorSeVazio("filtroSemanaAnalisada", obterSemanaIso(dataHoje));
  atualizarVisibilidadeFiltrosPeriodo();
}

function setValorSeVazio(id, valorPadrao) {
  const el = document.getElementById(id);
  if (el && !el.value) el.value = valorPadrao;
}

function atualizarVisibilidadeFiltrosPeriodo() {
  const tipo = valor("filtroTipoPeriodo") || "dia";
  document.querySelectorAll("[data-periodo-campo]").forEach((el) => {
    el.classList.toggle("hidden", el.dataset.periodoCampo !== tipo);
  });
}

function montarUrlJornadas() {
  const url = new URL(API_URL, window.location.origin);
  const periodo = obterPeriodoSelecionado();
  if (periodo.dataInicio) url.searchParams.set("dataInicio", periodo.dataInicio);
  if (periodo.dataFim) url.searchParams.set("dataFim", periodo.dataFim);
  return url.toString();
}

function obterPeriodoSelecionado() {
  const tipo = valor("filtroTipoPeriodo") || "dia";

  if (tipo === "semana") {
    const semana = valor("filtroSemanaAnalisada") || obterSemanaIso(hojeISO());
    return obterRangeSemanaIso(semana);
  }

  if (tipo === "mes") {
    const mes = valor("filtroMesAnalisado") || hojeISO().slice(0, 7);
    return obterRangeMes(mes);
  }

  if (tipo === "periodo") {
    const inicio = valor("filtroDataInicio") || hojeISO();
    const fim = valor("filtroDataFim") || inicio;
    return inicio <= fim
      ? { dataInicio: inicio, dataFim: fim }
      : { dataInicio: fim, dataFim: inicio };
  }

  const data = valor("filtroDataAnalisada") || obterDataBaseMaisRecente();
  if (!data) return {};
  return { dataInicio: data, dataFim: data };
}

function obterTextoPeriodoExportacao() {
  const tipo = valor("filtroTipoPeriodo") || "dia";
  const periodo = obterPeriodoSelecionado();

  if (tipo === "semana") {
    return `Semana ${valor("filtroSemanaAnalisada") || obterSemanaIso(hojeISO())} | ${formatarDataBr(periodo.dataInicio)} a ${formatarDataBr(periodo.dataFim)}`;
  }

  if (tipo === "mes") {
    return `Mês ${formatarMesBr(valor("filtroMesAnalisado") || hojeISO().slice(0, 7))} | ${formatarDataBr(periodo.dataInicio)} a ${formatarDataBr(periodo.dataFim)}`;
  }

  if (tipo === "periodo") {
    return `Período ${formatarDataBr(periodo.dataInicio)} a ${formatarDataBr(periodo.dataFim)}`;
  }

  return `Dia ${formatarDataBr(periodo.dataInicio || obterDataBaseMaisRecente() || hojeISO())}`;
}

function obterSufixoPeriodoArquivo() {
  const periodo = obterPeriodoSelecionado();
  const inicio = periodo.dataInicio || obterDataBaseMaisRecente() || hojeISO();
  const fim = periodo.dataFim || inicio;
  return inicio === fim ? inicio : `${inicio}_a_${fim}`;
}

function formatarDataBr(dataIso) {
  const match = String(dataIso || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return dataIso || "-";
  return `${match[3]}/${match[2]}/${match[1]}`;
}

function formatarMesBr(valorMes) {
  const match = String(valorMes || "").match(/^(\d{4})-(\d{2})$/);
  if (!match) return valorMes || "-";
  return `${match[2]}/${match[1]}`;
}

function obterRangeMes(valorMes) {
  const [ano, mes] = String(valorMes || "").split("-").map(Number);
  if (!ano || !mes) return { dataInicio: hojeISO(), dataFim: hojeISO() };
  const inicio = `${ano}-${String(mes).padStart(2, "0")}-01`;
  const fimDate = new Date(ano, mes, 0);
  return { dataInicio: inicio, dataFim: fimDate.toISOString().slice(0, 10) };
}

function obterSemanaIso(dataIso) {
  const date = new Date(`${dataIso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const firstDayNr = (firstThursday.getDay() + 6) % 7;
  firstThursday.setDate(firstThursday.getDate() - firstDayNr + 3);
  const week = 1 + Math.round((target - firstThursday) / 604800000);
  return `${target.getFullYear()}-W${String(week).padStart(2, "0")}`;
}

function obterRangeSemanaIso(semanaIso) {
  const match = String(semanaIso || "").match(/^(\d{4})-W(\d{2})$/);
  if (!match) return { dataInicio: hojeISO(), dataFim: hojeISO() };
  const ano = Number(match[1]);
  const semana = Number(match[2]);
  const simple = new Date(ano, 0, 1 + (semana - 1) * 7);
  const day = simple.getDay();
  const monday = new Date(simple);
  monday.setDate(simple.getDate() - (day === 0 ? 6 : day - 1));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return {
    dataInicio: monday.toISOString().slice(0, 10),
    dataFim: sunday.toISOString().slice(0, 10)
  };
}

/* =========================
   CASCATA REAL
========================= */
function atualizarFiltrosCascata(inicial = false) {
  const selUO = valor("filtroUO");
  const selSup = valor("filtroSupervisor");
  const selLider = valor("filtroLider");
  const selCtrl = valor("filtroControlador");
  const selTurno = valor("filtroTurno");

  const baseEscopo = dados.filter(r => supervisorDentroDaContagem(r.SUPERVISOR_EQUIPE));
  const baseData = baseEscopo;

  preencherSelect("filtroUO", extrairUnicos(baseData, "COD_UO"), "GERAL", true);
  const uoAtual = valor("filtroUO");

  const baseUo = baseData.filter(r => !uoAtual || String(r.COD_UO) === String(uoAtual));
  const supervisoresDisponiveis = SUPERVISORES_CONTAGEM.filter(nome =>
    baseUo.some(r => supervisoresIguais(r.SUPERVISOR_EQUIPE, nome))
  );

  preencherSelect("filtroSupervisor", supervisoresDisponiveis, "TODOS", true);
  const supAtual = valor("filtroSupervisor");

  const baseSupervisor = baseUo.filter(r => !supAtual || supervisoresIguais(r.SUPERVISOR_EQUIPE, supAtual));

  const baseLider = baseSupervisor;
  preencherSelect("filtroLider", extrairUnicos(baseLider, "LIDER_CONTROLADOR"), "TODOS", true);
  const liderAtual = valor("filtroLider");

  const baseCtrl = baseLider.filter(r => !liderAtual || r.LIDER_CONTROLADOR === liderAtual);
  preencherSelect("filtroControlador", extrairUnicos(baseCtrl, "NOME_CONTROLADOR"), "TODOS", true);
  const ctrlAtual = valor("filtroControlador");

  const baseTurno = baseCtrl.filter(r => !ctrlAtual || r.NOME_CONTROLADOR === ctrlAtual);
  preencherSelect("filtroTurno", extrairUnicos(baseTurno, "HORA_TURNO"), "TODOS", true);

  if (!inicial) {
    if (selUO && !extrairUnicos(baseData, "COD_UO").map(String).includes(String(selUO))) setValor("filtroUO", "");
    if (selSup && !supervisoresDisponiveis.some(s => supervisoresIguais(s, selSup))) setValor("filtroSupervisor", "");
    if (selLider && !extrairUnicos(baseLider, "LIDER_CONTROLADOR").includes(selLider)) setValor("filtroLider", "");
    if (selCtrl && !extrairUnicos(baseCtrl, "NOME_CONTROLADOR").includes(selCtrl)) setValor("filtroControlador", "");
    if (selTurno && !extrairUnicos(baseTurno, "HORA_TURNO").map(String).includes(String(selTurno))) setValor("filtroTurno", "");
  }
}

/* =========================
   FILTROS
========================= */
function aplicarFiltros() {
  const uo = valor("filtroUO");
  const sup = valor("filtroSupervisor");
  const lider = valor("filtroLider");
  const ctrl = valor("filtroControlador");
  const turno = valor("filtroTurno");

  return dados.filter(l =>
    supervisorDentroDaContagem(l.SUPERVISOR_EQUIPE) &&
    (!uo || String(l.COD_UO) === String(uo)) &&
    (!sup || supervisoresIguais(l.SUPERVISOR_EQUIPE, sup)) &&
    (!lider || l.LIDER_CONTROLADOR === lider) &&
    (!ctrl || l.NOME_CONTROLADOR === ctrl) &&
    (!turno || String(l.HORA_TURNO) === String(turno))
  );
}

/* =========================
   AGRUPAMENTO (1 linha por equipe)
========================= */
function pontuarRegistro(r) {
  let p = 0;
  if (r.INICIO_JORNADA) p += 5;
  if (r.PRIMEIRO_ATENDIMENTO) p += 4;
  if (r.INICIO_REFEICAO) p += 2;
  if (r.TERMINO_REFEICAO) p += 2;
  if (r.ULTIMO_ATENDIMENTO) p += 3;
  if (r.FIM_JORNADA) p += 5;
  if (r.atualizado_em) p += 1;
  return p;
}

function escolherMelhorRegistro(lista) {
  return lista.sort((a, b) => {
    const ta = Date.parse(a.atualizado_em || "") || 0;
    const tb = Date.parse(b.atualizado_em || "") || 0;
    if (tb !== ta) return tb - ta;

    const pa = pontuarRegistro(a);
    const pb = pontuarRegistro(b);
    if (pb !== pa) return pb - pa;

    const fa = Date.parse(a.FIM_JORNADA || "") || 0;
    const fb = Date.parse(b.FIM_JORNADA || "") || 0;
    return fb - fa;
  })[0];
}

function agruparPorEquipe(lista) {
  const map = new Map();
  for (const r of lista) {
    const key = String(r.NOME_EQUIPE || "").trim();
    if (!key) continue;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(r);
  }
  return [...map.values()].map((grupo) =>
    deveConsolidarMediaPeriodo() ? consolidarMediaEquipePeriodo(grupo) : escolherMelhorRegistro(grupo)
  );
}

function deveConsolidarMediaPeriodo() {
  return ["semana", "mes"].includes(valor("filtroTipoPeriodo"));
}

function consolidarMediaEquipePeriodo(grupo) {
  const registrosDia = obterUltimosRegistrosPorDia(grupo);
  const principal = escolherMelhorRegistro([...registrosDia]);
  const mediaHora = (campo) => minParaHoraMedia(
    registrosDia
      .map(row => hhmmToMin(row[campo]))
      .filter(Number.isFinite)
  );
  const mediaDuracao = (campo) => minParaHoraMedia(
    registrosDia
      .map(row => row[campo])
      .filter(Number.isFinite)
  );
  const somaNumero = (campo) => registrosDia.reduce((total, row) => total + numeroOuZero(row[campo]), 0);
  const mediaNumero = (campo) => {
    const valores = registrosDia.map(row => numeroOuNulo(row[campo])).filter(Number.isFinite);
    if (!valores.length) return principal[campo];
    return valores.reduce((total, valor) => total + valor, 0) / valores.length;
  };

  const consolidado = {
    ...principal,
    INICIO_JORNADA: mediaHora("INICIO_JORNADA"),
    PRIMEIRO_ATENDIMENTO: mediaHora("PRIMEIRO_ATENDIMENTO"),
    INICIO_REFEICAO: mediaHora("INICIO_REFEICAO"),
    TERMINO_REFEICAO: mediaHora("TERMINO_REFEICAO"),
    ULTIMO_ATENDIMENTO: mediaHora("ULTIMO_ATENDIMENTO"),
    FIM_JORNADA: mediaHora("FIM_JORNADA"),
    JORNADA_PROD: mediaDuracao("_MIN_JORNADA_PROD"),
    JORNADA: mediaDuracao("_MIN_JORNADA"),
    META: mediaNumero("META"),
    PRODUCAO: somaNumero("PRODUCAO"),
    SERVICOS_EXECUTADOS: somaNumero("SERVICOS_EXECUTADOS"),
    PRODUTIVOS: somaNumero("PRODUTIVOS"),
    IMPRODUTIVOS: somaNumero("IMPRODUTIVOS"),
    QTD_REGISTROS_PERIODO: grupo.length
  };

  const statusMedia = calcularStatusMediaPeriodo(consolidado, {
    minP1: mediaMinutos(registrosDia, "_MIN_P1"),
    minRef: mediaMinutos(registrosDia, "_MIN_REF"),
    minUltimo: mediaMinutos(registrosDia, "_MIN_ULTIMO"),
    minJornadaProd: mediaMinutos(registrosDia, "_MIN_JORNADA_PROD"),
    minJornada: mediaMinutos(registrosDia, "_MIN_JORNADA")
  });

  return {
    ...consolidado,
    ...statusMedia
  };
}

function minParaHoraMedia(valores) {
  if (!valores.length) return "";
  const media = Math.round(valores.reduce((total, valor) => total + valor, 0) / valores.length);
  return minToHHMM(media);
}

function obterUltimosRegistrosPorDia(grupo) {
  const map = new Map();
  grupo.forEach((row) => {
    const data = row.DATA_DIA || somenteData(row.atualizado_em) || "sem-data";
    const atual = map.get(data);
    if (!atual || compararRegistroMaisRecenteDia(row, atual) > 0) {
      map.set(data, row);
    }
  });
  return [...map.values()].sort((a, b) => String(a.DATA_DIA || "").localeCompare(String(b.DATA_DIA || "")));
}

function compararRegistroMaisRecenteDia(a, b) {
  const dataA = Date.parse(a.atualizado_em || "") || 0;
  const dataB = Date.parse(b.atualizado_em || "") || 0;
  if (dataA !== dataB) return dataA - dataB;

  const horaA = Number(String(a.HORA || a.HORA_TURNO || "").replace(/\D/g, "")) || -1;
  const horaB = Number(String(b.HORA || b.HORA_TURNO || "").replace(/\D/g, "")) || -1;
  if (horaA !== horaB) return horaA - horaB;

  return pontuarRegistro(a) - pontuarRegistro(b);
}

function mediaMinutos(grupo, campo) {
  const valores = grupo.map(row => row[campo]).filter(Number.isFinite);
  if (!valores.length) return null;
  return Math.round(valores.reduce((total, valor) => total + valor, 0) / valores.length);
}

function calcularStatusMediaPeriodo(reg, medias) {
  const cluster = extrairCluster(reg.NOME_EQUIPE);
  const meta = METAS[cluster] || null;
  const inicio = reg.INICIO_JORNADA;
  const primeiro = reg.PRIMEIRO_ATENDIMENTO;
  const iniRef = reg.INICIO_REFEICAO;
  const fimRef = reg.TERMINO_REFEICAO;
  const ultimo = reg.ULTIMO_ATENDIMENTO;
  const fim = reg.FIM_JORNADA;
  const temMovimento = !!(inicio || primeiro || iniRef || fimRef || ultimo || fim);

  let STATUS_INICIO = "NÃO INICIADA";
  if (inicio) {
    STATUS_INICIO = horarioValidoParaCluster(cluster, inicio) ? "NORMAL" : "DIVERGÊNCIA";
  } else if (temMovimento) {
    STATUS_INICIO = "DIVERGÊNCIA";
  }

  let STATUS_PRIMEIRO = "";
  if (inicio) {
    if (!primeiro) {
      STATUS_PRIMEIRO = "ACIMA DO PREVISTO";
    } else {
      const limite = meta?.P1_MIN ?? 60;
      STATUS_PRIMEIRO = medias.minP1 !== null && medias.minP1 <= limite ? "NORMAL" : "ACIMA DO PREVISTO";
    }
  }

  let STATUS_REFEICAO = "";
  if (!iniRef && !fimRef) {
    STATUS_REFEICAO = inicio ? "NÃO REGISTRADA" : "";
  } else if (iniRef && !fimRef) {
    STATUS_REFEICAO = "ATRASO RETORNO";
  } else if (!iniRef && fimRef) {
    STATUS_REFEICAO = "DIVERGÊNCIA";
  } else {
    STATUS_REFEICAO = medias.minRef !== null && medias.minRef <= LIMITE_REFEICAO_MIN ? "NORMAL" : "ATRASO RETORNO";
  }

  let STATUS_FINAL = "";
  if (ultimo && inicio) {
    const limite = meta?.ULTIMO_MIN ?? 30;
    STATUS_FINAL = medias.minUltimo !== null && medias.minUltimo <= limite ? "NORMAL" : "TEMPO PARADO EXCESSIVO";
  }

  const STATUS_PROD = medias.minJornadaProd !== null
    ? (medias.minJornadaProd >= 420 ? "COMPLETA" : "INCOMPLETA")
    : "";

  let STATUS_JORNADA = "NÃO INICIADA";
  if (inicio) {
    if (!fim) {
      STATUS_JORNADA = "SEM ENCERRAMENTO";
    } else {
      const minNec = meta?.JORNADA_MIN ?? 420;
      STATUS_JORNADA = medias.minJornada !== null && medias.minJornada >= (minNec - TOLERANCIA_JORNADA_MIN)
        ? "NORMAL"
        : "INCOMPLETA";
    }
  } else if (temMovimento) {
    STATUS_JORNADA = "DIVERGÊNCIA";
  }

  return {
    STATUS_INICIO,
    STATUS_PRIMEIRO,
    STATUS_REFEICAO,
    STATUS_FINAL,
    STATUS_PROD,
    STATUS_JORNADA
  };
}

function numeroOuNulo(value) {
  if (value === null || value === undefined || value === "") return null;
  const texto = String(value).trim();
  const normalizado = texto.includes(",")
    ? texto.replace(/\./g, "").replace(",", ".")
    : texto;
  const numero = Number(normalizado);
  return Number.isFinite(numero) ? numero : null;
}

function numeroOuZero(value) {
  return numeroOuNulo(value) ?? 0;
}

/* =========================
   TABELA
========================= */
function preencherTabela() {
  const tbody = document.getElementById("tbodyTabela");
  const paginacao = document.getElementById("tablePagination");
  if (!tbody) return;

  tbody.innerHTML = "";
  if (paginacao) paginacao.innerHTML = "";

  let lista = agruparPorEquipe(aplicarFiltros());

  if (filtroKpiAtivo === "D") {
    lista = lista.filter(l => String(l.COD_CLASSIFICACAO_DINAMICO || "") === "D");
  }
  if (filtroKpiAtivo === "NAO_INICIADA") {
    lista = lista.filter(l => !l.INICIO_JORNADA);
  }
  if (filtroKpiAtivo === "EFETIVA") {
    lista = lista.filter(l => !!l.INICIO_JORNADA);
  }
  if (filtroKpiAtivo === "ATRASO_INICIO") {
    lista = lista.filter(l => l.STATUS_INICIO === "DIVERGÊNCIA");
  }
  if (filtroKpiAtivo === "DEMORA_ATEND") {
    lista = lista.filter(l => l.STATUS_PRIMEIRO === "ACIMA DO PREVISTO");
  }
  if (filtroKpiAtivo === "DESVIO_ULT") {
    lista = lista.filter(l => l.STATUS_FINAL === "TEMPO PARADO EXCESSIVO");
  }
  if (filtroKpiAtivo === "JORNADA_INCOMPLETA") {
    lista = lista.filter(l => ["INCOMPLETA", "SEM ENCERRAMENTO"].includes(l.STATUS_JORNADA));
  }

  const listaAntesFiltrosColuna = lista;
  lista = aplicarFiltrosColuna(lista);
  atualizarOpcoesFiltrosCabecalho(listaAntesFiltrosColuna);

  if (!lista.length) {
    tbody.innerHTML = `<tr><td colspan="15">Nenhum registro</td></tr>`;
    return;
  }

  const totalPaginas = Math.max(1, Math.ceil(lista.length / LINHAS_POR_PAGINA));
  if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;

  const inicioPagina = (paginaAtual - 1) * LINHAS_POR_PAGINA;
  const fimPagina = inicioPagina + LINHAS_POR_PAGINA;
  const listaPagina = lista.slice(inicioPagina, fimPagina);

  const modal = document.getElementById("modalDetalhes");
  const modalBody = document.getElementById("modalBody");

  function abrirModal(l, origemEl = null) {
    if (!modal || !modalBody) return;
    const titulo = modal.querySelector("h2");
    if (titulo) titulo.textContent = "Detalhes da Equipe";
    justificativaAtual = l;
    const justificativa = obterJustificativa(l);
    modalBody.innerHTML = `
      <div><strong>Equipe:</strong> ${safe(l.NOME_EQUIPE)}</div>
      <div><strong>UO:</strong> ${safe(l.COD_UO)}</div>
      <div><strong>Supervisor:</strong> ${safe(l.SUPERVISOR_EQUIPE)}</div>
      <div><strong>Líder:</strong> ${safe(l.LIDER_CONTROLADOR)}</div>
      <div><strong>Controlador:</strong> ${safe(l.NOME_CONTROLADOR)}</div>
      <div><strong>Início:</strong> ${safe(l.INICIO_JORNADA)} • ${safe(l.STATUS_INICIO)}</div>
      <div><strong>1º:</strong> ${safe(l.PRIMEIRO_ATENDIMENTO)} • ${safe(l.STATUS_PRIMEIRO)}</div>
      <div><strong>Refeição:</strong> ${safe(l.INICIO_REFEICAO)} - ${safe(l.TERMINO_REFEICAO)} • ${safe(l.STATUS_REFEICAO)}</div>
      <div><strong>Último:</strong> ${safe(l.ULTIMO_ATENDIMENTO)} • ${safe(l.STATUS_FINAL)}</div>
      <div><strong>Jornada Prod.:</strong> ${safe(l.JORNADA_PROD)} • ${safe(l.STATUS_PROD)}</div>
      <div><strong>Fim Jornada:</strong> ${safe(l.FIM_JORNADA)}</div>
      <div><strong>Jornada:</strong> ${safe(l.JORNADA)} • ${safe(l.STATUS_JORNADA)}</div>
      <div><strong>Meta:</strong> ${safeOrDash(l.META)}</div>
      <div><strong>Produção:</strong> ${safeOrDash(l.PRODUCAO)}</div>
      <div><strong>Serviços Executados:</strong> ${safeOrDash(l.SERVICOS_EXECUTADOS)}</div>
      <div><strong>Produtivos:</strong> ${safeOrDash(l.PRODUTIVOS)}</div>
      <div><strong>Improdutivos:</strong> ${safeOrDash(l.IMPRODUTIVOS)}</div>
      ${l.QTD_REGISTROS_PERIODO ? `<div><strong>Registros no período:</strong> ${safeOrDash(l.QTD_REGISTROS_PERIODO)}</div>` : ""}
      <hr style="margin:12px 0; border:none; border-top:1px solid #e5e7eb;">
      <div style="font-weight:700; margin-bottom:6px;">Justificativa</div>
      <textarea id="textareaJustificativaDetalhes" class="textarea-justificativa" placeholder="Digite a justificativa da equipe..."></textarea>
      <div class="justificativa-acoes" style="margin-top:8px;">
        <button id="btnSalvarJustificativaDetalhes" type="button">Salvar</button>
        <button id="btnLimparJustificativaDetalhes" type="button" class="btn-secundario">Limpar</button>
      </div>
    `;
    abrirModalPosicionado(modal, origemEl);

    const textarea = document.getElementById("textareaJustificativaDetalhes");
    if (textarea) textarea.value = justificativa;

    document.getElementById("btnSalvarJustificativaDetalhes")?.addEventListener("click", salvarJustificativaDetalhes);
    document.getElementById("btnLimparJustificativaDetalhes")?.addEventListener("click", limparJustificativaDetalhes);
  }

  const btnDownloadModal = document.getElementById("btnDownloadModal");
  if (btnDownloadModal && btnDownloadModal.dataset.bound !== "true") {
    btnDownloadModal.dataset.bound = "true";
    btnDownloadModal.addEventListener("click", () => {
      const area = modal?.querySelector(".modal-content");
      if (!area || !window.html2canvas) return exibirStatus("html2canvas não carregado", "erro");

      html2canvas(area, { backgroundColor: "white", scale: 2 })
        .then(canvas => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = `modal_${hojeISO()}.png`;
          link.click();
          exibirStatus("Imagem do modal gerada");
        })
        .catch(err => {
          exibirStatus("Falha ao gerar imagem", "erro");
          console.error(err);
        });
    });
  }

  listaPagina.forEach(l => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${deveConsolidarMediaPeriodo() ? `<button class="btn-equipe-periodo" type="button">${safe(l.NOME_EQUIPE)}</button>` : safe(l.NOME_EQUIPE)}</td>

      <td>${safe(l.INICIO_JORNADA)}</td>
      <td class="${classe(l.STATUS_INICIO)}">${safe(l.STATUS_INICIO)}</td>

      <td>${safe(l.PRIMEIRO_ATENDIMENTO)}</td>
      <td class="${classe(l.STATUS_PRIMEIRO)}">${safe(l.STATUS_PRIMEIRO)}</td>

      <td>${safe(l.INICIO_REFEICAO)}</td>
      <td>${safe(l.TERMINO_REFEICAO)}</td>
      <td class="${classe(l.STATUS_REFEICAO)}">${safe(l.STATUS_REFEICAO)}</td>

      <td>${safe(l.ULTIMO_ATENDIMENTO)}</td>
      <td class="${classe(l.STATUS_FINAL)}">${safe(l.STATUS_FINAL)}</td>

      <td>${safe(l.JORNADA_PROD)}</td>
      <td class="${classe(l.STATUS_PROD)}">${safe(l.STATUS_PROD)}</td>
      <td>${safe(l.FIM_JORNADA)}</td>
      <td>${safe(l.JORNADA)}</td>
      <td class="${classe(l.STATUS_JORNADA)}">${safe(l.STATUS_JORNADA)}</td>
    `;
    tr.style.cursor = "pointer";
    if (deveConsolidarMediaPeriodo()) {
      tr.querySelector(".btn-equipe-periodo")?.addEventListener("click", (event) => {
        event.stopPropagation();
        abrirModalHistoricoEquipePeriodo(l, tr);
      });
    } else {
      tr.addEventListener("click", () => abrirModal(l, tr));
    }
    tbody.appendChild(tr);
  });

  renderizarPaginacao(totalPaginas);
}

function aplicarFiltrosColuna(lista) {
  const ativos = Object.entries(filtrosColuna).filter(([, valorFiltro]) => valorFiltro);
  if (!ativos.length) return lista;
  return lista.filter((row) =>
    ativos.every(([key, valorFiltro]) => normalizarValorFiltro(row[key]) === String(valorFiltro))
  );
}

function abrirModalHistoricoEquipePeriodo(equipeSelecionada, origemEl = null) {
  const modal = document.getElementById("modalDetalhes");
  const modalBody = document.getElementById("modalBody");
  if (!modal || !modalBody) return;

  const rows = obterUltimosRegistrosPorDia(
    aplicarFiltros().filter(row => mesmoRegistroEquipe(row, equipeSelecionada))
  );

  modal.querySelector("h2").textContent = `Histórico da Equipe - ${equipeSelecionada.NOME_EQUIPE}`;
  modalBody.innerHTML = `
    <div class="modal-tabela-wrap">
      <table class="tabela-historico-equipe">
        <thead>
          <tr>
            <th>Data</th>
            <th>Equipes</th>
            <th>Início<br>Jornada</th>
            <th>Status<br>Início</th>
            <th>1º<br>Atend.</th>
            <th>Status<br>1º</th>
            <th>Início<br>Refeição</th>
            <th>Término<br>Refeição</th>
            <th>Status<br>Refeição</th>
            <th>Último<br>Serv.</th>
            <th>Status<br>Final</th>
            <th>Jornada<br>Prod.</th>
            <th>Status<br>Prod.</th>
            <th>Fim<br>Jornada</th>
            <th>Jornada</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(row => `
            <tr>
              <td>${safe(formatarDataBr(row.DATA_DIA))}</td>
              <td>${safe(row.NOME_EQUIPE)}</td>
              <td>${safe(row.INICIO_JORNADA)}</td>
              <td class="${classe(row.STATUS_INICIO)}">${safe(row.STATUS_INICIO)}</td>
              <td>${safe(row.PRIMEIRO_ATENDIMENTO)}</td>
              <td class="${classe(row.STATUS_PRIMEIRO)}">${safe(row.STATUS_PRIMEIRO)}</td>
              <td>${safe(row.INICIO_REFEICAO)}</td>
              <td>${safe(row.TERMINO_REFEICAO)}</td>
              <td class="${classe(row.STATUS_REFEICAO)}">${safe(row.STATUS_REFEICAO)}</td>
              <td>${safe(row.ULTIMO_ATENDIMENTO)}</td>
              <td class="${classe(row.STATUS_FINAL)}">${safe(row.STATUS_FINAL)}</td>
              <td>${safe(row.JORNADA_PROD)}</td>
              <td class="${classe(row.STATUS_PROD)}">${safe(row.STATUS_PROD)}</td>
              <td>${safe(row.FIM_JORNADA)}</td>
              <td>${safe(row.JORNADA)}</td>
              <td class="${classe(row.STATUS_JORNADA)}">${safe(row.STATUS_JORNADA)}</td>
            </tr>
          `).join("") || `<tr><td colspan="16">Nenhum registro encontrado</td></tr>`}
        </tbody>
      </table>
    </div>
  `;

  abrirModalPosicionado(modal, origemEl);
}

function mesmoRegistroEquipe(row, equipeSelecionada) {
  const campos = ["NOME_EQUIPE", "COD_UO", "SUPERVISOR_EQUIPE", "LIDER_CONTROLADOR", "NOME_CONTROLADOR"];
  return campos.every((campo) => {
    const valorSelecionado = String(equipeSelecionada?.[campo] ?? "").trim();
    if (!valorSelecionado) return true;
    return String(row?.[campo] ?? "").trim() === valorSelecionado;
  });
}

function prepararCabecalhosComFiltro() {
  const cabecalhos = document.querySelectorAll("#tabelaRelatorio thead tr:first-child th");
  cabecalhos.forEach((th, index) => {
    const coluna = COLUNAS_TABELA[index];
    if (!coluna?.filtravel) return;
    th.classList.add("th-filtravel");
    th.dataset.coluna = coluna.key;
    th.title = `Filtrar ${coluna.label}`;

    const conteudo = th.innerHTML;
    th.innerHTML = `
      <button class="btn-filtro-cabecalho" type="button" data-coluna="${safeAttr(coluna.key)}">
        <span>${conteudo}</span>
        <span class="icone-filtro-cabecalho">▾</span>
      </button>
      <div class="dropdown-filtro-coluna" data-dropdown-coluna="${safeAttr(coluna.key)}"></div>
    `;
  });

  document.querySelectorAll(".btn-filtro-cabecalho").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      alternarDropdownFiltro(btn.dataset.coluna);
    });
  });
}

function atualizarOpcoesFiltrosCabecalho(listaBase = []) {
  COLUNAS_TABELA.filter(coluna => coluna.filtravel).forEach((coluna) => {
    const dropdown = document.querySelector(`[data-dropdown-coluna="${CSS.escape(coluna.key)}"]`);
    if (!dropdown) return;
    const valores = extrairUnicos(listaBase, coluna.key)
      .map(v => normalizarValorFiltro(v))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }));
    const atual = filtrosColuna[coluna.key] || "";
    dropdown.innerHTML = `
      <button class="opcao-filtro-coluna${!atual ? " selecionada" : ""}" type="button" data-coluna="${safeAttr(coluna.key)}" data-valor="">Todos</button>
      ${valores.map(v => `<button class="opcao-filtro-coluna${v === atual ? " selecionada" : ""}" type="button" data-coluna="${safeAttr(coluna.key)}" data-valor="${safeAttr(v)}">${safe(v)}</button>`).join("")}
    `;
  });

  document.querySelectorAll(".opcao-filtro-coluna").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      const key = btn.dataset.coluna;
      if (!key) return;
      if (btn.dataset.valor) filtrosColuna[key] = btn.dataset.valor;
      else delete filtrosColuna[key];
      paginaAtual = 1;
      fecharDropdownFiltros();
      preencherTabela();
      informarAlturaParaPai();
    });
  });

  atualizarEstadoCabecalhosFiltrados();
}

function alternarDropdownFiltro(key) {
  const dropdown = document.querySelector(`[data-dropdown-coluna="${CSS.escape(key)}"]`);
  if (!dropdown) return;
  const deveAbrir = !dropdown.classList.contains("aberto");
  fecharDropdownFiltros();
  if (deveAbrir) dropdown.classList.add("aberto");
}

function fecharDropdownFiltros() {
  document.querySelectorAll(".dropdown-filtro-coluna.aberto").forEach((el) => el.classList.remove("aberto"));
}

function fecharDropdownFiltrosAoClicarFora(event) {
  if (event.target.closest(".th-filtravel")) return;
  fecharDropdownFiltros();
}

function atualizarEstadoCabecalhosFiltrados() {
  COLUNAS_TABELA.filter(coluna => coluna.filtravel).forEach((coluna) => {
    const th = document.querySelector(`th[data-coluna="${CSS.escape(coluna.key)}"]`);
    th?.classList.toggle("filtro-ativo", Boolean(filtrosColuna[coluna.key]));
  });
}

function normalizarValorFiltro(value) {
  const texto = String(value ?? "").trim();
  return texto || "-";
}

/* =========================
   KPIs
========================= */
function atualizarTudo() {
  const lista = aplicarFiltrosColuna(agruparPorEquipe(aplicarFiltros()));
  const equipes = [...new Set(lista.map(l => l.NOME_EQUIPE).filter(Boolean))];

  const d = lista.filter(l => String(l.COD_CLASSIFICACAO_DINAMICO || "") === "D");
  const eqD = new Set(d.map(l => l.NOME_EQUIPE)).size;

  setText("kpiTotalEqpDia", equipes.length);
  setText("kpiTotalEqpDDia", eqD);
  setText("kpiPercEqpD", equipes.length ? ((eqD / equipes.length) * 100).toFixed(1) + "%" : "0%");

  const naoIniciadas = equipes.filter(eq => !lista.some(l => l.NOME_EQUIPE === eq && l.INICIO_JORNADA));
  setText("kpiEqpAtivas", naoIniciadas.length);
  setText("kpiTotalEqpEfetivaDia", equipes.length - naoIniciadas.length);

  const atrasoInicio = lista.filter(l => l.STATUS_INICIO === "DIVERGÊNCIA").length;
  setText("kpiAtrasoInicio", atrasoInicio);

  const demoraP1 = lista.filter(l => l.STATUS_PRIMEIRO === "ACIMA DO PREVISTO").length;
  setText("kpiDemoraAtend", demoraP1);

  const desvioUlt = lista.filter(l => l.STATUS_FINAL === "TEMPO PARADO EXCESSIVO").length;
  setText("kpiDesvioUltAtend", desvioUlt);

  const incompleta = lista.filter(l => ["INCOMPLETA", "SEM ENCERRAMENTO"].includes(l.STATUS_JORNADA)).length;
  setText("kpiJornadaIncompleta", incompleta);

  preencherTabela();
}

function renderizarPaginacao(totalPaginas) {
  const paginacao = document.getElementById("tablePagination");
  if (!paginacao) return;

  paginacao.innerHTML = "";
  if (totalPaginas <= 1) return;

  const paginas = obterPaginasVisiveis(totalPaginas, paginaAtual);
  paginas.forEach((pagina) => {
    if (pagina === "...") {
      const span = document.createElement("span");
      span.className = "pagination-ellipsis";
      span.textContent = "...";
      paginacao.appendChild(span);
      return;
    }

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = `pagination-btn${pagina === paginaAtual ? " ativo" : ""}`;
    botao.textContent = String(pagina);
    botao.addEventListener("click", () => {
      paginaAtual = pagina;
      preencherTabela();
      informarAlturaParaPai();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    paginacao.appendChild(botao);
  });
}

function obterPaginasVisiveis(totalPaginas, paginaAtualRef) {
  if (totalPaginas <= 9) return Array.from({ length: totalPaginas }, (_, i) => i + 1);
  const paginas = [1];
  const inicio = Math.max(2, paginaAtualRef - 2);
  const fim = Math.min(totalPaginas - 1, paginaAtualRef + 2);
  if (inicio > 2) paginas.push("...");
  for (let pagina = inicio; pagina <= fim; pagina += 1) paginas.push(pagina);
  if (fim < totalPaginas - 1) paginas.push("...");
  paginas.push(totalPaginas);
  return paginas;
}

/* =========================
   HELPERS
========================= */
function preencherSelect(id, lista, label, preservar = false) {
  const s = document.getElementById(id);
  if (!s) return;

  const anterior = s.value;
  s.innerHTML = `<option value="">${label}</option>`;

  lista.forEach(v => {
    s.innerHTML += `<option value="${safeAttr(v)}">${safe(v)}</option>`;
  });

  if (preservar && lista.map(String).includes(String(anterior))) {
    s.value = anterior;
  }
}

function extrairUnicos(lista, campo) {
  return [...new Set(
    lista
      .map(l => l[campo])
      .filter(v => v !== null && v !== undefined && String(v).trim() !== "")
  )];
}

function valor(id) {
  const el = document.getElementById(id);
  return el ? el.value : "";
}

function setValor(id, v) {
  const el = document.getElementById(id);
  if (el) el.value = v;
}

function carregarMapaJustificativas() {
  try {
    const bruto = localStorage.getItem(JUSTIFICATIVA_STORAGE_KEY);
    if (!bruto) return {};

    const mapa = JSON.parse(bruto);
    return mapa && typeof mapa === "object" ? mapa : {};
  } catch {
    return {};
  }
}

function salvarMapaJustificativas(mapa) {
  localStorage.setItem(JUSTIFICATIVA_STORAGE_KEY, JSON.stringify(mapa));
}

function obterChaveJustificativa(reg) {
  return [
    reg.DATA_DIA || obterDataFiltroAtiva() || "sem-data",
    reg.COD_UO || "",
    reg.NOME_EQUIPE || ""
  ].join("|");
}

function obterJustificativa(reg) {
  try {
    const mapa = carregarMapaJustificativas();
    return String(mapa[obterChaveJustificativa(reg)] || "");
  } catch {
    return "";
  }
}

function abrirModalJustificativa(reg, origemEl = null) {
  justificativaAtual = reg;

  const modal = document.getElementById("modalJustificativa");
  const meta = document.getElementById("justificativaMeta");
  const textarea = document.getElementById("textareaJustificativa");
  if (!modal || !meta || !textarea) return;

  meta.textContent = `${safe(reg.NOME_EQUIPE)} • ${safe(reg.DATA_DIA || obterDataFiltroAtiva())}`;
  textarea.value = obterJustificativa(reg);
  abrirModalPosicionado(modal, origemEl);
  textarea.focus();
}

function fecharModalJustificativa() {
  justificativaAtual = null;
  const modal = document.getElementById("modalJustificativa");
  if (modal) {
    modal.classList.remove("aberto");
    modal.style.paddingTop = "";
  }
}

function salvarJustificativaAtual() {
  if (!justificativaAtual) return;

  const textarea = document.getElementById("textareaJustificativa");
  if (!textarea) return;

  const texto = textarea.value.trim();

  try {
    const mapa = carregarMapaJustificativas();
    const chave = obterChaveJustificativa(justificativaAtual);
    if (texto) {
      mapa[chave] = texto;
    } else {
      delete mapa[chave];
    }
    salvarMapaJustificativas(mapa);

    exibirStatus("Justificativa salva com sucesso.");
    fecharModalJustificativa();
    atualizarTudo();
  } catch (erro) {
    console.error(erro);
    exibirStatus("Não foi possível salvar a justificativa.", "erro");
  }
}

function salvarJustificativaDetalhes() {
  if (!justificativaAtual) return;

  const textarea = document.getElementById("textareaJustificativaDetalhes");
  if (!textarea) return;

  const texto = textarea.value.trim();

  try {
    const mapa = carregarMapaJustificativas();
    const chave = obterChaveJustificativa(justificativaAtual);
    if (texto) {
      mapa[chave] = texto;
    } else {
      delete mapa[chave];
    }
    salvarMapaJustificativas(mapa);

    exibirStatus("Justificativa salva com sucesso.");
  } catch (erro) {
    console.error(erro);
    exibirStatus("Não foi possível salvar a justificativa.", "erro");
  }
}

function limparJustificativaDetalhes() {
  if (!justificativaAtual) return;

  const textarea = document.getElementById("textareaJustificativaDetalhes");
  if (textarea) textarea.value = "";

  try {
    const mapa = carregarMapaJustificativas();
    const chave = obterChaveJustificativa(justificativaAtual);
    delete mapa[chave];
    salvarMapaJustificativas(mapa);

    exibirStatus("Justificativa removida.");
  } catch (erro) {
    console.error(erro);
    exibirStatus("Não foi possível remover a justificativa.", "erro");
  }
}

function obterDataBaseMaisRecente() {
  const datas = extrairUnicos(dados, "DATA_DIA").sort();
  return datas.length ? datas[datas.length - 1] : "";
}

function obterDataFiltroAtiva() {
  return valor("filtroDataAnalisada") || obterDataBaseMaisRecente() || hojeISO();
}

function sincronizarFiltroData() {
  const campo = document.getElementById("filtroDataAnalisada");
  if (!campo) return;

  const dataAtual = campo.value;
  const dataMaisRecente = obterDataBaseMaisRecente();
  if (!dataMaisRecente) return;

  const datasDisponiveis = extrairUnicos(dados, "DATA_DIA");
  if (!dataAtual || !datasDisponiveis.includes(dataAtual)) {
    campo.value = dataMaisRecente;
  }
}

function setText(id, v) {
  const el = document.getElementById(id);
  if (el) el.textContent = v;
}

function normalizarTextoComparacao(v) {
  return String(v || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function supervisorDentroDaContagem(supervisor) {
  return SUPERVISORES_CONTAGEM_SET.has(normalizarTextoComparacao(supervisor));
}

function supervisoresIguais(a, b) {
  return normalizarTextoComparacao(a) === normalizarTextoComparacao(b);
}

function safeOrDash(v) {
  const texto = safe(v).trim();
  return texto === "" ? "-" : texto;
}

function safe(v) {
  if (v === null || v === undefined) return "";
  return String(v);
}

function safeAttr(v) {
  return safe(v).replace(/"/g, "&quot;");
}

function somenteData(v) {
  if (!v) return "";
  const s = String(v);
  const m = s.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : "";
}

function hojeISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function hora(v) {
  if (!v) return "";
  const s = String(v).trim();

  const m = s.match(/\b(\d{1,2}):(\d{2})\b/);
  if (m) return `${String(m[1]).padStart(2, "0")}:${m[2]}`;

  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) {
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  return "";
}

function extrairHoraTurno(v) {
  const hhmm = hora(v);
  if (!hhmm) return "";
  return hhmm.slice(0, 2);
}

function hhmmToMin(hhmm) {
  if (!hhmm) return null;
  const m = String(hhmm).trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  return Number(m[1]) * 60 + Number(m[2]);
}

function diffMin(h1, h2) {
  const a = hhmmToMin(h1);
  const b = hhmmToMin(h2);
  if (a === null || b === null) return null;
  return b - a;
}

function diffMinComVirada(h1, h2, { permitirVirada = false } = {}) {
  const diff = diffMin(h1, h2);
  if (diff === null) return null;
  if (diff >= 0) return diff;

  if (permitirVirada && Math.abs(diff) >= MINUTOS_MINIMOS_PARA_VIRADA_DIA) {
    return diff + 1440;
  }

  return null;
}

function obterReferenciaUltimoServico(reg, fimJornada) {
  if (fimJornada) return fimJornada;

  const horaAtualizacao = hora(reg.atualizado_em);
  if (horaAtualizacao) return horaAtualizacao;

  const dataRegistro = reg.DATA_DIA || somenteData(reg.atualizado_em);
  if (dataRegistro && dataRegistro === hojeISO()) return horaAgoraHHMM();

  return "";
}

function obterReferenciaOperacao(reg, fimJornada, ultimoAtendimento) {
  if (fimJornada) return fimJornada;

  const horaAtualizacao = hora(reg.atualizado_em);
  if (horaAtualizacao) return horaAtualizacao;

  if (registroEhHoje(reg)) return horaAgoraHHMM();

  return ultimoAtendimento || "";
}

function registroEhHoje(reg) {
  const dataRegistro = reg.DATA_DIA || somenteData(reg.atualizado_em);
  return !!dataRegistro && dataRegistro === hojeISO();
}

function minToHHMM(min) {
  const hh = String(Math.floor(min / 60)).padStart(2, "0");
  const mm = String(min % 60).padStart(2, "0");
  return `${hh}:${mm}`;
}

function horaAgoraHHMM() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function classe(v) {
  if (!v) return "";
  v = String(v).toUpperCase();

  if (v.includes("DIVERG")) return "status-divergencia";
  if (v.includes("AGUARDANDO")) return "status-aguardando";
  if (v.includes("EM REFEI")) return "status-andamento";
  if (v.includes("EM ANDAMENTO")) return "status-andamento";
  if (v.includes("SEM ENCERRAMENTO")) return "status-sem-encerramento";
  if (v.includes("ACIMA")) return "status-acima";
  if (v.includes("ATRASO")) return "status-atraso";
  if (v.includes("NAO REGISTRADA") || v.includes("NÃO REGISTRADA")) return "status-nao-registrada";
  if (v.includes("EXCESSIVO")) return "status-excessivo";
  if (v.includes("INCOMPLETA")) return "status-incompleta";
  if (v.includes("COMPLETA")) return "status-normal";
  if (v.includes("NORMAL")) return "status-normal";
  if (v.includes("NAO INICIADA") || v.includes("NÃO INICIADA")) return "status-nao";

  return "";
}

function pegarCampo(obj, ...campos) {
  for (const c of campos) {
    if (obj[c] !== undefined && obj[c] !== null && String(obj[c]).trim() !== "") {
      return obj[c];
    }
  }
  return "";
}
