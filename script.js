/* ================= VARIÁVEIS ================= */

const uoSelect = document.getElementById("uoSelect");
const periodoTabelaSelect = document.getElementById("periodoTabelaSelect");
const dataSelect = document.getElementById("dataSelect");
const semanaSelect = document.getElementById("semanaSelect");
const mesSelect = document.getElementById("mesSelect");
const semanaDisplay = document.getElementById("semanaDisplay");
const semanaClear = document.getElementById("semanaClear");
const semanaPopup = document.getElementById("semanaPopup");
const mesDisplay = document.getElementById("mesDisplay");
const mesClear = document.getElementById("mesClear");
const mesPopup = document.getElementById("mesPopup");
const periodoInicioSelect = document.getElementById("periodoInicioSelect");
const periodoFimSelect = document.getElementById("periodoFimSelect");
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
const grupoPeriodoInicio = document.getElementById("grupoPeriodoInicio");
const grupoPeriodoFim = document.getElementById("grupoPeriodoFim");

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
const modalRc07 = document.getElementById("modalRc07");
const modalRc07Body = document.getElementById("modalRc07Body");
const modalRc07Titulo = document.getElementById("modalRc07Titulo");
const modalRc07Meta = document.getElementById("modalRc07Meta");
const modalRc07FlegadasTabela = document.getElementById("modalRc07FlegadasTabela");
const modalRc07FlegadasTitulo = document.getElementById("modalRc07FlegadasTitulo");
const modalRc07FlegadasMeta = document.getElementById("modalRc07FlegadasMeta");
const modalRc07FlegadasBody = document.getElementById("modalRc07FlegadasBody");
const kpiRc07Total = document.getElementById("kpiRc07Total");
const kpiRc07Equipes = document.getElementById("kpiRc07Equipes");
const kpiRc07Meta = document.getElementById("kpiRc07Meta");
const rc07Data = document.getElementById("rc07Data");
const rc07Uo = document.getElementById("rc07Uo");
const rc07Supervisor = document.getElementById("rc07Supervisor");
const btnRc07Aplicar = document.getElementById("btnRc07Aplicar");
const btnFullscreenRc07 = document.getElementById("btnFullscreenRc07");
const btnFullscreenRc07Flegadas = document.getElementById("btnFullscreenRc07Flegadas");
const modalImprodTabelaGeral = document.getElementById("modalImprodTabelaGeral");
const modalImprodTabelaGeralTitulo = document.getElementById("modalImprodTabelaGeralTitulo");
const modalImprodTabelaGeralMeta = document.getElementById("modalImprodTabelaGeralMeta");
const modalImprodTabelaGeralBody = document.getElementById("modalImprodTabelaGeralBody");
const btnFullscreenImprodTabelaGeral = document.getElementById("btnFullscreenImprodTabelaGeral");
const modalAnaliseImprod = document.getElementById("modalAnaliseImprod");
const modalAnaliseImprodTitulo = document.getElementById("modalAnaliseImprodTitulo");
const modalAnaliseImprodMeta = document.getElementById("modalAnaliseImprodMeta");
const analiseImprodChart = document.getElementById("analiseImprodChart");
const analiseImprodHead = document.getElementById("analiseImprodHead");
const analiseImprodBody = document.getElementById("analiseImprodBody");
const btnAnaliseCodx = document.getElementById("btnAnaliseCodx");
const btnAnaliseJust = document.getElementById("btnAnaliseJust");
const btnFullscreenAnaliseImprod = document.getElementById("btnFullscreenAnaliseImprod");
const improdKpiEquipes = document.getElementById("improdKpiEquipes");
const improdKpiUsPerda = document.getElementById("improdKpiUsPerda");
const improdKpiTipoLider = document.getElementById("improdKpiTipoLider");
const improdKpiCodMaisUsado = document.getElementById("improdKpiCodMaisUsado");
const improdKpiPerc = document.getElementById("improdKpiPerc");
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
let carregandoDadosPainel = false;
let reqSeqDadosTotalHoras = 0;
let reqSeqDadosPainel = 0;
let chaveDadosCarregados = "";
let campoGlobal = "";
let modoTabela = "diario";
let currentImprodTabelaGeralLinhas = [];
let currentImprodTabelaGeralSort = { coluna: null, direcao: "desc" };
let currentAnaliseImprod = { visao: "codx", codx: [], justificativas: [], titulo: "", meta: "", eqDSemCodx: 0 };

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
const INTERVALO_ATUALIZACAO_TABELA_GERAL_MS = 60 * 60 * 1000;

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
const cacheLinhasDataUo = new Map();
const cacheUltimaFaixa = new Map();
const cacheCodigosTurno = new Map();
const cacheLoteProdEquipesTabelaGeral = new Map();

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
let tabelaGeralOrdenacao = { coluna: null, direcao: "asc" };
let analiseJustificativasFiltros = {};
let analiseJustificativasOrdenacao = { key: "", direcao: "asc" };

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

    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
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

function dataEhSextaFeira(dataRef) {
    const s = String(dataRef || "").trim();
    let iso = "";

    if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
        iso = s.slice(0, 10);
    } else if (/^\d{2}\/\d{2}\/\d{4}/.test(s)) {
        const [dia, mes, ano] = s.slice(0, 10).split("/");
        iso = `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
    }

    if (!iso) return false;

    const data = new Date(`${iso}T00:00:00`);
    return !Number.isNaN(data.getTime()) && data.getDay() === 5;
}

function obterHoraAcordoDia(dataRef = dataSelect?.value || "") {
    return dataEhSextaFeira(dataRef) ? "11" : "13";
}

function obterHoraFechamentoAcordoDia(dataRef = dataSelect?.value || "") {
    return dataEhSextaFeira(dataRef) ? "16" : "17";
}

function horaEhMomentoAcordo(hora, dataRef = dataSelect?.value || "") {
    return normalizarHora(hora) === obterHoraAcordoDia(dataRef);
}

function obterHorasPainelAcordos(dataRef = dataSelect?.value || "") {
    const horaFechamento = obterHoraFechamentoAcordoDia(dataRef);
    return ["09", "11", "13", "15", horaFechamento].filter((hora, idx, arr) => arr.indexOf(hora) === idx);
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
    const valorNomeEquipe = obterValorColuna(base, ["Nome", "NOME_EQUIPE", "NOME", "EQUIPE"]);

    preencherAliasColuna(base, valorUo, ["Cód.UO", "CÃ³d.UO", "CÃƒÂ³d.UO", "COD_UO", "UO"]);
    preencherAliasColuna(base, valorEquipe, ["Cód. Equipe", "CÃ³d. Equipe", "CÃƒÂ³d. Equipe", "COD_EQUIPE"]);
    preencherAliasColuna(base, valorClassificacao, ["Classificação", "ClassificaÃ§Ã£o", "ClassificaÃƒÂ§ÃƒÂ£o", "CLASSIFICACAO"]);
    preencherAliasColuna(base, valorProducao, ["Produção", "ProduÃ§Ã£o", "ProduÃƒÂ§ÃƒÂ£o", "PRODUCAO", "US_EXEC"]);
    preencherAliasColuna(base, valorPrimeiroAtendimento, ["1º Atendimento", "1Âº Atendimento", "1Ã‚Âº Atendimento", "PRIMEIRO_ATENDIMENTO"]);
    preencherAliasColuna(base, valorUltimoAtendimento, ["Ult. Atendimento", "ULTIMO_ATENDIMENTO"]);
    preencherAliasColuna(base, valorHora, ["Hora", "HORA", "hora_atualizacao"]);
    preencherAliasColuna(base, valorData, ["Data", "DATA"]);
    preencherAliasColuna(base, valorNomeEquipe, ["Nome", "NOME_EQUIPE", "NOME", "EQUIPE"]);

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

function limparCachesDadosPainel() {
    limparCachesModal();
    cacheLinhasDataUo.clear();
    cacheUltimaFaixa.clear();
    cacheCodigosTurno.clear();
    cacheLoteProdEquipesTabelaGeral.clear();
    cacheFaixas = {};
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
    return obterLinhasPorDataUo(data, uo);
}

function obterUoLinha(linha) {
    return String(
        obterValorColuna(linha, ["Cód.UO", "CÃ³d.UO", "CÃƒÂ³d.UO", "COD_UO", "UO"]) || ""
    ).trim();
}

function obterLinhasPorDataUo(data, uo = "") {
    const dataCtx = String(data || "").trim();
    const uoCtx = String(uo || "").trim();
    const cacheKey = ["linhasDataUo", dataCtx || "*", uoCtx || "*"].join("|");

    if (cacheLinhasDataUo.has(cacheKey)) {
        return cacheLinhasDataUo.get(cacheKey);
    }

    const linhas = (dados || []).filter(linha => {
        if (dataCtx && normalizarDataExcel(linha["Data"]) !== dataCtx) return false;
        if (uoCtx && obterUoLinha(linha) !== uoCtx) return false;
        return true;
    });

    cacheLinhasDataUo.set(cacheKey, linhas);
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

function calcularPrevisaoAcordo(prod, horaMomento, dataRef = dataSelect?.value || "") {
    const p = Number(prod || 0);
    const horaBase = normalizarHora(horaMomento) || obterHoraAcordoDia(dataRef);
    const horaFechamento = obterHoraFechamentoAcordoDia(dataRef);
    const horasBase = obterHorasAcumuladas(horaBase);
    const horasFechamento = obterHorasAcumuladas(horaFechamento);

    if (!horasBase || !horasFechamento || horasBase >= horasFechamento) {
        return p;
    }

    return p * (horasFechamento / horasBase);
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
    const ultimaHoraDia = normalizarHora(window.__ultimaHoraTabelaGeralDia || "17") || "17";
    const horasFechamento = Math.max(obterHorasAcumuladas("17"), obterHorasAcumuladas(ultimaHoraDia));
    if (!horasAtual || horasAtual >= horasFechamento) {
        // No fechamento, a previsao vira o realizado acumulado; antes disso,
        // ela acompanha a producao real do momento projetada ate a ultima hora do dia.
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

function atualizarIndicadorCarregamentoPainel(carregando, mensagem = "Carregando dados do período...") {
    carregandoDadosPainel = Boolean(carregando);
    if (!statusDadosTopo || !statusDadosResumo) return;

    if (carregandoDadosPainel) {
        statusDadosTopo.classList.remove("status-ok", "status-atencao", "status-atrasado", "status-erro");
        statusDadosTopo.classList.add("status-carregando");
        statusDadosResumo.innerText = mensagem;
    }
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

function obterHorasTurnoSelecionado() {
    if (turnoTardeAtivo()) return FAIXAS_TARDE;
    if (turnoMadrugadaAtivo()) return FAIXAS_MADRUGADA;
    return null;
}

function obterListaHorasPorModo(modo = modoTabela) {
    if (modo === "total-horas") return HORAS_TOTAIS;

    const horasTurno = obterHorasTurnoSelecionado();
    if ((modo === "diario" || modo === "geral") && horasTurno) return horasTurno;

    return FAIXAS;
}

function obterHorasBancoDia(uo, data) {
    return [...new Set(
        obterLinhasPorDataUo(data, uo)
            .map(linha => normalizarHora(
                linha?.hora_atualizacao ??
                linha?.["hora_atualizacao"] ??
                linha?.HoraRaw ??
                linha?.["HoraRaw"] ??
                linha?.["Hora"]
            ))
            .filter(Boolean)
    )].sort((a, b) => Number(a) - Number(b));
}

function obterListaHorasTabelaGeral(uo, data) {
    const horasTurno = obterHorasTurnoSelecionado();
    if (horasTurno) return horasTurno;
    const horasBanco = obterHorasBancoDia(uo, data);
    return horasBanco.length ? horasBanco : FAIXAS;
}

function obterModoPorPeriodoTopo(valor) {
    const periodo = String(valor || "").trim();
    if (periodo === "semanal") return "semanal";
    if (periodo === "mensal") return "mensal";
    if (periodo === "periodo") return "periodo";
    return "diario";
}

function obterPeriodoTopoPorModo(modo) {
    if (modo === "semanal") return "semanal";
    if (modo === "mensal") return "mensal";
    if (modo === "periodo") return "periodo";
    return "diario";
}

function obterPeriodoFiltroAtual() {
    return String(periodoTabelaSelect?.value || "diario").trim() || "diario";
}

function periodoFiltroAtivo() {
    return obterPeriodoFiltroAtual() !== "diario";
}

function telaAceitaFiltroPeriodo() {
    return modoTabela === "diario" || modoTabela === "geral";
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
    const horas = modoTabela === "geral"
        ? obterListaHorasTabelaGeral(uoSelect?.value || "", dataSelect?.value || obterHojeISO())
        : obterListaHorasPorModo(modoTabela);
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

    if (forcarTotalHoras || modoTabela === "total-horas" || modoTabela === "geral") {
        qs.set("strictHours", "false");
    }

    if (uo) qs.set("uo", uo);

    const periodoFiltro = telaAceitaFiltroPeriodo() ? obterPeriodoFiltroAtual() : "";
    if (modoTabela === "geral" && periodoFiltro && periodoFiltro !== "diario") {
        qs.set("view", "tabelaGeralPeriodo");
    }

    if (modoTabela === "semanal" || periodoFiltro === "semanal") {
        const semana = String(semanaSelect?.value || "").trim();
        const intervalo = semana ? obterInicioEFimSemanaPorInput(semana) : null;
        if (intervalo?.inicio && intervalo?.fim) {
            qs.set("dataStart", intervalo.inicio);
            qs.set("dataEnd", intervalo.fim);
            return qs;
        }
    }

    if (modoTabela === "mensal" || modoTabela === "quinzena1" || modoTabela === "quinzena2" || periodoFiltro === "mensal") {
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

    if (modoTabela === "periodo" || periodoFiltro === "periodo") {
        const inicio = String(periodoInicioSelect?.value || "").trim();
        const fim = String(periodoFimSelect?.value || inicio).trim();
        if (inicio && fim) {
            qs.set("dataStart", inicio <= fim ? inicio : fim);
            qs.set("dataEnd", inicio <= fim ? fim : inicio);
            return qs;
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
    atualizarIndicadorCarregamentoPainel(true);

    try {
        const resp = await fetch(`/api/report?${chave}`, { cache: "no-store" });
        if (!resp.ok) return false;
        const payload = await resp.json();
        if (seq !== reqSeqDadosPainel) return false;

        dados = normalizarColecaoPainel(payload?.rows || []);
        dadosBase = Array.isArray(dados) ? dados.slice() : [];
        chaveDadosCarregados = chave;
        limparCachesDadosPainel();

        if (modoTabela === "semanal") {
            popularSemanasDisponiveis();
        }

        return true;
    } catch (error) {
        console.error("Erro ao carregar dados do painel:", error);
        return false;
    } finally {
        if (seq === reqSeqDadosPainel) {
            atualizarIndicadorCarregamentoPainel(false);
        }
    }
}

async function recarregarDadosPainelEAplicar(opcoes = {}) {
    const ok = await carregarDadosPainelAtual(opcoes);
    if (!ok) {
        if (statusDadosTopo && statusDadosResumo) {
            statusDadosTopo.classList.remove("status-ok", "status-atencao", "status-atrasado", "status-carregando");
            statusDadosTopo.classList.add("status-erro");
            statusDadosResumo.innerText = "Falha ao carregar dados do período. Tente novamente ou reduza o filtro.";
        }
        return false;
    }
    await aplicar();
    carregarStatusDados();
    return true;
}

async function atualizarTabelaGeralComDadosDoBanco() {
    if (modoTabela !== "geral") return;

    const ok = await carregarDadosPainelAtual({ forcar: true });
    if (!ok || modoTabela !== "geral") return;

    atualizarOpcoesHora();
    await aplicar();
    carregarStatusDados();
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

    // Na "Tabela Total" e nos turnos especiais, usa a hora bruta para permitir faixas fora de 09/11/13/15/17.
    if (modoTabela === "total-horas" || modoTabela === "geral" || turnoTardeAtivo() || turnoMadrugadaAtivo()) {
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

function montarCabecalhoGeral(tipo, usarLote = false) {
    const colunas = [
        tipo,
        "Meta Dia",
        "Produção",
        "Faixa Dia",
        "% PROD.DIA",
        ...(usarLote ? [
            "Meta Lote",
            "Prod. Lote",
            "% PROD.LOTE",
            "Faixa Lote"
        ] : [
            "Previsão Dia",
            "Prev. % Meta",
            "Prev. Faixa"
        ]),
        "Total Eq.",
        "Med. Serv. Design.",
        "Med. Serv.",
        "Med. Produt.",
        "Med. Improd.",
        "Med. Início Jornada",
        "Med. 1º Atend.",
        "Med. Ult. Atend.",
        "Med. Jornada Prod."
    ];

    theadRow.innerHTML = colunas.map((label, index) => `
        <th class="sortable-th" data-sort-col="${index}" title="Clique para ordenar">
            <span class="th-label">${label}</span>
            <span class="sort-indicator" aria-hidden="true">↕</span>
        </th>
    `).join("");

    ativarOrdenacaoTabelaGeral();
}

function ativarOrdenacaoTabelaGeral() {
    document.querySelectorAll("#theadRow th[data-sort-col]").forEach(th => {
        if (th.dataset.sortBound === "1") return;
        th.dataset.sortBound = "1";
        th.addEventListener("click", (event) => {
            if (event.target.closest(".filtro-icon, .filtro-box")) return;
            ordenarTabelaGeralPorColuna(Number(th.dataset.sortCol || 0));
        });
    });
    atualizarIndicadoresOrdenacaoTabelaGeral();
}

function obterTipoOrdenacaoTabelaGeral(valor) {
    const texto = String(valor || "").trim();
    if (!texto || texto === "-") return { tipo: "vazio", valor: null };

    const faixa = texto.toUpperCase();
    const ordemFaixa = { D: 1, C: 2, B: 3, A: 4, AA: 5 };
    if (Object.prototype.hasOwnProperty.call(ordemFaixa, faixa)) {
        return { tipo: "numero", valor: ordemFaixa[faixa] };
    }

    const hora = texto.match(/^(\d{1,2}):(\d{2})$/);
    if (hora) {
        return { tipo: "numero", valor: (Number(hora[1]) * 60) + Number(hora[2]) };
    }

    const numero = Number(
        texto
            .replace(/\s/g, "")
            .replace(/%$/, "")
            .replace(/\./g, "")
            .replace(",", ".")
    );
    if (Number.isFinite(numero) && /\d/.test(texto)) {
        return { tipo: "numero", valor: numero };
    }

    return {
        tipo: "texto",
        valor: texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase()
    };
}

function compararValoresTabelaGeral(a, b, direcao = "asc") {
    const av = obterTipoOrdenacaoTabelaGeral(a);
    const bv = obterTipoOrdenacaoTabelaGeral(b);

    if (av.tipo === "vazio" && bv.tipo !== "vazio") return 1;
    if (bv.tipo === "vazio" && av.tipo !== "vazio") return -1;
    if (av.tipo === "vazio" && bv.tipo === "vazio") return 0;

    let resultado = 0;
    if (av.tipo === "numero" && bv.tipo === "numero") {
        resultado = av.valor - bv.valor;
    } else {
        resultado = String(av.valor).localeCompare(String(bv.valor), "pt-BR", {
            numeric: true,
            sensitivity: "base"
        });
    }

    return direcao === "asc" ? resultado : -resultado;
}

function atualizarIndicadoresOrdenacaoTabelaGeral() {
    document.querySelectorAll("#theadRow th[data-sort-col]").forEach(th => {
        const icon = th.querySelector(".sort-indicator");
        const col = Number(th.dataset.sortCol || 0);
        th.classList.toggle("sort-active", tabelaGeralOrdenacao.coluna === col);
        if (icon) {
            icon.textContent = tabelaGeralOrdenacao.coluna === col
                ? (tabelaGeralOrdenacao.direcao === "asc" ? "↑" : "↓")
                : "↕";
        }
    });
}

function aplicarOrdenacaoTabelaGeralDom() {
    if (!tbody || tabelaGeralOrdenacao.coluna == null) return;

    const linhas = Array.from(tbody.querySelectorAll("tr"));
    const total = linhas.find(linha => linha.classList.contains("resultado"));
    const dadosOrdenaveis = linhas.filter(linha => !linha.classList.contains("resultado"));
    const coluna = Number(tabelaGeralOrdenacao.coluna);
    const direcao = tabelaGeralOrdenacao.direcao;

    dadosOrdenaveis.sort((a, b) => {
        const textoA = a.children[coluna]?.innerText || "";
        const textoB = b.children[coluna]?.innerText || "";
        const cmp = compararValoresTabelaGeral(textoA, textoB, direcao);
        if (cmp !== 0) return cmp;
        return String(a.children[0]?.innerText || "").localeCompare(
            String(b.children[0]?.innerText || ""),
            "pt-BR",
            { sensitivity: "base" }
        );
    });

    dadosOrdenaveis.forEach(linha => tbody.appendChild(linha));
    if (total) tbody.appendChild(total);
    atualizarIndicadoresOrdenacaoTabelaGeral();
}

function ordenarTabelaGeralPorColuna(coluna) {
    if (tabelaGeralOrdenacao.coluna === coluna) {
        tabelaGeralOrdenacao.direcao = tabelaGeralOrdenacao.direcao === "asc" ? "desc" : "asc";
    } else {
        tabelaGeralOrdenacao.coluna = coluna;
        const textoAmostra = tbody?.querySelector(`tr:not(.resultado) td:nth-child(${coluna + 1})`)?.innerText || "";
        tabelaGeralOrdenacao.direcao = obterTipoOrdenacaoTabelaGeral(textoAmostra).tipo === "texto" ? "asc" : "desc";
    }

    aplicarOrdenacaoTabelaGeralDom();
    aplicarFiltrosCombinados();
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
    titulo.innerText = modoTabela === "geral" ? "Motos Meta Média" : "AA";
}

function atualizarRotuloKpiA() {
    const titulo = kpiA?.previousElementSibling;
    if (!titulo) return;
    titulo.innerText = modoTabela === "geral" ? "Méd.Eq. D Moto Dia" : "A";
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

function aplicarRotulosKpisPadrao() {
    kpiFaixa?.querySelector("h4") && (kpiFaixa.querySelector("h4").innerText = "Class. UO");
    definirRotuloKpi(kpiMeta, "Meta Hora");
    definirRotuloKpi(kpiProd, "Prod. Hora");
    definirRotuloKpi(kpiSaldo, "Saldo US");
    definirRotuloKpi(kpiFT, "Força Trab.");
}

function definirRotuloKpi(valorEl, texto) {
    const titulo = valorEl?.previousElementSibling;
    if (titulo) titulo.innerText = texto;
}

function textoKpiMediaMetaReal(meta, real) {
    const metaNum = Number(meta || 0);
    const realNum = Number(real || 0);
    const cor = realNum < metaNum ? "#dc2626" : "#15803d";
    return `${fmtDecBR(metaNum, 2)} <span class="kpi-media-real" style="color:${cor}">${fmtDecBR(realNum, 2)}</span>`;
}

function obterTipoEquipeOperacional(item = {}) {
    const texto = normalizarTextoEquipeOperacional([
        item.tipoEquipe,
        item.tipo,
        item.tipoVeiculo,
        item.modalidade,
        item.marcadorOperacional,
        item.equipe,
        item.nome,
        item.frota,
        item.codigo
    ].join(" "));
    const textoCompacto = texto.replace(/\s*-\s*/g, "-");

    if (textoCompacto.includes("-MF")) return "multi";
    if (textoCompacto.includes("-MT")) return "moto";
    if (/(^|[^A-Z])MF([^A-Z]|$)/.test(texto)) return "multi";
    if (/(^|[^A-Z])MT([^A-Z]|$)/.test(texto)) return "moto";
    if (/\bMULTI\b|MULTIFUNC|MULTI/.test(texto)) return "multi";
    if (/\bMOTO\b|MOTOCIC|MOTORIZ/.test(texto)) return "moto";
    return "";
}

function normalizarTextoEquipeOperacional(valor) {
    return String(valor || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[–—−]/g, "-")
        .toUpperCase();
}

function obterMarcadorOperacionalLinha(linha = {}) {
    return normalizarTextoEquipeOperacional(Object.values(linha).join(" "));
}

function calcularKpisOperacionaisTabelaGeral(lista = []) {
    const motos = lista.filter(item => obterTipoEquipeOperacional(item) === "moto");
    const multis = lista.filter(item => obterTipoEquipeOperacional(item) === "multi");
    const eqDMoto = motos.filter(item => String(item.faixaDiaCompleta || item.faixaDia || "").toUpperCase() === "D").length;
    const eqDMulti = multis.filter(item => String(item.faixaDiaCompleta || item.faixaDia || "").toUpperCase() === "D").length;

    return {
        motos: motos.length,
        multis: multis.length,
        metaMediaMoto: mediaNumerica(motos.map(item => toNumber(item.metaDia || item.meta))),
        metaMediaMulti: mediaNumerica(multis.map(item => toNumber(item.metaDia || item.meta))),
        prodMediaMoto: mediaNumerica(motos.map(item => toNumber(item.prodDia || item.prod))),
        prodMediaMulti: mediaNumerica(multis.map(item => toNumber(item.prodDia || item.prod))),
        eqDMoto,
        eqDMulti
    };
}

function calcularKpisOperacionaisLinhasTabelaGeral({ data = "", uo = "", nome = "", hora = "" } = {}) {
    const mapa = new Map();
    const horaRef = normalizarHora(hora);

    obterLinhasPorDataUo(data, uo).forEach((linha) => {
        if (nome && (linha[campoGlobal] || "N/I") !== nome) return;
        if (horaRef && obterHoraLinhaModalEquipes(linha) !== horaRef) return;

        const codigo = obterCodigoEquipeLinha(linha);
        if (!codigo) return;

        const atual = mapa.get(codigo) || {
            codigo,
            equipe: "",
            frota: "",
            marcadorOperacional: ""
        };

        atual.equipe = atual.equipe || obterValorColuna(linha, ["Nome", "NOME_EQUIPE", "NOME", "EQUIPE"]);
        atual.frota = atual.frota || obterFrotaLinha(linha);
        atual.marcadorOperacional = `${atual.marcadorOperacional} ${obterMarcadorOperacionalLinha(linha)}`;
        mapa.set(codigo, atual);
    });

    return calcularKpisOperacionaisTabelaGeral([...mapa.values()]);
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
    const loteMeta = Number(resumo.loteMeta || 0);
    const loteProd = Number(resumo.loteProd || 0);
    const percLote = loteMeta > 0 ? (loteProd / loteMeta) * 100 : percProdDia;
    const faixa = loteMeta > 0 ? classificar(percLote) : classificar(percProdDia);
    const saldo = prodDia - metaDia;
    const operacionais = resumo.operacionais || calcularKpisOperacionaisTabelaGeral(resumo.listaEquipes || []);

    atualizarRotuloKpiAA();
    atualizarRotuloKpiA();
    atualizarRotuloKpiB();
    atualizarVisibilidadeKpiExecutados();
    atualizarVisibilidadeKpiImprodBruto();
    atualizarEstiloKpisGerais();

    definirRotuloKpi(kpiMeta, "Saldo US");
    definirRotuloKpi(kpiProd, "Força Trab.");
    definirRotuloKpi(kpiSaldo, "Motos");
    definirRotuloKpi(kpiFT, "Multi");
    definirRotuloKpi(kpiExecutados, "Multi Meta Média");
    definirRotuloKpi(kpiImprodBruto, "Méd.Eq. D Multi.Dia");

    kpiFaixa?.querySelector("h4") && (kpiFaixa.querySelector("h4").innerText = "Class. - Lote");
    kpiFaixaTxt.innerText = `${faixa}-${percLote.toFixed(0)}%`;
    aplicarVisualKpiFaixa(faixa);

    kpiMeta.innerText = fmt3(saldo);
    kpiMeta.style.color = saldo < 0 ? "#dc2626" : "#15803d";
    kpiProd.innerText = Number(totalEq || 0).toFixed(0);
    kpiSaldo.innerText = Number(operacionais.motos || 0).toFixed(0);
    kpiSaldo.style.color = "#111827";
    kpiFT.innerText = Number(operacionais.multis || 0).toFixed(0);
    kpiAA.innerHTML = textoKpiMediaMetaReal(operacionais.metaMediaMoto || 0, operacionais.prodMediaMoto || 0);
    if (kpiExecutados) kpiExecutados.innerHTML = textoKpiMediaMetaReal(operacionais.metaMediaMulti || 0, operacionais.prodMediaMulti || 0);
    kpiA.innerText = Number(operacionais.eqDMoto || 0).toFixed(0);
    if (kpiImprodBruto) kpiImprodBruto.innerText = Number(operacionais.eqDMulti || 0).toFixed(0);
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
    if (modoTabela !== "geral") aplicarRotulosKpisPadrao();
    atualizarRotuloKpiAA();
    atualizarRotuloKpiA();
    atualizarRotuloKpiB();
    atualizarVisibilidadeKpiExecutados();
    atualizarVisibilidadeKpiImprodBruto();
    atualizarEstiloKpisGerais();
    kpiMeta.innerText = "0.000";
    kpiMeta.style.color = "#111827";
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
    if (modoTabela !== "geral") aplicarRotulosKpisPadrao();
    atualizarRotuloKpiAA();
    atualizarRotuloKpiA();
    atualizarRotuloKpiB();
    atualizarVisibilidadeKpiExecutados();
    atualizarVisibilidadeKpiImprodBruto();
    atualizarEstiloKpisGerais();
    kpiMeta.innerText = fmt3(totalMeta);
    kpiMeta.style.color = "#111827";
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
        periodo: "Tabela por Período",
        quinzena1: "1ª Quinzena",
        quinzena2: "2ª Quinzena",
        "report-nec": "Painel Report NEC",
        "report-jornada": "Report Jornada"
    };

    const modoPainelExternoAtivo = modo === "report-nec" || modo === "report-jornada";

    if (modoAtualTxt) {
        modoAtualTxt.innerText = titulos[modo] || "Tabela Diária";
    }

    if (periodoTabelaSelect) {
        periodoTabelaSelect.value = obterPeriodoTopoPorModo(modo);
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
    const periodoFiltro = telaAceitaFiltroPeriodo() ? obterPeriodoFiltroAtual() : obterPeriodoTopoPorModo(modo);
    const usandoPeriodoFiltro = telaAceitaFiltroPeriodo() && periodoFiltro !== "diario";
    if (grupoData) grupoData.classList.toggle("hidden", modoPainelExternoAtivo || !modoDiarioAtivo || usandoPeriodoFiltro);
    if (grupoHora) grupoHora.classList.toggle("hidden", modoPainelExternoAtivo || !modoDiarioAtivo || usandoPeriodoFiltro);
    if (grupoSemana) grupoSemana.classList.toggle("hidden", modoPainelExternoAtivo || !(modo === "semanal" || periodoFiltro === "semanal"));
    if (grupoMes) grupoMes.classList.toggle(
        "hidden",
        modoPainelExternoAtivo || !(modo === "mensal" || modo === "quinzena1" || modo === "quinzena2" || periodoFiltro === "mensal")
    );
    if (grupoPeriodoInicio) grupoPeriodoInicio.classList.toggle("hidden", modoPainelExternoAtivo || !(modo === "periodo" || periodoFiltro === "periodo"));
    if (grupoPeriodoFim) grupoPeriodoFim.classList.toggle("hidden", modoPainelExternoAtivo || !(modo === "periodo" || periodoFiltro === "periodo"));

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

    if (modo === "semanal" || periodoFiltro === "semanal") {
        popularSemanasDisponiveis();
    }

    if ((modo === "mensal" || modo === "quinzena1" || modo === "quinzena2" || periodoFiltro === "mensal") && mesSelect && !mesSelect.value) {
        mesSelect.value = obterAnoMesAtual();
    }

    if (modo === "periodo" || periodoFiltro === "periodo") {
        const hoje = obterHojeISO();
        if (periodoInicioSelect && !periodoInicioSelect.value) periodoInicioSelect.value = dataSelect?.value || hoje;
        if (periodoFimSelect && !periodoFimSelect.value) periodoFimSelect.value = periodoInicioSelect?.value || hoje;
    }

    atualizarOpcoesHora();

    if (reaplicar && dados.length) {
        if (modo === "total-horas") {
            garantirDadosTotalHoras().finally(() => aplicar());
            return;
        }

        recarregarDadosPainelEAplicar();
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
    if (dt.getDay() === 0) dt.setDate(dt.getDate() + 1);
    const dia = (dt.getDay() + 6) % 7;
    dt.setDate(dt.getDate() - dia + 3);

    const ano = dt.getFullYear();

    const primeiraQuinta = new Date(ano, 0, 4);
    const diaPrimeiraQuinta = (primeiraQuinta.getDay() + 6) % 7;
    primeiraQuinta.setDate(primeiraQuinta.getDate() - diaPrimeiraQuinta + 3);

    const semana = 1 + Math.round((dt - primeiraQuinta) / (7 * 24 * 60 * 60 * 1000));

    return `${ano}-W${String(semana).padStart(2, "0")}`;
}

const MESES_PICKER_PT = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
let semanaPickerMes = new Date();
let mesPickerAno = new Date().getFullYear();
let semanaPickerAberto = false;
let mesPickerAberto = false;

function dataLocalDeIso(dataISO) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dataISO || ""));
    if (!match) return null;
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function formatarDataPickerBr(data) {
    return data instanceof Date && !Number.isNaN(data.getTime())
        ? data.toLocaleDateString("pt-BR")
        : "";
}

function formatarMesPickerBr(ano, mesZero) {
    return new Date(ano, mesZero, 1).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
}

function atualizarDisplaySemanaTabela() {
    if (!semanaDisplay) return;
    const semana = String(semanaSelect?.value || "").trim();
    if (!semana) {
        semanaDisplay.value = "";
        return;
    }

    const intervalo = obterInicioEFimSemanaPorInput(semana);
    const inicio = dataLocalDeIso(intervalo.inicio);
    const fim = dataLocalDeIso(intervalo.fim);
    const numero = semana.split("-W")[1] || "";
    semanaDisplay.value = inicio && fim
        ? `Sem ${Number(numero)} (${formatarDataPickerBr(inicio).slice(0, 5)} - ${formatarDataPickerBr(fim)})`
        : semana;
}

function atualizarDisplayMesTabela() {
    if (!mesDisplay) return;
    const valor = String(mesSelect?.value || "").trim();
    const match = /^(\d{4})-(\d{2})$/.exec(valor);
    mesDisplay.value = match ? formatarMesPickerBr(Number(match[1]), Number(match[2]) - 1) : "";
}

function selecionarSemanaTabelaPorData(data) {
    if (!semanaSelect || !(data instanceof Date) || Number.isNaN(data.getTime())) return;
    const valor = obterSemanaISODeData(formatISODateLocal(data));
    semanaSelect.value = valor;
    atualizarDisplaySemanaTabela();
    fecharSemanaPickerTabela();
    semanaSelect.dispatchEvent(new Event("change"));
}

function renderSemanaPickerTabela() {
    if (!semanaPopup) return;
    const year = semanaPickerMes.getFullYear();
    const month = semanaPickerMes.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const selectedWeek = String(semanaSelect?.value || "");

    semanaPopup.innerHTML = "";

    const header = document.createElement("div");
    header.className = "date-picker-header";
    header.innerHTML = `
        <button type="button" id="painelSemanaPrev">‹</button>
        <div class="date-picker-title">${formatarMesPickerBr(year, month)}</div>
        <button type="button" id="painelSemanaNext">›</button>
    `;

    const grid = document.createElement("div");
    grid.className = "date-picker-grid date-picker-grid-week";
    ["Sem", "D", "S", "T", "Q", "Q", "S", "S"].forEach((dia) => {
        const cell = document.createElement("div");
        cell.className = "date-picker-weekday" + (dia === "Sem" ? " week-num-header" : "");
        cell.textContent = dia;
        grid.appendChild(cell);
    });

    const startOffset = firstDay.getDay();
    const endPadding = (6 - lastDay.getDay() + 7) % 7;
    let weekStart = new Date(year, month, 1 - startOffset);
    const calEnd = new Date(year, month, lastDay.getDate() + endPadding);

    while (weekStart <= calEnd) {
        const reference = new Date(weekStart);
        reference.setDate(weekStart.getDate() + 1);
        const weekValue = obterSemanaISODeData(formatISODateLocal(reference));
        const weekNumber = Number((weekValue.split("-W")[1] || "0"));

        const weekCell = document.createElement("button");
        weekCell.type = "button";
        weekCell.className = "date-picker-day week-num-cell" + (selectedWeek === weekValue ? " selected" : "");
        weekCell.textContent = String(weekNumber);
        weekCell.addEventListener("click", () => selecionarSemanaTabelaPorData(reference));
        grid.appendChild(weekCell);

        for (let col = 0; col < 7; col++) {
            const dateVal = new Date(weekStart);
            dateVal.setDate(weekStart.getDate() + col);
            const dayWeek = obterSemanaISODeData(formatISODateLocal(dateVal));
            const isCurrentMonth = dateVal.getMonth() === month && dateVal.getFullYear() === year;
            const inWeek = selectedWeek && dayWeek === selectedWeek;
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "date-picker-day" +
                (!isCurrentMonth ? " outside-day" : "") +
                (inWeek ? " in-week" : "");
            btn.textContent = String(dateVal.getDate()).padStart(2, "0");
            btn.addEventListener("click", () => selecionarSemanaTabelaPorData(dateVal));
            grid.appendChild(btn);
        }

        weekStart.setDate(weekStart.getDate() + 7);
    }

    const footer = document.createElement("div");
    footer.className = "date-picker-footer";
    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.textContent = "Limpar";
    clearBtn.addEventListener("click", limparSemanaPickerTabela);
    const todayBtn = document.createElement("button");
    todayBtn.type = "button";
    todayBtn.textContent = "Hoje";
    todayBtn.addEventListener("click", () => {
        const hoje = new Date();
        semanaPickerMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        selecionarSemanaTabelaPorData(hoje);
    });
    footer.appendChild(clearBtn);
    footer.appendChild(todayBtn);

    semanaPopup.appendChild(header);
    semanaPopup.appendChild(grid);
    semanaPopup.appendChild(footer);

    document.getElementById("painelSemanaPrev")?.addEventListener("click", () => {
        semanaPickerMes.setMonth(semanaPickerMes.getMonth() - 1);
        renderSemanaPickerTabela();
    });
    document.getElementById("painelSemanaNext")?.addEventListener("click", () => {
        semanaPickerMes.setMonth(semanaPickerMes.getMonth() + 1);
        renderSemanaPickerTabela();
    });
}

function abrirSemanaPickerTabela() {
    if (!semanaPopup || !semanaDisplay) return;
    fecharMesPickerTabela();
    const intervalo = obterInicioEFimSemanaPorInput(semanaSelect?.value || "");
    const inicio = dataLocalDeIso(intervalo.inicio);
    if (inicio) semanaPickerMes = new Date(inicio.getFullYear(), inicio.getMonth(), 1);
    semanaPickerAberto = true;
    semanaPopup.classList.remove("hidden");
    semanaDisplay.classList.add("active");
    renderSemanaPickerTabela();
}

function fecharSemanaPickerTabela() {
    if (!semanaPickerAberto) return;
    semanaPickerAberto = false;
    semanaPopup?.classList.add("hidden");
    semanaDisplay?.classList.remove("active");
}

function limparSemanaPickerTabela() {
    if (!semanaSelect) return;
    semanaSelect.value = "";
    atualizarDisplaySemanaTabela();
    fecharSemanaPickerTabela();
    semanaSelect.dispatchEvent(new Event("change"));
}

function selecionarMesTabela(ano, mesZero) {
    if (!mesSelect) return;
    mesSelect.value = `${ano}-${String(mesZero + 1).padStart(2, "0")}`;
    atualizarDisplayMesTabela();
    fecharMesPickerTabela();
    mesSelect.dispatchEvent(new Event("change"));
}

function renderMesPickerTabela() {
    if (!mesPopup) return;
    mesPopup.innerHTML = "";

    const header = document.createElement("div");
    header.className = "date-picker-header";
    header.innerHTML = `
        <button type="button" id="painelMesPrev">‹</button>
        <div class="date-picker-title">${mesPickerAno}</div>
        <button type="button" id="painelMesNext">›</button>
    `;

    const grid = document.createElement("div");
    grid.className = "month-picker-grid";
    const valorAtual = String(mesSelect?.value || "");

    MESES_PICKER_PT.forEach((nome, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "month-picker-btn";
        const valor = `${mesPickerAno}-${String(idx + 1).padStart(2, "0")}`;
        if (valor === valorAtual) btn.classList.add("selected");
        btn.textContent = nome;
        btn.addEventListener("click", () => selecionarMesTabela(mesPickerAno, idx));
        grid.appendChild(btn);
    });

    const footer = document.createElement("div");
    footer.className = "date-picker-footer";
    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.textContent = "Limpar";
    clearBtn.addEventListener("click", limparMesPickerTabela);
    const currentBtn = document.createElement("button");
    currentBtn.type = "button";
    currentBtn.textContent = "Mês Atual";
    currentBtn.addEventListener("click", () => {
        const hoje = new Date();
        mesPickerAno = hoje.getFullYear();
        selecionarMesTabela(hoje.getFullYear(), hoje.getMonth());
    });
    footer.appendChild(clearBtn);
    footer.appendChild(currentBtn);

    mesPopup.appendChild(header);
    mesPopup.appendChild(grid);
    mesPopup.appendChild(footer);

    document.getElementById("painelMesPrev")?.addEventListener("click", () => {
        mesPickerAno--;
        renderMesPickerTabela();
    });
    document.getElementById("painelMesNext")?.addEventListener("click", () => {
        mesPickerAno++;
        renderMesPickerTabela();
    });
}

function abrirMesPickerTabela() {
    if (!mesPopup || !mesDisplay) return;
    fecharSemanaPickerTabela();
    const match = /^(\d{4})-(\d{2})$/.exec(String(mesSelect?.value || ""));
    if (match) mesPickerAno = Number(match[1]);
    mesPickerAberto = true;
    mesPopup.classList.remove("hidden");
    mesDisplay.classList.add("active");
    renderMesPickerTabela();
}

function fecharMesPickerTabela() {
    if (!mesPickerAberto) return;
    mesPickerAberto = false;
    mesPopup?.classList.add("hidden");
    mesDisplay?.classList.remove("active");
}

function limparMesPickerTabela() {
    if (!mesSelect) return;
    mesSelect.value = "";
    atualizarDisplayMesTabela();
    fecharMesPickerTabela();
    mesSelect.dispatchEvent(new Event("change"));
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
    inicio.setDate(segundaSemana1.getDate() + (semana - 1) * 7 - 1);

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

    if (String(semanaSelect.tagName || "").toUpperCase() === "INPUT") {
        const semanaAtual = obterSemanaISODeData(dataSelect?.value || obterHojeISO());
        if (valorAtual) {
            semanaSelect.value = valorAtual;
        } else if (semanas.includes(semanaAtual)) {
            semanaSelect.value = semanaAtual;
        } else if (semanas.length) {
            semanaSelect.value = semanas[0];
        } else {
            semanaSelect.value = semanaAtual;
        }
        atualizarDisplaySemanaTabela();
        return;
    }

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
    atualizarDisplaySemanaTabela();
}

/* ================= ÚLTIMA FAIXA ================= */

function ultimaFaixaDisponivel(uo, data) {
    const cacheKey = ["ultimaFaixa", String(data || ""), String(uo || ""), modoTabela, turnoSelect?.value || ""].join("|");
    if (cacheUltimaFaixa.has(cacheKey)) return cacheUltimaFaixa.get(cacheKey);

    const horas = new Set();

    obterLinhasPorDataUo(data, uo).forEach(l => {
        const hora = obterHoraLinhaModalEquipes(l);
        if (hora) horas.add(hora);
    });

    const lista = modoTabela === "geral"
        ? obterListaHorasTabelaGeral(uo, data)
        : obterListaHorasPorModo(modoTabela);
    const resultado = lista.filter(f => horas.has(f)).pop();
    cacheUltimaFaixa.set(cacheKey, resultado);
    return resultado;
}

/* ================= CALCULAR FAIXAS ================= */

function calcularFaixas(campo, uo, data, horasLista = null) {
    cacheFaixas = {};

    const horas = Array.isArray(horasLista) && horasLista.length ? horasLista : FAIXAS;
    const horasSet = new Set(horas);
    horas.forEach(faixa => {
        cacheFaixas[faixa] = {};
    });

    obterLinhasPorDataUo(data, uo).forEach(l => {
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
        obterLinhasPorDataUo("", uo)
            .filter(l => {
                return extrairAnoMes(l["Data"]) === anoMes;
            })
            .map(l => normalizarDataExcel(l["Data"]))
            .filter(Boolean)
    )].sort();
}

function obterDatasDaSemanaSelecionada(uo, semanaStr) {
    const { inicio, fim } = obterInicioEFimSemanaPorInput(semanaStr);

    return [...new Set(
        obterLinhasPorDataUo("", uo)
            .filter(l => {
                const data = normalizarDataExcel(l["Data"]);
                if (!data) return false;
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
        const horasPeriodo = modoTabela === "geral"
            ? obterListaHorasTabelaGeral(uo, data)
            : FAIXAS;

        diasComDados++;

        const mapaDia = {};
        const eqTotDia = { AA: 0, A: 0, B: 0, C: 0, D: 0 };

        obterLinhasPorDataUo(data, uo).forEach(l => {
            const hora = modoTabela === "geral"
                ? obterHoraLinha(l)
                : normalizarHora(l["Hora"]);
            if (!horasPeriodo.includes(hora)) return;
            const codigoEquipe = obterCodigoEquipeLinha(l);
            if (!codigoEquipe) return;
            if (!linhaPassaFiltroTurnoSelecionado(codigoEquipe, codigosTurnoSelecionado)) return;

            const nome = l[campo] || "N/I";

            if (!cacheLocalFaixas[hora]) {
                cacheLocalFaixas[hora] = {};
            }
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

async function reabrirModalAtual(options = {}) {
    if (!currentModalContext) return;
    const ordenacaoAnterior = options.preservarOrdenacao && modalEquipesOrdenacao?.coluna != null
        ? { ...modalEquipesOrdenacao }
        : null;

    if (currentModalContext.tipoModal === "faixa") {
        await abrirModalFaixa(currentModalContext.supervisor, currentModalContext.horaClicada);
        restaurarOrdenacaoModalAposRender(ordenacaoAnterior);
        return;
    }

    await abrirModalEquipes(
        currentModalContext.supervisor || null,
        currentModalContext.faixaClicada || null,
        currentModalContext.horaClicada
    );
    restaurarOrdenacaoModalAposRender(ordenacaoAnterior);
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
    reabrirModalAtual({ preservarOrdenacao: true });
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
    reabrirModalAtual({ preservarOrdenacao: true });
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

function renderizarCabecalhoContextoAcordos(horaReferencia = "17", dataRef = dataSelect?.value || "") {
    if (!theadAcordosRow) return;
    const rotulosAcordo = obterRotulosPainelAcordos(horaReferencia, dataRef);
    const horasAcordo = obterHorasPainelAcordos(dataRef);
    theadAcordosRow.innerHTML = `
        <th>Cód. Eq.</th>
        <th>Frota</th>
        <th class="col-equipe">Equipes</th>
        <th>Meta</th>
        <th>Prod. Acordo</th>
        <th>Faixa Acordo</th>
        <th>% PROD. Acordo</th>
        ${horasAcordo.map(hora => `<th>${hora}h</th>`).join("")}
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
        const horaAcordo = obterHoraAcordoDia(dataCtx);
        const listaBase = montarListaEquipesSupervisor(null, horaAcordo, dataCtx, uoCtx, null);
        const metaFixa = listaBase.reduce((acc, item) => acc + Number(item.metaDia || 0), 0);
        const prodFixa = listaBase.reduce((acc, item) => acc + Number(item.prodDia || 0), 0);

        currentModalContext = {
            tipoModal: "menu-justificativas",
            supervisor: "",
            horaClicada: horaAcordo,
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

function horaEhFechamentoAcordo(hora, dataRef = dataSelect?.value || "") {
    const hh = normalizarHora(hora);
    return hh === obterHoraFechamentoAcordoDia(dataRef) || hh === "18" || hh === "19";
}

function horaPermitePainelAcordos(hora, dataRef = dataSelect?.value || "") {
    const hh = normalizarHora(hora);
    const horaNum = Number(hh);
    const acordoNum = Number(obterHoraAcordoDia(dataRef));
    const fechamentoNum = Number(obterHoraFechamentoAcordoDia(dataRef));

    if (!Number.isFinite(horaNum) || !Number.isFinite(acordoNum) || !Number.isFinite(fechamentoNum)) {
        return false;
    }

    return horaNum >= acordoNum && (horaNum <= fechamentoNum || horaEhFechamentoAcordo(hh, dataRef));
}

function obterRotulosPainelAcordos(hora, dataRef = dataSelect?.value || "") {
    const hh = normalizarHora(hora);
    const horaAcordo = obterHoraAcordoDia(dataRef);
    const horaFechamento = obterHoraFechamentoAcordoDia(dataRef);

    if (hh && hh !== horaAcordo && hh !== horaFechamento) {
        return {
            botao: "ANDAMENTO ACORDOS",
            titulo: "ANDAMENTO DOS ACORDOS",
            cumpridoLabel: "Qtde. Eq. Cumprido",
            eficaciaLabel: "Eficacia Parcial do Acordo",
            colunaAcordo: `ACORDO AS ${horaAcordo}H`,
            colunaStatus: `STATUS<br>ACORDO AS ${hh}H`
        };
    }

    return {
        botao: "ACORDOS",
        titulo: "ACORDOS",
        cumpridoLabel: "Qtde. Eq. Acordo Cumprido",
        eficaciaLabel: "Eficacia do Acordo",
        colunaAcordo: `ACORDO AS ${horaAcordo}H`,
        colunaStatus: `STATUS<br>ACORDO ${horaFechamento}H`
    };
}

function atualizarBotaoAcordos17() {
    if (!btnAcordos17) return;

    const podeMostrar =
        currentModalContext &&
        (currentModalContext.tipoModal === "faixa" || currentModalContext.tipoModal === "equipes") &&
        horaPermitePainelAcordos(currentModalContext.horaClicada, currentModalContext.data);

    if (!podeMostrar) {
        btnAcordos17.classList.add("hidden");
        btnAcordos17.textContent = "ACORDOS";
        return;
    }

    const rotulos = obterRotulosPainelAcordos(currentModalContext.horaClicada, currentModalContext.data);
    const qtd = Object.keys(obterMapaAcordosPainel(currentModalContext)).length;
    btnAcordos17.textContent = qtd > 0 ? `${rotulos.botao} (${qtd})` : rotulos.botao;
    btnAcordos17.classList.remove("hidden");
}

function atualizarBotaoAcordosRs() {
    if (!btnAcordosRs) return;

    const podeMostrar =
        currentModalContext &&
        (currentModalContext.tipoModal === "faixa" || currentModalContext.tipoModal === "equipes") &&
        horaPermitePainelAcordos(currentModalContext.horaClicada, currentModalContext.data);

    if (!podeMostrar) {
        btnAcordosRs.classList.add("hidden");
        btnAcordosRs.textContent = "R$ ACORDOS";
        return;
    }

    btnAcordosRs.textContent = "R$ ACORDOS";
    btnAcordosRs.classList.remove("hidden");
}

function montarStatusAcordoFaixa(faixaDia, horaReferencia = "17", dataRef = dataSelect?.value || "") {
    const fechamento = horaEhFechamentoAcordo(horaReferencia, dataRef);
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
        icone: fechamento ? "👎" : "⏳",
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
    const cacheKey = ["codigosTurno", String(data || ""), String(uo || ""), turno].join("|");
    if (cacheCodigosTurno.has(cacheKey)) return cacheCodigosTurno.get(cacheKey);

    const codigos = new Set();
    obterLinhasPorDataUo(data, uo).forEach(linha => {
        const codigo = obterCodigoEquipeLinha(linha);
        if (!codigo) return;

        if (obterTurnoPorInicioJornada(obterInicioJornadaLinha(linha)) === turno) {
            codigos.add(String(codigo));
        }
    });

    cacheCodigosTurno.set(cacheKey, codigos);
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

function obterHorariosModalEquipes(data = dataSelect?.value || "", uo = uoSelect?.value || "") {
    if (turnoTardeAtivo()) return FAIXAS_TARDE;
    if (turnoMadrugadaAtivo()) return FAIXAS_MADRUGADA;
    if (modoTabela === "geral") return obterListaHorasTabelaGeral(uo, data);
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

function configurarCliqueKpiImprodTabelaGeral() {
    const card = kpiB?.closest(".kpi");
    if (!card || card.dataset.improdClickBound === "1") return;
    card.dataset.improdClickBound = "1";
    card.classList.add("kpi-click-improd");
    card.title = "Abrir detalhes de improdutividade";
    card.addEventListener("click", (event) => {
        if (modoTabela === "geral") abrirModalImprodTabelaGeral(event);
    });
}

function obterDatasAnaliseImprod() {
    if (modoTabela === "geral" && periodoFiltroAtivo()) {
        return obterDatasFiltroPeriodoAtual(uoSelect?.value || "");
    }
    return dataSelect?.value ? [dataSelect.value] : [];
}

function obterListaAnaliseImprod(nomeLinha = "") {
    const uo = uoSelect?.value || "";
    const datas = obterDatasAnaliseImprod();
    const mapa = new Map();

    datas.forEach((data) => {
        const faixa = ultimaFaixaDisponivel(uo, data);
        if (!faixa) return;
        const listaDia = montarListaEquipesSupervisor(nomeLinha || null, faixa, data, uo, null);
        listaDia.forEach((item) => {
            const codigo = String(item.codigo || "").trim();
            if (!codigo) return;
            if (!mapa.has(codigo)) {
                mapa.set(codigo, { ...item, datas: new Set(), improdSoma: 0, servicosSoma: 0 });
            }
            const atual = mapa.get(codigo);
            atual.datas.add(data);
            atual.improdSoma += toNumber(item.improdutivo);
            atual.servicosSoma += toNumber(item.servicos);
        });
    });

    return [...mapa.values()].map(item => ({
        ...item,
        datas: [...item.datas],
        improdutivo: item.improdSoma,
        servicos: item.servicosSoma,
        percImprod: item.servicosSoma > 0 ? (item.improdSoma / item.servicosSoma) * 100 : 0
    }));
}

async function coletarCodxAnaliseImprod(lista = [], nomeLinha = "") {
    const contextoAnterior = currentModalContext;
    const uo = uoSelect?.value || "";
    const tipoVisao = tipoSelect?.value || "";
    const saida = [];

    for (const data of obterDatasAnaliseImprod()) {
        const codigosData = new Set(
            lista.filter(item => !item.datas?.length || item.datas.includes(data)).map(item => String(item.codigo))
        );
        currentModalContext = {
            tipoModal: "analise-improd",
            supervisor: nomeLinha || "",
            horaClicada: ultimaFaixaDisponivel(uo, data) || "",
            data,
            uo,
            tipoVisao,
            listaAtual: lista
        };

        for (const item of lista) {
            const codigo = String(item.codigo || "").trim();
            if (!codigo || !codigosData.has(codigo)) continue;
            const rows = await obterInterferenciasCodXEquipe(codigo);
            rows.forEach(row => {
                saida.push({
                    data,
                    codigo,
                    equipe: item.equipe || "-",
                    codigoX: row.codigoX || "-",
                    descricao: row.descricao || "-",
                    tempoMin: Number(row.tempoMin || 0),
                    obs: row.obs || "-"
                });
            });
        }
    }

    currentModalContext = contextoAnterior;
    return saida;
}

function coletarJustificativasAnaliseImprod(lista = [], nomeLinha = "") {
    const uo = uoSelect?.value || "";
    const tipoVisao = tipoSelect?.value || "";
    const saida = [];

    obterDatasAnaliseImprod().forEach((data) => {
        const ctx = {
            data,
            uo,
            tipoVisao,
            supervisor: nomeLinha || "",
            listaAtual: lista
        };
        const mapa = obterMapaJustificativasPainel(ctx);
        lista.forEach(item => {
            const codigo = String(item.codigo || "").trim();
            const just = mapa[codigo];
            if (!just) return;
            const texto = String(just.justificativa || "");
            const parsed = parseJustificativaEstruturada(texto);
            const grupo = String(just.motivoGrupo || parsed.grupo || extrairMotivoJustificativa(texto) || "-").toUpperCase();
            const descricao = String(just.motivoDescricao || parsed.descricao || "-").toUpperCase();
            saida.push({
                data,
                codigo,
                equipe: item.equipe || "-",
                grupo,
                descricao,
                detalhe: String(just.detalhe || parsed.detalhe || texto || "-"),
                salvoEm: String(just.salvoEm || "")
            });
        });
    });

    return saida;
}

function renderizarGraficoAnaliseImprod(lista, key, titulo = "TOP 10 PERDAS EM US INTERFERÊNCIAS", valorKey = "") {
    if (!analiseImprodChart) return;
    const contagem = new Map();
    lista.forEach(item => {
        const valor = String(item[key] || "-").trim() || "-";
        const incremento = valorKey ? Number(item[valorKey] || 0) : 1;
        contagem.set(valor, (contagem.get(valor) || 0) + incremento);
    });
    const entriesBase = [...contagem.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "pt-BR"));
    const totalGeral = entriesBase.reduce((acc, [, value]) => acc + Number(value || 0), 0);
    const entries = totalGeral > 0 ? [["TOTAL GERAL", totalGeral], ...entriesBase] : entriesBase;
    if (!entries.length) {
        analiseImprodChart.innerHTML = `<div class="analise-improd-empty">Sem dados para exibir.</div>`;
        return;
    }
    const max = Math.max(...entries.map(([, v]) => v), 1);
    const alturaMax = 190;
    const categorias = Math.max(entries.length - 1, 0);
    analiseImprodChart.innerHTML = `
        <div class="analise-col-chart">
            <div class="analise-chart-head">
                <div>
                    <span>Distribuição</span>
                    <strong>${escapeHtml(titulo)}</strong>
                </div>
                <div class="analise-chart-summary">
                    <b>${fmt2(totalGeral).replace(".00", "")}</b>
                    <small>Total</small>
                </div>
                <div class="analise-chart-summary">
                    <b>${categorias}</b>
                    <small>Categorias</small>
                </div>
                <div class="analise-chart-summary analise-alert-card">
                    <b>${Number(currentAnaliseImprod?.eqDSemCodx || 0)}</b>
                    <small>Eq. D sem Código X</small>
                </div>
            </div>
            <div class="analise-col-plot" style="--cols:${entries.length}">
                ${entries.map(([label, value]) => {
                    const h = Math.max(8, Math.round((Number(value || 0) / max) * alturaMax));
                    const isTotal = String(label).toUpperCase() === "TOTAL GERAL";
                    return `
                    <div class="analise-col-item ${isTotal ? "is-total" : ""}" title="${escapeHtml(label)}: ${fmt2(value)}">
                        <strong>${fmt2(value).replace(".00", "")}</strong>
                        <span style="height:${h}px"></span>
                    </div>`;
                }).join("")}
            </div>
            <div class="analise-col-axis" style="--cols:${entries.length}">
                ${entries.map(([label]) => `<div>${escapeHtml(label)}</div>`).join("")}
            </div>
        </div>
    `;
}

function calcularEqDSemCodxAnalise(listaEquipes = [], codx = []) {
    const codigosComCodx = new Set(codx.map(item => String(item.codigo || "").trim()).filter(Boolean));
    return listaEquipes.filter(item => {
        const codigo = String(item.codigo || "").trim();
        const faixa = String(item.faixaDiaCompleta || item.faixaDia || "").toUpperCase();
        return codigo && faixa === "D" && !codigosComCodx.has(codigo);
    }).length;
}

function calcularUsPerdaAnalisePorEquipe(codigo, datas = []) {
    const datasSet = new Set(datas || []);
    return currentImprodTabelaGeralLinhas
        .filter(item => String(item.codigo || "") === String(codigo || ""))
        .filter(item => !datasSet.size || datasSet.has(String(item.dataISO || item.data || "")) || datasSet.has(String(dataSelect?.value || "")))
        .reduce((acc, item) => acc + Number(item.usPerda || 0), 0);
}

function enriquecerCodxComPerda(codx = [], listaEquipes = []) {
    const mapaEquipe = new Map(listaEquipes.map(item => [String(item.codigo || ""), item]));
    return codx.map(item => {
        const eq = mapaEquipe.get(String(item.codigo || ""));
        const usPerda = Number(item.usPerda || 0) || Number(eq?.improdutivo || 0) || 1;
        return { ...item, usPerda };
    });
}

function enriquecerJustificativasComPerda(lista = [], listaEquipes = []) {
    const mapaEquipe = new Map(listaEquipes.map(item => [String(item.codigo || ""), item]));
    return lista.map(item => {
        const eq = mapaEquipe.get(String(item.codigo || ""));
        const usPerda = Number(item.usPerda || 0) || Number(eq?.improdutivo || 0) || 1;
        return { ...item, usPerda };
    });
}

function renderizarAnaliseImprod() {
    const visao = currentAnaliseImprod.visao || "codx";
    btnAnaliseCodx?.classList.toggle("active", visao === "codx");
    btnAnaliseJust?.classList.toggle("active", visao === "justificativas");
    if (modalAnaliseImprodTitulo) modalAnaliseImprodTitulo.innerText = currentAnaliseImprod.titulo || "Análise de Improdutividade";
    if (modalAnaliseImprodMeta) modalAnaliseImprodMeta.innerText = currentAnaliseImprod.meta || "";

    if (visao === "justificativas") {
        const listaBase = currentAnaliseImprod.justificativas || [];
        const lista = obterListaJustificativasAnaliseFiltradaOrdenada();
        renderizarGraficoAnaliseImprod(lista, "grupo", "JUSTIFICATIVAS POR OCORRÊNCIA");
        renderizarCabecalhoAnaliseJustificativas(listaBase);
        if (analiseImprodBody) {
            analiseImprodBody.innerHTML = lista.length ? lista.map(item => `
                <tr><td>${escapeHtml(item.data)}</td><td>${escapeHtml(item.codigo)}</td><td>${escapeHtml(item.equipe)}</td><td>${escapeHtml(item.grupo)}</td><td>${escapeHtml(item.descricao)}</td><td>${escapeHtml(item.detalhe)}</td></tr>
            `).join("") : `<tr><td colspan="6">Nenhuma justificativa encontrada.</td></tr>`;
        }
        return;
    }

    const lista = currentAnaliseImprod.codx || [];
    renderizarGraficoAnaliseImprod(lista, "codigoX", "CÓDIGOS X POR OCORRÊNCIA");
    if (analiseImprodHead) {
        analiseImprodHead.innerHTML = "<th>Data</th><th>Cód. Equipe</th><th>Equipe</th><th>Código X</th><th>Descrição</th><th>Tempo</th><th>Obs.</th>";
    }
    if (analiseImprodBody) {
        analiseImprodBody.innerHTML = lista.length ? lista.map(item => `
            <tr><td>${escapeHtml(item.data)}</td><td>${escapeHtml(item.codigo)}</td><td>${escapeHtml(item.equipe)}</td><td>${escapeHtml(item.codigoX)}</td><td>${escapeHtml(item.descricao)}</td><td class="col-num">${fmt2(item.tempoMin)}</td><td>${escapeHtml(item.obs)}</td></tr>
        `).join("") : `<tr><td colspan="7">Nenhum Código X encontrado.</td></tr>`;
    }
}

function obterColunasAnaliseJustificativas() {
    return [
        { key: "data", label: "Data" },
        { key: "codigo", label: "Cód. Equipe" },
        { key: "equipe", label: "Equipe" },
        { key: "grupo", label: "Grupo" },
        { key: "descricao", label: "Descrição" },
        { key: "detalhe", label: "Justificativa" }
    ];
}

function renderizarCabecalhoAnaliseJustificativas(listaBase = []) {
    if (!analiseImprodHead) return;
    const colunas = obterColunasAnaliseJustificativas();
    analiseImprodHead.innerHTML = colunas.map((coluna) => {
        const ativo = analiseJustificativasOrdenacao.key === coluna.key;
        const indicador = ativo ? (analiseJustificativasOrdenacao.direcao === "asc" ? "↑" : "↓") : "↕";
        const valores = [...new Set(listaBase.map(item => String(item[coluna.key] ?? "").trim()).filter(Boolean))]
            .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true, sensitivity: "base" }));
        const filtroAtual = String(analiseJustificativasFiltros[coluna.key] || "");

        return `
            <th class="analise-filter-th">
                <button type="button" class="analise-sort-btn" onclick="ordenarAnaliseJustificativas('${coluna.key}')">
                    <span>${escapeHtml(coluna.label)}</span>
                    <span class="sort-indicator">${indicador}</span>
                </button>
                <select class="analise-filter-select" onchange="filtrarAnaliseJustificativas('${coluna.key}', this.value)" title="Filtrar ${escapeHtml(coluna.label)}">
                    <option value="">Todos</option>
                    ${valores.map(valor => `<option value="${escapeHtml(valor)}"${valor === filtroAtual ? " selected" : ""}>${escapeHtml(valor)}</option>`).join("")}
                </select>
            </th>
        `;
    }).join("");
}

function obterListaJustificativasAnaliseFiltradaOrdenada() {
    const filtros = Object.entries(analiseJustificativasFiltros).filter(([, valor]) => String(valor || "").trim());
    let lista = [...(currentAnaliseImprod.justificativas || [])];

    if (filtros.length) {
        lista = lista.filter(item =>
            filtros.every(([key, valor]) => String(item[key] ?? "").trim() === String(valor).trim())
        );
    }

    const { key, direcao } = analiseJustificativasOrdenacao;
    if (key) {
        const fator = direcao === "desc" ? -1 : 1;
        lista.sort((a, b) => String(a[key] ?? "").localeCompare(String(b[key] ?? ""), "pt-BR", {
            numeric: true,
            sensitivity: "base"
        }) * fator);
    }

    return lista;
}

function ordenarAnaliseJustificativas(key) {
    if (analiseJustificativasOrdenacao.key === key) {
        analiseJustificativasOrdenacao.direcao = analiseJustificativasOrdenacao.direcao === "asc" ? "desc" : "asc";
    } else {
        analiseJustificativasOrdenacao = { key, direcao: "asc" };
    }
    renderizarAnaliseImprod();
}

function filtrarAnaliseJustificativas(key, valor) {
    const texto = String(valor || "").trim();
    if (texto) {
        analiseJustificativasFiltros[key] = texto;
    } else {
        delete analiseJustificativasFiltros[key];
    }
    renderizarAnaliseImprod();
}

function trocarVisaoAnaliseImprod(visao) {
    currentAnaliseImprod.visao = visao === "justificativas" ? "justificativas" : "codx";
    renderizarAnaliseImprod();
}

async function abrirModalAnaliseImprod(nomeLinha = "", event = null) {
    if (event?.stopPropagation) event.stopPropagation();
    if (!modalAnaliseImprod) return;
    modalAnaliseImprod.classList.remove("hidden");
    if (analiseImprodBody) analiseImprodBody.innerHTML = `<tr><td colspan="7">Carregando...</td></tr>`;
    if (analiseImprodChart) analiseImprodChart.innerHTML = `<div class="analise-improd-empty">Carregando...</div>`;

    const lista = obterListaAnaliseImprod(nomeLinha);
    const rotulo = nomeLinha ? rotuloGrupoExibicao(nomeLinha) : "TOTAL GERAL";
    currentAnaliseImprod = {
        visao: "codx",
        codx: [],
        justificativas: [],
        titulo: `Análise Med. Improd. - ${rotulo}`,
        meta: `${obterRotuloPeriodoFiltroAtual()} | UO: ${uoSelect?.value || "Todas"} | Equipes: ${lista.length}`,
        eqDSemCodx: 0
    };

    const [codxRaw, justificativasRaw] = await Promise.all([
        coletarCodxAnaliseImprod(lista, nomeLinha),
        Promise.resolve(coletarJustificativasAnaliseImprod(lista, nomeLinha))
    ]);
    currentAnaliseImprod.codx = enriquecerCodxComPerda(codxRaw, lista);
    currentAnaliseImprod.justificativas = enriquecerJustificativasComPerda(justificativasRaw, lista);
    currentAnaliseImprod.eqDSemCodx = calcularEqDSemCodxAnalise(lista, currentAnaliseImprod.codx);
    currentAnaliseImprod.meta = `${currentAnaliseImprod.meta} | Eq. D sem Código X: ${currentAnaliseImprod.eqDSemCodx}`;
    analiseJustificativasFiltros = {};
    analiseJustificativasOrdenacao = { key: "", direcao: "asc" };
    renderizarAnaliseImprod();
}

function fecharModalAnaliseImprod() {
    modalAnaliseImprod?.classList.add("hidden");
    modalAnaliseImprod?.classList.remove("fullscreen");
    if (btnFullscreenAnaliseImprod) btnFullscreenAnaliseImprod.innerText = "Expandir";
}

function toggleFullscreenAnaliseImprod() {
    if (!modalAnaliseImprod) return;
    modalAnaliseImprod.classList.toggle("fullscreen");
    if (btnFullscreenAnaliseImprod) {
        btnFullscreenAnaliseImprod.innerText = modalAnaliseImprod.classList.contains("fullscreen")
            ? "Reduzir"
            : "Expandir";
    }
}

async function baixarModalAnaliseImprodImagem() {
    if (!modalAnaliseImprod || modalAnaliseImprod.classList.contains("hidden")) return;

    try {
        await garantirHtml2Canvas();
    } catch {
        alert("Não foi possível carregar o gerador de imagem.");
        return;
    }

    const conteudo = modalAnaliseImprod.querySelector(".modal-analise-improd");
    if (!conteudo) {
        alert("Conteúdo do modal não encontrado.");
        return;
    }

    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.top = "-9999px";
    wrapper.style.left = "-9999px";
    wrapper.style.zIndex = "99999";
    wrapper.style.background = "#ffffff";
    wrapper.style.color = "#111827";
    wrapper.style.padding = "18px";
    wrapper.style.overflow = "visible";
    wrapper.style.width = "auto";

    const clone = conteudo.cloneNode(true);
    clone.style.width = "max-content";
    clone.style.maxWidth = "none";
    clone.style.maxHeight = "none";
    clone.style.height = "auto";
    clone.style.overflow = "visible";
    clone.querySelector(".modal-header-actions")?.remove();
    clone.querySelectorAll(".analise-improd-grid, .table-wrap, .modal-table-wrap, .analise-improd-chart").forEach(el => {
        el.style.maxHeight = "none";
        el.style.overflow = "visible";
    });
    clone.querySelectorAll("th").forEach(th => {
        th.style.position = "relative";
        th.style.top = "auto";
        th.style.zIndex = "1";
    });

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "analise-med-improd.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }).catch(() => {
        alert("Não foi possível gerar a imagem da análise.");
    }).finally(() => {
        wrapper.remove();
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

    obterLinhasPorDataUo(currentModalContext.data, currentModalContext.uo).forEach(l => {
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
        obterHorariosModalEquipes(data, uo).join(","),
        codigosTurnoSelecionado ? [...codigosTurnoSelecionado].sort().join(",") : "sem-turno",
        codigosKey
    ].join("|");

    if (cacheListasModal.has(cacheKey)) {
        return cacheListasModal.get(cacheKey);
    }

    const horaClicadaNormalizada = normalizarHora(horaClicada);
    const horariosDia = obterHorariosModalEquipes(data, uo);
    const indexFinal = horariosDia.indexOf(horaClicadaNormalizada);
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
            mapa[cod].supervisor = String(l[campoGlobal] || "N/I").trim();
            mapa[cod].frota = obterFrotaLinha(l);
            mapa[cod].equipe = obterValorColuna(l, ["Nome", "NOME_EQUIPE", "NOME", "EQUIPE"]) || "-";
            mapa[cod].tipoEquipe =
                obterValorColuna(l, ["TIPO_EQUIPE", "TIPO EQUIPE", "TIPO", "TIPO_VEICULO", "TIPO VEICULO", "MODALIDADE", "PERFIL_EQUIPE"]) ||
                obterValorColunaPorFragmentos(l, ["tipo", "equipe"]) ||
                obterValorColunaPorFragmentos(l, ["tipo", "veiculo"]) ||
                "";
            mapa[cod].marcadorOperacional = obterMarcadorOperacionalLinha(l);
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

        if (hora === horaClicadaNormalizada) {
            mapa[cod]._temHoraClicada = true;
            mapa[cod].meta = Math.max(
                Number(mapa[cod].meta || 0),
                (ajustarMetaClusterMtami(toNumber(l["Meta Prog."]), supervisor || "", l["Nome"], l[campoGlobal]) / 9) * obterHorasAcumuladas(horaClicadaNormalizada)
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
        .filter(e => !horaClicadaNormalizada || e._temHoraClicada)
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

async function carregarMapaLoteProdTabelaGeral(data) {
    const dataRef = String(data || "").trim();
    const vazio = { porCodigo: new Map(), porSupervisor: new Map() };
    if (!dataRef) return vazio;
    if (cacheLoteProdEquipesTabelaGeral.has(dataRef)) {
        return cacheLoteProdEquipesTabelaGeral.get(dataRef);
    }

    const params = new URLSearchParams();
    params.set("dataInicio", dataRef);
    params.set("dataFim", dataRef);

    try {
        const resp = await fetch(`/api/lote-prod/equipes?${params.toString()}`, { cache: "no-store" });
        if (!resp.ok) throw new Error(`Erro ao carregar lote (${resp.status}).`);

        const payload = await resp.json();
        const rows = Array.isArray(payload?.rows) ? payload.rows : [];
        const porCodigo = new Map();
        const porSupervisor = new Map();

        rows.forEach((row) => {
            const codigo = String(row?.COD_EQUIPE ?? row?.cod_equipe ?? "").trim();
            if (!codigo) return;

            const prod = toNumber(row?.VALOR_US ?? row?.valor_us ?? 0);
            const meta = toNumber(row?.META ?? row?.meta ?? 0);
            const supervisor = normalizarChaveLoteSupervisor(row?.NOME_SUPERVISOR ?? row?.nome_supervisor ?? "");

            const atualCodigo = porCodigo.get(codigo) || { prod: 0, meta: 0 };
            atualCodigo.prod += prod;
            atualCodigo.meta += meta;
            porCodigo.set(codigo, atualCodigo);

            if (supervisor) {
                const atualSupervisor = porSupervisor.get(supervisor) || { prod: 0, meta: 0, codigos: new Set() };
                atualSupervisor.prod += prod;
                atualSupervisor.meta += meta;
                atualSupervisor.codigos.add(codigo);
                porSupervisor.set(supervisor, atualSupervisor);
            }
        });

        const mapa = { porCodigo, porSupervisor };
        cacheLoteProdEquipesTabelaGeral.set(dataRef, mapa);
        return mapa;
    } catch (error) {
        console.error("Erro ao carregar lote produtivo da Tabela Geral:", error);
        cacheLoteProdEquipesTabelaGeral.set(dataRef, vazio);
        return vazio;
    }
}

function normalizarChaveLoteSupervisor(valor) {
    return String(valor || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .toUpperCase();
}

function montarResumoLoteProd(prod, meta, temLote = false) {
    return {
        temLote,
        prod,
        meta,
        perc: temLote && meta > 0 ? (prod / meta) * 100 : 0,
        faixa: temLote && meta > 0 ? classificar((prod / meta) * 100) : "-"
    };
}

function resumirLoteProdPorSupervisor(supervisor, mapaLote = { porSupervisor: new Map() }) {
    const item = mapaLote.porSupervisor?.get(normalizarChaveLoteSupervisor(supervisor));
    if (!item) return montarResumoLoteProd(0, 0, false);
    return montarResumoLoteProd(toNumber(item.prod), toNumber(item.meta), true);
}

function resumirLoteProdPeriodoPorSupervisor(supervisor, datasPeriodo = [], mapasLotePorData = {}) {
    let prod = 0;
    let meta = 0;
    let temLote = false;

    datasPeriodo.forEach((data) => {
        const item = mapasLotePorData[data]?.porSupervisor?.get(normalizarChaveLoteSupervisor(supervisor));
        if (!item) return;
        temLote = true;
        prod += toNumber(item.prod);
        meta += toNumber(item.meta);
    });

    return montarResumoLoteProd(prod, meta, temLote);
}

function resumirLoteProdPorCodigos(codigos = [], mapaLote = { porCodigo: new Map() }) {
    let prod = 0;
    let meta = 0;
    let temLote = false;

    codigos.forEach((codigo) => {
        const item = mapaLote.porCodigo?.get(String(codigo || "").trim());
        if (!item) return;
        temLote = true;
        prod += toNumber(item.prod);
        meta += toNumber(item.meta);
    });

    return montarResumoLoteProd(prod, meta, temLote);
}

function formatarProdLoteTabelaGeral(valor) {
    return fmtDecBR(toNumber(valor) / 100, 2);
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
    return horaEhMomentoAcordo(currentModalContext?.horaClicada, currentModalContext?.data);
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
    mostrarPrevisao13 = false,
    horaFechamentoPrevisao = ""
) {
    const tr = document.querySelector("#modalEquipes thead tr");
    if (!tr) return;
    modalEquipesOrdenacao = { coluna: null, direcao: "desc" };
    const sufixoPrevisao = horaFechamentoPrevisao ? `<br>${escapeHtml(horaFechamentoPrevisao)}h` : "";

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
            <th>Previsão${sufixoPrevisao}<br>Prod.</th>
            <th>Previsão${sufixoPrevisao}<br>% Meta</th>
            <th>Previsão${sufixoPrevisao}<br>Faixa Dia</th>
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
    limparCachesDadosPainel();
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
    const tipo = tipoSelect.value;
    campoGlobal = obterCampoPorTipo(tipo);

    if (modoTabela === "diario") {
        if (periodoFiltroAtivo()) {
            const periodo = obterPeriodoFiltroAtual();
            if (periodo === "semanal") aplicarSemanal();
            if (periodo === "mensal") aplicarMensal();
            if (periodo === "periodo") aplicarPeriodoPersonalizado();
            return;
        }
        aplicarDiario();
        return;
    }

    if (modoTabela === "geral") {
        if (periodoFiltroAtivo()) {
            await aplicarTabelaGeralPeriodo();
            return;
        }
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

    if (modoTabela === "periodo") {
        aplicarPeriodoPersonalizado();
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
    const horasFonte = obterListaHorasPorModo(modoTabela);
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

    obterLinhasPorDataUo(data, uo).forEach(l => {
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

    const horasFonte = obterListaHorasTabelaGeral(uo, data);
    window.__ultimaHoraTabelaGeralDia = horasFonte[horasFonte.length - 1] || "";
    calcularFaixas(campo, uo, data, horasFonte);
    const codigosTurnoSelecionado = obterCodigosTurnoSelecionado(data, uo);

    const horaFiltroRaw = String(horaSelect?.value || "").trim();
    const horaSelecionada = normalizarHora(horaFiltroRaw);
    const faixaAtual = horaSelecionada || ultimaFaixaDisponivel(uo, data);
    if (!faixaAtual) {
        limparTelaSemDados(tipo, "Nenhum dado para a data selecionada");
        return;
    }

    const mapaLoteProd = await carregarMapaLoteProdTabelaGeral(data);
    const codigosTabelaGeral = new Set(
        obterLinhasPorDataUo(data, uo)
            .map(obterCodigoEquipeLinha)
            .filter(Boolean)
    );
    const usarLoteTabelaGeral = modoTabela === "semanal" || modoTabela === "mensal" ||
        [...codigosTabelaGeral].some((codigo) => mapaLoteProd.porCodigo?.has(String(codigo))) ||
        (mapaLoteProd.porSupervisor?.size || 0) > 0;

    montarCabecalhoGeral(tipo, usarLoteTabelaGeral);

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
    let totalProdLote = 0;
    let totalMetaLote = 0;
    const horasFonteIndex = horasFonte.indexOf(faixaAtual);
    const faixaPrevisao = turnoComercialAtivo()
        ? (horasFonte[horasFonteIndex > 0 ? horasFonteIndex - 1 : horasFonteIndex] || faixaAtual)
        : obterFaixaBasePrevisaoTabelaGeral(faixaAtual);

    obterLinhasPorDataUo(data, uo).forEach(l => {
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
        const resumoLote = resumirLoteProdPorSupervisor(nome, mapaLoteProd);
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
        const operacionaisLista = calcularKpisOperacionaisTabelaGeral(listaEquipes);
        const contagemOperacionais = calcularKpisOperacionaisLinhasTabelaGeral({ data, uo, nome, hora: faixaAtual });
        const operacionais = {
            ...operacionaisLista,
            motos: contagemOperacionais.motos,
            multis: contagemOperacionais.multis
        };
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
            prodLote: resumoLote.prod,
            metaLote: resumoLote.meta,
            percLote: resumoLote.perc,
            faixaLote: resumoLote.faixa,
            totalServicosDesignados,
            totalServicosExecutados,
            totalServicosProdutivos,
            totalServicosImprodutivos,
            operacionais,
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
        totalProdLote += item.prodLote;
        totalMetaLote += item.metaLote;
        const nomeEsc = escapeJsString(item.nome);
        currentTabelaGeralResumo.porSupervisor[item.nome] = {
            nome: item.nome,
            metaDia: item.metaDia,
            prodDia: item.prodDia,
            totalEq: item.totalEqLinha,
            totalServicosDesignados: item.totalServicosDesignados,
            totalServicosExecutados: item.totalServicosExecutados,
            totalServicosProdutivos: item.totalServicosProdutivos,
            totalServicosImprodutivos: item.totalServicosImprodutivos,
            loteProd: item.prodLote,
            loteMeta: item.metaLote,
            operacionais: item.operacionais
        };

        linhasHtml.push(`
        <tr data-supervisor-geral="${escapeHtml(item.nome)}">
            <td class="link" onclick="alternarKpisSupervisorTabelaGeral('${nomeEsc}')">${escapeHtml(item.nomeExib)}</td>
            <td>${fmt3(item.metaDia)}</td>
            <td>${fmt3(item.prodDia)}</td>
            <td class="faixa-${item.faixaDia}">${item.faixaDia}</td>
            <td>${item.metaDia > 0 ? `${item.percProdDia.toFixed(2)}%` : "-"}</td>
            ${usarLoteTabelaGeral ? `
                <td>${formatarProdLoteTabelaGeral(item.metaLote)}</td>
                <td>${formatarProdLoteTabelaGeral(item.prodLote)}</td>
                <td>${item.metaLote > 0 ? `${item.percLote.toFixed(2)}%` : "-"}</td>
                <td class="faixa-${item.faixaLote}">${item.faixaLote}</td>
            ` : `
                <td>${fmt3(item.previsaoProd)}</td>
                <td>${item.metaDia > 0 ? `${item.previsaoPercMeta.toFixed(2)}%` : "-"}</td>
                <td class="faixa-${item.metaDia > 0 ? classificar(item.previsaoPercMeta) : "-"}">${item.metaDia > 0 ? classificar(item.previsaoPercMeta) : "-"}</td>
            `}

            <td class="link"
                onclick="abrirModalEquipes('${nomeEsc}', null, '${faixaAtual}')">
                ${item.totalEqLinha}
            </td>
            <td>${fmt2(item.mediaServicosDesignados)}</td>
            <td>${fmt2(item.mediaServicos)}</td>
            <td>${fmt2(item.mediaProdutivos)}</td>
            <td class="improd-analise-click ${item.mediaImprodutivos > 20 ? "improd-alta" : ""}" onclick="abrirModalAnaliseImprod('${nomeEsc}', event)">${fmt2(item.mediaImprodutivos)}%</td>
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
    const operacionaisListaGeral = calcularKpisOperacionaisTabelaGeral(listaTotalEquipes);
    const contagemOperacionaisGeral = calcularKpisOperacionaisLinhasTabelaGeral({ data, uo, hora: faixaAtual });
    const operacionaisGeral = {
        ...operacionaisListaGeral,
        motos: contagemOperacionaisGeral.motos,
        multis: contagemOperacionaisGeral.multis
    };

    currentTabelaGeralResumo.total = {
        metaDia: totalMeta,
        prodDia: totalProd,
        totalEq: totalEqGeral,
        totalServicosDesignados: totalServicosDesignadosGeral,
        totalServicosExecutados: totalServicosExecutadosGeral,
        totalServicosProdutivos: totalServicosProdutivosGeral,
        totalServicosImprodutivos: totalServicosImprodutivosGeral,
        loteProd: totalProdLote,
        loteMeta: totalMetaLote,
        operacionais: operacionaisGeral,
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
        ${usarLoteTabelaGeral ? `
            <td>${formatarProdLoteTabelaGeral(totalMetaLote)}</td>
            <td>${formatarProdLoteTabelaGeral(totalProdLote)}</td>
            <td>${totalMetaLote > 0 ? `${((totalProdLote / totalMetaLote) * 100).toFixed(2)}%` : "-"}</td>
            <td class="faixa-${totalMetaLote > 0 ? classificar((totalProdLote / totalMetaLote) * 100) : "-"}">${totalMetaLote > 0 ? classificar((totalProdLote / totalMetaLote) * 100) : "-"}</td>
        ` : `
            <td>${fmt3(totalPrevisaoProd)}</td>
            <td>${totalMeta > 0 ? `${((totalPrevisaoProd / totalMeta) * 100).toFixed(2)}%` : "-"}</td>
            <td class="faixa-${totalMeta > 0 ? classificar((totalPrevisaoProd / totalMeta) * 100) : "-"}">${totalMeta > 0 ? classificar((totalPrevisaoProd / totalMeta) * 100) : "-"}</td>
        `}

        <td class="link"
            onclick="abrirModalEquipes(null, null, '${faixaAtual}')">
            ${totalEqGeral}
        </td>
        <td>${fmt2(mediaServicosDesignadosGeral)}</td>
        <td>${fmt2(mediaServicosGeral)}</td>
        <td>${fmt2(mediaProdutivosGeral)}</td>
        <td class="improd-analise-click ${mediaImprodutivosGeral > 20 ? "improd-alta" : ""}" onclick="abrirModalAnaliseImprod('', event)">${fmt2(mediaImprodutivosGeral)}%</td>
        <td>${minutosParaHoraTexto(mediaInicioJornadaGeral)}</td>
        <td>${minutosParaHoraTexto(mediaPrimeiroAtendGeral)}</td>
        <td>${minutosParaHoraTexto(mediaUltimoAtendGeral)}</td>
        <td>${minutosParaHoraTexto(mediaJornadaGeral)}</td>
    </tr>`);

    tbody.innerHTML = linhasHtml.join("");
    aplicarOrdenacaoTabelaGeralDom();

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

async function aplicarTabelaGeralPeriodo() {
    const uo = uoSelect.value;
    const tipo = tipoSelect.value;
    const campo = obterCampoPorTipo(tipo);
    const datasPeriodo = obterDatasFiltroPeriodoAtual(uo);

    montarCabecalhoGeral(tipo, true);

    if (!datasPeriodo.length) {
        limparTelaSemDados(tipo, "Nenhum dado para o período selecionado");
        return;
    }

    const resumo = resumirPeriodo(datasPeriodo, campo, uo);
    if (!resumo.diasComDados) {
        limparTelaSemDados(tipo, "Nenhum dado válido para o período selecionado");
        return;
    }

    if (modoAtualTxt) {
        modoAtualTxt.innerText = `Tabela Geral - ${obterRotuloPeriodoFiltroAtual()}`;
    }

    const mapasDesignadosPorData = {};
    const mapasLotePorData = {};
    await Promise.all(datasPeriodo.map(async (data) => {
        try {
            mapasDesignadosPorData[data] = await carregarResumoControleServicoDesignados(data, uo);
        } catch (_) {
            mapasDesignadosPorData[data] = {};
        }
        mapasLotePorData[data] = await carregarMapaLoteProdTabelaGeral(data);
    }));

    const calcularMetricasListaPeriodo = (listaPeriodo = []) => {
        const totalExecutados = listaPeriodo.reduce((acc, item) => acc + toNumber(item.servicos), 0);
        const totalImprodutivos = listaPeriodo.reduce((acc, item) => acc + toNumber(item.improdutivo), 0);

        return {
            mediaServicosDesignados: mediaNumerica(listaPeriodo.map(item => toNumber(item.servicosDesignados))),
            mediaServicos: mediaNumerica(listaPeriodo.map(item => toNumber(item.servicos))),
            mediaProdutivos: mediaNumerica(listaPeriodo.map(item => toNumber(item.produtivo))),
            mediaImprodutivos: totalExecutados > 0 ? (totalImprodutivos / totalExecutados) * 100 : 0,
            operacionais: calcularKpisOperacionaisTabelaGeral(listaPeriodo),
            mediaInicioJornada: mediaNumerica(listaPeriodo.map(item => horaTextoParaMinutos(item.inicioJornada)).filter(v => Number.isFinite(v))),
            mediaPrimeiroAtend: mediaNumerica(listaPeriodo.map(item => horaTextoParaMinutos(item.primeiroAtend)).filter(v => Number.isFinite(v))),
            mediaUltimoAtend: mediaNumerica(listaPeriodo.map(item => horaTextoParaMinutos(item.ultimoAtend)).filter(v => Number.isFinite(v))),
            mediaJornada: mediaNumerica(listaPeriodo.map(item => horaTextoParaMinutos(item.jornadaProd)).filter(v => Number.isFinite(v))),
            totalServicosDesignados: listaPeriodo.reduce((acc, item) => acc + toNumber(item.servicosDesignados), 0),
            totalServicosExecutados: totalExecutados,
            totalServicosProdutivos: listaPeriodo.reduce((acc, item) => acc + toNumber(item.produtivo), 0),
            totalServicosImprodutivos: totalImprodutivos
        };
    };

    const listaPeriodoGeral = [];
    const listasPeriodoPorSupervisor = new Map();

    datasPeriodo.forEach((data) => {
        const faixaAtualData = ultimaFaixaDisponivel(uo, data);
        if (!faixaAtualData) return;

        const listaDia = montarListaEquipesSupervisor("", faixaAtualData, data, uo);
        listaDia.forEach((item) => {
            const codigo = String(item.codigo || "").trim();
            const supervisorItem = String(item.supervisor || "N/I").trim() || "N/I";
            const itemPeriodo = {
                ...item,
                servicosDesignados: codigo ? Number(mapasDesignadosPorData[data]?.[codigo] || 0) : 0
            };
            listaPeriodoGeral.push(itemPeriodo);
            if (!listasPeriodoPorSupervisor.has(supervisorItem)) {
                listasPeriodoPorSupervisor.set(supervisorItem, []);
            }
            listasPeriodoPorSupervisor.get(supervisorItem).push(itemPeriodo);
        });
    });

    const metricasPeriodoPorSupervisor = new Map();
    listasPeriodoPorSupervisor.forEach((lista, supervisor) => {
        metricasPeriodoPorSupervisor.set(supervisor, calcularMetricasListaPeriodo(lista));
    });
    const metricasPeriodoTotal = calcularMetricasListaPeriodo(listaPeriodoGeral);

    const obterMetricasListaPeriodo = (nome = "") => {
        if (!nome) return metricasPeriodoTotal;
        return metricasPeriodoPorSupervisor.get(String(nome).trim()) || calcularMetricasListaPeriodo([]);
    };

    const linhasHtml = [];
    let totalMeta = 0;
    let totalProd = 0;
    let totalMetaLote = 0;
    let totalProdLote = 0;
    let totalEqGeral = 0;

    currentTabelaGeralResumo = {
        porSupervisor: {},
        total: null
    };

    resumo.linhas.forEach((linha) => {
        const totalEqLinha = linha.eq.AA + linha.eq.A + linha.eq.B + linha.eq.C + linha.eq.D;
        const percProdDia = Number(linha.meta || 0) > 0 ? (Number(linha.prod || 0) / Number(linha.meta || 0)) * 100 : 0;
        const faixaDia = classificar(percProdDia);
        const resumoLote = resumirLoteProdPeriodoPorSupervisor(linha.nome, datasPeriodo, mapasLotePorData);
        const nomeEsc = escapeJsString(linha.nome);
        const metricas = obterMetricasListaPeriodo(linha.nome);

        totalMeta += Number(linha.meta || 0);
        totalProd += Number(linha.prod || 0);
        totalMetaLote += resumoLote.meta;
        totalProdLote += resumoLote.prod;
        totalEqGeral += totalEqLinha;

        currentTabelaGeralResumo.porSupervisor[linha.nome] = {
            nome: linha.nome,
            metaDia: Number(linha.meta || 0),
            prodDia: Number(linha.prod || 0),
            totalEq: totalEqLinha,
            totalServicosDesignados: metricas.totalServicosDesignados,
            totalServicosExecutados: metricas.totalServicosExecutados,
            totalServicosProdutivos: metricas.totalServicosProdutivos,
            totalServicosImprodutivos: metricas.totalServicosImprodutivos,
            loteProd: resumoLote.prod,
            loteMeta: resumoLote.meta,
            operacionais: metricas.operacionais
        };

        linhasHtml.push(`
        <tr data-supervisor-geral="${escapeHtml(linha.nome)}">
            <td class="link" onclick="alternarKpisSupervisorTabelaGeral('${nomeEsc}')">${escapeHtml(rotuloGrupoExibicao(linha.nome))}</td>
            <td>${fmt3(linha.meta)}</td>
            <td>${fmt3(linha.prod)}</td>
            <td class="faixa-${faixaDia}">${faixaDia}</td>
            <td>${Number(linha.meta || 0) > 0 ? `${percProdDia.toFixed(2)}%` : "-"}</td>
            <td>${formatarProdLoteTabelaGeral(resumoLote.meta)}</td>
            <td>${formatarProdLoteTabelaGeral(resumoLote.prod)}</td>
            <td>${resumoLote.meta > 0 ? `${resumoLote.perc.toFixed(2)}%` : "-"}</td>
            <td class="faixa-${resumoLote.faixa}">${resumoLote.faixa}</td>
            <td>${fmt2(totalEqLinha)}</td>
            <td>${fmt2(metricas.mediaServicosDesignados)}</td>
            <td>${fmt2(metricas.mediaServicos)}</td>
            <td>${fmt2(metricas.mediaProdutivos)}</td>
            <td class="improd-analise-click ${metricas.mediaImprodutivos > 20 ? "improd-alta" : ""}" onclick="abrirModalAnaliseImprod('${nomeEsc}', event)">${fmt2(metricas.mediaImprodutivos)}%</td>
            <td>${minutosParaHoraTexto(metricas.mediaInicioJornada)}</td>
            <td>${minutosParaHoraTexto(metricas.mediaPrimeiroAtend)}</td>
            <td>${minutosParaHoraTexto(metricas.mediaUltimoAtend)}</td>
            <td>${minutosParaHoraTexto(metricas.mediaJornada)}</td>
        </tr>`);
    });

    const metricasTotal = obterMetricasListaPeriodo("");
    const percTotal = totalMeta > 0 ? (totalProd / totalMeta) * 100 : 0;
    const faixaTotal = classificar(percTotal);
    const percLoteTotal = totalMetaLote > 0 ? (totalProdLote / totalMetaLote) * 100 : 0;
    const faixaLoteTotal = totalMetaLote > 0 ? classificar(percLoteTotal) : "-";

    currentTabelaGeralResumo.total = {
        metaDia: totalMeta,
        prodDia: totalProd,
        totalEq: totalEqGeral,
        totalServicosDesignados: metricasTotal.totalServicosDesignados,
        totalServicosExecutados: metricasTotal.totalServicosExecutados,
        totalServicosProdutivos: metricasTotal.totalServicosProdutivos,
        totalServicosImprodutivos: metricasTotal.totalServicosImprodutivos,
        loteProd: totalProdLote,
        loteMeta: totalMetaLote,
        operacionais: metricasTotal.operacionais
    };

    linhasHtml.push(`
    <tr class="resultado">
        <td>TOTAL GERAL</td>
        <td>${fmt3(totalMeta)}</td>
        <td>${fmt3(totalProd)}</td>
        <td class="faixa-${faixaTotal}">${faixaTotal}</td>
        <td>${totalMeta > 0 ? `${percTotal.toFixed(2)}%` : "-"}</td>
        <td>${formatarProdLoteTabelaGeral(totalMetaLote)}</td>
        <td>${formatarProdLoteTabelaGeral(totalProdLote)}</td>
        <td>${totalMetaLote > 0 ? `${percLoteTotal.toFixed(2)}%` : "-"}</td>
        <td class="faixa-${faixaLoteTotal}">${faixaLoteTotal}</td>
        <td>${fmt2(totalEqGeral)}</td>
        <td>${fmt2(metricasTotal.mediaServicosDesignados)}</td>
        <td>${fmt2(metricasTotal.mediaServicos)}</td>
        <td>${fmt2(metricasTotal.mediaProdutivos)}</td>
        <td class="improd-analise-click ${metricasTotal.mediaImprodutivos > 20 ? "improd-alta" : ""}" onclick="abrirModalAnaliseImprod('', event)">${fmt2(metricasTotal.mediaImprodutivos)}%</td>
        <td>${minutosParaHoraTexto(metricasTotal.mediaInicioJornada)}</td>
        <td>${minutosParaHoraTexto(metricasTotal.mediaPrimeiroAtend)}</td>
        <td>${minutosParaHoraTexto(metricasTotal.mediaUltimoAtend)}</td>
        <td>${minutosParaHoraTexto(metricasTotal.mediaJornada)}</td>
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
        modoAtualTxt.innerText = modoTabela === "diario"
            ? `Tabela Diária - Semana (${intervalo.inicio} a ${intervalo.fim})`
            : `Tabela Semanal (${intervalo.inicio} a ${intervalo.fim})`;
    }

    const linhasHtml = resumo.linhas.map(l => {
        const totalEqLinha = l.eq.AA + l.eq.A + l.eq.B + l.eq.C + l.eq.D;

        return `
        <tr class="linha-periodo-click" onclick="abrirModalPeriodoMedia('${escapeJsString(l.nome)}')">
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

    linhasHtml.push(`
    <tr class="resultado linha-periodo-click" onclick="abrirModalPeriodoMedia('')">
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
    </tr>`);

    tbody.innerHTML = linhasHtml.join("");

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

    if (modoAtualTxt && modoTabela === "diario") {
        modoAtualTxt.innerText = `Tabela Diária - Mês ${anoMes}`;
    }

    const linhasHtml = resumo.linhas.map(l => {
        const totalEqLinha = l.eq.AA + l.eq.A + l.eq.B + l.eq.C + l.eq.D;

        return `
        <tr class="linha-periodo-click" onclick="abrirModalPeriodoMedia('${escapeJsString(l.nome)}')">
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

    linhasHtml.push(`
    <tr class="resultado linha-periodo-click" onclick="abrirModalPeriodoMedia('')">
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
    </tr>`);

    tbody.innerHTML = linhasHtml.join("");

    atualizarKpis(resumo.totalMeta, resumo.totalProd, resumo.eqTot, 2);

    filtrosAtivos = {};
    adicionarFiltrosExcel();
}

/* ================= MODO PERÍODO ================= */

function obterDatasDoPeriodoPersonalizado(uo, inicio, fim) {
    const dataInicio = String(inicio || "").trim();
    const dataFim = String(fim || dataInicio).trim();
    if (!dataInicio || !dataFim) return [];

    const menor = dataInicio <= dataFim ? dataInicio : dataFim;
    const maior = dataInicio <= dataFim ? dataFim : dataInicio;

    return [...new Set(
        obterLinhasPorDataUo("", uo)
            .filter(l => {
                const data = normalizarDataExcel(l["Data"]);
                if (!data) return false;
                return data >= menor && data <= maior;
            })
            .map(l => normalizarDataExcel(l["Data"]))
            .filter(Boolean)
    )].sort();
}

function obterDatasFiltroPeriodoAtual(uo) {
    const periodo = obterPeriodoFiltroAtual();

    if (periodo === "semanal") {
        return obterDatasDaSemanaSelecionada(uo, semanaSelect?.value || "");
    }

    if (periodo === "mensal") {
        return obterDatasDoMes(uo, mesSelect?.value || "");
    }

    if (periodo === "periodo") {
        return obterDatasDoPeriodoPersonalizado(
            uo,
            periodoInicioSelect?.value || "",
            periodoFimSelect?.value || ""
        );
    }

    return dataSelect?.value ? [dataSelect.value] : [];
}

function obterRotuloPeriodoFiltroAtual() {
    const periodo = obterPeriodoFiltroAtual();

    if (periodo === "semanal") {
        const semana = semanaSelect?.value || "";
        if (!semana) return "Semana";
        const intervalo = obterInicioEFimSemanaPorInput(semana);
        return `Semana (${intervalo.inicio} a ${intervalo.fim})`;
    }

    if (periodo === "mensal") {
        return mesSelect?.value ? `Mês ${mesSelect.value}` : "Mês";
    }

    if (periodo === "periodo") {
        const inicio = periodoInicioSelect?.value || "";
        const fim = periodoFimSelect?.value || inicio;
        return inicio && fim ? `Período (${inicio} a ${fim})` : "Período";
    }

    return dataSelect?.value || "Diário";
}

function aplicarPeriodoPersonalizado() {
    const uo = uoSelect.value;
    const inicio = periodoInicioSelect?.value || "";
    const fim = periodoFimSelect?.value || inicio;
    const tipo = tipoSelect.value;
    const campo = obterCampoPorTipo(tipo);

    montarCabecalho(tipo, false);

    if (!inicio || !fim) {
        limparTelaSemDados(tipo, "Selecione a data inicial e final");
        return;
    }

    const dataInicio = inicio <= fim ? inicio : fim;
    const dataFim = inicio <= fim ? fim : inicio;
    const datasPeriodo = obterDatasDoPeriodoPersonalizado(uo, dataInicio, dataFim);

    if (!datasPeriodo.length) {
        limparTelaSemDados(tipo, "Nenhum dado para o período selecionado");
        return;
    }

    const resumo = resumirPeriodo(datasPeriodo, campo, uo);

    if (!resumo.diasComDados) {
        limparTelaSemDados(tipo, "Nenhum dado válido para o período selecionado");
        return;
    }

    if (modoAtualTxt) {
        modoAtualTxt.innerText = modoTabela === "diario"
            ? `Tabela Diária - Período (${dataInicio} a ${dataFim})`
            : `Tabela por Período (${dataInicio} a ${dataFim})`;
    }

    const linhasHtml = resumo.linhas.map(l => {
        const totalEqLinha = l.eq.AA + l.eq.A + l.eq.B + l.eq.C + l.eq.D;

        return `
        <tr class="linha-periodo-click" onclick="abrirModalPeriodoMedia('${escapeJsString(l.nome)}')">
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

    linhasHtml.push(`
    <tr class="resultado linha-periodo-click" onclick="abrirModalPeriodoMedia('')">
        <td>TOTAL PERÍODO</td>
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
    </tr>`);

    tbody.innerHTML = linhasHtml.join("");

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

    const linhasHtml = resumo.linhas.map(l => {
        const totalEqLinha = l.eq.AA + l.eq.A + l.eq.B + l.eq.C + l.eq.D;

        return `
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

    linhasHtml.push(`
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
    </tr>`);

    tbody.innerHTML = linhasHtml.join("");

    atualizarKpis(resumo.totalMeta, resumo.totalProd, resumo.eqTot, 2);

    filtrosAtivos = {};
    adicionarFiltrosExcel();
}

/* ================= MODAL EQUIPES ================= */

function obterDatasPeriodoModoAtual() {
    const uo = uoSelect.value;

    if (modoTabela === "semanal") {
        return obterDatasDaSemanaSelecionada(uo, semanaSelect.value);
    }

    if (modoTabela === "mensal") {
        return obterDatasDoMes(uo, mesSelect.value);
    }

    if (modoTabela === "periodo") {
        return obterDatasDoPeriodoPersonalizado(uo, periodoInicioSelect?.value || "", periodoFimSelect?.value || "");
    }

    return [];
}

function modaValores(valores) {
    const mapa = {};
    valores.forEach(valor => {
        const v = String(valor || "-").toUpperCase();
        if (!v || v === "-") return;
        mapa[v] = (mapa[v] || 0) + 1;
    });
    const ordenado = Object.entries(mapa).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "pt-BR"));
    return ordenado[0]?.[0] || "-";
}

function adicionarMinutoMedia(lista, valor) {
    const minutos = horaTextoParaMinutos(valor);
    if (Number.isFinite(minutos)) lista.push(minutos);
}

function mediaMinutosParaHora(lista) {
    if (!Array.isArray(lista) || !lista.length) return "-";
    const media = Math.round(lista.reduce((acc, valor) => acc + valor, 0) / lista.length);
    return minutosParaHoraTexto(media);
}

function montarListaEquipesMediaPeriodo(nomeLinha = "") {
    const datasPeriodo = obterDatasPeriodoModoAtual();
    const uo = uoSelect.value;
    const mapa = {};

    datasPeriodo.forEach(data => {
        const faixaAtual = ultimaFaixaDisponivel(uo, data);
        if (!faixaAtual) return;

        const listaDia = montarListaEquipesPorFiltro(nomeLinha || null, null, faixaAtual, data, uo);

        listaDia.forEach(item => {
            const codigo = String(item.codigo || "").trim();
            if (!codigo) return;

            if (!mapa[codigo]) {
                mapa[codigo] = {
                    ...montarLinhaResumoEquipePadrao(),
                    codigo,
                    frota: item.frota || "-",
                    equipe: item.equipe || "-",
                    dias: 0,
                    metaDiaSoma: 0,
                    prodDiaSoma: 0,
                    metaSoma: 0,
                    prodSoma: 0,
                    servicosSoma: 0,
                    produtivoSoma: 0,
                    improdutivoSoma: 0,
                    percImprodValores: [],
                    statusValores: [],
                    inicioJornadaMin: [],
                    primeiroAtendMin: [],
                    ultimoAtendMin: [],
                    jornadaProdMin: [],
                    faixasValores: {}
                };
                FAIXAS.forEach(h => mapa[codigo].faixasValores[h] = []);
            }

            const atual = mapa[codigo];
            atual.dias += 1;
            atual.metaDiaSoma += Number(item.metaDia || 0);
            atual.prodDiaSoma += Number(item.prodDia || 0);
            atual.metaSoma += Number(item.meta || 0);
            atual.prodSoma += Number(item.prod || 0);
            atual.servicosSoma += toNumber(item.servicos);
            atual.produtivoSoma += toNumber(item.produtivo);
            atual.improdutivoSoma += toNumber(item.improdutivo);
            if (typeof item.percImprod === "number") atual.percImprodValores.push(item.percImprod);
            atual.statusValores.push(item.statusJornada);
            adicionarMinutoMedia(atual.inicioJornadaMin, item.inicioJornada);
            adicionarMinutoMedia(atual.primeiroAtendMin, item.primeiroAtend);
            adicionarMinutoMedia(atual.ultimoAtendMin, item.ultimoAtend);
            adicionarMinutoMedia(atual.jornadaProdMin, item.jornadaProd);
            FAIXAS.forEach(h => atual.faixasValores[h].push(item.faixas?.[h] || "-"));
        });
    });

    return Object.values(mapa)
        .filter(item => item.dias > 0)
        .map(item => {
            const faixas = {};
            FAIXAS.forEach(h => faixas[h] = modaValores(item.faixasValores[h] || []));
            const metaDia = item.metaDiaSoma / item.dias;
            const prodDia = item.prodDiaSoma / item.dias;
            const meta = item.metaSoma / item.dias;
            const prod = item.prodSoma / item.dias;
            const servicos = item.servicosSoma / item.dias;
            const produtivo = item.produtivoSoma / item.dias;
            const improdutivo = item.improdutivoSoma / item.dias;
            return {
                ...item,
                faixas,
                metaDia,
                prodDia,
                meta,
                prod,
                servicos,
                produtivo,
                improdutivo,
                inicioJornada: mediaMinutosParaHora(item.inicioJornadaMin),
                primeiroAtend: mediaMinutosParaHora(item.primeiroAtendMin),
                ultimoAtend: mediaMinutosParaHora(item.ultimoAtendMin),
                jornadaProd: mediaMinutosParaHora(item.jornadaProdMin),
                percImprod: servicos > 0 ? (improdutivo / servicos) * 100 : "-",
                percProdDiaCompleto: metaDia > 0 ? (prodDia / metaDia) * 100 : 0,
                faixaDiaCompleta: classificar(metaDia > 0 ? (prodDia / metaDia) * 100 : 0),
                percProdDia: meta > 0 ? (prod / meta) * 100 : 0,
                faixaDia: classificar(meta > 0 ? (prod / meta) * 100 : 0),
                statusJornada: modaValores(item.statusValores)
            };
        })
        .sort((a, b) => String(a.equipe).localeCompare(String(b.equipe), "pt-BR"));
}

function abrirModalPeriodoMedia(nomeLinha = "") {
    if (!(modoTabela === "semanal" || modoTabela === "mensal" || modoTabela === "periodo")) return;

    filtrosModal = {};
    currentModalKpiFilter = "todas";
    renderCabecalhoModalCompleto(true, false, FAIXAS, false, false);
    garantirColunaInicioJornada(document.querySelector("#modalEquipes thead tr"));

    const modal = document.getElementById("modalEquipes");
    const body = document.getElementById("modalBody");
    const titulo = document.getElementById("modalTitulo");
    const lista = montarListaEquipesMediaPeriodo(nomeLinha);
    const rotuloPeriodo = modoTabela === "semanal"
        ? "Semana"
        : (modoTabela === "mensal" ? "Mês" : "Período");
    const cabTipo = rotuloTipoAtual();
    const cabTexto = nomeLinha ? `${cabTipo}: ${rotuloGrupoExibicao(nomeLinha)} – ` : "";

    titulo.innerText = `${cabTexto}Média das Equipes | ${rotuloPeriodo}`;

    currentModalContext = {
        tipoModal: "equipes-periodo",
        supervisor: nomeLinha || "",
        horaClicada: "",
        faixaClicada: "",
        data: "",
        uo: uoSelect.value,
        tipoVisao: tipoSelect.value,
        listaAtual: lista,
        kpisFixos: null,
        qtdDAnalisadas: lista.filter(e => e.faixaDiaCompleta === "D").length
    };

    controlarVisibilidadeKpisModal(true);
    fecharCaixaDetalheFaixa();
    fecharCaixaDetalheFaixaDia();
    atualizarKpisModalEquipes(lista);

    body.innerHTML = lista.length ? lista.map(e => {
        const status = String(e.statusJornada || "").toUpperCase();
        const classeStatus = obterClasseStatusJornada(status);
        return `
        <tr data-codigo="${escapeHtml(e.codigo)}">
            <td>${escapeHtml(e.codigo)}</td>
            <td>${escapeHtml(String(e.frota || "-"))}</td>
            <td class="col-equipe">${escapeHtml(e.equipe)}</td>
            <td>${fmt3(e.metaDia)}</td>
            <td>${fmt3(e.prod)}</td>
            <td class="faixa-${e.faixaDiaCompleta}">${e.faixaDiaCompleta}</td>
            <td>${e.percProdDiaCompleto.toFixed(2)}%</td>
            ${FAIXAS.map(h => `<td class="faixa-${e.faixas[h] || "-"}">${e.faixas[h] || "-"}</td>`).join("")}
            <td>${fmt2(e.servicos)}</td>
            <td>${fmt2(e.produtivo)}</td>
            <td>${fmt2(e.improdutivo)}</td>
            <td class="${typeof e.percImprod === "number" && e.percImprod > 20 ? "improd-alta" : ""}">
                ${typeof e.percImprod === "number" ? e.percImprod.toFixed(2) + "%" : "-"}
            </td>
            <td>${horaExcelParaTexto(e.inicioJornada)}</td>
            <td>${horaExcelParaTexto(e.primeiroAtend)}</td>
            <td>${horaExcelParaTexto(e.ultimoAtend)}</td>
            <td>${horaExcelParaTexto(e.jornadaProd)}</td>
            <td class="${classeStatus}">${status}</td>
        </tr>`;
    }).join("") : `<tr><td colspan="${16 + FAIXAS.length}">Nenhuma equipe encontrada para o filtro atual</td></tr>`;

    controlarBotaoFullscreen(lista.length);
    atualizarBotaoAcordos17();
    atualizarBotaoAcordosRs();
    modal.classList.remove("hidden");
    setTimeout(() => adicionarFiltrosModal(), 50);
}

async function abrirModalEquipes(nomeLinha, faixaClicada, horaClicada) {
    if (modoPeriodoAtivo()) {
        alert("Esse detalhe só abre na Tabela Diária.");
        return;
    }

    await prepararDadosModalTurno();
    horaClicada = obterHoraReferenciaModalEquipes(horaClicada);

    filtrosModal = {};

    const data = dataSelect.value;
    const uo = uoSelect.value;
    const mostrarFaixaDia = true;
    const mostrarColunaAcordo = !!nomeLinha;
    const mostrarJustificativa = horaEhMomentoAcordo(horaClicada, data);
    const mostrarPrevisao13 = mostrarJustificativa;

    const horasTabela = obterHorariosModalEquipes();
    const idxHora = horasTabela.indexOf(normalizarHora(horaClicada));
    const horasVisiveis = idxHora >= 0 ? horasTabela.slice(0, idxHora + 1) : horasTabela;

    renderCabecalhoModalCompleto(
        mostrarFaixaDia,
        mostrarColunaAcordo,
        horasVisiveis,
        mostrarJustificativa,
        mostrarPrevisao13,
        obterHoraFechamentoAcordoDia(data)
    );
    garantirColunaInicioJornada(document.querySelector("#modalEquipes thead tr"));

    const modal = document.getElementById("modalEquipes");
    const body = document.getElementById("modalBody");
    const titulo = document.getElementById("modalTitulo");

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
        const previsaoProd = mostrarPrevisao13 ? calcularPrevisaoAcordo(e.prod, horaClicada, data) : 0;
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

    const data = dataSelect.value;
    const uo = uoSelect.value;
    const horasTabela = obterHorariosModalEquipes();
    const horaRef = obterHoraReferenciaModalEquipes(horaClicada);
    const indexFinal = horasTabela.indexOf(horaRef);
    const horasVisiveis = turnoTardeAtivo()
        ? horasTabela
        : (indexFinal >= 0 ? horasTabela.slice(0, indexFinal + 1) : horasTabela);
    const mostrarJustificativa = horaEhMomentoAcordo(horaRef, data);
    const mostrarPrevisao13 = mostrarJustificativa;
    horaClicada = horaRef;

    filtrosModal = {};
    currentModalKpiFilter = "todas";
    renderCabecalhoModalCompleto(
        true,
        true,
        horasVisiveis,
        mostrarJustificativa,
        mostrarPrevisao13,
        obterHoraFechamentoAcordoDia(data)
    );
    garantirColunaInicioJornada(document.querySelector("#modalEquipes thead tr"));

    const modal = document.getElementById("modalEquipes");
    const body = document.getElementById("modalBody");
    const titulo = document.getElementById("modalTitulo");

    const cabTipo = rotuloTipoAtual();
    titulo.innerText = `${cabTipo}: ${rotuloGrupoExibicao(supervisor)} – Equipes | até ${horaClicada}h`;

    const lista = montarListaEquipesSupervisor(
        supervisor,
        horaClicada,
        data,
        uo
    );
    const metaFixaModal = lista.reduce((acc, item) => acc + Number(item.metaDia || item.meta || 0), 0);
    const prodFixaModal = lista.reduce((acc, item) => acc + Number(item.prodDia || item.prod || 0), 0);

    currentModalContext = {
        tipoModal: "faixa",
        supervisor,
        horaClicada,
        faixaClicada: "",
        data,
        uo,
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
        const previsaoProd = mostrarPrevisao13 ? calcularPrevisaoAcordo(e.prod, horaClicada, data) : 0;
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
    const dataReferencia = currentModalContext.data || dataSelect?.value || "";
    const rotulosAcordo = obterRotulosPainelAcordos(horaReferencia, dataReferencia);
    renderizarCabecalhoContextoAcordos(horaReferencia, dataReferencia);

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
            const statusAcordo = montarStatusAcordoFaixa(faixaDia, horaReferencia, dataReferencia);

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
    const horasAcordo = obterHorasPainelAcordos(dataReferencia);

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

            ${horasAcordo.map(hora => `<td class="faixa-${atual.faixas[hora] || "-"}">${atual.faixas[hora] || "-"}</td>`).join("")}

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
    const horaAcordo = obterHoraAcordoDia(data);

    if (ctx.tipoModal === "equipes") {
        return montarListaEquipesPorFiltro(supervisor, ctx.faixaClicada || "", horaAcordo, data, uo);
    }

    return montarListaEquipesSupervisor(supervisor, horaAcordo, data, uo, null);
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
    const horaAcordo = obterHoraAcordoDia(dataCtx);
    const horaFechamentoAcordo = obterHoraFechamentoAcordoDia(dataCtx);

    let ctx = currentModalContext;
    if (!ctx) {
        const listaBase = montarListaEquipesSupervisor(null, horaAcordo, dataCtx, uoCtx, null);
        const metaFixa = listaBase.reduce((acc, item) => acc + Number(item.metaDia || 0), 0);
        const prodFixa = listaBase.reduce((acc, item) => acc + Number(item.prodDia || 0), 0);
        ctx = {
            tipoModal: "menu-rs",
            supervisor: "",
            horaClicada: horaAcordo,
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
    const horaFechamentoNumAlvo = Number(horaFechamentoAcordo);
    const horasFechamentoDisponiveis = [...new Set(linhasContexto
        .map(l => obterHoraLinha(l))
        .filter(h => {
            const n = Number(h);
            return h && Number.isFinite(n) && n <= horaFechamentoNumAlvo;
        }))]
        .sort((a, b) => Number(b) - Number(a));
    const horaFech = horasFechamentoDisponiveis[0] || horaFechamentoAcordo;

    // "Situação momento do acordo" usa 11h nas sextas e 13h nos demais dias.
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

        const previsaoProd = calcularPrevisaoAcordo(prodMomento, horaAcordo, dataCtx);
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
        modalAcordosRsTitulo.innerText = `R$ ACORDOS - ${escopoTitulo} - ${dataTxt} - Momento ${horaAcordo}h - Fechamento ${horaFech}h`;
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

function obterPeriodoRc07Atual() {
    const periodo = String(periodoTabelaSelect?.value || "diario").trim();

    if (periodo === "semanal") {
        const semana = String(semanaSelect?.value || "").trim();
        const intervalo = semana ? obterInicioEFimSemanaPorInput(semana) : null;
        if (intervalo?.inicio && intervalo?.fim) {
            return { inicio: intervalo.inicio, fim: intervalo.fim, label: `Semana ${formatarDataBR(intervalo.inicio)} a ${formatarDataBR(intervalo.fim)}` };
        }
    }

    if (periodo === "mensal") {
        const anoMes = String(mesSelect?.value || obterAnoMesAtual()).trim();
        const [ano, mes] = anoMes.split("-").map(Number);
        if (ano && mes) {
            const inicio = `${anoMes}-01`;
            const fim = formatISODateLocal(new Date(ano, mes, 0));
            return { inicio, fim, label: `Mês ${anoMes}` };
        }
    }

    if (periodo === "periodo") {
        const ini = String(periodoInicioSelect?.value || "").trim();
        const fimRaw = String(periodoFimSelect?.value || ini).trim();
        if (ini && fimRaw) {
            const inicio = ini <= fimRaw ? ini : fimRaw;
            const fim = ini <= fimRaw ? fimRaw : ini;
            return { inicio, fim, label: `${formatarDataBR(inicio)} a ${formatarDataBR(fim)}` };
        }
    }

    const data = String(dataSelect?.value || "").trim();
    return { inicio: data, fim: data, label: formatarDataBR(data) || data || "-" };
}

function obterValorRc07(row, keys) {
    for (const key of keys) {
        const value = row?.[key];
        if (value !== undefined && value !== null && String(value).trim() !== "") return value;
    }
    return "";
}

function normalizarMetaRc07(value) {
    const numero = parseControleServicoNumero(value);
    return Number.isFinite(numero) ? fmt3(numero) : "0.000";
}

function obterNomeEquipeRc07PorCodigo(codigo) {
    const alvo = String(codigo || "").trim();
    if (!alvo) return "";
    const bases = [dadosBase, dados];
    for (const base of bases) {
        const linha = (base || []).find((item) => String(obterValorColuna(item, ["Cód. Equipe", "Cód. Equipe", "CÃ³d. Equipe", "CÃƒÂ³d. Equipe", "COD_EQUIPE", "NUM_EQUIPE"]) || "").trim() === alvo);
        const nome = linha ? obterValorColuna(linha, ["Nome", "NOME_EQUIPE", "NOME", "EQUIPE"]) : "";
        if (nome) return nome;
    }
    return "";
}

const RC07_FLAGS_KEY = "painel_rc07_flags_v1";
let rc07SomenteFlegadas = false;
let rc07UltimaLista = [];
let rc07UltimoContexto = null;
let rc07UltimosMarcados = {};
let rc07UltimosDetalhesMarcados = {};
let rc07Ordenacao = { coluna: null, direcao: "desc" };
let rc07FiltrosColunas = {};

function getRc07Flags() {
    try {
        return JSON.parse(localStorage.getItem(RC07_FLAGS_KEY) || "{}") || {};
    } catch (_) {
        return {};
    }
}

function salvarRc07Flags(flags) {
    localStorage.setItem(RC07_FLAGS_KEY, JSON.stringify(flags || {}));
}

async function carregarRc07MarcadosBanco(contexto) {
    const dataRef = String(contexto?.data || "").trim();
    if (!dataRef) return {};

    const params = new URLSearchParams({
        data_ref: dataRef,
        uo: String(contexto?.uo || ""),
        supervisor: String(contexto?.supervisor || "")
    });

    const resp = await fetch(`/api/rc07/flags?${params.toString()}`, { cache: "no-store" });
    const payload = await resp.json().catch(() => ({}));
    if (!resp.ok || payload?.ok === false) {
        throw new Error(payload?.error || "Erro ao carregar RC07 do banco.");
    }
    rc07UltimosDetalhesMarcados = {};
    (Array.isArray(payload?.rows) ? payload.rows : []).forEach((row) => {
        const codigo = String(row?.codigo_equipe || "").trim();
        if (!codigo) return;
        rc07UltimosDetalhesMarcados[codigo] = {
            horaReferencia: String(row?.hora_referencia || ""),
            frota: String(row?.frota || ""),
            equipe: String(row?.equipe || ""),
            meta: Number(row?.meta_dia || 0),
            prod: Number(row?.prod_dia || 0),
            faixa: String(row?.faixa_dia || "").toUpperCase(),
            perc: Number(row?.perc_prod || 0)
        };
    });
    return payload?.marcados && typeof payload.marcados === "object" ? payload.marcados : {};
}

async function salvarRc07FlagBanco(contexto, item, checked) {
    const horaMomento = normalizarHora(contexto?.hora || "11");
    const snapshotMomento = obterSnapshotEquipeRc07PorHora(item?.codigo, horaMomento, contexto) || item || {};
    const prodMomento = Number(snapshotMomento?.prod ?? snapshotMomento?.prodDia ?? 0);
    const metaMomento = Number(snapshotMomento?.meta ?? snapshotMomento?.metaDia ?? 0);
    const percMomento = Number(snapshotMomento?.percProdDia ?? (metaMomento > 0 ? (prodMomento / metaMomento) * 100 : 0));
    const faixaMomento = String(snapshotMomento?.faixaDia || classificar(percMomento) || "-").toUpperCase();
    const resp = await fetch("/api/rc07/flags/item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            data_ref: contexto?.data || dataSelect?.value || "",
            uo: contexto?.uo || "",
            supervisor: contexto?.supervisor || "",
            hora_referencia: horaMomento,
            codigo_equipe: item?.codigo || "",
            frota: snapshotMomento?.frota || item?.frota || "",
            equipe: snapshotMomento?.equipe || item?.equipe || "",
            meta_dia: metaMomento,
            prod_dia: prodMomento,
            faixa_dia: faixaMomento,
            perc_prod: Number.isFinite(percMomento) ? percMomento : 0,
            checked: Boolean(checked)
        })
    });
    const payload = await resp.json().catch(() => ({}));
    if (resp.status === 404) {
        throw new Error("Endpoint RC07 nao encontrado. Reinicie o servidor do painel para carregar a versao atualizada.");
    }
    if (!resp.ok || payload?.ok === false) {
        throw new Error(payload?.error || "Erro ao salvar RC07 no banco.");
    }
    return payload;
}

function rc07ContextKey(data, uo, supervisor) {
    return [String(data || ""), String(uo || ""), String(supervisor || "")].join("|");
}

function popularFiltrosRc07(dataPadrao, uoPadrao, supervisorPadrao) {
    if (rc07Data) rc07Data.value = dataPadrao || dataSelect?.value || "";

    if (rc07Uo) {
        const uos = [...new Set((dadosBase || dados || []).map((linha) => String(obterValorColuna(linha, ["Cód.UO", "CÃ³d.UO", "CÃƒÂ³d.UO", "COD_UO", "UO"]) || "").trim()).filter(Boolean))].sort();
        rc07Uo.innerHTML = `<option value="">Todas</option>` + uos.map((uo) => `<option value="${escapeHtml(uo)}">${escapeHtml(uo)}</option>`).join("");
        rc07Uo.value = uoPadrao || uoSelect?.value || "";
    }

    if (rc07Supervisor) {
        const dataRef = rc07Data?.value || dataPadrao || dataSelect?.value || "";
        const uoRef = rc07Uo?.value || uoPadrao || "";
        const supervisores = [...new Set(obterLinhasPorDataUo(dataRef, uoRef).map((linha) => String(linha[campoGlobal] || "N/I").trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR"));
        rc07Supervisor.innerHTML = `<option value="">Todos</option>` + supervisores.map((sup) => `<option value="${escapeHtml(sup)}">${escapeHtml(rotuloGrupoExibicao(sup))}</option>`).join("");
        if (supervisorPadrao && supervisores.includes(supervisorPadrao)) rc07Supervisor.value = supervisorPadrao;
    }
}

function obterEquipesRc07Filtradas() {
    const data = String(rc07Data?.value || dataSelect?.value || "").trim();
    const uo = String(rc07Uo?.value || "").trim();
    const supervisor = String(rc07Supervisor?.value || "").trim();
    const hora = obterHoraReferenciaModalEquipes(horaSelect?.value || "");

    if (supervisor) {
        return { data, uo, supervisor, hora, lista: montarListaEquipesSupervisor(supervisor, hora, data, uo, null) };
    }

    const supervisores = [...new Set(obterLinhasPorDataUo(data, uo).map((linha) => String(linha[campoGlobal] || "N/I").trim()).filter(Boolean))];
    const mapa = new Map();
    supervisores.forEach((sup) => {
        montarListaEquipesSupervisor(sup, hora, data, uo, null).forEach((equipe) => {
            if (!mapa.has(String(equipe.codigo))) mapa.set(String(equipe.codigo), equipe);
        });
    });
    return { data, uo, supervisor, hora, lista: [...mapa.values()].sort((a, b) => String(a.equipe).localeCompare(String(b.equipe), "pt-BR")) };
}

function obterListaRc07Visivel(lista, marcados) {
    if (!rc07SomenteFlegadas) return lista;
    return (lista || []).filter((item) => marcados?.[String(item.codigo || "").trim()]);
}

function atualizarEstadoFiltroRc07() {
    const card = document.getElementById("cardKpiRc07Flegadas");
    if (card) {
        card.classList.toggle("ativo", rc07SomenteFlegadas);
        card.title = rc07SomenteFlegadas ? "Voltar para todas as equipes" : "Mostrar somente equipes flegadas";
    }
}

function alternarFiltroRc07Flegadas() {
    rc07SomenteFlegadas = !rc07SomenteFlegadas;
    atualizarEstadoFiltroRc07();
    configurarTabelaRc07Interativa();
    if (rc07UltimoContexto) {
        renderizarModalRc07(rc07UltimaLista, rc07UltimoContexto, rc07UltimosMarcados);
    }
}

function obterValorColunaRc07(item, coluna, marcados = {}) {
    const codigo = String(item?.codigo || "").trim();
    const prodDia = Number(item?.prodDia || 0);
    const metaDia = Number(item?.metaDia || 0);
    const percProd = Number(item?.percProdDiaCompleto ?? (metaDia > 0 ? (prodDia / metaDia) * 100 : 0));
    const faixaDia = String(item?.faixaDiaCompleta || item?.faixaDia || classificar(percProd) || "-").toUpperCase();

    if (coluna === "desg") return marcados?.[codigo] ? "FLEGADA" : "NAO FLEGADA";
    if (coluna === "codigo") return codigo || "-";
    if (coluna === "frota") return String(item?.frota || "-");
    if (coluna === "equipe") return String(item?.equipe || "-");
    if (coluna === "meta") return metaDia;
    if (coluna === "prod") return prodDia;
    if (coluna === "faixa") return faixaDia;
    if (coluna === "perc") return Number.isFinite(percProd) ? percProd : 0;
    return "";
}

function obterTextoFiltroRc07(item, coluna, marcados = {}) {
    const valor = obterValorColunaRc07(item, coluna, marcados);
    if (coluna === "meta" || coluna === "prod") return fmt3(Number(valor || 0));
    if (coluna === "perc") return `${Number(valor || 0).toFixed(2)}%`;
    return String(valor || "-");
}

function filtrarOrdenarListaRc07(lista, marcados = {}) {
    let resultado = [...(lista || [])].filter((item) => {
        return Object.entries(rc07FiltrosColunas).every(([coluna, selecionados]) => {
            if (!Array.isArray(selecionados) || !selecionados.length) return true;
            return selecionados.includes(obterTextoFiltroRc07(item, coluna, marcados));
        });
    });

    if (rc07Ordenacao.coluna) {
        const { coluna, direcao } = rc07Ordenacao;
        resultado.sort((a, b) => {
            const valorA = obterValorColunaRc07(a, coluna, marcados);
            const valorB = obterValorColunaRc07(b, coluna, marcados);
            let cmp = 0;
            if (coluna === "meta" || coluna === "prod" || coluna === "perc") {
                cmp = Number(valorA || 0) - Number(valorB || 0);
                if ((direcao || "desc") === "desc") cmp = -cmp;
            } else {
                cmp = compararValorOrdenacaoModal(valorA, valorB, direcao || "desc");
            }
            if (cmp !== 0) return cmp;
            return String(a?.codigo || "").localeCompare(String(b?.codigo || ""), "pt-BR", { numeric: true });
        });
    }

    return resultado;
}

function atualizarIndicadoresRc07() {
    document.querySelectorAll(".tabela-rc07 thead th[data-rc07-col]").forEach((th) => {
        const coluna = th.dataset.rc07Col;
        const indicador = th.querySelector(".sort-indicator");
        const filtro = th.querySelector(".filter-pro");
        const ativoOrdenacao = rc07Ordenacao.coluna === coluna;
        th.classList.toggle("sort-active", ativoOrdenacao);
        if (indicador) {
            indicador.textContent = ativoOrdenacao
                ? (rc07Ordenacao.direcao === "asc" ? "↑" : "↓")
                : "↕";
        }
        if (filtro) filtro.classList.toggle("ativo", Array.isArray(rc07FiltrosColunas[coluna]));
    });
}

function ordenarRc07PorColuna(coluna) {
    const direcao =
        rc07Ordenacao.coluna === coluna && rc07Ordenacao.direcao === "desc"
            ? "asc"
            : "desc";
    rc07Ordenacao = { coluna, direcao };
    renderizarModalRc07(rc07UltimaLista, rc07UltimoContexto, rc07UltimosMarcados);
}

function abrirFiltroRc07(th, coluna, icon) {
    document.querySelectorAll(".painel-flutuante").forEach(painel => painel.remove());

    const marcados = rc07UltimosMarcados || {};
    const valores = [...new Set(
        obterListaRc07Visivel(rc07UltimaLista, marcados)
            .map((item) => obterTextoFiltroRc07(item, coluna, marcados))
            .filter(Boolean)
    )].sort((a, b) => compararValorOrdenacaoModal(a, b, "asc"));

    const painel = document.createElement("div");
    painel.className = "painel-flutuante painel-rc07-filtro";

    const busca = document.createElement("input");
    busca.type = "text";
    busca.placeholder = "Buscar...";
    busca.className = "painel-busca";

    const lista = document.createElement("div");
    lista.className = "painel-lista";

    const footer = document.createElement("div");
    footer.className = "painel-footer";

    const btnLimpar = document.createElement("button");
    btnLimpar.textContent = "Limpar";
    const btnAplicar = document.createElement("button");
    btnAplicar.textContent = "Aplicar";

    footer.appendChild(btnLimpar);
    footer.appendChild(btnAplicar);
    painel.appendChild(busca);
    painel.appendChild(lista);
    painel.appendChild(footer);
    document.body.appendChild(painel);

    const selecionadosAtuais = rc07FiltrosColunas[coluna];
    const labelTodas = document.createElement("label");
    labelTodas.className = "painel-item painel-item-todas";
    const checkboxTodas = document.createElement("input");
    checkboxTodas.type = "checkbox";
    checkboxTodas.checked = !selecionadosAtuais || selecionadosAtuais.length === valores.length;
    labelTodas.appendChild(checkboxTodas);
    labelTodas.append(" Selecionar todas");
    lista.appendChild(labelTodas);

    valores.forEach((valor) => {
        const label = document.createElement("label");
        label.className = "painel-item";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = valor;
        checkbox.checked = !selecionadosAtuais || selecionadosAtuais.includes(valor);
        checkbox.addEventListener("change", () => {
            const itens = [...lista.querySelectorAll(".painel-item input")].filter(cb => cb !== checkboxTodas);
            checkboxTodas.checked = itens.every(cb => cb.checked);
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
        lista.querySelectorAll(".painel-item").forEach((item, index) => {
            item.style.display = index === 0 || item.innerText.toLowerCase().includes(termo) ? "flex" : "none";
        });
    });

    btnAplicar.addEventListener("click", () => {
        const selecionados = [...lista.querySelectorAll(".painel-item input:checked")]
            .filter(cb => cb !== checkboxTodas)
            .map(cb => cb.value);

        if (!selecionados.length || selecionados.length === valores.length) delete rc07FiltrosColunas[coluna];
        else rc07FiltrosColunas[coluna] = selecionados;

        painel.remove();
        icon.classList.toggle("ativo", Array.isArray(rc07FiltrosColunas[coluna]));
        renderizarModalRc07(rc07UltimaLista, rc07UltimoContexto, rc07UltimosMarcados);
    });

    btnLimpar.addEventListener("click", () => {
        delete rc07FiltrosColunas[coluna];
        painel.remove();
        icon.classList.remove("ativo");
        renderizarModalRc07(rc07UltimaLista, rc07UltimoContexto, rc07UltimosMarcados);
    });

    const rect = th.getBoundingClientRect();
    painel.style.top = `${rect.bottom + 4}px`;
    painel.style.left = `${Math.min(rect.left, window.innerWidth - 280)}px`;

    document.addEventListener("click", function fechar(e) {
        if (!painel.contains(e.target) && !icon.contains(e.target)) {
            painel.remove();
            document.removeEventListener("click", fechar);
        }
    });
}

function configurarTabelaRc07Interativa() {
    document.querySelectorAll(".tabela-rc07 thead th[data-rc07-col]").forEach((th) => {
        const coluna = th.dataset.rc07Col;
        if (!coluna) return;

        if (th.dataset.rc07Bound !== "1") {
            th.dataset.rc07Bound = "1";
            th.classList.add("sortable-th", "rc07-filterable-th");
            th.title = "Clique para ordenar";

            const label = document.createElement("span");
            label.className = "th-label";
            label.textContent = th.textContent.trim();
            th.textContent = "";
            th.appendChild(label);

            const indicador = document.createElement("span");
            indicador.className = "sort-indicator";
            indicador.setAttribute("aria-hidden", "true");
            indicador.textContent = "↕";
            th.appendChild(indicador);

            const filtro = document.createElement("span");
            filtro.className = "filter-pro";
            filtro.textContent = "▾";
            filtro.title = "Filtrar coluna";
            th.appendChild(filtro);

            th.addEventListener("click", () => ordenarRc07PorColuna(coluna));
            filtro.addEventListener("click", (event) => {
                event.stopPropagation();
                abrirFiltroRc07(th, coluna, filtro);
            });
        }
    });

    atualizarIndicadoresRc07();
}

async function baixarRc07FlegadasImagem() {
    const lista = obterListaRc07Visivel(rc07UltimaLista, rc07UltimosMarcados)
        .filter((item) => rc07UltimosMarcados?.[String(item.codigo || "").trim()]);

    if (!lista.length) {
        alert("Nenhuma equipe flegada para exportar.");
        return;
    }

    try {
        await garantirHtml2Canvas();
    } catch {
        alert("Nao foi possivel carregar o gerador de imagem.");
        return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "rc07-export-wrapper";
    wrapper.style.position = "fixed";
    wrapper.style.top = "-9999px";
    wrapper.style.left = "-9999px";
    wrapper.style.zIndex = "99999";

    const titulo = document.createElement("div");
    titulo.className = "rc07-export-title";
    titulo.textContent = "Equipes Flegadas RC07";

    const subtitulo = document.createElement("div");
    subtitulo.className = "rc07-export-subtitle";
    const supTxt = rc07UltimoContexto?.supervisor ? ` | Supervisor: ${rotuloGrupoExibicao(rc07UltimoContexto.supervisor)}` : " | Todos os supervisores";
    subtitulo.textContent = `${formatarDataBR(rc07UltimoContexto?.data) || rc07UltimoContexto?.data || "-"}${rc07UltimoContexto?.uo ? ` | UO ${rc07UltimoContexto.uo}` : ""}${supTxt}`;

    const tabela = document.createElement("table");
    tabela.className = "rc07-export-table";
    tabela.innerHTML = `
        <thead>
            <tr>
                <th>DESG. RC07</th>
                <th>Cod.Ep.</th>
                <th>Frota</th>
                <th>Equipes</th>
            </tr>
        </thead>
        <tbody>
            ${lista.map((item) => `
                <tr>
                    <td>→</td>
                    <td>${escapeHtml(String(item.codigo || "-"))}</td>
                    <td>${escapeHtml(String(item.frota || "-"))}</td>
                    <td>${escapeHtml(String(item.equipe || "-"))}</td>
                </tr>
            `).join("")}
        </tbody>
    `;

    wrapper.appendChild(titulo);
    wrapper.appendChild(subtitulo);
    wrapper.appendChild(tabela);
    document.body.appendChild(wrapper);

    html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0
    }).then((canvas) => {
        const link = document.createElement("a");
        const dataArquivo = String(rc07UltimoContexto?.data || obterHojeISO()).replaceAll("-", "");
        link.download = `rc07-flegadas-${dataArquivo}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    }).catch(() => {
        alert("Nao foi possivel gerar a imagem das equipes flegadas.");
    }).finally(() => {
        wrapper.remove();
    });
}

function renderizarModalRc07(lista, contexto, marcadosBanco = null) {
    if (!modalRc07Body) return;
    const flags = getRc07Flags();
    const key = rc07ContextKey(contexto?.data, contexto?.uo, contexto?.supervisor);
    const marcados = marcadosBanco || flags[key] || {};
    rc07UltimaLista = lista || [];
    rc07UltimoContexto = contexto || null;
    rc07UltimosMarcados = { ...marcados };
    atualizarEstadoFiltroRc07();
    currentModalContext = {
        tipoModal: "rc07",
        data: contexto?.data || dataSelect?.value || "",
        uo: contexto?.uo || uoSelect?.value || "",
        supervisor: contexto?.supervisor || "",
        horaClicada: contexto?.hora || horaSelect?.value || "",
        listaAtual: lista
    };

    const listaVisivel = filtrarOrdenarListaRc07(obterListaRc07Visivel(lista, marcados), marcados);
    const linhas = listaVisivel.map((item) => {
        const codigo = String(item.codigo || "").trim();
        const checked = marcados[codigo] ? "checked" : "";
        const prodDia = Number(item.prodDia || 0);
        const metaDia = Number(item.metaDia || 0);
        const percProd = Number(item.percProdDiaCompleto ?? (metaDia > 0 ? (prodDia / metaDia) * 100 : 0));
        const faixaDia = String(item.faixaDiaCompleta || item.faixaDia || classificar(percProd) || "-").toUpperCase();
        return `
            <tr data-codigo="${escapeHtml(codigo)}">
                <td class="col-rc07-desg">
                    <input class="rc07-check" type="checkbox" data-codigo="${escapeHtml(codigo)}" ${checked} aria-label="Flegar RC07">
                </td>
                <td>${escapeHtml(codigo || "-")}</td>
                <td>${escapeHtml(String(item.frota || "-"))}</td>
                <td class="col-equipe">${escapeHtml(String(item.equipe || "-"))}</td>
                <td>${fmt3(metaDia)}</td>
                <td>${fmt3(prodDia)}</td>
                <td class="faixa-${escapeHtml(faixaDia)}">${escapeHtml(faixaDia)}</td>
                <td>${Number.isFinite(percProd) ? percProd.toFixed(2) : "0.00"}%</td>
                <td>
                    <button class="btn-rc07-servicos" type="button" onclick="abrirModalControleServico('${escapeJsString(codigo)}', event)">
                        Abrir serviços
                    </button>
                </td>
            </tr>
        `;
    }).join("");

    modalRc07Body.innerHTML = linhas || `<tr><td colspan="9">${rc07SomenteFlegadas ? "Nenhuma equipe flegada encontrada." : "Nenhuma equipe encontrada para os filtros."}</td></tr>`;
    atualizarIndicadoresRc07();

    modalRc07Body.querySelectorAll(".rc07-check").forEach((input) => {
        input.addEventListener("change", async () => {
            const atual = getRc07Flags();
            const atualMarcados = atual[key] || {};
            const codigo = String(input.dataset.codigo || "").trim();
            const item = lista.find((equipe) => String(equipe.codigo || "").trim() === codigo) || { codigo };
            const checkedAnterior = !input.checked;
            const detalheAnterior = rc07UltimosDetalhesMarcados[codigo] ? { ...rc07UltimosDetalhesMarcados[codigo] } : null;
            if (input.checked) atualMarcados[codigo] = true;
            else delete atualMarcados[codigo];
            if (input.checked) {
                const horaMomento = normalizarHora(contexto?.hora || "11");
                const snapshotMomento = obterSnapshotEquipeRc07PorHora(codigo, horaMomento, contexto) || item || {};
                const prodMomento = Number(snapshotMomento?.prod ?? snapshotMomento?.prodDia ?? 0);
                const metaMomento = Number(snapshotMomento?.meta ?? snapshotMomento?.metaDia ?? 0);
                const percMomento = Number(snapshotMomento?.percProdDia ?? (metaMomento > 0 ? (prodMomento / metaMomento) * 100 : 0));
                rc07UltimosDetalhesMarcados[codigo] = {
                    horaReferencia: horaMomento,
                    frota: String(snapshotMomento?.frota || item?.frota || ""),
                    equipe: String(snapshotMomento?.equipe || item?.equipe || ""),
                    meta: metaMomento,
                    prod: prodMomento,
                    faixa: String(snapshotMomento?.faixaDia || classificar(percMomento) || "-").toUpperCase(),
                    perc: Number.isFinite(percMomento) ? percMomento : 0
                };
            } else {
                delete rc07UltimosDetalhesMarcados[codigo];
            }
            atual[key] = atualMarcados;
            salvarRc07Flags(atual);
            rc07UltimosMarcados = { ...atualMarcados };
            if (kpiRc07Total) kpiRc07Total.innerText = String(Object.keys(atualMarcados).length);
            input.disabled = true;
            try {
                await salvarRc07FlagBanco(contexto, item, input.checked);
                if (rc07SomenteFlegadas && !input.checked) {
                    renderizarModalRc07(lista, contexto, atualMarcados);
                }
            } catch (error) {
                input.checked = checkedAnterior;
                if (checkedAnterior) atualMarcados[codigo] = true;
                else delete atualMarcados[codigo];
                atual[key] = atualMarcados;
                salvarRc07Flags(atual);
                if (detalheAnterior) rc07UltimosDetalhesMarcados[codigo] = detalheAnterior;
                else delete rc07UltimosDetalhesMarcados[codigo];
                rc07UltimosMarcados = { ...atualMarcados };
                if (kpiRc07Total) kpiRc07Total.innerText = String(Object.keys(atualMarcados).length);
                alert(`Nao foi possivel salvar no banco: ${String(error?.message || error)}`);
            } finally {
                input.disabled = false;
            }
        });
    });

    const metaTotal = lista.reduce((acc, item) => acc + Number(item.metaDia || 0), 0);
    if (kpiRc07Total) kpiRc07Total.innerText = String(Object.keys(marcados).length);
    if (kpiRc07Equipes) kpiRc07Equipes.innerText = String(lista.length);
    if (kpiRc07Meta) kpiRc07Meta.innerText = fmt3(metaTotal);
    if (modalRc07Meta) {
        const supTxt = contexto?.supervisor ? ` | Supervisor: ${rotuloGrupoExibicao(contexto.supervisor)}` : " | Todos os supervisores";
        modalRc07Meta.innerText = `${formatarDataBR(contexto?.data) || contexto?.data || "-"}${contexto?.uo ? ` | UO ${contexto.uo}` : ""}${supTxt}`;
    }
}

function obterCodigosRc07Flegados() {
    return new Set(
        Object.entries(rc07UltimosMarcados || {})
            .filter(([, marcado]) => !!marcado)
            .map(([codigo]) => String(codigo || "").trim())
            .filter(Boolean)
    );
}

function linhaServicoEhRc07(row) {
    const codAtiv = String(obterValorControleServico(row, ["COD_ATIV", "COD ATIV", "CODATIV"]) || "").trim().toUpperCase();
    const tipoServico = String(obterValorControleServico(row, ["TIPO_SERVICO", "TIPO SERVICO", "TIPO"]) || "").trim().toUpperCase();
    return codAtiv === "RC07" || tipoServico.includes("RC07");
}

function obterMenorHoraControleServico(rows, candidates) {
    const minutos = rows
        .map(row => horaTextoParaMinutos(formatarHoraControleServico(obterValorControleServico(row, candidates))))
        .filter(v => Number.isFinite(v));
    if (!minutos.length) return "-";
    return minutosParaHora(Math.min(...minutos));
}

function obterMaiorHoraControleServico(rows, candidates) {
    const minutos = rows
        .map(row => horaTextoParaMinutos(formatarHoraControleServico(obterValorControleServico(row, candidates))))
        .filter(v => Number.isFinite(v));
    if (!minutos.length) return "-";
    return minutosParaHora(Math.max(...minutos));
}

function obterSnapshotEquipeRc07PorHora(codigo, hora, contexto = {}) {
    const cod = String(codigo || "").trim();
    const horaRef = normalizarHora(hora);
    const data = String(contexto?.data || dataSelect?.value || "").trim();
    const uo = String(contexto?.uo || uoSelect?.value || "").trim();
    const supervisor = String(contexto?.supervisor || "").trim();
    if (!cod || !horaRef) return null;

    const linha = obterLinhasContextoModal(data, uo).find((row) => {
        if (obterCodigoEquipeLinha(row) !== cod) return false;
        if (obterHoraLinhaModalEquipes(row) !== horaRef) return false;
        if (supervisor && String(row[campoGlobal] || "N/I").trim() !== supervisor) return false;
        return true;
    });

    if (!linha) return null;

    const metaDia = ajustarMetaClusterMtami(
        toNumber(obterValorColuna(linha, ["Meta Prog.", "META PROG", "META_PROG", "META"])),
        supervisor || linha[campoGlobal] || "",
        obterValorColuna(linha, ["Nome", "NOME_EQUIPE", "NOME", "EQUIPE"]),
        linha[campoGlobal]
    );
    const meta = (Number(metaDia || 0) / 9) * obterHorasAcumuladas(horaRef);
    const prod = obterProducaoLinha(linha);
    const perc = meta > 0 ? (prod / meta) * 100 : 0;
    const faixa = String(linha["Classificação"] || classificar(perc) || "-").toUpperCase();

    return {
        codigo: cod,
        frota: obterFrotaLinha(linha),
        equipe: obterValorColuna(linha, ["Nome", "NOME_EQUIPE", "NOME", "EQUIPE"]) || "-",
        supervisor: String(linha[campoGlobal] || supervisor || "").trim(),
        metaDia,
        meta,
        prod,
        percProdDia: perc,
        faixaDia: faixa
    };
}

function obterSnapshotMomentoRc07Flegada(item, contexto, detalheFlag = {}) {
    const codigo = String(item?.codigo || "").trim();
    const horaReferencia = normalizarHora(detalheFlag.horaReferencia || "11");
    const snapshotDireto = obterSnapshotEquipeRc07PorHora(codigo, horaReferencia, contexto);
    if (snapshotDireto) return snapshotDireto;

    return item || {};
}

async function montarLinhaTabelaRc07Flegada(item, contexto) {
    const data = String(contexto?.data || dataSelect?.value || "").trim();
    const uo = String(contexto?.uo || uoSelect?.value || "").trim();
    const codigo = String(item?.codigo || "").trim();
    const detalheFlag = rc07UltimosDetalhesMarcados[codigo] || {};
    const snapshotMomento = obterSnapshotMomentoRc07Flegada(item, contexto, detalheFlag);
    let rows = [];

    try {
        rows = await carregarControleServico(data, uo, codigo);
    } catch (error) {
        console.warn("Falha ao carregar servicos da equipe flegada RC07.", codigo, error);
    }

    const rowsRc07 = rows.filter(linhaServicoEhRc07);
    const temRc07 = rowsRc07.length > 0;
    const produtivos = temRc07
        ? rowsRc07.filter(row => normalizarProdutivoFlag(obterValorControleServico(row, ["PRODUTIVO", "PRODUTIVOS"])) === "SIM").length
        : "";
    const improdutivos = temRc07
        ? rowsRc07.filter(row => normalizarProdutivoFlag(obterValorControleServico(row, ["PRODUTIVO", "PRODUTIVOS"])) === "NÃO").length
        : "";
    const realizados = produtivos + improdutivos;
    const percImprod = temRc07 && realizados > 0 ? (Number(improdutivos || 0) / realizados) * 100 : "";
    const prodMomento = Number(snapshotMomento?.prod ?? detalheFlag.prod ?? item?.prod ?? item?.prodDia ?? 0);
    const metaDiaEquipe = Number(snapshotMomento?.metaDia ?? item?.metaDia ?? detalheFlag.metaDia ?? 0);
    const percMomento = metaDiaEquipe > 0 ? (prodMomento / metaDiaEquipe) * 100 : 0;
    const faixaMomento = String(classificar(percMomento) || "-").toUpperCase();
    const snapshotFinal = obterSnapshotEquipeRc07PorHora(codigo, "17", contexto);
    const faixaFinal = String(snapshotFinal?.faixaDia || item?.faixaDiaCompleta || item?.faixaDia || "-").toUpperCase();
    const primeiroEncerramentoRc07 = temRc07 ? obterMenorHoraControleServico(rowsRc07, ["DATA_TERMINO_REAL", "ENCERRAMENTO", "DATA_TERMINO"]) : "";
    const ultimoEncerramentoRc07 = temRc07 ? obterMaiorHoraControleServico(rowsRc07, ["DATA_TERMINO_REAL", "ENCERRAMENTO", "DATA_TERMINO"]) : "";

    return {
        codigo,
        frota: String(detalheFlag.frota || item?.frota || "-"),
        equipe: String(detalheFlag.equipe || item?.equipe || "-"),
        meta: metaDiaEquipe,
        prod: prodMomento,
        faixa: faixaMomento,
        percProd: percMomento,
        totalServicos: rows.length || Number(item?.servicosDesignados || item?.servicos || 0) || "",
        cod7Designados: temRc07 ? rowsRc07.length : "",
        rc07: temRc07 ? realizados : "",
        produtivos: temRc07 ? produtivos : "",
        improdutivos: temRc07 ? improdutivos : "",
        percImprod,
        primeiroAtend: temRc07 ? primeiroEncerramentoRc07 : "",
        ultimoAtend: temRc07 ? ultimoEncerramentoRc07 : "",
        faixaFinal
    };
}

function renderizarTabelaRc07Flegadas(linhas = []) {
    if (!modalRc07FlegadasBody) return;

    if (!linhas.length) {
        modalRc07FlegadasBody.innerHTML = `<tr><td colspan="16">Nenhuma equipe flegada encontrada.</td></tr>`;
        return;
    }

    modalRc07FlegadasBody.innerHTML = linhas.map((linha) => `
        <tr>
            <td>${escapeHtml(linha.codigo || "-")}</td>
            <td>${escapeHtml(linha.frota || "-")}</td>
            <td class="col-equipe">${escapeHtml(linha.equipe || "-")}</td>
            <td>${fmt3(linha.meta)}</td>
            <td>${fmt3(linha.prod)}</td>
            <td class="faixa-${escapeHtml(linha.faixa || "-")}">${escapeHtml(linha.faixa || "-")}</td>
            <td>${Number.isFinite(linha.percProd) ? linha.percProd.toFixed(2) : "0.00"}%</td>
            <td>${escapeHtml(String(linha.totalServicos || ""))}</td>
            <td>${escapeHtml(String(linha.cod7Designados || ""))}</td>
            <td>${escapeHtml(String(linha.rc07 ?? ""))}</td>
            <td>${escapeHtml(String(linha.produtivos ?? ""))}</td>
            <td>${escapeHtml(String(linha.improdutivos ?? ""))}</td>
            <td class="${Number(linha.percImprod || 0) > 20 ? "improd-alta" : ""}">${linha.percImprod === "" ? "" : `${Number(linha.percImprod || 0).toFixed(2)}%`}</td>
            <td>${escapeHtml(linha.primeiroAtend ?? "")}</td>
            <td>${escapeHtml(linha.ultimoAtend ?? "")}</td>
            <td class="faixa-${escapeHtml(linha.faixaFinal || "-")}">${escapeHtml(linha.faixaFinal || "-")}</td>
        </tr>
    `).join("");
}

async function abrirModalTabelaRc07Flegadas() {
    if (!modalRc07FlegadasTabela || !modalRc07FlegadasBody) return;

    const codigosFlegados = obterCodigosRc07Flegados();
    const lista = (rc07UltimaLista || []).filter(item => codigosFlegados.has(String(item.codigo || "").trim()));

    if (!lista.length) {
        alert("Nenhuma equipe flegada para exibir.");
        return;
    }

    const contexto = rc07UltimoContexto || {};
    const supTxt = contexto?.supervisor ? ` | Supervisor: ${rotuloGrupoExibicao(contexto.supervisor)}` : " | Todos os supervisores";
    if (modalRc07FlegadasTitulo) modalRc07FlegadasTitulo.innerText = "TABELA RC07 FLEGADAS";
    if (modalRc07FlegadasMeta) {
        modalRc07FlegadasMeta.innerText = `${formatarDataBR(contexto?.data) || contexto?.data || "-"}${contexto?.uo ? ` | UO ${contexto.uo}` : ""}${supTxt}`;
    }

    modalRc07FlegadasBody.innerHTML = `<tr><td colspan="16">Carregando equipes flegadas...</td></tr>`;
    modalRc07FlegadasTabela.classList.remove("hidden");

    const linhas = await Promise.all(lista.map(item => montarLinhaTabelaRc07Flegada(item, contexto)));
    linhas.sort((a, b) => String(a.codigo || "").localeCompare(String(b.codigo || ""), "pt-BR", { numeric: true }));
    renderizarTabelaRc07Flegadas(linhas);
}

function fecharModalTabelaRc07Flegadas() {
    if (modalRc07FlegadasTabela) modalRc07FlegadasTabela.classList.add("hidden");
    if (modalRc07FlegadasTabela) modalRc07FlegadasTabela.classList.remove("fullscreen");
    if (btnFullscreenRc07Flegadas) btnFullscreenRc07Flegadas.innerText = "⛶ Tela cheia";
    if (modalRc07FlegadasBody) modalRc07FlegadasBody.innerHTML = "";
}

function alternarTelaCheiaRc07Flegadas() {
    if (!modalRc07FlegadasTabela) return;
    modalRc07FlegadasTabela.classList.toggle("fullscreen");
    if (btnFullscreenRc07Flegadas) {
        btnFullscreenRc07Flegadas.innerText = modalRc07FlegadasTabela.classList.contains("fullscreen")
            ? "Sair da tela cheia"
            : "⛶ Tela cheia";
    }
}

async function baixarTabelaRc07FlegadasImagem() {
    if (!modalRc07FlegadasTabela || modalRc07FlegadasTabela.classList.contains("hidden")) return;

    try {
        await garantirHtml2Canvas();
    } catch {
        alert("Nao foi possivel carregar o gerador de imagem.");
        return;
    }

    const conteudo = modalRc07FlegadasTabela.querySelector(".modal-rc07-flegadas");
    if (!conteudo) {
        alert("Conteudo do modal nao encontrado.");
        return;
    }

    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.top = "-9999px";
    wrapper.style.left = "-9999px";
    wrapper.style.zIndex = "99999";
    wrapper.style.background = "#ffffff";
    wrapper.style.color = "#111827";
    wrapper.style.padding = "12px";
    wrapper.style.overflow = "visible";

    const clone = conteudo.cloneNode(true);
    clone.style.width = "max-content";
    clone.style.maxWidth = "none";
    clone.style.maxHeight = "none";
    clone.style.height = "auto";
    clone.style.overflow = "visible";
    clone.querySelector(".acoes-modal")?.remove();
    clone.querySelectorAll(".table-wrap, .rc07-flegadas-wrap").forEach(el => {
        el.style.maxHeight = "none";
        el.style.overflow = "visible";
    });
    clone.querySelectorAll("th").forEach(th => {
        th.style.position = "relative";
        th.style.top = "auto";
        th.style.zIndex = "1";
    });

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0
    }).then(canvas => {
        const link = document.createElement("a");
        const dataArquivo = String(rc07UltimoContexto?.data || obterHojeISO()).replaceAll("-", "");
        link.download = `tabela-rc07-flegadas-${dataArquivo}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    }).catch(() => {
        alert("Nao foi possivel gerar a imagem da tabela RC07 flegadas.");
    }).finally(() => {
        wrapper.remove();
    });
}

async function aplicarFiltrosModalRc07() {
    const contexto = obterEquipesRc07Filtradas();
    rc07FiltrosColunas = {};
    if (modalRc07Body) {
        modalRc07Body.innerHTML = `<tr><td colspan="9">Carregando equipes flegadas...</td></tr>`;
    }
    let marcados = null;
    try {
        marcados = await carregarRc07MarcadosBanco(contexto);
    } catch (error) {
        console.warn("Falha ao carregar RC07 do banco. Usando cache local.", error);
        const flags = getRc07Flags();
        rc07UltimosDetalhesMarcados = {};
        marcados = flags[rc07ContextKey(contexto?.data, contexto?.uo, contexto?.supervisor)] || {};
    }
    renderizarModalRc07(contexto.lista, contexto, marcados);
}

async function abrirModalRc07() {
    if (!modalRc07 || !modalRc07Body) return;
    if (modoPeriodoAtivo()) {
        alert("O RC07 usa equipes do dia. Selecione a Tabela Diária.");
        return;
    }
    await prepararDadosModalTurno();
    popularFiltrosRc07(dataSelect?.value || "", uoSelect?.value || "", "");
    modalRc07Body.innerHTML = `<tr><td colspan="9">Carregando equipes...</td></tr>`;
    if (kpiRc07Total) kpiRc07Total.innerText = "0";
    if (kpiRc07Equipes) kpiRc07Equipes.innerText = "0";
    if (kpiRc07Meta) kpiRc07Meta.innerText = "0.000";
    if (modalRc07Meta) modalRc07Meta.innerText = "";
    modalRc07.classList.remove("hidden");

    try {
        await aplicarFiltrosModalRc07();
    } catch (error) {
        modalRc07Body.innerHTML = `<tr><td colspan="9">${escapeHtml(String(error?.message || error))}</td></tr>`;
    }
}

function fecharModalRc07() {
    if (modalRc07) modalRc07.classList.add("hidden");
    if (modalRc07) modalRc07.classList.remove("fullscreen");
    if (btnFullscreenRc07) btnFullscreenRc07.innerText = "⛶ Tela cheia";
    if (modalRc07Body) modalRc07Body.innerHTML = "";
}

function alternarTelaCheiaRc07() {
    if (!modalRc07) return;
    modalRc07.classList.toggle("fullscreen");
    if (btnFullscreenRc07) {
        btnFullscreenRc07.innerText = modalRc07.classList.contains("fullscreen")
            ? "Sair da tela cheia"
            : "⛶ Tela cheia";
    }
}

if (btnRc07Aplicar) {
    btnRc07Aplicar.addEventListener("click", aplicarFiltrosModalRc07);
}

if (rc07Data) {
    rc07Data.addEventListener("change", () => {
        popularFiltrosRc07(rc07Data.value, rc07Uo?.value || "", rc07Supervisor?.value || "");
        aplicarFiltrosModalRc07();
    });
}

if (rc07Uo) {
    rc07Uo.addEventListener("change", () => {
        popularFiltrosRc07(rc07Data?.value || "", rc07Uo.value, rc07Supervisor?.value || "");
        aplicarFiltrosModalRc07();
    });
}

if (rc07Supervisor) {
    rc07Supervisor.addEventListener("change", aplicarFiltrosModalRc07);
}

function obterFiltroDataImprodTabelaGeral() {
    const periodo = telaAceitaFiltroPeriodo() ? obterPeriodoFiltroAtual() : "diario";

    if (periodo === "semanal") {
        const semana = String(semanaSelect?.value || "").trim();
        const intervalo = semana ? obterInicioEFimSemanaPorInput(semana) : null;
        if (intervalo?.inicio && intervalo?.fim) {
            return { inicio: intervalo.inicio, fim: intervalo.fim, label: `Semana ${intervalo.inicio} a ${intervalo.fim}` };
        }
    }

    if (periodo === "mensal") {
        const anoMes = String(mesSelect?.value || obterAnoMesAtual()).trim();
        const [ano, mes] = anoMes.split("-").map(Number);
        if (ano && mes) {
            const inicio = `${anoMes}-01`;
            const fim = formatISODateLocal(new Date(ano, mes, 0));
            return { inicio, fim, label: `Mês ${anoMes}` };
        }
    }

    if (periodo === "periodo") {
        const ini = String(periodoInicioSelect?.value || "").trim();
        const fimRaw = String(periodoFimSelect?.value || ini).trim();
        if (ini && fimRaw) {
            const inicio = ini <= fimRaw ? ini : fimRaw;
            const fim = ini <= fimRaw ? fimRaw : ini;
            return { inicio, fim, label: `Período ${inicio} a ${fim}` };
        }
    }

    const data = String(dataSelect?.value || obterHojeISO()).trim();
    return { data, inicio: data, fim: data, label: `Data ${data}` };
}

function montarMapaInfoEquipesTabelaGeral() {
    const mapa = new Map();
    (dados || []).forEach((linha) => {
        const codigo = obterCodigoEquipeLinha(linha);
        if (!codigo || mapa.has(codigo)) return;
        mapa.set(codigo, {
            codigo,
            uo: obterUoLinha(linha),
            supervisor: obterValorColuna(linha, ["SUPERVISOR - SETOR", "SUPERVISOR", "NOME_SUPERVISOR"]) || linha[campoGlobal] || "N/I",
            equipe: obterValorColuna(linha, ["Nome", "NOME_EQUIPE", "NOME", "EQUIPE"]) || "-",
            meta: ajustarMetaClusterMtami(
                toNumber(linha["Meta Prog."]),
                linha[campoGlobal] || "",
                obterValorColuna(linha, ["Nome", "NOME_EQUIPE", "NOME", "EQUIPE"]),
                linha[campoGlobal]
            )
        });
    });
    return mapa;
}

function contarMaisFrequente(lista) {
    const contagem = new Map();
    lista.forEach((valor) => {
        const txt = String(valor || "").trim();
        if (!txt || txt === "-") return;
        contagem.set(txt, (contagem.get(txt) || 0) + 1);
    });
    return [...contagem.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "pt-BR"))[0]?.[0] || "-";
}

function dataAtualizacaoControleServico(row) {
    const valor = obterValorControleServico(row, ["DATA_ATUALIZACAO", "DATA ATUALIZACAO", "DATA_ATUALIZACAO_D"]);
    const dataHora = formatarDataHoraControleServico(valor);
    return dataHora && dataHora !== "-" ? dataHora.split(" ")[0] : "-";
}

function montarLinhaImprodTabelaGeral(row, info) {
    const tipoServico = obterValorControleServico(row, ["TIPO_SERVICO", "TIPO SERVICO"]);
    const codAtiv = obterValorControleServico(row, ["COD_ATIV", "COD ATIV", "CODATIV"]);
    const usPrev = parseControleServicoNumero(obterValorControleServico(row, ["US_PREV", "US PREV", "US_PREVISTAS"]));
    const usExec = parseControleServicoNumero(obterValorControleServico(row, ["US_EXEC", "US EXEC", "US_EXECUTADAS"]));
    const usPerdaRaw = parseControleServicoNumero(obterValorControleServico(row, ["US_PERDA", "US PERDA", "US_PERDAS"]));
    const usPerda = usPerdaRaw || Math.max(usPrev - usExec, 0) || usPrev;
    const meta = Number(info?.meta || 0);

    return {
        dataAtualizacao: dataAtualizacaoControleServico(row),
        uo: info?.uo || obterValorControleServico(row, ["COD_UO", "UO"]) || "-",
        supervisor: info?.supervisor || "-",
        codigo: info?.codigo || obterValorControleServico(row, ["COD_EQUIPE_WM", "COD_EQUIPE", "NUM_EQUIPE"]) || "-",
        equipe: info?.equipe || obterValorControleServico(row, ["NOME", "NOME_EQUIPE", "EQUIPE"]) || "-",
        servico: 1,
        tipoServico,
        codAtiv,
        usPrev,
        usPerda,
        percMeta: meta > 0 ? (usPerda / meta) * 100 : 0
    };
}

function consolidarImprodutivasPorEquipe(linhas = []) {
    const mapa = new Map();

    linhas.forEach((item) => {
        const chave = String(item.codigo || item.equipe || "").trim();
        if (!chave) return;
        const atual = mapa.get(chave) || {
            ...item,
            servico: 0,
            tipos: new Set(),
            codigosAtiv: new Set(),
            usPrev: 0,
            usPerda: 0,
            percMeta: 0
        };

        atual.servico += 1;
        if (item.tipoServico && item.tipoServico !== "-") atual.tipos.add(String(item.tipoServico));
        if (item.codAtiv && item.codAtiv !== "-") atual.codigosAtiv.add(String(item.codAtiv));
        atual.usPrev += Number(item.usPrev || 0);
        atual.usPerda += Number(item.usPerda || 0);
        atual.percMeta += Number(item.percMeta || 0);
        mapa.set(chave, atual);
    });

    return [...mapa.values()].map((item) => ({
        ...item,
        tipoServico: [...item.tipos].join(" | ") || "-",
        codAtiv: [...item.codigosAtiv].join(" | ") || "-",
        percMeta: item.percMeta
    })).sort((a, b) => b.servico - a.servico || String(a.equipe).localeCompare(String(b.equipe), "pt-BR"));
}

const IMPROD_TABELA_GERAL_COLUNAS = [
    { key: "dataAtualizacao", tipo: "data" },
    { key: "uo", tipo: "numero" },
    { key: "supervisor", tipo: "texto" },
    { key: "codigo", tipo: "numero" },
    { key: "equipe", tipo: "texto" },
    { key: "servico", tipo: "numero" },
    { key: "tipoServico", tipo: "texto" },
    { key: "codAtiv", tipo: "texto" },
    { key: "usPrev", tipo: "numero" },
    { key: "usPerda", tipo: "numero" },
    { key: "percMeta", tipo: "numero" }
];

function valorOrdenacaoImprodTabelaGeral(item, coluna) {
    const config = IMPROD_TABELA_GERAL_COLUNAS[coluna] || {};
    const valor = item?.[config.key];

    if (config.tipo === "numero") {
        const n = Number(valor || 0);
        return Number.isFinite(n) ? n : -Infinity;
    }

    if (config.tipo === "data") {
        const txt = String(valor || "");
        const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(txt);
        if (match) return Number(`${match[3]}${match[2]}${match[1]}`);
        return 0;
    }

    return String(valor || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();
}

function renderizarTabelaImprodTabelaGeral() {
    if (!modalImprodTabelaGeralBody) return;
    const linhas = [...currentImprodTabelaGeralLinhas];
    const { coluna, direcao } = currentImprodTabelaGeralSort || {};

    if (coluna !== null && coluna !== undefined) {
        linhas.sort((a, b) => {
            const va = valorOrdenacaoImprodTabelaGeral(a, coluna);
            const vb = valorOrdenacaoImprodTabelaGeral(b, coluna);
            let cmp = 0;
            if (typeof va === "number" && typeof vb === "number") {
                cmp = va - vb;
            } else {
                cmp = String(va).localeCompare(String(vb), "pt-BR");
            }
            return direcao === "asc" ? cmp : -cmp;
        });
    }

    modalImprodTabelaGeralBody.innerHTML = linhas.length ? linhas.map(item => `
        <tr>
            <td class="col-center">${escapeHtml(item.dataAtualizacao)}</td>
            <td class="col-center">${escapeHtml(item.uo)}</td>
            <td>${escapeHtml(item.supervisor)}</td>
            <td class="col-center">${escapeHtml(item.codigo)}</td>
            <td>${escapeHtml(item.equipe)}</td>
            <td class="col-center">${escapeHtml(String(item.servico || 0))}</td>
            <td>${escapeHtml(item.tipoServico || "-")}</td>
            <td class="col-center">${escapeHtml(item.codAtiv || "-")}</td>
            <td class="col-num">${fmt3(item.usPrev)}</td>
            <td class="col-num">${fmt3(item.usPerda)}</td>
            <td class="col-num">${item.percMeta ? `${item.percMeta.toFixed(0)}%` : "-"}</td>
        </tr>
    `).join("") : `<tr><td colspan="11">Nenhum serviço improdutivo encontrado para o filtro selecionado.</td></tr>`;
}

function ordenarImprodTabelaGeral(coluna) {
    const atual = currentImprodTabelaGeralSort || {};
    const direcao = atual.coluna === coluna && atual.direcao === "desc" ? "asc" : "desc";
    currentImprodTabelaGeralSort = { coluna, direcao };
    atualizarIndicadoresOrdenacaoImprodTabelaGeral();
    renderizarTabelaImprodTabelaGeral();
}

function atualizarIndicadoresOrdenacaoImprodTabelaGeral() {
    document.querySelectorAll("#modalImprodTabelaGeral th[data-improd-sort]").forEach((th) => {
        const coluna = Number(th.dataset.improdSort);
        const ativo = currentImprodTabelaGeralSort?.coluna === coluna;
        const indicador = th.querySelector(".sort-indicator");
        if (indicador) {
            indicador.textContent = ativo
                ? (currentImprodTabelaGeralSort.direcao === "asc" ? "↑" : "↓")
                : "↕";
        }
    });
}

function configurarOrdenacaoImprodTabelaGeral() {
    document.querySelectorAll("#modalImprodTabelaGeral th[data-improd-sort]").forEach((th) => {
        if (th.dataset.sortBound === "1") return;
        th.dataset.sortBound = "1";
        th.addEventListener("click", () => ordenarImprodTabelaGeral(Number(th.dataset.improdSort)));
    });
    atualizarIndicadoresOrdenacaoImprodTabelaGeral();
}

async function abrirModalImprodTabelaGeral(event) {
    if (event && typeof event.stopPropagation === "function") event.stopPropagation();
    if (modoTabela !== "geral" || !modalImprodTabelaGeral || !modalImprodTabelaGeralBody) return;

    const filtro = obterFiltroDataImprodTabelaGeral();
    const uo = String(uoSelect?.value || "").trim();
    const supervisorSelecionado = String(currentTabelaGeralSupervisorSelecionado || "").trim();
    const params = new URLSearchParams();
    if (uo) params.set("uo", uo);
    if (filtro.data) {
        params.set("data", filtro.data);
    } else {
        params.set("dataInicio", filtro.inicio);
        params.set("dataFim", filtro.fim);
    }
    params.set("limit", "200000");

    modalImprodTabelaGeral.classList.remove("hidden");
    if (modalImprodTabelaGeralTitulo) modalImprodTabelaGeralTitulo.innerText = "% IMPRODUTIVO - Tabela Geral";
    if (modalImprodTabelaGeralMeta) {
        modalImprodTabelaGeralMeta.innerText = `${filtro.label}${supervisorSelecionado ? ` | Supervisor: ${rotuloGrupoExibicao(supervisorSelecionado)}` : ""}`;
    }
    modalImprodTabelaGeralBody.innerHTML = `<tr><td colspan="11">Carregando...</td></tr>`;

    try {
        const resp = await fetch(`/api/controle-servico?${params.toString()}`, { cache: "no-store" });
        if (!resp.ok) throw new Error(`Erro ${resp.status}`);
        const payload = await resp.json();
        const rows = Array.isArray(payload?.rows) ? payload.rows : [];
        const mapaInfo = montarMapaInfoEquipesTabelaGeral();

        const improdutivas = rows
            .filter(row => normalizarProdutivoFlag(obterValorControleServico(row, ["PRODUTIVO", "PRODUTIVOS"])) === "NÃO")
            .map(row => {
                const codigo = String(obterValorControleServico(row, ["COD_EQUIPE_WM", "COD_EQUIPE", "NUM_EQUIPE"]) || "").trim();
                const info = mapaInfo.get(codigo) || { codigo };
                return montarLinhaImprodTabelaGeral(row, info);
            })
            .filter(item => !supervisorSelecionado || String(item.supervisor || "").trim() === supervisorSelecionado);

        const totalRealizados = rows.filter(row => {
            const flag = normalizarProdutivoFlag(obterValorControleServico(row, ["PRODUTIVO", "PRODUTIVOS"]));
            if (flag !== "SIM" && flag !== "NÃO") return false;
            if (!supervisorSelecionado) return true;
            const codigo = String(obterValorControleServico(row, ["COD_EQUIPE_WM", "COD_EQUIPE", "NUM_EQUIPE"]) || "").trim();
            return String(mapaInfo.get(codigo)?.supervisor || "").trim() === supervisorSelecionado;
        }).length;

        const totalUsPerda = improdutivas.reduce((acc, item) => acc + Number(item.usPerda || 0), 0);
        const codigos = new Set(improdutivas.map(item => String(item.codigo || "").trim()).filter(Boolean));
        const perc = totalRealizados > 0 ? (improdutivas.length / totalRealizados) * 100 : 0;

        if (improdKpiEquipes) improdKpiEquipes.innerText = String(codigos.size);
        if (improdKpiUsPerda) improdKpiUsPerda.innerText = fmt3(totalUsPerda);
        if (improdKpiTipoLider) improdKpiTipoLider.innerText = contarMaisFrequente(improdutivas.map(item => item.tipoServico));
        if (improdKpiCodMaisUsado) improdKpiCodMaisUsado.innerText = contarMaisFrequente(improdutivas.map(item => item.codAtiv));
        if (improdKpiPerc) {
            improdKpiPerc.innerText = `${perc.toFixed(2)}%`;
            improdKpiPerc.style.color = perc > 18 ? "#dc2626" : "#15803d";
        }

        currentImprodTabelaGeralLinhas = consolidarImprodutivasPorEquipe(improdutivas);
        currentImprodTabelaGeralSort = { coluna: 5, direcao: "desc" };
        configurarOrdenacaoImprodTabelaGeral();
        renderizarTabelaImprodTabelaGeral();
    } catch (error) {
        console.error("Erro ao abrir modal de improdutividade:", error);
        modalImprodTabelaGeralBody.innerHTML = `<tr><td colspan="11">Erro ao carregar dados de improdutividade.</td></tr>`;
    }
}

function fecharModalImprodTabelaGeral() {
    modalImprodTabelaGeral?.classList.add("hidden");
    modalImprodTabelaGeral?.classList.remove("fullscreen");
    if (btnFullscreenImprodTabelaGeral) btnFullscreenImprodTabelaGeral.innerText = "Expandir";
    if (modalImprodTabelaGeralBody) modalImprodTabelaGeralBody.innerHTML = "";
}

function toggleFullscreenImprodTabelaGeral() {
    if (!modalImprodTabelaGeral) return;
    modalImprodTabelaGeral.classList.toggle("fullscreen");
    if (btnFullscreenImprodTabelaGeral) {
        btnFullscreenImprodTabelaGeral.innerText = modalImprodTabelaGeral.classList.contains("fullscreen")
            ? "Reduzir"
            : "Expandir";
    }
}

async function baixarModalImprodTabelaGeralImagem() {
    if (!modalImprodTabelaGeral || modalImprodTabelaGeral.classList.contains("hidden")) return;

    try {
        await garantirHtml2Canvas();
    } catch {
        alert("Não foi possível carregar o gerador de imagem.");
        return;
    }

    const conteudo = modalImprodTabelaGeral.querySelector(".modal-improd-geral");
    if (!conteudo) {
        alert("Conteúdo do modal não encontrado.");
        return;
    }

    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.top = "-9999px";
    wrapper.style.left = "-9999px";
    wrapper.style.zIndex = "99999";
    wrapper.style.background = "#ffffff";
    wrapper.style.color = "#111827";
    wrapper.style.padding = "18px";
    wrapper.style.overflow = "visible";
    wrapper.style.width = "auto";

    const clone = conteudo.cloneNode(true);
    clone.style.width = "max-content";
    clone.style.maxWidth = "none";
    clone.style.maxHeight = "none";
    clone.style.height = "auto";
    clone.style.overflow = "visible";
    clone.querySelector(".modal-header-actions")?.remove();
    clone.querySelectorAll(".table-wrap, .modal-table-wrap").forEach(el => {
        el.style.maxHeight = "none";
        el.style.overflow = "visible";
    });
    clone.querySelectorAll("th").forEach(th => {
        th.style.position = "relative";
        th.style.top = "auto";
        th.style.zIndex = "1";
    });

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "improdutivo-tabela-geral.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }).catch(() => {
        alert("Não foi possível gerar a imagem do modal de improdutividade.");
    }).finally(() => {
        wrapper.remove();
    });
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
        const tituloColuna = (th.querySelector(".th-label")?.innerText || th.innerText).trim().toUpperCase();
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

let modalEquipesOrdenacao = { coluna: null, direcao: "desc" };

function textoCabecalhoModal(th) {
    const clone = th.cloneNode(true);
    clone.querySelectorAll(".filter-pro, .sort-indicator").forEach(el => el.remove());
    return clone.innerText.trim().replace(/\s+/g, " ");
}

function normalizarValorOrdenacaoModal(valor) {
    const texto = String(valor || "").trim();
    if (!texto || texto === "-") return { tipo: "vazio", valor: "" };

    const faixa = texto.toUpperCase();
    const ordemFaixa = { AA: 5, A: 4, B: 3, C: 2, D: 1 };
    if (Object.prototype.hasOwnProperty.call(ordemFaixa, faixa)) {
        return { tipo: "numero", valor: ordemFaixa[faixa] };
    }

    if (/^\d{1,2}:\d{2}$/.test(texto)) {
        const [h, m] = texto.split(":").map(Number);
        return { tipo: "numero", valor: h * 60 + m };
    }

    const numero = Number(
        texto
            .replace(/%/g, "")
            .replace(/\./g, "")
            .replace(",", ".")
            .replace(/[^\d.-]/g, "")
    );

    if (Number.isFinite(numero) && /[\d]/.test(texto)) {
        return { tipo: "numero", valor: numero };
    }

    return {
        tipo: "texto",
        valor: texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
    };
}

function compararValorOrdenacaoModal(a, b, direcao) {
    const va = normalizarValorOrdenacaoModal(a);
    const vb = normalizarValorOrdenacaoModal(b);

    if (va.tipo === "vazio" && vb.tipo !== "vazio") return 1;
    if (vb.tipo === "vazio" && va.tipo !== "vazio") return -1;
    if (va.tipo === "vazio" && vb.tipo === "vazio") return 0;

    let resultado = 0;
    if (va.tipo === "numero" && vb.tipo === "numero") {
        resultado = va.valor - vb.valor;
    } else {
        resultado = String(va.valor).localeCompare(String(vb.valor), "pt-BR", {
            numeric: true,
            sensitivity: "base"
        });
    }

    return direcao === "asc" ? resultado : -resultado;
}

function atualizarIndicadoresOrdenacaoModal() {
    document.querySelectorAll("#modalEquipes thead th").forEach((th, index) => {
        const indicador = th.querySelector(".sort-indicator");
        if (!indicador) return;
        const ativo = modalEquipesOrdenacao.coluna === index;
        th.classList.toggle("sort-active", ativo);
        indicador.textContent = ativo
            ? (modalEquipesOrdenacao.direcao === "asc" ? "↑" : "↓")
            : "↕";
    });
}

function ordenarModalEquipesPorColuna(coluna) {
    const body = document.getElementById("modalBody");
    if (!body) return;

    const direcao =
        modalEquipesOrdenacao.coluna === coluna && modalEquipesOrdenacao.direcao === "desc"
            ? "asc"
            : "desc";

    modalEquipesOrdenacao = { coluna, direcao };

    const linhas = [...body.querySelectorAll("tr")]
        .filter(linha => linha.children.length > 1);

    linhas.sort((a, b) => {
        const valorA = a.children[coluna]?.innerText || "";
        const valorB = b.children[coluna]?.innerText || "";
        const cmp = compararValorOrdenacaoModal(valorA, valorB, direcao);
        if (cmp !== 0) return cmp;
        return String(a.dataset.codigo || "").localeCompare(String(b.dataset.codigo || ""), "pt-BR", { numeric: true });
    });

    linhas.forEach(linha => body.appendChild(linha));
    atualizarIndicadoresOrdenacaoModal();
}

function aplicarOrdenacaoModalEquipesAtual() {
    const body = document.getElementById("modalBody");
    if (!body || modalEquipesOrdenacao.coluna == null) return;

    const coluna = Number(modalEquipesOrdenacao.coluna);
    const direcao = modalEquipesOrdenacao.direcao || "desc";
    const linhas = [...body.querySelectorAll("tr")]
        .filter(linha => linha.children.length > 1);

    linhas.sort((a, b) => {
        const valorA = a.children[coluna]?.innerText || "";
        const valorB = b.children[coluna]?.innerText || "";
        const cmp = compararValorOrdenacaoModal(valorA, valorB, direcao);
        if (cmp !== 0) return cmp;
        return String(a.dataset.codigo || "").localeCompare(String(b.dataset.codigo || ""), "pt-BR", { numeric: true });
    });

    linhas.forEach(linha => body.appendChild(linha));
    atualizarIndicadoresOrdenacaoModal();
}

function restaurarOrdenacaoModalAposRender(ordenacaoAnterior) {
    if (!ordenacaoAnterior || ordenacaoAnterior.coluna == null) return;
    setTimeout(() => {
        modalEquipesOrdenacao = { ...ordenacaoAnterior };
        aplicarOrdenacaoModalEquipesAtual();
        aplicarFiltrosModal();
    }, 90);
}

function configurarOrdenacaoModalEquipes() {
    const ths = document.querySelectorAll("#modalEquipes thead th");
    ths.forEach((th, colIndex) => {
        if (th.dataset.sortBound === "1") return;

        th.dataset.sortBound = "1";
        th.classList.add("sortable-th");
        th.title = "Clique para ordenar";

        if (!th.querySelector(".sort-indicator")) {
            const indicador = document.createElement("span");
            indicador.className = "sort-indicator";
            indicador.setAttribute("aria-hidden", "true");
            indicador.textContent = "↕";
            th.appendChild(document.createTextNode(" "));
            th.appendChild(indicador);
        }

        th.addEventListener("click", () => ordenarModalEquipesPorColuna(colIndex));
    });

    atualizarIndicadoresOrdenacaoModal();
}

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
        const titulo = textoCabecalhoModal(th);
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

    configurarOrdenacaoModalEquipes();
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
        if (a === "abrir-rc07") return typeof abrirModalRc07 === "function" ? abrirModalRc07() : null;
        if (a === "abrir-justificativas") return typeof abrirHistoricoJustificativas === "function" ? abrirHistoricoJustificativas() : null;
        if (a === "abrir-acordos-rs") return typeof abrirModalAcordosRs === "function" ? abrirModalAcordosRs() : null;
        if (a === "abrir-busca-global") return typeof abrirBuscaGlobal === "function" ? abrirBuscaGlobal() : null;
        if (a === "abrir-investigar-equipe") return typeof abrirInvestigarEquipe === "function" ? abrirInvestigarEquipe() : null;
        if (a === "abrir-conflitos") return typeof abrirModalConflitos === "function" ? abrirModalConflitos() : null;
        if (a === "abrir-andon") return typeof abrirPainelAndon === "function" ? abrirPainelAndon() : null;
        if (a === "abrir-painel-analitico") return window.open("painel-analitico.html", "_blank");
        if (a === "abrir-painel-servicos-analitico") return window.open("painel-servicos-analitico.html", "_blank");
        if (a === "abrir-painel-jornada-analitico") return window.open("painel-jornada-analitico.html", "_blank");
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
    recarregarDadosPainelEAplicar({ forcar: true }).then((ok) => {
        if (!ok) return;
        popularSemanasDisponiveis();
    });
};

tipoSelect.onchange = aplicar;

if (turnoSelect) {
    turnoSelect.onchange = () => {
        const turnoEspecial = turnoTardeAtivo() || turnoMadrugadaAtivo();
        atualizarOpcoesHora();

        if (modoTabela === "diario" || modoTabela === "geral" || modoTabela === "total-horas") {
            const carregar = turnoEspecial || modoTabela === "total-horas"
                ? garantirDadosTotalHoras()
                : carregarDadosPainelAtual();
            carregar.then((ok) => {
                if (ok !== false) aplicar();
            });
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
            recarregarDadosPainelEAplicar({ forcar: true });
        }
    };
}

if (periodoTabelaSelect) {
    periodoTabelaSelect.onchange = () => {
        if (!telaAceitaFiltroPeriodo()) {
            setModo(obterModoPorPeriodoTopo(periodoTabelaSelect.value));
            return;
        }

        const periodo = obterPeriodoFiltroAtual();

        if (periodo === "semanal") {
            popularSemanasDisponiveis();
        }

        if (periodo === "mensal" && mesSelect && !mesSelect.value) {
            mesSelect.value = obterAnoMesAtual();
        }
        atualizarDisplaySemanaTabela();
        atualizarDisplayMesTabela();

        if (periodo === "periodo") {
            const hoje = obterHojeISO();
            if (periodoInicioSelect && !periodoInicioSelect.value) periodoInicioSelect.value = dataSelect?.value || hoje;
            if (periodoFimSelect && !periodoFimSelect.value) periodoFimSelect.value = periodoInicioSelect?.value || hoje;
        }

        const periodoEspecial = periodo !== "diario";
        if (grupoData) grupoData.classList.toggle("hidden", periodoEspecial);
        if (grupoHora) grupoHora.classList.toggle("hidden", periodoEspecial);
        if (grupoSemana) grupoSemana.classList.toggle("hidden", periodo !== "semanal");
        if (grupoMes) grupoMes.classList.toggle("hidden", periodo !== "mensal");
        if (grupoPeriodoInicio) grupoPeriodoInicio.classList.toggle("hidden", periodo !== "periodo");
        if (grupoPeriodoFim) grupoPeriodoFim.classList.toggle("hidden", periodo !== "periodo");

        recarregarDadosPainelEAplicar({ forcar: true });
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
        atualizarDisplaySemanaTabela();
        if (modoTabela === "semanal" || (telaAceitaFiltroPeriodo() && obterPeriodoFiltroAtual() === "semanal")) {
            recarregarDadosPainelEAplicar({ forcar: true });
        }
    };
}

if (mesSelect) {
    mesSelect.onchange = () => {
        atualizarDisplayMesTabela();
        if (modoTabela === "mensal" || modoTabela === "quinzena1" || modoTabela === "quinzena2" || (telaAceitaFiltroPeriodo() && obterPeriodoFiltroAtual() === "mensal")) {
            recarregarDadosPainelEAplicar({ forcar: true });
        }
    };
}

semanaDisplay?.addEventListener("click", abrirSemanaPickerTabela);
semanaClear?.addEventListener("click", (event) => {
    event.stopPropagation();
    limparSemanaPickerTabela();
});
mesDisplay?.addEventListener("click", abrirMesPickerTabela);
mesClear?.addEventListener("click", (event) => {
    event.stopPropagation();
    limparMesPickerTabela();
});
document.addEventListener("click", (event) => {
    if (!event.target.closest("#grupoSemana")) fecharSemanaPickerTabela();
    if (!event.target.closest("#grupoMes")) fecharMesPickerTabela();
});

if (periodoInicioSelect) {
    periodoInicioSelect.onchange = () => {
        if (modoTabela === "periodo" || (telaAceitaFiltroPeriodo() && obterPeriodoFiltroAtual() === "periodo")) {
            recarregarDadosPainelEAplicar({ forcar: true });
        }
    };
}

if (periodoFimSelect) {
    periodoFimSelect.onchange = () => {
        if (modoTabela === "periodo" || (telaAceitaFiltroPeriodo() && obterPeriodoFiltroAtual() === "periodo")) {
            recarregarDadosPainelEAplicar({ forcar: true });
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
    window.location.assign(url);
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
atualizarDisplaySemanaTabela();
atualizarDisplayMesTabela();
configurarAcoesKpisModal();
configurarCliqueKpiImprodTabelaGeral();
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
setInterval(atualizarTabelaGeralComDadosDoBanco, INTERVALO_ATUALIZACAO_TABELA_GERAL_MS);
