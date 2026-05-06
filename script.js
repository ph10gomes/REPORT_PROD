/* ================= VARIÁVEIS ================= */

const uoSelect = document.getElementById("uoSelect");
const dataSelect = document.getElementById("dataSelect");
const semanaSelect = document.getElementById("semanaSelect");
const mesSelect = document.getElementById("mesSelect");
const tipoSelect = document.getElementById("tipoSelect");
const turnoSelect = document.getElementById("turnoSelect");
const horaSelect = document.getElementById("horaSelect");

const theadRow = document.getElementById("theadRow");
const tbody = document.getElementById("tbody");

const kpiFaixa = document.getElementById("kpiFaixa");
const kpiFaixaTxt = document.getElementById("kpiFaixaTxt");
const kpiMeta = document.getElementById("kpiMeta");
const kpiProd = document.getElementById("kpiProd");
const kpiSaldo = document.getElementById("kpiSaldo");
const kpiAA = document.getElementById("kpiAA");
const kpiExecutados = document.getElementById("kpiExecutados");
const kpiA = document.getElementById("kpiA");
const kpiImprodBruto = document.getElementById("kpiImprodBruto");
const kpiB = document.getElementById("kpiB");
const kpiC = document.getElementById("kpiC");
const kpiD = document.getElementById("kpiD");
const kpiFT = document.getElementById("kpiFT");
const cardKpiExecutados = document.getElementById("cardKpiExecutados");
const cardKpiImprodBruto = document.getElementById("cardKpiImprodBruto");

const grupoData = document.getElementById("grupoData");
const grupoHora = document.getElementById("grupoHora");
const grupoSemana = document.getElementById("grupoSemana");
const grupoMes = document.getElementById("grupoMes");

const btnMenuModo = document.getElementById("btnMenuModo");
const drawerModo = document.getElementById("drawerModo");
const drawerOverlay = document.getElementById("drawerOverlay");
const btnFecharDrawer = document.getElementById("btnFecharDrawer");
const menuModoItens = document.querySelectorAll(".menu-modo-item");
const modoAtualTxt = document.getElementById("modoAtualTxt");
const filtrosEsquerda = document.getElementById("filtrosEsquerda");
const filtrosDireita = document.getElementById("filtrosDireita");
const statusbarPrincipal = document.getElementById("statusbarPrincipal");
const statusDadosTopo = document.getElementById("statusDadosTopo");
const statusDadosResumo = document.getElementById("statusDadosResumo");
const modalDiagnosticoDados = document.getElementById("modalDiagnosticoDados");
const diagnosticoDadosAlertas = document.getElementById("diagnosticoDadosAlertas");
const diagnosticoDadosGrid = document.getElementById("diagnosticoDadosGrid");
const modalBuscaGlobal = document.getElementById("modalBuscaGlobal");
const buscaGlobalInput = document.getElementById("buscaGlobalInput");
const buscaGlobalResultados = document.getElementById("buscaGlobalResultados");
const modalInvestigarEquipe = document.getElementById("modalInvestigarEquipe");
const investigarEquipeInput = document.getElementById("investigarEquipeInput");
const investigarEquipeResultado = document.getElementById("investigarEquipeResultado");
const areaRelatorioPadrao = document.getElementById("areaRelatorioPadrao");
const areaRelatorioNec = document.getElementById("areaRelatorioNec");
const areaRelatorioJornada = document.getElementById("areaRelatorioJornada");
const iframeReportJornada = document.getElementById("iframeReportJornada");
const footerPrincipal = document.getElementById("footerPrincipal");

const btnAcordos17 = document.getElementById("btnAcordos17");
const modalAcordos = document.getElementById("modalAcordos");
const modalAcordosBody = document.getElementById("modalAcordosBody");
const modalAcordosTitulo = document.getElementById("modalAcordosTitulo");
const acordosMeta = document.getElementById("acordosMeta");
const historicoAcordosFiltros = document.getElementById("historicoAcordosFiltros");
const historicoAcordoPeriodo = document.getElementById("historicoAcordoPeriodo");
const grupoHistoricoAcordoData = document.getElementById("grupoHistoricoAcordoData");
const historicoAcordoData = document.getElementById("historicoAcordoData");
const grupoHistoricoAcordoMes = document.getElementById("grupoHistoricoAcordoMes");
const historicoAcordoMes = document.getElementById("historicoAcordoMes");
const historicoAcordoUo = document.getElementById("historicoAcordoUo");
const historicoAcordoSupervisor = document.getElementById("historicoAcordoSupervisor");
const theadAcordosRow = document.getElementById("theadAcordosRow");
const btnAcordosRs = document.getElementById("btnAcordosRs");
const modalAcordosRs = document.getElementById("modalAcordosRs");
const modalAcordosRsBody = document.getElementById("modalAcordosRsBody");
const modalAcordosRsTitulo = document.getElementById("modalAcordosRsTitulo");
const acordosRsSupervisorSelect = document.getElementById("acordosRsSupervisorSelect");
const kpiAcordoRsQtd = document.getElementById("kpiAcordoRsQtd");
const kpiAcordoRsMeta = document.getElementById("kpiAcordoRsMeta");
const kpiAcordoRsProdMomento = document.getElementById("kpiAcordoRsProdMomento");
const kpiAcordoRsPrev = document.getElementById("kpiAcordoRsPrev");
const kpiAcordoRsFech = document.getElementById("kpiAcordoRsFech");
const kpiAcordoRsValorAcordo = document.getElementById("kpiAcordoRsValorAcordo");
const kpiAcordoRsRecuperacao = document.getElementById("kpiAcordoRsRecuperacao");
const kpiAcordoRsAcordadas = document.getElementById("kpiAcordoRsAcordadas");
const cardKpiAcordoRsQtd = document.getElementById("cardKpiAcordoRsQtd");
const cardKpiAcordoRsRecuperacao = document.getElementById("cardKpiAcordoRsRecuperacao");
const cardKpiAcordoRsAcordadas = document.getElementById("cardKpiAcordoRsAcordadas");
const modalConflitos = document.getElementById("modalConflitos");
const modalConflitosBody = document.getElementById("modalConflitosBody");
const modalConflitosTitulo = document.getElementById("modalConflitosTitulo");
const kpiConflitosQtd = document.getElementById("kpiConflitosQtd");
const conflitoDetalheTitulo = document.getElementById("conflitoDetalheTitulo");
const conflitoDetalheBody = document.getElementById("conflitoDetalheBody");
const modalControleServico = document.getElementById("modalControleServico");
const modalControleServicoBody = document.getElementById("modalControleServicoBody");
const modalControleServicoTitulo = document.getElementById("modalControleServicoTitulo");
const modalControleServicoSubtitle = document.getElementById("modalControleServicoSubtitle");
const controleServicoLider = document.getElementById("controleServicoLider");
const controleServicoControlador = document.getElementById("controleServicoControlador");
const controleServicoTotal = document.getElementById("controleServicoTotal");
const controleServicoRealizados = document.getElementById("controleServicoRealizados");
const controleServicoMetaDia = document.getElementById("controleServicoMetaDia");
const controleServicoUsPrev = document.getElementById("controleServicoUsPrev");
const controleServicoUsExec = document.getElementById("controleServicoUsExec");
const controleServicoProdutivos = document.getElementById("controleServicoProdutivos");
const controleServicoImprodutivos = document.getElementById("controleServicoImprodutivos");
const controleServicoPercImpedimento = document.getElementById("controleServicoPercImpedimento");
const controleServicoPrimeiroAtend = document.getElementById("controleServicoPrimeiroAtend");
const controleServicoUltimoAtend = document.getElementById("controleServicoUltimoAtend");
const controleServicoTempoLacuna = document.getElementById("controleServicoTempoLacuna");
const modalJustificativas = document.getElementById("modalJustificativas");
const modalJustificativasBody = document.getElementById("modalJustificativasBody");
const historicoJustificativasFiltros = document.getElementById("historicoJustificativasFiltros");
const historicoJustPeriodo = document.getElementById("historicoJustPeriodo");
const grupoHistoricoJustData = document.getElementById("grupoHistoricoJustData");
const historicoJustData = document.getElementById("historicoJustData");
const grupoHistoricoJustMes = document.getElementById("grupoHistoricoJustMes");
const historicoJustMes = document.getElementById("historicoJustMes");
const historicoJustUo = document.getElementById("historicoJustUo");
const historicoJustSupervisor = document.getElementById("historicoJustSupervisor");
const justificativasDetalheEquipe = document.getElementById("justificativasDetalheEquipe");
const justificativasDetalheTexto = document.getElementById("justificativasDetalheTexto");
const btnFullscreenJustificativas = document.getElementById("btnFullscreenJustificativas");
const kpiJustEqD = document.getElementById("kpiJustEqD");
const kpiJustAcordadas = document.getElementById("kpiJustAcordadas");
const kpiJustJustificadas = document.getElementById("kpiJustJustificadas");
const kpiJustPercAcordadas = document.getElementById("kpiJustPercAcordadas");
const kpiJustPercJustificadas = document.getElementById("kpiJustPercJustificadas");
const kpiJustTotal = document.getElementById("kpiJustTotal");
const kpiJustDNaoAcordadas = document.getElementById("kpiJustDNaoAcordadas");
const kpiJustDetalhe = document.getElementById("kpiJustDetalhe");
const kpiJustUltimoSalvo = document.getElementById("kpiJustUltimoSalvo");
const justificativasChart = document.getElementById("justificativasChart");
const justificativasHeadline = document.getElementById("justificativasHeadline");
const justificativasHeadlineTxt = document.getElementById("justificativasHeadlineTxt");
const justificativasMeta = document.getElementById("justificativasMeta");
const areaJustificativasExport = document.getElementById("areaJustificativasExport");
const kpiAcordoAnalisadasLabel = document.getElementById("kpiAcordoAnalisadasLabel");
const kpiAcordoMarcadasLabel = document.getElementById("kpiAcordoMarcadasLabel");
const kpiAcordoCumpridoLabel = document.getElementById("kpiAcordoCumpridoLabel");
const kpiAcordoPercAcordadasLabel = document.getElementById("kpiAcordoPercAcordadasLabel");
const kpiAcordoNaoCumpridoLabel = document.getElementById("kpiAcordoNaoCumpridoLabel");
const kpiAcordoAnalisadas = document.getElementById("kpiAcordoAnalisadas");
const kpiAcordoMarcadas = document.getElementById("kpiAcordoMarcadas");
const kpiAcordoCumprido = document.getElementById("kpiAcordoCumprido");
const kpiAcordoPercAcordadas = document.getElementById("kpiAcordoPercAcordadas");
const kpiAcordoNaoCumprido = document.getElementById("kpiAcordoNaoCumprido");
const kpiAcordoEficacia = document.getElementById("kpiAcordoEficacia");
const thAcordoMomento = document.getElementById("thAcordoMomento");
const thStatusAcordo = document.getElementById("thStatusAcordo");
const kpiModalEquipesTotal = document.getElementById("kpiModalEquipesTotal");
const kpiModalEquipesAcordadas = document.getElementById("kpiModalEquipesAcordadas");
const kpiModalEquipesJustificadas = document.getElementById("kpiModalEquipesJustificadas");
const kpiModalMeta = document.getElementById("kpiModalMeta");
const kpiModalProd = document.getElementById("kpiModalProd");
const kpiModalPerc = document.getElementById("kpiModalPerc");
const kpiModalEqD = document.getElementById("kpiModalEqD");
const kpiModalImprod = document.getElementById("kpiModalImprod");
const kpiModalPercEqD = document.getElementById("kpiModalPercEqD");
const kpiModalPercJornadaCompleta = document.getElementById("kpiModalPercJornadaCompleta");
const kpiModalPercJornadaIncompleta = document.getElementById("kpiModalPercJornadaIncompleta");
const kpiModalPercSemAtendimento = document.getElementById("kpiModalPercSemAtendimento");
const cardKpiModalEquipesTotal = document.getElementById("cardKpiModalEquipesTotal");
const cardKpiModalEquipesAcordadas = document.getElementById("cardKpiModalEquipesAcordadas");
const cardKpiModalEquipesJustificadas = document.getElementById("cardKpiModalEquipesJustificadas");
const cardKpiModalEqD = document.getElementById("cardKpiModalEqD");
const cardKpiModalPercEqD = document.getElementById("cardKpiModalPercEqD");
const cardKpiModalJornadaCompleta = document.getElementById("cardKpiModalJornadaCompleta");
const cardKpiModalJornadaIncompleta = document.getElementById("cardKpiModalJornadaIncompleta");
const cardKpiModalSemAtendimento = document.getElementById("cardKpiModalSemAtendimento");
const caixaDetalheFaixa = document.getElementById("caixaDetalheFaixa");
const painelJustificativa = document.getElementById("painelJustificativa");
const painelJustificativaOverlay = document.getElementById("painelJustificativaOverlay");
const painelJustificativaTitulo = document.getElementById("painelJustificativaTitulo");
const painelJustificativaTexto = document.getElementById("painelJustificativaTexto");
const painelJustificativaKpiCodigo = document.getElementById("painelJustificativaKpiCodigo");
const painelJustificativaKpiMeta = document.getElementById("painelJustificativaKpiMeta");
const painelJustificativaKpiProd = document.getElementById("painelJustificativaKpiProd");
const painelJustificativaKpiSaldo = document.getElementById("painelJustificativaKpiSaldo");
const painelJustificativaKpiFaixa = document.getElementById("painelJustificativaKpiFaixa");
const painelJustificativaKpiStatus = document.getElementById("painelJustificativaKpiStatus");
const painelJustificativaKpiServicos = document.getElementById("painelJustificativaKpiServicos");
const painelJustificativaKpiProdutivos = document.getElementById("painelJustificativaKpiProdutivos");
const painelJustificativaKpiImprodutivos = document.getElementById("painelJustificativaKpiImprodutivos");
const painelJustificativaKpiPercImprod = document.getElementById("painelJustificativaKpiPercImprod");
const justGrupoSearch = document.getElementById("justGrupoSearch");
const justGrupoSelected = document.getElementById("justGrupoSelected");
const justGrupoList = document.getElementById("justGrupoList");
const justDescSearch = document.getElementById("justDescSearch");
const justDescSelected = document.getElementById("justDescSelected");
const justDescList = document.getElementById("justDescList");
const justificativaPreview = document.getElementById("justificativaPreview");
const btnExcluirJustificativa = document.getElementById("btnExcluirJustificativa");
const inputImportarBackupAcordos = document.getElementById("inputImportarBackupAcordos");
const caixaDetalheFaixaTitulo = document.getElementById("caixaDetalheFaixaTitulo");
const cardDetalheFaixaProd = document.getElementById("cardDetalheFaixaProd");
const cardDetalheFaixaMeta = document.getElementById("cardDetalheFaixaMeta");
const cardDetalheFaixaSaldo = document.getElementById("cardDetalheFaixaSaldo");
const detalheFaixaProd = document.getElementById("detalheFaixaProd");
const detalheFaixaMeta = document.getElementById("detalheFaixaMeta");
const detalheFaixaMetaDia = document.getElementById("detalheFaixaMetaDia");
const detalheFaixaFalta = document.getElementById("detalheFaixaFalta");
const cardDetalheEquipeFaixaDia = document.getElementById("cardDetalheEquipeFaixaDia");
const detalheEquipeFaixaDia = document.getElementById("detalheEquipeFaixaDia");
const detalheEquipeStatus = document.getElementById("detalheEquipeStatus");
const detalheEquipeImprod = document.getElementById("detalheEquipeImprod");
const detalheEquipeServicos = document.getElementById("detalheEquipeServicos");
const detalheEquipeProdutivos = document.getElementById("detalheEquipeProdutivos");
const detalheEquipeImprodutivos = document.getElementById("detalheEquipeImprodutivos");
const detalheEquipeInicioJornada = document.getElementById("detalheEquipeInicioJornada");

const caixaDetalheFaixaDia = document.getElementById("caixaDetalheFaixaDia");
const caixaFaixaDiaTitulo = document.getElementById("caixaFaixaDiaTitulo");
const caixaFaixaDiaLider = document.getElementById("caixaFaixaDiaLider");
const caixaFaixaDiaControlador = document.getElementById("caixaFaixaDiaControlador");
const caixaFaixaDiaUo = document.getElementById("caixaFaixaDiaUo");
const caixaFaixaDiaFaixa = document.getElementById("caixaFaixaDiaFaixa");
const caixaFaixaDiaQtdCodx = document.getElementById("caixaFaixaDiaQtdCodx");
const caixaFaixaDiaTempoTotal = document.getElementById("caixaFaixaDiaTempoTotal");
const caixaFaixaDiaObservacao = document.getElementById("caixaFaixaDiaObservacao");
const caixaFaixaDiaCodxBody = document.getElementById("caixaFaixaDiaCodxBody");

let dados = [];
let dadosBase = [];
let carregandoDadosTotalHoras = false;
let reqSeqDadosTotalHoras = 0;
let reqSeqDadosPainel = 0;
let chaveDadosCarregados = "";
let campoGlobal = "";
let modoTabela = "diario";

const FAIXAS = ["09", "11", "13", "15", "17"];
const FAIXAS_TARDE = ["10", "12", "14", "16", "18"];
const FAIXAS_MADRUGADA = ["15", "17", "19", "21", "23"];
const HORAS_TOTAIS = Array.from({ length: 23 }, (_, i) => String(i + 1).padStart(2, "0"));

const ROTULO_NI = "EQPS. NÃO ATRIBUIDAS NEC / SEM CONTROLADOR";

const HORAS_ACUM = {
    "09": 1.8,
    "11": 3.6,
    "13": 5.4,
    "15": 7.2,
    "17": 9
};

const CONTROLE_SERVICO_COLS = [
    { key: "equipe", label: "EQUIPES", candidates: ["NOME", "NOME_EQUIPE", "EQUIPE"] },
    { key: "servico", label: "SERVICO", candidates: ["NUM_SERVICO", "SERVICO", "NUM_SERV"] },
    { key: "tipo_servico", label: "TIPO DE SERVICO", candidates: ["TIPO_SERVICO", "TIPO SERVICO"] },
    { key: "situacao", label: "SITUACAO", candidates: ["SITUACAO", "SITUAÇÃO", "SITUACAO_SERVICO"] },
    { key: "produtivo", label: "PRODUTIVO", candidates: ["PRODUTIVO", "PRODUTIVOS"] },
    { key: "cod_ativ", label: "COD. ATIV.", candidates: ["COD_ATIV", "COD ATIV", "CODATIV"] },
    { key: "us_prev", label: "U.S PREV.", candidates: ["US_PREV", "US PREV", "US_PREVISTAS"] },
    { key: "us_exec", label: "U.S EXEC.", candidates: ["US_EXEC", "US EXEC", "US_EXECUTADAS"] },
    { key: "data_designacao", label: "DESIGNACAO", candidates: ["DATA_DESIGNACAO", "DESIGNACAO", "DATA DESIGNACAO"] },
    { key: "data_acionamento", label: "ACIONAMENTO", candidates: ["DATA_ACIONAMENTO", "ACIONAMENTO", "DATA ACIONAMENTO"] },
    { key: "data_localizacao", label: "LOCALIZACAO", candidates: ["DATA_LOCALIZACAO", "LOCALIZACAO", "DATA LOCALIZACAO"] },
    { key: "data_termino", label: "ENCERRAMENTO", candidates: ["DATA_TERMINO_REAL", "ENCERRAMENTO", "DATA_TERMINO"] },
    { key: "area", label: "AREA", candidates: ["TIPO_AREA", "AREA", "TIPO AREA"] },
    { key: "lacuna", label: "LACUNA", candidates: ["LACUNA", "TEMPO_LACUNA", "TEMPO LACUNA"] }
];

const STORAGE_KEY_ACORDOS = "painel_producao_acordos_v2";
const ENDPOINT_STATE_ACORDOS = "/api/state/acordos";
const SENHA_ACORDOS_RS = "1234";
const STORAGE_KEY_ACORDOS_RS_OK = "painel_acordos_rs_autorizado";

let cacheFaixas = {};
let filtrosAtivos = {};
let filtrosModal = {};
let currentJustificativasFilter = "d-nao-acordadas";
let currentJustificativasListaExibida = [];
let currentJustificativasModo = "contexto";
let currentAcordosModo = "contexto";
let currentAcordosListaExibida = [];

const cacheListasModal = new Map();
const cacheLinhaBaseEquipe = new Map();
const cacheCodxEquipe = new Map();
const cacheCodxObsEquipe = new Map();
const cacheLinhasContextoModal = new Map();
const cacheControleServico = new Map();
const cacheControleServicoResumo = new Map();

window.addEventListener("message", (event) => {
    if (!iframeReportJornada || event.source !== iframeReportJornada.contentWindow) return;
    if (!event.data || event.data.type !== "jornada:height") return;

    const altura = Number(event.data.height);
    if (!Number.isFinite(altura) || altura <= 0) return;

    iframeReportJornada.style.height = `${Math.ceil(altura)}px`;
});
let currentModalKpiFilter = "todas";
let currentModalContext = null;
let currentJustificativaCodigo = "";
let currentJustificativasPresetsPainel = {};
let currentJustificativaGruposSelecionados = [];
let currentJustificativaDescricoesSelecionadas = [];
let currentJustificativaGrupoAtivo = "";
let currentAcordosRsFilter = "todas";
let currentAcordosRsLinhas = [];
let currentAcordosRsBaseLinhas = [];
let currentAcordosRsSupervisorFilter = "";
let currentStatusDados = null;
let acordosStateHydrationPromise = null;
let acordosStateSavePromise = Promise.resolve();
let acordosHistorySavePromise = Promise.resolve();
let currentTabelaGeralResumo = null;
let currentTabelaGeralSupervisorSelecionado = "";

const VALOR_RS_POR_UNIDADE = 2300;
const XLSX_CDN_URL = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
const HTML2CANVAS_CDN_URL = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";

const scriptsExternosCarregando = new Map();

function carregarScriptExterno(src) {
    if (scriptsExternosCarregando.has(src)) return scriptsExternosCarregando.get(src);

    const existente = document.querySelector(`script[src="${src}"]`);
    if (existente) {
        const promiseExistente = new Promise((resolve, reject) => {
            existente.addEventListener("load", resolve, { once: true });
            existente.addEventListener("error", reject, { once: true });
        });
        scriptsExternosCarregando.set(src, promiseExistente);
        return promiseExistente;
    }

    const promise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Falha ao carregar script externo: ${src}`));
        document.head.appendChild(script);
    });

    scriptsExternosCarregando.set(src, promise);
    return promise;
}

async function garantirXlsx() {
    if (typeof XLSX !== "undefined") return;
    await carregarScriptExterno(XLSX_CDN_URL);
}

async function garantirHtml2Canvas() {
    if (typeof html2canvas !== "undefined") return;
    await carregarScriptExterno(HTML2CANVAS_CDN_URL);
}

/* ================= HELPERS ================= */

function obterHojeISO() {
    const agora = new Date();
    const y = agora.getFullYear();
    const m = String(agora.getMonth() + 1).padStart(2, "0");
    const d = String(agora.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function obterAnoMesAtual() {
    const agora = new Date();
    const y = agora.getFullYear();
    const m = String(agora.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
}

function formatarDataBR(iso) {
    const s = String(iso || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    const [y, m, d] = s.split("-");
    return `${d}/${m}/${y}`;
}

function formatISODateLocal(dt) {
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const d = String(dt.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function parseFlexibleDateRefClient(value) {
    const raw = String(value || "").trim();
    if (!raw) return null;

    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
        const [d, m, y] = raw.split("/");
        return `${y}-${m}-${d}`;
    }

    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) return null;
    return formatISODateLocal(date);
}

function getWeekRangeFromIsoDateClient(isoDate) {
    const date = new Date(`${isoDate}T00:00:00`);
    if (Number.isNaN(date.getTime())) return null;

    const day = date.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const start = new Date(date);
    start.setDate(date.getDate() + diffToMonday);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    return {
        start: formatISODateLocal(start),
        end: formatISODateLocal(end)
    };
}

function dataPertenceAoPeriodo(dataRef, periodo, dataSelecionada, mesSelecionado) {
    const dataNormalizada = parseFlexibleDateRefClient(dataRef);
    if (!dataNormalizada) return false;

    if (periodo === "mensal") {
        return !!mesSelecionado && dataNormalizada.slice(0, 7) === mesSelecionado;
    }

    if (periodo === "semanal") {
        if (!dataSelecionada) return true;
        const intervalo = getWeekRangeFromIsoDateClient(dataSelecionada);
        if (!intervalo) return true;
        return dataNormalizada >= intervalo.start && dataNormalizada <= intervalo.end;
    }

    if (!dataSelecionada) return true;
    return dataNormalizada === dataSelecionada;
}

function normalizarHora(h) {
    const n = parseInt(h, 10);
    if (isNaN(n)) return "";
    return String(n).padStart(2, "0");
}

function normalizarDataExcel(v) {
    if (v === null || v === undefined || v === "") return "";

    if (typeof v === "number") {
        const d = XLSX.SSF.parse_date_code(v);
        return `${d.y}-${String(d.m).padStart(2, "0")}-${String(d.d).padStart(2, "0")}`;
    }

    const s = String(v).trim();

    if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
        return s.slice(0, 10);
    }

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(s)) {
        const [d, m, y] = s.split("/");
        return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }

    const data = new Date(s);
    if (!isNaN(data.getTime())) {
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const dia = String(data.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    return s;
}

function preencherAliasColuna(destino, valor, aliases) {
    const canonico = aliases[0];
    if (!Object.prototype.hasOwnProperty.call(destino, canonico) || destino[canonico] === "" || destino[canonico] === null || destino[canonico] === undefined) {
        destino[canonico] = valor;
    }

    aliases.forEach((alias) => {
        if (alias === canonico || !Object.prototype.hasOwnProperty.call(destino, alias)) return;
        if (destino[alias] === "" || destino[alias] === null || destino[alias] === undefined) {
            destino[alias] = valor;
        }
    });
}

function normalizarLinhaPainel(linha) {
    const base = linha && typeof linha === "object" ? { ...linha } : {};

    const valorUo = obterValorColuna(base, ["Cód.UO", "CÃ³d.UO", "CÃƒÂ³d.UO", "COD_UO", "UO"]);
    const valorEquipe = obterValorColuna(base, ["Cód. Equipe", "CÃ³d. Equipe", "CÃƒÂ³d. Equipe", "COD_EQUIPE"]);
    const valorClassificacao = obterValorColuna(base, ["Classificação", "ClassificaÃ§Ã£o", "ClassificaÃƒÂ§ÃƒÂ£o", "CLASSIFICACAO"]);
    const valorProducao = obterValorColuna(base, ["Produção", "ProduÃ§Ã£o", "ProduÃƒÂ§ÃƒÂ£o", "PRODUCAO", "US_EXEC"]);
    const valorPrimeiroAtendimento = obterValorColuna(base, ["1º Atendimento", "1Âº Atendimento", "1Ã‚Âº Atendimento", "PRIMEIRO_ATENDIMENTO"]);
    const valorUltimoAtendimento = obterValorColuna(base, ["Ult. Atendimento", "ULTIMO_ATENDIMENTO"]);
    const valorHora = obterValorColuna(base, ["Hora", "HORA", "hora_atualizacao"]);
    const valorData = obterValorColuna(base, ["Data", "DATA"]);

    preencherAliasColuna(base, valorUo, ["Cód.UO", "CÃ³d.UO", "CÃƒÂ³d.UO", "COD_UO", "UO"]);
    preencherAliasColuna(base, valorEquipe, ["Cód. Equipe", "CÃ³d. Equipe", "CÃƒÂ³d. Equipe", "COD_EQUIPE"]);
    preencherAliasColuna(base, valorClassificacao, ["Classificação", "ClassificaÃ§Ã£o", "ClassificaÃƒÂ§ÃƒÂ£o", "CLASSIFICACAO"]);
    preencherAliasColuna(base, valorProducao, ["Produção", "ProduÃ§Ã£o", "ProduÃƒÂ§ÃƒÂ£o", "PRODUCAO", "US_EXEC"]);
    preencherAliasColuna(base, valorPrimeiroAtendimento, ["1º Atendimento", "1Âº Atendimento", "1Ã‚Âº Atendimento", "PRIMEIRO_ATENDIMENTO"]);
    preencherAliasColuna(base, valorUltimoAtendimento, ["Ult. Atendimento", "ULTIMO_ATENDIMENTO"]);
    preencherAliasColuna(base, valorHora, ["Hora", "HORA", "hora_atualizacao"]);
    preencherAliasColuna(base, valorData, ["Data", "DATA"]);

    return base;
}

function normalizarColecaoPainel(linhas) {
    if (!Array.isArray(linhas)) return [];
    return linhas.map(normalizarLinhaPainel);
}

function extrairAnoMes(v) {
    const data = normalizarDataExcel(v);
    return data ? data.slice(0, 7) : "";
}

function classificar(p) {
    if (p < 75) return "D";
    if (p < 89) return "C";
    if (p < 100) return "B";
    if (p < 105) return "A";
    return "AA";
}

function toNumber(valor) {
    if (typeof valor === "number") return valor;
    if (!valor) return 0;

    return parseFloat(
        valor
            .toString()
            .trim()
            .replace(/\./g, "")
            .replace(",", ".")
    ) || 0;
}

function limparCachesModal() {
    cacheListasModal.clear();
    cacheLinhaBaseEquipe.clear();
    cacheCodxEquipe.clear();
    cacheLinhasContextoModal.clear();
}

/* ================= JUSTIFICATIVAS (PRESETS) ================= */

let justificativasPresets = null;
let justificativasPresetsPromise = null;

function obterPresetsJustificativasDefault() {
    return {
        "PESSOAL": [
            "FALTA DE FUNCIONARIO",
            "SAÍDA MAIS CEDO COM AUTORIZAÇÃO DO GESTOR",
            "SAÍDA MAIS CEDO SEM AUTORIZAÇÃO DO GESTOR",
            "PEDIDO DE DEMISSÃO / DEMITIDO",
            "ADVERTÊNCIA COM PUNIÇÃO",
            "ATESTADO MÉDICO",
            "CADASTRO INDEVIDO ANTES DO HORÁRIO",
            "RETORNO MÉDICO BASE PÓS ATESTADO",
            "DEMORA NA EXECUÇÃO DO PRIMEIRO ATENDIMENTO",
            "INTERSTÍCIO",
            "FÉRIAS NÃO PROGRAMADAS",
            "FOLGA NÃO PROGRAMADA",
            "GREVE / PARALISAÇÃO",
            "ATRASO DE FUNCIONÁRIO",
            "LICENÇA",
            "COMPENSAÇÃO DE HORAS",
            "PROBLEMAS EXTRAS JUDICIAIS"
        ],
        "VEÍCULO": [
            "REVEZAMENTO DE VEÍCULO",
            "TROCA DE VEÍCULO",
            "VEÍCULO EM MANUTENÇÃO CORRETIVA",
            "ABASTECENDO VEÍCULO",
            "VEÍCULO EM MANUTENÇÃO PREVENTIVA",
            "MONTAGEM VEÍCULO EM DEVIDO TROCA PROCESSO"
        ],
        "MATERIAL": [
            "FALTA DE MATERIAL NO ALMOXARIFADO",
            "FALTA DE MATERIAL EM CAMPO",
            "EQUIPAMENTO DANIFICADO / INDISPONÍVEL",
            "AGUARDANDO ATENDIMENTO DO ALMOXARIFADO"
        ],
        "CLIMA": ["CHUVA"],
        "EVENTOS": [
            "TREINAMENTO NÃO PROGRAMADO CEMIG",
            "EVENTOS ADMINISTRATIVOS",
            "TRATATIVA COM SUPERVISOR",
            "ASO - EXAME PERIÓDICO NA BASE",
            "ENTREGA DE FILMAGEM / TROCA CAMERA"
        ],
        "DESLOCAMENTO": [
            "DESLOCAMENTO RURAL / INTERMUNICIPAL",
            "DESLOCAMENTO FORA DO PREVISTO",
            "ALTO DESLOCAMENTO ENTRE SERVIÇOS (PULVERIZADOS)"
        ],
        "ACESSO": ["LOCAL SEM ACESSO"],
        "PRONTIDÃO": ["EQUIPE SOB COORDENAÇÃO DO COD"],
        "ATRASO / DIFICULTADOR": [
            "INSPEÇÃO",
            "SERVIÇO / MANOBRA CANCELADA",
            "SERVIÇO COMPLEXO",
            "SEM DEMANDA DE SERVIÇO EM TELA",
            "VISITA PRÉ REPROVA",
            "EQUIPE PAROU MAIS CEDO",
            "FALHA DE SISTEMA",
            "DIFICULDADE DE EXECUÇÃO (NOVATO)",
            "TREINANDO FUNCIONARIO NOVATO",
            "TOP20",
            "TREINANDO DEVIDO MIGRAÇÃO DE PROCESSO",
            "DIFICULDADE ATENDIMENTO REGIAO CENTRAL BH",
            "IMPEDIMENTO PELO CLIENTE",
            "INTERFERÊNCIA DE USO MÚTUO",
            "SERVIÇO DE MOTO EXECUTADO POR MULTI",
            "ELEVADA QUANTIDADE DE VENCIMENTOS EM TELA",
            "LOTE DE SERVIÇOS CONCENTRADO EM ÁREA DE RISCO",
            "EQUIPE COMPOSTA POR FUNC. EM MOB SEGURA"
        ],
        "PERFORMANCE": [
            "FALHA DE DESPACHO",
            "FALHA NA PROGRAMAÇÃO",
            "FALHA NA TRIAGEM",
            "INEFICIÊNCIA DA EQUIPE",
            "TEMPO DE PLATAFORMA",
            "APOIO FORA DO PROCESSO DE ORIGEM",
            "APOIO COM COMPLEMENTO DE LOTE"
        ],
        "IMPRODUTIVIDADE": ["SEM INTERFERÊNCIA", "ALTO ÍNDICE IMPEDIMENTO"],
        "NEC": ["FALTA DE CÓDIGO-X"]
    };
}

function carregarPresetsJustificativas() {
    if (justificativasPresetsPromise) return justificativasPresetsPromise;

    justificativasPresetsPromise = fetch("justificativas_presets.json", { cache: "no-store" })
        .then(resp => (resp.ok ? resp.json() : null))
        .then(json => {
            justificativasPresets = json && typeof json === "object"
                ? json
                : obterPresetsJustificativasDefault();
            return justificativasPresets;
        })
        .catch(() => {
            justificativasPresets = obterPresetsJustificativasDefault();
            return justificativasPresets;
        });

    return justificativasPresetsPromise;
}

function normalizarPresetTexto(valor) {
    return String(valor || "").trim();
}

function extrairGruposTexto(valor) {
    return String(valor || "")
        .split(/\s+\+\s+/)
        .map(item => normalizarPresetTexto(item).toUpperCase())
        .filter(Boolean);
}

function obterGruposSelecionados() {
    return [...currentJustificativaGruposSelecionados];
}

function obterDescricoesPorGrupos(presets, grupos) {
    const lista = (grupos || []).flatMap(grupo => {
        const valores = presets?.[grupo];
        return Array.isArray(valores) ? valores : [];
    });

    return [...new Set(lista.map(item => normalizarPresetTexto(item).toUpperCase()).filter(Boolean))]
        .sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function obterTodasDescricoesJustificativa(presets) {
    const lista = Object.values(presets || {}).flatMap(valor => Array.isArray(valor) ? valor : []);
    return [...new Set(lista.map(item => normalizarPresetTexto(item).toUpperCase()).filter(Boolean))]
        .sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function obterDescricoesPorGrupoAtivo(presets, grupoAtivo) {
    const grupo = normalizarPresetTexto(grupoAtivo).toUpperCase();
    if (!grupo) return [];
    return obterDescricoesPorGrupos(presets, [grupo]);
}

function obterDescricoesPermitidasPorGrupos(presets, gruposSelecionados = []) {
    return obterDescricoesPorGrupos(presets, gruposSelecionados);
}

function obterGrupoAtivoJustificativa(gruposSelecionados = []) {
    const grupoAtivo = normalizarPresetTexto(currentJustificativaGrupoAtivo).toUpperCase();
    if (grupoAtivo && gruposSelecionados.includes(grupoAtivo)) return grupoAtivo;
    return gruposSelecionados[gruposSelecionados.length - 1] || "";
}

function obterDescricoesSelecionadas() {
    return [...currentJustificativaDescricoesSelecionadas];
}

function definirGrupoAtivoJustificativa(grupo) {
    const normalizado = normalizarPresetTexto(grupo).toUpperCase();
    if (!normalizado || !currentJustificativaGruposSelecionados.includes(normalizado)) return;

    currentJustificativaGrupoAtivo = normalizado;
    renderizarChipsJustificativa(justGrupoSelected, currentJustificativaGruposSelecionados, "grupo");
    renderizarOpcoesDescricaoJustificativa(
        currentJustificativasPresetsPainel,
        currentJustificativaGruposSelecionados,
        currentJustificativaDescricoesSelecionadas,
        justDescSearch?.value || ""
    );
}

function toggleSelecaoJustificativa(tipo, valor) {
    const listaAtual = tipo === "grupo"
        ? [...currentJustificativaGruposSelecionados]
        : [...currentJustificativaDescricoesSelecionadas];

    const normalizado = normalizarPresetTexto(valor).toUpperCase();
    if (!normalizado) return;

    const proximaLista = listaAtual.includes(normalizado)
        ? listaAtual.filter(item => item !== normalizado)
        : [...listaAtual, normalizado].sort((a, b) => a.localeCompare(b, "pt-BR"));

    if (tipo === "grupo") {
        const estavaSelecionado = listaAtual.includes(normalizado);
        currentJustificativaGruposSelecionados = proximaLista;
        currentJustificativaGrupoAtivo = !estavaSelecionado
            ? normalizado
            : (currentJustificativaGrupoAtivo === normalizado
                ? (currentJustificativaGruposSelecionados[currentJustificativaGruposSelecionados.length - 1] || "")
                : currentJustificativaGrupoAtivo);
        currentJustificativaDescricoesSelecionadas = currentJustificativaDescricoesSelecionadas
            .filter(item => obterDescricoesPermitidasPorGrupos(currentJustificativasPresetsPainel, currentJustificativaGruposSelecionados).includes(item));
        renderizarOpcoesGrupoJustificativa(currentJustificativasPresetsPainel, currentJustificativaGruposSelecionados, justGrupoSearch?.value || "");
        renderizarOpcoesDescricaoJustificativa(currentJustificativasPresetsPainel, currentJustificativaGruposSelecionados, currentJustificativaDescricoesSelecionadas, justDescSearch?.value || "");
    } else {
        currentJustificativaDescricoesSelecionadas = proximaLista;
        renderizarOpcoesDescricaoJustificativa(currentJustificativasPresetsPainel, currentJustificativaGruposSelecionados, currentJustificativaDescricoesSelecionadas, justDescSearch?.value || "");
    }

    atualizarPreviewJustificativa();
}

function renderizarChipsJustificativa(container, valores = [], tipo) {
    if (!container) return;

    container.classList.toggle("hidden", !valores.length);
    container.innerHTML = valores.map(valor => `
        <span class="painel-justificativa-chip ${tipo === "grupo" && valor === currentJustificativaGrupoAtivo ? "is-active" : ""}">
            ${escapeHtml(valor)}
            <button type="button" onclick="toggleSelecaoJustificativa('${tipo}', '${escapeJsString(valor)}')" aria-label="Remover ${escapeHtml(valor)}">×</button>
        </span>
    `).join("");
}

function renderizarListaJustificativa(container, valores = [], selecionados = [], tipo, vazio = "") {
    if (!container) return;

    container.innerHTML = valores.length
        ? valores.map(valor => {
            const selecionado = selecionados.includes(valor);
            return `
                <button
                    type="button"
                    class="painel-justificativa-option ${selecionado ? "is-selected" : ""}"
                    onclick="toggleSelecaoJustificativa('${tipo}', '${escapeJsString(valor)}')">
                    <span class="painel-justificativa-option-check">${selecionado ? "✓" : ""}</span>
                    <span>${escapeHtml(valor)}</span>
                </button>
            `;
        }).join("")
        : `<div class="painel-justificativa-empty">${escapeHtml(vazio)}</div>`;
}

function renderizarOpcoesGrupoJustificativa(presets, gruposSelecionados = [], busca = "") {
    const filtro = normalizarPresetTexto(busca).toUpperCase();
    const grupos = Object.keys(presets || {})
        .map(item => String(item).trim().toUpperCase())
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b, "pt-BR"));

    const gruposFiltrados = filtro
        ? grupos.filter(grupo => grupo.includes(filtro))
        : grupos;

    renderizarChipsJustificativa(justGrupoSelected, gruposSelecionados, "grupo");
    renderizarListaJustificativa(justGrupoList, gruposFiltrados, gruposSelecionados, "grupo", "Nenhum grupo encontrado.");
}

function parseJustificativaEstruturada(texto) {
    const s = String(texto || "").trim();
    if (!s) return { grupos: [], grupo: "", descricao: "", detalhe: "" };

    const m = s.match(/^(.+?)\s*-\s*(.+?)\s*:\s*(.*)$/);
    if (m) {
        const grupo = normalizarPresetTexto(m[1]).toUpperCase();
        return {
            grupos: extrairGruposTexto(grupo),
            grupo,
            descricoes: extrairGruposTexto(normalizarPresetTexto(m[2]).toUpperCase()),
            descricao: normalizarPresetTexto(m[2]).toUpperCase(),
            detalhe: normalizarPresetTexto(m[3])
        };
    }

    const m2 = s.match(/^(.+?)\s*-\s*(.+?)$/);
    if (m2) {
        const grupo = normalizarPresetTexto(m2[1]).toUpperCase();
        return {
            grupos: extrairGruposTexto(grupo),
            grupo,
            descricoes: extrairGruposTexto(normalizarPresetTexto(m2[2]).toUpperCase()),
            descricao: normalizarPresetTexto(m2[2]).toUpperCase(),
            detalhe: ""
        };
    }

    return { grupos: [], grupo: "", descricoes: [], descricao: "", detalhe: s };
}

function atualizarPreviewJustificativa() {
    if (!justificativaPreview) return;

    const grupos = obterGruposSelecionados();
    const descricoes = obterDescricoesSelecionadas();

    if (grupos.length && descricoes.length) {
        justificativaPreview.innerText = `${grupos.join(" + ")} - ${descricoes.join(" + ")}`;
        return;
    }

    if (grupos.length) {
        justificativaPreview.innerText = grupos.join(" + ");
        return;
    }

    if (descricoes.length) {
        justificativaPreview.innerText = descricoes.join(" + ");
        return;
    }

    justificativaPreview.innerText = "Selecione um ou mais grupos e uma ou mais descrições.";
}

function popularSelectJustificativas(presets, gruposSelecionados = [], descSelecionadas = []) {
    currentJustificativasPresetsPainel = presets || {};
    currentJustificativaGruposSelecionados = [...new Set((gruposSelecionados || []).map(item => normalizarPresetTexto(item).toUpperCase()).filter(Boolean))];
    currentJustificativaGrupoAtivo = currentJustificativaGruposSelecionados[currentJustificativaGruposSelecionados.length - 1] || "";
    currentJustificativaDescricoesSelecionadas = [...new Set((descSelecionadas || []).map(item => normalizarPresetTexto(item).toUpperCase()).filter(Boolean))];
    renderizarOpcoesGrupoJustificativa(currentJustificativasPresetsPainel, currentJustificativaGruposSelecionados, justGrupoSearch?.value || "");
    renderizarOpcoesDescricaoJustificativa(
        currentJustificativasPresetsPainel,
        currentJustificativaGruposSelecionados,
        currentJustificativaDescricoesSelecionadas,
        justDescSearch?.value || ""
    );

    atualizarPreviewJustificativa();
}

function selecionarDescricaoRelacionadaJustificativa(grupo, descricao) {
    const grupoNorm = normalizarPresetTexto(grupo).toUpperCase();
    const descNorm = normalizarPresetTexto(descricao).toUpperCase();
    if (!grupoNorm || !descNorm) return;

    currentJustificativaGruposSelecionados = [...new Set([
        ...currentJustificativaGruposSelecionados,
        grupoNorm
    ])].sort((a, b) => a.localeCompare(b, "pt-BR"));

    currentJustificativaGrupoAtivo = grupoNorm;

    if (!currentJustificativaDescricoesSelecionadas.includes(descNorm)) {
        currentJustificativaDescricoesSelecionadas = [...currentJustificativaDescricoesSelecionadas, descNorm]
            .sort((a, b) => a.localeCompare(b, "pt-BR"));
    }

    renderizarOpcoesGrupoJustificativa(
        currentJustificativasPresetsPainel,
        currentJustificativaGruposSelecionados,
        justGrupoSearch?.value || ""
    );
    renderizarOpcoesDescricaoJustificativa(
        currentJustificativasPresetsPainel,
        currentJustificativaGruposSelecionados,
        currentJustificativaDescricoesSelecionadas,
        justDescSearch?.value || ""
    );
    atualizarPreviewJustificativa();
}

function renderizarOpcoesDescricaoJustificativa(presets, gruposSelecionados = [], descSelecionadas = [], busca = "") {
    const grupoAtivo = obterGrupoAtivoJustificativa(gruposSelecionados);
    const filtro = normalizarPresetTexto(busca).toUpperCase();
    const possuiGrupoSelecionado = !!grupoAtivo;

    let opcoes = [];
    if (possuiGrupoSelecionado) {
        opcoes = obterDescricoesPorGrupoAtivo(presets, grupoAtivo).map(descricao => ({
            grupo: grupoAtivo,
            descricao
        }));
    } else {
        opcoes = Object.entries(presets || {}).flatMap(([grupo, descricoes]) =>
            (Array.isArray(descricoes) ? descricoes : [])
                .map(item => normalizarPresetTexto(item).toUpperCase())
                .filter(Boolean)
                .map(descricao => ({
                    grupo: normalizarPresetTexto(grupo).toUpperCase(),
                    descricao
                }))
        );
    }

    const opcoesFiltradas = filtro
        ? opcoes.filter(item =>
            item.descricao.includes(filtro) ||
            item.grupo.includes(filtro)
        )
        : opcoes;

    currentJustificativaGrupoAtivo = grupoAtivo;
    if (justDescSearch) {
        justDescSearch.disabled = false;
        justDescSearch.placeholder = possuiGrupoSelecionado
            ? `Pesquisar descricao de ${grupoAtivo.toLowerCase()} ou trocar pelo grupo...`
            : "Pesquisar descricao para localizar o grupo relacionado";
    }

    renderizarChipsJustificativa(justDescSelected, descSelecionadas, "descricao");
    if (!justDescList) return;

    justDescList.innerHTML = opcoesFiltradas.length
        ? opcoesFiltradas.map(item => {
            const selecionado = descSelecionadas.includes(item.descricao);
            return `
                <button
                    type="button"
                    class="painel-justificativa-option ${selecionado ? "is-selected" : ""}"
                    onclick="selecionarDescricaoRelacionadaJustificativa('${escapeJsString(item.grupo)}', '${escapeJsString(item.descricao)}')">
                    <span class="painel-justificativa-option-check">${selecionado ? "✓" : ""}</span>
                    <span>
                        <strong>${escapeHtml(item.descricao)}</strong>
                        <small style="display:block; margin-top:3px; font-size:11px; font-weight:700; opacity:.78;">Grupo relacionado: ${escapeHtml(item.grupo)}</small>
                    </span>
                </button>
            `;
        }).join("")
        : `<div class="painel-justificativa-empty">${
            escapeHtml(
                possuiGrupoSelecionado
                    ? "Nenhuma descricao encontrada para este grupo."
                    : "Digite uma descricao para localizar o grupo relacionado."
            )
        }</div>`;
}

function obterLinhasContextoModal(data, uo) {
    const dataCtx = String(data || "");
    const uoCtx = String(uo || "");
    const cacheKey = ["linhasContexto", dataCtx, uoCtx].join("|");

    if (cacheLinhasContextoModal.has(cacheKey)) {
        return cacheLinhasContextoModal.get(cacheKey);
    }

    const linhas = (dados || []).filter(l => {
        if (dataCtx && normalizarDataExcel(l["Data"]) !== dataCtx) return false;
        if (uoCtx && String(l["Cód.UO"] || "") !== uoCtx) return false;
        return true;
    });

    cacheLinhasContextoModal.set(cacheKey, linhas);
    return linhas;
}

function obterValorColuna(linha, candidatos) {
    for (const nome of candidatos) {
        if (Object.prototype.hasOwnProperty.call(linha, nome)) {
            return linha[nome];
        }
    }
    return "";
}

function normalizarNomeColuna(nome) {
    return String(nome || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "");
}

function obterValorColunaPorFragmentos(linha, fragmentos) {
    const fragmentosNorm = fragmentos.map(f => normalizarNomeColuna(f));

    for (const chave of Object.keys(linha || {})) {
        const chaveNorm = normalizarNomeColuna(chave);
        if (fragmentosNorm.every(f => chaveNorm.includes(f))) {
            return linha[chave];
        }
    }

    return "";
}

function obterCodigoEquipeLinha(linha) {
    return String(
        obterValorColuna(linha, ["Cód. Equipe", "CÃ³d. Equipe", "CÃƒÂ³d. Equipe", "COD_EQUIPE"]) ||
        obterValorColunaPorFragmentos(linha, ["COD", "EQUIPE"]) ||
        ""
    ).trim();
}

function obterProducaoLinha(linha) {
    return toNumber(
        obterValorColuna(linha, ["Produção", "ProduÃ§Ã£o", "ProduÃƒÂ§ÃƒÂ£o", "PRODUCAO", "US_EXEC"]) ||
        obterValorColunaPorFragmentos(linha, ["PROD"]) ||
        0
    );
}

function obterFrotaLinha(linha) {
    const raw =
        (linha && (linha.NUM_EQUIPE ?? linha["NUM_EQUIPE"])) ??
        obterValorColunaPorFragmentos(linha, ["NUM", "EQUIPE"]) ??
        "";
    const s = String(raw ?? "").trim();
    return s || "-";
}

function fmt3(v) {
    return Number(v || 0).toFixed(3);
}

function fmt2(v) {
    return Number(v || 0).toFixed(2);
}

function fmtDecBR(v, casas = 2) {
    const n = Number(v || 0);
    if (!Number.isFinite(n)) return "-";
    return n.toFixed(casas).replace(".", ",");
}

function fmtBRL(v) {
    const n = Number(v || 0);
    if (!Number.isFinite(n)) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
}

function calcularPrevisaoNotaFinal(prod) {
    const p = Number(prod || 0);
    const tendencia = (p / 3) * 2;
    return p + tendencia;
}

function turnoComercialAtivo() {
    return String(turnoSelect?.value || "").trim().toUpperCase() === "COMERCIAL";
}

function calcularPrevisaoTabelaGeral(prod, horaAtual) {
    const p = Number(prod || 0);
    if (!turnoComercialAtivo()) {
        return calcularPrevisaoNotaFinal(p);
    }

    const horasAtual = obterHorasAcumuladas(horaAtual);
    const horasFechamento = obterHorasAcumuladas("17");
    if (!horasAtual || horasAtual >= horasFechamento) {
        // No fechamento, a previsao vira o realizado acumulado; antes disso,
        // ela acompanha a producao real do momento projetada ate 17h.
        return p;
    }

    return p * (horasFechamento / horasAtual);
}

function obterFaixaBasePrevisaoTabelaGeral(faixaAtual) {
    return turnoComercialAtivo() ? "11" : faixaAtual;
}

function escapeJsString(valor) {
    return String(valor ?? "")
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");
}

function escapeHtml(valor) {
    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function statusDadosGeral(payload) {
    const statusReport = String(payload?.report_csc_hoje?.status || "erro");
    const statusControle = String(payload?.controle_servico?.status || "erro");
    if (statusReport === "atrasado" || statusControle === "atrasado") return "atrasado";
    if (statusReport === "atencao" || statusControle === "atencao") return "atencao";
    return "ok";
}

function textoAtrasoMinutos(minutos) {
    const n = Number(minutos);
    if (!Number.isFinite(n) || n < 0) return "-";
    if (n < 60) return `${Math.round(n)} min`;
    const h = Math.floor(n / 60);
    const m = Math.round(n % 60);
    return m ? `${h}h ${m}min` : `${h}h`;
}

function montarAlertasStatusDados(payload) {
    const alertas = [];
    const report = payload?.report_csc_hoje || {};
    const controle = payload?.controle_servico || {};

    if (report.status === "atrasado") {
        alertas.push({
            status: "atrasado",
            texto: `report_csc_hoje atrasado: último snapshot ${report.ultima_data || "-"} ${report.ultima_hora ?? "-"}h.`
        });
    } else if (report.status === "atencao") {
        alertas.push({
            status: "atencao",
            texto: `report_csc_hoje ainda não chegou na hora atual. Último snapshot: ${report.ultima_hora ?? "-"}h.`
        });
    }

    if (controle.status === "atrasado" || controle.status === "atencao") {
        alertas.push({
            status: controle.status,
            texto: `controle_servico sem atualização recente: ${controle.ultima_atualizacao_br || "-"} (${textoAtrasoMinutos(controle.atraso_minutos)} atrás).`
        });
    }

    if (!alertas.length) {
        alertas.push({ status: "ok", texto: "Bases principais atualizadas dentro do limite esperado." });
    }

    return alertas;
}

function atualizarIndicadorStatusDados(payload) {
    if (!statusDadosTopo || !statusDadosResumo) return;

    currentStatusDados = payload;
    statusDadosTopo.classList.remove("status-ok", "status-atencao", "status-atrasado", "status-erro", "status-carregando");

    if (!payload?.ok) {
        statusDadosTopo.classList.add("status-erro");
        statusDadosResumo.innerText = "Falha ao verificar atualização dos dados. Clique para detalhes.";
        return;
    }

    const geral = statusDadosGeral(payload);
    const report = payload.report_csc_hoje || {};
    const controle = payload.controle_servico || {};
    statusDadosTopo.classList.add(`status-${geral}`);
    statusDadosResumo.innerText =
        `Report: ${report.ultima_data || "-"} ${report.ultima_hora ?? "-"}h | ` +
        `Controle: ${controle.ultima_atualizacao_br || "-"} | Horário de Brasília`;
}

async function carregarStatusDados() {
    try {
        const resp = await fetch("/api/status/dados", { cache: "no-store" });
        const payload = await resp.json();
        atualizarIndicadorStatusDados(payload);
        if (modalDiagnosticoDados && !modalDiagnosticoDados.classList.contains("hidden")) {
            renderizarDiagnosticoDados();
        }
    } catch (error) {
        atualizarIndicadorStatusDados({ ok: false, error: String(error?.message || error) });
    }
}

function renderizarDiagnosticoDados() {
    const payload = currentStatusDados;
    if (!diagnosticoDadosAlertas || !diagnosticoDadosGrid) return;

    if (!payload?.ok) {
        diagnosticoDadosAlertas.innerHTML = `<div class="diagnostico-alerta status-erro">Erro ao consultar status: ${escapeHtml(payload?.error || "-")}</div>`;
        diagnosticoDadosGrid.innerHTML = "";
        return;
    }

    diagnosticoDadosAlertas.innerHTML = montarAlertasStatusDados(payload).map(alerta => `
        <div class="diagnostico-alerta status-${escapeHtml(alerta.status)}">${escapeHtml(alerta.texto)}</div>
    `).join("");

    const report = payload.report_csc_hoje || {};
    const controle = payload.controle_servico || {};
    const codx = payload.report_csc_cod_x || {};
    const tz = payload.timezone || {};

    diagnosticoDadosGrid.innerHTML = `
        <div class="diagnostico-card">
            <h4>report_csc_hoje</h4>
            <dl>
                <dt>Status</dt><dd>${escapeHtml(report.status || "-")}</dd>
                <dt>Última data</dt><dd>${escapeHtml(report.ultima_data || "-")}</dd>
                <dt>Última hora</dt><dd>${escapeHtml(report.ultima_hora ?? "-")}h</dd>
                <dt>Linhas na hora</dt><dd>${escapeHtml(report.total_ultima_hora ?? "-")}</dd>
                <dt>Último ID</dt><dd>${escapeHtml(report.max_id ?? "-")}</dd>
            </dl>
        </div>
        <div class="diagnostico-card">
            <h4>controle_servico</h4>
            <dl>
                <dt>Status</dt><dd>${escapeHtml(controle.status || "-")}</dd>
                <dt>Última atualização</dt><dd>${escapeHtml(controle.ultima_atualizacao_br || "-")}</dd>
                <dt>Atraso</dt><dd>${escapeHtml(textoAtrasoMinutos(controle.atraso_minutos))}</dd>
                <dt>Linhas</dt><dd>${escapeHtml(controle.total_linhas ?? "-")}</dd>
                <dt>Último encerramento</dt><dd>${escapeHtml(controle.ultimo_encerramento_br || "-")}</dd>
            </dl>
        </div>
        <div class="diagnostico-card">
            <h4>Banco e fuso</h4>
            <dl>
                <dt>Referência</dt><dd>${escapeHtml(tz.label || "Horário de Brasília")}</dd>
                <dt>Agora no MySQL</dt><dd>${escapeHtml(tz.now_br || "-")}</dd>
                <dt>Fuso do sistema</dt><dd>${escapeHtml(tz.system || "-")}</dd>
                <dt>Offset</dt><dd>${escapeHtml(tz.offset || "-")}</dd>
            </dl>
        </div>
        <div class="diagnostico-card">
            <h4>report_csc_cod_x</h4>
            <dl>
                <dt>Linhas</dt><dd>${escapeHtml(codx.total_linhas ?? "-")}</dd>
                <dt>Último ID</dt><dd>${escapeHtml(codx.max_id ?? "-")}</dd>
            </dl>
        </div>
    `;
}

function abrirModalDiagnostico() {
    if (!modalDiagnosticoDados) return;
    renderizarDiagnosticoDados();
    modalDiagnosticoDados.classList.remove("hidden");
    carregarStatusDados();
}

function fecharModalDiagnostico() {
    if (modalDiagnosticoDados) modalDiagnosticoDados.classList.add("hidden");
}

function normalizarBusca(valor) {
    return String(valor || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .trim();
}

function obterLinhasParaFerramentas() {
    return Array.isArray(dadosBase) && dadosBase.length ? dadosBase : (Array.isArray(dados) ? dados : []);
}

function resumirLinhaEquipe(linha) {
    if (!linha) return null;
    return {
        codigo: obterCodigoEquipeLinha(linha),
        frota: obterFrotaLinha(linha),
        nome: String(obterValorColuna(linha, ["Nome", "NOME", "EQUIPE"]) || linha.Nome || "-").trim(),
        data: normalizarDataExcel(obterValorColuna(linha, ["DATA", "Data"]) || linha.DATA || linha.Data || ""),
        hora: normalizarHora(obterValorColuna(linha, ["Hora", "HORA", "hora_atualizacao"]) || linha.Hora || linha.hora_atualizacao || ""),
        uo: String(obterValorColuna(linha, ["UO", "COD_UO"]) || linha.UO || linha.COD_UO || "").trim(),
        supervisor: String(linha["SUPERVISOR - SETOR"] || "-").trim(),
        lider: String(linha["LIDER DE POSTO - SETOR"] || "-").trim(),
        controlador: String(linha["CONTROLADOR - SETOR"] || "-").trim(),
        meta: toNumber(obterValorColuna(linha, ["Meta Prog."]) || linha["Meta Prog."]),
        prod: obterProducaoLinha(linha),
        inicioJornada: linha["INICIO_JORNADA"] ?? linha["Inicio Jornada"] ?? linha.inicio_jornada ?? ""
    };
}

function textoBuscaLinha(linha) {
    const r = resumirLinhaEquipe(linha) || {};
    return normalizarBusca([
        r.codigo,
        r.frota,
        r.nome,
        r.supervisor,
        r.lider,
        r.controlador,
        r.data,
        r.hora,
        r.uo
    ].join(" "));
}

function buscarEquipes(termo, limite = 30) {
    const q = normalizarBusca(termo);
    if (!q) return [];

    const vistos = new Set();
    const resultados = [];
    const linhas = obterLinhasParaFerramentas();

    for (const linha of linhas) {
        if (!textoBuscaLinha(linha).includes(q)) continue;
        const r = resumirLinhaEquipe(linha);
        if (!r?.codigo && !r?.nome) continue;
        const chave = `${r.codigo}|${r.frota}|${r.nome}|${r.data}|${r.hora}`;
        if (vistos.has(chave)) continue;
        vistos.add(chave);
        resultados.push({ linha, resumo: r });
        if (resultados.length >= limite) break;
    }

    return resultados;
}

function abrirBuscaGlobal() {
    if (!modalBuscaGlobal) return;
    modalBuscaGlobal.classList.remove("hidden");
    if (buscaGlobalInput) {
        buscaGlobalInput.value = "";
        setTimeout(() => buscaGlobalInput.focus(), 20);
    }
    if (buscaGlobalResultados) {
        buscaGlobalResultados.innerHTML = `<div class="resultado-ferramenta"><small>Digite para localizar equipes em todos os dados carregados.</small></div>`;
    }
}

function fecharBuscaGlobal() {
    if (modalBuscaGlobal) modalBuscaGlobal.classList.add("hidden");
}

function renderizarBuscaGlobal() {
    if (!buscaGlobalInput || !buscaGlobalResultados) return;
    const termo = buscaGlobalInput.value;
    const resultados = buscarEquipes(termo, 40);

    if (!String(termo || "").trim()) {
        buscaGlobalResultados.innerHTML = `<div class="resultado-ferramenta"><small>Digite para localizar equipes em todos os dados carregados.</small></div>`;
        return;
    }

    if (!resultados.length) {
        buscaGlobalResultados.innerHTML = `<div class="resultado-ferramenta"><strong>Nenhum resultado</strong><small>Tente buscar pelo codigo, frota ou parte do nome da equipe.</small></div>`;
        return;
    }

    buscaGlobalResultados.innerHTML = resultados.map(({ resumo }) => `
        <div class="resultado-ferramenta">
            <strong>${escapeHtml(resumo.nome || "-")}</strong>
            <small>
                Codigo: ${escapeHtml(resumo.codigo || "-")} | Frota: ${escapeHtml(resumo.frota || "-")} |
                Data: ${escapeHtml(formatarDataBR(resumo.data) || "-")} | Hora: ${escapeHtml(resumo.hora || "-")}h | UO: ${escapeHtml(resumo.uo || "-")}
                <br>Supervisor: ${escapeHtml(resumo.supervisor || "-")} | Lider: ${escapeHtml(resumo.lider || "-")} | Controlador: ${escapeHtml(resumo.controlador || "-")}
            </small>
            <button type="button" onclick="abrirInvestigarEquipe('${escapeJsString(resumo.codigo || resumo.frota || resumo.nome)}')">Investigar</button>
        </div>
    `).join("");
}

function abrirInvestigarEquipe(valor = "") {
    if (!modalInvestigarEquipe) return;
    modalInvestigarEquipe.classList.remove("hidden");
    if (investigarEquipeInput) {
        investigarEquipeInput.value = String(valor || "");
        setTimeout(() => investigarEquipeInput.focus(), 20);
    }
    if (String(valor || "").trim()) {
        executarInvestigacaoEquipe();
    } else if (investigarEquipeResultado) {
        investigarEquipeResultado.innerHTML = `<div class="resultado-ferramenta"><small>Informe uma equipe para ver os dados carregados no painel.</small></div>`;
    }
}

function fecharInvestigarEquipe() {
    if (modalInvestigarEquipe) modalInvestigarEquipe.classList.add("hidden");
}

function executarInvestigacaoEquipe() {
    if (!investigarEquipeInput || !investigarEquipeResultado) return;
    const termo = investigarEquipeInput.value;
    const encontrados = buscarEquipes(termo, 300);

    if (!String(termo || "").trim()) {
        investigarEquipeResultado.innerHTML = `<div class="resultado-ferramenta"><strong>Digite uma equipe</strong><small>Use nome, frota ou codigo.</small></div>`;
        return;
    }

    if (!encontrados.length) {
        investigarEquipeResultado.innerHTML = `<div class="resultado-ferramenta"><strong>Nao encontrei nos dados carregados</strong><small>Verifique se a data/UO atual carregou essa equipe ou atualize os dados.</small></div>`;
        return;
    }

    const resumos = encontrados.map(x => x.resumo);
    const ordenados = [...resumos].sort((a, b) => String(`${b.data} ${b.hora}`).localeCompare(String(`${a.data} ${a.hora}`)));
    const principal = ordenados[0];
    const horas = [...new Set(resumos.map(r => r.hora).filter(Boolean))].sort().join(", ") || "-";
    const uos = [...new Set(resumos.map(r => r.uo).filter(Boolean))].join(", ") || "-";
    const datas = [...new Set(resumos.map(r => r.data).filter(Boolean))].sort().map(formatarDataBR).join(", ") || "-";
    const ultimaMeta = Number(principal.meta || 0);
    const ultimaProd = Number(principal.prod || 0);
    const perc = ultimaMeta > 0 ? `${((ultimaProd / ultimaMeta) * 100).toFixed(2)}%` : "-";

    investigarEquipeResultado.innerHTML = `
        <div class="resultado-ferramenta">
            <strong>${escapeHtml(principal.nome || "-")}</strong>
            <div class="investigacao-grid">
                <div class="investigacao-item"><span>Codigo</span><strong>${escapeHtml(principal.codigo || "-")}</strong></div>
                <div class="investigacao-item"><span>Frota</span><strong>${escapeHtml(principal.frota || "-")}</strong></div>
                <div class="investigacao-item"><span>Datas encontradas</span><strong>${escapeHtml(datas)}</strong></div>
                <div class="investigacao-item"><span>Horas encontradas</span><strong>${escapeHtml(horas)}</strong></div>
                <div class="investigacao-item"><span>UO</span><strong>${escapeHtml(uos)}</strong></div>
                <div class="investigacao-item"><span>Ultimo snapshot</span><strong>${escapeHtml(formatarDataBR(principal.data) || "-")} ${escapeHtml(principal.hora || "-")}h</strong></div>
                <div class="investigacao-item"><span>Supervisor</span><strong>${escapeHtml(principal.supervisor || "-")}</strong></div>
                <div class="investigacao-item"><span>Lider</span><strong>${escapeHtml(principal.lider || "-")}</strong></div>
                <div class="investigacao-item"><span>Controlador</span><strong>${escapeHtml(principal.controlador || "-")}</strong></div>
                <div class="investigacao-item"><span>Inicio jornada</span><strong>${escapeHtml(horaExcelParaTexto(principal.inicioJornada) || "-")}</strong></div>
                <div class="investigacao-item"><span>Meta / Producao</span><strong>${escapeHtml(fmt3(ultimaMeta))} / ${escapeHtml(fmt3(ultimaProd))}</strong></div>
                <div class="investigacao-item"><span>% producao</span><strong>${escapeHtml(perc)}</strong></div>
            </div>
        </div>
    `;
}

function obterCampoPorTipo(tipo) {
    return tipo === "SUPERVISOR"
        ? "SUPERVISOR - SETOR"
        : tipo === "LIDER DE POSTO"
            ? "LIDER DE POSTO - SETOR"
            : "CONTROLADOR - SETOR";
}

function rotuloTipoAtual() {
    const tipo = tipoSelect?.value || "SUPERVISOR";
    return tipo === "SUPERVISOR"
        ? "Supervisor"
        : tipo === "LIDER DE POSTO"
            ? "Líder"
            : "Controlador";
}

function rotuloGrupoExibicao(nomeGrupo) {
    const n = String(nomeGrupo || "").trim();
    return !n || n === "N/I" ? ROTULO_NI : n;
}

function textoContemMtami(valor) {
    return String(valor || "")
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .includes("MTAMI");
}

function nomeEhClusterMtami(...candidatos) {
    return candidatos.some(valor => textoContemMtami(valor));
}

function ajustarMetaClusterMtami(meta, ...candidatos) {
    const valor = Number(meta || 0);
    return nomeEhClusterMtami(...candidatos) ? valor * 2 : valor;
}

function modoPeriodoAtivo() {
    return !(modoTabela === "diario" || modoTabela === "geral" || modoTabela === "total-horas");
}

function obterListaHorasPorModo(modo = modoTabela) {
    return modo === "total-horas" ? HORAS_TOTAIS : FAIXAS;
}

function obterHorasVisiveisTabela(horaReferencia, modo = modoTabela) {
    const horasBase = obterListaHorasPorModo(modo);
    const raw = String(horaReferencia || "").trim().toUpperCase();
    if (raw === "TOTAL") return horasBase;

    const hora = normalizarHora(horaReferencia);
    const idx = horasBase.indexOf(hora);
    return idx >= 0 ? horasBase.slice(0, idx + 1) : horasBase;
}

function atualizarOpcoesHora() {
    if (!horaSelect) return;

    const valorAtual = String(horaSelect.value || "").trim().toUpperCase();
    const horas = obterListaHorasPorModo(modoTabela);
    const totalLabel = modoTabela === "total-horas" ? "Tabela total (01-23)" : "Tabela total";

    horaSelect.innerHTML =
        `<option value="">Auto (ultima)</option>` +
        `<option value="TOTAL">${totalLabel}</option>` +
        horas.map(hora => `<option value="${hora}">${hora}h</option>`).join("");

    const valorValido = valorAtual && (
        valorAtual === "TOTAL" ||
        horas.includes(normalizarHora(valorAtual))
    );

    horaSelect.value = valorValido
        ? (valorAtual === "TOTAL" ? "TOTAL" : normalizarHora(valorAtual))
        : "";
}

function montarParametrosDadosPainel({ forcarTotalHoras = false } = {}) {
    const qs = new URLSearchParams();
    const uo = String(uoSelect?.value || "").trim();
    qs.set("compact", "1");

    if (forcarTotalHoras || modoTabela === "total-horas") {
        qs.set("strictHours", "false");
    }

    if (uo) qs.set("uo", uo);

    if (modoTabela === "semanal") {
        const semana = String(semanaSelect?.value || "").trim();
        const intervalo = semana ? obterInicioEFimSemanaPorInput(semana) : null;
        if (intervalo?.inicio && intervalo?.fim) {
            qs.set("dataStart", intervalo.inicio);
            qs.set("dataEnd", intervalo.fim);
            return qs;
        }
    }

    if (modoTabela === "mensal" || modoTabela === "quinzena1" || modoTabela === "quinzena2") {
        const anoMes = String(mesSelect?.value || obterAnoMesAtual()).trim();
        if (anoMes) {
            const [ano, mes] = anoMes.split("-").map(Number);
            if (ano && mes) {
                let inicio = `${anoMes}-01`;
                let fim = formatISODateLocal(new Date(ano, mes, 0));

                if (modoTabela === "quinzena1") {
                    fim = `${anoMes}-15`;
                } else if (modoTabela === "quinzena2") {
                    inicio = `${anoMes}-16`;
                }

                qs.set("dataStart", inicio);
                qs.set("dataEnd", fim);
                return qs;
            }
        }
    }

    const data = String(dataSelect?.value || obterHojeISO()).trim();
    if (data) qs.set("data", data);
    return qs;
}

async function carregarDadosPainelAtual({ forcar = false, forcarTotalHoras = false } = {}) {
    const qs = montarParametrosDadosPainel({ forcarTotalHoras });
    const chave = qs.toString();

    if (!forcar && chaveDadosCarregados === chave && Array.isArray(dados) && dados.length) {
        return true;
    }

    const seq = ++reqSeqDadosPainel;

    try {
        const resp = await fetch(`/api/report?${chave}`, { cache: "no-store" });
        if (!resp.ok) return false;
        const payload = await resp.json();
        if (seq !== reqSeqDadosPainel) return false;

        dados = normalizarColecaoPainel(payload?.rows || []);
        dadosBase = Array.isArray(dados) ? dados.slice() : [];
        chaveDadosCarregados = chave;
        limparCachesModal();

        if (modoTabela === "semanal") {
            popularSemanasDisponiveis();
        }

        return true;
    } catch (error) {
        console.error("Erro ao carregar dados do painel:", error);
        return false;
    }
}

function obterHorasAcumuladas(hora) {
    const hh = normalizarHora(hora);
    if (!hh) return 0;
    if (HORAS_ACUM[hh] !== undefined) return Number(HORAS_ACUM[hh] || 0);

    const h = Number(hh);
    if (!Number.isFinite(h)) return 0;

    // Regra observada (linear): 07->0, 09->1.8, 11->3.6, 13->5.4, 15->7.2, 17->9
    const acum = (h - 7) * 0.9;
    if (!Number.isFinite(acum)) return 0;
    return Math.max(0, Math.min(9, Number(acum.toFixed(1))));
}

function obterHoraLinha(linha) {
    if (!linha) return "";

    // Na "Tabela Total", usa o valor bruto (hora_atualizacao) para permitir 01–23.
    if (modoTabela === "total-horas") {
        return normalizarHora(linha.hora_atualizacao ?? linha["hora_atualizacao"] ?? linha.HoraRaw ?? linha["HoraRaw"] ?? linha["Hora"]);
    }

    return normalizarHora(linha["Hora"]);
}

function obterHoraLinhaModalEquipes(linha) {
    if (!linha) return "";
    if (turnoTardeAtivo() || turnoMadrugadaAtivo()) {
        return normalizarHora(
            linha.hora_atualizacao ??
            linha["hora_atualizacao"] ??
            linha.HoraRaw ??
            linha["HoraRaw"] ??
            linha["Hora"]
        );
    }
    return obterHoraLinha(linha);
}

function normalizarStatusJornada(status) {
    const s = String(status || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();

    if (s === "COMPLETA") return "COMPLETA";
    if (s === "INCOMPLETA") return "INCOMPLETA";
    if (s === "SEM ATENDIMENTO") return "SEM ATENDIMENTO";
    return "-";
}

function obterClasseStatusJornada(status) {
    const s = String(status || "").toUpperCase();
    if (s === "INCOMPLETA") return "status-incompleta";
    if (s === "COMPLETA") return "status-completa";
    if (s === "SEM ATENDIMENTO") return "status-sem-atendimento";
    return "";
}

function montarCabecalho(tipo, incluirPeriodo = false, horasVisiveis = FAIXAS) {
    theadRow.innerHTML = `
        ${incluirPeriodo ? "<th>Período</th>" : ""}
        <th>${tipo}</th>
        <th>Meta</th>
        <th>Produção</th>
        ${horasVisiveis.map(f => `<th>${f}h</th>`).join("")}
        <th>Total Eq.</th>
        <th>EQ AA</th>
        <th>EQ A</th>
        <th>EQ B</th>
        <th>EQ C</th>
        <th>EQ D</th>
    `;
}

function montarCabecalhoGeral(tipo) {
    theadRow.innerHTML = `
        <th>${tipo}</th>
        <th>Meta Dia</th>
        <th>Produção</th>
        <th>Faixa Dia</th>
        <th>% PROD.DIA</th>
        <th>Previsão Dia</th>
        <th>Prev. % Meta</th>
        <th>Prev. Faixa</th>
        <th>Total Eq.</th>
        <th>Med. Serv. Design.</th>
        <th>Med. Serv.</th>
        <th>Med. Produt.</th>
        <th>Med. Improd.</th>
        <th>Med. Início Jornada</th>
        <th>Med. 1º Atend.</th>
        <th>Med. Ult. Atend.</th>
        <th>Med. Jornada Prod.</th>
    `;
}

function mediaNumerica(valores = []) {
    const nums = valores
        .map(v => Number(v))
        .filter(v => Number.isFinite(v));
    if (!nums.length) return 0;
    return nums.reduce((acc, v) => acc + v, 0) / nums.length;
}

function minutosParaHoraTexto(totalMinutos) {
    const minutos = Number(totalMinutos);
    if (!Number.isFinite(minutos) || minutos < 0) return "-";
    const total = Math.round(minutos);
    const h = String(Math.floor(total / 60)).padStart(2, "0");
    const m = String(total % 60).padStart(2, "0");
    return `${h}:${m}`;
}

function garantirColunaInicioJornada(tableRow) {
    if (!tableRow) return;

    const normalizarCabecalho = valor =>
        String(valor || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "")
            .trim();

    const headers = [...tableRow.querySelectorAll("th")];
    const jaExiste = headers.some(th =>
        normalizarCabecalho(th.textContent).includes("INICIOJORNADA")
    );

    if (jaExiste) return;

    const headerPrimeiroAtend = headers.find(th =>
        normalizarCabecalho(th.textContent).includes("ATEND")
    );

    if (!headerPrimeiroAtend) return;

    const novoHeader = document.createElement("th");
    novoHeader.innerHTML = "INICIO<br>JORNADA";
    tableRow.insertBefore(novoHeader, headerPrimeiroAtend);
}

function aplicarVisualKpiFaixa(faixa) {
    kpiFaixa.className = "kpi faixa-" + faixa;
}

function atualizarRotuloKpiAA() {
    const titulo = kpiAA?.previousElementSibling;
    if (!titulo) return;
    titulo.innerText = modoTabela === "geral" ? "Serviços Designados" : "AA";
}

function atualizarRotuloKpiA() {
    const titulo = kpiA?.previousElementSibling;
    if (!titulo) return;
    titulo.innerText = modoTabela === "geral" ? "Serviços Produtivos" : "A";
}

function atualizarRotuloKpiB() {
    const titulo = kpiB?.previousElementSibling;
    if (!titulo) return;
    titulo.innerText = modoTabela === "geral" ? "% IMPROD." : "B";
}

function atualizarVisibilidadeKpiExecutados() {
    if (!cardKpiExecutados) return;
    cardKpiExecutados.classList.toggle("hidden", modoTabela !== "geral");
}

function atualizarVisibilidadeKpiImprodBruto() {
    if (!cardKpiImprodBruto) return;
    cardKpiImprodBruto.classList.toggle("hidden", modoTabela !== "geral");
}

function atualizarEstiloKpisGerais() {
    const cards = [
        kpiAA?.closest(".kpi"),
        cardKpiExecutados,
        kpiA?.closest(".kpi"),
        cardKpiImprodBruto,
        kpiB?.closest(".kpi")
    ].filter(Boolean);

    cards.forEach((card) => {
        card.classList.toggle("kpi-aa", false);
        card.classList.toggle("kpi-a", false);
        card.classList.toggle("kpi-b", false);
        card.classList.toggle("kpi-c", false);
        card.classList.toggle("kpi-d", false);
    });

    if (modoTabela !== "geral") {
        kpiAA?.closest(".kpi")?.classList.add("kpi-aa");
        kpiA?.closest(".kpi")?.classList.add("kpi-a");
        kpiB?.closest(".kpi")?.classList.add("kpi-b");
    }
}

function atualizarEstiloKpiPercImprod(percentual = 0) {
    if (!kpiB) return;
    kpiB.style.color = modoTabela === "geral"
        ? (percentual > 20 ? "#dc2626" : "#15803d")
        : "#111827";
}

function aplicarKpisResumoTabelaGeral(resumo) {
    if (!resumo) return;

    const metaDia = Number(resumo.metaDia || 0);
    const prodDia = Number(resumo.prodDia || 0);
    const totalEq = Number(resumo.totalEq || 0);
    const totalDesignados = Number(resumo.totalServicosDesignados || 0);
    const totalExecutados = Number(resumo.totalServicosExecutados || 0);
    const totalProdutivos = Number(resumo.totalServicosProdutivos || 0);
    const totalImprodutivos = Number(resumo.totalServicosImprodutivos || 0);
    const percImprod = totalExecutados > 0 ? (totalImprodutivos / totalExecutados) * 100 : 0;
    const percProdDia = metaDia > 0 ? (prodDia / metaDia) * 100 : 0;
    const faixa = classificar(percProdDia);
    const saldo = prodDia - metaDia;

    atualizarRotuloKpiAA();
    atualizarRotuloKpiA();
    atualizarRotuloKpiB();
    atualizarVisibilidadeKpiExecutados();
    atualizarVisibilidadeKpiImprodBruto();
    atualizarEstiloKpisGerais();

    kpiMeta.innerText = fmt3(metaDia);
    kpiProd.innerText = fmt3(prodDia);
    kpiSaldo.innerText = fmt3(saldo);
    kpiSaldo.style.color = saldo < 0 ? "#dc2626" : "#15803d";
    kpiFaixaTxt.innerText = `${faixa} - ${percProdDia.toFixed(0)}%`;
    aplicarVisualKpiFaixa(faixa);

    kpiFT.innerText = Number(totalEq || 0).toFixed(0);
    kpiAA.innerText = Number(totalDesignados || 0).toFixed(0);
    if (kpiExecutados) kpiExecutados.innerText = Number(totalExecutados || 0).toFixed(0);
    kpiA.innerText = Number(totalProdutivos || 0).toFixed(0);
    if (kpiImprodBruto) kpiImprodBruto.innerText = Number(totalImprodutivos || 0).toFixed(0);
    kpiB.innerText = `${percImprod.toFixed(2)}%`;
    atualizarEstiloKpiPercImprod(percImprod);
}

function atualizarSelecaoSupervisorTabelaGeralUI() {
    if (modoTabela !== "geral") return;

    document.querySelectorAll("#tbody tr[data-supervisor-geral]").forEach((linha) => {
        const ativo = String(linha.dataset.supervisorGeral || "") === String(currentTabelaGeralSupervisorSelecionado || "");
        linha.classList.toggle("selecionada", ativo);
    });
}

function alternarKpisSupervisorTabelaGeral(nomeSupervisor) {
    if (modoTabela !== "geral" || !currentTabelaGeralResumo) return;

    const nome = String(nomeSupervisor || "").trim();
    currentTabelaGeralSupervisorSelecionado =
        currentTabelaGeralSupervisorSelecionado === nome ? "" : nome;

    const resumoSelecionado = currentTabelaGeralSupervisorSelecionado
        ? currentTabelaGeralResumo.porSupervisor[currentTabelaGeralSupervisorSelecionado]
        : currentTabelaGeralResumo.total;

    aplicarKpisResumoTabelaGeral(resumoSelecionado || currentTabelaGeralResumo.total);
    atualizarSelecaoSupervisorTabelaGeralUI();
}

function zerarKpis(casasQtd = 0) {
    atualizarRotuloKpiAA();
    atualizarRotuloKpiA();
    atualizarRotuloKpiB();
    atualizarVisibilidadeKpiExecutados();
    atualizarVisibilidadeKpiImprodBruto();
    atualizarEstiloKpisGerais();
    kpiMeta.innerText = "0.000";
    kpiProd.innerText = "0.000";
    kpiSaldo.innerText = "0.000";
    kpiSaldo.style.color = "#111827";

    kpiFaixaTxt.innerText = "D - 0%";
    aplicarVisualKpiFaixa("D");

    kpiAA.innerText = Number(0).toFixed(casasQtd);
    if (kpiExecutados) kpiExecutados.innerText = Number(0).toFixed(casasQtd);
    kpiA.innerText = Number(0).toFixed(casasQtd);
    if (kpiImprodBruto) kpiImprodBruto.innerText = Number(0).toFixed(casasQtd);
    kpiB.innerText = Number(0).toFixed(casasQtd);
    atualizarEstiloKpiPercImprod(0);
    kpiC.innerText = Number(0).toFixed(casasQtd);
    kpiD.innerText = Number(0).toFixed(casasQtd);
    kpiFT.innerText = Number(0).toFixed(casasQtd);
}

function atualizarKpis(totalMeta, totalProd, eqTot, casasQtd = 0) {
    atualizarRotuloKpiAA();
    atualizarRotuloKpiA();
    atualizarRotuloKpiB();
    atualizarVisibilidadeKpiExecutados();
    atualizarVisibilidadeKpiImprodBruto();
    atualizarEstiloKpisGerais();
    kpiMeta.innerText = fmt3(totalMeta);
    kpiProd.innerText = fmt3(totalProd);

    const saldo = totalProd - totalMeta;
    kpiSaldo.innerText = fmt3(saldo);
    kpiSaldo.style.color = saldo < 0 ? "#dc2626" : "#15803d";

    const perc = totalMeta ? (totalProd / totalMeta) * 100 : 0;
    const fxG = classificar(perc);

    kpiFaixaTxt.innerText = `${fxG} - ${perc.toFixed(0)}%`;
    aplicarVisualKpiFaixa(fxG);

    const totalEqGeral = eqTot.AA + eqTot.A + eqTot.B + eqTot.C + eqTot.D;

    kpiAA.innerText = Number(eqTot.AA || 0).toFixed(casasQtd);
    kpiA.innerText = Number(eqTot.A || 0).toFixed(casasQtd);
    kpiB.innerText = Number(eqTot.B || 0).toFixed(casasQtd);
    atualizarEstiloKpiPercImprod(0);
    kpiC.innerText = Number(eqTot.C || 0).toFixed(casasQtd);
    kpiD.innerText = Number(eqTot.D || 0).toFixed(casasQtd);
    kpiFT.innerText = Number(totalEqGeral || 0).toFixed(casasQtd);
}

function limparTelaSemDados(tipo, mensagem = "Nenhum dado encontrado") {
    const horasVisiveis = (modoTabela === "diario" || modoTabela === "total-horas")
        ? obterHorasVisiveisTabela(horaSelect?.value || "", modoTabela)
        : FAIXAS;
    montarCabecalho(tipo, false, horasVisiveis);
    const colspan = (horasVisiveis.length || FAIXAS.length) + 9;
    tbody.innerHTML = `<tr><td colspan="${colspan}">${mensagem}</td></tr>`;
    zerarKpis(modoTabela === "diario" ? 0 : 2);
    filtrosAtivos = {};
    adicionarFiltrosExcel();
}

function atualizarMenuAtivo(modo) {
    menuModoItens.forEach(item => {
        item.classList.toggle("ativo", item.dataset.modo === modo);
    });
}

function setModo(modo, reaplicar = true) {
    modoTabela = modo;
    atualizarRotuloKpiAA();
    atualizarRotuloKpiA();
    atualizarRotuloKpiB();
    atualizarVisibilidadeKpiExecutados();
    atualizarVisibilidadeKpiImprodBruto();
    atualizarEstiloKpisGerais();

    const titulos = {
        diario: "Tabela Diária",
        "total-horas": "Tabela Total (01–23)",
        geral: "Tabela Geral",
        semanal: "Tabela Semanal",
        mensal: "Tabela Mensal",
        quinzena1: "1ª Quinzena",
        quinzena2: "2ª Quinzena",
        "report-nec": "Painel Report NEC",
        "report-jornada": "Report Jornada"
    };

    const modoPainelExternoAtivo = modo === "report-nec" || modo === "report-jornada";

    if (modoAtualTxt) {
        modoAtualTxt.innerText = titulos[modo] || "Tabela Diária";
    }

    atualizarMenuAtivo(modo);

    if (filtrosEsquerda) filtrosEsquerda.classList.toggle("hidden", modoPainelExternoAtivo);
    if (filtrosDireita) filtrosDireita.classList.toggle("hidden", modoPainelExternoAtivo);
    if (statusbarPrincipal) statusbarPrincipal.classList.toggle("hidden", modoPainelExternoAtivo);
    if (areaRelatorioPadrao) areaRelatorioPadrao.classList.toggle("hidden", modoPainelExternoAtivo);
    if (areaRelatorioNec) areaRelatorioNec.classList.toggle("hidden", modo !== "report-nec");
    if (areaRelatorioJornada) areaRelatorioJornada.classList.toggle("hidden", modo !== "report-jornada");
    if (footerPrincipal) footerPrincipal.classList.toggle("hidden", modoPainelExternoAtivo);

    if (modo === "report-nec") {
        carregarIframeSobDemanda(document.getElementById("iframeReportNec"));
    }

    if (modo === "report-jornada") {
        carregarIframeSobDemanda(iframeReportJornada);
    }

    const modoDiarioAtivo = modo === "diario" || modo === "geral" || modo === "total-horas";
    if (grupoData) grupoData.classList.toggle("hidden", modoPainelExternoAtivo || !modoDiarioAtivo);
    if (grupoHora) grupoHora.classList.toggle("hidden", modoPainelExternoAtivo || !modoDiarioAtivo);
    if (grupoSemana) grupoSemana.classList.toggle("hidden", modoPainelExternoAtivo || modo !== "semanal");
    if (grupoMes) grupoMes.classList.toggle(
        "hidden",
        modoPainelExternoAtivo || !(modo === "mensal" || modo === "quinzena1" || modo === "quinzena2")
    );

    if (modoPainelExternoAtivo) return;

    atualizarOrdemKpisPrincipais();

    if (modo === "diario" && dataSelect && !dataSelect.value) {
        dataSelect.value = obterHojeISO();
    }

    if (modo === "geral" && dataSelect && !dataSelect.value) {
        dataSelect.value = obterHojeISO();
    }

    if (modo === "total-horas" && dataSelect && !dataSelect.value) {
        dataSelect.value = obterHojeISO();
    }

    if (modo === "semanal") {
        popularSemanasDisponiveis();
    }

    if ((modo === "mensal" || modo === "quinzena1" || modo === "quinzena2") && mesSelect && !mesSelect.value) {
        mesSelect.value = obterAnoMesAtual();
    }

    atualizarOpcoesHora();

    if (reaplicar && dados.length) {
        if (modo === "total-horas") {
            garantirDadosTotalHoras().finally(() => aplicar());
            return;
        }

        carregarDadosPainelAtual().finally(() => aplicar());
    }
}

function atualizarOrdemKpisPrincipais() {
    const cardForcaTrab = kpiFT?.closest(".kpi");
    const cardSaldo = kpiSaldo?.closest(".kpi");
    const cardDesignados = kpiAA?.closest(".kpi");
    const cardExecutados = cardKpiExecutados;
    const cardProdutivos = kpiA?.closest(".kpi");
    const cardImprodBruto = cardKpiImprodBruto;
    const cardC = kpiC?.closest(".kpi");
    const cardD = kpiD?.closest(".kpi");
    const blocoKpis = cardForcaTrab?.parentElement;

    if (!cardForcaTrab || !cardSaldo || !blocoKpis) return;

    if (modoTabela === "geral") {
        if (cardC) cardC.classList.add("hidden");
        if (cardD) cardD.classList.add("hidden");
        if (cardSaldo.nextElementSibling !== cardForcaTrab) {
            blocoKpis.insertBefore(cardForcaTrab, cardSaldo.nextElementSibling);
        }
        if (cardExecutados && cardDesignados) {
            blocoKpis.insertBefore(cardExecutados, cardDesignados.nextElementSibling);
        }
        if (cardProdutivos && cardExecutados) {
            blocoKpis.insertBefore(cardProdutivos, cardExecutados.nextElementSibling);
        }
        if (cardImprodBruto && cardProdutivos) {
            blocoKpis.insertBefore(cardImprodBruto, cardProdutivos.nextElementSibling);
        }
        if (kpiB?.closest(".kpi") && cardImprodBruto) {
            blocoKpis.insertBefore(kpiB.closest(".kpi"), cardImprodBruto.nextElementSibling);
        }
        return;
    }

    if (cardC) cardC.classList.remove("hidden");
    if (cardD) cardD.classList.remove("hidden");

    if (blocoKpis.lastElementChild !== cardForcaTrab) {
        blocoKpis.appendChild(cardForcaTrab);
    }
    if (cardExecutados && cardDesignados) {
        blocoKpis.insertBefore(cardExecutados, cardDesignados.nextElementSibling);
    }
    if (cardImprodBruto && cardProdutivos) {
        blocoKpis.insertBefore(cardImprodBruto, cardProdutivos.nextElementSibling);
    }
}

/* ================= SEMANAS ================= */

function obterSemanaISODeData(dataISO) {
    const dt = new Date(dataISO + "T00:00:00");
    const dia = (dt.getDay() + 6) % 7;
    dt.setDate(dt.getDate() - dia + 3);

    const ano = dt.getFullYear();

    const primeiraQuinta = new Date(ano, 0, 4);
    const diaPrimeiraQuinta = (primeiraQuinta.getDay() + 6) % 7;
    primeiraQuinta.setDate(primeiraQuinta.getDate() - diaPrimeiraQuinta + 3);

    const semana = 1 + Math.round((dt - primeiraQuinta) / (7 * 24 * 60 * 60 * 1000));

    return `${ano}-W${String(semana).padStart(2, "0")}`;
}

function obterInicioEFimSemanaPorInput(semanaStr) {
    const match = /^(\d{4})-W(\d{2})$/.exec(semanaStr);
    if (!match) return { inicio: "", fim: "" };

    const ano = Number(match[1]);
    const semana = Number(match[2]);

    const jan4 = new Date(ano, 0, 4);
    const diaJan4 = (jan4.getDay() + 6) % 7;
    const segundaSemana1 = new Date(jan4);
    segundaSemana1.setDate(jan4.getDate() - diaJan4);

    const inicio = new Date(segundaSemana1);
    inicio.setDate(segundaSemana1.getDate() + (semana - 1) * 7);

    const fim = new Date(inicio);
    fim.setDate(inicio.getDate() + 6);

    return {
        inicio: formatISODateLocal(inicio),
        fim: formatISODateLocal(fim)
    };
}

function popularSemanasDisponiveis() {
    if (!semanaSelect) return;

    const valorAtual = semanaSelect.value;
    const uo = uoSelect.value;

    const semanas = [...new Set(
        dados
            .filter(l => {
                const data = normalizarDataExcel(l["Data"]);
                if (!data) return false;
                if (uo && String(l["Cód.UO"]) !== String(uo)) return false;
                return true;
            })
            .map(l => obterSemanaISODeData(normalizarDataExcel(l["Data"])))
            .filter(Boolean)
    )].sort().reverse();

    semanaSelect.innerHTML =
        `<option value="">Selecione a semana</option>` +
        semanas.map(semana => {
            const intervalo = obterInicioEFimSemanaPorInput(semana);
            return `<option value="${semana}">${semana} (${intervalo.inicio} a ${intervalo.fim})</option>`;
        }).join("");

    if (semanas.includes(valorAtual)) {
        semanaSelect.value = valorAtual;
    } else if (semanas.length) {
        semanaSelect.value = semanas[0];
    } else {
        semanaSelect.value = "";
    }
}

/* ================= ÚLTIMA FAIXA ================= */

function ultimaFaixaDisponivel(uo, data) {
    const horas = new Set();

    dados.forEach(l => {
        if (normalizarDataExcel(l["Data"]) !== data) return;
        if (uo && String(l["Cód.UO"]) !== String(uo)) return;

        const hora = obterHoraLinhaModalEquipes(l);
        if (hora) horas.add(hora);
    });

    const lista = modoTabela === "total-horas" ? HORAS_TOTAIS : FAIXAS;
    return lista.filter(f => horas.has(f)).pop();
}

/* ================= CALCULAR FAIXAS ================= */

function calcularFaixas(campo, uo, data, horasLista = null) {
    cacheFaixas = {};

    const horas = Array.isArray(horasLista) && horasLista.length ? horasLista : FAIXAS;
    const horasSet = new Set(horas);
    horas.forEach(faixa => {
        cacheFaixas[faixa] = {};
    });

    dados.forEach(l => {
        if (normalizarDataExcel(l["Data"]) !== data) return;
        if (uo && String(l["Cód.UO"]) !== String(uo)) return;

        const faixa = obterHoraLinha(l);
        if (!horasSet.has(faixa)) return;

        const nome = l[campo] || "N/I";
        const codEquipe = obterCodigoEquipeLinha(l);
        if (!codEquipe) return;

        if (!cacheFaixas[faixa][nome]) {
            cacheFaixas[faixa][nome] = { meta: 0, prod: 0, teams: {} };
        }

        const metaProg = ajustarMetaClusterMtami(toNumber(l["Meta Prog."]), nome, l["Nome"], l[campo], l[campoGlobal]);
        const prodDia = obterProducaoLinha(l);

        const atual = cacheFaixas[faixa][nome].teams[codEquipe] || { metaProg: 0, prodDia: 0 };
        atual.metaProg = Math.max(Number(atual.metaProg || 0), Number(metaProg || 0));
        atual.prodDia = Math.max(Number(atual.prodDia || 0), Number(prodDia || 0));
        cacheFaixas[faixa][nome].teams[codEquipe] = atual;
    });

    horas.forEach(faixa => {
        Object.values(cacheFaixas[faixa]).forEach(r => {
            const teams = r.teams || {};
            let meta = 0;
            let prod = 0;

            Object.values(teams).forEach(t => {
                meta += (toNumber(t?.metaProg) / 9) * obterHorasAcumuladas(faixa);
                prod += toNumber(t?.prodDia);
            });

            r.meta = meta;
            r.prod = prod;
            r.faixa = classificar(r.meta ? (r.prod / r.meta) * 100 : 0);
        });
    });
}

function obterDatasDoMes(uo, anoMes) {
    return [...new Set(
        dados
            .filter(l => {
                if (uo && String(l["Cód.UO"]) !== String(uo)) return false;
                return extrairAnoMes(l["Data"]) === anoMes;
            })
            .map(l => normalizarDataExcel(l["Data"]))
            .filter(Boolean)
    )].sort();
}

function obterDatasDaSemanaSelecionada(uo, semanaStr) {
    const { inicio, fim } = obterInicioEFimSemanaPorInput(semanaStr);

    return [...new Set(
        dados
            .filter(l => {
                const data = normalizarDataExcel(l["Data"]);
                if (!data) return false;
                if (uo && String(l["Cód.UO"]) !== String(uo)) return false;
                return data >= inicio && data <= fim;
            })
            .map(l => normalizarDataExcel(l["Data"]))
            .filter(Boolean)
    )].sort();
}

function resumirPeriodo(datasPeriodo, campo, uo) {
    const cacheLocalFaixas = {};
    FAIXAS.forEach(f => cacheLocalFaixas[f] = {});

    const mapaPeriodo = {};
    const somaEqDias = { AA: 0, A: 0, B: 0, C: 0, D: 0 };
    let somaMetaDias = 0;
    let somaProdDias = 0;
    let diasComDados = 0;

    datasPeriodo.forEach(data => {
        const faixaAtual = ultimaFaixaDisponivel(uo, data);
        if (!faixaAtual) return;
        const codigosTurnoSelecionado = obterCodigosTurnoSelecionado(data, uo);

        diasComDados++;

        const mapaDia = {};
        const eqTotDia = { AA: 0, A: 0, B: 0, C: 0, D: 0 };

        dados.forEach(l => {
            if (normalizarDataExcel(l["Data"]) !== data) return;
            if (uo && String(l["Cód.UO"]) !== String(uo)) return;

            const hora = normalizarHora(l["Hora"]);
            if (!FAIXAS.includes(hora)) return;
            const codigoEquipe = obterCodigoEquipeLinha(l);
            if (!codigoEquipe) return;
            if (!linhaPassaFiltroTurnoSelecionado(codigoEquipe, codigosTurnoSelecionado)) return;

            const nome = l[campo] || "N/I";

            if (!cacheLocalFaixas[hora][nome]) {
                cacheLocalFaixas[hora][nome] = { meta: 0, prod: 0 };
            }

            const metaFaixa = ajustarMetaClusterMtami(toNumber(l["Meta Prog."]), nome, l["Nome"], l[campo], l[campoGlobal]) / 9 * obterHorasAcumuladas(hora);
            const prodFaixa = toNumber(l["Produção"]);

            cacheLocalFaixas[hora][nome].meta += metaFaixa;
            cacheLocalFaixas[hora][nome].prod += prodFaixa;

            if (hora !== faixaAtual) return;

            if (!mapaDia[nome]) {
                mapaDia[nome] = {
                    meta: 0,
                    prod: 0,
                    eq: { AA: 0, A: 0, B: 0, C: 0, D: 0 }
                };
            }

            const metaAtual = ajustarMetaClusterMtami(toNumber(l["Meta Prog."]), nome, l["Nome"], l[campo], l[campoGlobal]) / 9 * obterHorasAcumuladas(faixaAtual);
            const prodAtual = toNumber(l["Produção"]);

            mapaDia[nome].meta += metaAtual;
            mapaDia[nome].prod += prodAtual;

            const cls = String(l["Classificação"] || "").toUpperCase();
            if (mapaDia[nome].eq[cls] !== undefined) {
                mapaDia[nome].eq[cls]++;
                eqTotDia[cls]++;
            }
        });

        let totalMetaDia = 0;
        let totalProdDia = 0;

        Object.entries(mapaDia).forEach(([nome, v]) => {
            totalMetaDia += v.meta;
            totalProdDia += v.prod;

            if (!mapaPeriodo[nome]) {
                mapaPeriodo[nome] = {
                    dias: 0,
                    meta: 0,
                    prod: 0,
                    eq: { AA: 0, A: 0, B: 0, C: 0, D: 0 }
                };
            }

            mapaPeriodo[nome].dias++;
            mapaPeriodo[nome].meta += v.meta;
            mapaPeriodo[nome].prod += v.prod;
            mapaPeriodo[nome].eq.AA += v.eq.AA;
            mapaPeriodo[nome].eq.A += v.eq.A;
            mapaPeriodo[nome].eq.B += v.eq.B;
            mapaPeriodo[nome].eq.C += v.eq.C;
            mapaPeriodo[nome].eq.D += v.eq.D;
        });

        somaMetaDias += totalMetaDia;
        somaProdDias += totalProdDia;
        somaEqDias.AA += eqTotDia.AA;
        somaEqDias.A += eqTotDia.A;
        somaEqDias.B += eqTotDia.B;
        somaEqDias.C += eqTotDia.C;
        somaEqDias.D += eqTotDia.D;
    });

    const linhas = Object.entries(mapaPeriodo)
        .map(([nome, v]) => {
            const faixas = {};

            FAIXAS.forEach(f => {
                const reg = cacheLocalFaixas[f]?.[nome];
                if (!reg || (!reg.meta && !reg.prod)) {
                    faixas[f] = "-";
                } else {
                    faixas[f] = classificar(reg.meta ? (reg.prod / reg.meta) * 100 : 0);
                }
            });

            return {
                nome,
                meta: v.meta / v.dias,
                prod: v.prod / v.dias,
                eq: {
                    AA: v.eq.AA / v.dias,
                    A: v.eq.A / v.dias,
                    B: v.eq.B / v.dias,
                    C: v.eq.C / v.dias,
                    D: v.eq.D / v.dias
                },
                faixas
            };
        })
        .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

    const eqTot = diasComDados ? {
        AA: somaEqDias.AA / diasComDados,
        A: somaEqDias.A / diasComDados,
        B: somaEqDias.B / diasComDados,
        C: somaEqDias.C / diasComDados,
        D: somaEqDias.D / diasComDados
    } : { AA: 0, A: 0, B: 0, C: 0, D: 0 };

    return {
        linhas,
        diasComDados,
        totalMeta: diasComDados ? somaMetaDias / diasComDados : 0,
        totalProd: diasComDados ? somaProdDias / diasComDados : 0,
        eqTot,
        cacheFaixas: cacheLocalFaixas
    };
}

/* ================= ACORDOS ================= */

function carregarBaseAcordos() {
    try {
        const keys = [
            STORAGE_KEY_ACORDOS,
            "painel_producao_acordos_v1",
            "painel_producao_acordos",
            `${STORAGE_KEY_ACORDOS}_backup`
        ];

        for (const key of keys) {
            const bruto = localStorage.getItem(key);
            if (!bruto) continue;

            const obj = JSON.parse(bruto);
            if (!obj || typeof obj !== "object") continue;

            // Caso algum valor tenha sido salvo como payload de backup
            const dados = obj?.tipo === "backup-acordos-painel" ? (obj.dados || {}) : obj;
            if (!dados || typeof dados !== "object") continue;

            // Migra para a chave atual para evitar "perder" em atualizacoes futuras
            if (key !== STORAGE_KEY_ACORDOS) {
                try {
                    localStorage.setItem(STORAGE_KEY_ACORDOS, JSON.stringify(dados));
                } catch {}
            }

            return dados;
        }

        return {};
    } catch {
        return {};
    }
}

function salvarBaseAcordos(base) {
    try {
        localStorage.setItem(STORAGE_KEY_ACORDOS, JSON.stringify(base));
        localStorage.setItem(`${STORAGE_KEY_ACORDOS}_backup`, JSON.stringify(base));
    } catch (err) {
        console.error("Erro ao salvar acordos:", err);
    }
}

async function carregarBaseAcordosDoBanco() {
    try {
        const resp = await fetch(ENDPOINT_STATE_ACORDOS, { cache: "no-store" });
        if (!resp.ok) {
            const texto = await resp.text().catch(() => "");
            throw new Error(texto || `HTTP ${resp.status}`);
        }

        const payload = await resp.json().catch(() => ({}));
        const base = payload?.base;
        if (!base || typeof base !== "object" || Array.isArray(base)) return {};
        return base;
    } catch (error) {
        console.error("Erro ao carregar estado dos acordos no banco:", error);
        return null;
    }
}

function enfileirarPersistenciaAcordos(factory) {
    acordosStateSavePromise = acordosStateSavePromise
        .catch(() => null)
        .then(factory);

    return acordosStateSavePromise;
}

function enfileirarHistoricoAcordos(factory) {
    acordosHistorySavePromise = acordosHistorySavePromise
        .catch(() => null)
        .then(factory);

    return acordosHistorySavePromise;
}

function salvarEstadoAcordoNoBanco(ctx, registro) {
    const payloadRegistro = registro && typeof registro === "object"
        ? JSON.parse(JSON.stringify(registro))
        : null;

    return enfileirarPersistenciaAcordos(async () => {
        try {
            const resp = await fetch(`${ENDPOINT_STATE_ACORDOS}/item`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                keepalive: true,
                body: JSON.stringify({
                    context_key: montarChaveAcordo(ctx),
                    data_ref: String(ctx?.data || "").trim(),
                    uo: String(ctx?.uo || "").trim(),
                    tipo_visao: String(ctx?.tipoVisao || tipoSelect?.value || "").trim(),
                    supervisor: String(ctx?.supervisor || "").trim(),
                    payload: payloadRegistro
                })
            });

            if (!resp.ok) {
                const texto = await resp.text().catch(() => "");
                throw new Error(texto || `HTTP ${resp.status}`);
            }
        } catch (error) {
            console.error("Erro ao salvar estado do acordo no banco:", error);
        }
    });
}

function salvarBaseAcordosNoBanco(base) {
    const payloadBase = base && typeof base === "object"
        ? JSON.parse(JSON.stringify(base))
        : {};

    return enfileirarPersistenciaAcordos(async () => {
        try {
            const resp = await fetch(`${ENDPOINT_STATE_ACORDOS}/base`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                keepalive: true,
                body: JSON.stringify({ base: payloadBase })
            });

            if (!resp.ok) {
                const texto = await resp.text().catch(() => "");
                throw new Error(texto || `HTTP ${resp.status}`);
            }
        } catch (error) {
            console.error("Erro ao salvar base de acordos no banco:", error);
        }
    });
}

function hidratarBaseAcordos() {
    if (acordosStateHydrationPromise) return acordosStateHydrationPromise;

    acordosStateHydrationPromise = (async () => {
        const baseLocal = carregarBaseAcordos();
        const baseBanco = await carregarBaseAcordosDoBanco();

        if (baseBanco && Object.keys(baseBanco).length) {
            salvarBaseAcordos(baseBanco);
            return baseBanco;
        }

        if (baseLocal && Object.keys(baseLocal).length) {
            await salvarBaseAcordosNoBanco(baseLocal);
            return baseLocal;
        }

        return {};
    })();

    return acordosStateHydrationPromise;
}

async function enviarHistoricoParaApi(endpoint, payload) {
    const payloadClonado = payload && typeof payload === "object"
        ? JSON.parse(JSON.stringify(payload))
        : payload;

    return enfileirarHistoricoAcordos(async () => {
        try {
            const resp = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                keepalive: true,
                body: JSON.stringify(payloadClonado)
            });

            if (!resp.ok) {
                const texto = await resp.text().catch(() => "");
                throw new Error(texto || `HTTP ${resp.status}`);
            }

            return await resp.json().catch(() => ({}));
        } catch (error) {
            console.error(`Erro ao enviar historico para ${endpoint}:`, error);
            return null;
        }
    });
}

function montarPayloadHistoricoAcordo(ctx, acordo, acao) {
    if (!ctx || !acordo) return null;

    return {
        data_ref: String(ctx.data || "").trim(),
        uo: String(ctx.uo || "").trim(),
        tipo_visao: String(ctx.tipoVisao || tipoSelect?.value || "").trim(),
        supervisor: String(ctx.supervisor || "").trim(),
        hora_referencia: String(ctx.horaClicada || "").trim(),
        codigo_equipe: String(acordo.codigo || "").trim(),
        equipe: String(acordo.equipe || "").trim(),
        acao: String(acao || "").trim().toUpperCase(),
        meta_dia_acordo: Number(acordo.metaDiaAcordo ?? acordo.metaDia ?? acordo.metaAcordo ?? acordo.meta ?? 0),
        meta_acordo: Number(acordo.metaAcordo ?? acordo.meta ?? 0),
        prod_acordo: Number(acordo.prodAcordo ?? acordo.prod ?? 0),
        faixa_acordo: String(acordo.faixaAcordo ?? acordo.faixaDia ?? "").trim(),
        perc_acordo: Number(acordo.percAcordo ?? acordo.perc ?? 0),
        salvo_em: acordo.salvoEm || new Date().toISOString()
    };
}

function registrarHistoricoAcordo(ctx, acordo, acao) {
    const payload = montarPayloadHistoricoAcordo(ctx, acordo, acao);
    if (!payload) return;
    enviarHistoricoParaApi("/api/historico/acordos", payload);
}

function montarPayloadHistoricoJustificativa(ctx, item, acao = "SALVAR") {
    if (!ctx || !item) return null;

    return {
        data_ref: String(ctx.data || "").trim(),
        uo: String(ctx.uo || "").trim(),
        tipo_visao: String(ctx.tipoVisao || tipoSelect?.value || "").trim(),
        supervisor: String(ctx.supervisor || "").trim(),
        hora_referencia: String(ctx.horaClicada || "").trim(),
        codigo_equipe: String(item.codigo || "").trim(),
        equipe: String(item.equipe || "").trim(),
        justificativa: item.justificativa || "",
        motivo_grupo: item.motivoGrupo || "",
        motivo_grupos: Array.isArray(item.motivoGrupos) ? item.motivoGrupos : [],
        motivo_descricao: item.motivoDescricao || "",
        motivo_descricoes: Array.isArray(item.motivoDescricoes) ? item.motivoDescricoes : [],
        detalhe: item.detalhe || "",
        acao: String(acao || "SALVAR").trim().toUpperCase(),
        salvo_em: item.salvoEm || new Date().toISOString()
    };
}

function registrarHistoricoJustificativa(ctx, item, acao = "SALVAR") {
    const payload = montarPayloadHistoricoJustificativa(ctx, item, acao);
    if (!payload) return;
    enviarHistoricoParaApi("/api/historico/justificativas", payload);
}

function validarBaseAcordosImportada(base) {
    if (!base || typeof base !== "object" || Array.isArray(base)) return false;

    return Object.values(base).every(registro => {
        if (!registro || typeof registro !== "object" || Array.isArray(registro)) return false;
        const acordosOk = !registro.acordos || typeof registro.acordos === "object";
        const justificativasOk = !registro.justificativas || typeof registro.justificativas === "object";
        return acordosOk && justificativasOk;
    });
}

function aplicarBaseAcordosImportada(baseImportada) {
    if (!validarBaseAcordosImportada(baseImportada)) {
        throw new Error("Arquivo de backup invalido.");
    }

    const baseAtual = carregarBaseAcordos();
    const baseMesclada = {
        ...(baseAtual && typeof baseAtual === "object" ? baseAtual : {}),
        ...baseImportada
    };

    salvarBaseAcordos(baseMesclada);
    salvarBaseAcordosNoBanco(baseMesclada);
    atualizarBotaoAcordos17();

    if (currentModalContext) {
        reabrirModalAtual();
    }
}

function exportarBackupAcordos() {
    const base = carregarBaseAcordos();
    const payload = {
        tipo: "backup-acordos-painel",
        versao: 1,
        exportadoEm: new Date().toISOString(),
        dados: base
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dataArquivo = obterHojeISO();

    link.href = url;
    link.download = `backup-acordos-${dataArquivo}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function abrirImportacaoBackupAcordos() {
    if (!inputImportarBackupAcordos) {
        alert("Campo de importacao nao encontrado.");
        return;
    }

    inputImportarBackupAcordos.value = "";
    inputImportarBackupAcordos.click();
}

function importarBackupAcordos(event) {
    const arquivo = event?.target?.files?.[0];
    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = () => {
        try {
            const bruto = String(leitor.result || "");
            const json = JSON.parse(bruto);
            const baseImportada = json?.dados ?? json;

            aplicarBaseAcordosImportada(baseImportada);
            alert("Backup dos acordos restaurado com sucesso.");
        } catch (err) {
            console.error("Erro ao importar backup de acordos:", err);
            alert("Nao foi possivel importar o backup dos acordos.");
        } finally {
            if (inputImportarBackupAcordos) {
                inputImportarBackupAcordos.value = "";
            }
        }
    };

    leitor.onerror = () => {
        alert("Nao foi possivel ler o arquivo de backup.");
        if (inputImportarBackupAcordos) {
            inputImportarBackupAcordos.value = "";
        }
    };

    leitor.readAsText(arquivo, "utf-8");
}

function montarChaveAcordo(ctx) {
    return [
        ctx?.data || "",
        ctx?.uo || "TODAS",
        ctx?.tipoVisao || (tipoSelect?.value || ""),
        ctx?.supervisor || "GERAL"
    ].join("||");
}

function obterRegistroAcordo(ctx, criar = false) {
    const base = carregarBaseAcordos();
    const chave = montarChaveAcordo(ctx);

    if (!base[chave] && criar) {
        base[chave] = {
            data: ctx?.data || "",
            uo: ctx?.uo || "",
            tipoVisao: ctx?.tipoVisao || (tipoSelect?.value || ""),
            supervisor: ctx?.supervisor || "",
            analisadasD: 0,
            acordos: {},
            justificativas: {}
        };
        salvarBaseAcordos(base);
    }

    return base[chave] || null;
}

function salvarRegistroAcordo(ctx, registro) {
    const base = carregarBaseAcordos();
    const chave = montarChaveAcordo(ctx);

    if (!registro || (!registro.acordos && !registro.justificativas)) {
        delete base[chave];
    } else {
        base[chave] = registro;
    }

    salvarBaseAcordos(base);
    salvarEstadoAcordoNoBanco(ctx, registro);
}

function obterMapaAcordosContexto(ctx) {
    const reg = obterRegistroAcordo(ctx, false);
    return reg?.acordos || {};
}

function obterMapaJustificativasContexto(ctx) {
    const reg = obterRegistroAcordo(ctx, false);
    return reg?.justificativas || {};
}

function obterRegistrosAcordoContexto(ctx) {
    if (!ctx) return [];

    if (ctx.supervisor) {
        const registro = obterRegistroAcordo(ctx, false);
        return registro ? [registro] : [];
    }

    const base = carregarBaseAcordos();
    return Object.values(base).filter(reg =>
        String(reg?.data || "") === String(ctx.data || "") &&
        String(reg?.uo || "") === String(ctx.uo || "") &&
        String(reg?.tipoVisao || "") === String(ctx.tipoVisao || (tipoSelect?.value || ""))
    );
}

function obterMapaAcordosPainel(ctx) {
    const registros = obterRegistrosAcordoContexto(ctx);
    const mapa = {};

    registros.forEach(reg => {
        Object.values(reg?.acordos || {}).forEach(acordo => {
            mapa[String(acordo.codigo)] = acordo;
        });
    });

    return mapa;
}

function obterMapaJustificativasPainel(ctx) {
    const registros = obterRegistrosAcordoContexto(ctx);
    const mapa = {};

    registros.forEach(reg => {
        Object.values(reg?.justificativas || {}).forEach(item => {
            mapa[String(item.codigo)] = item;
        });
    });

    return mapa;
}

function estaEquipeMarcadaNoContexto(codigo, ctx) {
    const mapa = obterMapaAcordosContexto(ctx);
    return !!mapa[String(codigo)];
}

function montarSnapshotAcordo(equipe, ctx) {
    return {
        codigo: String(equipe.codigo),
        equipe: equipe.equipe || "-",
        metaDiaAcordo: Number(equipe.metaDia || equipe.meta || 0),
        metaAcordo: Number(equipe.meta || 0),
        prodAcordo: Number(equipe.prod || 0),
        faixaAcordo: equipe.faixaDiaCompleta || equipe.faixaDia || classificar(equipe.percProdDiaCompleto || equipe.percProdDia || 0),
        percAcordo: Number(equipe.percProdDiaCompleto || equipe.percProdDia || 0),
        horaAcordo: ctx?.horaClicada || "",
        supervisor: ctx?.supervisor || "",
        tipoVisao: ctx?.tipoVisao || (tipoSelect?.value || ""),
        data: ctx?.data || "",
        uo: ctx?.uo || "",
        faixasAcordo: { ...(equipe.faixas || {}) },
        salvoEm: new Date().toISOString()
    };
}

function atualizarVisualAcordoLinha(codigo, ativo) {
    const botao = document.querySelector(`.btn-acordo-linha[data-codigo="${CSS.escape(String(codigo))}"]`);
    const linha = document.querySelector(`#modalBody tr[data-codigo="${CSS.escape(String(codigo))}"]`);

    if (botao) {
        botao.classList.toggle("ativo", ativo);
        botao.title = ativo ? "Remover acordo" : "Marcar acordo";
    }

    if (linha) {
        linha.classList.toggle("linha-acordo-ativa", ativo);
        if (modalUsaJustificativa()) {
            const equipe = (currentModalContext?.listaAtual || []).find(
                item => String(item.codigo) === String(codigo)
            );
            const celulaJustificativa = linha.querySelector(".col-justificativa");
            if (equipe && celulaJustificativa) {
                celulaJustificativa.outerHTML = renderCelulaJustificativa(equipe, currentModalContext);
            }
        }
    }
}

function toggleAcordoEquipe(codigo) {
    if (!currentModalContext || !currentModalContext.supervisor) return;

    const regAtual = obterRegistroAcordo(currentModalContext, true) || {
        data: currentModalContext.data,
        uo: currentModalContext.uo,
        tipoVisao: currentModalContext.tipoVisao,
        supervisor: currentModalContext.supervisor,
        analisadasD: 0,
        acordos: {}
    };

    regAtual.analisadasD = Math.max(
        Number(regAtual.analisadasD || 0),
        Number(currentModalContext.qtdDAnalisadas || 0)
    );

    const codStr = String(codigo);

    if (regAtual.acordos[codStr]) {
        const acordoAnterior = { ...regAtual.acordos[codStr] };
        delete regAtual.acordos[codStr];
        salvarRegistroAcordo(currentModalContext, regAtual);
        registrarHistoricoAcordo(currentModalContext, acordoAnterior, "REMOVER");
        atualizarVisualAcordoLinha(codStr, false);
    } else {
        const equipe = (currentModalContext.listaAtual || []).find(e => String(e.codigo) === codStr);
        if (!equipe) return;

        regAtual.acordos[codStr] = montarSnapshotAcordo(equipe, currentModalContext);
        salvarRegistroAcordo(currentModalContext, regAtual);
        registrarHistoricoAcordo(currentModalContext, regAtual.acordos[codStr], "MARCAR");
        atualizarVisualAcordoLinha(codStr, true);
    }

    atualizarKpisModalPorLinhasVisiveis();
    atualizarBotaoAcordos17();
}

function reabrirModalAtual() {
    if (!currentModalContext) return;

    if (currentModalContext.tipoModal === "faixa") {
        abrirModalFaixa(currentModalContext.supervisor, currentModalContext.horaClicada);
        return;
    }

    abrirModalEquipes(
        currentModalContext.supervisor || null,
        currentModalContext.faixaClicada || null,
        currentModalContext.horaClicada
    );
}

function posicionarPainelJustificativa(alvo) {
    if (!painelJustificativa) return;
    painelJustificativa.style.top = "50%";
    painelJustificativa.style.left = "50%";
    painelJustificativa.style.transform = "translate(-50%, -50%)";
}

function atualizarKpisPainelJustificativa(equipe) {
    if (!equipe) return;

    const metaDia = Number(equipe.metaDia || equipe.meta || 0);
    const prodDia = Number(equipe.prodDia || equipe.prod || 0);
    const saldo = prodDia - metaDia;
    const faixaDia = String(equipe.faixaDiaCompleta || equipe.faixaDia || classificar(metaDia > 0 ? (prodDia / metaDia) * 100 : 0) || "-").toUpperCase();
    const statusJornada = String(equipe.statusJornada || "-").toUpperCase();
    const servicos = String(equipe.servicos ?? "-");
    const produtivos = String(equipe.produtivo ?? "-");
    const improdutivos = String(equipe.improdutivo ?? "-");
    const percImprod = typeof equipe.percImprod === "number" ? `${equipe.percImprod.toFixed(2)}%` : "-";

    if (painelJustificativaKpiCodigo) {
        painelJustificativaKpiCodigo.innerText = `${equipe.codigo || "-"} / ${equipe.frota || "-"}`;
    }
    if (painelJustificativaKpiMeta) painelJustificativaKpiMeta.innerText = fmt3(metaDia);
    if (painelJustificativaKpiProd) painelJustificativaKpiProd.innerText = fmt3(prodDia);
    if (painelJustificativaKpiSaldo) {
        painelJustificativaKpiSaldo.innerText = fmt3(saldo);
        painelJustificativaKpiSaldo.style.color = saldo < 0 ? "#dc2626" : "#15803d";
    }
    if (painelJustificativaKpiFaixa) {
        painelJustificativaKpiFaixa.innerText = faixaDia;
        painelJustificativaKpiFaixa.style.color =
            faixaDia === "D" ? "#dc2626"
                : faixaDia === "C" ? "#b45309"
                    : "#15803d";
    }
    if (painelJustificativaKpiStatus) {
        painelJustificativaKpiStatus.innerText = statusJornada;
        painelJustificativaKpiStatus.className = "";
        const classeStatus = obterClasseStatusJornada(statusJornada);
        if (classeStatus) painelJustificativaKpiStatus.classList.add(classeStatus);
    }
    if (painelJustificativaKpiServicos) painelJustificativaKpiServicos.innerText = servicos;
    if (painelJustificativaKpiProdutivos) painelJustificativaKpiProdutivos.innerText = produtivos;
    if (painelJustificativaKpiImprodutivos) painelJustificativaKpiImprodutivos.innerText = improdutivos;
    if (painelJustificativaKpiPercImprod) painelJustificativaKpiPercImprod.innerText = percImprod;
}

function abrirCodxPainelJustificativa() {
    if (!currentJustificativaCodigo) return;
    abrirCaixaDetalheFaixaDia(currentJustificativaCodigo);
}

function abrirPromptJustificativa(codigo, event) {
    if (!currentModalContext || !modalUsaJustificativa() || !painelJustificativa) return;

    const codStr = String(codigo);
    const equipe = (currentModalContext.listaAtual || []).find(e => String(e.codigo) === codStr);
    if (!equipe) return;

    currentJustificativaCodigo = codStr;

    if (painelJustificativaTitulo) {
        painelJustificativaTitulo.innerText = `Justificativa - ${equipe.equipe}`;
    }
    atualizarKpisPainelJustificativa(equipe);

    const itemJustificativa = obterMapaJustificativasPainel(currentModalContext)?.[codStr] || {};
    const justificativaAtual = obterJustificativaEquipeNoContexto(codStr, currentModalContext);
    const justParsed = parseJustificativaEstruturada(justificativaAtual);
    const gruposSalvos = Array.isArray(itemJustificativa?.motivoGrupos)
        ? itemJustificativa.motivoGrupos
        : extrairGruposTexto(itemJustificativa?.motivoGrupo || justParsed.grupo);
    const descsSalvas = Array.isArray(itemJustificativa?.motivoDescricoes)
        ? itemJustificativa.motivoDescricoes
        : extrairGruposTexto(itemJustificativa?.motivoDescricao || justParsed.descricao);

    if (justGrupoList) {
        justGrupoList.innerHTML = `<div class="painel-justificativa-empty">Carregando grupos...</div>`;
    }
    if (justDescList) {
        justDescList.innerHTML = `<div class="painel-justificativa-empty">Carregando descrições...</div>`;
    }
    if (justGrupoSearch) justGrupoSearch.value = "";
    if (justDescSearch) justDescSearch.value = "";
    if (justificativaPreview) {
        justificativaPreview.innerText = "Carregando lista...";
    }

    if (painelJustificativaTexto) {
        painelJustificativaTexto.value = justParsed.detalhe || justificativaAtual;
        painelJustificativaTexto.focus();
        painelJustificativaTexto.setSelectionRange(
            painelJustificativaTexto.value.length,
            painelJustificativaTexto.value.length
        );
    }

    if (btnExcluirJustificativa) {
        btnExcluirJustificativa.classList.toggle("hidden", !justificativaAtual);
    }

    carregarPresetsJustificativas().then(presets => {
        if (!currentModalContext || currentJustificativaCodigo !== codStr) return;

        popularSelectJustificativas(presets, gruposSalvos, descsSalvas);

        if (justGrupoSearch && justGrupoSearch.dataset.bound !== "1") {
            justGrupoSearch.addEventListener("input", () => {
                renderizarOpcoesGrupoJustificativa(
                    currentJustificativasPresetsPainel,
                    currentJustificativaGruposSelecionados,
                    justGrupoSearch.value
                );
                atualizarPreviewJustificativa();
            });
            justGrupoSearch.dataset.bound = "1";
        }

        if (justDescSearch && justDescSearch.dataset.bound !== "1") {
            justDescSearch.addEventListener("input", () => {
                renderizarOpcoesDescricaoJustificativa(
                    currentJustificativasPresetsPainel,
                    currentJustificativaGruposSelecionados,
                    currentJustificativaDescricoesSelecionadas,
                    justDescSearch.value
                );
                atualizarPreviewJustificativa();
            });
            justDescSearch.dataset.bound = "1";
        }

        atualizarPreviewJustificativa();
    });

    painelJustificativa.classList.remove("hidden");
    if (painelJustificativaOverlay) painelJustificativaOverlay.classList.remove("hidden");
    painelJustificativa.setAttribute("aria-hidden", "false");
    posicionarPainelJustificativa(event?.currentTarget || event?.target || null);
}

function fecharPainelJustificativa() {
    currentJustificativaCodigo = "";
    currentJustificativaGruposSelecionados = [];
    currentJustificativaDescricoesSelecionadas = [];
    currentJustificativaGrupoAtivo = "";
    if (painelJustificativaTexto) painelJustificativaTexto.value = "";
    if (justGrupoSelected) justGrupoSelected.innerHTML = "";
    if (justGrupoList) justGrupoList.innerHTML = "";
    if (justDescSelected) justDescSelected.innerHTML = "";
    if (justDescList) justDescList.innerHTML = "";
    if (justGrupoSearch) justGrupoSearch.value = "";
    if (justDescSearch) justDescSearch.value = "";
    if (justificativaPreview) justificativaPreview.innerText = "";
    if (btnExcluirJustificativa) btnExcluirJustificativa.classList.add("hidden");
    if (painelJustificativaKpiCodigo) painelJustificativaKpiCodigo.innerText = "-";
    if (painelJustificativaKpiMeta) painelJustificativaKpiMeta.innerText = "0.000";
    if (painelJustificativaKpiProd) painelJustificativaKpiProd.innerText = "0.000";
    if (painelJustificativaKpiSaldo) {
        painelJustificativaKpiSaldo.innerText = "0.000";
        painelJustificativaKpiSaldo.style.color = "";
    }
    if (painelJustificativaKpiFaixa) {
        painelJustificativaKpiFaixa.innerText = "-";
        painelJustificativaKpiFaixa.style.color = "";
    }
    if (painelJustificativaKpiStatus) {
        painelJustificativaKpiStatus.innerText = "-";
        painelJustificativaKpiStatus.className = "";
    }
    if (painelJustificativaKpiServicos) painelJustificativaKpiServicos.innerText = "0";
    if (painelJustificativaKpiProdutivos) painelJustificativaKpiProdutivos.innerText = "0";
    if (painelJustificativaKpiImprodutivos) painelJustificativaKpiImprodutivos.innerText = "0";
    if (painelJustificativaKpiPercImprod) painelJustificativaKpiPercImprod.innerText = "0.00%";
    if (painelJustificativaOverlay) painelJustificativaOverlay.classList.add("hidden");
    if (painelJustificativa) {
        painelJustificativa.classList.add("hidden");
        painelJustificativa.setAttribute("aria-hidden", "true");
    }
}

function salvarJustificativaAtual() {
    if (!currentModalContext || !currentJustificativaCodigo) return;

    const codStr = String(currentJustificativaCodigo);
    const equipe = (currentModalContext.listaAtual || []).find(e => String(e.codigo) === codStr);
    if (!equipe) return;

    const grupos = obterGruposSelecionados();
    const grupo = grupos.join(" + ");
    const descricoes = obterDescricoesSelecionadas();
    const descricao = descricoes.join(" + ");
    const detalhe = String(painelJustificativaTexto?.value || "").trim();

    if (!detalhe && !(grupos.length && descricoes.length)) {
        alert("Selecione pelo menos um grupo e uma ou mais descrições, ou escreva uma justificativa.");
        return;
    }

    const justificativa = (grupos.length && descricoes.length)
        ? (detalhe ? `${grupo} - ${descricao}: ${detalhe}` : `${grupo} - ${descricao}`)
        : detalhe;

    const regAtual = obterRegistroAcordo(currentModalContext, true) || {
        data: currentModalContext.data,
        uo: currentModalContext.uo,
        tipoVisao: currentModalContext.tipoVisao,
        supervisor: currentModalContext.supervisor,
        analisadasD: 0,
        acordos: {},
        justificativas: {}
    };

    regAtual.analisadasD = Math.max(
        Number(regAtual.analisadasD || 0),
        Number(currentModalContext.qtdDAnalisadas || 0)
    );

    if (!regAtual.justificativas) {
        regAtual.justificativas = {};
    }

    regAtual.justificativas[codStr] = {
        codigo: codStr,
        equipe: equipe.equipe || "-",
        justificativa,
        motivoGrupo: grupo || "",
        motivoGrupos: grupos,
        motivoDescricao: descricao || "",
        motivoDescricoes: descricoes,
        detalhe: detalhe || "",
        salvoEm: new Date().toISOString()
    };

    salvarRegistroAcordo(currentModalContext, regAtual);
    registrarHistoricoJustificativa(currentModalContext, regAtual.justificativas[codStr], "SALVAR");
    fecharPainelJustificativa();
    reabrirModalAtual();
}

function excluirJustificativaAtual() {
    if (!currentModalContext || !currentJustificativaCodigo) return;

    const regAtual = obterRegistroAcordo(currentModalContext, false);
    if (!regAtual?.justificativas) {
        fecharPainelJustificativa();
        return;
    }

    const codigoAtual = String(currentJustificativaCodigo);
    const justificativaAnterior = regAtual.justificativas[codigoAtual]
        ? { ...regAtual.justificativas[codigoAtual] }
        : null;
    delete regAtual.justificativas[codigoAtual];
    salvarRegistroAcordo(currentModalContext, regAtual);
    if (justificativaAnterior) {
        registrarHistoricoJustificativa(currentModalContext, justificativaAnterior, "EXCLUIR");
    }
    fecharPainelJustificativa();
    reabrirModalAtual();
}

function extrairMotivoJustificativa(texto) {
    const s = String(texto || "").trim();
    if (!s) return "-";

    const sep = s.includes(" - ") ? " - " : (s.includes(":") ? ":" : "");
    if (sep) {
        const parte = s.split(sep)[0].trim();
        if (parte) return parte.toUpperCase();
    }

    const palavras = s.split(/\s+/).slice(0, 3).join(" ");
    return palavras ? palavras.toUpperCase() : "-";
}

function buildJustificativasBase(ctx) {
    if (!ctx) return [];

    const listaBase = ctx.listaAtual || [];
    const acordosPainel = obterMapaAcordosPainel(ctx);
    const justificativasPainel = obterMapaJustificativasPainel(ctx);

    return listaBase.map(eq => {
        const codigo = String(eq.codigo || "");
        const salvo = justificativasPainel[codigo]?.salvoEm || "";
        const justificativa = justificativasPainel[codigo]?.justificativa || "";
        const gruposSalvos = Array.isArray(justificativasPainel[codigo]?.motivoGrupos)
            ? justificativasPainel[codigo].motivoGrupos
            : extrairGruposTexto(justificativasPainel[codigo]?.motivoGrupo || "");
        const grupoSalvo = String(justificativasPainel[codigo]?.motivoGrupo || gruposSalvos.join(" + ")).trim();
        const descSalva = String(justificativasPainel[codigo]?.motivoDescricao || "").trim();
        const detalheSalvo = String(justificativasPainel[codigo]?.detalhe || "").trim();

        const parsed = parseJustificativaEstruturada(justificativa);
        const grupo = (grupoSalvo || parsed.grupo || extrairMotivoJustificativa(justificativa) || "-").toUpperCase();
        const descricao = (descSalva || parsed.descricao || "").toUpperCase();
        const detalhe = detalheSalvo || parsed.detalhe || "";
        return {
            codigo,
            frota: eq.frota || "-",
            equipe: eq.equipe || "-",
            justificativa: String(justificativa || ""),
            salvoEm: String(salvo || ""),
            grupo,
            descricao,
            detalhe,
            hasDetalhe: !!detalhe.trim(),
            isD: String(eq.faixaDiaCompleta || "").toUpperCase() === "D",
            acordada: !!acordosPainel[codigo],
            hasJustificativa: !!String(justificativa || "").trim(),
        };
    });
}

function aplicarFiltroJustificativas(tipo) {
    currentJustificativasFilter = tipo || "d-nao-acordadas";
    renderizarModalJustificativas();
}

function renderizarJustificativasChart(lista) {
    if (!justificativasChart) return;

    const contagem = {};
    let totalRegistros = 0;
    lista.forEach(item => {
        const grupos = extrairGruposTexto(item.grupo || "");
        const labels = grupos.length ? grupos : [String(item.grupo || "-").trim() || "-"];
        totalRegistros += labels.length;
        labels.forEach(key => {
            contagem[key] = (contagem[key] || 0) + 1;
        });
    });

    const entries = Object.entries(contagem).sort((a, b) => b[1] - a[1]);
    const top = [["Total", totalRegistros], ...entries.slice(0, 11)];

    if (!top.length) {
        justificativasChart.innerHTML =
            `<div style="color:#64748b; font-weight:800; font-size:12px;">Sem justificativas para exibir.</div>`;
        return;
    }

    const max = Math.max(...top.map(([, v]) => Number(v) || 0), 1);

    justificativasChart.innerHTML = `
        <div class="chart-vert">
            ${top.map(([label, value]) => {
                const v = Number(value) || 0;
                const h = Math.max(6, Math.round((v / max) * 160));
                return `
                    <div class="chart-col" title="${escapeHtml(label)}: ${v}">
                        <div class="chart-value-vert">${v}</div>
                        <div class="chart-bar-vert" style="height:${h}px"></div>
                        <div class="chart-label-vert">${escapeHtml(label)}</div>
                    </div>
                `;
            }).join("")}
        </div>
    `;
}

function atualizarKpisJustificativas(listaBase) {
    if (!currentModalContext) return;

    const acordosPainel = obterMapaAcordosPainel(currentModalContext);
    const justificativasPainel = obterMapaJustificativasPainel(currentModalContext);

    const total = (currentModalContext.listaAtual || []).length || 0;
    const totalD = (currentModalContext.listaAtual || []).filter(item => String(item.faixaDiaCompleta || "").toUpperCase() === "D").length;
    const totalAcordadas = (currentModalContext.listaAtual || []).filter(item => acordosPainel[String(item.codigo)]).length;
    const totalJustificadas = (listaBase || []).filter(item => item.hasJustificativa).length;
    const totalDNaoAcordadas = (listaBase || []).filter(item => item.isD && !item.acordada && item.hasJustificativa).length;
    const totalDetalhe = (listaBase || []).filter(item => item.hasJustificativa && item.hasDetalhe).length;

    const ultimoSalvoEmISO = Object.values(justificativasPainel || {})
        .map(x => String(x?.salvoEm || "").trim())
        .filter(Boolean)
        .sort()
        .slice(-1)[0] || "";
    const ultimoSalvoEmTxt = ultimoSalvoEmISO ? (new Date(ultimoSalvoEmISO)).toLocaleString("pt-BR") : "-";

    if (kpiJustEqD) kpiJustEqD.innerText = String(totalD);
    if (kpiJustAcordadas) kpiJustAcordadas.innerText = String(totalAcordadas);
    if (kpiJustJustificadas) kpiJustJustificadas.innerText = String(totalJustificadas);
    if (kpiJustTotal) kpiJustTotal.innerText = String(total);
    if (kpiJustDNaoAcordadas) kpiJustDNaoAcordadas.innerText = String(totalDNaoAcordadas);
    if (kpiJustDetalhe) kpiJustDetalhe.innerText = String(totalDetalhe);
    if (kpiJustUltimoSalvo) kpiJustUltimoSalvo.innerText = String(ultimoSalvoEmTxt);

    const percAcordadas = total ? Math.round((totalAcordadas / total) * 100) : 0;
    const percJustificadas = total ? Math.round((totalJustificadas / total) * 100) : 0;
    if (kpiJustPercAcordadas) kpiJustPercAcordadas.innerText = `${percAcordadas}%`;
    if (kpiJustPercJustificadas) kpiJustPercJustificadas.innerText = `${percJustificadas}%`;
}

function renderizarModalJustificativas() {
    if (!currentModalContext || !modalJustificativas || !modalJustificativasBody) return;

    const tabela = document.getElementById("tabelaJustificativas");

    const listaBase = buildJustificativasBase(currentModalContext);
    atualizarKpisJustificativas(listaBase);

    let lista = listaBase.filter(item => item.hasJustificativa);

    if (currentJustificativasFilter === "d") {
        lista = lista.filter(item => item.isD);
    } else if (currentJustificativasFilter === "acordadas") {
        lista = lista.filter(item => item.acordada);
    } else if (currentJustificativasFilter === "justificadas") {
        // ja filtrado
    } else if (currentJustificativasFilter === "d-nao-acordadas") {
        lista = lista.filter(item => item.isD && !item.acordada);
    }

    if (justificativasHeadlineTxt) {
        justificativasHeadlineTxt.innerText =
            currentJustificativasFilter === "acordadas"
                ? "ACORDADAS"
                : currentJustificativasFilter === "d"
                    ? "D"
                    : currentJustificativasFilter === "justificadas"
                        ? "JUSTIFICADAS"
                        : "NÃO ACORDADAS";
    }

    if (justificativasDetalheEquipe) justificativasDetalheEquipe.innerText = "Selecione uma equipe";
    if (justificativasDetalheTexto) justificativasDetalheTexto.value = "";
    currentJustificativasListaExibida = [];

    if (!lista.length) {
        if (tabela) tabela.classList.add("hide-just");
        modalJustificativasBody.innerHTML =
            `<tr><td colspan="6">Nenhuma justificativa encontrada para este filtro.</td></tr>`;
        renderizarJustificativasChart([]);
        return;
    }

    const mostrarColunaJustificativa = lista.some(item => !!String(item.detalhe || "").trim());
    if (tabela) {
        tabela.classList.toggle("hide-just", !mostrarColunaJustificativa);
    }

    lista.sort((a, b) =>
        String(a.equipe || "").localeCompare(String(b.equipe || ""), "pt-BR", { sensitivity: "base" })
    );

    modalJustificativasBody.innerHTML = lista.map(item => {
        const codigo = escapeHtml(String(item.codigo || ""));
        const equipe = escapeHtml(String(item.equipe || ""));
        const grupo = escapeHtml(String(item.grupo || "-"));
        const descricao = escapeHtml(String(item.descricao || "-"));
        const detalhe = String(item.detalhe || "").trim();
        const detalheEsc = escapeHtml(detalhe);
        const resumo = detalhe.length > 160 ? `${detalhe.slice(0, 160)}...` : detalhe;
        const resumoEsc = escapeHtml(resumo);

        return `
            <tr data-codigo="${codigo}" class="linha-justificativa" onclick="selecionarJustificativaDetalhe('${escapeJsString(String(item.codigo || ""))}')">
                <td>${codigo}</td>
                <td>${escapeHtml(String(item.frota || "-"))}</td>
                <td class="col-equipe">${equipe}</td>
                <td class="col-grupo">${grupo}</td>
                <td class="col-desc">${descricao}</td>
                <td class="col-just-text" title="${detalheEsc}">${resumoEsc}</td>
            </tr>
        `;
    }).join("");

    currentJustificativasListaExibida = [...lista];
    renderizarJustificativasChart(lista);
}

function atualizarMetaModalJustificativas() {
    if (!justificativasMeta) return;
    if (currentJustificativasModo === "historico") {
        const periodo = String(historicoJustPeriodo?.value || "diario").trim().toLowerCase();
        const uo = String(historicoJustUo?.value || "").trim() || "Todas";
        const supervisor = String(historicoJustSupervisor?.value || "").trim() || "Todos";
        const referencia = periodo === "mensal"
            ? (historicoJustMes?.value || "-")
            : (formatarDataBR(historicoJustData?.value || "") || historicoJustData?.value || "-");
        justificativasMeta.innerText = `| Período: ${periodo.toUpperCase()} | Referência: ${referencia} | UO: ${uo} | Supervisor: ${supervisor}`;
        return;
    }
    const supervisor = String(currentModalContext?.supervisor || "").trim() || "GERAL";
    const data = formatarDataBR(currentModalContext?.data || "") || "-";
    justificativasMeta.innerText = `| Supervisor: ${supervisor} | Data: ${data}`;
}

function atualizarCamposHistoricoJustificativas() {
    const periodo = String(historicoJustPeriodo?.value || "diario").trim().toLowerCase();
    if (grupoHistoricoJustData) grupoHistoricoJustData.classList.toggle("hidden", periodo === "mensal");
    if (grupoHistoricoJustMes) grupoHistoricoJustMes.classList.toggle("hidden", periodo !== "mensal");
}

function obterSupervisoresDisponiveisPorDataUo(dataRef, uoRef) {
    const dataBase = String(dataRef || dataSelect?.value || "").trim();
    const uoBase = String(uoRef || uoSelect?.value || "").trim();
    if (!dataBase) return [];

    const linhas = obterLinhasContextoModal(dataBase, uoBase);
    const supervisores = [...new Set(
        (Array.isArray(linhas) ? linhas : [])
            .map((linha) => {
                const sup =
                    obterValorColuna(linha, ["SUPERVISOR - SETOR", "SUPERVISOR", "Supervisor"]) ||
                    obterValorColunaPorFragmentos(linha, ["SUPERVISOR"]) ||
                    "";
                return String(sup || "").trim();
            })
            .filter(Boolean)
    )];

    return supervisores.sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));
}

function popularSelectSupervisorHistorico(selectEl, dataRef, uoRef, valorPadrao = "") {
    if (!selectEl) return;

    const valorAtual = String(valorPadrao || selectEl.value || "").trim();
    const supervisores = obterSupervisoresDisponiveisPorDataUo(dataRef, uoRef);

    selectEl.innerHTML = `
        <option value="">Todos</option>
        ${supervisores.map((sup) => `<option value="${escapeHtml(sup)}">${escapeHtml(sup)}</option>`).join("")}
    `;

    selectEl.value = supervisores.includes(valorAtual) ? valorAtual : "";
}

function obterHistoricoAcordosLocal() {
    const base = carregarBaseAcordos();
    const registros = [];

    Object.values(base || {}).forEach((registro) => {
        if (!registro || typeof registro !== "object") return;

        Object.values(registro.acordos || {}).forEach((acordo) => {
            if (!acordo || typeof acordo !== "object") return;

            registros.push({
                id: `${registro.data || ""}||${registro.supervisor || ""}||${acordo.codigo || ""}`,
                salvoEm: String(acordo.salvoEm || ""),
                dataRef: String(acordo.data || registro.data || ""),
                horaRef: String(acordo.horaAcordo || ""),
                uo: String(acordo.uo || registro.uo || ""),
                tipoVisao: String(acordo.tipoVisao || registro.tipoVisao || ""),
                supervisor: String(acordo.supervisor || registro.supervisor || ""),
                codigo: String(acordo.codigo || ""),
                equipe: String(acordo.equipe || ""),
                acao: "SALVAR",
                metaDia: Number(acordo.metaDiaAcordo ?? 0),
                metaAcordo: Number(acordo.metaAcordo ?? 0),
                prodAcordo: Number(acordo.prodAcordo ?? 0),
                faixaAcordo: String(acordo.faixaAcordo || ""),
                percAcordo: Number(acordo.percAcordo ?? 0)
            });
        });
    });

    return registros.sort((a, b) =>
        String(b.salvoEm || "").localeCompare(String(a.salvoEm || "")) ||
        String(a.equipe || "").localeCompare(String(b.equipe || ""), "pt-BR", { sensitivity: "base" })
    );
}

function filtrarHistoricoAcordosLocal() {
    const periodo = String(historicoAcordoPeriodo?.value || "diario").trim().toLowerCase();
    const dataRef = String(historicoAcordoData?.value || "").trim();
    const mesRef = String(historicoAcordoMes?.value || "").trim();
    const uo = String(historicoAcordoUo?.value || "").trim();
    const supervisor = String(historicoAcordoSupervisor?.value || "").trim();
    const tipoVisao = String(tipoSelect?.value || "").trim();

    return obterHistoricoAcordosLocal().filter((item) => {
        if (uo && String(item.uo || "") !== uo) return false;
        if (supervisor && String(item.supervisor || "") !== supervisor) return false;
        if (tipoVisao && String(item.tipoVisao || "") && String(item.tipoVisao || "") !== tipoVisao) return false;
        return dataPertenceAoPeriodo(item.dataRef, periodo, dataRef, mesRef);
    });
}

function popularSupervisorHistoricoAcordos() {
    if (!historicoAcordoSupervisor) return;

    const periodo = String(historicoAcordoPeriodo?.value || "diario").trim().toLowerCase();
    const dataRef = String(historicoAcordoData?.value || "").trim();
    const mesRef = String(historicoAcordoMes?.value || "").trim();
    const uo = String(historicoAcordoUo?.value || "").trim();
    const valorAtual = String(historicoAcordoSupervisor.value || "").trim();

    const mapa = new Map();
    obterHistoricoAcordosLocal().forEach((item) => {
        if (uo && String(item.uo || "") !== uo) return;
        if (!dataPertenceAoPeriodo(item.dataRef, periodo, dataRef, mesRef)) return;

        const supervisor = String(item.supervisor || "").trim();
        if (!supervisor) return;
        mapa.set(supervisor, (mapa.get(supervisor) || 0) + 1);
    });

    const supervisores = [...mapa.entries()]
        .sort((a, b) => a[0].localeCompare(b[0], "pt-BR", { sensitivity: "base" }));

    historicoAcordoSupervisor.innerHTML = `
        <option value="">Todos${supervisores.length ? ` (${supervisores.length})` : ""}</option>
        ${supervisores.map(([sup, qtd]) => `<option value="${escapeHtml(sup)}">${escapeHtml(sup)} (${qtd})</option>`).join("")}
    `;
    historicoAcordoSupervisor.value = supervisores.some(([sup]) => sup === valorAtual) ? valorAtual : "";
    historicoAcordoSupervisor.disabled = supervisores.length === 0;
}

function popularFiltrosHistoricoJustificativas() {
    if (historicoJustUo && uoSelect) {
        historicoJustUo.innerHTML = uoSelect.innerHTML || `<option value="">Todas</option>`;
        historicoJustUo.value = String(uoSelect.value || "").trim();
    }
    if (historicoJustData && !historicoJustData.value) {
        historicoJustData.value = String(dataSelect?.value || obterHojeISO()).trim();
    }
    if (historicoJustMes && !historicoJustMes.value) {
        historicoJustMes.value = String(mesSelect?.value || obterAnoMesAtual()).trim();
    }
    popularSelectSupervisorHistorico(
        historicoJustSupervisor,
        historicoJustData?.value,
        historicoJustUo?.value,
        historicoJustSupervisor?.value
    );
    atualizarCamposHistoricoJustificativas();
}

function atualizarMetaModalAcordos() {
    if (!acordosMeta) return;

    if (currentAcordosModo === "historico") {
        const periodo = String(historicoAcordoPeriodo?.value || "diario").trim().toLowerCase();
        const uo = String(historicoAcordoUo?.value || "").trim() || "Todas";
        const supervisor = String(historicoAcordoSupervisor?.value || "").trim() || "Todos";
        const referencia = periodo === "mensal"
            ? (historicoAcordoMes?.value || "-")
            : (formatarDataBR(historicoAcordoData?.value || "") || historicoAcordoData?.value || "-");
        acordosMeta.innerText = `| Período: ${periodo.toUpperCase()} | Referência: ${referencia} | UO: ${uo} | Supervisor: ${supervisor}`;
        return;
    }

    const supervisor = String(currentModalContext?.supervisor || "").trim() || "GERAL";
    const data = formatarDataBR(currentModalContext?.data || "") || "-";
    acordosMeta.innerText = `| Supervisor: ${supervisor} | Data: ${data}`;
}

function atualizarCamposHistoricoAcordos() {
    const periodo = String(historicoAcordoPeriodo?.value || "diario").trim().toLowerCase();
    if (grupoHistoricoAcordoData) grupoHistoricoAcordoData.classList.toggle("hidden", periodo === "mensal");
    if (grupoHistoricoAcordoMes) grupoHistoricoAcordoMes.classList.toggle("hidden", periodo !== "mensal");
}

function popularFiltrosHistoricoAcordos() {
    if (historicoAcordoUo && uoSelect) {
        historicoAcordoUo.innerHTML = uoSelect.innerHTML || `<option value="">Todas</option>`;
        historicoAcordoUo.value = String(uoSelect.value || "").trim();
    }
    if (historicoAcordoData && !historicoAcordoData.value) {
        historicoAcordoData.value = String(dataSelect?.value || obterHojeISO()).trim();
    }
    if (historicoAcordoMes && !historicoAcordoMes.value) {
        historicoAcordoMes.value = String(mesSelect?.value || obterAnoMesAtual()).trim();
    }
    popularSupervisorHistoricoAcordos();
    atualizarCamposHistoricoAcordos();
}

function renderizarCabecalhoHistoricoAcordos() {
    if (!theadAcordosRow) return;
    theadAcordosRow.innerHTML = `
        <th>Salvo em</th>
        <th>Data Ref.</th>
        <th>Hora</th>
        <th>UO</th>
        <th>Supervisor</th>
        <th>Cód. Eq.</th>
        <th class="col-equipe">Equipe</th>
        <th>Ação</th>
        <th>Meta Dia</th>
        <th>Meta Acordo</th>
        <th>Prod. Acordo</th>
        <th>Faixa</th>
        <th>% Prod.</th>
    `;
}

function renderizarHistoricoAcordosTabela(mensagem = "") {
    const qtdRegistros = currentAcordosListaExibida.length;
    const qtdEquipes = new Set(currentAcordosListaExibida.map((item) => item.codigo).filter(Boolean)).size;
    const qtdSalvos = currentAcordosListaExibida.filter((item) => item.acao === "SALVAR").length;
    const qtdExcluidos = currentAcordosListaExibida.filter((item) => item.acao === "EXCLUIR").length;
    const percSalvos = qtdRegistros ? (qtdSalvos / qtdRegistros) * 100 : 0;
    const percExcluidos = qtdRegistros ? (qtdExcluidos / qtdRegistros) * 100 : 0;

    if (kpiAcordoAnalisadasLabel) kpiAcordoAnalisadasLabel.innerText = "Qtde. Registros";
    if (kpiAcordoMarcadasLabel) kpiAcordoMarcadasLabel.innerText = "Qtde. Equipes";
    if (kpiAcordoCumpridoLabel) kpiAcordoCumpridoLabel.innerText = "Ações Salvar";
    if (kpiAcordoNaoCumpridoLabel) kpiAcordoNaoCumpridoLabel.innerText = "Ações Excluir";
    if (kpiAcordoPercAcordadasLabel) kpiAcordoPercAcordadasLabel.innerText = "% Salvar";
    if (kpiAcordoEficacia?.previousElementSibling) {
        kpiAcordoEficacia.previousElementSibling.innerText = "% Excluir";
    }
    if (kpiAcordoAnalisadas) kpiAcordoAnalisadas.innerText = String(qtdRegistros);
    if (kpiAcordoMarcadas) kpiAcordoMarcadas.innerText = String(qtdEquipes);
    if (kpiAcordoCumprido) kpiAcordoCumprido.innerText = String(qtdSalvos);
    if (kpiAcordoNaoCumprido) kpiAcordoNaoCumprido.innerText = String(qtdExcluidos);
    if (kpiAcordoPercAcordadas) kpiAcordoPercAcordadas.innerText = `${percSalvos.toFixed(1).replace(".", ",")}%`;
    if (kpiAcordoEficacia) kpiAcordoEficacia.innerText = `${percExcluidos.toFixed(1).replace(".", ",")}%`;

    if (modalAcordosTitulo && currentAcordosModo === "historico") {
        modalAcordosTitulo.innerText = "HISTÓRICO DE ACORDOS";
    }

    if (!currentAcordosListaExibida.length) {
        const texto = mensagem || "Nenhum acordo encontrado para os filtros informados.";
        modalAcordosBody.innerHTML = `<tr><td colspan="13">${escapeHtml(texto)}</td></tr>`;
        return;
    }

    const aviso = mensagem
        ? `<tr><td colspan="13" class="linha-aviso-historico">${escapeHtml(mensagem)}</td></tr>`
        : "";

    modalAcordosBody.innerHTML = `${aviso}${currentAcordosListaExibida.map((item) => `
        <tr>
            <td>${escapeHtml(item.salvoEm ? new Date(item.salvoEm).toLocaleString("pt-BR") : "-")}</td>
            <td>${escapeHtml(item.dataRef || "-")}</td>
            <td>${escapeHtml(item.horaRef || "-")}</td>
            <td>${escapeHtml(item.uo || "-")}</td>
            <td>${escapeHtml(item.supervisor || "-")}</td>
            <td>${escapeHtml(item.codigo || "-")}</td>
            <td class="col-equipe">${escapeHtml(item.equipe || "-")}</td>
            <td>${escapeHtml(item.acao || "-")}</td>
            <td>${fmt3(item.metaDia)}</td>
            <td>${fmt3(item.metaAcordo)}</td>
            <td>${fmt3(item.prodAcordo)}</td>
            <td class="faixa-${escapeHtml(item.faixaAcordo || "-")}">${escapeHtml(item.faixaAcordo || "-")}</td>
            <td>${Number(item.percAcordo || 0).toFixed(2)}%</td>
        </tr>
    `).join("")}`;
}

function renderizarCabecalhoContextoAcordos(horaReferencia = "17") {
    if (!theadAcordosRow) return;
    const rotulosAcordo = obterRotulosPainelAcordos(horaReferencia);
    theadAcordosRow.innerHTML = `
        <th>Cód. Eq.</th>
        <th>Frota</th>
        <th class="col-equipe">Equipes</th>
        <th>Meta</th>
        <th>Prod. Acordo</th>
        <th>Faixa Acordo</th>
        <th>% PROD. Acordo</th>
        <th>09h</th>
        <th>11h</th>
        <th>13h</th>
        <th>15h</th>
        <th>17h</th>
        <th>Serv.</th>
        <th>Prod.</th>
        <th>Improd.</th>
        <th>% IMPROD.</th>
        <th>1º<br>ATEND.</th>
        <th>ULT.<br>ATEND.</th>
        <th>JORNADA<br>PROD.</th>
        <th id="thAcordoMomento">${rotulosAcordo.colunaAcordo}</th>
        <th id="thStatusAcordo">${rotulosAcordo.colunaStatus}</th>
    `;
}

async function aplicarHistoricoAcordos() {
    if (!modalAcordos || !modalAcordosBody) return;

    currentAcordosModo = "historico";
    if (historicoAcordosFiltros) historicoAcordosFiltros.classList.remove("hidden");
    popularSupervisorHistoricoAcordos();
    renderizarCabecalhoHistoricoAcordos();
    atualizarMetaModalAcordos();

    const params = new URLSearchParams();
    params.set("periodo", String(historicoAcordoPeriodo?.value || "diario").trim());
    if (historicoAcordoData?.value) params.set("data", historicoAcordoData.value);
    if (historicoAcordoMes?.value) params.set("mes", historicoAcordoMes.value);
    if (historicoAcordoUo?.value) params.set("uo", historicoAcordoUo.value);
    if (historicoAcordoSupervisor?.value) params.set("supervisor", historicoAcordoSupervisor.value);
    if (tipoSelect?.value) params.set("tipo_visao", tipoSelect.value);
    params.set("limit", "2000");

    modalAcordosBody.innerHTML = `<tr><td colspan="13">Carregando histórico...</td></tr>`;
    currentAcordosListaExibida = [];

    try {
        const resp = await fetch(`/api/historico/acordos?${params.toString()}`, { cache: "no-store" });
        if (resp.status === 404) {
            throw new Error("API_HISTORICO_ACORDOS_404");
        }
        if (!resp.ok) throw new Error(`Erro ao carregar histórico (${resp.status}).`);

        const payload = await resp.json();
        const rows = Array.isArray(payload?.rows) ? payload.rows : [];
        currentAcordosListaExibida = rows.map((row) => ({
            id: String(row?.id || ""),
            salvoEm: String(row?.salvo_em || ""),
            dataRef: String(row?.data_ref || ""),
            horaRef: String(row?.hora_referencia || ""),
            uo: String(row?.uo || ""),
            supervisor: String(row?.supervisor || ""),
            codigo: String(row?.codigo_equipe || ""),
            equipe: String(row?.equipe || ""),
            acao: String(row?.acao || "").toUpperCase(),
            metaDia: Number(row?.meta_dia_acordo || 0),
            metaAcordo: Number(row?.meta_acordo || 0),
            prodAcordo: Number(row?.prod_acordo || 0),
            faixaAcordo: String(row?.faixa_acordo || ""),
                percAcordo: Number(row?.perc_acordo || 0)
        }));

        if (acordosMeta) {
            acordosMeta.innerText = `${acordosMeta.innerText} | Fonte: API`;
        }

        renderizarHistoricoAcordosTabela();
    } catch (error) {
        if (String(error?.message || error) === "API_HISTORICO_ACORDOS_404") {
            currentAcordosListaExibida = filtrarHistoricoAcordosLocal();
            if (modalAcordosTitulo) {
                modalAcordosTitulo.innerText = "ACORDOS DO SUPERVISOR";
            }
            if (acordosMeta) {
                acordosMeta.innerText = `${acordosMeta.innerText} | Fonte: navegador`;
            }
            renderizarHistoricoAcordosTabela("A API de histórico ainda não está disponível. Exibindo os acordos salvos no navegador.");
            return;
        }

        modalAcordosBody.innerHTML = `<tr><td colspan="13">${escapeHtml(String(error?.message || error))}</td></tr>`;
    }
}

function abrirHistoricoAcordos() {
    popularFiltrosHistoricoAcordos();
    if (modalAcordos) modalAcordos.classList.remove("hidden");
    aplicarHistoricoAcordos();
}

function renderizarCabecalhoContextoJustificativas() {
    const tr = document.querySelector("#tabelaJustificativas thead tr");
    if (!tr) return;
    tr.innerHTML = `
        <th>Cód. Eq.</th>
        <th>Frota</th>
        <th class="col-equipe">Equipes</th>
        <th class="col-grupo">Grupo</th>
        <th class="col-desc">Descrição</th>
        <th class="col-just">Justificativa</th>
    `;
}

function renderizarCabecalhoHistoricoJustificativas() {
    const tr = document.querySelector("#tabelaJustificativas thead tr");
    if (!tr) return;
    tr.innerHTML = `
        <th>Salvo em</th>
        <th>Data Ref.</th>
        <th>Hora</th>
        <th>UO</th>
        <th>Supervisor</th>
        <th>Cód. Eq.</th>
        <th class="col-equipe">Equipe</th>
        <th class="col-grupo">Grupo</th>
        <th class="col-desc">Descrição</th>
        <th class="col-just">Justificativa</th>
    `;
}

async function aplicarHistoricoJustificativas() {
    if (!modalJustificativas || !modalJustificativasBody) return;

    currentJustificativasModo = "historico";
    if (historicoJustificativasFiltros) historicoJustificativasFiltros.classList.remove("hidden");
    if (justificativasHeadline) justificativasHeadline.classList.add("hidden");
    const kpis = document.getElementById("kpisJustificativas");
    if (kpis) kpis.classList.add("hidden");
    renderizarCabecalhoHistoricoJustificativas();
    atualizarMetaModalJustificativas();

    const params = new URLSearchParams();
    params.set("periodo", String(historicoJustPeriodo?.value || "diario").trim());
    if (historicoJustData?.value) params.set("data", historicoJustData.value);
    if (historicoJustMes?.value) params.set("mes", historicoJustMes.value);
    if (historicoJustUo?.value) params.set("uo", historicoJustUo.value);
    if (historicoJustSupervisor?.value) params.set("supervisor", historicoJustSupervisor.value);
    if (tipoSelect?.value) params.set("tipo_visao", tipoSelect.value);
    params.set("limit", "2000");

    modalJustificativasBody.innerHTML = `<tr><td colspan="10">Carregando histórico...</td></tr>`;
    currentJustificativasListaExibida = [];
    if (justificativasDetalheEquipe) justificativasDetalheEquipe.innerText = "Selecione um registro";
    if (justificativasDetalheTexto) justificativasDetalheTexto.value = "";

    try {
        const resp = await fetch(`/api/historico/justificativas?${params.toString()}`, { cache: "no-store" });
        if (!resp.ok) {
            throw new Error(`Erro ao carregar histórico (${resp.status}).`);
        }

        const payload = await resp.json();
        const rows = Array.isArray(payload?.rows) ? payload.rows : [];
        currentJustificativasListaExibida = rows.map((row) => {
            const justificativa = String(row?.justificativa || "");
            const parsed = parseJustificativaEstruturada(justificativa);
            return {
                selectionKey: String(row?.id || ""),
                codigo: String(row?.codigo_equipe || ""),
                equipe: String(row?.equipe || ""),
                grupo: String(row?.motivo_grupo || parsed.grupo || "-").toUpperCase(),
                descricao: String(row?.motivo_descricao || parsed.descricao || "").toUpperCase(),
                detalhe: String(row?.detalhe || parsed.detalhe || ""),
                justificativa,
                salvoEm: String(row?.salvo_em || ""),
                dataRef: String(row?.data_ref || ""),
                horaRef: String(row?.hora_referencia || ""),
                uo: String(row?.uo || ""),
                supervisor: String(row?.supervisor || "")
            };
        });

        if (!currentJustificativasListaExibida.length) {
            modalJustificativasBody.innerHTML = `<tr><td colspan="10">Nenhuma justificativa encontrada para os filtros informados.</td></tr>`;
            renderizarJustificativasChart([]);
            return;
        }

        modalJustificativasBody.innerHTML = currentJustificativasListaExibida.map((item) => {
            const textoCompleto = String(item.detalhe || item.justificativa || "").trim();
            const resumo = textoCompleto.length > 160 ? `${textoCompleto.slice(0, 160)}...` : (textoCompleto || "-");
            return `
                <tr data-codigo="${escapeHtml(item.selectionKey)}" class="linha-justificativa" onclick="selecionarJustificativaDetalhe('${escapeJsString(item.selectionKey)}')">
                    <td>${escapeHtml(item.salvoEm ? new Date(item.salvoEm).toLocaleString("pt-BR") : "-")}</td>
                    <td>${escapeHtml(item.dataRef || "-")}</td>
                    <td>${escapeHtml(item.horaRef || "-")}</td>
                    <td>${escapeHtml(item.uo || "-")}</td>
                    <td>${escapeHtml(item.supervisor || "-")}</td>
                    <td>${escapeHtml(item.codigo || "-")}</td>
                    <td class="col-equipe">${escapeHtml(item.equipe || "-")}</td>
                    <td class="col-grupo">${escapeHtml(item.grupo || "-")}</td>
                    <td class="col-desc">${escapeHtml(item.descricao || "-")}</td>
                    <td class="col-just-text" title="${escapeHtml(textoCompleto)}">${escapeHtml(resumo)}</td>
                </tr>
            `;
        }).join("");

        renderizarJustificativasChart(currentJustificativasListaExibida);
    } catch (error) {
        modalJustificativasBody.innerHTML = `<tr><td colspan="10">${escapeHtml(String(error?.message || error))}</td></tr>`;
        renderizarJustificativasChart([]);
    }
}

function abrirModalJustificativasEquipes() {
    if (!currentModalContext) {
        const dataCtx = String(dataSelect?.value || "").trim();
        if (!dataCtx) {
            alert("Selecione uma data.");
            return;
        }

        const uoCtx = String(uoSelect?.value || "").trim();
        const listaBase = montarListaEquipesSupervisor(null, "13", dataCtx, uoCtx, null);
        const metaFixa = listaBase.reduce((acc, item) => acc + Number(item.metaDia || 0), 0);
        const prodFixa = listaBase.reduce((acc, item) => acc + Number(item.prodDia || 0), 0);

        currentModalContext = {
            tipoModal: "menu-justificativas",
            supervisor: "",
            horaClicada: "13",
            faixaClicada: "",
            data: dataCtx,
            uo: uoCtx,
            tipoVisao: tipoSelect?.value || "",
            listaAtual: listaBase,
            kpisFixos: {
                meta: metaFixa,
                prod: prodFixa,
                perc: metaFixa > 0 ? (prodFixa / metaFixa) * 100 : 0
            },
            qtdDAnalisadas: listaBase.filter(e => e.faixaDiaCompleta === "D").length
        };
    }

    currentJustificativasModo = "contexto";
    if (historicoJustificativasFiltros) historicoJustificativasFiltros.classList.add("hidden");
    const kpis = document.getElementById("kpisJustificativas");
    if (kpis) kpis.classList.remove("hidden");
    renderizarCabecalhoContextoJustificativas();
    currentJustificativasFilter = "d-nao-acordadas";
    if (justificativasHeadline) justificativasHeadline.classList.remove("hidden");
    renderizarModalJustificativas();
    modalJustificativas.classList.remove("hidden");
}

function abrirHistoricoJustificativas() {
    popularFiltrosHistoricoJustificativas();
    if (modalJustificativas) modalJustificativas.classList.remove("hidden");
    aplicarHistoricoJustificativas();
}

function fecharModalJustificativas() {
    if (!modalJustificativas) return;
    modalJustificativas.classList.remove("fullscreen");
    modalJustificativas.classList.add("hidden");

    if (btnFullscreenJustificativas) {
        btnFullscreenJustificativas.innerText = "⛶ Tela cheia";
    }
}

function selecionarJustificativaDetalhe(codigo) {
    if (!currentModalContext && currentJustificativasModo !== "historico") return;

    document.querySelectorAll("#modalJustificativasBody tr.linha-justificativa")
        .forEach(tr => tr.classList.remove("selecionada"));
    const tr = document.querySelector(`#modalJustificativasBody tr[data-codigo="${CSS.escape(String(codigo))}"]`);
    if (tr) tr.classList.add("selecionada");

    const itemGrafico = (currentJustificativasListaExibida || []).find(item => String(item.selectionKey || item.codigo || "") === String(codigo));
    if (itemGrafico) {
        renderizarJustificativasChart([itemGrafico]);
    }

    if (currentJustificativasModo === "historico") {
        const itemHistorico = (currentJustificativasListaExibida || []).find(item => String(item.selectionKey || "") === String(codigo));
        if (!itemHistorico) return;

        if (justificativasDetalheEquipe) {
            justificativasDetalheEquipe.innerText = `${itemHistorico.equipe || "-"} | ${itemHistorico.codigo || "-"} | ${itemHistorico.dataRef || "-"} ${itemHistorico.horaRef || ""}`.trim();
        }

        if (justificativasDetalheTexto) {
            justificativasDetalheTexto.value = String(itemHistorico.detalhe || itemHistorico.justificativa || "");
            justificativasDetalheTexto.scrollTop = 0;
        }
        return;
    }

    const mapa = obterMapaJustificativasPainel(currentModalContext);
    const item = mapa?.[String(codigo)];
    if (!item) return;

    if (justificativasDetalheEquipe) {
        justificativasDetalheEquipe.innerText = `${item.equipe || "-"} | ${item.codigo || "-"}`;
    }

    if (justificativasDetalheTexto) {
        const parsed = parseJustificativaEstruturada(item.justificativa || "");
        const detalhe = String(item.detalhe || "").trim() || parsed.detalhe || "";
        justificativasDetalheTexto.value = detalhe || String(item.justificativa || "");
        justificativasDetalheTexto.scrollTop = 0;
    }
}

function copiarJustificativaDetalhe() {
    const texto = String(justificativasDetalheTexto?.value || "").trim();
    if (!texto) return;

    if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(texto).catch(() => {});
        return;
    }

    if (justificativasDetalheTexto) {
        justificativasDetalheTexto.focus();
        justificativasDetalheTexto.select();
        try { document.execCommand("copy"); } catch {}
        justificativasDetalheTexto.setSelectionRange(texto.length, texto.length);
    }
}

function toggleFullscreenJustificativas() {
    if (!modalJustificativas) return;
    modalJustificativas.classList.toggle("fullscreen");

    if (btnFullscreenJustificativas) {
        btnFullscreenJustificativas.innerText = modalJustificativas.classList.contains("fullscreen")
            ? "⤢ Sair"
            : "⛶ Tela cheia";
    }
}

function horaEhFechamentoAcordo(hora) {
    const hh = normalizarHora(hora);
    return hh === "17" || hh === "18" || hh === "19";
}

function horaPermitePainelAcordos(hora) {
    const hh = normalizarHora(hora);
    return hh === "14" || hh === "15" || hh === "16" || horaEhFechamentoAcordo(hh);
}

function obterRotulosPainelAcordos(hora) {
    const hh = normalizarHora(hora);

    if (hh === "14" || hh === "15" || hh === "16") {
        return {
            botao: "ANDAMENTO ACORDOS",
            titulo: "ANDAMENTO DOS ACORDOS",
            cumpridoLabel: "Qtde. Eq. Cumprido",
            eficaciaLabel: "Eficacia Parcial do Acordo",
            colunaAcordo: `ACORDO AS ${hh}H`,
            colunaStatus: `STATUS<br>ACORDO AS ${hh}H`
        };
    }

    return {
        botao: "ACORDOS",
        titulo: "ACORDOS",
        cumpridoLabel: "Qtde. Eq. Acordo Cumprido",
        eficaciaLabel: "Eficacia do Acordo",
        colunaAcordo: "ACORDO",
        colunaStatus: "STATUS<br>ACORDO FIM DO DIA"
    };
}

function atualizarBotaoAcordos17() {
    if (!btnAcordos17) return;

    const podeMostrar =
        currentModalContext &&
        (currentModalContext.tipoModal === "faixa" || currentModalContext.tipoModal === "equipes") &&
        horaPermitePainelAcordos(currentModalContext.horaClicada);

    if (!podeMostrar) {
        btnAcordos17.classList.add("hidden");
        btnAcordos17.textContent = "ACORDOS";
        return;
    }

    const rotulos = obterRotulosPainelAcordos(currentModalContext.horaClicada);
    const qtd = Object.keys(obterMapaAcordosPainel(currentModalContext)).length;
    btnAcordos17.textContent = qtd > 0 ? `${rotulos.botao} (${qtd})` : rotulos.botao;
    btnAcordos17.classList.remove("hidden");
}

function atualizarBotaoAcordosRs() {
    if (!btnAcordosRs) return;

    const podeMostrar =
        currentModalContext &&
        (currentModalContext.tipoModal === "faixa" || currentModalContext.tipoModal === "equipes") &&
        (String(currentModalContext.horaClicada) === "13" || String(currentModalContext.horaClicada) === "15" || String(currentModalContext.horaClicada) === "17");

    if (!podeMostrar) {
        btnAcordosRs.classList.add("hidden");
        btnAcordosRs.textContent = "R$ ACORDOS";
        return;
    }

    btnAcordosRs.textContent = "R$ ACORDOS";
    btnAcordosRs.classList.remove("hidden");
}

function montarStatusAcordoFaixa(faixaDia, horaReferencia = "17") {
    const fechamento = horaEhFechamentoAcordo(horaReferencia);
    if (!faixaDia || faixaDia === "-") {
        return {
            texto: "SEM FAIXA DIA",
            classe: "status-acordo-neutro",
            chipClasse: "pendente",
            icone: "⏳",
            cumprido: false
        };
    }

    if (faixaDia !== "D") {
        return {
            texto: "CUMPRIDO",
            classe: "status-acordo-ok",
            chipClasse: "ok",
            icone: "👍",
            cumprido: true
        };
    }

    return {
        texto: fechamento ? "NAO CUMPRIDO" : "PENDENTE",
        classe: fechamento ? "status-acordo-nao" : "status-acordo-pendente",
        chipClasse: fechamento ? "nao" : "pendente",
        icone: horaReferencia === "17" ? "👎" : "⏳",
        cumprido: false
    };
}

/* ================= HELPERS DAS EQUIPES NO MODAL ================= */

function horaExcelParaTexto(valor) {
    if (valor === null || valor === undefined || valor === "" || valor === "-") {
        return "-";
    }

    if (typeof valor === "string" && valor.includes(":")) {
        return valor;
    }

    const numero = Number(valor);
    if (isNaN(numero)) return "-";

    const parteHora = numero % 1;
    const totalMin = Math.round(parteHora * 24 * 60);
    const h = Math.floor(totalMin / 60).toString().padStart(2, "0");
    const m = (totalMin % 60).toString().padStart(2, "0");

    return `${h}:${m}`;
}

function horaTextoParaMinutos(valor) {
    const s = horaExcelParaTexto(valor);
    if (!s || s === "-" || typeof s !== "string" || !s.includes(":")) return null;

    const m = /^(\d{1,2}):(\d{2})/.exec(s.trim());
    if (!m) return null;

    const h = Number(m[1]);
    const mm = Number(m[2]);
    if (!Number.isFinite(h) || !Number.isFinite(mm)) return null;
    if (h < 0 || h > 47 || mm < 0 || mm > 59) return null;

    return h * 60 + mm;
}

function calcularStatusJornada(primeiroAtend, jornadaProd) {
    const primeiroTxt = horaExcelParaTexto(primeiroAtend);
    if (!primeiroTxt || primeiroTxt === "-") return "SEM ATENDIMENTO";

    const minutos = horaTextoParaMinutos(jornadaProd);
    if (minutos === null) return "INCOMPLETA";

    return minutos >= 7 * 60 ? "COMPLETA" : "INCOMPLETA";
}

function obterTurnoPorInicioJornada(inicioJornada) {
    const minutos = horaTextoParaMinutos(inicioJornada);
    if (!Number.isFinite(minutos)) return "";

    if (minutos < 10 * 60) return "COMERCIAL";
    if (minutos <= 15 * 60) return "TARDE";
    return "MADRUGADA";
}

function aplicarFiltroTurnoEquipes(lista = []) {
    const turno = String(turnoSelect?.value || "").trim().toUpperCase();
    if (!turno) return lista;
    return lista.filter(item => obterTurnoPorInicioJornada(item.inicioJornada) === turno);
}

function obterInicioJornadaLinha(linha) {
    return (
        obterValorColuna(linha, ["INICIO_JORNADA", "Inicio Jornada", "Início Jornada"]) ||
        obterValorColunaPorFragmentos(linha, ["inicio", "jornada"]) ||
        ""
    );
}

function obterCodigosTurnoSelecionado(data, uo) {
    const turno = String(turnoSelect?.value || "").trim().toUpperCase();
    if (!turno) return null;

    const codigos = new Set();
    (dados || []).forEach(linha => {
        if (data && normalizarDataExcel(linha["Data"]) !== data) return;
        if (uo && String(obterValorColuna(linha, ["Cód.UO", "CÃ³d.UO", "CÃƒÂ³d.UO", "COD_UO", "UO"]) || "") !== String(uo)) return;

        const codigo = obterCodigoEquipeLinha(linha);
        if (!codigo) return;

        if (obterTurnoPorInicioJornada(obterInicioJornadaLinha(linha)) === turno) {
            codigos.add(String(codigo));
        }
    });

    return codigos;
}

function linhaPassaFiltroTurnoSelecionado(codigo, codigosTurnoSelecionado) {
    if (!codigosTurnoSelecionado) return true;
    return codigosTurnoSelecionado.has(String(codigo || "").trim());
}

function rotuloTurnoAtual() {
    const turno = String(turnoSelect?.value || "").trim().toUpperCase();
    if (!turno) return "";
    if (turno === "COMERCIAL") return "Comercial";
    if (turno === "TARDE") return "Tarde";
    if (turno === "MADRUGADA") return "Madrugada";
    return turno;
}

function turnoTardeAtivo() {
    return String(turnoSelect?.value || "").trim().toUpperCase() === "TARDE";
}

function turnoMadrugadaAtivo() {
    return String(turnoSelect?.value || "").trim().toUpperCase() === "MADRUGADA";
}

function obterHorariosModalEquipes() {
    if (turnoTardeAtivo()) return FAIXAS_TARDE;
    if (turnoMadrugadaAtivo()) return FAIXAS_MADRUGADA;
    return modoTabela === "total-horas" ? HORAS_TOTAIS : FAIXAS;
}

function obterHoraReferenciaModalEquipes(horaClicada) {
    if (turnoTardeAtivo()) return FAIXAS_TARDE[FAIXAS_TARDE.length - 1];
    if (turnoMadrugadaAtivo()) return FAIXAS_MADRUGADA[FAIXAS_MADRUGADA.length - 1];
    return normalizarHora(horaClicada);
}

async function prepararDadosModalTurno() {
    if (!turnoTardeAtivo() && !turnoMadrugadaAtivo()) return;
    await garantirDadosTotalHoras();
    limparCachesModal();
}

function aplicarFaixaDetalheClasse(faixa) {
    if (!cardDetalheEquipeFaixaDia || !detalheEquipeFaixaDia) return;

    ["faixa-AA", "faixa-A", "faixa-B", "faixa-C", "faixa-D"].forEach(classe => {
        cardDetalheEquipeFaixaDia.classList.remove(classe);
        detalheEquipeFaixaDia.classList.remove(classe);
    });

    const faixaNormalizada = String(faixa || "-").toUpperCase();
    if (["AA", "A", "B", "C", "D"].includes(faixaNormalizada)) {
        const classe = `faixa-${faixaNormalizada}`;
        cardDetalheEquipeFaixaDia.classList.add(classe);
        detalheEquipeFaixaDia.classList.add(classe);
    }
}

function aplicarFaixaDiaKpiClasse(faixa) {
    if (!caixaFaixaDiaFaixa) return;

    const container = caixaFaixaDiaFaixa.parentElement;
    const faixaNormalizada = String(faixa || "-").toUpperCase();
    const classesFaixa = ["faixa-AA", "faixa-A", "faixa-B", "faixa-C", "faixa-D"];

    if (container) {
        classesFaixa.forEach(c => container.classList.remove(c));
    }
    classesFaixa.forEach(c => caixaFaixaDiaFaixa.classList.remove(c));

    if (["AA", "A", "B", "C", "D"].includes(faixaNormalizada)) {
        const classe = `faixa-${faixaNormalizada}`;
        if (container) container.classList.add(classe);
        caixaFaixaDiaFaixa.classList.add(classe);
    }
}

function controlarCardsResumoFaixa(modo = "completo") {
    const mostrarMetaSaldo = modo !== "somente-producao";

    if (cardDetalheFaixaMeta) {
        cardDetalheFaixaMeta.classList.toggle("hidden", !mostrarMetaSaldo);
    }
    if (cardDetalheFaixaSaldo) {
        cardDetalheFaixaSaldo.classList.toggle("hidden", !mostrarMetaSaldo);
    }
    if (cardDetalheFaixaProd && detalheFaixaProd?.previousElementSibling) {
        detalheFaixaProd.previousElementSibling.innerText =
            modo === "somente-producao" ? "Producao da Hora" : "Producao";
    }
}

function atualizarKpisModalEquipes(lista = []) {
    const totalEquipesFixas = currentModalContext?.listaAtual?.length || 0;
    const totalEquipes = lista.length;
    const acordosPainel = obterMapaAcordosPainel(currentModalContext);
    const justificativasPainel = obterMapaJustificativasPainel(currentModalContext);
    const listaBase = currentModalContext?.listaAtual || [];
    const totalEquipesAcordadas = listaBase.filter(item => acordosPainel[String(item.codigo)]).length;
    const totalEquipesJustificadas = listaBase.filter(item => justificativasPainel[String(item.codigo)]).length;
    const totalMeta = lista.reduce((acc, item) => acc + Number(item.metaDia || 0), 0);
    const totalProd = lista.reduce((acc, item) => acc + Number(item.prodDia || 0), 0);
    const totalEqD = lista.filter(item => item.faixaDiaCompleta === "D").length;
    const totalJornadaCompleta = lista.filter(item => item.statusJornada === "COMPLETA").length;
    const totalJornadaIncompleta = lista.filter(item => item.statusJornada === "INCOMPLETA").length;
    const totalSemAtendimento = lista.filter(item => item.statusJornada === "SEM ATENDIMENTO").length;

    let somaImprod = 0;
    let qtdComImprod = 0;

    lista.forEach(item => {
        if (typeof item.percImprod === "number" && !Number.isNaN(item.percImprod)) {
            somaImprod += item.percImprod;
            qtdComImprod++;
        }
    });

    const percProd = totalMeta > 0 ? (totalProd / totalMeta) * 100 : 0;
    const mediaImprod = qtdComImprod > 0 ? somaImprod / qtdComImprod : 0;
    const percEqD = totalEquipes > 0 ? (totalEqD / totalEquipes) * 100 : 0;
    const metaFixa = Number(currentModalContext?.kpisFixos?.meta ?? totalMeta);
    const prodFixa = Number(currentModalContext?.kpisFixos?.prod ?? totalProd);
    const percFixa = Number(
        currentModalContext?.kpisFixos?.perc ??
        (metaFixa > 0 ? (prodFixa / metaFixa) * 100 : 0)
    );

    if (kpiModalEquipesTotal) kpiModalEquipesTotal.innerText = String(totalEquipesFixas);
    if (kpiModalEquipesAcordadas) kpiModalEquipesAcordadas.innerText = String(totalEquipesAcordadas);
    if (kpiModalEquipesJustificadas) kpiModalEquipesJustificadas.innerText = String(totalEquipesJustificadas);
    if (kpiModalMeta) kpiModalMeta.innerText = fmt3(metaFixa);
    if (kpiModalProd) kpiModalProd.innerText = fmt3(prodFixa);
    if (kpiModalPerc) kpiModalPerc.innerText = `${percFixa.toFixed(2)}%`;
    if (kpiModalEqD) kpiModalEqD.innerText = String(totalEqD);
    if (kpiModalImprod) kpiModalImprod.innerText = `${mediaImprod.toFixed(2)}%`;
    if (kpiModalPercEqD) {
        kpiModalPercEqD.innerText = `${percEqD.toFixed(2)}%`;
    }
    if (kpiModalPercJornadaCompleta) {
        kpiModalPercJornadaCompleta.innerText = String(totalJornadaCompleta);
    }
    if (kpiModalPercJornadaIncompleta) {
        kpiModalPercJornadaIncompleta.innerText = String(totalJornadaIncompleta);
    }
    if (kpiModalPercSemAtendimento) {
        kpiModalPercSemAtendimento.innerText = String(totalSemAtendimento);
    }
}

function atualizarKpisModalPorLinhasVisiveis() {
    if (!currentModalContext?.listaAtual) {
        atualizarKpisModalEquipes([]);
        return;
    }

    const codigosVisiveis = new Set(
        [...document.querySelectorAll("#modalBody tr")]
            .filter(linha => linha.style.display !== "none")
            .map(linha => String(linha.dataset.codigo || "").trim())
            .filter(Boolean)
    );

    const listaVisivel = currentModalContext.listaAtual.filter(item =>
        codigosVisiveis.has(String(item.codigo))
    );

    atualizarKpisModalEquipes(listaVisivel);
}

function obterIndiceColunaModal(pattern) {
    const ths = [...document.querySelectorAll("#modalEquipes thead th")];
    return ths.findIndex(th =>
        th.innerText
            .trim()
            .replace(/\s+/g, " ")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase()
            .includes(pattern)
    );
}

function filtrarModalPorKpi(tipo) {
    if (currentModalContext?.tipoModal !== "equipes") return;

    filtrosModal = {};
    currentModalKpiFilter = tipo;

    if (tipo === "todas") {
        document.querySelectorAll("#modalEquipes .filter-pro").forEach(icon => {
            icon.style.opacity = "0.6";
        });
        aplicarFiltrosModal();
        return;
    }

    if (tipo === "eq-d") {
        const idxFaixaDia = obterIndiceColunaModal("FAIXA DIA");
        if (idxFaixaDia >= 0) {
            filtrosModal[idxFaixaDia] = ["D"];
        }
    }

    if (tipo === "equipes-acordadas") {
        document.querySelectorAll("#modalEquipes .filter-pro").forEach(icon => {
            icon.style.opacity = "0.6";
        });
        aplicarFiltrosModal();
        return;
    }

    if (tipo === "equipes-justificadas") {
        document.querySelectorAll("#modalEquipes .filter-pro").forEach(icon => {
            icon.style.opacity = "0.6";
        });
        aplicarFiltrosModal();
        return;
    }

    if (tipo === "jornada-completa" || tipo === "jornada-incompleta" || tipo === "sem-atendimento") {
        const idxStatus = obterIndiceColunaModal("STATUS JORNADA");
        if (idxStatus >= 0) {
            filtrosModal[idxStatus] = [
                tipo === "jornada-completa"
                    ? "COMPLETA"
                    : tipo === "jornada-incompleta"
                        ? "INCOMPLETA"
                        : "SEM ATENDIMENTO"
            ];
        }
    }

    document.querySelectorAll("#modalEquipes .filter-pro").forEach(icon => {
        icon.style.opacity = "0.6";
    });

    Object.keys(filtrosModal).forEach(col => {
        const th = document.querySelectorAll("#modalEquipes thead th")[Number(col)];
        const icon = th?.querySelector(".filter-pro");
        if (icon) icon.style.opacity = "1";
    });

    aplicarFiltrosModal();
}

function configurarAcoesKpisModal() {
    const mapeamento = [
        [cardKpiModalEquipesTotal, "todas", "Mostrar todas as equipes"],
        [cardKpiModalEqD, "eq-d", "Filtrar equipes D"],
        [cardKpiModalPercEqD, "eq-d", "Filtrar equipes D"],
        [cardKpiModalJornadaCompleta, "jornada-completa", "Filtrar jornada completa"],
        [cardKpiModalJornadaIncompleta, "jornada-incompleta", "Filtrar jornada incompleta"],
        [cardKpiModalSemAtendimento, "sem-atendimento", "Filtrar sem atendimento"],
        [cardKpiModalEquipesAcordadas, "equipes-acordadas", "Filtrar equipes com acordo"],
        [cardKpiModalEquipesJustificadas, "equipes-justificadas", "Filtrar equipes com justificativa"]
    ];

    mapeamento.forEach(([card, tipo, titulo]) => {
        if (!card) return;
        card.classList.add("kpi-clickable");
        card.title = titulo;

        if (card.dataset.kpiClickBound === "1") return;

        card.addEventListener("click", () => filtrarModalPorKpi(tipo));
        card.dataset.kpiClickBound = "1";
    });
}

function controlarVisibilidadeKpisModal(mostrar) {
    const blocoKpis = document.getElementById("kpisModalEquipes");
    if (!blocoKpis) return;

    blocoKpis.classList.toggle("hidden", !mostrar);
}

function fecharCaixaDetalheFaixa() {
    if (caixaDetalheFaixa) {
        caixaDetalheFaixa.classList.add("hidden");
    }
}

function fecharCaixaDetalheFaixaDia() {
    if (caixaDetalheFaixaDia) {
        caixaDetalheFaixaDia.classList.add("hidden");
        caixaDetalheFaixaDia.classList.remove("codx-sobre-controle");
        delete caixaDetalheFaixaDia.dataset.manterAberta;
    }
}

if (caixaDetalheFaixaDia && caixaDetalheFaixaDia.dataset.backdropBound !== "1") {
    caixaDetalheFaixaDia.addEventListener("click", (event) => {
        if (event.target === caixaDetalheFaixaDia && caixaDetalheFaixaDia.dataset.manterAberta !== "1") {
            fecharCaixaDetalheFaixaDia();
        }
    });
    caixaDetalheFaixaDia.dataset.backdropBound = "1";
}

function obterLinhaBaseEquipe(codigoEquipe) {
    if (!currentModalContext) return null;

    const codigoStr = String(codigoEquipe);
    const dataCtx = String(currentModalContext.data || "");
    const uoCtx = String(currentModalContext.uo || "");
    const horaPreferida = String(currentModalContext.horaClicada || "");

    const cacheKey = ["linhaBaseEquipe", dataCtx, uoCtx, codigoStr, horaPreferida].join("|");
    if (cacheLinhaBaseEquipe.has(cacheKey)) {
        return cacheLinhaBaseEquipe.get(cacheKey);
    }

    let candidato = null;

    for (const l of obterLinhasContextoModal(dataCtx, uoCtx)) {
        const codLinha = String(l["Cód. Equipe"] || obterValorColunaPorFragmentos(l, ["COD", "EQUIPE"]) || "").trim();
        if (!codLinha || codLinha !== codigoStr) continue;

        const horaLinha = normalizarHora(l["Hora"] || obterValorColunaPorFragmentos(l, ["HORA"]) || "");

        if (horaPreferida && horaLinha === normalizarHora(horaPreferida)) {
            cacheLinhaBaseEquipe.set(cacheKey, l);
            return l;
        }

        if (!candidato) candidato = l;
    }

    cacheLinhaBaseEquipe.set(cacheKey, candidato);
    return candidato;
}

function obterInterferenciasCodXEquipeLocal(codigoEquipe) {
    if (!currentModalContext) return [];

    const codigoStr = String(codigoEquipe);
    const dataCtx = String(currentModalContext.data || "");
    const uoCtx = String(currentModalContext.uo || "");

    const cacheKey = ["codxEquipe", dataCtx, uoCtx, codigoStr].join("|");
    if (cacheCodxEquipe.has(cacheKey)) {
        return cacheCodxEquipe.get(cacheKey);
    }

    const saida = [];

    const pegar = (linha, candidatos, fragmentos) => {
        const v1 = candidatos?.length ? obterValorColuna(linha, candidatos) : "";
        if (String(v1 || "").trim()) return v1;
        return fragmentos?.length ? obterValorColunaPorFragmentos(linha, fragmentos) : "";
    };

    for (const l of obterLinhasContextoModal(dataCtx, uoCtx)) {
        const codLinha = String(l["Cód. Equipe"] || obterValorColunaPorFragmentos(l, ["COD", "EQUIPE"]) || "").trim();
        if (!codLinha || codLinha !== codigoStr) continue;

        const codigoX = String(pegar(l, ["CODIGO_X", "COD_X", "COD X", "CÓDIGO_X", "CÓD X"], ["CODIGO", "X"]) || "").trim();
        if (String(codigoX).trim().toUpperCase() === "SEM REGISTRO") continue;
        const descricao = String(pegar(l, ["CODIGO X DESCRIÇÃO", "CODIGO_X_DESCRICAO", "DESCRICAO COD X", "DESCRIÇÃO COD X"], ["DESCR", "X"]) || "").trim();
        const tempoMin = toNumber(pegar(l, ["TEMPO_MINUTOS", "TEMPO (MIN)", "TEMPO MINUTOS"], ["TEMPO", "MIN"]));
        const obs = String(pegar(l, ["OBS_COD_X", "OBS COD X", "OBSERVACAO COD X", "OBSERVAÇÃO COD X"], ["OBS", "COD", "X"]) || "").trim();

        if (!codigoX && !descricao && !tempoMin && !obs) continue;

        saida.push({ codigoX, descricao, tempoMin, obs });
    }

    const agrupado = new Map();
    saida.forEach(item => {
        const key = [item.codigoX, item.descricao, item.obs].join("||");
        const atual = agrupado.get(key) || { ...item, tempoMin: 0 };
        atual.tempoMin += Number(item.tempoMin || 0);
        agrupado.set(key, atual);
    });

    const resultado = [...agrupado.values()].filter(x => x.codigoX || x.descricao || x.tempoMin || x.obs);
    cacheCodxEquipe.set(cacheKey, resultado);
    return resultado;
}

async function obterInterferenciasCodXEquipe(codigoEquipe) {
    if (!currentModalContext) return [];

    const codigoStr = String(codigoEquipe);
    const dataCtx = String(currentModalContext.data || "");
    const uoCtx = String(currentModalContext.uo || "");

    const cacheKey = ["codxEquipe", dataCtx, uoCtx, codigoStr].join("|");
    if (cacheCodxEquipe.has(cacheKey)) {
        return cacheCodxEquipe.get(cacheKey);
    }

    const local = obterInterferenciasCodXEquipeLocal(codigoEquipe);
    if (local && local.length) return local;

    const params = new URLSearchParams();
    if (dataCtx) params.set("data", dataCtx);
    if (uoCtx) params.set("uo", uoCtx);
    params.set("codEquipe", codigoStr);

    try {
        const resp = await fetch(`/api/codx?${params.toString()}`);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const payload = await resp.json();
        const rows = Array.isArray(payload?.rows) ? payload.rows : [];

        // Observação (campo OBS do banco do COD-X)
        if (!cacheCodxObsEquipe.has(cacheKey)) {
            const obsParts = [];
            const addPart = (value) => {
                const s = String(value ?? "").trim();
                if (!s) return;
                if (s.toUpperCase() === "SEM REGISTRO") return;
                obsParts.push(s);
            };

            rows.forEach(r => {
                addPart(r.OBS);
                addPart(r.OBS_LIDER);
                addPart(r.OBS_SUPERVISOR);
            });

            const obsFinal = [...new Set(obsParts)].join("\n");
            cacheCodxObsEquipe.set(cacheKey, obsFinal);
        }

        const pegar = (linha, candidatos, fragmentos) => {
            const v1 = candidatos?.length ? obterValorColuna(linha, candidatos) : "";
            if (String(v1 || "").trim()) return v1;
            return fragmentos?.length ? obterValorColunaPorFragmentos(linha, fragmentos) : "";
        };

        const saida = [];

        rows.forEach(l => {
            const codigoX = String(pegar(l, ["CODIGO_X", "COD_X", "COD X", "CÓDIGO_X", "CÓD X"], ["CODIGO", "X"]) || "").trim();
            if (String(codigoX).trim().toUpperCase() === "SEM REGISTRO") return;
            const descricao = String(pegar(l, ["CODIGO X DESCRIÇÃO", "CODIGO_X_DESCRICAO", "DESCRICAO COD X", "DESCRIÇÃO COD X"], ["DESCR", "X"]) || "").trim();
            const tempoMin = toNumber(pegar(l, ["TEMPO_MINUTOS", "TEMPO (MIN)", "TEMPO MINUTOS"], ["TEMPO", "MIN"]));
            const obs = String(pegar(l, ["OBS_COD_X", "OBS COD X", "OBSERVACAO COD X", "OBSERVAÇÃO COD X"], ["OBS", "COD", "X"]) || "").trim();

            if (!codigoX && !descricao && !tempoMin && !obs) return;
            saida.push({ codigoX, descricao, tempoMin, obs });
        });

        const agrupado = new Map();
        saida.forEach(item => {
            const key = [item.codigoX, item.descricao, item.obs].join("||");
            const atual = agrupado.get(key) || { ...item, tempoMin: 0 };
            atual.tempoMin += Number(item.tempoMin || 0);
            agrupado.set(key, atual);
        });

        const resultado = [...agrupado.values()].filter(x => x.codigoX || x.descricao || x.tempoMin || x.obs);
        cacheCodxEquipe.set(cacheKey, resultado);
        return resultado;
    } catch (_) {
        if (!cacheCodxObsEquipe.has(cacheKey)) cacheCodxObsEquipe.set(cacheKey, "");
        cacheCodxEquipe.set(cacheKey, []);
        return [];
    }
}

function abrirCaixaDetalheFaixaDia(codigoEquipe, event) {
    if (!currentModalContext?.listaAtual || !caixaDetalheFaixaDia) return;
    if (event?.stopPropagation) event.stopPropagation();

    const equipe = currentModalContext.listaAtual.find(item => String(item.codigo) === String(codigoEquipe));
    if (!equipe) return;

    const linhaBase = obterLinhaBaseEquipe(codigoEquipe);

    const lider =
        String(equipe.liderPosto || "").trim() ||
        (linhaBase
            ? (obterValorColunaPorFragmentos(linhaBase, ["LIDER", "POSTO"]) || obterValorColuna(linhaBase, ["LIDER DE POSTO", "Líder de Posto", "Lider de Posto"]) || "-")
            : "-");
    const controlador =
        String(equipe.controlador || "").trim() ||
        (linhaBase
            ? (obterValorColunaPorFragmentos(linhaBase, ["CONTROL"]) || obterValorColuna(linhaBase, ["CONTROLADOR", "Controlador"]) || "-")
            : "-");

    const uoLinha = linhaBase
        ? (obterValorColunaPorFragmentos(linhaBase, ["COD", "UO"]) || obterValorColuna(linhaBase, ["Cód.UO", "CÃ³d.UO", "CÃƒÂ³d.UO"]) || "")
        : "";

    const faixaDia = equipe.faixaDiaCompleta || equipe.faixaDia || "-";

    const observacao =
        String(equipe.observacao || "").trim() ||
        String(
            (linhaBase && (obterValorColunaPorFragmentos(linhaBase, ["OBSERV"]) || obterValorColuna(linhaBase, ["OBSERVACAO", "OBSERVAÇÃO", "Observação"]))) ||
            ""
        ).trim();

    if (caixaFaixaDiaTitulo) {
        caixaFaixaDiaTitulo.innerText = `${equipe.equipe || equipe.codigo} — COD.EQP: ${equipe.codigo}`;
    }
    if (caixaFaixaDiaLider) caixaFaixaDiaLider.innerText = String(lider || "-");
    if (caixaFaixaDiaControlador) caixaFaixaDiaControlador.innerText = String(controlador || "-");
    if (caixaFaixaDiaUo) caixaFaixaDiaUo.innerText = String(currentModalContext.uo || uoLinha || "-");
    if (caixaFaixaDiaFaixa) caixaFaixaDiaFaixa.innerText = String(faixaDia || "-");
    aplicarFaixaDiaKpiClasse(faixaDia);
    if (caixaFaixaDiaQtdCodx) caixaFaixaDiaQtdCodx.innerText = "...";
    if (caixaFaixaDiaTempoTotal) caixaFaixaDiaTempoTotal.innerText = "...";
    if (caixaFaixaDiaObservacao) caixaFaixaDiaObservacao.value = observacao;

    if (caixaFaixaDiaCodxBody) {
        caixaFaixaDiaCodxBody.innerHTML = `<tr><td colspan="4">Carregando interferências (COD-X)...</td></tr>`;
    }

    caixaDetalheFaixaDia.classList.remove("hidden");

    setTimeout(async () => {
        const interferencias = await obterInterferenciasCodXEquipe(codigoEquipe);
        const qtdCodx = interferencias.length;
        const tempoTotal = interferencias.reduce((acc, item) => acc + Number(item.tempoMin || 0), 0);

        if (caixaFaixaDiaQtdCodx) caixaFaixaDiaQtdCodx.innerText = String(qtdCodx);
        if (caixaFaixaDiaTempoTotal) caixaFaixaDiaTempoTotal.innerText = String(Math.round(tempoTotal));

        const cacheKeyObs = ["codxEquipe", String(currentModalContext?.data || ""), String(currentModalContext?.uo || ""), String(codigoEquipe)].join("|");
        const obsCodx = cacheCodxObsEquipe.get(cacheKeyObs) || "";
        const obsAtual = String(caixaFaixaDiaObservacao?.value || "").trim();
        if (caixaFaixaDiaObservacao && obsCodx && (!obsAtual || obsAtual === "-" || obsAtual.toUpperCase() === "SEM REGISTRO")) {
            caixaFaixaDiaObservacao.value = obsCodx;
        }

        if (!caixaFaixaDiaCodxBody) return;

        caixaFaixaDiaCodxBody.innerHTML = interferencias.length
            ? interferencias.map(item => `
                <tr>
                    <td>${escapeHtml(item.codigoX || "-")}</td>
                    <td style="white-space:normal; text-align:left;">${escapeHtml(item.descricao || "-")}</td>
                    <td>${Number(item.tempoMin || 0) ? Math.round(Number(item.tempoMin || 0)) : "-"}</td>
                    <td style="white-space:normal; text-align:left;">${escapeHtml(item.obs || "")}</td>
                </tr>
            `).join("")
            : `<tr><td colspan="4">Nenhuma interferência (COD-X) encontrada para esta equipe.</td></tr>`;
    }, 0);

    // caixa já exibida acima; o resto preenche assíncrono
}

function posicionarCaixaDetalheEquipe(event) {
    if (!caixaDetalheFaixa || !event) return;

    const margem = 12;
    const largura = Math.min(420, window.innerWidth - (margem * 2));
    const alturaEstimada = 320;

    let left = event.clientX + margem;
    let top = event.clientY + margem;

    if (left + largura > window.innerWidth - margem) {
        left = Math.max(margem, event.clientX - largura - margem);
    }

    if (top + alturaEstimada > window.innerHeight - margem) {
        top = Math.max(margem, window.innerHeight - alturaEstimada - margem);
    }

    caixaDetalheFaixa.style.left = `${left}px`;
    caixaDetalheFaixa.style.top = `${top}px`;
}

function abrirCaixaDetalheEquipe(codigoEquipe, event) {
    if (!currentModalContext?.listaAtual || !caixaDetalheFaixa) return;

    const equipe = currentModalContext.listaAtual.find(item => String(item.codigo) === String(codigoEquipe));
    if (!equipe) return;

    const prodDia = Number(equipe.prodDia || equipe.prod || 0);
    const metaDia = Number(equipe.metaDia || 0);
    const saldo = prodDia - metaDia;
    const statusClasse = obterClasseStatusJornada(equipe.statusJornada || "");
    const faixaDia = equipe.faixaDiaCompleta || equipe.faixaDia || "-";
    controlarCardsResumoFaixa("completo");
    if (caixaDetalheFaixaTitulo) {
        caixaDetalheFaixaTitulo.innerText = `${equipe.equipe || equipe.codigo} | ${equipe.codigo}`;
    }
    if (detalheFaixaProd) {
        detalheFaixaProd.innerText = fmt3(prodDia);
    }
    if (detalheFaixaMeta) detalheFaixaMeta.innerText = fmt3(metaDia);
    if (detalheFaixaMetaDia) detalheFaixaMetaDia.innerText = fmt3(saldo);
    if (detalheEquipeFaixaDia) detalheEquipeFaixaDia.innerText = faixaDia;
    aplicarFaixaDetalheClasse(faixaDia);
    if (detalheEquipeImprod) {
        detalheEquipeImprod.innerText =
            typeof equipe.percImprod === "number" ? `${equipe.percImprod.toFixed(2)}%` : "-";
    }
    if (detalheEquipeServicos) detalheEquipeServicos.innerText = String(equipe.servicos ?? "-");
    if (detalheEquipeProdutivos) detalheEquipeProdutivos.innerText = String(equipe.produtivo ?? "-");
    if (detalheEquipeImprodutivos) detalheEquipeImprodutivos.innerText = String(equipe.improdutivo ?? "-");
    if (detalheEquipeInicioJornada) detalheEquipeInicioJornada.innerText = horaExcelParaTexto(equipe.inicioJornada);
    if (detalheEquipeStatus) {
        detalheEquipeStatus.className = statusClasse || "";
        detalheEquipeStatus.innerText = equipe.statusJornada || "-";
    }

    posicionarCaixaDetalheEquipe(event);
    caixaDetalheFaixa.classList.remove("hidden");
}

function abrirCaixaDetalheFaixa(codigoEquipe, hora) {
    if (!currentModalContext?.listaAtual || !caixaDetalheFaixa) return;

    const equipe = currentModalContext.listaAtual.find(item => String(item.codigo) === String(codigoEquipe));
    const detalhe = obterDetalheFaixaPorHora(codigoEquipe, hora);
    if (!equipe || !detalhe) return;

    const faixaDia = equipe.faixaDiaCompleta || equipe.faixaDia || "-";
    controlarCardsResumoFaixa("somente-producao");
    if (caixaDetalheFaixaTitulo) {
        caixaDetalheFaixaTitulo.innerText = `${equipe.equipe || equipe.codigo} | ${hora}h`;
    }
    if (detalheFaixaProd) {
        detalheFaixaProd.innerText = fmt3(detalhe.prod || 0);
    }
    if (detalheEquipeFaixaDia) detalheEquipeFaixaDia.innerText = faixaDia;
    aplicarFaixaDetalheClasse(faixaDia);
    if (detalheEquipeImprod) {
        detalheEquipeImprod.innerText =
            typeof equipe.percImprod === "number" ? `${equipe.percImprod.toFixed(2)}%` : "-";
    }
    if (detalheEquipeServicos) detalheEquipeServicos.innerText = String(equipe.servicos ?? "-");
    if (detalheEquipeProdutivos) detalheEquipeProdutivos.innerText = String(equipe.produtivo ?? "-");
    if (detalheEquipeImprodutivos) detalheEquipeImprodutivos.innerText = String(equipe.improdutivo ?? "-");
    if (detalheEquipeInicioJornada) detalheEquipeInicioJornada.innerText = horaExcelParaTexto(equipe.inicioJornada);
    if (detalheEquipeStatus) {
        const statusClasse = obterClasseStatusJornada(equipe.statusJornada || "");
        detalheEquipeStatus.className = statusClasse || "";
        detalheEquipeStatus.innerText = equipe.statusJornada || "-";
    }

    caixaDetalheFaixa.classList.remove("hidden");
}

function obterDetalheFaixaPorHora(codigoEquipe, hora) {
    if (!currentModalContext) return null;

    let metaDia = 0;
    const producaoAcumuladaPorHora = {};
    const metaAcumuladaPorHora = {};

    dados.forEach(l => {
        if (normalizarDataExcel(obterValorColunaPorFragmentos(l, ["DATA"])) !== currentModalContext.data) return;

        const uoLinha = obterValorColunaPorFragmentos(l, ["COD", "UO"]);
        if (currentModalContext.uo && String(uoLinha) !== String(currentModalContext.uo)) return;

        const codigoLinha = String(obterValorColunaPorFragmentos(l, ["COD", "EQUIPE"]) || "").trim();
        if (codigoLinha !== String(codigoEquipe)) return;

        const horaLinha = normalizarHora(obterValorColunaPorFragmentos(l, ["HORA"]));
        const metaProg = ajustarMetaClusterMtami(toNumber(obterValorColunaPorFragmentos(l, ["META", "PROG"])), currentModalContext?.supervisor || "", obterValorColunaPorFragmentos(l, ["NOME"]));

        metaDia = Math.max(metaDia, metaProg);

        if (!FAIXAS.includes(horaLinha)) return;

        producaoAcumuladaPorHora[horaLinha] = (producaoAcumuladaPorHora[horaLinha] || 0) +
            toNumber(obterValorColunaPorFragmentos(l, ["PROD"]));
        metaAcumuladaPorHora[horaLinha] = Math.max(
            Number(metaAcumuladaPorHora[horaLinha] || 0),
            (metaProg / 9) * obterHorasAcumuladas(horaLinha)
        );
    });

    const indiceHora = FAIXAS.indexOf(String(hora));
    const horaAnterior = indiceHora > 0 ? FAIXAS[indiceHora - 1] : "";
    const producaoAtual = Number(producaoAcumuladaPorHora[hora] || 0);
    const producaoAnterior = horaAnterior ? Number(producaoAcumuladaPorHora[horaAnterior] || 0) : 0;
    const metaAtual = Number(metaAcumuladaPorHora[hora] || ((metaDia / 9) * obterHorasAcumuladas(hora)));
    const metaAnterior = horaAnterior ? Number(metaAcumuladaPorHora[horaAnterior] || 0) : 0;
    const producaoFaixa = producaoAtual - producaoAnterior;
    const metaFaixa = metaAtual - metaAnterior;

    return {
        prod: producaoFaixa,
        meta: metaFaixa,
        metaDia
    };
}

function montarLinhaResumoEquipePadrao() {
    return {
        codigo: "",
        frota: "-",
        equipe: "-",
        liderPosto: "-",
        controlador: "-",
        observacao: "",
        metaDia: 0,
        prodDia: 0,
        percProdDiaCompleto: 0,
        faixaDiaCompleta: "-",
        meta: 0,
        prod: 0,
        percProdDia: 0,
        faixaDia: "-",
        servicosDesignados: "-",
        servicos: "-",
        produtivo: "-",
        improdutivo: "-",
        percImprod: "-",
        inicioJornada: "-",
        primeiroAtend: "-",
        ultimoAtend: "-",
        jornadaProd: "-",
        statusJornada: "-",
        _temHoraClicada: false,
        faixas: {
            "09": "-",
            "11": "-",
            "13": "-",
            "15": "-",
            "17": "-"
        }
    };
}

function montarListaEquipesSupervisor(supervisor, horaClicada, data, uo, codigosPermitidos = null) {
    const codigosTurnoSelecionado = obterCodigosTurnoSelecionado(data, uo);
    const codigosKey = codigosPermitidos
        ? [...new Set([...codigosPermitidos].map(v => String(v)))].sort().join(",")
        : "*";

    const cacheKey = [
        "listaSupervisor",
        String(data || ""),
        String(uo || ""),
        String(campoGlobal || ""),
        String(supervisor || ""),
        String(horaClicada || ""),
        obterHorariosModalEquipes().join(","),
        codigosTurnoSelecionado ? [...codigosTurnoSelecionado].sort().join(",") : "sem-turno",
        codigosKey
    ].join("|");

    if (cacheListasModal.has(cacheKey)) {
        return cacheListasModal.get(cacheKey);
    }

    const horariosDia = obterHorariosModalEquipes();
    const indexFinal = horariosDia.indexOf(horaClicada);
    const horariosVisiveis = indexFinal >= 0 ? horariosDia.slice(0, indexFinal + 1) : horariosDia;
    const setPermitidos = codigosPermitidos
        ? new Set([...codigosPermitidos].map(v => String(v)))
        : null;

    const mapa = {};

    const linhasContexto = obterLinhasContextoModal(data, uo);

    linhasContexto.forEach(l => {
        if (supervisor && (l[campoGlobal] || "N/I") !== supervisor) return;

        const hora = obterHoraLinhaModalEquipes(l);

        const cod = obterCodigoEquipeLinha(l);
        if (!cod) return;
        if (!linhaPassaFiltroTurnoSelecionado(cod, codigosTurnoSelecionado)) return;
        if (setPermitidos && !setPermitidos.has(cod)) return;

        if (!mapa[cod]) {
            mapa[cod] = montarLinhaResumoEquipePadrao();
            mapa[cod].codigo = cod;
            mapa[cod].frota = obterFrotaLinha(l);
            mapa[cod].equipe = l["Nome"] || "-";
        }

        mapa[cod].faixas[hora] = String(l["Classificação"] || "-").toUpperCase() || "-";
        mapa[cod].metaDia = Math.max(
            Number(mapa[cod].metaDia || 0),
            ajustarMetaClusterMtami(toNumber(l["Meta Prog."]), supervisor || "", l["Nome"], l[campoGlobal])
        );
        // "Faixa Dia" deve considerar a produção acumulada ATÉ a hora clicada.
        if (horariosVisiveis.includes(hora)) {
            mapa[cod].prodDia = Math.max(
                Number(mapa[cod].prodDia || 0),
                obterProducaoLinha(l)
            );
        } else {
            return;
        }

        if (hora === horaClicada) {
            mapa[cod]._temHoraClicada = true;
            mapa[cod].meta = Math.max(
                Number(mapa[cod].meta || 0),
                (ajustarMetaClusterMtami(toNumber(l["Meta Prog."]), supervisor || "", l["Nome"], l[campoGlobal]) / 9) * obterHorasAcumuladas(horaClicada)
            );
            mapa[cod].prod = Math.max(
                Number(mapa[cod].prod || 0),
                obterProducaoLinha(l)
            );

            const designados = toNumber(
                obterValorColuna(l, [
                    "Designados",
                    "SERVICOS DESIGNADOS",
                    "Servicos Designados",
                    "Qtd Designados"
                ]) ||
                obterValorColunaPorFragmentos(l, ["DESIGNADOS"]) ||
                0
            );
            const executados = toNumber(l["Executados"]);
            const produtivos = toNumber(l["Produtivos"]);
            const improdutivos = Math.max(executados - produtivos, 0);

            mapa[cod].servicosDesignados = Math.max(toNumber(mapa[cod].servicosDesignados), toNumber(designados));
            mapa[cod].servicos = Math.max(toNumber(mapa[cod].servicos), toNumber(executados));
            mapa[cod].produtivo = Math.max(toNumber(mapa[cod].produtivo), toNumber(produtivos));
            mapa[cod].improdutivo = Math.max(toNumber(mapa[cod].improdutivo), toNumber(improdutivos));

            mapa[cod].percImprod = toNumber(mapa[cod].servicos) > 0
                ? (toNumber(mapa[cod].improdutivo) / toNumber(mapa[cod].servicos)) * 100
                : "-";

            mapa[cod].primeiroAtend = l["1º Atendimento"] || "-";
            mapa[cod].ultimoAtend = l["Ult. Atendimento"] || "-";
            mapa[cod].inicioJornada =
                obterValorColuna(l, ["INICIO_JORNADA", "Inicio Jornada", "Início Jornada"]) ||
                obterValorColunaPorFragmentos(l, ["inicio", "jornada"]) ||
                "-";
            mapa[cod].jornadaProd = l["Jornada Produtiva"] || "-";
            mapa[cod].statusJornada = calcularStatusJornada(mapa[cod].primeiroAtend, mapa[cod].jornadaProd);

            mapa[cod].liderPosto =
                obterValorColuna(l, ["LIDER DE POSTO", "Líder de Posto", "Lider de Posto"]) ||
                obterValorColunaPorFragmentos(l, ["lider", "posto"]) ||
                mapa[cod].liderPosto ||
                "-";

            mapa[cod].controlador =
                obterValorColuna(l, ["CONTROLADOR", "Controlador"]) ||
                obterValorColunaPorFragmentos(l, ["control"]) ||
                mapa[cod].controlador ||
                "-";

            mapa[cod].observacao = String(
                obterValorColuna(l, ["OBSERVACAO", "OBSERVAÇÃO", "Observação", "OBS"]) ||
                obterValorColunaPorFragmentos(l, ["observ"]) ||
                mapa[cod].observacao ||
                ""
            );
        }
    });

    const lista = Object.values(mapa)
        .filter(e => !horaClicada || e._temHoraClicada)
        .map(e => ({
            ...e,
            percProdDiaCompleto: e.metaDia > 0 ? (e.prodDia / e.metaDia) * 100 : 0,
            faixaDiaCompleta: classificar(e.metaDia > 0 ? (e.prodDia / e.metaDia) * 100 : 0),
            percProdDia: e.meta > 0 ? (e.prod / e.meta) * 100 : 0,
            faixaDia: classificar(e.meta > 0 ? (e.prod / e.meta) * 100 : 0)
        }))
        .sort((a, b) => String(a.equipe).localeCompare(String(b.equipe), "pt-BR"));

    cacheListasModal.set(cacheKey, lista);
    return lista;
}

function montarListaEquipesPorFiltro(nomeLinha, faixaClicada, horaClicada, data, uo) {
    const lista = montarListaEquipesSupervisor(nomeLinha || null, horaClicada, data, uo, null);

    if (!faixaClicada) return lista;

    return lista.filter(e => String(e.faixaDiaCompleta || "-").toUpperCase() === String(faixaClicada).toUpperCase());
}

function renderBotaoAcordoLinha(equipe, podeMarcar, ctx) {
    if (!podeMarcar) return "";

    const marcado = estaEquipeMarcadaNoContexto(equipe.codigo, ctx);

    return `
        <td>
            <button
                type="button"
                class="btn-acordo-linha ${marcado ? "ativo" : ""}"
                data-codigo="${equipe.codigo}"
                onclick="toggleAcordoEquipe('${escapeJsString(equipe.codigo)}')"
                title="${marcado ? "Remover acordo" : "Marcar acordo"}">
                ➜
            </button>
        </td>
    `;
}

function modalUsaJustificativa() {
    return String(currentModalContext?.horaClicada || "") === "13";
}

function obterJustificativaEquipeNoContexto(codigo, ctx) {
    const mapa = obterMapaJustificativasContexto(ctx);
    return String(mapa[String(codigo)]?.justificativa || "");
}

function renderCelulaJustificativa(equipe, ctx) {
    const acordada = estaEquipeMarcadaNoContexto(equipe.codigo, ctx);
    const justificativa = obterJustificativaEquipeNoContexto(equipe.codigo, ctx);
    const tooltip = justificativa ? ` title="${escapeHtml(justificativa)}"` : "";


    if (acordada) {
        return `
        <td class="col-justificativa"${tooltip}>
            <span class="justificativa-acordo"${tooltip}>🤝 Acordo</span>
        </td>
    `;
    }

    const classe = justificativa ? "btn-justificativa justificativa-salva" : "btn-justificativa";
    const rotuloDefault = justificativa ? "Ver" : "Justificar";

    return `
        <td class="col-justificativa"${tooltip}>
            <button
                type="button"
                class="${classe}"
                onclick="abrirPromptJustificativa('${escapeJsString(equipe.codigo)}', event)"
                ${tooltip}>
                <span class="label-default">${rotuloDefault}</span>
            </button>
        </td>
    `;
}

function renderCabecalhoModalCompleto(
    mostrarFaixaDia = false,
    mostrarColunaAcordo = false,
    horasVisiveis = FAIXAS,
    mostrarJustificativa = false,
    mostrarPrevisao13 = false
) {
    const tr = document.querySelector("#modalEquipes thead tr");
    if (!tr) return;

    tr.innerHTML = `
    ${mostrarColunaAcordo ? `<th class="col-acordo">Acordo</th>` : ""}
        <th>Cód. Eq.</th>
        <th>Frota</th>
        <th class="col-equipe">Equipes</th>
        <th>Meta</th>
        <th>Prod.</th>
        ${mostrarFaixaDia ? "<th>Faixa Dia</th>" : ""}
        <th>% PROD.DIA</th>
        ${mostrarPrevisao13 ? `
            <th>Previsão<br>Prod.</th>
            <th>Previsão<br>% Meta</th>
            <th>Previsão<br>Faixa Dia -</th>
        ` : ""}
        ${horasVisiveis.map(hora => `<th>${hora}h</th>`).join("")}
        <th>Serv.</th>
        <th>Prod.</th>
        <th>Improd.</th>
        <th>% IMPROD.</th>
        <th>1º<br>ATEND.</th>
        <th>ULT.<br>ATEND.</th>
        <th>JORNADA<br>PROD.</th>
        <th>${mostrarJustificativa ? "JUSTIFICATIVA" : "STATUS<br>JORNADA"}</th>
    `;
}

/* ================= CARREGAR EXCEL ================= */

async function carregarExcel() {
    if (dataSelect && !dataSelect.value) dataSelect.value = obterHojeISO();
    if (mesSelect && !mesSelect.value) mesSelect.value = obterAnoMesAtual();

    // Preferir MySQL (via backend) e manter fallback para o XLSM local
    try {
        const qs = new URLSearchParams();
        qs.set("compact", "1");
        if (dataSelect?.value) qs.set("data", dataSelect.value);

        let apiResp = await fetch(`/api/report?${qs.toString()}`);
        let payload = apiResp.ok ? await apiResp.json() : null;

        if ((!payload || !Array.isArray(payload.rows) || !payload.rows.length) && qs.has("data")) {
            apiResp = await fetch("/api/report?compact=1");
            payload = apiResp.ok ? await apiResp.json() : null;
        }

        if (apiResp.ok) {
            if (payload && Array.isArray(payload.rows) && payload.rows.length) {
                dados = normalizarColecaoPainel(payload.rows);
                chaveDadosCarregados = qs.toString();
                const primeiraData = normalizarDataExcel(dados[0]?.["Data"]);
                if (primeiraData && !dados.some(l => normalizarDataExcel(l["Data"]) === dataSelect.value)) {
                    dataSelect.value = primeiraData;
                }
            }
        }
    } catch (_) {
        // ignora e cai no fallback
    }

    if (!Array.isArray(dados) || !dados.length) {
        const arquivoXlsm = "Report Horário das equipes Pedro.xlsm";
        const arquivoXlsmFallback = "Report HorÃ¡rio das equipes Pedro.xlsm";

        await garantirXlsx();

        let resp = await fetch(arquivoXlsm);
        if (!resp.ok) resp = await fetch(arquivoXlsmFallback);
        if (!resp.ok) {
            throw new Error("Nao foi possivel carregar os dados pela API nem localizar o arquivo XLSM de fallback.");
        }

        const wb = XLSX.read(await resp.arrayBuffer(), { type: "array" });

        const sheet =
            wb.Sheets["Controle serviços"] ||
            wb.Sheets["Controle serviÃ§os"] ||
            wb.Sheets["Controle servicos"];

        if (!sheet) {
            throw new Error("A planilha de fallback nao contem a aba 'Controle servicos'.");
        }

        dados = normalizarColecaoPainel(XLSX.utils.sheet_to_json(sheet, { defval: "" }));
    }

    const uos = [...new Set(
        dados
            .map(d => d["Cód.UO"] || d["CÃ³d.UO"] || d["CÃƒÂ³d.UO"] || d.COD_UO)
            .filter(Boolean)
    )].sort();
    uoSelect.innerHTML =
        "<option value=\"\">Todas</option>" +
        uos.map(u => `<option value="${u}">${u}</option>`).join("");

    popularSemanasDisponiveis();
    dadosBase = Array.isArray(dados) ? dados.slice() : [];
    limparCachesModal();
    aplicar();
    carregarStatusDados();
}

async function garantirDadosTotalHoras() {
    const seq = ++reqSeqDadosTotalHoras;
    carregandoDadosTotalHoras = true;

    try {
        const ok = await carregarDadosPainelAtual({ forcar: true, forcarTotalHoras: true });
        if (seq !== reqSeqDadosTotalHoras) return;
        return ok;
    } catch {
        // ignora
    } finally {
        if (seq === reqSeqDadosTotalHoras) {
            carregandoDadosTotalHoras = false;
        }
    }
}

function restaurarDadosBase() {
    if (Array.isArray(dadosBase) && dadosBase.length) {
        dados = dadosBase;
    }
}

/* ================= APLICAR ================= */

async function aplicar() {
    limparCachesModal();
    const tipo = tipoSelect.value;
    campoGlobal = obterCampoPorTipo(tipo);

    if (modoTabela === "diario") {
        aplicarDiario();
        return;
    }

    if (modoTabela === "geral") {
        await aplicarTabelaGeral();
        return;
    }

    if (modoTabela === "total-horas") {
        aplicarDiario();
        return;
    }

    if (modoTabela === "semanal") {
        aplicarSemanal();
        return;
    }

    if (modoTabela === "mensal") {
        aplicarMensal();
        return;
    }

    if (modoTabela === "quinzena1") {
        aplicarQuinzenaEspecifica(1);
        return;
    }

    if (modoTabela === "quinzena2") {
        aplicarQuinzenaEspecifica(2);
    }
}

/* ================= MODO DIÁRIO ================= */

function aplicarDiario() {
    const uo = uoSelect.value;
    const data = dataSelect.value;
    const tipo = tipoSelect.value;
    const campo = obterCampoPorTipo(tipo);
    const turnoEspecial = turnoTardeAtivo() || turnoMadrugadaAtivo();
    const tabelaTotal = String(horaSelect?.value || "").trim().toUpperCase() === "TOTAL";

    if (!data) {
        limparTelaSemDados(tipo, "Selecione uma data");
        return;
    }

    const modoTotalHoras = modoTabela === "total-horas";
    const horasFonte = modoTotalHoras ? HORAS_TOTAIS : FAIXAS;
    calcularFaixas(campo, uo, data, horasFonte);
    const codigosTurnoSelecionado = obterCodigosTurnoSelecionado(data, uo);

    const horaFiltroRaw = String(horaSelect?.value || "").trim();
    const horaSelecionada = normalizarHora(horaFiltroRaw);
    const faixaAtual = horaSelecionada || ultimaFaixaDisponivel(uo, data);
    if (!faixaAtual) {
        limparTelaSemDados(tipo, "Nenhum dado para a data selecionada");
        return;
    }

    const horasVisiveis = turnoEspecial
        ? (tabelaTotal
            ? horasFonte
            : horasFonte.slice(0, Math.max(horasFonte.indexOf(faixaAtual), 0) + 1))
        : (tabelaTotal
            ? horasFonte
            : obterHorasVisiveisTabela(faixaAtual, modoTabela));
    montarCabecalho(tipo, false, horasVisiveis);

    const mapa = {};
    const eqTot = { AA: 0, A: 0, B: 0, C: 0, D: 0 };
    let totalMeta = 0;
    let totalProd = 0;

    dados.forEach(l => {
        if (normalizarDataExcel(l["Data"]) !== data) return;
        if (uo && String(l["Cód.UO"]) !== String(uo)) return;
        const horaLinha = obterHoraLinha(l);
        if (turnoEspecial) {
            if (!horasVisiveis.includes(horaLinha)) return;
        } else if (horaLinha !== faixaAtual) {
            return;
        }

        const nome = l[campo] || "N/I";
        const codEquipe = obterCodigoEquipeLinha(l);
        if (!codEquipe) return;
        if (!linhaPassaFiltroTurnoSelecionado(codEquipe, codigosTurnoSelecionado)) return;

        if (!mapa[nome]) {
            mapa[nome] = { teams: {} };
        }

        const metaProg = ajustarMetaClusterMtami(toNumber(l["Meta Prog."]), nome, l["Nome"], l[campo], l[campoGlobal]);
        const prodDia = obterProducaoLinha(l);

        const atual = mapa[nome].teams[codEquipe] || { metaProg: 0, prodDia: 0 };
        atual.metaProg = Math.max(Number(atual.metaProg || 0), Number(metaProg || 0));
        atual.prodDia = Math.max(Number(atual.prodDia || 0), Number(prodDia || 0));
        mapa[nome].teams[codEquipe] = atual;
    });

    // Consolidar por equipe (evita contar duplicado por linha)
    Object.values(mapa).forEach(v => {
        v.metaDia = 0;
        v.prodDia = 0;
        v.meta = 0;
        v.prod = 0;
        v.eq = { AA: 0, A: 0, B: 0, C: 0, D: 0 };

        Object.values(v.teams || {}).forEach(t => {
            const metaProg = toNumber(t?.metaProg);
            const prodDia = toNumber(t?.prodDia);
            const metaAcum = (metaProg / 9) * obterHorasAcumuladas(faixaAtual);

            v.metaDia += metaProg;
            v.prodDia += prodDia;
            v.meta += metaAcum;
            v.prod += prodDia;

            const faixaDiaEquipe = classificar(metaProg > 0 ? (prodDia / metaProg) * 100 : 0);
            if (v.eq[faixaDiaEquipe] !== undefined) {
                v.eq[faixaDiaEquipe]++;
            }
        });

        eqTot.AA += v.eq.AA;
        eqTot.A += v.eq.A;
        eqTot.B += v.eq.B;
        eqTot.C += v.eq.C;
        eqTot.D += v.eq.D;
    });

    const linhasHtml = [];

    Object.entries(mapa).forEach(([nome, v]) => {
        totalMeta += v.meta;
        totalProd += v.prod;

        const totalEqLinha = v.eq.AA + v.eq.A + v.eq.B + v.eq.C + v.eq.D;
        const nomeEsc = escapeJsString(nome);
        const nomeExib = rotuloGrupoExibicao(nome);

        linhasHtml.push(`
        <tr>
            <td>${escapeHtml(nomeExib)}</td>
            <td>${fmt3(v.meta)}</td>
            <td>${fmt3(v.prod)}</td>

            ${horasVisiveis.map(f => {
                const fx = cacheFaixas[f]?.[nome]?.faixa || "-";
                return `
<td class="faixa-${fx} faixa-click"
    onclick="abrirModalFaixa('${nomeEsc}', '${f}')">
    ${fx}
</td>`;
            }).join("")}

            <td class="link"
                onclick="abrirModalEquipes('${nomeEsc}', null, '${faixaAtual}')">
                ${totalEqLinha}
            </td>

            <td class="link"
                onclick="abrirModalEquipes('${nomeEsc}', 'AA', '${faixaAtual}')">
                ${v.eq.AA}
            </td>

            <td class="link"
                onclick="abrirModalEquipes('${nomeEsc}', 'A', '${faixaAtual}')">
                ${v.eq.A}
            </td>

            <td class="link"
                onclick="abrirModalEquipes('${nomeEsc}', 'B', '${faixaAtual}')">
                ${v.eq.B}
            </td>

            <td class="link"
                onclick="abrirModalEquipes('${nomeEsc}', 'C', '${faixaAtual}')">
                ${v.eq.C}
            </td>

            <td class="link"
                onclick="abrirModalEquipes('${nomeEsc}', 'D', '${faixaAtual}')">
                ${v.eq.D}
            </td>
        </tr>`);
    });

    const totalEqGeral = eqTot.AA + eqTot.A + eqTot.B + eqTot.C + eqTot.D;
    const totalMetaDia = Object.values(mapa).reduce((acc, v) => acc + Number(v.metaDia || 0), 0);
    const totalProdDia = Object.values(mapa).reduce((acc, v) => acc + Number(v.prodDia || 0), 0);
    const faixaDiaTotal = classificar(totalMetaDia > 0 ? (totalProdDia / totalMetaDia) * 100 : 0);

    linhasHtml.push(`
    <tr class="resultado">
        <td>TOTAL GERAL</td>
        <td>${fmt3(totalMeta)}</td>
        <td>${fmt3(totalProd)}</td>

        ${horasVisiveis.map(f => {
            let m = 0, p = 0;
            Object.values(cacheFaixas[f] || {}).forEach(x => {
                m += x.meta;
                p += x.prod;
            });
            if (!m && !p) return `<td>-</td>`;
            const fx = classificar(m ? (p / m) * 100 : 0);
            return `<td class="faixa-${fx}">${fx}</td>`;
        }).join("")}

        <td class="link"
            onclick="abrirModalEquipes(null, null, '${faixaAtual}')">
            ${totalEqGeral}
        </td>

        <td class="link"
            onclick="abrirModalEquipes(null, 'AA', '${faixaAtual}')">${eqTot.AA}</td>

        <td class="link"
            onclick="abrirModalEquipes(null, 'A', '${faixaAtual}')">${eqTot.A}</td>

        <td class="link"
            onclick="abrirModalEquipes(null, 'B', '${faixaAtual}')">${eqTot.B}</td>

        <td class="link"
            onclick="abrirModalEquipes(null, 'C', '${faixaAtual}')">${eqTot.C}</td>

        <td class="link"
            onclick="abrirModalEquipes(null, 'D', '${faixaAtual}')">${eqTot.D}</td>
    </tr>`);

    tbody.innerHTML = linhasHtml.join("");

    atualizarKpis(totalMeta, totalProd, eqTot, 0);

    filtrosAtivos = {};
    adicionarFiltrosExcel();
}

async function aplicarTabelaGeral() {
    const uo = uoSelect.value;
    const data = dataSelect.value;
    const tipo = tipoSelect.value;
    const campo = obterCampoPorTipo(tipo);

    if (!data) {
        limparTelaSemDados(tipo, "Selecione uma data");
        return;
    }

    calcularFaixas(campo, uo, data, FAIXAS);
    const codigosTurnoSelecionado = obterCodigosTurnoSelecionado(data, uo);

    const horaFiltroRaw = String(horaSelect?.value || "").trim();
    const horaSelecionada = normalizarHora(horaFiltroRaw);
    const faixaAtual = horaSelecionada || ultimaFaixaDisponivel(uo, data);
    if (!faixaAtual) {
        limparTelaSemDados(tipo, "Nenhum dado para a data selecionada");
        return;
    }

    montarCabecalhoGeral(tipo);

    let mapaServicosDesignados = {};
    try {
        mapaServicosDesignados = await carregarResumoControleServicoDesignados(data, uo);
    } catch (_) {
        mapaServicosDesignados = {};
    }

    const mapa = {};
    const mapaPrevisao = {};
    const eqTot = { AA: 0, A: 0, B: 0, C: 0, D: 0 };
    let totalMeta = 0;
    let totalProd = 0;
    let totalPrevisaoProd = 0;
    const faixaPrevisao = obterFaixaBasePrevisaoTabelaGeral(faixaAtual);

    dados.forEach(l => {
        if (normalizarDataExcel(l["Data"]) !== data) return;
        if (uo && String(obterValorColuna(l, ["Cód.UO", "CÃ³d.UO", "CÃƒÂ³d.UO", "COD_UO", "UO"]) || "") !== String(uo)) return;
        const horaLinha = obterHoraLinha(l);
        if (horaLinha !== faixaAtual && horaLinha !== faixaPrevisao) return;

        const nome = l[campo] || "N/I";
        const codEquipe = obterCodigoEquipeLinha(l);
        if (!codEquipe) return;
        if (!linhaPassaFiltroTurnoSelecionado(codEquipe, codigosTurnoSelecionado)) return;

        if (horaLinha === faixaPrevisao) {
            if (!mapaPrevisao[nome]) mapaPrevisao[nome] = { teams: {} };
            const previsaoAtual = mapaPrevisao[nome].teams[codEquipe] || { prodDia: 0 };
            previsaoAtual.prodDia = Math.max(Number(previsaoAtual.prodDia || 0), Number(obterProducaoLinha(l) || 0));
            mapaPrevisao[nome].teams[codEquipe] = previsaoAtual;
        }

        if (horaLinha !== faixaAtual) return;

        if (!mapa[nome]) {
            mapa[nome] = { teams: {} };
        }

        const metaProg = ajustarMetaClusterMtami(toNumber(l["Meta Prog."]), nome, l["Nome"], l[campo], l[campoGlobal]);
        const prodDia = obterProducaoLinha(l);
        const atual = mapa[nome].teams[codEquipe] || { metaProg: 0, prodDia: 0 };
        atual.metaProg = Math.max(Number(atual.metaProg || 0), Number(metaProg || 0));
        atual.prodDia = Math.max(Number(atual.prodDia || 0), Number(prodDia || 0));
        mapa[nome].teams[codEquipe] = atual;
    });

    const linhasTabela = Object.entries(mapa).map(([nome, v]) => {
        v.metaDia = 0;
        v.prodDia = 0;
        v.meta = 0;
        v.prod = 0;
        v.eq = { AA: 0, A: 0, B: 0, C: 0, D: 0 };

        Object.values(v.teams || {}).forEach(t => {
            const metaProg = toNumber(t?.metaProg);
            const prodDia = toNumber(t?.prodDia);
            const metaAcum = (metaProg / 9) * obterHorasAcumuladas(faixaAtual);

            v.metaDia += metaProg;
            v.prodDia += prodDia;
            v.meta += metaAcum;
            v.prod += prodDia;

            const faixaDiaEquipe = classificar(metaProg > 0 ? (prodDia / metaProg) * 100 : 0);
            if (v.eq[faixaDiaEquipe] !== undefined) {
                v.eq[faixaDiaEquipe]++;
            }
        });

        eqTot.AA += v.eq.AA;
        eqTot.A += v.eq.A;
        eqTot.B += v.eq.B;
        eqTot.C += v.eq.C;
        eqTot.D += v.eq.D;

        const listaEquipes = montarListaEquipesSupervisor(nome, faixaAtual, data, uo);
        listaEquipes.forEach((item) => {
            const codigo = String(item.codigo || "").trim();
            if (!codigo) return;
            item.servicosDesignados = Number(mapaServicosDesignados[codigo] || 0);
        });
        const totalEqLinha = listaEquipes.length;
        const mediaServicosDesignados = mediaNumerica(listaEquipes.map(item => toNumber(item.servicosDesignados)));
        const mediaServicos = mediaNumerica(listaEquipes.map(item => toNumber(item.servicos)));
        const mediaProdutivos = mediaNumerica(listaEquipes.map(item => toNumber(item.produtivo)));
        const mediaImprodutivos = mediaNumerica(
            listaEquipes
                .map(item => (typeof item.percImprod === "number" ? Number(item.percImprod) : null))
                .filter(v => Number.isFinite(v))
        );
        const totalServicosDesignados = listaEquipes.reduce(
            (acc, item) => acc + toNumber(item.servicosDesignados),
            0
        );
        const totalServicosExecutados = listaEquipes.reduce(
            (acc, item) => acc + toNumber(item.servicos),
            0
        );
        const totalServicosProdutivos = listaEquipes.reduce(
            (acc, item) => acc + toNumber(item.produtivo),
            0
        );
        const totalServicosImprodutivos = listaEquipes.reduce(
            (acc, item) => acc + toNumber(item.improdutivo),
            0
        );
        const mediaInicioJornadaMin = mediaNumerica(
            listaEquipes
                .map(item => horaTextoParaMinutos(item.inicioJornada))
                .filter(v => Number.isFinite(v))
        );
        const mediaPrimeiroAtendMin = mediaNumerica(
            listaEquipes
                .map(item => horaTextoParaMinutos(item.primeiroAtend))
                .filter(v => Number.isFinite(v))
        );
        const mediaUltimoAtendMin = mediaNumerica(
            listaEquipes
                .map(item => horaTextoParaMinutos(item.ultimoAtend))
                .filter(v => Number.isFinite(v))
        );
        const mediaJornadaMin = mediaNumerica(
            listaEquipes
                .map(item => horaTextoParaMinutos(item.jornadaProd))
                .filter(v => Number.isFinite(v))
        );
        const prodBasePrevisao = Object.values(mapaPrevisao[nome]?.teams || {}).reduce(
            (acc, item) => acc + Number(item?.prodDia || 0),
            0
        );
        const previsaoProd = calcularPrevisaoTabelaGeral(prodBasePrevisao, faixaPrevisao);
        const previsaoPercMeta = Number(v.metaDia || 0) > 0
            ? (previsaoProd / Number(v.metaDia || 0)) * 100
            : 0;

        return {
            nome,
            nomeExib: rotuloGrupoExibicao(nome),
            totalEqLinha,
            metaDia: Number(v.metaDia || 0),
            prodDia: Number(v.prodDia || 0),
            percProdDia: Number(v.metaDia || 0) > 0 ? (Number(v.prodDia || 0) / Number(v.metaDia || 0)) * 100 : 0,
            faixaDia: classificar(v.metaDia > 0 ? (v.prodDia / v.metaDia) * 100 : 0),
            previsaoProd,
            previsaoPercMeta,
            totalServicosDesignados,
            totalServicosExecutados,
            totalServicosProdutivos,
            totalServicosImprodutivos,
            mediaServicosDesignados,
            mediaServicos,
            mediaProdutivos,
            mediaImprodutivos,
            mediaInicioJornadaMin,
            mediaPrimeiroAtendMin,
            mediaUltimoAtendMin,
            mediaJornadaMin
        };
    }).sort((a, b) => {
        if (b.prodDia !== a.prodDia) return b.prodDia - a.prodDia;
        if (b.metaDia !== a.metaDia) return b.metaDia - a.metaDia;
        return String(a.nomeExib || "").localeCompare(String(b.nomeExib || ""), "pt-BR");
    });

    const linhasHtml = [];

    currentTabelaGeralResumo = {
        porSupervisor: {},
        total: null
    };

    linhasTabela.forEach(item => {
        totalMeta += item.metaDia;
        totalProd += item.prodDia;
        totalPrevisaoProd += item.previsaoProd;
        const nomeEsc = escapeJsString(item.nome);
        currentTabelaGeralResumo.porSupervisor[item.nome] = {
            nome: item.nome,
            metaDia: item.metaDia,
            prodDia: item.prodDia,
            totalEq: item.totalEqLinha,
            totalServicosDesignados: item.totalServicosDesignados,
            totalServicosExecutados: item.totalServicosExecutados,
            totalServicosProdutivos: item.totalServicosProdutivos,
            totalServicosImprodutivos: item.totalServicosImprodutivos
        };

        linhasHtml.push(`
        <tr data-supervisor-geral="${escapeHtml(item.nome)}">
            <td class="link" onclick="alternarKpisSupervisorTabelaGeral('${nomeEsc}')">${escapeHtml(item.nomeExib)}</td>
            <td>${fmt3(item.metaDia)}</td>
            <td>${fmt3(item.prodDia)}</td>
            <td class="faixa-${item.faixaDia}">${item.faixaDia}</td>
            <td>${item.metaDia > 0 ? `${item.percProdDia.toFixed(2)}%` : "-"}</td>
            <td>${fmt3(item.previsaoProd)}</td>
            <td>${item.metaDia > 0 ? `${item.previsaoPercMeta.toFixed(2)}%` : "-"}</td>
            <td class="faixa-${item.metaDia > 0 ? classificar(item.previsaoPercMeta) : "-"}">${item.metaDia > 0 ? classificar(item.previsaoPercMeta) : "-"}</td>

            <td class="link"
                onclick="abrirModalEquipes('${nomeEsc}', null, '${faixaAtual}')">
                ${item.totalEqLinha}
            </td>
            <td>${fmt2(item.mediaServicosDesignados)}</td>
            <td>${fmt2(item.mediaServicos)}</td>
            <td>${fmt2(item.mediaProdutivos)}</td>
            <td class="${item.mediaImprodutivos > 20 ? "improd-alta" : ""}">${fmt2(item.mediaImprodutivos)}%</td>
            <td>${minutosParaHoraTexto(item.mediaInicioJornadaMin)}</td>
            <td>${minutosParaHoraTexto(item.mediaPrimeiroAtendMin)}</td>
            <td>${minutosParaHoraTexto(item.mediaUltimoAtendMin)}</td>
            <td>${minutosParaHoraTexto(item.mediaJornadaMin)}</td>
        </tr>`);
    });

    const listaTotalEquipes = montarListaEquipesSupervisor("", faixaAtual, data, uo);
    listaTotalEquipes.forEach((item) => {
        const codigo = String(item.codigo || "").trim();
        if (!codigo) return;
        item.servicosDesignados = Number(mapaServicosDesignados[codigo] || 0);
    });
    const totalEqGeral = listaTotalEquipes.length;
    const totalServicosDesignadosGeral = listaTotalEquipes.reduce(
        (acc, item) => acc + toNumber(item.servicosDesignados),
        0
    );
    const totalServicosProdutivosGeral = listaTotalEquipes.reduce(
        (acc, item) => acc + toNumber(item.produtivo),
        0
    );
    const totalServicosImprodutivosGeral = listaTotalEquipes.reduce(
        (acc, item) => acc + toNumber(item.improdutivo),
        0
    );
    const totalServicosExecutadosGeral = listaTotalEquipes.reduce(
        (acc, item) => acc + toNumber(item.servicos),
        0
    );
    const mediaServicosDesignadosGeral = mediaNumerica(listaTotalEquipes.map(item => toNumber(item.servicosDesignados)));
    const mediaServicosGeral = mediaNumerica(listaTotalEquipes.map(item => toNumber(item.servicos)));
    const mediaProdutivosGeral = mediaNumerica(listaTotalEquipes.map(item => toNumber(item.produtivo)));
    const mediaImprodutivosGeral = mediaNumerica(
        listaTotalEquipes
            .map(item => (typeof item.percImprod === "number" ? Number(item.percImprod) : null))
            .filter(v => Number.isFinite(v))
    );
    const mediaInicioJornadaGeral = mediaNumerica(
        listaTotalEquipes
            .map(item => horaTextoParaMinutos(item.inicioJornada))
            .filter(v => Number.isFinite(v))
    );
    const mediaPrimeiroAtendGeral = mediaNumerica(
        listaTotalEquipes
            .map(item => horaTextoParaMinutos(item.primeiroAtend))
            .filter(v => Number.isFinite(v))
    );
    const mediaUltimoAtendGeral = mediaNumerica(
        listaTotalEquipes
            .map(item => horaTextoParaMinutos(item.ultimoAtend))
            .filter(v => Number.isFinite(v))
    );
    const mediaJornadaGeral = mediaNumerica(
        listaTotalEquipes
            .map(item => horaTextoParaMinutos(item.jornadaProd))
            .filter(v => Number.isFinite(v))
    );

    currentTabelaGeralResumo.total = {
        metaDia: totalMeta,
        prodDia: totalProd,
        totalEq: totalEqGeral,
        totalServicosDesignados: totalServicosDesignadosGeral,
        totalServicosExecutados: totalServicosExecutadosGeral,
        totalServicosProdutivos: totalServicosProdutivosGeral,
        totalServicosImprodutivos: totalServicosImprodutivosGeral,
        mediaServicosDesignados: mediaServicosDesignadosGeral,
        mediaServicos: mediaServicosGeral,
        mediaProdutivos: mediaProdutivosGeral,
        mediaImprodutivos: mediaImprodutivosGeral,
        mediaInicioJornada: mediaInicioJornadaGeral,
        mediaPrimeiroAtend: mediaPrimeiroAtendGeral,
        mediaUltimoAtend: mediaUltimoAtendGeral,
        mediaJornada: mediaJornadaGeral
    };

    linhasHtml.push(`
    <tr class="resultado">
        <td>TOTAL GERAL</td>
        <td>${fmt3(totalMeta)}</td>
        <td>${fmt3(totalProd)}</td>
        <td class="faixa-${classificar(totalMeta > 0 ? (totalProd / totalMeta) * 100 : 0)}">${classificar(totalMeta > 0 ? (totalProd / totalMeta) * 100 : 0)}</td>
        <td>${totalMeta > 0 ? `${((totalProd / totalMeta) * 100).toFixed(2)}%` : "-"}</td>
        <td>${fmt3(totalPrevisaoProd)}</td>
        <td>${totalMeta > 0 ? `${((totalPrevisaoProd / totalMeta) * 100).toFixed(2)}%` : "-"}</td>
        <td class="faixa-${totalMeta > 0 ? classificar((totalPrevisaoProd / totalMeta) * 100) : "-"}">${totalMeta > 0 ? classificar((totalPrevisaoProd / totalMeta) * 100) : "-"}</td>

        <td class="link"
            onclick="abrirModalEquipes(null, null, '${faixaAtual}')">
            ${totalEqGeral}
        </td>
        <td>${fmt2(mediaServicosDesignadosGeral)}</td>
        <td>${fmt2(mediaServicosGeral)}</td>
        <td>${fmt2(mediaProdutivosGeral)}</td>
        <td class="${mediaImprodutivosGeral > 20 ? "improd-alta" : ""}">${fmt2(mediaImprodutivosGeral)}%</td>
        <td>${minutosParaHoraTexto(mediaInicioJornadaGeral)}</td>
        <td>${minutosParaHoraTexto(mediaPrimeiroAtendGeral)}</td>
        <td>${minutosParaHoraTexto(mediaUltimoAtendGeral)}</td>
        <td>${minutosParaHoraTexto(mediaJornadaGeral)}</td>
    </tr>`);

    tbody.innerHTML = linhasHtml.join("");

    const supervisorAindaExiste = currentTabelaGeralSupervisorSelecionado &&
        currentTabelaGeralResumo.porSupervisor[currentTabelaGeralSupervisorSelecionado];
    if (!supervisorAindaExiste) {
        currentTabelaGeralSupervisorSelecionado = "";
    }
    aplicarKpisResumoTabelaGeral(
        currentTabelaGeralSupervisorSelecionado
            ? currentTabelaGeralResumo.porSupervisor[currentTabelaGeralSupervisorSelecionado]
            : currentTabelaGeralResumo.total
    );
    atualizarSelecaoSupervisorTabelaGeralUI();

    filtrosAtivos = {};
    adicionarFiltrosExcel();
}

/* ================= MODO SEMANAL ================= */

function aplicarSemanal() {
    const uo = uoSelect.value;
    const semana = semanaSelect.value;
    const tipo = tipoSelect.value;
    const campo = obterCampoPorTipo(tipo);

    montarCabecalho(tipo, false);

    if (!semana) {
        limparTelaSemDados(tipo, "Selecione uma semana");
        return;
    }

    const datasSemana = obterDatasDaSemanaSelecionada(uo, semana);

    if (!datasSemana.length) {
        limparTelaSemDados(tipo, "Nenhum dado para a semana selecionada");
        return;
    }

    const resumo = resumirPeriodo(datasSemana, campo, uo);

    if (!resumo.diasComDados) {
        limparTelaSemDados(tipo, "Nenhum dado válido para a semana selecionada");
        return;
    }

    const intervalo = obterInicioEFimSemanaPorInput(semana);
    if (modoAtualTxt) {
        modoAtualTxt.innerText = `Tabela Semanal (${intervalo.inicio} a ${intervalo.fim})`;
    }

    tbody.innerHTML = "";

    resumo.linhas.forEach(l => {
        const totalEqLinha = l.eq.AA + l.eq.A + l.eq.B + l.eq.C + l.eq.D;

        tbody.innerHTML += `
        <tr>
            <td>${escapeHtml(rotuloGrupoExibicao(l.nome))}</td>
            <td>${fmt3(l.meta)}</td>
            <td>${fmt3(l.prod)}</td>

            ${FAIXAS.map(f => {
                const fx = l.faixas[f] || "-";
                return `<td class="faixa-${fx}">${fx}</td>`;
            }).join("")}

            <td>${fmt2(totalEqLinha)}</td>
            <td>${fmt2(l.eq.AA)}</td>
            <td>${fmt2(l.eq.A)}</td>
            <td>${fmt2(l.eq.B)}</td>
            <td>${fmt2(l.eq.C)}</td>
            <td>${fmt2(l.eq.D)}</td>
        </tr>`;
    });

    const totalEqGeral =
        resumo.eqTot.AA + resumo.eqTot.A + resumo.eqTot.B + resumo.eqTot.C + resumo.eqTot.D;

    tbody.innerHTML += `
    <tr class="resultado">
        <td>TOTAL SEMANA</td>
        <td>${fmt3(resumo.totalMeta)}</td>
        <td>${fmt3(resumo.totalProd)}</td>

        ${FAIXAS.map(f => {
            let m = 0, p = 0;
            Object.values(resumo.cacheFaixas[f] || {}).forEach(x => {
                m += x.meta;
                p += x.prod;
            });
            if (!m && !p) return `<td>-</td>`;
            const fx = classificar(m ? (p / m) * 100 : 0);
            return `<td class="faixa-${fx}">${fx}</td>`;
        }).join("")}

        <td>${fmt2(totalEqGeral)}</td>
        <td>${fmt2(resumo.eqTot.AA)}</td>
        <td>${fmt2(resumo.eqTot.A)}</td>
        <td>${fmt2(resumo.eqTot.B)}</td>
        <td>${fmt2(resumo.eqTot.C)}</td>
        <td>${fmt2(resumo.eqTot.D)}</td>
    </tr>`;

    atualizarKpis(resumo.totalMeta, resumo.totalProd, resumo.eqTot, 2);

    filtrosAtivos = {};
    adicionarFiltrosExcel();
}

/* ================= MODO MENSAL ================= */

function aplicarMensal() {
    const uo = uoSelect.value;
    const anoMes = mesSelect.value;
    const tipo = tipoSelect.value;
    const campo = obterCampoPorTipo(tipo);

    montarCabecalho(tipo, false);

    if (!anoMes) {
        limparTelaSemDados(tipo, "Selecione um mês");
        return;
    }

    const datasMes = obterDatasDoMes(uo, anoMes);

    if (!datasMes.length) {
        limparTelaSemDados(tipo, "Nenhum dado para o mês selecionado");
        return;
    }

    const resumo = resumirPeriodo(datasMes, campo, uo);

    if (!resumo.diasComDados) {
        limparTelaSemDados(tipo, "Nenhum dado válido para o mês selecionado");
        return;
    }

    tbody.innerHTML = "";

    resumo.linhas.forEach(l => {
        const totalEqLinha = l.eq.AA + l.eq.A + l.eq.B + l.eq.C + l.eq.D;

        tbody.innerHTML += `
        <tr>
            <td>${escapeHtml(rotuloGrupoExibicao(l.nome))}</td>
            <td>${fmt3(l.meta)}</td>
            <td>${fmt3(l.prod)}</td>

            ${FAIXAS.map(f => {
                const fx = l.faixas[f] || "-";
                return `<td class="faixa-${fx}">${fx}</td>`;
            }).join("")}

            <td>${fmt2(totalEqLinha)}</td>
            <td>${fmt2(l.eq.AA)}</td>
            <td>${fmt2(l.eq.A)}</td>
            <td>${fmt2(l.eq.B)}</td>
            <td>${fmt2(l.eq.C)}</td>
            <td>${fmt2(l.eq.D)}</td>
        </tr>`;
    });

    const totalEqGeral =
        resumo.eqTot.AA + resumo.eqTot.A + resumo.eqTot.B + resumo.eqTot.C + resumo.eqTot.D;

    tbody.innerHTML += `
    <tr class="resultado">
        <td>TOTAL GERAL</td>
        <td>${fmt3(resumo.totalMeta)}</td>
        <td>${fmt3(resumo.totalProd)}</td>

        ${FAIXAS.map(f => {
            let m = 0, p = 0;
            Object.values(resumo.cacheFaixas[f] || {}).forEach(x => {
                m += x.meta;
                p += x.prod;
            });
            if (!m && !p) return `<td>-</td>`;
            const fx = classificar(m ? (p / m) * 100 : 0);
            return `<td class="faixa-${fx}">${fx}</td>`;
        }).join("")}

        <td>${fmt2(totalEqGeral)}</td>
        <td>${fmt2(resumo.eqTot.AA)}</td>
        <td>${fmt2(resumo.eqTot.A)}</td>
        <td>${fmt2(resumo.eqTot.B)}</td>
        <td>${fmt2(resumo.eqTot.C)}</td>
        <td>${fmt2(resumo.eqTot.D)}</td>
    </tr>`;

    atualizarKpis(resumo.totalMeta, resumo.totalProd, resumo.eqTot, 2);

    filtrosAtivos = {};
    adicionarFiltrosExcel();
}

/* ================= QUINZENA ESPECÍFICA ================= */

function aplicarQuinzenaEspecifica(numeroQuinzena) {
    const uo = uoSelect.value;
    const anoMes = mesSelect.value;
    const tipo = tipoSelect.value;
    const campo = obterCampoPorTipo(tipo);

    montarCabecalho(tipo, false);

    if (!anoMes) {
        limparTelaSemDados(tipo, "Selecione um mês");
        return;
    }

    const datasMes = obterDatasDoMes(uo, anoMes);

    if (!datasMes.length) {
        limparTelaSemDados(tipo, "Nenhum dado para o mês selecionado");
        return;
    }

    const datasQuinzena = datasMes.filter(d => {
        const dia = Number(d.slice(8, 10));
        return numeroQuinzena === 1 ? dia <= 15 : dia >= 16;
    });

    const resumo = resumirPeriodo(datasQuinzena, campo, uo);

    if (!resumo.diasComDados) {
        limparTelaSemDados(
            tipo,
            numeroQuinzena === 1
                ? "Nenhum dado na 1ª quinzena"
                : "Nenhum dado na 2ª quinzena"
        );
        return;
    }

    tbody.innerHTML = "";

    resumo.linhas.forEach(l => {
        const totalEqLinha = l.eq.AA + l.eq.A + l.eq.B + l.eq.C + l.eq.D;

        tbody.innerHTML += `
        <tr>
            <td>${escapeHtml(rotuloGrupoExibicao(l.nome))}</td>
            <td>${fmt3(l.meta)}</td>
            <td class="faixa-${classificar(l.meta > 0 ? (l.prod / l.meta) * 100 : 0)}">${classificar(l.meta > 0 ? (l.prod / l.meta) * 100 : 0)}</td>
            <td>${fmt3(l.meta)}</td>
            <td>${fmt3(l.prod)}</td>

            ${FAIXAS.map(f => {
                const fx = l.faixas[f] || "-";
                return `<td class="faixa-${fx}">${fx}</td>`;
            }).join("")}

            <td>${fmt2(totalEqLinha)}</td>
            <td>${fmt2(l.eq.AA)}</td>
            <td>${fmt2(l.eq.A)}</td>
            <td>${fmt2(l.eq.B)}</td>
            <td>${fmt2(l.eq.C)}</td>
            <td>${fmt2(l.eq.D)}</td>
        </tr>`;
    });

    const totalEqGeral =
        resumo.eqTot.AA + resumo.eqTot.A + resumo.eqTot.B + resumo.eqTot.C + resumo.eqTot.D;

    tbody.innerHTML += `
    <tr class="resultado">
        <td>${numeroQuinzena === 1 ? "TOTAL 1ª QUINZENA" : "TOTAL 2ª QUINZENA"}</td>
        <td>${fmt3(resumo.totalMeta)}</td>
        <td>${fmt3(resumo.totalProd)}</td>

        ${FAIXAS.map(f => {
            let m = 0, p = 0;
            Object.values(resumo.cacheFaixas[f] || {}).forEach(x => {
                m += x.meta;
                p += x.prod;
            });
            if (!m && !p) return `<td>-</td>`;
            const fx = classificar(m ? (p / m) * 100 : 0);
            return `<td class="faixa-${fx}">${fx}</td>`;
        }).join("")}

        <td>${fmt2(totalEqGeral)}</td>
        <td>${fmt2(resumo.eqTot.AA)}</td>
        <td>${fmt2(resumo.eqTot.A)}</td>
        <td>${fmt2(resumo.eqTot.B)}</td>
        <td>${fmt2(resumo.eqTot.C)}</td>
        <td>${fmt2(resumo.eqTot.D)}</td>
    </tr>`;

    atualizarKpis(resumo.totalMeta, resumo.totalProd, resumo.eqTot, 2);

    filtrosAtivos = {};
    adicionarFiltrosExcel();
}

/* ================= MODAL EQUIPES ================= */

async function abrirModalEquipes(nomeLinha, faixaClicada, horaClicada) {
    if (modoPeriodoAtivo()) {
        alert("Esse detalhe só abre na Tabela Diária.");
        return;
    }

    await prepararDadosModalTurno();
    horaClicada = obterHoraReferenciaModalEquipes(horaClicada);

    filtrosModal = {};

    const mostrarFaixaDia = true;
    const mostrarColunaAcordo = !!nomeLinha;
    const mostrarJustificativa = String(horaClicada) === "13";
    const mostrarPrevisao13 = String(horaClicada) === "13";

    const horasTabela = obterHorariosModalEquipes();
    const idxHora = horasTabela.indexOf(normalizarHora(horaClicada));
    const horasVisiveis = idxHora >= 0 ? horasTabela.slice(0, idxHora + 1) : horasTabela;

    renderCabecalhoModalCompleto(mostrarFaixaDia, mostrarColunaAcordo, horasVisiveis, mostrarJustificativa, mostrarPrevisao13);
    garantirColunaInicioJornada(document.querySelector("#modalEquipes thead tr"));

    const modal = document.getElementById("modalEquipes");
    const body = document.getElementById("modalBody");
    const titulo = document.getElementById("modalTitulo");

    const data = dataSelect.value;
    const uo = uoSelect.value;

    const faixaTxt = faixaClicada ? `Faixa ${faixaClicada}` : "Todas as faixas";
    const cabTipo = rotuloTipoAtual();
    const cabTexto = nomeLinha ? `${cabTipo}: ${rotuloGrupoExibicao(nomeLinha)} – ` : "";
    titulo.innerText = `${cabTexto}Equipes ${faixaTxt} – ${horaClicada}h`;

    const lista = montarListaEquipesPorFiltro(nomeLinha, faixaClicada, horaClicada, data, uo);
    const metaFixaModal = lista.reduce((acc, item) => acc + Number(item.metaDia || 0), 0);
    const prodFixaModal = lista.reduce((acc, item) => acc + Number(item.prodDia || 0), 0);

    currentModalContext = {
        tipoModal: "equipes",
        supervisor: nomeLinha || "",
        horaClicada,
        faixaClicada: faixaClicada || "",
        data,
        uo,
        tipoVisao: tipoSelect.value,
        listaAtual: lista,
        kpisFixos: {
            meta: metaFixaModal,
            prod: prodFixaModal,
            perc: metaFixaModal > 0 ? (prodFixaModal / metaFixaModal) * 100 : 0
        },
        qtdDAnalisadas: lista.filter(e => e.faixaDiaCompleta === "D").length
    };

    controlarVisibilidadeKpisModal(true);
    fecharCaixaDetalheFaixa();
    fecharCaixaDetalheFaixaDia();
    atualizarKpisModalEquipes(lista);

    const colspan =
        15 +
        horasVisiveis.length +
        (mostrarFaixaDia ? 1 : 0) +
        (mostrarColunaAcordo ? 1 : 0) +
        (mostrarPrevisao13 ? 3 : 0);

    body.innerHTML = lista.length ? lista.map(e => {
        const status = String(e.statusJornada || "").toUpperCase();
        const classeStatus = obterClasseStatusJornada(status);

        const linhaMarcada = mostrarColunaAcordo && estaEquipeMarcadaNoContexto(e.codigo, currentModalContext);
        const previsaoProd = mostrarPrevisao13 ? calcularPrevisaoNotaFinal(e.prod) : 0;
        const previsaoMeta = mostrarPrevisao13 ? Number(e.metaDia || 0) : 0;
        const previsaoPerc = mostrarPrevisao13 && previsaoMeta > 0 ? (previsaoProd / previsaoMeta) * 100 : 0;
        const previsaoPercTxt = mostrarPrevisao13 ? (previsaoMeta > 0 ? `${previsaoPerc.toFixed(2)}%` : "-") : "-";
        const previsaoFaixa = mostrarPrevisao13 ? (previsaoMeta > 0 ? classificar(previsaoPerc) : "-") : "-";

            return `
        <tr data-codigo="${e.codigo}" class="${linhaMarcada ? "linha-acordo-ativa" : ""}">
           ${renderBotaoAcordoLinha(e, mostrarColunaAcordo, currentModalContext)}
            <td>${e.codigo}</td>
            <td>${escapeHtml(String(e.frota || "-"))}</td>
            <td class="col-equipe equipe-detalhe-click" onclick="abrirCaixaDetalheEquipe('${escapeJsString(e.codigo)}', event)">${e.equipe}</td>
            <td>${fmt3(e.metaDia)}</td>
            <td>${fmt3(e.prod)}</td>
            ${mostrarFaixaDia ? `<td class="faixa-${e.faixaDiaCompleta} faixa-dia-click" onclick="abrirCaixaDetalheFaixaDia('${escapeJsString(e.codigo)}', event)">${e.faixaDiaCompleta}</td>` : ""}
            <td>${e.percProdDiaCompleto.toFixed(2)}%</td>

            ${mostrarPrevisao13 ? `
                <td>${fmt3(previsaoProd)}</td>
                <td>${previsaoPercTxt}</td>
                <td class="faixa-${previsaoFaixa}">${previsaoFaixa}</td>
            ` : ""}

            ${horasVisiveis.map(h => `
                <td class="faixa-${e.faixas[h] || "-"}">${e.faixas[h] || "-"}</td>
            `).join("")}

            <td>${e.servicos}</td>
            <td>${e.produtivo}</td>
            <td>${e.improdutivo}</td>
            <td class="improd-perc-click ${typeof e.percImprod === "number" && e.percImprod > 20 ? "improd-alta" : ""}"
                onclick="abrirModalControleServico('${escapeJsString(e.codigo)}', event)">
                ${typeof e.percImprod === "number" ? e.percImprod.toFixed(2) + "%" : "-"}
            </td>
            <td>${horaExcelParaTexto(e.inicioJornada)}</td>
            <td>${horaExcelParaTexto(e.primeiroAtend)}</td>
            <td>${horaExcelParaTexto(e.ultimoAtend)}</td>
            <td>${horaExcelParaTexto(e.jornadaProd)}</td>
            ${mostrarJustificativa ? renderCelulaJustificativa(e, currentModalContext) : `<td class="${classeStatus}">${status}</td>`}
        </tr>`;
    }).join("") : `
        <tr><td colspan="${colspan}">Nenhuma equipe encontrada</td></tr>
    `;

    controlarBotaoFullscreen(lista.length);
    atualizarBotaoAcordos17();
    atualizarBotaoAcordosRs();
    modal.classList.remove("hidden");
    setTimeout(() => adicionarFiltrosModal(), 50);
}

function fecharModal() {
    const modal = document.getElementById("modalEquipes");
    modal.classList.remove("fullscreen");
    document.getElementById("btnFullscreen").classList.add("hidden");
    modal.classList.add("hidden");
    fecharModalControleServico();
    fecharPainelJustificativa();
    currentModalContext = null;
    currentModalKpiFilter = "todas";
    controlarVisibilidadeKpisModal(false);
    atualizarKpisModalEquipes([]);
    atualizarBotaoAcordos17();
    atualizarBotaoAcordosRs();
    fecharCaixaDetalheFaixa();
    fecharCaixaDetalheFaixaDia();
}

/* ================= MODAL FAIXA ================= */

async function abrirModalFaixa(supervisor, horaClicada) {
    if (modoPeriodoAtivo()) {
        alert("Esse detalhe só abre na Tabela Diária.");
        return;
    }

    await prepararDadosModalTurno();

    const horasTabela = obterHorariosModalEquipes();
    const horaRef = obterHoraReferenciaModalEquipes(horaClicada);
    const indexFinal = horasTabela.indexOf(horaRef);
    const horasVisiveis = turnoTardeAtivo()
        ? horasTabela
        : (indexFinal >= 0 ? horasTabela.slice(0, indexFinal + 1) : horasTabela);
    const mostrarJustificativa = String(horaRef) === "13";
    const mostrarPrevisao13 = String(horaRef) === "13";
    horaClicada = horaRef;

    filtrosModal = {};
    currentModalKpiFilter = "todas";
    renderCabecalhoModalCompleto(true, true, horasVisiveis, mostrarJustificativa, mostrarPrevisao13);
    garantirColunaInicioJornada(document.querySelector("#modalEquipes thead tr"));

    const modal = document.getElementById("modalEquipes");
    const body = document.getElementById("modalBody");
    const titulo = document.getElementById("modalTitulo");

    const cabTipo = rotuloTipoAtual();
    titulo.innerText = `${cabTipo}: ${rotuloGrupoExibicao(supervisor)} – Equipes | até ${horaClicada}h`;

    const lista = montarListaEquipesSupervisor(
        supervisor,
        horaClicada,
        dataSelect.value,
        uoSelect.value
    );
    const metaFixaModal = lista.reduce((acc, item) => acc + Number(item.metaDia || item.meta || 0), 0);
    const prodFixaModal = lista.reduce((acc, item) => acc + Number(item.prodDia || item.prod || 0), 0);

    currentModalContext = {
        tipoModal: "faixa",
        supervisor,
        horaClicada,
        faixaClicada: "",
        data: dataSelect.value,
        uo: uoSelect.value,
        tipoVisao: tipoSelect.value,
        listaAtual: lista,
        kpisFixos: {
            meta: metaFixaModal,
            prod: prodFixaModal,
            perc: metaFixaModal > 0 ? (prodFixaModal / metaFixaModal) * 100 : 0
        },
        qtdDAnalisadas: lista.filter(e => e.faixaDia === "D").length
    };

    controlarVisibilidadeKpisModal(false);
    fecharCaixaDetalheFaixa();
    fecharCaixaDetalheFaixaDia();

    const colspan = 17 + horasVisiveis.length + (mostrarPrevisao13 ? 3 : 0);

    body.innerHTML = lista.length ? lista.map(e => {
        const status = String(e.statusJornada || "").toUpperCase();
        const classeStatus = obterClasseStatusJornada(status);
        const linhaMarcada = estaEquipeMarcadaNoContexto(e.codigo, currentModalContext);
        const previsaoProd = mostrarPrevisao13 ? calcularPrevisaoNotaFinal(e.prod) : 0;
        const previsaoMeta = mostrarPrevisao13 ? Number(e.metaDia || 0) : 0;
        const previsaoPerc = mostrarPrevisao13 && previsaoMeta > 0 ? (previsaoProd / previsaoMeta) * 100 : 0;
        const previsaoPercTxt = mostrarPrevisao13 ? (previsaoMeta > 0 ? `${previsaoPerc.toFixed(2)}%` : "-") : "-";
        const previsaoFaixa = mostrarPrevisao13 ? (previsaoMeta > 0 ? classificar(previsaoPerc) : "-") : "-";

        return `
        <tr data-codigo="${e.codigo}" class="${linhaMarcada ? "linha-acordo-ativa" : ""}">
             ${renderBotaoAcordoLinha(e, true, currentModalContext)}
         <td>${e.codigo}</td>
            <td>${escapeHtml(String(e.frota || "-"))}</td>
            <td class="col-equipe equipe-detalhe-click" onclick="abrirCaixaDetalheEquipe('${escapeJsString(e.codigo)}', event)">${e.equipe}</td>
            <td>${fmt3(e.meta)}</td>
            <td>${fmt3(e.prod)}</td>
            <td class="faixa-${e.faixaDia} faixa-dia-click" onclick="abrirCaixaDetalheFaixaDia('${escapeJsString(e.codigo)}', event)">${e.faixaDia}</td>
            <td>${e.percProdDia.toFixed(2)}%</td>

            ${mostrarPrevisao13 ? `
                <td>${fmt3(previsaoProd)}</td>
                <td>${previsaoPercTxt}</td>
                <td class="faixa-${previsaoFaixa}">${previsaoFaixa}</td>
            ` : ""}

            ${horasVisiveis.map(h => `<td class="faixa-${e.faixas[h]}">${e.faixas[h]}</td>`).join("")}

            <td>${e.servicos}</td>
            <td>${e.produtivo}</td>
            <td>${e.improdutivo}</td>
            <td class="improd-perc-click ${typeof e.percImprod === "number" && e.percImprod > 20 ? "improd-alta" : ""}"
                onclick="abrirModalControleServico('${escapeJsString(e.codigo)}', event)">
                ${typeof e.percImprod === "number" ? e.percImprod.toFixed(2) + "%" : "-"}
            </td>
            <td>${horaExcelParaTexto(e.inicioJornada)}</td>
            <td>${horaExcelParaTexto(e.primeiroAtend)}</td>
            <td>${horaExcelParaTexto(e.ultimoAtend)}</td>
            <td>${horaExcelParaTexto(e.jornadaProd)}</td>
            ${mostrarJustificativa ? renderCelulaJustificativa(e, currentModalContext) : `<td class="${classeStatus}">${status}</td>`}
        </tr>`;
    }).join("") : `
        <tr><td colspan="${colspan}">Nenhuma equipe encontrada</td></tr>
    `;

    controlarBotaoFullscreen(lista.length);
    atualizarBotaoAcordos17();
    atualizarBotaoAcordosRs();
    modal.classList.remove("hidden");
    setTimeout(() => adicionarFiltrosModal(), 50);
}

/* ================= MODAL ACORDOS ================= */

function abrirModalAcordos() {
    if (!currentModalContext) {
        alert("Abra primeiro o modal das equipes.");
        return;
    }

    currentAcordosModo = "contexto";
    if (historicoAcordosFiltros) historicoAcordosFiltros.classList.add("hidden");

    const horaReferencia = currentModalContext.horaClicada || "17";
    const rotulosAcordo = obterRotulosPainelAcordos(horaReferencia);
    renderizarCabecalhoContextoAcordos(horaReferencia);

    const registros = obterRegistrosAcordoContexto(currentModalContext);
    const acordosMapa = obterMapaAcordosPainel(currentModalContext);
    const acordosSalvos = Object.values(acordosMapa);

    const codigos = new Set(acordosSalvos.map(a => String(a.codigo)));

    const listaAtual = montarListaEquipesSupervisor(
        currentModalContext.supervisor,
        horaReferencia,
        currentModalContext.data,
        currentModalContext.uo,
        codigos
    );

    const mapaAtual = {};
    listaAtual.forEach(e => {
        mapaAtual[String(e.codigo)] = e;
    });

    const linhas = acordosSalvos
        .map(a => {
            const atual = mapaAtual[String(a.codigo)];
            const faixaDia = atual?.faixaDiaCompleta || atual?.faixaDia || "-";
            const statusAcordo = montarStatusAcordoFaixa(faixaDia, horaReferencia);

            return {
                acordo: a,
                atual,
                statusAcordo
            };
        })
        .sort((x, y) =>
            String(x.acordo.equipe || "").localeCompare(String(y.acordo.equipe || ""), "pt-BR")
        );

    const qtdMarcadas = linhas.length;
    const qtdCumpridas = linhas.filter(l => l.statusAcordo.cumprido).length;
    const qtdNaoCumpridas = Math.max(qtdMarcadas - qtdCumpridas, 0);
    const eficacia = qtdMarcadas ? (qtdCumpridas / qtdMarcadas) * 100 : 0;
    const qtdAnalisadas = registros.reduce((acc, reg) => acc + Number(reg?.analisadasD || 0), 0);
    const percAcordadas = qtdAnalisadas ? (qtdMarcadas / qtdAnalisadas) * 100 : 0;

    if (kpiAcordoAnalisadas) kpiAcordoAnalisadas.innerText = String(qtdAnalisadas);
    if (kpiAcordoMarcadas) kpiAcordoMarcadas.innerText = String(qtdMarcadas);
    if (kpiAcordoCumprido) kpiAcordoCumprido.innerText = String(qtdCumpridas);
    if (kpiAcordoPercAcordadas) kpiAcordoPercAcordadas.innerText = `${percAcordadas.toFixed(1).replace(".", ",")}%`;
    if (kpiAcordoNaoCumprido) kpiAcordoNaoCumprido.innerText = String(qtdNaoCumpridas);
    if (kpiAcordoEficacia) kpiAcordoEficacia.innerText = `${eficacia.toFixed(1).replace(".", ",")}%`;
    if (kpiAcordoCumpridoLabel) kpiAcordoCumpridoLabel.innerText = rotulosAcordo.cumpridoLabel;
    if (kpiAcordoAnalisadasLabel) kpiAcordoAnalisadasLabel.innerText = "Qtde. Eq. D Analisadas";
    if (kpiAcordoMarcadasLabel) kpiAcordoMarcadasLabel.innerText = "Qtde. Eq. D Acordadas";
    if (kpiAcordoPercAcordadasLabel) kpiAcordoPercAcordadasLabel.innerText = "% Eq. Acordadas";
    if (kpiAcordoNaoCumpridoLabel) kpiAcordoNaoCumpridoLabel.innerText = "Qtde. Eq. Acordo NÃ£o Cumprido";
    if (kpiAcordoEficacia?.previousElementSibling) {
        kpiAcordoEficacia.previousElementSibling.innerText = rotulosAcordo.eficaciaLabel;
    }
    if (kpiAcordoNaoCumpridoLabel) kpiAcordoNaoCumpridoLabel.innerText = "Qtde. Eq. Acordo Nao Cumprido";
    const thAcordoAtual = document.getElementById("thAcordoMomento");
    const thStatusAtual = document.getElementById("thStatusAcordo");
    if (thAcordoAtual) thAcordoAtual.innerHTML = rotulosAcordo.colunaAcordo;
    if (thStatusAtual) thStatusAtual.innerHTML = rotulosAcordo.colunaStatus;

    if (modalAcordosTitulo) {
        const escopoTitulo = currentModalContext.supervisor
            ? `${rotuloTipoAtual().toUpperCase()} ${currentModalContext.supervisor}`
            : "TOTAL EQUIPES";
        modalAcordosTitulo.innerText =
            `${rotulosAcordo.titulo} - ${escopoTitulo} - ${currentModalContext.data}`;
    }
    atualizarMetaModalAcordos();

    garantirColunaInicioJornada(document.querySelector("#modalAcordos thead tr"));

    modalAcordosBody.innerHTML = linhas.length ? linhas.map(l => {
        const acordo = l.acordo;
        const atual = l.atual || montarLinhaResumoEquipePadrao();
        const status = l.statusAcordo;
        const resultadoAcordo = l.atual
            ? {
                meta: atual.metaDia,
                prod: atual.prod,
                faixa: atual.faixaDiaCompleta,
                perc: atual.percProdDiaCompleto
            }
            : {
                meta: acordo.metaDiaAcordo || acordo.metaAcordo,
                prod: acordo.prodAcordo,
                faixa: acordo.faixaAcordo,
                perc: Number(acordo.percAcordo || 0)
            };

        return `
        <tr>
            <td>${acordo.codigo}</td>
            <td>${escapeHtml(String(atual.frota || "-"))}</td>
            <td class="col-equipe">${acordo.equipe}</td>
            <td>${fmt3(resultadoAcordo.meta)}</td>
            <td>${fmt3(resultadoAcordo.prod)}</td>
            <td class="faixa-${resultadoAcordo.faixa}">${resultadoAcordo.faixa}</td>
            <td>${Number(resultadoAcordo.perc || 0).toFixed(2)}%</td>

            <td class="faixa-${atual.faixas["09"] || "-"}">${atual.faixas["09"] || "-"}</td>
            <td class="faixa-${atual.faixas["11"] || "-"}">${atual.faixas["11"] || "-"}</td>
            <td class="faixa-${atual.faixas["13"] || "-"}">${atual.faixas["13"] || "-"}</td>
            <td class="faixa-${atual.faixas["15"] || "-"}">${atual.faixas["15"] || "-"}</td>
            <td class="faixa-${atual.faixas["17"] || "-"}">${atual.faixas["17"] || "-"}</td>

            <td>${atual.servicos}</td>
            <td>${atual.produtivo}</td>
            <td>${atual.improdutivo}</td>

            <td class="${typeof atual.percImprod === "number" && atual.percImprod > 20 ? "improd-alta" : ""}">
                ${typeof atual.percImprod === "number" ? atual.percImprod.toFixed(2) + "%" : "-"}
            </td>

            <td>${horaExcelParaTexto(atual.inicioJornada)}</td>
            <td>${horaExcelParaTexto(atual.primeiroAtend)}</td>
            <td>${horaExcelParaTexto(atual.ultimoAtend)}</td>
            <td>${horaExcelParaTexto(atual.jornadaProd)}</td>

            <td>
                <span class="acordo-chip pendente">
                    🤝 Acordo
                </span>
            </td>

            <td class="${status.classe}">
                <span class="acordo-icone">${status.icone}</span> ${status.texto}
            </td>
        </tr>`;
    }).join("") : `
        <tr>
            <td colspan="21">Nenhum acordo marcado para este contexto.</td>
        </tr>
    `;

    modalAcordos.classList.remove("hidden");
}

function fecharModalAcordos() {
    currentAcordosModo = "contexto";
    currentAcordosListaExibida = [];
    if (modalAcordos) modalAcordos.classList.add("hidden");
}

function renderizarTabelaAcordosRs() {
    if (!modalAcordosRsBody) return;

    const linhasBase = Array.isArray(currentAcordosRsBaseLinhas) ? currentAcordosRsBaseLinhas : [];
    const linhasSupervisor = currentAcordosRsSupervisorFilter
        ? linhasBase.filter(l => String(l.supervisor || "") === String(currentAcordosRsSupervisorFilter))
        : linhasBase;
    const linhas = currentAcordosRsFilter === "acordadas"
        ? linhasSupervisor.filter(l => l.acordada)
        : linhasSupervisor;

    const somas = linhas.reduce((acc, l) => {
        acc.metaRs += Number(l.metaRs || 0);
        acc.prodMomentoRs += Number(l.prodMomentoRs || 0);
        acc.previsaoRs += Number(l.previsaoRs || 0);
        acc.fechamentoRs += Number(l.fechamentoRs || 0);
        acc.recuperacaoRs += Number(l.recuperadoRs || 0);
        acc.valorAcordoRs += Math.max(Number(l.metaRs || 0) - Number(l.prodMomentoRs || 0), 0);
        return acc;
    }, { metaRs: 0, prodMomentoRs: 0, previsaoRs: 0, fechamentoRs: 0, recuperacaoRs: 0, valorAcordoRs: 0 });

    const qtdAcordadas = linhas.filter(l => l.acordada).length;

    if (kpiAcordoRsQtd) kpiAcordoRsQtd.innerText = String(linhas.length);
    if (kpiAcordoRsMeta) kpiAcordoRsMeta.innerText = fmtBRL(somas.metaRs);
    if (kpiAcordoRsProdMomento) kpiAcordoRsProdMomento.innerText = fmtBRL(somas.prodMomentoRs);
    if (kpiAcordoRsPrev) kpiAcordoRsPrev.innerText = fmtBRL(somas.previsaoRs);
    if (kpiAcordoRsFech) kpiAcordoRsFech.innerText = fmtBRL(somas.fechamentoRs);
    if (kpiAcordoRsValorAcordo) kpiAcordoRsValorAcordo.innerText = fmtBRL(somas.valorAcordoRs);
    if (kpiAcordoRsRecuperacao) kpiAcordoRsRecuperacao.innerText = fmtBRL(somas.recuperacaoRs);
    if (kpiAcordoRsAcordadas) kpiAcordoRsAcordadas.innerText = String(qtdAcordadas);

    if (cardKpiAcordoRsRecuperacao) {
        cardKpiAcordoRsRecuperacao.classList.toggle("kpi-positivo", somas.recuperacaoRs > 0);
        cardKpiAcordoRsRecuperacao.classList.toggle("kpi-negativo", somas.recuperacaoRs < 0);
        cardKpiAcordoRsRecuperacao.classList.toggle("kpi-neutro", somas.recuperacaoRs === 0);
    }

    if (cardKpiAcordoRsQtd) {
        cardKpiAcordoRsQtd.classList.toggle("ativo", currentAcordosRsFilter === "todas");
        cardKpiAcordoRsQtd.classList.toggle("kpi-filter-active", currentAcordosRsFilter === "todas");
    }
    if (cardKpiAcordoRsAcordadas) {
        cardKpiAcordoRsAcordadas.classList.toggle("ativo", currentAcordosRsFilter === "acordadas");
        cardKpiAcordoRsAcordadas.classList.toggle("kpi-filter-active", currentAcordosRsFilter === "acordadas");
    }

    modalAcordosRsBody.innerHTML = linhas.length ? linhas.map(l => `
        <tr>
            <td>${escapeHtml(l.codigo)}</td>
            <td>${escapeHtml(String(l.frota || "-"))}</td>
            <td class="col-equipe">${escapeHtml(l.equipe)}</td>
            <td>${fmtDecBR(l.metaDia, 2)}</td>
            <td>${fmtBRL(l.metaRs)}</td>
            <td>${fmtDecBR(l.prodMomento, 3)}</td>
            <td>${fmtBRL(l.prodMomentoRs)}</td>
            <td class="faixa-${l.momentoFaixa}">${escapeHtml(l.momentoFaixa)}</td>
            <td>${l.metaDia > 0 ? `${l.momentoPerc.toFixed(2).replace(".", ",")}%` : "-"}</td>
            <td>${fmtDecBR(l.previsaoProd, 3)}</td>
            <td>${l.metaDia > 0 ? `${Math.round(l.previsaoPerc)}%` : "-"}</td>
            <td class="faixa-${l.previsaoFaixa}">${escapeHtml(l.previsaoFaixa)}</td>
            <td>${fmtBRL(l.previsaoRs)}</td>
            <td>${fmtDecBR(l.fechamentoProd, 3)}</td>
            <td>${l.metaDia > 0 ? `${Math.round(l.fechamentoPerc)}%` : "-"}</td>
            <td class="faixa-${l.fechamentoFaixa}">${escapeHtml(l.fechamentoFaixa)}</td>
            <td>${fmtBRL(l.fechamentoRs)}</td>
            <td>${fmtBRL(l.recuperadoRs)}</td>
        </tr>
    `).join("") : `
        <tr><td colspan="18">Nenhuma equipe encontrada para este filtro.</td></tr>
    `;
}

function aplicarFiltroAcordosRs(tipo = "todas") {
    currentAcordosRsFilter = tipo === "acordadas" ? "acordadas" : "todas";
    renderizarTabelaAcordosRs();
}

if (acordosRsSupervisorSelect) {
    acordosRsSupervisorSelect.addEventListener("change", (event) => {
        currentAcordosRsSupervisorFilter = String(event.target.value || "");
        renderizarTabelaAcordosRs();
    });
}

function obterListaMomento13ParaAcordosRs(ctx) {
    if (!ctx) return [];
    const data = String(ctx.data || dataSelect?.value || "").trim();
    const uo = String(ctx.uo || uoSelect?.value || "").trim();
    const supervisor = String(ctx.supervisor || "").trim() || null;

    if (ctx.tipoModal === "equipes") {
        return montarListaEquipesPorFiltro(supervisor, ctx.faixaClicada || "", "13", data, uo);
    }

    return montarListaEquipesSupervisor(supervisor, "13", data, uo, null);
}

function abrirModalAcordosRs() {
    if (!validarSenhaAcordosRs()) return;

    if (!modalAcordosRs || !modalAcordosRsBody) return;
    currentAcordosRsFilter = "todas";

    const dataCtx = String(currentModalContext?.data || dataSelect?.value || "").trim();
    if (!dataCtx) {
        alert("Selecione uma data.");
        return;
    }
    const uoCtx = String(currentModalContext?.uo || uoSelect?.value || "").trim();

    let ctx = currentModalContext;
    if (!ctx) {
        const listaBase = montarListaEquipesSupervisor(null, "13", dataCtx, uoCtx, null);
        const metaFixa = listaBase.reduce((acc, item) => acc + Number(item.metaDia || 0), 0);
        const prodFixa = listaBase.reduce((acc, item) => acc + Number(item.prodDia || 0), 0);
        ctx = {
            tipoModal: "menu-rs",
            supervisor: "",
            horaClicada: "13",
            faixaClicada: "",
            data: dataCtx,
            uo: uoCtx,
            tipoVisao: tipoSelect?.value || "",
            listaAtual: listaBase,
            kpisFixos: {
                meta: metaFixa,
                prod: prodFixa,
                perc: metaFixa > 0 ? (prodFixa / metaFixa) * 100 : 0
            },
            qtdDAnalisadas: listaBase.filter(e => e.faixaDiaCompleta === "D").length
        };
    }

    const supervisorCtx = String(ctx.supervisor || "").trim() || null;

    const linhasContexto = obterLinhasContextoModal(dataCtx, uoCtx);
    const temFechamento17 = linhasContexto.some(l => obterHoraLinha(l) === "17");
    const horaFech = temFechamento17 ? "17" : (ultimaFaixaDisponivel(uoCtx, dataCtx) || "17");

    // "Situação momento do acordo" sempre usa os dados de 13h
    const listaBase = obterListaMomento13ParaAcordosRs(ctx);
    const codigosPermitidos = new Set(listaBase.map(e => String(e.codigo || "").trim()).filter(Boolean));
    const horaFechNum = Number(normalizarHora(horaFech));
    const mapaFechamentoProd = {};
    const mapaSupervisor = {};

    linhasContexto.forEach(l => {
        if (supervisorCtx && (l[campoGlobal] || "N/I") !== supervisorCtx) return;

        const cod = obterCodigoEquipeLinha(l);
        if (!cod || !codigosPermitidos.has(String(cod))) return;
        if (!mapaSupervisor[cod]) {
            const sup =
                obterValorColuna(l, ["SUPERVISOR - SETOR", "SUPERVISOR", "Supervisor"]) ||
                obterValorColunaPorFragmentos(l, ["SUPERVISOR"]) ||
                "";
            mapaSupervisor[cod] = String(sup || "").trim();
        }

        const horaLinha = obterHoraLinha(l);
        const horaLinhaNum = Number(horaLinha);
        if (!horaLinha || !Number.isFinite(horaLinhaNum) || !Number.isFinite(horaFechNum)) return;
        if (horaLinhaNum > horaFechNum) return;

        const prodLinha = obterProducaoLinha(l);
        mapaFechamentoProd[cod] = Math.max(Number(mapaFechamentoProd[cod] || 0), Number(prodLinha || 0));
    });

    const metaDiaPadrao = (v) => Number(v || 0);
    const prodMomentoPadrao = (v) => Number(v || 0);

    const acordosPainel = obterMapaAcordosPainel(ctx);
    const linhasAll = listaBase.map(e => {
        const metaDia = metaDiaPadrao(e.metaDia);
        const prodMomento = prodMomentoPadrao(e.prod);
        const momentoPerc = metaDia > 0 ? (prodMomento / metaDia) * 100 : 0;
        const momentoFaixa = metaDia > 0 ? classificar(momentoPerc) : "-";

        const previsaoProd = calcularPrevisaoNotaFinal(prodMomento);
        const previsaoPerc = metaDia > 0 ? (previsaoProd / metaDia) * 100 : 0;
        const previsaoFaixa = metaDia > 0 ? classificar(previsaoPerc) : "-";

        const cod = String(e.codigo || "").trim();
        const fechamentoProd = Number(mapaFechamentoProd[cod] ?? e.prodDia ?? e.prod ?? 0);
        const fechamentoPerc = metaDia > 0 ? (fechamentoProd / metaDia) * 100 : 0;
        const fechamentoFaixa = metaDia > 0 ? classificar(fechamentoPerc) : "-";

        const metaRs = metaDia * VALOR_RS_POR_UNIDADE;
        const prodMomentoRs = prodMomento * VALOR_RS_POR_UNIDADE;
        const previsaoRs = previsaoProd * VALOR_RS_POR_UNIDADE;
        const fechamentoRs = fechamentoProd * VALOR_RS_POR_UNIDADE;
        const recuperadoRs = fechamentoRs - previsaoRs;

        return {
            codigo: String(e.codigo || ""),
            frota: String(e.frota || "-"),
            equipe: String(e.equipe || "-"),
            supervisor: mapaSupervisor[String(e.codigo || "")] || "",
            acordada: !!acordosPainel[String(e.codigo || "")],
            metaDia,
            metaRs,
            prodMomento,
            prodMomentoRs,
            momentoFaixa,
            momentoPerc,
            previsaoProd,
            previsaoPerc,
            previsaoFaixa,
            previsaoRs,
            fechamentoProd,
            fechamentoPerc,
            fechamentoFaixa,
            fechamentoRs,
            recuperadoRs
        };
    });

    const linhasD = linhasAll.filter(l => l.momentoFaixa === "D");
    const linhas = (linhasD.length ? linhasD : linhasAll)
        .sort((a, b) => a.equipe.localeCompare(b.equipe, "pt-BR", { sensitivity: "base" }));

    if (modalAcordosRsTitulo) {
        const escopoTitulo = ctx.supervisor
            ? `${rotuloTipoAtual().toUpperCase()} ${ctx.supervisor}`
            : "TOTAL EQUIPES";
        const dataTxt = formatarDataBR(ctx.data || "");
        modalAcordosRsTitulo.innerText = `R$ ACORDOS - ${escopoTitulo} - ${dataTxt} - Momento 13h - Fechamento ${horaFech}h`;
    }

    currentAcordosRsBaseLinhas = linhas;
    currentAcordosRsLinhas = linhas;
    if (acordosRsSupervisorSelect) {
        const supervisores = [...new Set(linhas.map(l => String(l.supervisor || "").trim()).filter(Boolean))]
            .sort((a, b) => a.localeCompare(b, "pt-BR", { sensitivity: "base" }));
        acordosRsSupervisorSelect.innerHTML = `
            <option value="">Todos</option>
            ${supervisores.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join("")}
        `;
        if (!supervisores.includes(currentAcordosRsSupervisorFilter)) {
            currentAcordosRsSupervisorFilter = "";
        }
        acordosRsSupervisorSelect.value = currentAcordosRsSupervisorFilter;
    }
    renderizarTabelaAcordosRs();

    modalAcordosRs.classList.remove("hidden");
}

function validarSenhaAcordosRs() {
    try {
        if (sessionStorage.getItem(STORAGE_KEY_ACORDOS_RS_OK) === "1") return true;
    } catch (_) {
        // ignore
    }
    const senha = String(prompt("Digite a senha para acessar R$ ACORDOS:", "") || "").trim();
    if (!senha) return false;
    if (senha === SENHA_ACORDOS_RS) {
        try {
            sessionStorage.setItem(STORAGE_KEY_ACORDOS_RS_OK, "1");
        } catch (_) {
            // ignore
        }
        return true;
    }
    alert("Senha incorreta.");
    return false;
}

function fecharModalAcordosRs() {
    currentAcordosRsFilter = "todas";
    currentAcordosRsLinhas = [];
    currentAcordosRsBaseLinhas = [];
    currentAcordosRsSupervisorFilter = "";
    if (modalAcordosRs) modalAcordosRs.classList.add("hidden");
}

/* ================= MODAL CONTROLE SERVICOS ================= */

function obterValorControleServico(row, candidates) {
    if (!row || !candidates) return "";
    const lista = Array.isArray(candidates) ? candidates : [candidates];
    for (const key of lista) {
        if (Object.prototype.hasOwnProperty.call(row, key)) return row[key];
        const lower = String(key).toLowerCase();
        const found = Object.keys(row).find(k => String(k).toLowerCase() === lower);
        if (found) return row[found];
    }
    return "";
}

function parseControleServicoNumero(value) {
    if (value === null || value === undefined || value === "") return 0;
    const n = Number(String(value).replace(",", "."));
    return Number.isFinite(n) ? n : 0;
}

function normalizarProdutivoFlag(valor) {
    const raw = String(valor ?? "").trim().toUpperCase();
    if (raw === "T" || raw === "SIM" || raw === "S" || raw === "1" || raw === "TRUE") return "SIM";
    if (raw === "F" || raw === "NAO" || raw === "NÃO" || raw === "N" || raw === "0" || raw === "FALSE") return "NÃO";
    return "-";
}

function atualizarKpiControleServicoImpedimento(percentual) {
    if (!controleServicoPercImpedimento) return;

    controleServicoPercImpedimento.innerText = `${percentual.toFixed(2)}%`;
    controleServicoPercImpedimento.classList.toggle("controle-servico-kpi-alerta", percentual > 20);
    controleServicoPercImpedimento.classList.toggle("controle-servico-kpi-ok", percentual <= 20);
}

function atualizarKpisAtendimentoControleServico(primeiroAtend = "-", ultimoAtend = "-") {
    if (controleServicoPrimeiroAtend) controleServicoPrimeiroAtend.innerText = horaExcelParaTexto(primeiroAtend) || "-";
    if (controleServicoUltimoAtend) controleServicoUltimoAtend.innerText = horaExcelParaTexto(ultimoAtend) || "-";
}

function extrairDataHoraLocalControleServico(valor) {
    const raw = String(valor ?? "").trim();
    const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})[T\s](\d{1,2}):(\d{2})/);
    if (!match) return null;

    const [, ano, mes, dia, hora, minuto] = match;
    return {
        ano,
        mes,
        dia,
        hora: String(hora).padStart(2, "0"),
        minuto
    };
}

function formatarHoraControleServico(valor) {
    const raw = String(valor ?? "").trim();
    if (!raw || raw === "-" || raw.toLowerCase() === "null") return "-";

    const local = extrairDataHoraLocalControleServico(raw);
    if (local) return `${local.hora}:${local.minuto}`;

    // ISO com fuso real -> HH:MM no fuso America/Sao_Paulo
    if (/[T\s]\d{1,2}:\d{2}/.test(raw)) {
        const dt = new Date(raw);
        if (!Number.isNaN(dt.getTime())) {
            try {
                const fmt = new Intl.DateTimeFormat("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                });
                return fmt.format(dt);
            } catch (_) {
                // fallback abaixo
            }
        }
    }

    // Fallback: extrai HH:MM sem conversão
    const match = raw.match(/(\d{1,2}):(\d{2})/);
    if (match) {
        const h = String(match[1]).padStart(2, "0");
        const m = String(match[2]).padStart(2, "0");
        return `${h}:${m}`;
    }

    const minutos = horaTextoParaMinutos(raw);
    if (minutos === null) return raw;
    const h = Math.floor(minutos / 60);
    const m = minutos % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function formatarDataHoraControleServico(valor) {
    const raw = String(valor ?? "").trim();
    if (!raw || raw === "-" || raw.toLowerCase() === "null") return "-";

    const local = extrairDataHoraLocalControleServico(raw);
    if (local) return `${local.dia}/${local.mes}/${local.ano} ${local.hora}:${local.minuto}`;

    if (/[T\s]\d{1,2}:\d{2}/.test(raw)) {
        const dt = new Date(raw);
        if (!Number.isNaN(dt.getTime())) {
            try {
                const fmt = new Intl.DateTimeFormat("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                });
                return fmt.format(dt).replace(",", "");
            } catch (_) {
                // fallback abaixo
            }
        }
    }

    const match = raw.match(/(\d{4})-(\d{2})-(\d{2}).*?(\d{1,2}):(\d{2})/);
    if (match) {
        const [, ano, mes, dia, hora, minuto] = match;
        return `${dia}/${mes}/${ano} ${String(hora).padStart(2, "0")}:${minuto}`;
    }

    const dataMatch = raw.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    const hora = formatarHoraControleServico(raw);
    if (dataMatch && hora !== "-") {
        const [, dia, mes, ano] = dataMatch;
        return `${String(dia).padStart(2, "0")}/${String(mes).padStart(2, "0")}/${ano} ${hora}`;
    }

    return raw;
}

function somaTempoLacuna(rows) {
    let totalMin = 0;
    rows.forEach(row => {
        const raw = obterValorControleServico(row, ["LACUNA", "TEMPO_LACUNA", "TEMPO LACUNA"]);
        const min = horaTextoParaMinutos(raw);
        if (min !== null) {
            totalMin += min;
            return;
        }
        const n = parseControleServicoNumero(raw);
        if (n) totalMin += n;
    });
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function minutosParaHora(totalMin) {
    if (!Number.isFinite(totalMin) || totalMin < 0) return "-";
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function calcularLacunasControleServico(rows) {
    const acionamentoKey = ["DATA_ACIONAMENTO", "ACIONAMENTO", "DATA ACIONAMENTO"];
    const encerramentoKey = ["DATA_TERMINO_REAL", "ENCERRAMENTO", "DATA_TERMINO"];
    const lacunas = [];
    let totalMin = 0;

    for (let i = 0; i < rows.length; i += 1) {
        const row = rows[i];
        const next = rows[i + 1];
        if (!next) {
            lacunas.push("-");
            continue;
        }

        const encRaw = obterValorControleServico(row, encerramentoKey);
        const aciRaw = obterValorControleServico(next, acionamentoKey);
        const encTxt = formatarHoraControleServico(encRaw);
        const aciTxt = formatarHoraControleServico(aciRaw);
        const encMin = horaTextoParaMinutos(encTxt);
        const aciMin = horaTextoParaMinutos(aciTxt);

        if (encMin === null || aciMin === null || aciMin < encMin) {
            lacunas.push("-");
            continue;
        }

        const diff = aciMin - encMin;
        totalMin += diff;
        lacunas.push(minutosParaHora(diff));
    }

    return { lacunas, totalMin };
}

function buildControleServicoCacheKey(data, uo, codEquipe) {
    return `${String(data || "").trim()}|${String(uo || "").trim()}|${String(codEquipe || "").trim()}`;
}

function buildControleServicoResumoCacheKey(data, uo) {
    return `${String(data || "").trim()}|${String(uo || "").trim()}`;
}

async function carregarResumoControleServicoDesignados(data, uo) {
    const cacheKey = buildControleServicoResumoCacheKey(data, uo);
    if (cacheControleServicoResumo.has(cacheKey)) {
        return cacheControleServicoResumo.get(cacheKey);
    }

    const params = new URLSearchParams();
    if (data) params.set("data", data);
    if (uo) params.set("uo", uo);

    let mapa = {};

    const resp = await fetch(`/api/controle-servico/designados-resumo?${params.toString()}`, { cache: "no-store" });
    if (resp.ok) {
        const payload = await resp.json();
        mapa = payload && typeof payload.mapa === "object" && payload.mapa
            ? payload.mapa
            : {};
    } else {
        const fallbackResp = await fetch(`/api/controle-servico?${params.toString()}&limit=5000`, { cache: "no-store" });
        if (!fallbackResp.ok) {
            throw new Error(`Erro ao carregar resumo de servicos designados (${resp.status}/${fallbackResp.status}).`);
        }

        const payload = await fallbackResp.json();
        const rows = Array.isArray(payload?.rows) ? payload.rows : [];
        rows.forEach((row) => {
            const codigo = String(
                row?.COD_EQUIPE_WM ??
                row?.COD_EQUIPE ??
                row?.NUM_EQUIPE ??
                ""
            ).trim();
            if (!codigo) return;
            mapa[codigo] = Number(mapa[codigo] || 0) + 1;
        });
    }

    cacheControleServicoResumo.set(cacheKey, mapa);
    return mapa;
}

async function carregarControleServico(data, uo, codEquipe) {
    const cacheKey = buildControleServicoCacheKey(data, uo, codEquipe);
    if (cacheControleServico.has(cacheKey)) {
        return cacheControleServico.get(cacheKey);
    }

    const params = new URLSearchParams();
    if (data) params.set("data", data);
    if (uo) params.set("uo", uo);
    if (codEquipe) params.set("codEquipe", codEquipe);

    const resp = await fetch(`/api/controle-servico?${params.toString()}`, { cache: "no-store" });
    if (!resp.ok) {
        throw new Error(`Erro ao carregar controle de servicos (${resp.status}).`);
    }
    const payload = await resp.json();
    const rows = Array.isArray(payload?.rows) ? payload.rows : [];
    cacheControleServico.set(cacheKey, rows);
    return rows;
}

function renderizarControleServicoTabela(rows) {
    if (!modalControleServicoBody) return;

    if (!rows.length) {
        modalControleServicoBody.innerHTML =
            `<tr><td colspan="${CONTROLE_SERVICO_COLS.length}">Nenhum servico encontrado.</td></tr>`;
        if (controleServicoTotal) controleServicoTotal.innerText = "0";
        if (controleServicoRealizados) controleServicoRealizados.innerText = "0";
        if (controleServicoMetaDia) controleServicoMetaDia.innerText = "0.000";
        if (controleServicoUsPrev) controleServicoUsPrev.innerText = "0";
        if (controleServicoUsExec) controleServicoUsExec.innerText = "0";
        if (controleServicoProdutivos) controleServicoProdutivos.innerText = "0";
        if (controleServicoImprodutivos) controleServicoImprodutivos.innerText = "0";
        atualizarKpiControleServicoImpedimento(0);
        atualizarKpisAtendimentoControleServico();
        if (controleServicoTempoLacuna) controleServicoTempoLacuna.innerText = "00:00";
        return;
    }

    const lacunaInfo = calcularLacunasControleServico(rows);
    const linhas = rows.map((row, idx) => `
        <tr>
            ${CONTROLE_SERVICO_COLS.map(col => {
                let valor = obterValorControleServico(row, col.candidates);
                if (col.key === "data_designacao") {
                    valor = formatarDataHoraControleServico(valor);
                } else if (["data_acionamento", "data_localizacao", "data_termino"].includes(col.key)) {
                    valor = formatarHoraControleServico(valor);
                }
                if (col.key === "produtivo") {
                    valor = normalizarProdutivoFlag(valor);
                }
                if (col.key === "situacao") {
                    const raw = String(valor ?? "").trim().toUpperCase();
                    if (raw === "D") valor = "Designado";
                    else if (raw === "J") valor = "Finalizado";
                    else if (raw === "A") valor = "Acionado";
                    else if (raw === "E") valor = "Em execução";
                }
                if (col.key === "us_exec") {
                    const n = parseControleServicoNumero(valor);
                    valor = Number.isFinite(n) ? fmt3(n) : valor;
                }
                if (col.key === "us_prev") {
                    const n = parseControleServicoNumero(valor);
                    valor = Number.isFinite(n) ? fmt3(n) : valor;
                }
                if (col.key === "lacuna") {
                    valor = lacunaInfo.lacunas[idx] ?? "-";
                }
                const cls = col.key === "equipe" ? "col-equipe" : "";
                return `<td class="${cls}">${escapeHtml(String(valor ?? "-"))}</td>`;
            }).join("")}
        </tr>
    `).join("");

    const totalServicos = rows.length;
    const metaDia = Number(currentModalContext?.metaEquipeAtual ?? currentModalContext?.kpisFixos?.meta ?? 0);
    const totalUsPrev = rows.reduce((acc, row) => acc + parseControleServicoNumero(
        obterValorControleServico(row, ["US_PREV", "US PREV", "US_PREVISTAS"])
    ), 0);
    const totalUsExec = rows.reduce((acc, row) => acc + parseControleServicoNumero(
        obterValorControleServico(row, ["US_EXEC", "US EXEC", "US_EXECUTADAS"])
    ), 0);
    const totalProdutivos = rows.reduce((acc, row) => {
        const flag = normalizarProdutivoFlag(obterValorControleServico(row, ["PRODUTIVO", "PRODUTIVOS"]));
        return acc + (flag === "SIM" ? 1 : 0);
    }, 0);
    const totalImprod = rows.reduce((acc, row) => {
        const flag = normalizarProdutivoFlag(obterValorControleServico(row, ["PRODUTIVO", "PRODUTIVOS"]));
        return acc + (flag === "NÃO" ? 1 : 0);
    }, 0);
    const totalRealizados = totalProdutivos + totalImprod;
    const percImpedimento = Number(currentModalContext?.percImprodEquipeAtual ?? 0);
    const totalLacuna = minutosParaHora(lacunaInfo.totalMin);

    if (controleServicoTotal) controleServicoTotal.innerText = String(totalServicos);
    if (controleServicoRealizados) controleServicoRealizados.innerText = String(totalRealizados);
    if (controleServicoMetaDia) controleServicoMetaDia.innerText = fmt3(metaDia);
    if (controleServicoUsPrev) controleServicoUsPrev.innerText = fmt3(totalUsPrev);
    if (controleServicoUsExec) controleServicoUsExec.innerText = fmt3(totalUsExec);
    if (controleServicoProdutivos) controleServicoProdutivos.innerText = String(totalProdutivos);
    if (controleServicoImprodutivos) controleServicoImprodutivos.innerText = String(totalImprod);
    atualizarKpiControleServicoImpedimento(percImpedimento);
    if (controleServicoTempoLacuna) controleServicoTempoLacuna.innerText = totalLacuna;

    const totalRow = `
        <tr class="controle-servico-total-row">
            <td>TOTAL</td>
            <td>${totalServicos}</td>
            <td colspan="2"></td>
            <td></td>
            <td></td>
            <td>${fmt3(totalUsPrev)}</td>
            <td>${fmt3(totalUsExec)}</td>
            <td colspan="4"></td>
            <td></td>
            <td>${totalLacuna}</td>
        </tr>
    `;

    modalControleServicoBody.innerHTML = linhas + totalRow;
}

function abrirModalControleServico(codEquipe, event) {
    if (event && typeof event.stopPropagation === "function") {
        event.stopPropagation();
    }
    if (!modalControleServico || !modalControleServicoBody) return;

    const data = String(currentModalContext?.data || dataSelect?.value || "").trim();
    const uo = String(currentModalContext?.uo || uoSelect?.value || "").trim();
    const codigo = String(codEquipe || "").trim();
    if (!codigo) return;

    const equipeAtual = (currentModalContext?.listaAtual || []).find(item => String(item.codigo) === codigo);
    const nomeEquipe = equipeAtual ? equipeAtual.equipe : "-";
    const dataTxt = formatarDataBR(data) || data || "-";
    const uoTxt = uo ? `UO ${uo}` : "UO -";

    if (modalControleServicoTitulo) {
        const prefixo = currentModalContext?.supervisor ? `${currentModalContext.supervisor} - ` : "";
        modalControleServicoTitulo.innerText = `${uoTxt} - ${prefixo}${nomeEquipe} — COD.EQP: ${codigo}`;
    }
    if (modalControleServicoSubtitle) {
        modalControleServicoSubtitle.innerText = dataTxt;
    }
    if (controleServicoLider) {
        controleServicoLider.innerText = String(equipeAtual?.liderPosto || "-");
    }
    if (controleServicoControlador) {
        controleServicoControlador.innerText = String(equipeAtual?.controlador || "-");
    }
    if (currentModalContext) {
        currentModalContext.metaEquipeAtual = Number(equipeAtual?.metaDia ?? 0);
        currentModalContext.percImprodEquipeAtual =
            typeof equipeAtual?.percImprod === "number" && !Number.isNaN(equipeAtual.percImprod)
                ? equipeAtual.percImprod
                : 0;
        currentModalContext.codigoEquipeControleServicoAtual = codigo;
    }
    if (controleServicoTotal) controleServicoTotal.innerText = "0";
    if (controleServicoRealizados) controleServicoRealizados.innerText = "0";
    if (controleServicoMetaDia) controleServicoMetaDia.innerText = "0.000";
    if (controleServicoUsPrev) controleServicoUsPrev.innerText = "0";
    if (controleServicoUsExec) controleServicoUsExec.innerText = "0";
    if (controleServicoProdutivos) controleServicoProdutivos.innerText = "0";
    if (controleServicoImprodutivos) controleServicoImprodutivos.innerText = "0";
    atualizarKpiControleServicoImpedimento(0);
    atualizarKpisAtendimentoControleServico(equipeAtual?.primeiroAtend, equipeAtual?.ultimoAtend);
    if (controleServicoTempoLacuna) controleServicoTempoLacuna.innerText = "00:00";

    modalControleServicoBody.innerHTML =
        `<tr><td colspan="${CONTROLE_SERVICO_COLS.length}">Carregando...</td></tr>`;
    modalControleServico.classList.remove("hidden");

    carregarControleServico(data, uo, codigo)
        .then(rows => renderizarControleServicoTabela(rows))
        .catch(err => {
            modalControleServicoBody.innerHTML =
                `<tr><td colspan="${CONTROLE_SERVICO_COLS.length}">${escapeHtml(String(err.message || err))}</td></tr>`;
        });
}

function fecharModalControleServico() {
    if (modalControleServico) modalControleServico.classList.add("hidden");
    if (modalControleServico) modalControleServico.classList.remove("fullscreen");
    if (modalControleServicoBody) {
        modalControleServicoBody.innerHTML = "";
    }
    if (modalControleServicoTitulo) modalControleServicoTitulo.innerText = "";
    if (modalControleServicoSubtitle) modalControleServicoSubtitle.innerText = "";
    if (controleServicoLider) controleServicoLider.innerText = "-";
    if (controleServicoControlador) controleServicoControlador.innerText = "-";
    if (controleServicoTotal) controleServicoTotal.innerText = "0";
    if (controleServicoRealizados) controleServicoRealizados.innerText = "0";
    if (controleServicoMetaDia) controleServicoMetaDia.innerText = "0.000";
    if (controleServicoUsPrev) controleServicoUsPrev.innerText = "0";
    if (controleServicoUsExec) controleServicoUsExec.innerText = "0";
    if (controleServicoProdutivos) controleServicoProdutivos.innerText = "0";
    if (controleServicoImprodutivos) controleServicoImprodutivos.innerText = "0";
    atualizarKpiControleServicoImpedimento(0);
    atualizarKpisAtendimentoControleServico();
    if (controleServicoTempoLacuna) controleServicoTempoLacuna.innerText = "00:00";
    if (currentModalContext) {
        currentModalContext.codigoEquipeControleServicoAtual = "";
        currentModalContext.percImprodEquipeAtual = 0;
    }
}

function toggleFullscreenControleServico() {
    if (!modalControleServico) return;
    modalControleServico.classList.toggle("fullscreen");
}

function abrirCodxControleServico() {
    const codigo = String(currentModalContext?.codigoEquipeControleServicoAtual || "").trim();
    if (!codigo) return;
    if (caixaDetalheFaixaDia) {
        document.body.appendChild(caixaDetalheFaixaDia);
        caixaDetalheFaixaDia.dataset.manterAberta = "1";
        caixaDetalheFaixaDia.classList.add("codx-sobre-controle");
    }
    abrirCaixaDetalheFaixaDia(codigo);
}

/* ================= MODAL CONFLITOS ================= */

function normalizarValorConflito(valor) {
    const s = String(valor ?? "").trim();
    return s ? s.replace(/\s+/g, " ") : "(vazio)";
}

function obterConflitosEquipes(data, uo, hora) {
    const dataCtx = String(data || "").trim();
    const uoCtx = String(uo || "").trim();
    const horaCtx = normalizarHora(hora);

    if (!dataCtx || !horaCtx) return [];

    const linhas = obterLinhasContextoModal(dataCtx, uoCtx);
    const mapa = {};

    linhas.forEach(l => {
        if (obterHoraLinha(l) !== horaCtx) return;

        const cod = obterCodigoEquipeLinha(l);
        if (!cod) return;

        if (!mapa[cod]) {
            mapa[cod] = {
                codigo: cod,
                equipe: String(l["Nome"] || "-"),
                linhas: 0,
                supervisor: new Set(),
                lider: new Set(),
                controlador: new Set()
            };
        }

        mapa[cod].linhas += 1;
        mapa[cod].equipe = mapa[cod].equipe === "-" ? String(l["Nome"] || "-") : mapa[cod].equipe;

        mapa[cod].supervisor.add(normalizarValorConflito(l["SUPERVISOR - SETOR"]));
        mapa[cod].lider.add(normalizarValorConflito(l["LIDER DE POSTO - SETOR"]));
        mapa[cod].controlador.add(normalizarValorConflito(l["CONTROLADOR - SETOR"]));
    });

    return Object.values(mapa)
        .filter(item =>
            item.linhas > 1 &&
            (item.supervisor.size > 1 || item.lider.size > 1 || item.controlador.size > 1)
        )
        .sort((a, b) => (b.linhas - a.linhas) || String(a.codigo).localeCompare(String(b.codigo)));
}

function formatarListaConflito(setValores) {
    const valores = [...(setValores || [])];
    return valores.length ? valores.join(" | ") : "(vazio)";
}

function badgeConflito(setValores) {
    return (setValores && setValores.size > 1) ? `<span class="conflito-badge">CONFLITO</span>` : "";
}

function abrirModalConflitos() {
    if (!modalConflitos || !modalConflitosBody) return;

    const data = String(dataSelect?.value || "").trim();
    const uo = String(uoSelect?.value || "").trim();
    if (!data) {
        alert("Selecione uma data.");
        return;
    }

    const horaRef = (() => {
        if (modoTabela === "total-horas") return ultimaFaixaDisponivel(uo, data) || "17";
        const raw = String(horaSelect?.value || "").trim();
        const tabelaTotal = raw.toUpperCase() === "TOTAL";
        const horaSel = tabelaTotal ? "" : normalizarHora(raw);
        return horaSel || ultimaFaixaDisponivel(uo, data) || "17";
    })();

    const conflitos = obterConflitosEquipes(data, uo, horaRef);
    if (kpiConflitosQtd) kpiConflitosQtd.innerText = String(conflitos.length);

    if (modalConflitosTitulo) {
        const dataTxt = formatarDataBR(data);
        const uoTxt = uo ? `UO ${uo} - ` : "";
        modalConflitosTitulo.innerText = `CONFLITOS - ${uoTxt}${dataTxt} - ${horaRef}h`;
    }

    if (conflitoDetalheTitulo) {
        conflitoDetalheTitulo.innerText = "Selecione uma equipe para ver as linhas do conflito.";
    }
    if (conflitoDetalheBody) {
        conflitoDetalheBody.innerHTML = `<tr><td colspan="7">Nenhuma equipe selecionada.</td></tr>`;
    }

    modalConflitosBody.innerHTML = conflitos.length ? conflitos.map(c => `
        <tr>
            <td>${escapeHtml(c.codigo)}</td>
            <td class="col-equipe">${escapeHtml(c.equipe)}</td>
            <td>${escapeHtml(String(c.linhas))}</td>
            <td>${escapeHtml(formatarListaConflito(c.supervisor))}${badgeConflito(c.supervisor)}</td>
            <td>${escapeHtml(formatarListaConflito(c.lider))}${badgeConflito(c.lider)}</td>
            <td>${escapeHtml(formatarListaConflito(c.controlador))}${badgeConflito(c.controlador)}</td>
        </tr>
    `).join("") : `
        <tr><td colspan="6">Nenhum conflito encontrado para ${horaRef}h.</td></tr>
    `;

    setTimeout(() => {
        const rows = modalConflitosBody.querySelectorAll("tr");
        rows.forEach(row => {
            const codigo = String(row.children?.[0]?.innerText || "").trim();
            if (!codigo) return;
            row.addEventListener("click", () => selecionarConflitoEquipe(codigo, horaRef));
        });
    }, 0);

    modalConflitos.classList.remove("hidden");
}

function fecharModalConflitos() {
    if (modalConflitos) modalConflitos.classList.add("hidden");
}

function selecionarConflitoEquipe(codigoEquipe, horaRef) {
    if (!conflitoDetalheBody) return;

    const data = String(dataSelect?.value || "").trim();
    const uo = String(uoSelect?.value || "").trim();
    const horaCtx = normalizarHora(horaRef);
    const cod = String(codigoEquipe || "").trim();
    if (!data || !horaCtx || !cod) return;

    const linhas = obterLinhasContextoModal(data, uo)
        .filter(l => obterHoraLinha(l) === horaCtx && String(obterCodigoEquipeLinha(l)) === cod);

    const baseSup = linhas.length ? normalizarValorConflito(linhas[0]["SUPERVISOR - SETOR"]) : "";
    const baseLid = linhas.length ? normalizarValorConflito(linhas[0]["LIDER DE POSTO - SETOR"]) : "";
    const baseCtl = linhas.length ? normalizarValorConflito(linhas[0]["CONTROLADOR - SETOR"]) : "";

    if (conflitoDetalheTitulo) {
        const nomeEquipe = String(linhas[0]?.["Nome"] || "-");
        conflitoDetalheTitulo.innerText = `Linhas do conflito - ${cod} - ${nomeEquipe} - ${horaCtx}h`;
    }

    if (!linhas.length) {
        conflitoDetalheBody.innerHTML = `<tr><td colspan="7">Nenhuma linha encontrada para esta equipe/hora.</td></tr>`;
        return;
    }

    conflitoDetalheBody.innerHTML = linhas.map(l => {
        const sup = normalizarValorConflito(l["SUPERVISOR - SETOR"]);
        const lid = normalizarValorConflito(l["LIDER DE POSTO - SETOR"]);
        const ctl = normalizarValorConflito(l["CONTROLADOR - SETOR"]);

        const supCls = sup !== baseSup ? "linha-diff" : "";
        const lidCls = lid !== baseLid ? "linha-diff" : "";
        const ctlCls = ctl !== baseCtl ? "linha-diff" : "";

        return `
            <tr>
                <td>${escapeHtml(obterHoraLinha(l) || "-")}</td>
                <td class="col-equipe">${escapeHtml(String(l["Nome"] || "-"))}</td>
                <td class="${supCls}">${escapeHtml(sup)}</td>
                <td class="${lidCls}">${escapeHtml(lid)}</td>
                <td class="${ctlCls}">${escapeHtml(ctl)}</td>
                <td>${escapeHtml(String(l["Meta Prog."] ?? "-"))}</td>
                <td>${escapeHtml(String(obterProducaoLinha(l) ?? "-"))}</td>
            </tr>
        `;
    }).join("");
}

/* ================= FULLSCREEN MODAL ================= */

function toggleFullscreenModal() {
    const modal = document.getElementById("modalEquipes");
    const btn = document.getElementById("btnFullscreen");

    modal.classList.toggle("fullscreen");

    btn.innerText =
        modal.classList.contains("fullscreen")
            ? "⤢ Sair da tela cheia"
            : "⛶ Tela cheia";
}

function controlarBotaoFullscreen(qtd) {
    const btn = document.getElementById("btnFullscreen");

    if (qtd > 0) {
        btn.classList.remove("hidden");
        btn.innerText = "⛶ Tela cheia";
    } else {
        btn.classList.add("hidden");
    }
}

/* ================= FILTROS DA TABELA PRINCIPAL ================= */

function adicionarFiltrosExcel() {
    const colunasPermitidas = [
        "SUPERVISOR",
        "LIDER DE POSTO",
        "CONTROLADOR",
        "09H",
        "11H",
        "13H",
        "15H",
        "17H"
    ];

    const ths = document.querySelectorAll("#theadRow th");

    ths.forEach((th, colIndex) => {
        const tituloColuna = th.innerText.trim().toUpperCase();
        if (!colunasPermitidas.includes(tituloColuna)) return;
        if (th.querySelector(".filtro-icon")) return;

        const icon = document.createElement("span");
        icon.innerHTML = "⏷";
        icon.className = "filtro-icon";

        const box = document.createElement("div");
        box.className = "filtro-box hidden";

        const lista = document.createElement("div");
        box.appendChild(lista);

        const linhas = document.querySelectorAll("#tbody tr");
        const valores = new Set();

        linhas.forEach(linha => {
            if (linha.classList.contains("resultado")) return;
            if (linha.style.display === "none") return;

            const celula = linha.children[colIndex];
            if (celula) valores.add(celula.innerText.trim());
        });

        const valoresOrdenados = [...valores].sort((a, b) => a.localeCompare(b, "pt-BR"));

        const labelTodas = document.createElement("label");
        const checkboxTodas = document.createElement("input");

        checkboxTodas.type = "checkbox";
        checkboxTodas.checked = true;

        labelTodas.appendChild(checkboxTodas);
        labelTodas.append(" Selecionar Todas");

        lista.appendChild(labelTodas);

        const separador = document.createElement("hr");
        separador.style.margin = "6px 0";
        lista.appendChild(separador);

        valoresOrdenados.forEach(valor => {
            const label = document.createElement("label");
            const checkbox = document.createElement("input");

            checkbox.type = "checkbox";
            checkbox.value = valor;

            if (!filtrosAtivos[colIndex]) {
                checkbox.checked = true;
            } else {
                checkbox.checked = filtrosAtivos[colIndex].includes(valor);
            }

            checkbox.addEventListener("change", () => {
                const todos = lista.querySelectorAll("input[type='checkbox']:not(:first-child)");
                const marcados = [...todos].filter(c => c.checked).length;
                checkboxTodas.checked = marcados === todos.length;
            });

            label.appendChild(checkbox);
            label.append(" " + valor);
            lista.appendChild(label);
        });

        checkboxTodas.addEventListener("change", () => {
            const checkboxes = lista.querySelectorAll("input[type='checkbox']");
            checkboxes.forEach((cb, index) => {
                if (index !== 0) cb.checked = checkboxTodas.checked;
            });
        });

        const areaBotoes = document.createElement("div");
        areaBotoes.style.display = "flex";
        areaBotoes.style.justifyContent = "flex-end";
        areaBotoes.style.gap = "8px";
        areaBotoes.style.marginTop = "10px";

        const btnOk = document.createElement("button");
        btnOk.textContent = "OK";

        const btnCancelar = document.createElement("button");
        btnCancelar.textContent = "Cancelar";

        areaBotoes.appendChild(btnOk);
        areaBotoes.appendChild(btnCancelar);
        box.appendChild(areaBotoes);

        btnOk.addEventListener("click", (e) => {
            e.stopPropagation();

            const checkboxes = lista.querySelectorAll("input[type='checkbox']");
            const selecionados = [...checkboxes]
                .slice(1)
                .filter(c => c.checked)
                .map(c => c.value);

            if (selecionados.length === 0 || selecionados.length === valoresOrdenados.length) {
                delete filtrosAtivos[colIndex];
                icon.classList.remove("ativo");
            } else {
                filtrosAtivos[colIndex] = selecionados;
                icon.classList.add("ativo");
            }

            aplicarFiltrosCombinados();
            box.classList.add("hidden");
        });

        btnCancelar.addEventListener("click", (e) => {
            e.stopPropagation();
            box.classList.add("hidden");
        });

        icon.addEventListener("click", (e) => {
            e.stopPropagation();
            document.querySelectorAll(".filtro-box").forEach(b => {
                if (b !== box) b.classList.add("hidden");
            });
            box.classList.toggle("hidden");
        });

        box.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        document.addEventListener("click", (e) => {
            if (!box.contains(e.target) && !icon.contains(e.target)) {
                box.classList.add("hidden");
            }
        });

        th.appendChild(icon);
        th.appendChild(box);
    });
}

function aplicarFiltrosCombinados() {
    const linhas = document.querySelectorAll("#tbody tr");

    linhas.forEach(linha => {
        if (linha.classList.contains("resultado")) return;

        let mostrar = true;

        Object.keys(filtrosAtivos).forEach(col => {
            const celula = linha.children[col];
            if (!celula) return;

            const valor = celula.innerText.trim();
            if (!filtrosAtivos[col].includes(valor)) mostrar = false;
        });

        linha.style.display = mostrar ? "" : "none";
    });
}

/* ================= FILTROS DO MODAL ================= */

function adicionarFiltrosModal() {
    const colunasPermitidas = [
        "Cód. Eq.",
        "Equipes",
        "Faixa Dia",
        "09h",
        "11h",
        "13h",
        "15h",
        "17h",
        "% IMPROD.",
        "STATUS JORNADA"
    ];

    const ths = document.querySelectorAll("#modalEquipes thead th");

    ths.forEach((th, colIndex) => {
        const titulo = th.innerText.trim();
        if (!colunasPermitidas.includes(titulo)) return;
        if (th.querySelector(".filter-pro")) return;

        const icon = document.createElement("span");
        icon.innerHTML = " ▾";
        icon.className = "filter-pro";
        icon.style.cursor = "pointer";
        icon.style.fontSize = "11px";
        icon.style.opacity = "0.6";

        th.appendChild(icon);

        icon.addEventListener("click", (e) => {
            e.stopPropagation();
            abrirFiltroProfissional(th, colIndex, icon);
        });
    });
}

function abrirFiltroProfissional(th, colIndex, icon) {
    document.querySelectorAll(".painel-flutuante").forEach(p => p.remove());

    const painel = document.createElement("div");
    painel.className = "painel-flutuante";

    const busca = document.createElement("input");
    busca.type = "text";
    busca.placeholder = "Buscar...";
    busca.className = "painel-busca";

    const lista = document.createElement("div");
    lista.className = "painel-lista";

    const footer = document.createElement("div");
    footer.className = "painel-footer";

    const btnApply = document.createElement("button");
    btnApply.textContent = "Aplicar";

    const btnClear = document.createElement("button");
    btnClear.textContent = "Limpar";

    footer.appendChild(btnClear);
    footer.appendChild(btnApply);

    painel.appendChild(busca);
    painel.appendChild(lista);
    painel.appendChild(footer);

    document.body.appendChild(painel);

    const rect = th.getBoundingClientRect();
    painel.style.top = rect.bottom + 4 + "px";
    painel.style.left = rect.left + "px";

    const linhas = document.querySelectorAll("#modalBody tr");
    const valores = new Set();

    linhas.forEach(linha => {
        if (linha.style.display === "none") return;

        const celula = linha.children[colIndex];
        if (celula) valores.add(celula.innerText.trim());
    });

    const valoresOrdenados = [...valores].sort((a, b) => a.localeCompare(b, "pt-BR"));
    const selecionadosAtuais = filtrosModal[colIndex];

    const labelTodas = document.createElement("label");
    labelTodas.className = "painel-item painel-item-todas";

    const checkboxTodas = document.createElement("input");
    checkboxTodas.type = "checkbox";
    checkboxTodas.checked = !selecionadosAtuais || selecionadosAtuais.length === valoresOrdenados.length;

    labelTodas.appendChild(checkboxTodas);
    labelTodas.append(" Selecionar todas");
    lista.appendChild(labelTodas);

    valoresOrdenados.forEach(valor => {
        const label = document.createElement("label");
        label.className = "painel-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = valor;
        checkbox.checked = !selecionadosAtuais || selecionadosAtuais.includes(valor);

        checkbox.addEventListener("change", () => {
            const checkboxesItens = [...lista.querySelectorAll(".painel-item input")]
                .filter(cb => cb !== checkboxTodas);
            checkboxTodas.checked = checkboxesItens.every(cb => cb.checked);
        });

        label.appendChild(checkbox);
        label.append(" " + valor);

        lista.appendChild(label);
    });

    checkboxTodas.addEventListener("change", () => {
        lista.querySelectorAll(".painel-item input").forEach(cb => {
            if (cb !== checkboxTodas) cb.checked = checkboxTodas.checked;
        });
    });

    busca.addEventListener("keyup", () => {
        const termo = busca.value.toLowerCase();
        lista.querySelectorAll(".painel-item").forEach((l, index) => {
            if (index === 0) {
                l.style.display = "flex";
                return;
            }
            l.style.display =
                l.innerText.toLowerCase().includes(termo)
                    ? "flex"
                    : "none";
        });
    });

    btnApply.addEventListener("click", () => {
        const selecionados = [...lista.querySelectorAll(".painel-item input:checked")]
            .filter(c => c !== checkboxTodas)
            .map(c => c.value);

        if (selecionados.length === 0 || selecionados.length === valores.size) {
            delete filtrosModal[colIndex];
        } else {
            filtrosModal[colIndex] = selecionados;
        }

        icon.style.opacity =
            selecionados.length < valores.size ? "1" : "0.6";

        aplicarFiltrosModal();
        painel.remove();
    });

    btnClear.addEventListener("click", () => {
        lista.querySelectorAll(".painel-item input").forEach(cb => cb.checked = true);
        delete filtrosModal[colIndex];
        aplicarFiltrosModal();
        painel.remove();
        icon.style.opacity = "0.6";
    });

    document.addEventListener("click", function fechar(e) {
        if (!painel.contains(e.target)) {
            painel.remove();
            document.removeEventListener("click", fechar);
        }
    });
}

function aplicarFiltrosModal() {
    const linhas = document.querySelectorAll("#modalBody tr");
    const acordosPainel = obterMapaAcordosPainel(currentModalContext);
    const justificativasPainel = obterMapaJustificativasPainel(currentModalContext);

    linhas.forEach(linha => {
        let mostrar = true;
        const codigoLinha = String(linha.dataset.codigo || "").trim();

        Object.keys(filtrosModal).forEach(col => {
            const valor = linha.children[col]?.innerText.trim();
            if (!filtrosModal[col].includes(valor)) mostrar = false;
        });

        if (mostrar && currentModalKpiFilter === "equipes-acordadas") {
            mostrar = !!acordosPainel[codigoLinha];
        }

        if (mostrar && currentModalKpiFilter === "equipes-justificadas") {
            const item = justificativasPainel[codigoLinha];
            mostrar = !!String(item?.justificativa || "").trim();
        }

        linha.style.display = mostrar ? "" : "none";
    });

    atualizarKpisModalPorLinhasVisiveis();
}

/* ================= EVENTOS DRAWER ================= */

if (btnMenuModo && drawerModo && drawerOverlay) {
    btnMenuModo.addEventListener("click", () => {
        drawerModo.classList.remove("hidden");
        drawerOverlay.classList.remove("hidden");
    });

    if (btnFecharDrawer) {
        btnFecharDrawer.addEventListener("click", () => {
            drawerModo.classList.add("hidden");
            drawerOverlay.classList.add("hidden");
        });
    }

    drawerOverlay.addEventListener("click", () => {
        drawerModo.classList.add("hidden");
        drawerOverlay.classList.add("hidden");
    });

    const fecharDrawer = () => {
        drawerModo.classList.add("hidden");
        drawerOverlay.classList.add("hidden");
    };

    const executarAcaoDrawer = (acao) => {
        const a = String(acao || "").trim();
        if (!a) return;

        if (a === "abrir-acordos") return typeof abrirHistoricoAcordos === "function" ? abrirHistoricoAcordos() : null;
        if (a === "abrir-justificativas") return typeof abrirHistoricoJustificativas === "function" ? abrirHistoricoJustificativas() : null;
        if (a === "abrir-acordos-rs") return typeof abrirModalAcordosRs === "function" ? abrirModalAcordosRs() : null;
        if (a === "abrir-busca-global") return typeof abrirBuscaGlobal === "function" ? abrirBuscaGlobal() : null;
        if (a === "abrir-investigar-equipe") return typeof abrirInvestigarEquipe === "function" ? abrirInvestigarEquipe() : null;
        if (a === "abrir-conflitos") return typeof abrirModalConflitos === "function" ? abrirModalConflitos() : null;
        if (a === "abrir-andon") return typeof abrirPainelAndon === "function" ? abrirPainelAndon() : null;
        if (a === "limpar-filtros") {
            filtrosAtivos = {};
            return typeof aplicar === "function" ? aplicar() : null;
        }
        if (a === "recarregar-dados") return typeof carregarExcel === "function" ? carregarExcel() : null;

        if (a === "imprimir-relatorio") return typeof imprimirRelatorio === "function" ? imprimirRelatorio() : null;
        if (a === "salvar-pdf") return typeof salvarRelatorioPDF === "function" ? salvarRelatorioPDF() : null;
        if (a === "baixar-imagem") return typeof baixarRelatorioImagem === "function" ? baixarRelatorioImagem() : null;
        if (a === "exportar-backup-acordos") return typeof exportarBackupAcordos === "function" ? exportarBackupAcordos() : null;
        if (a === "importar-backup-acordos") {
            // abre o seletor de arquivo do backup
            if (typeof abrirImportacaoBackupAcordos === "function") return abrirImportacaoBackupAcordos();
            if (inputImportarBackupAcordos) {
                inputImportarBackupAcordos.value = "";
                inputImportarBackupAcordos.click();
            }
            return;
        }
        if (a === "abrir-diagnostico") return typeof abrirModalDiagnostico === "function" ? abrirModalDiagnostico() : null;
        if (a === "abrir-health") return window.open("/api/health", "_blank");
    };

    menuModoItens.forEach(item => {
        item.addEventListener("click", () => {
            const acao = item.dataset.action;
            const modo = item.dataset.modo;

            if (acao) {
                executarAcaoDrawer(acao);
                fecharDrawer();
                return;
            }

            if (modo) {
                setModo(modo);
                fecharDrawer();
            }
        });
    });
}

document.addEventListener("click", (event) => {
    if (!caixaDetalheFaixa || caixaDetalheFaixa.classList.contains("hidden")) return;

    const clicouNaCaixa = caixaDetalheFaixa.contains(event.target);
    const clicouNoNomeEquipe = event.target.closest(".equipe-detalhe-click");
    if (!clicouNaCaixa && !clicouNoNomeEquipe) {
        fecharCaixaDetalheFaixa();
    }
});

/* ================= EVENTOS GERAIS ================= */


/* ================= EVENTOS GERAIS ================= */

uoSelect.onchange = () => {
    popularSemanasDisponiveis();
    if (modoTabela === "total-horas") {
        garantirDadosTotalHoras().finally(() => aplicar());
        return;
    }
    carregarDadosPainelAtual({ forcar: true }).finally(() => {
        popularSemanasDisponiveis();
        aplicar();
    });
};

tipoSelect.onchange = aplicar;

if (turnoSelect) {
    turnoSelect.onchange = () => {
        const turnoEspecial = turnoTardeAtivo() || turnoMadrugadaAtivo();

        if (modoTabela === "diario" || modoTabela === "geral" || modoTabela === "total-horas") {
            const carregar = turnoEspecial || modoTabela === "total-horas"
                ? garantirDadosTotalHoras()
                : carregarDadosPainelAtual();
            carregar.finally(() => aplicar());
        }

        if (!currentModalContext) return;

        const ctx = { ...currentModalContext };
        if (ctx.tipoModal === "faixa") {
            abrirModalFaixa(ctx.supervisor, ctx.horaClicada);
            return;
        }

        if (ctx.tipoModal === "equipes") {
            abrirModalEquipes(ctx.supervisor || null, ctx.faixaClicada || null, ctx.horaClicada);
        }
    };
}

if (dataSelect) {
    dataSelect.onchange = () => {
        if (modoTabela === "total-horas") {
            garantirDadosTotalHoras().finally(() => aplicar());
            return;
        }

        if (modoTabela === "diario" || modoTabela === "geral") {
            carregarDadosPainelAtual({ forcar: true }).finally(() => aplicar());
        }
    };
}

if (horaSelect) {
    horaSelect.onchange = () => {
        if (modoTabela === "diario" || modoTabela === "geral" || modoTabela === "total-horas") {
            aplicar();
        }
    };
}

if (semanaSelect) {
    semanaSelect.onchange = () => {
        if (modoTabela === "semanal") {
            carregarDadosPainelAtual({ forcar: true }).finally(() => aplicar());
        }
    };
}

if (mesSelect) {
    mesSelect.onchange = () => {
        if (modoTabela === "mensal" || modoTabela === "quinzena1" || modoTabela === "quinzena2") {
            carregarDadosPainelAtual({ forcar: true }).finally(() => aplicar());
        }
    };
}

if (historicoJustPeriodo) {
    historicoJustPeriodo.onchange = () => {
        atualizarCamposHistoricoJustificativas();
        popularSelectSupervisorHistorico(
            historicoJustSupervisor,
            historicoJustData?.value,
            historicoJustUo?.value,
            historicoJustSupervisor?.value
        );
        if (currentJustificativasModo === "historico" && !modalJustificativas?.classList.contains("hidden")) {
            aplicarHistoricoJustificativas();
        }
    };
}

if (historicoJustData) {
    historicoJustData.onchange = () => {
        popularSelectSupervisorHistorico(
            historicoJustSupervisor,
            historicoJustData.value,
            historicoJustUo?.value,
            historicoJustSupervisor?.value
        );
        if (currentJustificativasModo === "historico" && !modalJustificativas?.classList.contains("hidden")) {
            aplicarHistoricoJustificativas();
        }
    };
}

if (historicoJustMes) {
    historicoJustMes.onchange = () => {
        if (currentJustificativasModo === "historico" && !modalJustificativas?.classList.contains("hidden")) {
            aplicarHistoricoJustificativas();
        }
    };
}

if (historicoJustUo) {
    historicoJustUo.onchange = () => {
        popularSelectSupervisorHistorico(
            historicoJustSupervisor,
            historicoJustData?.value,
            historicoJustUo.value,
            ""
        );
        if (currentJustificativasModo === "historico" && !modalJustificativas?.classList.contains("hidden")) {
            aplicarHistoricoJustificativas();
        }
    };
}

if (historicoJustSupervisor) {
    historicoJustSupervisor.onchange = () => {
        if (currentJustificativasModo === "historico" && !modalJustificativas?.classList.contains("hidden")) {
            aplicarHistoricoJustificativas();
        }
    };
}

if (historicoAcordoPeriodo) {
    historicoAcordoPeriodo.onchange = () => {
        atualizarCamposHistoricoAcordos();
        popularSupervisorHistoricoAcordos();
        if (currentAcordosModo === "historico" && !modalAcordos?.classList.contains("hidden")) {
            aplicarHistoricoAcordos();
        }
    };
}

if (historicoAcordoData) {
    historicoAcordoData.onchange = () => {
        popularSupervisorHistoricoAcordos();
        if (currentAcordosModo === "historico" && !modalAcordos?.classList.contains("hidden")) {
            aplicarHistoricoAcordos();
        }
    };
}

if (historicoAcordoMes) {
    historicoAcordoMes.onchange = () => {
        if (currentAcordosModo === "historico" && !modalAcordos?.classList.contains("hidden")) {
            aplicarHistoricoAcordos();
        }
    };
}

if (historicoAcordoUo) {
    historicoAcordoUo.onchange = () => {
        popularSupervisorHistoricoAcordos();
        if (currentAcordosModo === "historico" && !modalAcordos?.classList.contains("hidden")) {
            aplicarHistoricoAcordos();
        }
    };
}

if (historicoAcordoSupervisor) {
    historicoAcordoSupervisor.onchange = () => {
        if (currentAcordosModo === "historico" && !modalAcordos?.classList.contains("hidden")) {
            aplicarHistoricoAcordos();
        }
    };
}

/* =========================
   IMPRESSÃO / EXPORTAÇÃO
========================= */

function imprimirRelatorio() {
    window.print();
}

function salvarRelatorioPDF() {
    window.print();
}

function abrirPainelAndon() {
    const url = "index1.html";
    const novaAba = window.open(url, "_blank", "noopener,noreferrer");
    if (!novaAba) {
        window.location.href = url;
    }
}

function carregarIframeSobDemanda(iframe) {
    if (!iframe) return;
    const srcAtual = String(iframe.getAttribute("src") || "").trim();
    if (srcAtual && srcAtual !== "about:blank") return;

    const destino = String(iframe.dataset?.src || "").trim();
    if (destino) iframe.src = destino;
}

async function baixarRelatorioImagem() {
    const area = document.getElementById("areaRelatorio");

    if (!area) {
        alert("Área do relatório não encontrada.");
        return;
    }

    try {
        await garantirHtml2Canvas();
    } catch {
        alert("Não foi possível carregar o gerador de imagem.");
        return;
    }

    html2canvas(area, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "relatorio-producao.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }).catch(() => {
        alert("Não foi possível gerar a imagem do relatório.");
    });
}

/* =========================
   IMPRESSÃO / EXPORTAÇÃO DO MODAL
========================= */

function imprimirModal() {
    const conteudo = document.getElementById("areaModalRelatorio");
    if (!conteudo) {
        alert("Área do modal não encontrada.");
        return;
    }

    const janela = window.open("", "_blank", "width=1400,height=900");
    if (!janela) {
        alert("Não foi possível abrir a janela de impressão.");
        return;
    }

    janela.document.write(`
        <html>
        <head>
            <title>Impressão do Modal</title>
            <style>
                body{
                    font-family: Arial, Helvetica, sans-serif;
                    margin: 20px;
                    color: #111827;
                }
                table{
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 11px;
                }
                th, td{
                    border: 1px solid #cbd5e1;
                    padding: 6px;
                    text-align: center;
                    white-space: nowrap;
                }
                thead th{
                    background: #2f5aa0;
                    color: white;
                }
                .col-equipe{
                    text-align: left;
                }
            </style>
        </head>
        <body>
            ${conteudo.innerHTML}
        </body>
        </html>
    `);

    janela.document.close();
    janela.focus();
    janela.print();
    janela.close();
}

function salvarModalPDF() {
    imprimirModal();
}

async function baixarModalImagem() {
    const titulo = document.getElementById("modalTitulo");
    const area = document.getElementById("areaModalRelatorio");

    if (!titulo || !area) {
        alert("Título ou tabela do modal não encontrados.");
        return;
    }

    try {
        await garantirHtml2Canvas();
    } catch {
        alert("Não foi possível carregar o gerador de imagem.");
        return;
    }

    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.top = "-9999px";
    wrapper.style.left = "-9999px";
    wrapper.style.zIndex = "99999";
    wrapper.style.background = "#ffffff";
    wrapper.style.color = "#111827";
    wrapper.style.padding = "20px";
    wrapper.style.overflow = "visible";
    wrapper.style.width = "auto";

    const cloneTitulo = titulo.cloneNode(true);
    cloneTitulo.style.margin = "0 0 12px 0";
    cloneTitulo.style.fontSize = "18px";
    cloneTitulo.style.fontWeight = "700";

    const cloneArea = area.cloneNode(true);
    cloneArea.style.maxHeight = "none";
    cloneArea.style.overflow = "visible";
    cloneArea.querySelectorAll(".table-wrap").forEach(el => {
        el.style.maxHeight = "none";
        el.style.overflow = "visible";
    });

    // Remove sticky do cabeçalho para renderizar a tabela corretamente no html2canvas
    cloneArea.querySelectorAll("th").forEach(th => {
        th.style.position = "relative";
        th.style.top = "auto";
        th.style.zIndex = "1";
    });

    wrapper.appendChild(cloneTitulo);
    wrapper.appendChild(cloneArea);
    document.body.appendChild(wrapper);

    html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "modal-equipes.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }).catch(() => {
        alert("Não foi possível gerar a imagem do modal.");
    }).finally(() => {
        wrapper.remove();
    });
}

async function baixarModalJustificativasImagem() {
    const titulo = document.getElementById("modalJustificativasTitulo");
    const meta = document.getElementById("justificativasMeta");
    const area = areaJustificativasExport || document.getElementById("areaJustificativasExport");

    if (!titulo || !area) {
        alert("Título ou área de justificativas não encontrados.");
        return;
    }

    try {
        await garantirHtml2Canvas();
    } catch {
        alert("Não foi possível carregar o gerador de imagem.");
        return;
    }

    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.top = "-9999px";
    wrapper.style.left = "-9999px";
    wrapper.style.zIndex = "99999";
    wrapper.style.background = "#ffffff";
    wrapper.style.color = "#111827";
    wrapper.style.padding = "20px";
    wrapper.style.overflow = "visible";
    wrapper.style.width = "auto";

    const cloneTitulo = titulo.cloneNode(true);
    cloneTitulo.style.margin = "0 0 4px 0";
    cloneTitulo.style.fontSize = "18px";
    cloneTitulo.style.fontWeight = "800";
    cloneTitulo.style.color = "#111827";

    const cloneMeta = meta && String(meta.innerText || "").trim() ? meta.cloneNode(true) : null;
    if (cloneMeta) {
        cloneMeta.style.margin = "0 0 12px 0";
        cloneMeta.style.fontSize = "12px";
        cloneMeta.style.fontWeight = "700";
        cloneMeta.style.color = "#334155";
    }

    const cloneArea = area.cloneNode(true);
    cloneArea.style.maxHeight = "none";
    cloneArea.style.overflow = "visible";
    cloneArea.querySelectorAll(".table-wrap").forEach(el => {
        el.style.maxHeight = "none";
        el.style.overflow = "visible";
    });

    // Remove sticky do cabeçalho para renderizar a tabela corretamente no html2canvas
    cloneArea.querySelectorAll("th").forEach(th => {
        th.style.position = "relative";
        th.style.top = "auto";
        th.style.zIndex = "1";
    });

    wrapper.appendChild(cloneTitulo);
    if (cloneMeta) wrapper.appendChild(cloneMeta);
    wrapper.appendChild(cloneArea);
    document.body.appendChild(wrapper);

    html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "modal-justificativas-grafico-tabela.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }).catch(() => {
        alert("Não foi possível gerar a imagem das justificativas.");
    }).finally(() => {
        wrapper.remove();
    });
}

/* ================= INICIALIZAÇÃO ================= */

function imprimirModalAcordos() {
    const conteudo = document.getElementById("areaModalAcordos");
    if (!conteudo) {
        alert("Área do modal de acordos não encontrada.");
        return;
    }

    const janela = window.open("", "_blank", "width=1600,height=900");
    if (!janela) {
        alert("Não foi possível abrir a janela de impressão.");
        return;
    }

    janela.document.write(`
        <html>
        <head>
            <title>Impressão dos Acordos</title>
            <style>
                body{
                    font-family: Arial, Helvetica, sans-serif;
                    margin: 20px;
                    color: #111827;
                }
                table{
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 11px;
                }
                th, td{
                    border: 1px solid #cbd5e1;
                    padding: 6px;
                    text-align: center;
                    white-space: nowrap;
                }
                thead th{
                    background: #2f5aa0;
                    color: white;
                }
                .col-equipe{
                    text-align: left;
                }
            </style>
        </head>
        <body>
            <h2>${modalAcordosTitulo ? modalAcordosTitulo.innerText : "Relatorio de acordos"}</h2>
            ${conteudo.innerHTML}
        </body>
        </html>
    `);

    janela.document.close();
    janela.focus();
    janela.print();
    janela.close();
}

function salvarModalAcordosPDF() {
    imprimirModalAcordos();
}

async function baixarModalAcordosImagem() {
    const titulo = document.getElementById("modalAcordosTitulo");
    const area = document.getElementById("areaModalAcordos");

    if (!titulo || !area) {
        alert("Título ou área do modal de acordos não encontrados.");
        return;
    }

    try {
        await garantirHtml2Canvas();
    } catch {
        alert("Não foi possível carregar o gerador de imagem.");
        return;
    }

    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.top = "-9999px";
    wrapper.style.left = "-9999px";
    wrapper.style.zIndex = "99999";
    wrapper.style.background = "#ffffff";
    wrapper.style.color = "#111827";
    wrapper.style.padding = "20px";
    wrapper.style.overflow = "visible";
    wrapper.style.width = "auto";

    const cloneTitulo = titulo.cloneNode(true);
    cloneTitulo.style.margin = "0 0 12px 0";
    cloneTitulo.style.fontSize = "18px";
    cloneTitulo.style.fontWeight = "700";

    const cloneArea = area.cloneNode(true);
    cloneArea.style.maxHeight = "none";
    cloneArea.style.overflow = "visible";
    cloneArea.querySelectorAll(".table-wrap").forEach(el => {
        el.style.maxHeight = "none";
        el.style.overflow = "visible";
    });
    cloneArea.querySelectorAll("th").forEach(th => {
        th.style.position = "relative";
        th.style.top = "auto";
        th.style.zIndex = "1";
    });

    wrapper.appendChild(cloneTitulo);
    wrapper.appendChild(cloneArea);
    document.body.appendChild(wrapper);

    html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "modal-acordos.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }).catch(() => {
        alert("Não foi possível gerar a imagem do modal de acordos.");
    }).finally(() => {
        wrapper.remove();
    });
}

setModo("diario", false);
configurarAcoesKpisModal();
if (inputImportarBackupAcordos) {
    inputImportarBackupAcordos.addEventListener("change", importarBackupAcordos);
}
carregarPresetsJustificativas();
carregarExcel().catch((error) => {
    console.error("Falha ao carregar painel:", error);
    limparTelaSemDados(tipoSelect?.value || "SUPERVISOR", "Falha ao carregar os dados do painel.");
});
setTimeout(() => {
    hidratarBaseAcordos().catch((error) => {
        console.error("Falha ao hidratar acordos:", error);
    });
}, 0);
carregarStatusDados();
setInterval(carregarStatusDados, 5 * 60 * 1000);
