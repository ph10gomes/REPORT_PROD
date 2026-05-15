const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');
const contentElement = document.querySelector('.content');
const supervisorView = document.querySelector('.supervisor-view');
const supervisorButton = document.getElementById('supervisorButton');
const backButton = document.getElementById('backButton');
const andonMenuButton = document.getElementById('andonMenuButton');
const andonMenuDrawer = document.getElementById('andonMenuDrawer');
const andonMenuOverlay = document.getElementById('andonMenuOverlay');
const andonMenuClose = document.getElementById('andonMenuClose');
const uoFilter = document.getElementById('uoFilter');
const uoOptionsContainer = document.getElementById('uoOptionsContainer');
const uoSelected = document.getElementById('uoSelected');
const uoSummary = document.querySelector('.uo-summary');
const uoWrapper = document.querySelector('.uo-wrapper');
const supervisorCheckboxContainer = document.getElementById('supervisorCheckboxContainer');
const supervisorSummary = document.querySelector('.supervisor-summary');
const supervisorCount = document.getElementById('supervisorCount');
const supDateDisplay = document.getElementById('supDateDisplay');
const supDateClear = document.getElementById('supDateClear');
const supDatePopup = document.getElementById('supDatePopup');
const supDateWrapper = document.getElementById('supDateWrapper');
const supervisorCards = Array.from(document.querySelectorAll('.supervisor-card'));
const perfTotalEquipes = document.getElementById('perfTotalEquipes');
const perfTotalEquipesLote = document.getElementById('perfTotalEquipesLote');
const perfClassificacaoWm = document.getElementById('perfClassificacaoWm');
const perfClassificacaoLote = document.getElementById('perfClassificacaoLote');
const perfEquipesDWm = document.getElementById('perfEquipesDWm');
const perfEquipesDLote = document.getElementById('perfEquipesDLote');
const perfImpedimento = document.getElementById('perfImpedimento');
const sdcaTotalEquipes = document.getElementById('sdcaTotalEquipes');
const sdcaEquipesD = document.getElementById('sdcaEquipesD');
const sdcaEquipesAcordadas = document.getElementById('sdcaEquipesAcordadas');
const sdcaPercAcordadas = document.getElementById('sdcaPercAcordadas');
const sdcaEquipesJustificadas = document.getElementById('sdcaEquipesJustificadas');
const sdcaPercJustificadas = document.getElementById('sdcaPercJustificadas');
const cardPerfTotalEquipes = document.getElementById('cardPerfTotalEquipes');
const cardPerfTotalEquipesLote = document.getElementById('cardPerfTotalEquipesLote');
const cardPerfEquipesDWm = document.getElementById('cardPerfEquipesDWm');
const cardPerfEquipesDLote = document.getElementById('cardPerfEquipesDLote');
const cardSdcaEquipesAcordadas = document.getElementById('cardSdcaEquipesAcordadas');
const cardSdcaEquipesJustificadas = document.getElementById('cardSdcaEquipesJustificadas');
const cardJourneyProdSemRefeicao = document.getElementById('cardJourneyProdSemRefeicao');
const journeyProdTotalEfetiva = document.getElementById('journeyProdTotalEfetiva');
const journeyProdMedPrimeiroAtend = document.getElementById('journeyProdMedPrimeiroAtend');
const journeyProdMedUltimoAtend = document.getElementById('journeyProdMedUltimoAtend');
const journeyProdSemRefeicao = document.getElementById('journeyProdSemRefeicao');
const journeyProdMedJornada = document.getElementById('journeyProdMedJornada');
const journeyProdPercIncomp = document.getElementById('journeyProdPercIncomp');
const equipesModal = document.getElementById('equipesModal');
const equipesModalClose = document.getElementById('equipesModalClose');
const equipesModalTitle = document.getElementById('equipesModalTitle');
const equipesModalMeta = document.getElementById('equipesModalMeta');
const equipesModalBody = document.getElementById('equipesModalBody');

function normalizarLabelCard(valor) {
  return String(valor || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toUpperCase();
}

const HTML2CANVAS_CDN_URL = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
const scriptsExternosCarregando = new Map();

function carregarScriptExterno(src) {
  if (scriptsExternosCarregando.has(src)) return scriptsExternosCarregando.get(src);

  const existente = document.querySelector(`script[src="${src}"]`);
  if (existente) {
    const promiseExistente = new Promise((resolve, reject) => {
      existente.addEventListener('load', resolve, { once: true });
      existente.addEventListener('error', () => reject(new Error(`Falha ao carregar script externo: ${src}`)), { once: true });
    });
    scriptsExternosCarregando.set(src, promiseExistente);
    return promiseExistente;
  }

  const promise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Falha ao carregar script externo: ${src}`));
    document.head.appendChild(script);
  });

  scriptsExternosCarregando.set(src, promise);
  return promise;
}

async function garantirHtml2Canvas() {
  if (typeof html2canvas !== 'undefined') return;
  await carregarScriptExterno(HTML2CANVAS_CDN_URL);
}

function obterCardKpi(seletorPainel, labelBusca) {
  const alvo = normalizarLabelCard(labelBusca);
  return Array.from(document.querySelectorAll(`${seletorPainel} .grid-card`)).find((card) =>
    normalizarLabelCard(card.querySelector('.card-label')?.textContent || '') === alvo
  );
}

const eficienciaCards = Array.from(document.querySelectorAll('.kpi-eficiencia .grid-card'));
const eficienciaValores = Object.fromEntries(
  eficienciaCards.map((card) => {
    const label = normalizarLabelCard(card.querySelector('.card-label')?.textContent || '');
    return [label, card.querySelector('.value')];
  }).filter((item) => item[0] && item[1])
);
const jornadaTrabalhoCards = Array.from(document.querySelectorAll('.kpi-jornada-trab .grid-card'));
const obterCardJornadaTrabalhoPorLabel = (labelBusca) => jornadaTrabalhoCards.find((card) => {
  const label = normalizarLabelCard(card.querySelector('.card-label')?.textContent || '');
  return label === labelBusca;
});
const cardJornadaTrabalhoAtraso = obterCardJornadaTrabalhoPorLabel('ATRASO');
const cardJornadaTrabalhoSaidaAntecipada = obterCardJornadaTrabalhoPorLabel('SAIDA ANTECIPADA');
const cardJornadaTrabalhoAbsenteismo = jornadaTrabalhoCards.find((card) => {
  const label = normalizarLabelCard(card.querySelector('.card-label')?.textContent || '');
  return label === 'ABSENTEISMO';
});
const jornadaTrabalhoValores = Object.fromEntries(
  jornadaTrabalhoCards.map((card) => {
    const label = normalizarLabelCard(card.querySelector('.card-label')?.textContent || '');
    return [label, card.querySelector('.value')];
  }).filter((item) => item[0] && item[1])
);
const cardPerfClassificacaoWm = obterCardKpi('.kpi-performance', 'CLASSIFICAÇÃO WM');
const cardPerfClassificacaoLote = obterCardKpi('.kpi-performance', 'CLASSIFICAÇÃO LOTE PROD.');
const cardPerfImpedimento = obterCardKpi('.kpi-performance', '% IMPEDIMENTO');
const cardSdcaTotalEquipes = obterCardKpi('.kpi-sdca', 'TOTAL DE EQUIPES');
const cardSdcaEquipesD = obterCardKpi('.kpi-sdca', 'EQUIPES D');
const cardSdcaPercAcordadas = obterCardKpi('.kpi-sdca', '% EQUIPES ACORDADAS');
const cardSdcaPercJustificadas = obterCardKpi('.kpi-sdca', '% EQUIPES JUSTIFICADAS');
const cardJourneyProdTotal = obterCardKpi('.kpi-jornada-prod', 'TOTAL DE EQP. EFETIVA');
const cardJourneyProdMedPrimeiro = obterCardKpi('.kpi-jornada-prod', 'MED. 1º ATEND.');
const cardJourneyProdMedUltimo = obterCardKpi('.kpi-jornada-prod', 'MED. ULT. ATEND.');
const cardJourneyProdMedJornada = obterCardKpi('.kpi-jornada-prod', 'MED. JORN. PROD.');
const cardJourneyProdPercIncomp = obterCardKpi('.kpi-jornada-prod', '% JORN. PROD. INCOMP');
const cardJornadaTrabalhoTotal = obterCardKpi('.kpi-jornada-trab', 'TOTAL DE EQUIP. EFETIVA');
const cardJornadaTrabalhoHoraExtra = obterCardKpi('.kpi-jornada-trab', 'HORA EXTRA');
const cardEficienciaTotal = obterCardKpi('.kpi-eficiencia', 'TOTAL DE EQUIP. EFETIVA');
const cardEficienciaServDesignados = obterCardKpi('.kpi-eficiencia', 'SERVIÇOS DESIG.');
const cardEficienciaServExecutados = obterCardKpi('.kpi-eficiencia', 'SERVIÇOS EXEC.');
const cardEficienciaServProdutivo = obterCardKpi('.kpi-eficiencia', 'SERVIÇOS PRODUTIVO');
const cardEficienciaServImprodutivos = obterCardKpi('.kpi-eficiencia', 'SERVIÇOS IMPRODUTIVOS');
const cardEficienciaPercImprod = obterCardKpi('.kpi-eficiencia', '% SERV. IMPROD.');
const cardEficienciaMediaServico = obterCardKpi('.kpi-eficiencia', 'MED. SERVIÇO POR EQP.');
const cardEficienciaSemServico = obterCardKpi('.kpi-eficiencia', 'EQUIPE SEM SERVIÇO');

let isSupervisorExpanded = false;
let isUoExpanded = false;
let isSupDateOpen = false;
let supSelectedDate = null;
let supSelectedWeeks = [];
let supDatePickerMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

// Estrutura de dados de supervisores por U.O.
const supervisorsByUO = {
  'U.O. 1': ['Cleydivan Nascimento Silva', 'Luiz Lan Aparecido de Souza Pinto'],
  'U.O. 2': ['Marconi Cesar Teixeira Junior', 'Marcos Giovane Oliveira Pinheiro'],
  'U.O. 3': ['Renan Silva Santos Machado', 'Washington Lemes do Nascimento'],
  'U.O. 284': ['Cleydivan Nascimento Silva', 'Luiz Lan Aparecido de Souza Pinto', 'Marconi Cesar Teixeira Junior', 'Marcos Giovane Oliveira Pinheiro', 'Ralf da Silva', 'Renan Silva Santos Machado', 'Washington Lemes do Nascimento'],
  'U.O. 286': ['Cintia Demaria Alves', 'Gilberto Rodrigo Silva Paulo', 'Otavio Barbosa de Souza']
};

const sampleData = [
  { title: 'Total de Equipes', value: '40' },
  { title: 'Classificação', value: 'D-45%' },
  { title: 'Equipes D', value: '23' },
  { title: '% Impedimento', value: '32%' },
  { title: 'Ações SDCA', value: '15 acordadas' },
  { title: 'Reunião de Equipes', value: 'Calendário disponível' }
];

const ANDON_FAIXAS = ['09', '11', '13', '15', '17'];
const LIMITE_ATRASO_MINUTOS = 15;
let andonReportRows = [];
let andonControleRows = [];
let andonFolhaPontoRows = [];
let andonLoteProdRows = [];
let andonLoteProdEquipesRows = [];
let andonLoteProdEquipesDRows = [];
let andonAvailableUos = ['284', '286'];
let andonLoadingPromise = null;
let andonControleLoadedKey = '';
let andonControleLoadingPromise = null;
let andonFolhaPontoLoadedKey = '';
let andonFolhaPontoLoadingPromise = null;
let andonLoteProdEquipesLoadedKey = '';
let andonLoteProdEquipesLoadingPromise = null;
let andonAcordosBase = {};
let andonFiltroCache = { key: '', values: {} };
let andonDashboardUpdateTimer = null;
const MODAL_PAGE_SIZE = 300;
let modalTabelaEstado = null;
let modalDetalheEquipesDias = new Map();
let modalEquipesVoltarContexto = null;
let modalPerformanceEstado = { lista: [], rows: [], controleRows: null, contexto: {}, busca: '' };
let modalLoteEstado = { lista: [], busca: '', options: {}, habilitarDetalheDias: true };
let modalFiltrosExcelEstado = { assinatura: '', filtros: {} };
let modalFiltrosExcelRestaurar = null;
let modalJustificadasAnaliseEstado = { rows: [], grupoAtivo: '', descricaoAtiva: '', busca: '', historico: new Map() };

function limparCacheAndon() {
  andonFiltroCache = { key: '', values: {} };
}

function classificarFaixa(percentual) {
  if (percentual < 75) return 'D';
  if (percentual < 89) return 'C';
  if (percentual < 100) return 'B';
  if (percentual < 105) return 'A';
  return 'AA';
}

function obterOrdemFaixaDia(faixa) {
  const ordem = { AA: 5, A: 4, B: 3, C: 2, D: 1 };
  return ordem[String(faixa || '').trim().toUpperCase()] || 0;
}

function compararFaixaDiaDesc(a, b) {
  const diffFaixa = obterOrdemFaixaDia(b.faixaDia || b.FAIXA_DIA) - obterOrdemFaixaDia(a.faixaDia || a.FAIXA_DIA);
  if (diffFaixa !== 0) return diffFaixa;
  return String(a.equipe || a.nome || a.COD_EQUIPE || '').localeCompare(
    String(b.equipe || b.nome || b.COD_EQUIPE || ''),
    'pt-BR',
    { sensitivity: 'base' }
  );
}

function toNumberSafe(value) {
  if (typeof value === 'number') return value;
  if (value == null || value === '') return 0;
  const texto = String(value).trim();
  if (texto.includes(',')) {
    return parseFloat(texto.replace(/\./g, '').replace(',', '.')) || 0;
  }
  return parseFloat(texto) || 0;
}

function formatInt(value) {
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(Number(value || 0));
}

function formatNumber3(value) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  }).format(Number(value || 0));
}

function formatNumber2(value) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(value || 0));
}

function formatNumber3Scale100(value) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  }).format(Number(value || 0));
}

function normalizarProducaoLoteParaMeta(value) {
  return Number(value || 0);
}

function formatPercent(value) {
  return `${Number(value || 0).toFixed(2).replace('.', ',')}%`;
}

function formatHoraMedia(minutos) {
  if (!Number.isFinite(minutos)) return '--';
  const total = Math.max(0, Math.round(minutos));
  const horas = String(Math.floor(total / 60)).padStart(2, '0');
  const mins = String(total % 60).padStart(2, '0');
  return `${horas}:${mins}`;
}

function formatClassificacao(percentual) {
  if (!Number.isFinite(percentual)) return '--';
  return `${classificarFaixa(percentual)}-${Math.round(percentual)}%`;
}

const CLASSES_FAIXA_KPI = ['kpi-faixa-aa', 'kpi-faixa-a', 'kpi-faixa-b', 'kpi-faixa-c', 'kpi-faixa-d', 'kpi-faixa-neutra'];
const CLASSES_PERCENTUAL_KPI = ['kpi-percentual-ok', 'kpi-percentual-alerta'];

function obterFaixaClassificacaoTexto(texto) {
  const faixa = String(texto || '').trim().toUpperCase().split('-')[0];
  return ['AA', 'A', 'B', 'C', 'D'].includes(faixa) ? faixa : '';
}

function aplicarCorFaixaKpi(card, faixa) {
  if (!card) return;
  card.classList.remove(...CLASSES_FAIXA_KPI);
  const faixaNormalizada = String(faixa || '').trim().toLowerCase();
  card.classList.add(faixaNormalizada ? `kpi-faixa-${faixaNormalizada}` : 'kpi-faixa-neutra');
}

function aplicarCorPercentualKpi(valueEl, percentual, limite = 20) {
  if (!valueEl) return;
  valueEl.classList.remove(...CLASSES_PERCENTUAL_KPI);
  valueEl.classList.add(Number(percentual || 0) > limite ? 'kpi-percentual-alerta' : 'kpi-percentual-ok');
}

function textoContemMtami(valor) {
  return String(valor || '')
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .includes('MTAMI');
}

function nomeEhClusterMtami(...candidatos) {
  return candidatos.some((valor) => textoContemMtami(valor));
}

const META_PADRAO_POR_PREFIXO_EQUIPE = {
  MFAMI: 1.3,
  MFCA: 1.7,
  MFIN: 0.9,
  MFLG: 0.85,
  MFPLD: 0.9,
  MFPLT: 0.9,
  MFPMG: 0.7,
  MTAMI: 0.75,
  MTCT: 0.4,
  MTIN: 0.4,
  MTPL: 0.4,
  MTRL: 0.4,
  MTTOP20: 0.4,
  MTVP: 0.25
};

function obterPrefixoNomenclaturaEquipe(nome) {
  const texto = String(nome || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
  const match = texto.match(/(?:^|[-\s])((?:MF|MT)[A-Z0-9]+)(?:[-\s]|$)/);
  return match ? match[1].trim() : '';
}

function obterMetaPadraoPorNomenclatura(...candidatos) {
  for (const candidato of candidatos) {
    const prefixo = obterPrefixoNomenclaturaEquipe(candidato);
    if (prefixo && META_PADRAO_POR_PREFIXO_EQUIPE[prefixo]) {
      return ajustarMetaClusterMtamiAndon(META_PADRAO_POR_PREFIXO_EQUIPE[prefixo], candidato);
    }
  }
  return 0;
}

function ajustarMetaComFallbackNomenclatura(meta, ...candidatos) {
  const metaAjustada = ajustarMetaClusterMtamiAndon(meta, ...candidatos);
  return Number(metaAjustada || 0) || obterMetaPadraoPorNomenclatura(...candidatos);
}

function ajustarMetaClusterMtamiAndon(meta, ...candidatos) {
  const valor = Number(meta || 0);
  return nomeEhClusterMtami(...candidatos) ? valor * 2 : valor;
}

function normalizarDataIso(value) {
  if (!value) return '';
  if (typeof value === 'string') {
    const texto = value.trim();
    const iso = texto.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
    const br = texto.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
    if (br) return `${br[3]}-${br[2]}-${br[1]}`;
  }
  const data = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(data.getTime())) return '';
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function obterHorasAcumuladasAndon(hora) {
  const mapa = { '09': 1.8, '11': 3.6, '13': 5.4, '15': 7.2, '17': 9 };
  return Number(mapa[String(hora || '').padStart(2, '0')] || 0);
}

function obterValorPrimeiro(row, keys = []) {
  const aliases = {
    'CÃ³d.UO': ['Cód.UO', 'CÃ³d.UO', 'CÃƒÂ³d.UO', 'COD_UO', 'UO'],
    'CÃƒÂ³d.UO': ['Cód.UO', 'CÃ³d.UO', 'CÃƒÂ³d.UO', 'COD_UO', 'UO'],
    'CÃ³d. Eq.': ['Cód. Equipe', 'Cód. Eq.', 'CÃ³d. Equipe', 'CÃƒÂ³d. Equipe', 'CÃ³d. Eq.', 'CÃƒÂ³d. Eq.', 'COD_EQUIPE', 'COD_EQUIPE_WM', 'NUM_EQUIPE'],
    'CÃƒÂ³d. Eq.': ['Cód. Equipe', 'Cód. Eq.', 'CÃ³d. Equipe', 'CÃƒÂ³d. Equipe', 'CÃ³d. Eq.', 'CÃƒÂ³d. Eq.', 'COD_EQUIPE', 'COD_EQUIPE_WM', 'NUM_EQUIPE'],
    'ProduÃ§Ã£o': ['Produção', 'ProduÃ§Ã£o', 'PRODUÇÃO', 'PRODUÃ‡ÃƒO', 'PRODUCAO'],
    'PRODUÃ‡ÃƒO': ['Produção', 'ProduÃ§Ã£o', 'PRODUÇÃO', 'PRODUÃ‡ÃƒO', 'PRODUCAO'],
    'ClassificaÃ§Ã£o': ['Classificação', 'ClassificaÃ§Ã£o', 'Classificação Exec Meta', 'COD_CLASSIFICACAO_DINAMICO'],
    '1Ã‚Âº Atendimento': ['1º Atendimento', '1Âº Atendimento', '1Ã‚Âº Atendimento', 'PRIMEIRO_ATENDIMENTO'],
    '1Âº Atendimento': ['1º Atendimento', '1Âº Atendimento', '1Ã‚Âº Atendimento', 'PRIMEIRO_ATENDIMENTO'],
    'InÃ­cio Jornada': ['Início Jornada', 'InÃ­cio Jornada', 'INICIO_JORNADA'],
    'DATA_ATUALIZAÃ‡ÃƒO': ['DATA_ATUALIZACAO', 'DATA_ATUALIZAÃ‡ÃƒO', 'DATA_DESIGNACAO', 'DATA DESIGNACAO', 'DESIGNACAO']
  };

  for (const key of keys) {
    const tentativas = aliases[key] || [key];
    for (const tentativa of tentativas) {
      if (row && row[tentativa] != null && row[tentativa] !== '') return row[tentativa];
    }
  }
  return '';
}

function obterUoLinha(row) {
  const bruto = obterValorPrimeiro(row, ['Cód.UO', 'CÃ³d.UO', 'COD_UO', 'UO']);
  return String(bruto || '').replace(/[^\d]/g, '');
}

function obterCodigoEquipeLinha(row) {
  return String(obterValorPrimeiro(row, ['Cód. Eq.', 'CÃ³d. Eq.', 'COD_EQUIPE', 'COD_EQUIPE_WM', 'NUM_EQUIPE']) || '').trim();
}

function obterHoraLinha(row) {
  const bruto = String(obterValorPrimeiro(row, ['Hora', 'HORA']) || '').trim();
  const match = bruto.match(/(\d{1,2})/);
  return match ? match[1].padStart(2, '0') : '';
}

function obterDataControleLinha(row) {
  return normalizarDataIso(
    obterValorPrimeiro(row, ['DATA_ATUALIZACAO', 'DATA_ATUALIZAÇÃO', 'DATA_ATUALIZACAO_D', 'DATA_DESIGNACAO', 'DATA DESIGNACAO', 'DESIGNACAO'])
  );
}

function obterHoraTexto(value) {
  const texto = String(value || '').trim();
  if (!texto) return '-';
  const match = texto.match(/(\d{1,2}):(\d{2})/);
  return match ? `${match[1].padStart(2, '0')}:${match[2]}` : texto;
}

function horaParaMinutos(value) {
  const texto = obterHoraTexto(value);
  if (!texto || texto === '-') return Number.NaN;
  const partes = texto.split(':');
  const hora = Number(partes[0]);
  const minuto = Number(partes[1]);
  return Number.isFinite(hora) && Number.isFinite(minuto) ? (hora * 60) + minuto : Number.NaN;
}

function diffHoraTexto(inicio, fim) {
  const ini = horaParaMinutos(inicio);
  const end = horaParaMinutos(fim);
  if (!Number.isFinite(ini) || !Number.isFinite(end) || end < ini) return '-';
  const total = end - ini;
  const horas = String(Math.floor(total / 60)).padStart(2, '0');
  const minutos = String(total % 60).padStart(2, '0');
  return `${horas}:${minutos}`;
}

function mediaNumericaAndon(valores = []) {
  const lista = valores.filter((valor) => Number.isFinite(valor));
  if (!lista.length) return Number.NaN;
  return lista.reduce((acc, valor) => acc + valor, 0) / lista.length;
}

function normalizarProdutivoFlag(value) {
  const texto = String(value || '').trim().toUpperCase();
  if (!texto) return '';
  if (['SIM', 'S', '1', 'TRUE'].includes(texto)) return 'SIM';
  if (['NÃO', 'NAO', 'N', '0', 'FALSE'].includes(texto)) return 'NAO';
  return texto;
}

function obterValorPrimeiro(row, keys = []) {
  for (const key of keys) {
    if (row && row[key] != null && row[key] !== '') return row[key];
  }
  return '';
}

function obterUoLinha(row) {
  const bruto = obterValorPrimeiro(row, ['Cód.UO', 'CÃ³d.UO', 'CÃƒÂ³d.UO', 'COD_UO', 'UO']);
  return String(bruto || '').replace(/[^\d]/g, '');
}

function obterCodigoEquipeLinha(row) {
  return String(
    obterValorPrimeiro(row, [
      'Cód. Equipe',
      'Cód. Eq.',
      'CÃ³d. Equipe',
      'CÃ³d. Eq.',
      'CÃƒÂ³d. Equipe',
      'CÃƒÂ³d. Eq.',
      'COD_EQUIPE',
      'COD_EQUIPE_WM',
      'NUM_EQUIPE'
    ]) || ''
  ).trim();
}

function obterDataControleLinha(row) {
  return normalizarDataIso(
    obterValorPrimeiro(row, [
      'DATA_TERMINO_REAL',
      'ENCERRAMENTO',
      'DATA_TERMINO',
      'DATA_ATUALIZACAO',
      'DATA_ATUALIZAÇÃO',
      'DATA_ATUALIZAÃ‡ÃƒO',
      'DATA_ATUALIZACAO_D',
      'DATA_DESIGNACAO',
      'DATA DESIGNACAO',
      'DESIGNACAO'
    ])
  );
}

function obterDataAtualizacaoControleLinha(row) {
  return normalizarDataIso(
    obterValorPrimeiro(row, [
      'DATA_DESIGNACAO',
      'DATA DESIGNACAO',
      'DESIGNACAO',
      'DATA_ATUALIZACAO',
      'DATA_ATUALIZAÇÃO',
      'DATA_ATUALIZAÃ‡ÃƒO',
      'DATA_ATUALIZACAO_D',
      'DATA ATUALIZACAO',
      'DATA',
      'Data'
    ])
  );
}

function linhaPassaFiltrosPeriodo(dataIso) {
  if (!dataIso) return false;
  if (headerSelectedDate) return dataIso === normalizarDataIso(headerSelectedDate);
  if (headerSelectedWeeks.length) {
    return headerSelectedWeeks.some((week) => dataIso >= normalizarDataIso(week.start) && dataIso <= normalizarDataIso(week.end));
  }
  if (headerSelectedMonth) {
    return dataIso.startsWith(`${headerSelectedMonth.year}-${String(headerSelectedMonth.month + 1).padStart(2, '0')}`);
  }
  return true;
}

function obterPeriodoFiltroAndon() {
  if (headerSelectedDate) {
    const data = normalizarDataIso(headerSelectedDate);
    return { inicio: data, fim: data };
  }
  if (headerSelectedWeeks.length) {
    const sorted = [...headerSelectedWeeks].sort((a, b) => a.start - b.start);
    return {
      inicio: normalizarDataIso(sorted[0].start),
      fim: normalizarDataIso(sorted[sorted.length - 1].end)
    };
  }
  if (headerSelectedMonth) {
    const inicio = new Date(headerSelectedMonth.year, headerSelectedMonth.month, 1);
    const fim = new Date(headerSelectedMonth.year, headerSelectedMonth.month + 1, 0);
    return { inicio: normalizarDataIso(inicio), fim: normalizarDataIso(fim) };
  }
  return { inicio: '', fim: '' };
}

function obterChavePeriodoFiltroAndon() {
  const periodo = obterPeriodoFiltroAndon();
  return `${periodo.inicio || 'ini'}:${periodo.fim || 'fim'}`;
}

function filtroPeriodoMultiDiaAtivo() {
  return !headerSelectedDate && (headerSelectedWeeks.length > 0 || Boolean(headerSelectedMonth));
}

function obterChaveCacheFiltroAndon() {
  const uo = String(headerSelectedUo || '').replace(/[^\d]/g, '') || 'todas';
  const supervisor = normalizarTextoFiltroModal(headerSelectedSupervisor || '') || 'todos';
  const semanas = headerSelectedWeeks
    .map((week) => `${normalizarDataIso(week.start)}>${normalizarDataIso(week.end)}`)
    .join(',');
  const mes = headerSelectedMonth
    ? `${headerSelectedMonth.year}-${String(headerSelectedMonth.month + 1).padStart(2, '0')}`
    : '';

  return [
    obterChavePeriodoFiltroAndon(),
    uo,
    supervisor,
    semanas,
    mes,
    andonReportRows.length,
    andonLoteProdRows.length,
    andonLoteProdEquipesDRows.length,
    andonControleLoadedKey,
    andonFolhaPontoLoadedKey,
    andonLoteProdEquipesLoadedKey
  ].join('|');
}

function obterCacheFiltroAndon() {
  const key = obterChaveCacheFiltroAndon();
  if (andonFiltroCache.key !== key) {
    andonFiltroCache = { key, values: {} };
  }
  return andonFiltroCache.values;
}

function agruparRowsPorCodigo(rows = [], obterCodigo) {
  const mapa = new Map();
  rows.forEach((row) => {
    const codigo = String(obterCodigo(row) || '').trim();
    if (!codigo) return;
    if (!mapa.has(codigo)) mapa.set(codigo, []);
    mapa.get(codigo).push(row);
  });
  return mapa;
}

function obterMapaReportPorCodigoAndon() {
  const cache = obterCacheFiltroAndon();
  if (!cache.reportPorCodigo) {
    cache.reportPorCodigo = agruparRowsPorCodigo(filtrarReportRowsAndon(), obterCodigoEquipeLinha);
  }
  return cache.reportPorCodigo;
}

function obterMapaControlePorCodigoAndon() {
  const cache = obterCacheFiltroAndon();
  if (!cache.controlePorCodigo) {
    cache.controlePorCodigo = agruparRowsPorCodigo(
      filtrarControleRowsAndon(),
      (row) => obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE'])
    );
  }
  return cache.controlePorCodigo;
}

function obterMapaLoteEquipesPorCodigoAndon() {
  const cache = obterCacheFiltroAndon();
  if (!cache.loteEquipesPorCodigo) {
    cache.loteEquipesPorCodigo = agruparRowsPorCodigo(filtrarLoteProdEquipesRowsAndon(), obterCodigoEquipeLote);
  }
  return cache.loteEquipesPorCodigo;
}

async function carregarLoteProdEquipesAndon() {
  const periodo = obterPeriodoFiltroAndon();
  const chave = obterChavePeriodoFiltroAndon();
  if (andonLoteProdEquipesLoadedKey === chave) return;
  if (andonLoteProdEquipesLoadingPromise) return andonLoteProdEquipesLoadingPromise;

  const params = new URLSearchParams();
  if (periodo.inicio) params.set('dataInicio', periodo.inicio);
  if (periodo.fim) params.set('dataFim', periodo.fim);
  const query = params.toString();

  andonLoteProdEquipesLoadingPromise = fetch(`/api/lote-prod/equipes${query ? `?${query}` : ''}`, { cache: 'no-store' })
    .then((resp) => resp.ok ? resp.json() : { rows: [] })
    .then((payload) => {
      andonLoteProdEquipesRows = Array.isArray(payload && payload.rows) ? payload.rows : [];
      andonLoteProdEquipesLoadedKey = chave;
      limparCacheAndon();
    })
    .catch((error) => {
      console.error('Erro ao carregar equipes do lote produtivo:', error);
      andonLoteProdEquipesRows = [];
      andonLoteProdEquipesLoadedKey = chave;
      limparCacheAndon();
    })
    .finally(() => {
      andonLoteProdEquipesLoadingPromise = null;
    });

  return andonLoteProdEquipesLoadingPromise;
}

async function carregarControleServicoAndon() {
  const periodo = obterPeriodoFiltroAndon();
  const chave = obterChavePeriodoFiltroAndon();
  if (andonControleLoadedKey === chave) return;
  if (andonControleLoadingPromise) return andonControleLoadingPromise;

  const params = new URLSearchParams();
  if (periodo.inicio) params.set('dataInicio', periodo.inicio);
  if (periodo.fim) params.set('dataFim', periodo.fim);
  params.set('dataRef', 'termino');
  params.set('limit', '50000');
  const query = params.toString();

  andonControleLoadingPromise = fetch(`/api/controle-servico?${query}`, { cache: 'no-store' })
    .then((resp) => resp.ok ? resp.json() : { rows: [] })
    .then((payload) => {
      andonControleRows = Array.isArray(payload && payload.rows) ? payload.rows : [];
      andonControleLoadedKey = chave;
      limparCacheAndon();
    })
    .catch((error) => {
      console.error('Erro ao carregar controle de servico no ANDON:', error);
      andonControleRows = [];
      andonControleLoadedKey = chave;
      limparCacheAndon();
    })
    .finally(() => {
      andonControleLoadingPromise = null;
    });

  return andonControleLoadingPromise;
}

async function carregarFolhaPontoAndon() {
  const periodo = obterPeriodoFiltroAndon();
  const chave = `${obterChavePeriodoFiltroAndon()}:${String(headerSelectedUo || '').replace(/[^\d]/g, '') || 'todas'}`;
  if (andonFolhaPontoLoadedKey === chave) return;
  if (andonFolhaPontoLoadingPromise) return andonFolhaPontoLoadingPromise;

  const params = new URLSearchParams();
  if (periodo.inicio) params.set('dataInicio', periodo.inicio);
  if (periodo.fim) params.set('dataFim', periodo.fim);
  if (headerSelectedUo) params.set('uo', String(headerSelectedUo).replace(/[^\d]/g, ''));
  params.set('limit', '100000');

  andonFolhaPontoLoadingPromise = fetch(`/api/folha-ponto?${params.toString()}`, { cache: 'no-store' })
    .then((resp) => resp.ok ? resp.json() : { rows: [] })
    .then((payload) => {
      andonFolhaPontoRows = Array.isArray(payload && payload.rows) ? payload.rows : [];
      andonFolhaPontoLoadedKey = chave;
      limparCacheAndon();
    })
    .catch((error) => {
      console.error('Erro ao carregar folha ponto no ANDON:', error);
      andonFolhaPontoRows = [];
      andonFolhaPontoLoadedKey = chave;
      limparCacheAndon();
    })
    .finally(() => {
      andonFolhaPontoLoadingPromise = null;
    });

  return andonFolhaPontoLoadingPromise;
}

function filtrarReportRowsAndon() {
  const cache = obterCacheFiltroAndon();
  if (cache.reportRows) return cache.reportRows;
  cache.reportRows = andonReportRows.filter((row) => {
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA']));
    const uo = obterUoLinha(row);
    if (headerSelectedUo && uo !== headerSelectedUo.replace(/[^\d]/g, '')) return false;
    const supervisor = String(obterValorPrimeiro(row, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR', 'SUPERVISOR_EQUIPE']) || '').trim();
    if (headerSelectedSupervisor && normalizarTextoFiltroModal(supervisor) !== normalizarTextoFiltroModal(headerSelectedSupervisor)) return false;
    return linhaPassaFiltrosPeriodo(dataIso);
  });
  return cache.reportRows;
}

function filtrarControleRowsAndon() {
  const cache = obterCacheFiltroAndon();
  if (cache.controleRows) return cache.controleRows;
  const codigosSupervisor = headerSelectedSupervisor
    ? obterCodigosReportRows(filtrarReportRowsAndon())
    : null;
  cache.controleRows = andonControleRows.filter((row) => {
    const dataIso = obterDataControleLinha(row);
    const uo = obterUoLinha(row);
    if (headerSelectedUo && uo !== headerSelectedUo.replace(/[^\d]/g, '')) return false;
    if (codigosSupervisor) {
      const codigo = String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '').trim();
      if (!codigosSupervisor.has(codigo)) return false;
    }
    return linhaPassaFiltrosPeriodo(dataIso);
  });
  return cache.controleRows;
}

function filtrarFolhaPontoRowsAndon() {
  const cache = obterCacheFiltroAndon();
  if (cache.folhaPontoRows) return cache.folhaPontoRows;
  const codigosSupervisor = headerSelectedSupervisor
    ? obterCodigosReportRows(filtrarReportRowsAndon())
    : null;
  cache.folhaPontoRows = andonFolhaPontoRows.filter((row) => {
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
    if (!linhaPassaFiltrosPeriodo(dataIso)) return false;
    const uo = String(obterValorPrimeiro(row, ['COD_UO', 'UO']) || '').replace(/[^\d]/g, '');
    if (headerSelectedUo && uo && uo !== headerSelectedUo.replace(/[^\d]/g, '')) return false;
    if (codigosSupervisor) {
      const codigo = String(obterValorPrimeiro(row, ['COD_EQUIPE']) || '').trim();
      if (!codigosSupervisor.has(codigo)) return false;
    }
    return true;
  });
  return cache.folhaPontoRows;
}

function filtrarLoteProdRowsAndon() {
  const cache = obterCacheFiltroAndon();
  if (cache.loteProdRows) return cache.loteProdRows;
  cache.loteProdRows = andonLoteProdRows.filter((row) => {
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
    return linhaPassaFiltrosPeriodo(dataIso);
  });
  return cache.loteProdRows;
}

function filtrarLoteProdEquipesRowsAndon() {
  const cache = obterCacheFiltroAndon();
  if (cache.loteProdEquipesRows) return cache.loteProdEquipesRows;
  cache.loteProdEquipesRows = andonLoteProdEquipesRows.filter((row) => {
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
    return linhaPassaFiltrosPeriodo(dataIso);
  });
  return cache.loteProdEquipesRows;
}

function filtrarLoteProdEquipesDRowsAndon() {
  const cache = obterCacheFiltroAndon();
  if (cache.loteProdEquipesDRows) return cache.loteProdEquipesDRows;
  cache.loteProdEquipesDRows = andonLoteProdEquipesDRows.filter((row) => {
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
    return linhaPassaFiltrosPeriodo(dataIso);
  });
  return cache.loteProdEquipesDRows;
}

function obterCodigoEquipeLote(row) {
  return String(obterValorPrimeiro(row, ['COD_EQUIPE', 'COD_EQUIPE_WM', 'NUM_EQUIPE']) || '').trim();
}

function nomeEquipeContemAdm(nome) {
  const texto = String(nome || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
  return /(^|[^A-Z0-9])ADM([^A-Z0-9]|$)/.test(texto);
}

function itemEquipeDeveAparecerModal(item = {}) {
  return !nomeEquipeContemAdm(item.equipe || item.Equipe || item.EQUIPE || item.NOME_EQUIPE || item.Nome || item.NOME || '');
}

function obterCodigosReportRows(rows = []) {
  return new Set(rows.map((row) => String(obterCodigoEquipeLinha(row) || '').trim()).filter(Boolean));
}

function linhaReportPossuiInicioJornada(row = {}) {
  const inicio = obterHoraTexto(obterValorPrimeiro(row, [
    'INICIO_JORNADA',
    'Inicio Jornada',
    'Início Jornada',
    'InÃ­cio Jornada'
  ]));
  return Number.isFinite(horaParaMinutos(inicio));
}

function filtrarReportRowsComInicioJornada(rows = []) {
  const codigosComInicio = new Set(
    rows
      .filter(linhaReportPossuiInicioJornada)
      .map((row) => String(obterCodigoEquipeLinha(row) || '').trim())
      .filter(Boolean)
  );
  if (!codigosComInicio.size) return [];
  return rows.filter((row) => codigosComInicio.has(String(obterCodigoEquipeLinha(row) || '').trim()));
}

function filtrarReportRowsPorDiasComInicioJornada(rows = []) {
  const chavesComInicio = new Set(
    rows
      .filter(linhaReportPossuiInicioJornada)
      .map((row) => {
        const codigo = String(obterCodigoEquipeLinha(row) || '').trim();
        const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA']));
        return codigo && dataIso ? `${codigo}__${dataIso}` : '';
      })
      .filter(Boolean)
  );
  if (!chavesComInicio.size) return [];
  return rows.filter((row) => {
    const codigo = String(obterCodigoEquipeLinha(row) || '').trim();
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA']));
    return codigo && dataIso && chavesComInicio.has(`${codigo}__${dataIso}`);
  });
}

function obterTotalEquipesComInicioJornada(rows = []) {
  return obterCodigosReportRows(filtrarReportRowsComInicioJornada(rows)).size;
}

function contarEquipesDiasComInicioJornada(rows = []) {
  const chaves = new Set();
  rows.forEach((row) => {
    if (!linhaReportPossuiInicioJornada(row)) return;
    const codigo = String(obterCodigoEquipeLinha(row) || '').trim();
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA']));
    if (codigo && dataIso) chaves.add(`${codigo}__${dataIso}`);
  });
  return chaves.size;
}

function somarDiasTrabalhadosEquipes(listaEquipes = []) {
  return listaEquipes.reduce((acc, item) => acc + Number(item.diasTrabalhados || 0), 0);
}

function obterEquipesDBaseTotalComInicioJornada(rows = []) {
  return obterEquipesDBaseTotal(filtrarReportRowsComInicioJornada(rows));
}

function obterMetricasReportPorEquipe(rows = []) {
  const porEquipeDia = new Map();

  rows.forEach((row) => {
    const codigo = obterCodigoEquipeLinha(row);
    if (!codigo) return;

    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA'])) || 'sem-data';
    const chaveDia = `${codigo}__${dataIso}`;
    const atual = porEquipeDia.get(chaveDia) || {
      codigo,
      datas: new Set(),
      metaDia: 0,
      prodDia: 0
    };

    atual.datas.add(dataIso);
    atual.metaDia = Math.max(
      atual.metaDia,
      ajustarMetaComFallbackNomenclatura(
        toNumberSafe(obterValorPrimeiro(row, ['Meta Prog.', 'META PROG', 'META_PROG'])),
        obterValorPrimeiro(row, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR']),
        obterValorPrimeiro(row, ['Nome', 'NOME_EQUIPE', 'NOME'])
      )
    );
    atual.prodDia = Math.max(
      atual.prodDia,
      toNumberSafe(obterValorPrimeiro(row, ['Produção', 'PRODUÇÃO', 'ProduÃ§Ã£o', 'PRODUÃ‡ÃƒO', 'PRODUCAO']))
    );
    porEquipeDia.set(chaveDia, atual);
  });

  const porEquipe = new Map();
  porEquipeDia.forEach((dia) => {
    const atual = porEquipe.get(dia.codigo) || {
      codigo: dia.codigo,
      datas: new Set(),
      metaDia: 0,
      prodDia: 0
    };
    dia.datas.forEach((data) => atual.datas.add(data));
    atual.metaDia += Number(dia.metaDia || 0);
    atual.prodDia += Number(dia.prodDia || 0);
    porEquipe.set(dia.codigo, atual);
  });

  return porEquipe;
}

function filtrarLoteProdPorCodigos(rows = [], codigos = new Set()) {
  if (!codigos || !codigos.size) return [];
  return rows.filter((row) => codigos.has(obterCodigoEquipeLote(row)));
}

function calcularClassificacaoLoteProdEquipes(rows = []) {
  const totalMeta = rows.reduce((acc, row) => acc + toNumberSafe(obterValorPrimeiro(row, ['META', 'Meta'])), 0);
  const totalProducao = rows.reduce((acc, row) => acc + toNumberSafe(obterValorPrimeiro(row, ['VALOR_US', 'Valor_US', 'valor_us'])), 0);
  return totalMeta > 0 ? formatClassificacao((normalizarProducaoLoteParaMeta(totalProducao) / totalMeta) * 100) : '--';
}

function obterEquipesDBaseLoteProd(rows = []) {
  const porEquipeDia = new Map();

  rows.forEach((row) => {
    const codigo = obterCodigoEquipeLote(row);
    if (!codigo) return;

    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data'])) || 'sem-data';
    const chaveDia = `${codigo}__${dataIso}`;
    const atual = porEquipeDia.get(chaveDia) || { codigo, metaDia: 0, prodDia: 0 };
    atual.metaDia = Math.max(atual.metaDia, toNumberSafe(obterValorPrimeiro(row, ['META', 'Meta'])));
    atual.prodDia = Math.max(atual.prodDia, toNumberSafe(obterValorPrimeiro(row, ['VALOR_US', 'Valor_US', 'valor_us'])));
    porEquipeDia.set(chaveDia, atual);
  });

  const mapa = new Map();
  porEquipeDia.forEach((dia) => {
    const atual = mapa.get(dia.codigo) || { metaDia: 0, prodDia: 0 };
    atual.metaDia += Number(dia.metaDia || 0);
    atual.prodDia += Number(dia.prodDia || 0);
    mapa.set(dia.codigo, atual);
  });

  const equipesD = new Set();
  mapa.forEach((item, codigo) => {
    const percentualDia = Number(item.metaDia || 0) > 0
      ? (normalizarProducaoLoteParaMeta(item.prodDia) / Number(item.metaDia || 0)) * 100
      : 0;
    if (classificarFaixa(percentualDia) === 'D') equipesD.add(String(codigo));
  });

  return {
    totalEquipes: mapa.size,
    totalMetaDia: Array.from(mapa.values()).reduce((acc, item) => acc + Number(item.metaDia || 0), 0),
    totalProdDia: Array.from(mapa.values()).reduce((acc, item) => acc + Number(item.prodDia || 0), 0),
    equipesD
  };
}

function calcularResumoLoteProd(rows = []) {
  const codigosUoAtual = obterCodigosEquipesUoAtual();
  const rowsEquipes = filtrarLoteProdEquipesRowsAndon().filter((row) => {
    if (!codigosUoAtual) return true;
    return codigosUoAtual.has(obterCodigoEquipeLote(row));
  });
  const baseEquipes = obterEquipesDBaseLoteProd(rowsEquipes);
  const totalMeta = baseEquipes.totalMetaDia || rows.reduce((acc, row) => acc + toNumberSafe(obterValorPrimeiro(row, ['META', 'Meta'])), 0);
  const totalProducao = baseEquipes.totalProdDia || rows.reduce((acc, row) => acc + toNumberSafe(obterValorPrimeiro(row, ['VALOR_US', 'Valor_US', 'valor_us'])), 0);
  const percentual = totalMeta > 0 ? (normalizarProducaoLoteParaMeta(totalProducao) / totalMeta) * 100 : NaN;

  return {
    classificacao: formatClassificacao(percentual),
    equipesD: contarEquipesDLoteProdVisiveis()
  };
}

function calcularTotalEquipesLoteProd() {
  const codigosUoAtual = obterCodigosEquipesUoAtual();
  const codigos = new Set();

  filtrarLoteProdEquipesRowsAndon().forEach((row) => {
    const codigo = obterCodigoEquipeLote(row);
    if (!codigo) return;
    if (codigosUoAtual && !codigosUoAtual.has(codigo)) return;
    codigos.add(codigo);
  });

  return codigos.size;
}

function obterMapaNomesEquipesReport(rows = filtrarReportRowsAndon()) {
  const mapa = new Map();
  rows.forEach((row) => {
    const codigo = String(obterCodigoEquipeLinha(row) || '').trim();
    if (!codigo || mapa.has(codigo)) return;
    mapa.set(codigo, String(obterValorPrimeiro(row, ['Nome', 'NOME_EQUIPE', 'NOME']) || '-'));
  });
  return mapa;
}

function renderCabecalhoModalEquipesPadrao(options = {}) {
  removerResumoControleServicoModal();
  const tr = document.querySelector('#equipesModal thead tr');
  if (!tr) return;
  const comHistorico = Boolean(options.comHistorico);
  tr.innerHTML = `
    <th>Datas</th>
    <th>Dias Trab.</th>
    <th>Supervisor</th>
    <th>Equipe</th>
    <th>Meta</th>
    <th>Produção</th>
    <th>Faixa Dia</th>
    <th>% PROD.DIA</th>
    <th>Início Jornada</th>
    <th>Início Refeição</th>
    <th>Término Refeição</th>
    <th>1º Atendimento</th>
    <th>Últ. Atendimento</th>
    <th>Fim Jornada</th>
    <th>Jornada Produtiva</th>
    ${comHistorico ? '<th>Hist.</th>' : ''}
  `;
}

function renderCabecalhoModalEquipesDLoteProd() {
  removerResumoControleServicoModal();
  const tr = document.querySelector('#equipesModal thead tr');
  if (!tr) return;
  tr.innerHTML = `
    <th>Datas</th>
    <th>Dias Trab.</th>
    <th>Supervisor</th>
    <th>Equipe</th>
    <th>Meta</th>
    <th>Prod.</th>
    <th>Faixa Dia W.M</th>
    <th>% PROD. WM</th>
    <th>Prod. Lote</th>
    <th>Faixa Dia Lote</th>
    <th>% PROD. LOTE</th>
    <th>In&iacute;cio Jornada</th>
    <th>In&iacute;cio Refei&ccedil;&atilde;o</th>
    <th>T&eacute;rmino Refei&ccedil;&atilde;o</th>
    <th>1&ordm; Atendimento</th>
    <th>&Uacute;lt. Atendimento</th>
    <th>Fim Jornada</th>
    <th>Jornada Produtiva</th>
    <th>Comparativo</th>
  `;
  return;
  tr.innerHTML = `
    <th>Equipe</th>
    <th>Meta Dia</th>
    <th>Produção Dia</th>
    <th>Meta Mês</th>
    <th>Produção Mês</th>
    <th>Faixa Dia</th>
    <th>% Prod. Dia</th>
    <th>% Prod. Mês</th>
  `;
}

function montarLinhasModalEquipesLoteProd(rows = [], reportRowsModal = filtrarReportRowsAndon(), options = {}) {
  const agruparPorData = Boolean(options.agruparPorData);
  const obterChaveEquipe = (codigo, dataIso = '') => agruparPorData && dataIso ? `${codigo}__${dataIso}` : codigo;
  const linhasWm = montarLinhasModalEquipes(reportRowsModal, 'todas', filtrarControleRowsAndon(), { agruparPorData });
  const mapaWm = new Map(
    linhasWm
      .map((item) => {
        const codigo = String(item.codigo || '').trim();
        const dataIso = normalizarDataIso(item.datas && item.datas[0]);
        return [obterChaveEquipe(codigo, dataIso), item];
      })
      .filter(([codigo]) => Boolean(codigo))
  );
  const mapaMetaFixaWm = new Map();
  linhasWm.forEach((item) => {
    const codigo = String(item.codigo || '').trim();
    const meta = Number(item.metaDia || 0);
    if (!codigo || !Number.isFinite(meta) || meta <= 0) return;
    mapaMetaFixaWm.set(codigo, Math.max(Number(mapaMetaFixaWm.get(codigo) || 0), meta));
  });

  const mapaSupervisor = new Map();
  reportRowsModal.forEach((reportRow) => {
    const codigo = String(obterCodigoEquipeLinha(reportRow) || '').trim();
    if (!codigo || mapaSupervisor.has(codigo)) return;
    mapaSupervisor.set(codigo, String(obterValorPrimeiro(reportRow, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR']) || '-').trim() || '-');
  });

  const mapa = new Map();
  rows.forEach((row) => {
    const codigo = obterCodigoEquipeLote(row);
    if (!codigo) return;

    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
    const chave = obterChaveEquipe(codigo, dataIso);
    const atual = mapa.get(chave) || {
      codigo,
      supervisor: '-',
      equipe: String(obterValorPrimeiro(row, ['NOME_EQUIPE', 'EQUIPE', 'NOME']) || codigo).trim() || '-',
      datas: [],
      metaDia: 0,
      prodDia: 0,
      faixaLote: '-',
      comparativo: '',
      inicioJornada: '-',
      inicioRefeicao: '-',
      terminoRefeicao: '-',
      primeiroAtendimento: '-',
      ultimoAtendimento: '-',
      fimJornada: '-',
      jornadaProdutiva: '-'
    };

    if (dataIso && !atual.datas.includes(dataIso)) atual.datas.push(dataIso);
    atual.supervisor = String(obterValorPrimeiro(row, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR']) || mapaSupervisor.get(codigo) || atual.supervisor).trim() || atual.supervisor;
    atual.metaDia = Math.max(atual.metaDia, toNumberSafe(obterValorPrimeiro(row, ['META', 'Meta'])));
    atual.prodDia = Math.max(atual.prodDia, toNumberSafe(obterValorPrimeiro(row, ['VALOR_US', 'Valor_US', 'valor_us'])));

    const faixa = String(obterValorPrimeiro(row, ['FAIXA_DIA', 'Faixa_Dia', 'faixa_dia']) || '').trim().toUpperCase();
    if (faixa && faixa !== '-') atual.faixaLote = faixa;

    if (row._SOMENTE_WM) {
      atual.comparativo = 'SOMENTE WM';
    }
    if (row._SOMENTE_LOTE) {
      atual.comparativo = 'SOMENTE LOTE';
    }

    mapa.set(chave, atual);
  });

  return Array.from(mapa.values()).map((item) => {
    const codigoItem = String(item.codigo || '').trim();
    const dataItemIso = normalizarDataIso(item.datas && item.datas[0]);
    const wm = mapaWm.get(obterChaveEquipe(codigoItem, dataItemIso))
      || mapaWm.get(codigoItem)
      || {};
    const metaWm =
      Number(wm.metaDia || 0) ||
      Number(mapaMetaFixaWm.get(codigoItem) || 0) ||
      obterMetaPadraoPorNomenclatura(item.equipe, wm.equipe);
    const producaoWm = Number(wm.prodDia || 0);
    const percentualWm = metaWm > 0 ? (producaoWm / metaWm) * 100 : 0;
    const metaReferenciaLote = Number(item.metaDia || 0) || metaWm;
    const prodLoteNaEscalaMeta = normalizarProducaoLoteParaMeta(item.prodDia);
    const percentualLote = metaReferenciaLote > 0
      ? (prodLoteNaEscalaMeta / metaReferenciaLote) * 100
      : 0;

    return {
      ...item,
      data: formatarSequenciaDatasAndon(item.datas),
      diasTrabalhados: contarDiasTrabalhadosAndon(item.datas),
      _temWm: Boolean(wm.codigo),
      metaWm,
      producaoWm,
      percentualWm,
      faixaWm: wm.faixaDia || classificarFaixa(percentualWm),
      metaDia: metaReferenciaLote,
      percentualLote,
      faixaLote: classificarFaixa(percentualLote),
      inicioJornada: wm.inicioJornada || item.inicioJornada || '-',
      inicioRefeicao: wm.inicioRefeicao || item.inicioRefeicao || '-',
      terminoRefeicao: wm.terminoRefeicao || item.terminoRefeicao || '-',
      primeiroAtendimento: wm.primeiroAtendimento || item.primeiroAtendimento || '-',
      ultimoAtendimento: wm.ultimoAtendimento || item.ultimoAtendimento || '-',
      fimJornada: wm.fimJornada || item.fimJornada || '-',
      jornadaProdutiva: wm.jornadaProdutiva || item.jornadaProdutiva || '-',
      comparativo: item.comparativo || (wm.codigo ? 'WM E LOTE' : 'SOMENTE LOTE')
    };
  }).filter(itemEquipeDeveAparecerModal).map((item) => {
    if (agruparPorData || !filtroPeriodoMultiDiaAtivo() || Number(item.diasTrabalhados || 0) <= 1) {
      return item;
    }

    const codigo = String(item.codigo || '').trim();
    const datas = new Set((item.datas || []).map((data) => normalizarDataIso(data)).filter(Boolean));
    if (!codigo || !datas.size) return item;

    const rowsEquipe = rows.filter((row) => {
      const codigoRow = obterCodigoEquipeLote(row);
      const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
      return codigoRow === codigo && datas.has(dataIso);
    });
    const reportRowsEquipe = reportRowsModal.filter((row) => {
      const codigoRow = String(obterCodigoEquipeLinha(row) || '').trim();
      const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
      return codigoRow === codigo && datas.has(dataIso);
    });
    const linhasDias = montarLinhasModalEquipesLoteProd(rowsEquipe, reportRowsEquipe, { agruparPorData: true });
    if (!linhasDias.length) return item;

    const metaWmMedia = mediaNumericaAndon(linhasDias.map((row) => Number(row.metaWm || 0)).filter((valor) => Number.isFinite(valor) && valor > 0));
    const prodWmMedia = mediaNumericaAndon(linhasDias.map((row) => Number(row.producaoWm || 0)).filter((valor) => Number.isFinite(valor)));
    const metaLoteMedia = mediaNumericaAndon(linhasDias.map((row) => Number(row.metaDia || 0)).filter((valor) => Number.isFinite(valor) && valor > 0));
    const prodLoteMedia = mediaNumericaAndon(linhasDias.map((row) => Number(row.prodDia || 0)).filter((valor) => Number.isFinite(valor)));
    const percentualWm = Number.isFinite(metaWmMedia) && metaWmMedia > 0 && Number.isFinite(prodWmMedia)
      ? (prodWmMedia / metaWmMedia) * 100
      : 0;
    const percentualLote = Number.isFinite(metaLoteMedia) && metaLoteMedia > 0 && Number.isFinite(prodLoteMedia)
      ? (normalizarProducaoLoteParaMeta(prodLoteMedia) / metaLoteMedia) * 100
      : 0;

    return {
      ...item,
      metaWm: Number.isFinite(metaWmMedia) ? metaWmMedia : 0,
      producaoWm: Number.isFinite(prodWmMedia) ? prodWmMedia : 0,
      percentualWm,
      faixaWm: classificarFaixa(percentualWm),
      metaDia: Number.isFinite(metaLoteMedia) ? metaLoteMedia : 0,
      prodDia: Number.isFinite(prodLoteMedia) ? prodLoteMedia : 0,
      percentualLote,
      faixaLote: classificarFaixa(percentualLote),
      inicioJornada: formatarMediaHoraModalEquipes(linhasDias, 'inicioJornada'),
      inicioRefeicao: formatarMediaHoraModalEquipes(linhasDias, 'inicioRefeicao'),
      terminoRefeicao: formatarMediaHoraModalEquipes(linhasDias, 'terminoRefeicao'),
      primeiroAtendimento: formatarMediaHoraModalEquipes(linhasDias, 'primeiroAtendimento'),
      ultimoAtendimento: formatarMediaHoraModalEquipes(linhasDias, 'ultimoAtendimento'),
      fimJornada: formatarMediaHoraModalEquipes(linhasDias, 'fimJornada'),
      jornadaProdutiva: formatarMediaHoraModalEquipes(linhasDias, 'jornadaProdutiva')
    };
  }).filter(itemEquipeDeveAparecerModal).sort((a, b) => {
    const dataA = normalizarDataIso(a.datas && a.datas[0]);
    const dataB = normalizarDataIso(b.datas && b.datas[0]);
    if (agruparPorData && dataA !== dataB) return dataA.localeCompare(dataB);
    return String(a.equipe || '').localeCompare(String(b.equipe || ''), 'pt-BR', { sensitivity: 'base' });
  });
}

function abrirModalEquipesDLoteProd(options = {}) {
  if (!equipesModal || !equipesModalBody) return;
  aplicarModalTelaCheia(true);

  const somenteD = options.somenteD !== false;
  const agruparPorData = Boolean(options.agruparPorData);
  const habilitarDetalheDias = options.habilitarDetalheDias !== false && !agruparPorData;
  const codigosUoAtual = obterCodigosEquipesUoAtual();
  const reportRowsModal = options.reportRows || filtrarReportRowsAndon();
  const rowsBase = Array.isArray(options.rows) ? options.rows : filtrarLoteProdEquipesRowsAndon();
  const rowsLoteTodasFiltradas = rowsBase.filter((row) => {
    if (options.codigos && options.codigos.size) return options.codigos.has(obterCodigoEquipeLote(row));
    if (!codigosUoAtual) return true;
    return codigosUoAtual.has(obterCodigoEquipeLote(row));
  });
  const codigosLoteDRegra = obterEquipesDBaseLoteProd(rowsLoteTodasFiltradas).equipesD;
  const rowsLoteFiltradas = somenteD
    ? rowsLoteTodasFiltradas.filter((row) => codigosLoteDRegra.has(obterCodigoEquipeLote(row)))
    : rowsLoteTodasFiltradas;

  const lista = montarLinhasModalEquipesLoteProd(rowsLoteFiltradas, reportRowsModal, { agruparPorData });

  renderCabecalhoModalEquipesDLoteProd();
  equipesModal.classList.toggle('andon-modal-detalhe-datas', agruparPorData);

  if (equipesModalTitle) equipesModalTitle.textContent = options.title || (somenteD ? 'Equipes D Lote Prod.' : 'Total Equipes Lote Prod.');

  const totalDLoteNoComparativo = lista.length;
  if (equipesModalMeta) {
    equipesModalMeta.textContent = options.meta && !somenteD ? options.meta : (somenteD
      ? `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | D Lote: ${formatInt(totalDLoteNoComparativo)}`
      : `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes: ${formatInt(totalDLoteNoComparativo)}`);
  }

  modalDetalheEquipesDias = new Map();
  configurarBotaoVoltarModalEquipes(options.voltarContexto || null);
  if (habilitarDetalheDias) {
    lista.forEach((item, index) => {
      const detalheId = `lote-dias-${Date.now()}-${index}`;
      item.detalheDiasId = detalheId;
      modalDetalheEquipesDias.set(detalheId, {
        tipoDetalhe: 'lote-prod',
        item,
        rows: rowsLoteFiltradas,
        reportRows: reportRowsModal,
        somenteD,
        title: equipesModalTitle?.textContent || '',
        meta: equipesModalMeta?.textContent || '',
        origemOptions: {
          ...options,
          rows: rowsLoteFiltradas,
          reportRows: reportRowsModal,
          somenteD,
          agruparPorData: false,
          habilitarDetalheDias: true
        }
      });
    });
  }

  renderizarModalBodyEmLotes(
    lista,
    (item) => {
      const codigo = item.codigo;
      return `
        <tr>
          <td class="andon-modal-datas" title="${item.data || '-'}">${item.data || '-'}</td>
          <td class="${item.detalheDiasId && Number(item.diasTrabalhados || 0) > 0 ? 'andon-dias-trab-cell' : ''}" data-dias-id="${item.detalheDiasId || ''}">
            ${modalLoteEstado.habilitarDetalheDias && item.detalheDiasId && Number(item.diasTrabalhados || 0) > 0
              ? `<button class="andon-dias-trab-btn" type="button" data-dias-id="${item.detalheDiasId}">${formatInt(item.diasTrabalhados || 0)}</button>`
              : formatInt(item.diasTrabalhados || 0)}
          </td>
          <td>${item.supervisor || '-'}</td>
          <td>${item.equipe || '-'}</td>
          <td>${formatNumber3(item.metaWm)}</td>
          <td>${formatNumber3(item.producaoWm)}</td>
          <td class="andon-faixa faixa-${item.faixaWm || '-'}">${item.faixaWm || '-'}</td>
          <td>${formatPercent(item.percentualWm)}</td>
          <td>${formatNumber3Scale100(item.prodDia)}</td>
          <td class="andon-faixa faixa-${item.faixaLote}">${item.faixaLote}</td>
          <td>${formatPercent(item.percentualLote)}</td>
          <td>${item.inicioJornada || '-'}</td>
          <td>${item.inicioRefeicao || '-'}</td>
          <td>${item.terminoRefeicao || '-'}</td>
          <td>${item.primeiroAtendimento || '-'}</td>
          <td>${item.ultimoAtendimento || '-'}</td>
          <td>${item.fimJornada || '-'}</td>
          <td>${item.jornadaProdutiva || '-'}</td>
          <td>${item.comparativo}</td>
        </tr>
      `;
    },
    `<tr><td colspan="19" class="andon-modal-empty">Nenhuma equipe${somenteD ? ' D' : ''} encontrada no lote produtivo.</td></tr>`
  );
  renderizarRodapeModalLoteProd(lista);
  restaurarFiltrosModalQuandoPronto(options.modalFiltros || null);

  equipesModal.classList.remove('hidden');
}

function abrirModalLoteProdDetalhes() {
  removerResumoControleServicoModal();
  const tr = document.querySelector('#equipesModal thead tr');
  if (!tr) return;
  tr.innerHTML = `
    <th>Data</th>
    <th>Supervisor</th>
    <th>Cód. Equipe</th>
    <th>Equipe</th>
    <th>Cód. Funcionário</th>
    <th>Funcionário</th>
    <th>Cód. Motivo Falta</th>
    <th>Motivo Falta</th>
    <th>Reincidência</th>
  `;
}

function renderCabecalhoModalJornadaOcorrencia(tipo = '') {
  removerResumoControleServicoModal();
  const tr = document.querySelector('#equipesModal thead tr');
  if (!tr) return;
  const mostrarHoraEntrada = tipo === 'saida-antecipada';
  tr.innerHTML = `
    <th>Data</th>
    <th>Cód. Equipe</th>
    <th>Equipe</th>
    <th>Cód. Funcionário</th>
    <th>Funcionário</th>
    <th>Jornada</th>
    ${mostrarHoraEntrada ? '<th>Hora de Entrada</th>' : ''}
    <th>Previsto</th>
    <th>Registrado</th>
    <th>Diferença</th>
  `;
}

function renderCabecalhoModalGenerico(colunas = []) {
  removerResumoControleServicoModal();
  removerAnaliseJustificadasModal();
  configurarBotaoAnaliseJustificadas(false);
  const tr = document.querySelector('#equipesModal thead tr');
  if (!tr) return;
  tr.innerHTML = colunas.map((coluna, index) => `
    <th>
      <button type="button" class="andon-modal-sort" data-col="${index}">
        <span>${coluna.label}</span>
        <span class="andon-modal-sort-icon">↕</span>
      </button>
      <button type="button" class="andon-modal-filter-btn" data-col="${index}" title="Filtrar coluna">▾</button>
    </th>
  `).join('');
}

function normalizarTextoFiltroModal(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .trim();
}

function escaparHtmlModal(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function obterLinhasDadosModal() {
  return Array.from(equipesModalBody?.querySelectorAll('tr') || [])
    .filter((tr) => !tr.querySelector('.andon-modal-empty'));
}

function obterValorCelulaModal(row, coluna) {
  try {
    return String(coluna.value(row) ?? '');
  } catch (error) {
    console.error('Erro ao renderizar coluna do modal:', error);
    return '-';
  }
}

function renderizarLinhaModal(row, columns) {
  return `<tr>${columns.map((coluna) => {
    const classe = coluna.className ? ` class="${coluna.className}"` : '';
    const attrs = typeof coluna.attrs === 'function' ? ` ${coluna.attrs(row)}` : '';
    const valor = typeof coluna.render === 'function' ? coluna.render(row) : obterValorCelulaModal(row, coluna);
    return `<td${classe}${attrs}>${valor}</td>`;
  }).join('')}</tr>`;
}

function obterRowsFiltradasModal() {
  if (!modalTabelaEstado) return [];
  const { rows, columns } = modalTabelaEstado;
  return rows.filter((row) => columns.every((coluna, index) => {
    const filtro = modalFiltrosExcelEstado.filtros[index];
    if (!filtro || !filtro.length) return true;
    return filtro.includes(normalizarTextoFiltroModal(obterValorCelulaModal(row, coluna)));
  }));
}

function atualizarPaginacaoModal(totalRows) {
  document.getElementById('andonModalPagination')?.remove();
  if (!modalTabelaEstado || totalRows <= modalTabelaEstado.pageSize) return;
  const tabelaWrap = equipesModal?.querySelector('.andon-modal-table-wrap');
  if (!tabelaWrap) return;
  const totalPaginas = Math.max(1, Math.ceil(totalRows / modalTabelaEstado.pageSize));
  const pagina = Math.min(modalTabelaEstado.page, totalPaginas);
  tabelaWrap.insertAdjacentHTML('afterend', `
    <div class="andon-modal-pagination" id="andonModalPagination">
      <button type="button" data-modal-page="prev"${pagina <= 1 ? ' disabled' : ''}>Anterior</button>
      <span>${formatInt(pagina)} / ${formatInt(totalPaginas)} · ${formatInt(totalRows)} registros</span>
      <button type="button" data-modal-page="next"${pagina >= totalPaginas ? ' disabled' : ''}>Próxima</button>
    </div>
  `);
  document.querySelectorAll('#andonModalPagination [data-modal-page]').forEach((btn) => {
    btn.addEventListener('click', () => {
      modalTabelaEstado.page += btn.dataset.modalPage === 'next' ? 1 : -1;
      renderizarPaginaModalEstado();
    });
  });
}

function renderizarPaginaModalEstado() {
  if (!modalTabelaEstado || !equipesModalBody) return;
  const filtradas = obterRowsFiltradasModal();
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / modalTabelaEstado.pageSize));
  modalTabelaEstado.page = Math.min(Math.max(1, modalTabelaEstado.page), totalPaginas);
  const inicio = (modalTabelaEstado.page - 1) * modalTabelaEstado.pageSize;
  const pageRows = filtradas.slice(inicio, inicio + modalTabelaEstado.pageSize);
  equipesModalBody.innerHTML = pageRows.length
    ? pageRows.map((row) => renderizarLinhaModal(row, modalTabelaEstado.columns)).join('')
    : `<tr><td colspan="${modalTabelaEstado.columns.length || 1}" class="andon-modal-empty">${modalTabelaEstado.empty}</td></tr>`;
  atualizarPaginacaoModal(filtradas.length);
}

function aplicarFiltrosModalAtual() {
  if (modalTabelaEstado) {
    modalTabelaEstado.page = 1;
    renderizarPaginaModalEstado();
    atualizarEstadoBotoesFiltroModal();
    return;
  }
  obterLinhasDadosModal().forEach((tr) => {
    const visivel = Array.from(tr.children).every((td, index) => {
      const filtro = modalFiltrosExcelEstado.filtros[index];
      if (!filtro || !filtro.length) return true;
      const texto = normalizarTextoFiltroModal(tr.children[index]?.textContent || '');
      return filtro.includes(texto);
    });
    tr.classList.toggle('andon-modal-row-hidden', !visivel);
  });
  atualizarEstadoBotoesFiltroModal();
}

function valorOrdenacaoModal(texto) {
  const raw = String(texto || '').trim();
  const numero = Number(raw.replace(/\./g, '').replace(',', '.').replace('%', ''));
  if (Number.isFinite(numero) && /[\d]/.test(raw)) return { tipo: 'numero', valor: numero };
  return { tipo: 'texto', valor: normalizarTextoFiltroModal(raw) };
}

function ordenarModalPorColuna(index) {
  if (!equipesModalBody) return;
  const th = document.querySelector(`#equipesModal .andon-modal-sort[data-col="${index}"]`);
  const direcaoAtual = th?.dataset.direcao === 'asc' ? 'desc' : 'asc';
  document.querySelectorAll('#equipesModal .andon-modal-sort').forEach((btn) => {
    btn.dataset.direcao = '';
    const icon = btn.querySelector('.andon-modal-sort-icon');
    if (icon) icon.textContent = '↕';
  });
  if (th) {
    th.dataset.direcao = direcaoAtual;
    const icon = th.querySelector('.andon-modal-sort-icon');
    if (icon) icon.textContent = direcaoAtual === 'asc' ? '↑' : '↓';
  }

  if (modalTabelaEstado) {
    const coluna = modalTabelaEstado.columns[index];
    modalTabelaEstado.rows.sort((a, b) => {
      const av = valorOrdenacaoModal(obterValorCelulaModal(a, coluna));
      const bv = valorOrdenacaoModal(obterValorCelulaModal(b, coluna));
      const cmp = av.tipo === 'numero' && bv.tipo === 'numero'
        ? av.valor - bv.valor
        : String(av.valor).localeCompare(String(bv.valor), 'pt-BR', { numeric: true, sensitivity: 'base' });
      return direcaoAtual === 'asc' ? cmp : -cmp;
    });
    modalTabelaEstado.page = 1;
    renderizarPaginaModalEstado();
    return;
  }

  const linhas = obterLinhasDadosModal();
  linhas.sort((a, b) => {
    const av = valorOrdenacaoModal(a.children[index]?.textContent || '');
    const bv = valorOrdenacaoModal(b.children[index]?.textContent || '');
    const cmp = av.tipo === 'numero' && bv.tipo === 'numero'
      ? av.valor - bv.valor
      : String(av.valor).localeCompare(String(bv.valor), 'pt-BR', { numeric: true, sensitivity: 'base' });
    return direcaoAtual === 'asc' ? cmp : -cmp;
  });
  linhas.forEach((tr) => equipesModalBody.appendChild(tr));
  aplicarFiltrosModalAtual();
}

function obterAssinaturaCabecalhoModal() {
  return Array.from(document.querySelectorAll('#equipesModal .andon-modal-table thead tr:first-child th'))
    .map((th) => normalizarTextoFiltroModal(th.querySelector('.andon-modal-sort span:first-child')?.textContent || th.textContent || ''))
    .join('|');
}

function obterValoresFiltroColunaModal(index) {
  const valores = new Map();
  if (modalTabelaEstado) {
    const coluna = modalTabelaEstado.columns[index];
    for (const row of modalTabelaEstado.rows) {
      const texto = obterValorCelulaModal(row, coluna).trim() || '-';
      const chave = normalizarTextoFiltroModal(texto);
      if (!valores.has(chave)) valores.set(chave, texto);
    }
  } else {
    obterLinhasDadosModal().forEach((tr) => {
      const texto = String(tr.children[index]?.textContent || '').trim() || '-';
      const chave = normalizarTextoFiltroModal(texto);
      if (!valores.has(chave)) valores.set(chave, texto);
    });
  }
  return Array.from(valores.entries())
    .sort((a, b) => String(a[1]).localeCompare(String(b[1]), 'pt-BR', { numeric: true, sensitivity: 'base' }));
}

function renderizarOpcoesFiltroMenuModal(menu, termo = '') {
  const lista = menu.querySelector('.andon-modal-filter-options');
  if (!lista) return;
  const busca = normalizarTextoFiltroModal(termo);
  const valores = JSON.parse(menu.dataset.valores || '[]');
  const filtroAtual = modalFiltrosExcelEstado.filtros[Number(menu.dataset.col || 0)] || [];
  const selecionados = new Set(filtroAtual.length ? filtroAtual : valores.map(([chave]) => chave));
  const filtrados = valores.filter(([chave, texto]) => !busca || chave.includes(busca) || normalizarTextoFiltroModal(texto).includes(busca));
  lista.innerHTML = filtrados.length
    ? filtrados.map(([chave, texto]) => `
        <label class="andon-modal-filter-option">
          <input type="checkbox" value="${escaparHtmlModal(chave)}" ${selecionados.has(chave) ? 'checked' : ''}>
          <span>${escaparHtmlModal(texto)}</span>
        </label>
      `).join('')
    : '<div class="andon-modal-filter-empty">Nenhum valor encontrado</div>';
}

function fecharMenusFiltroModal() {
  document.querySelectorAll('#equipesModal .andon-modal-filter-menu').forEach((menu) => {
    menu.classList.add('hidden');
  });
}

function posicionarMenuFiltroModal(menu, botao) {
  if (!menu || !botao) return;
  const rect = botao.getBoundingClientRect();
  const margem = 12;
  const largura = Math.min(290, window.innerWidth - (margem * 2));
  const left = Math.min(
    Math.max(margem, rect.right - largura),
    window.innerWidth - largura - margem
  );
  const top = Math.min(rect.bottom + 8, window.innerHeight - 120);
  menu.style.width = `${largura}px`;
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
}

function atualizarEstadoBotoesFiltroModal() {
  document.querySelectorAll('#equipesModal .andon-modal-filter-btn').forEach((btn) => {
    const index = Number(btn.dataset.col || 0);
    btn.classList.toggle('ativo', Boolean(modalFiltrosExcelEstado.filtros[index]?.length));
  });
}

function aplicarFiltroMenuModal(menu) {
  const index = Number(menu.dataset.col || 0);
  const valores = JSON.parse(menu.dataset.valores || '[]').map(([chave]) => chave);
  const marcados = Array.from(menu.querySelectorAll('.andon-modal-filter-option input:checked'))
    .map((input) => input.value);
  if (!marcados.length || marcados.length === valores.length) {
    delete modalFiltrosExcelEstado.filtros[index];
  } else {
    modalFiltrosExcelEstado.filtros[index] = marcados;
  }
  fecharMenusFiltroModal();
  aplicarFiltrosModalAtual();
}

function capturarFiltrosModalAtual() {
  return {
    assinatura: obterAssinaturaCabecalhoModal(),
    filtros: JSON.parse(JSON.stringify(modalFiltrosExcelEstado.filtros || {}))
  };
}

function restaurarFiltrosModalQuandoPronto(estado) {
  if (!estado || !estado.filtros) return;
  modalFiltrosExcelRestaurar = estado;
  setTimeout(ativarFiltrosOrdenacaoModal, 0);
}

function prepararEstadoFiltroModal() {
  const assinatura = obterAssinaturaCabecalhoModal();
  if (modalFiltrosExcelRestaurar) {
    modalFiltrosExcelEstado = {
      assinatura,
      filtros: JSON.parse(JSON.stringify(modalFiltrosExcelRestaurar.filtros || {}))
    };
    modalFiltrosExcelRestaurar = null;
    return;
  }
  if (modalFiltrosExcelEstado.assinatura !== assinatura) {
    modalFiltrosExcelEstado = { assinatura, filtros: {} };
  }
}

function preencherMenusFiltroModal() {
  document.querySelectorAll('#equipesModal .andon-modal-filter-menu').forEach((menu) => {
    const index = Number(menu.dataset.col || 0);
    const valores = obterValoresFiltroColunaModal(index);
    menu.dataset.valores = JSON.stringify(valores);
    renderizarOpcoesFiltroMenuModal(menu, menu.querySelector('.andon-modal-filter-search')?.value || '');
  });
  atualizarEstadoBotoesFiltroModal();
}

function renderizarModalTabelaPaginada(rows = [], columns = [], empty = 'Nenhum registro encontrado.') {
  modalTabelaEstado = {
    rows: Array.isArray(rows) ? rows.slice() : Array.from(rows || []),
    columns,
    empty,
    page: 1,
    pageSize: MODAL_PAGE_SIZE,
    filtros: columns.map(() => '')
  };
  renderizarPaginaModalEstado();
  ativarFiltrosOrdenacaoModal();
}

function ativarFiltrosOrdenacaoModal() {
  const ths = Array.from(document.querySelectorAll('#equipesModal .andon-modal-table thead tr:first-child th'));
  prepararEstadoFiltroModal();
  ths.forEach((th, index) => {
    if (th.querySelector('.andon-modal-filter-btn')) return;
    const label = th.textContent.trim() || `Coluna ${index + 1}`;
    th.innerHTML = `
      <button type="button" class="andon-modal-sort" data-col="${index}">
        <span>${label}</span>
        <span class="andon-modal-sort-icon">↕</span>
      </button>
      <button type="button" class="andon-modal-filter-btn" data-col="${index}" title="Filtrar coluna">▾</button>
    `;
  });
  document.querySelectorAll('#equipesModal .andon-modal-table thead tr:first-child th').forEach((th, index) => {
    if (th.querySelector('.andon-modal-filter-menu')) return;
    th.insertAdjacentHTML('beforeend', `
      <div class="andon-modal-filter-menu hidden" data-col="${index}">
        <input type="search" class="andon-modal-filter-search" placeholder="Pesquisar...">
        <div class="andon-modal-filter-tools">
          <button type="button" data-filter-action="all">Todos</button>
          <button type="button" data-filter-action="none">Limpar</button>
        </div>
        <div class="andon-modal-filter-options"></div>
        <div class="andon-modal-filter-actions">
          <button type="button" data-filter-action="cancel">Cancelar</button>
          <button type="button" data-filter-action="apply">Aplicar</button>
        </div>
      </div>
    `);
  });
  preencherMenusFiltroModal();
  document.querySelectorAll('#equipesModal .andon-modal-filter-btn').forEach((btn) => {
    if (btn.dataset.filtroBound === '1') return;
    btn.dataset.filtroBound = '1';
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const menu = btn.closest('th')?.querySelector('.andon-modal-filter-menu');
      if (!menu) return;
      const estavaAberto = !menu.classList.contains('hidden');
      fecharMenusFiltroModal();
      if (!estavaAberto) {
        menu.classList.remove('hidden');
        posicionarMenuFiltroModal(menu, btn);
        menu.querySelector('.andon-modal-filter-search')?.focus();
      }
    });
  });
  document.querySelectorAll('#equipesModal .andon-modal-sort').forEach((btn) => {
    if (btn.dataset.sortBound === '1') return;
    btn.dataset.sortBound = '1';
    btn.addEventListener('click', () => ordenarModalPorColuna(Number(btn.dataset.col || 0)));
  });
  document.querySelectorAll('#equipesModal .andon-modal-filter-menu').forEach((menu) => {
    if (menu.dataset.menuBound === '1') return;
    menu.dataset.menuBound = '1';
    menu.addEventListener('click', (event) => event.stopPropagation());
    menu.querySelector('.andon-modal-filter-search')?.addEventListener('input', (event) => {
      renderizarOpcoesFiltroMenuModal(menu, event.target.value || '');
    });
    menu.querySelector('[data-filter-action="all"]')?.addEventListener('click', () => {
      menu.querySelectorAll('.andon-modal-filter-option input').forEach((input) => { input.checked = true; });
    });
    menu.querySelector('[data-filter-action="none"]')?.addEventListener('click', () => {
      menu.querySelectorAll('.andon-modal-filter-option input').forEach((input) => { input.checked = false; });
    });
    menu.querySelector('[data-filter-action="cancel"]')?.addEventListener('click', fecharMenusFiltroModal);
    menu.querySelector('[data-filter-action="apply"]')?.addEventListener('click', () => aplicarFiltroMenuModal(menu));
  });
  aplicarFiltrosModalAtual();
}

if (equipesModalBody) {
  let modalFiltroTimer = null;
  new MutationObserver(() => {
    if (modalTabelaEstado) return;
    clearTimeout(modalFiltroTimer);
    modalFiltroTimer = setTimeout(ativarFiltrosOrdenacaoModal, 60);
  }).observe(equipesModalBody, { childList: true });
}

function aplicarModalTelaCheia(ativo = false) {
  if (equipesModal) equipesModal.classList.toggle('andon-modal-fullscreen', Boolean(ativo));
}

function obterBotaoVoltarModalEquipes() {
  if (!equipesModal || !equipesModalClose) return null;
  let botao = document.getElementById('equipesModalBack');
  if (!botao) {
    botao = document.createElement('button');
    botao.type = 'button';
    botao.id = 'equipesModalBack';
    botao.className = 'andon-modal-back hidden';
    botao.textContent = 'Voltar';
    equipesModalClose.insertAdjacentElement('beforebegin', botao);
  }
  return botao;
}

function obterBotaoExportarImagemModalEquipes() {
  if (!equipesModal || !equipesModalClose) return null;
  let botao = document.getElementById('equipesModalExportImage');
  if (!botao) {
    botao = document.createElement('button');
    botao.type = 'button';
    botao.id = 'equipesModalExportImage';
    botao.className = 'andon-modal-action';
    botao.textContent = 'Exportar imagem';
    equipesModalClose.insertAdjacentElement('beforebegin', botao);
  }
  return botao;
}

function obterBotaoAnaliseJustificadasModal() {
  if (!equipesModal || !equipesModalClose) return null;
  let botao = document.getElementById('equipesModalAnaliseJustificadas');
  if (!botao) {
    botao = document.createElement('button');
    botao.type = 'button';
    botao.id = 'equipesModalAnaliseJustificadas';
    botao.className = 'andon-modal-action hidden';
    botao.textContent = 'Análise';
    equipesModalClose.insertAdjacentElement('beforebegin', botao);
  }
  return botao;
}

function configurarBotaoAnaliseJustificadas(visivel = false, modoAnalise = false) {
  const botao = obterBotaoAnaliseJustificadasModal();
  if (!botao) return;
  botao.classList.toggle('hidden', !visivel);
  botao.textContent = modoAnalise ? 'Tabela detalhada' : 'Análise';
}

function configurarBotaoVoltarModalEquipes(contexto = null) {
  modalEquipesVoltarContexto = contexto;
  const botao = obterBotaoVoltarModalEquipes();
  if (!botao) return;
  botao.classList.toggle('hidden', !contexto);
}

function voltarModalEquipesAnterior() {
  if (!modalEquipesVoltarContexto) return;
  const contexto = modalEquipesVoltarContexto;
  configurarBotaoVoltarModalEquipes(null);
  if (contexto && contexto.tipoContexto === 'controle-servico') {
    abrirModalControleServicoModelo(contexto.tipo || 'todos', contexto.title || 'Servicos', contexto.options || {});
    return;
  }
  if (contexto && contexto.tipoContexto === 'lote-prod') {
    abrirModalEquipesDLoteProd(contexto.options || {});
    return;
  }
  if (contexto && contexto.tipoContexto === 'equipes-acordadas') {
    abrirModalEquipesAcordadasDetalhado();
    return;
  }
  if (contexto && contexto.tipoContexto === 'justificadas-analise') {
    renderizarAnaliseJustificadasModal(contexto.grupoAtivo || '', contexto.descricaoAtiva || '');
    return;
  }
  if (contexto && contexto.tipoContexto === 'performance-lista') {
    configurarBotaoVoltarModalEquipes(null);
    if (equipesModalTitle) equipesModalTitle.textContent = modalPerformanceEstado.contexto?.title || 'Performance';
    if (equipesModalMeta) equipesModalMeta.textContent = modalPerformanceEstado.contexto?.meta || `Registros: ${formatInt(modalPerformanceEstado.lista.length)}`;
    renderizarListaPerformanceModal();
    return;
  }
  if (contexto && contexto.tipoContexto === 'lote-lista') {
    configurarBotaoVoltarModalEquipes(null);
    renderizarListaLoteModal();
    return;
  }
  abrirModalEquipesAndonContexto(contexto);
}

document.addEventListener('click', fecharMenusFiltroModal);

function aplicarEstilosInlineParaExportacao(origem, destino) {
  if (!origem || !destino || origem.nodeType !== 1 || destino.nodeType !== 1) return;
  const estilo = window.getComputedStyle(origem);
  destino.style.cssText = Array.from(estilo)
    .map((prop) => `${prop}:${estilo.getPropertyValue(prop)};`)
    .join('');

  Array.from(origem.children).forEach((filho, index) => {
    aplicarEstilosInlineParaExportacao(filho, destino.children[index]);
  });
}

function prepararCloneModalParaImagem(dialogClone) {
  dialogClone.querySelectorAll('.andon-modal-close, .andon-modal-back, .andon-modal-action').forEach((el) => el.remove());
  dialogClone.querySelectorAll('.andon-modal-table-wrap, .andon-modal-body').forEach((el) => {
    el.style.overflow = 'visible';
    el.style.height = 'auto';
    el.style.maxHeight = 'none';
  });
  dialogClone.style.width = `${Math.max(dialogClone.scrollWidth, dialogClone.offsetWidth)}px`;
  dialogClone.style.height = 'auto';
  dialogClone.style.maxHeight = 'none';
  dialogClone.style.overflow = 'visible';
}

function nomeArquivoImagemModal() {
  const titulo = String(equipesModalTitle?.textContent || 'modal').trim() || 'modal';
  const limpo = titulo
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9_-]+/gi, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80) || 'modal';
  const agora = new Date();
  const stamp = [
    agora.getFullYear(),
    String(agora.getMonth() + 1).padStart(2, '0'),
    String(agora.getDate()).padStart(2, '0'),
    String(agora.getHours()).padStart(2, '0'),
    String(agora.getMinutes()).padStart(2, '0')
  ].join('');
  return `${limpo}_${stamp}.png`;
}

async function exportarImagemModalEquipes() {
  const botao = obterBotaoExportarImagemModalEquipes();
  const dialog = equipesModal?.querySelector('.andon-modal-dialog');
  if (!dialog || !botao) return;

  const textoOriginal = botao.textContent;
  botao.disabled = true;
  botao.textContent = 'Exportando...';

  let areaExportacao = null;
  try {
    await garantirHtml2Canvas();

    const clone = dialog.cloneNode(true);
    areaExportacao = document.createElement('div');
    areaExportacao.style.position = 'fixed';
    areaExportacao.style.left = '-100000px';
    areaExportacao.style.top = '0';
    areaExportacao.style.background = '#ffffff';
    areaExportacao.style.overflow = 'visible';
    areaExportacao.appendChild(clone);
    document.body.appendChild(areaExportacao);

    aplicarEstilosInlineParaExportacao(dialog, clone);
    prepararCloneModalParaImagem(clone);

    const canvas = await html2canvas(clone, {
      backgroundColor: '#ffffff',
      scale: Math.min(window.devicePixelRatio || 1, 2),
      useCORS: true,
      allowTaint: true,
      logging: false
    });

    areaExportacao.remove();
    areaExportacao = null;

    const pngUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = nomeArquivoImagemModal();
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Erro ao exportar imagem do modal:', error);
    alert('Não foi possível exportar a imagem deste modal.');
  } finally {
    if (areaExportacao && areaExportacao.parentNode) {
      areaExportacao.remove();
    }
    botao.disabled = false;
    botao.textContent = textoOriginal;
  }
}

function renderizarModalBodyEmLotes(rows = [], renderRow, emptyHtml = '', chunkSize = 500) {
  if (!equipesModalBody) return;
  const lista = Array.isArray(rows) ? rows : Array.from(rows || []);
  const token = `${Date.now()}-${Math.random()}`;
  equipesModalBody.dataset.renderToken = token;

  if (!lista.length) {
    equipesModalBody.innerHTML = emptyHtml;
    setTimeout(ativarFiltrosOrdenacaoModal, 0);
    return;
  }

  if (lista.length <= chunkSize) {
    equipesModalBody.innerHTML = lista.map(renderRow).join('');
    setTimeout(ativarFiltrosOrdenacaoModal, 0);
    return;
  }

  equipesModalBody.innerHTML = '';
  let index = 0;

  const renderChunk = () => {
    if (equipesModalBody.dataset.renderToken !== token) return;
    const fim = Math.min(index + chunkSize, lista.length);
    equipesModalBody.insertAdjacentHTML('beforeend', lista.slice(index, fim).map(renderRow).join(''));
    index = fim;
    if (index < lista.length) requestAnimationFrame(renderChunk);
  };

  renderChunk();
  setTimeout(ativarFiltrosOrdenacaoModal, 0);
}

function removerRodapeModalEquipes() {
  equipesModal?.querySelector('.andon-modal-table tfoot')?.remove();
}

function removerPainelPerformanceModal() {
  document.getElementById('andonPerformanceModalPanel')?.remove();
  document.getElementById('andonLoteModalPanel')?.remove();
  equipesModal?.classList.remove('andon-modal-performance');
  equipesModal?.classList.remove('andon-modal-lote');
}

function formatarMediaHoraModalEquipes(rows = [], campo = '') {
  return formatHoraMedia(mediaNumericaAndon(
    rows.map((row) => horaParaMinutos(row[campo])).filter((valor) => Number.isFinite(valor))
  )).replace('--', '-');
}

function obterMetaRodapeModalEquipes(rows = []) {
  const metas = rows
    .map((row) => Number(row.metaDia || 0))
    .filter((valor) => Number.isFinite(valor) && valor > 0);
  if (!metas.length) return '-';
  const unicas = new Set(metas.map((valor) => formatNumber3(valor)));
  return unicas.size === 1 ? Array.from(unicas)[0] : formatNumber3(mediaNumericaAndon(metas));
}

function obterTextoAgrupadoRodapeModalEquipes(rows = [], campo = '') {
  const valores = rows
    .map((row) => String(row[campo] || '').trim())
    .filter(Boolean);
  if (!valores.length) return '-';
  const unicos = new Map();
  valores.forEach((valor) => {
    const chave = normalizarTextoFiltroModal(valor);
    if (!unicos.has(chave)) unicos.set(chave, valor);
  });
  return unicos.size === 1 ? Array.from(unicos.values())[0] : 'TODOS';
}

function obterResumoRodapeModalEquipes(rows = []) {
  const datas = rows
    .flatMap((row) => Array.isArray(row.datas) ? row.datas : [])
    .map((data) => normalizarDataIso(data))
    .filter(Boolean)
    .sort();
  const primeiraData = datas.length ? formatarDataBrAndon(datas[0]) : '-';
  const ultimaData = datas.length ? formatarDataBrAndon(datas[datas.length - 1]) : '-';
  const diasTrabalhados = rows.reduce((acc, row) => acc + Number(row.diasTrabalhados || 0), 0);
  const producaoMedia = mediaNumericaAndon(rows.map((row) => Number(row.prodDia || 0)).filter((valor) => Number.isFinite(valor)));
  const metaMedia = mediaNumericaAndon(rows.map((row) => Number(row.metaDia || 0)).filter((valor) => Number.isFinite(valor) && valor > 0));
  const percProdDia = Number.isFinite(metaMedia) && metaMedia > 0 && Number.isFinite(producaoMedia)
    ? (producaoMedia / metaMedia) * 100
    : Number.NaN;
  const faixaDia = Number.isFinite(percProdDia) ? classificarFaixa(percProdDia) : '-';

  return {
    datas: primeiraData === ultimaData ? primeiraData : `${primeiraData} a ${ultimaData}`,
    diasTrabalhados,
    supervisor: obterTextoAgrupadoRodapeModalEquipes(rows, 'supervisor'),
    equipe: obterTextoAgrupadoRodapeModalEquipes(rows, 'equipe'),
    meta: obterMetaRodapeModalEquipes(rows),
    producao: Number.isFinite(producaoMedia) ? formatNumber3(producaoMedia) : '-',
    faixaDia,
    percProdDia: Number.isFinite(percProdDia) ? formatPercent(percProdDia) : '-',
    inicioJornada: formatarMediaHoraModalEquipes(rows, 'inicioJornada'),
    inicioRefeicao: formatarMediaHoraModalEquipes(rows, 'inicioRefeicao'),
    terminoRefeicao: formatarMediaHoraModalEquipes(rows, 'terminoRefeicao'),
    primeiroAtendimento: formatarMediaHoraModalEquipes(rows, 'primeiroAtendimento'),
    ultimoAtendimento: formatarMediaHoraModalEquipes(rows, 'ultimoAtendimento'),
    fimJornada: formatarMediaHoraModalEquipes(rows, 'fimJornada'),
    jornadaProdutiva: formatarMediaHoraModalEquipes(rows, 'jornadaProdutiva')
  };
}

function renderizarRodapeModalEquipes(rows = []) {
  removerRodapeModalEquipes();
  if (!equipesModal || !rows.length) return;
  const table = equipesModal.querySelector('.andon-modal-table');
  if (!table) return;
  const resumo = obterResumoRodapeModalEquipes(rows);
  table.insertAdjacentHTML('beforeend', `
    <tfoot class="andon-modal-footer-summary">
      <tr>
        <td>${resumo.datas}</td>
        <td>${formatInt(resumo.diasTrabalhados)}</td>
        <td>${resumo.supervisor}</td>
        <td>${resumo.equipe}</td>
        <td>${resumo.meta}</td>
        <td>${resumo.producao}</td>
        <td class="andon-faixa faixa-${resumo.faixaDia || '-'}">${resumo.faixaDia || '-'}</td>
        <td>${resumo.percProdDia}</td>
        <td>${resumo.inicioJornada}</td>
        <td>${resumo.inicioRefeicao}</td>
        <td>${resumo.terminoRefeicao}</td>
        <td>${resumo.primeiroAtendimento}</td>
        <td>${resumo.ultimoAtendimento}</td>
        <td>${resumo.fimJornada}</td>
        <td>${resumo.jornadaProdutiva}</td>
      </tr>
    </tfoot>
  `);
}

function linhaPerformancePassaBusca(item = {}, busca = '') {
  const termo = normalizarTextoFiltroModal(busca);
  if (!termo) return true;
  return [
    item.data,
    item.supervisor,
    item.codigo,
    item.equipe,
    item.faixaDia,
    item.percProdDia,
    item.inicioJornada,
    item.primeiroAtendimento,
    item.ultimoAtendimento,
    item.fimJornada
  ].some((valor) => normalizarTextoFiltroModal(valor).includes(termo));
}

function filtrarListaPerformanceModal(lista = []) {
  return lista.filter((item) => linhaPerformancePassaBusca(item, modalPerformanceEstado.busca || ''));
}

function obterFaixaPredominantePerformance(lista = []) {
  const mapa = new Map();
  lista.forEach((item) => {
    const faixa = String(item.faixaDia || '-').trim() || '-';
    mapa.set(faixa, (mapa.get(faixa) || 0) + 1);
  });
  return Array.from(mapa.entries())
    .map(([faixa, total]) => ({ faixa, total }))
    .sort((a, b) => b.total - a.total || a.faixa.localeCompare(b.faixa))[0] || { faixa: '-', total: 0 };
}

function obterResumoPerformanceModal(lista = []) {
  const metaMedia = mediaNumericaAndon(lista.map((item) => Number(item.metaDia || 0)).filter((valor) => Number.isFinite(valor) && valor > 0));
  const prodMedia = mediaNumericaAndon(lista.map((item) => Number(item.prodDia || 0)).filter((valor) => Number.isFinite(valor)));
  const equipesD = lista.filter((item) => String(item.faixaDia || '').trim().toUpperCase() === 'D').length;
  const semInicio = lista.filter((item) => !Number.isFinite(horaParaMinutos(item.inicioJornada))).length;
  const faixaTop = obterFaixaPredominantePerformance(lista);
  return {
    total: lista.length,
    equipesD,
    semInicio,
    metaMedia,
    prodMedia,
    faixaTop
  };
}

function obterDiagnosticoPerformanceModal(lista = []) {
  if (!lista.length) return 'Nenhuma equipe encontrada para o filtro atual.';
  const ranking = obterRankingPerformancePorSupervisor(lista);
  const critico = ranking[0];
  const resumo = obterResumoPerformanceModal(lista);
  const partes = [];
  if (critico && critico.equipesD > 0) partes.push(`${critico.equipesD} equipes D concentradas em ${critico.supervisor}`);
  if (resumo.semInicio > 0) partes.push(`${resumo.semInicio} equipes sem inicio de jornada`);
  partes.push(`faixa predominante ${resumo.faixaTop.faixa} em ${formatInt(resumo.faixaTop.total)} equipes`);
  return partes.join(' | ');
}

function renderizarPainelPerformanceModal(lista = []) {
  const tableWrap = equipesModal?.querySelector('.andon-modal-table-wrap');
  if (!tableWrap) return;
  removerPainelPerformanceModal();
  equipesModal?.classList.add('andon-modal-performance');
  const resumo = obterResumoPerformanceModal(lista);
  const diagnostico = obterDiagnosticoPerformanceModal(lista);
  const painel = document.createElement('div');
  painel.id = 'andonPerformanceModalPanel';
  painel.className = 'andon-performance-panel';
  painel.innerHTML = `
    <div class="andon-performance-toolbar">
      <label>
        <span>Busca</span>
        <input type="search" class="andon-performance-search" value="${escaparHtmlModal(modalPerformanceEstado.busca || '')}" placeholder="Equipe, supervisor, faixa, horario...">
      </label>
      <button type="button" class="andon-performance-search-btn">Buscar</button>
      <button type="button" class="andon-performance-ranking-btn">Ranking</button>
      <button type="button" class="andon-performance-reinc-btn">Reincidencia</button>
    </div>
    <div class="andon-performance-summary">
      <div><span>Total de equipes</span><strong>${formatInt(resumo.total)}</strong></div>
      <div><span>Equipes D</span><strong>${formatInt(resumo.equipesD)}</strong></div>
      <div><span>Faixa predominante</span><strong>${escaparHtmlModal(resumo.faixaTop.faixa)} (${formatInt(resumo.faixaTop.total)})</strong></div>
      <div><span>Media meta</span><strong>${Number.isFinite(resumo.metaMedia) ? formatNumber3(resumo.metaMedia) : '-'}</strong></div>
      <div><span>Media producao</span><strong>${Number.isFinite(resumo.prodMedia) ? formatNumber3(resumo.prodMedia) : '-'}</strong></div>
      <div><span>Sem inicio jornada</span><strong>${formatInt(resumo.semInicio)}</strong></div>
    </div>
    <div class="andon-performance-diagnostic">
      <span>Diagnostico automatico</span>
      <strong>${escaparHtmlModal(diagnostico)}</strong>
    </div>
  `;
  tableWrap.insertAdjacentElement('beforebegin', painel);
  painel.querySelector('.andon-performance-search')?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    modalPerformanceEstado.busca = event.target.value || '';
    renderizarListaPerformanceModal();
  });
  painel.querySelector('.andon-performance-search-btn')?.addEventListener('click', () => {
    modalPerformanceEstado.busca = painel.querySelector('.andon-performance-search')?.value || '';
    renderizarListaPerformanceModal();
  });
  painel.querySelector('.andon-performance-ranking-btn')?.addEventListener('click', abrirRankingPerformanceModal);
  painel.querySelector('.andon-performance-reinc-btn')?.addEventListener('click', abrirReincidenciaPerformanceModal);
}

function renderizarLinhaPerformanceModal(item = {}, habilitarDetalheDias = true) {
  return `
    <tr>
      <td class="andon-modal-datas" title="${item.data || '-'}">${item.data || '-'}</td>
      <td class="${habilitarDetalheDias && Number(item.diasTrabalhados || 0) > 0 ? 'andon-dias-trab-cell' : ''}" data-dias-id="${habilitarDetalheDias ? item.detalheDiasId || '' : ''}">${
        habilitarDetalheDias && Number(item.diasTrabalhados || 0) > 0
          ? `<button class="andon-dias-trab-btn" type="button" data-dias-id="${item.detalheDiasId}">${formatInt(item.diasTrabalhados || 0)}</button>`
          : formatInt(item.diasTrabalhados || 0)
      }</td>
      <td>${item.supervisor || '-'}</td>
      <td>${item.equipe}</td>
      <td>${formatNumber3(item.metaDia)}</td>
      <td>${formatNumber3(item.prodDia)}</td>
      <td class="andon-faixa faixa-${item.faixaDia || '-'}">${item.faixaDia || '-'}</td>
      <td>${formatPercent(item.percProdDia || 0)}</td>
      <td>${item.inicioJornada || '-'}</td>
      <td>${item.inicioRefeicao || '-'}</td>
      <td>${item.terminoRefeicao || '-'}</td>
      <td>${item.primeiroAtendimento || '-'}</td>
      <td>${item.ultimoAtendimento || '-'}</td>
      <td>${item.fimJornada || '-'}</td>
      <td>${item.jornadaProdutiva || '-'}</td>
      <td><button type="button" class="andon-performance-hist-btn" data-performance-hist-codigo="${escaparHtmlModal(item.codigo || '')}">Ver</button></td>
    </tr>
  `;
}

function renderizarListaPerformanceModal() {
  const lista = filtrarListaPerformanceModal(modalPerformanceEstado.lista || []);
  renderCabecalhoModalEquipesPadrao({ comHistorico: true });
  renderizarPainelPerformanceModal(lista);
  renderizarModalBodyEmLotes(
    lista,
    (item) => renderizarLinhaPerformanceModal(item, modalPerformanceEstado.contexto?.habilitarDetalheDias !== false),
    '<tr><td colspan="16" class="andon-modal-empty">Nenhuma equipe encontrada para este filtro.</td></tr>'
  );
  renderizarRodapeModalEquipes(lista);
  equipesModal?.querySelector('.andon-modal-table tfoot tr')?.insertAdjacentHTML('beforeend', '<td>-</td>');
}

function obterRankingPerformancePorSupervisor(lista = []) {
  const mapa = new Map();
  lista.forEach((item) => {
    const supervisor = String(item.supervisor || '-').trim() || '-';
    const atual = mapa.get(supervisor) || {
      supervisor,
      total: 0,
      equipesD: 0,
      somaPerc: 0,
      qtdPerc: 0,
      semInicio: 0
    };
    atual.total += 1;
    if (String(item.faixaDia || '').trim().toUpperCase() === 'D') atual.equipesD += 1;
    const perc = Number(item.percProdDia || 0);
    if (Number.isFinite(perc)) {
      atual.somaPerc += perc;
      atual.qtdPerc += 1;
    }
    if (!Number.isFinite(horaParaMinutos(item.inicioJornada))) atual.semInicio += 1;
    mapa.set(supervisor, atual);
  });
  return Array.from(mapa.values())
    .map((item) => ({
      ...item,
      mediaPerc: item.qtdPerc ? item.somaPerc / item.qtdPerc : Number.NaN
    }))
    .sort((a, b) => b.equipesD - a.equipesD || b.total - a.total || a.supervisor.localeCompare(b.supervisor, 'pt-BR', { sensitivity: 'base' }));
}

function abrirRankingPerformanceModal() {
  const lista = filtrarListaPerformanceModal(modalPerformanceEstado.lista || []);
  const ranking = obterRankingPerformancePorSupervisor(lista);
  removerPainelPerformanceModal();
  renderCabecalhoModalGenerico([
    { label: 'Rank' },
    { label: 'Supervisor' },
    { label: 'Total Equipes' },
    { label: 'Equipes D' },
    { label: '% Medio' },
    { label: 'Sem Inicio' }
  ]);
  if (equipesModalTitle) equipesModalTitle.textContent = 'Ranking Performance por Supervisor';
  if (equipesModalMeta) equipesModalMeta.textContent = `Base: ${formatInt(lista.length)} equipes | Ordenado por Equipes D`;
  configurarBotaoVoltarModalEquipes({ tipoContexto: 'performance-lista' });
  renderizarModalBodyEmLotes(
    ranking,
    (item, index) => `
      <tr>
        <td>${formatInt(index + 1)}</td>
        <td>${escaparHtmlModal(item.supervisor || '-')}</td>
        <td>${formatInt(item.total)}</td>
        <td>${formatInt(item.equipesD)}</td>
        <td>${Number.isFinite(item.mediaPerc) ? formatPercent(item.mediaPerc) : '-'}</td>
        <td>${formatInt(item.semInicio)}</td>
      </tr>
    `,
    '<tr><td colspan="6" class="andon-modal-empty">Nenhum ranking encontrado.</td></tr>'
  );
}

function abrirReincidenciaPerformanceModal() {
  const lista = filtrarListaPerformanceModal(modalPerformanceEstado.lista || [])
    .filter((item) => Number(item.diasTrabalhados || 0) >= 2 || String(item.faixaDia || '').toUpperCase() === 'D')
    .sort((a, b) => Number(b.diasTrabalhados || 0) - Number(a.diasTrabalhados || 0) || Number(a.percProdDia || 0) - Number(b.percProdDia || 0));
  removerPainelPerformanceModal();
  renderCabecalhoModalGenerico([
    { label: 'Supervisor' },
    { label: 'Equipe' },
    { label: 'Dias' },
    { label: 'Faixa' },
    { label: '% Prod.' },
    { label: 'Inicio Jornada' },
    { label: 'Hist.' }
  ]);
  if (equipesModalTitle) equipesModalTitle.textContent = 'Reincidencia Performance';
  if (equipesModalMeta) equipesModalMeta.textContent = `Equipes com repeticao ou faixa D: ${formatInt(lista.length)}`;
  configurarBotaoVoltarModalEquipes({ tipoContexto: 'performance-lista' });
  renderizarModalBodyEmLotes(
    lista,
    (item) => `
      <tr>
        <td>${escaparHtmlModal(item.supervisor || '-')}</td>
        <td>${escaparHtmlModal(item.equipe || '-')}</td>
        <td>${formatInt(item.diasTrabalhados || 0)}</td>
        <td class="andon-faixa faixa-${item.faixaDia || '-'}">${item.faixaDia || '-'}</td>
        <td>${formatPercent(item.percProdDia || 0)}</td>
        <td>${item.inicioJornada || '-'}</td>
        <td><button type="button" class="andon-performance-hist-btn" data-performance-hist-codigo="${escaparHtmlModal(item.codigo || '')}">Ver</button></td>
      </tr>
    `,
    '<tr><td colspan="7" class="andon-modal-empty">Nenhuma reincidencia encontrada.</td></tr>'
  );
}

function abrirHistoricoPerformanceEquipe(codigo = '') {
  const codigoTexto = String(codigo || '').trim();
  if (!codigoTexto) return;
  const contexto = modalPerformanceEstado.contexto || {};
  const rowsEquipe = (modalPerformanceEstado.rows || []).filter((row) => String(obterCodigoEquipeLinha(row) || '').trim() === codigoTexto);
  const controleEquipe = Array.isArray(modalPerformanceEstado.controleRows)
    ? modalPerformanceEstado.controleRows.filter((row) => String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '').trim() === codigoTexto)
    : null;
  const historico = montarLinhasModalEquipes(rowsEquipe, 'todas', controleEquipe, {
    agruparPorData: true,
    apenasComInicioJornada: contexto.apenasComInicioJornada
  });
  removerPainelPerformanceModal();
  renderCabecalhoModalEquipesPadrao({ comHistorico: false });
  const equipe = modalPerformanceEstado.lista.find((item) => String(item.codigo || '').trim() === codigoTexto)?.equipe || codigoTexto;
  if (equipesModalTitle) equipesModalTitle.textContent = `Historico Performance - ${equipe}`;
  if (equipesModalMeta) equipesModalMeta.textContent = `Codigo: ${codigoTexto} | Dias: ${formatInt(historico.length)}`;
  configurarBotaoVoltarModalEquipes({ tipoContexto: 'performance-lista' });
  renderizarModalBodyEmLotes(
    historico,
    (item) => `
      <tr>
        <td class="andon-modal-datas" title="${item.data || '-'}">${item.data || '-'}</td>
        <td>${formatInt(item.diasTrabalhados || 0)}</td>
        <td>${item.supervisor || '-'}</td>
        <td>${item.equipe}</td>
        <td>${formatNumber3(item.metaDia)}</td>
        <td>${formatNumber3(item.prodDia)}</td>
        <td class="andon-faixa faixa-${item.faixaDia || '-'}">${item.faixaDia || '-'}</td>
        <td>${formatPercent(item.percProdDia || 0)}</td>
        <td>${item.inicioJornada || '-'}</td>
        <td>${item.inicioRefeicao || '-'}</td>
        <td>${item.terminoRefeicao || '-'}</td>
        <td>${item.primeiroAtendimento || '-'}</td>
        <td>${item.ultimoAtendimento || '-'}</td>
        <td>${item.fimJornada || '-'}</td>
        <td>${item.jornadaProdutiva || '-'}</td>
      </tr>
    `,
    '<tr><td colspan="15" class="andon-modal-empty">Nenhum historico encontrado para esta equipe.</td></tr>'
  );
  renderizarRodapeModalEquipes(historico);
}

function renderizarRodapeModalLoteProd(rows = []) {
  removerRodapeModalEquipes();
  if (!equipesModal || !rows.length) return;
  const table = equipesModal.querySelector('.andon-modal-table');
  if (!table) return;

  const datas = rows
    .flatMap((row) => Array.isArray(row.datas) ? row.datas : [])
    .map((data) => normalizarDataIso(data))
    .filter(Boolean)
    .sort();
  const primeiraData = datas.length ? formatarDataBrAndon(datas[0]) : '-';
  const ultimaData = datas.length ? formatarDataBrAndon(datas[datas.length - 1]) : '-';
  const diasTrabalhados = rows.reduce((acc, row) => acc + Number(row.diasTrabalhados || 0), 0);
  const metaWmMedia = mediaNumericaAndon(rows.map((row) => Number(row.metaWm || 0)).filter((valor) => Number.isFinite(valor) && valor > 0));
  const prodWmMedia = mediaNumericaAndon(rows.map((row) => Number(row.producaoWm || 0)).filter((valor) => Number.isFinite(valor)));
  const percWm = Number.isFinite(metaWmMedia) && metaWmMedia > 0 && Number.isFinite(prodWmMedia)
    ? (prodWmMedia / metaWmMedia) * 100
    : Number.NaN;
  const prodLoteMedia = mediaNumericaAndon(rows.map((row) => Number(row.prodDia || 0)).filter((valor) => Number.isFinite(valor)));
  const metaLoteMedia = mediaNumericaAndon(rows.map((row) => Number(row.metaDia || 0)).filter((valor) => Number.isFinite(valor) && valor > 0));
  const percLote = Number.isFinite(metaLoteMedia) && metaLoteMedia > 0 && Number.isFinite(prodLoteMedia)
    ? (normalizarProducaoLoteParaMeta(prodLoteMedia) / metaLoteMedia) * 100
    : Number.NaN;
  const faixaWm = Number.isFinite(percWm) ? classificarFaixa(percWm) : '-';
  const faixaLote = Number.isFinite(percLote) ? classificarFaixa(percLote) : '-';

  table.insertAdjacentHTML('beforeend', `
    <tfoot class="andon-modal-footer-summary">
      <tr>
        <td>${primeiraData === ultimaData ? primeiraData : `${primeiraData} a ${ultimaData}`}</td>
        <td>${formatInt(diasTrabalhados)}</td>
        <td>${obterTextoAgrupadoRodapeModalEquipes(rows, 'supervisor')}</td>
        <td>${obterTextoAgrupadoRodapeModalEquipes(rows, 'equipe')}</td>
        <td>${Number.isFinite(metaWmMedia) ? formatNumber3(metaWmMedia) : '-'}</td>
        <td>${Number.isFinite(prodWmMedia) ? formatNumber3(prodWmMedia) : '-'}</td>
        <td class="andon-faixa faixa-${faixaWm}">${faixaWm}</td>
        <td>${Number.isFinite(percWm) ? formatPercent(percWm) : '-'}</td>
        <td>${Number.isFinite(prodLoteMedia) ? formatNumber3Scale100(prodLoteMedia) : '-'}</td>
        <td class="andon-faixa faixa-${faixaLote}">${faixaLote}</td>
        <td>${Number.isFinite(percLote) ? formatPercent(percLote) : '-'}</td>
        <td>${formatarMediaHoraModalEquipes(rows, 'inicioJornada')}</td>
        <td>${formatarMediaHoraModalEquipes(rows, 'inicioRefeicao')}</td>
        <td>${formatarMediaHoraModalEquipes(rows, 'terminoRefeicao')}</td>
        <td>${formatarMediaHoraModalEquipes(rows, 'primeiroAtendimento')}</td>
        <td>${formatarMediaHoraModalEquipes(rows, 'ultimoAtendimento')}</td>
        <td>${formatarMediaHoraModalEquipes(rows, 'fimJornada')}</td>
        <td>${formatarMediaHoraModalEquipes(rows, 'jornadaProdutiva')}</td>
        <td>${obterTextoAgrupadoRodapeModalEquipes(rows, 'comparativo')}</td>
      </tr>
    </tfoot>
  `);
}

function abrirModalTabelaGenerica({ title = 'Detalhes', meta = '', columns = [], rows = [], empty = 'Nenhum registro encontrado.' } = {}) {
  if (!equipesModal || !equipesModalBody) return;
  const listaRows = (Array.isArray(rows) ? rows : Array.from(rows || []))
    .filter(itemEquipeDeveAparecerModal);
  aplicarModalTelaCheia(true);
  renderCabecalhoModalGenerico(columns);

  if (equipesModalTitle) equipesModalTitle.textContent = title;
  if (equipesModalMeta) equipesModalMeta.textContent = meta || `Registros: ${formatInt(listaRows.length)}`;

  renderizarModalBodyEmLotes(
    [],
    () => '',
    ''
  );
  renderizarModalTabelaPaginada(listaRows, columns, empty);

  equipesModal.classList.remove('hidden');
}

function removerResumoControleServicoModal() {
  document.getElementById('controleServicoResumoModal')?.remove();
  document.getElementById('andonModalPagination')?.remove();
  removerPainelPerformanceModal();
  removerRodapeModalEquipes();
  equipesModal?.classList.remove('andon-modal-controle-servico');
  equipesModal?.classList.remove('andon-modal-controle-agregado');
  equipesModal?.classList.remove('andon-modal-detalhe-datas');
  modalTabelaEstado = null;
  configurarBotaoVoltarModalEquipes(null);
}

function obterRowsReportPorCodigos(codigos = new Set()) {
  const permitidos = new Set(Array.from(codigos).map((codigo) => String(codigo).trim()).filter(Boolean));
  if (!permitidos.size) return [];
  const mapa = obterMapaReportPorCodigoAndon();
  return Array.from(permitidos).flatMap((codigo) => mapa.get(codigo) || []);
}

function obterReferenciaFinalServico(row) {
  return (
    obterValorPrimeiro(row, ['DATA_TERMINO_REAL', 'ENCERRAMENTO', 'DATA_TERMINO']) ||
    obterValorPrimeiro(row, ['DATA_LOCALIZACAO', 'LOCALIZACAO']) ||
    obterValorPrimeiro(row, ['DATA_ACIONAMENTO', 'ACIONAMENTO', 'DATA ACIONAMENTO']) ||
    ''
  );
}

function calcularResumoControleServicoModal(rows = []) {
  const codigos = new Set(
    rows
      .map((row) => String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '').trim())
      .filter(Boolean)
  );
  const reportRows = obterRowsReportPorCodigos(codigos);

  let realizados = 0;
  let produtivos = 0;
  let improdutivos = 0;
  let usPrev = 0;
  let usExec = 0;
  let primeiroAtendimentoMin = Infinity;
  let ultimoAtendimentoMin = -Infinity;
  let primeiroAtendimento = '-';
  let ultimoAtendimento = '-';

  rows.forEach((row) => {
    const flag = normalizarFlagServico(obterValorPrimeiro(row, ['PRODUTIVO', 'PRODUTIVOS']));
    if (flag === 'SIM' || flag === 'NAO') realizados += 1;
    if (flag === 'SIM') produtivos += 1;
    if (flag === 'NAO') improdutivos += 1;

    usPrev += toNumberSafe(obterValorPrimeiro(row, ['US_PREV', 'US PREV']));
    usExec += toNumberSafe(obterValorPrimeiro(row, ['US_EXEC', 'US EXEC']));

    const acionamentoRaw = obterValorPrimeiro(row, ['DATA_ACIONAMENTO', 'ACIONAMENTO', 'DATA ACIONAMENTO']);
    const acionamentoTxt = obterHoraTexto(acionamentoRaw);
    const acionamentoMin = horaParaMinutos(acionamentoTxt);
    if (Number.isFinite(acionamentoMin) && acionamentoMin < primeiroAtendimentoMin) {
      primeiroAtendimentoMin = acionamentoMin;
      primeiroAtendimento = acionamentoTxt;
    }

    const fimTxt = obterHoraTexto(obterReferenciaFinalServico(row));
    const fimMin = horaParaMinutos(fimTxt);
    if (Number.isFinite(fimMin) && fimMin > ultimoAtendimentoMin) {
      ultimoAtendimentoMin = fimMin;
      ultimoAtendimento = fimTxt;
    }
  });

  const metasPorEquipe = new Map();
  reportRows.forEach((row) => {
    const codigo = String(obterCodigoEquipeLinha(row) || '').trim();
    if (!codigo) return;
    const meta = toNumberSafe(obterValorPrimeiro(row, ['META', 'Meta Prog.', 'Meta']));
    metasPorEquipe.set(codigo, Math.max(Number(metasPorEquipe.get(codigo) || 0), meta));
  });
  const metaDia = Array.from(metasPorEquipe.values()).reduce((acc, meta) => acc + meta, 0);

  return {
    designados: rows.length,
    realizados,
    metaDia,
    usPrev,
    usExec,
    produtivos,
    improdutivos,
    percImpedimento: calcularPercentualImpedimento(rows),
    primeiroAtendimento,
    ultimoAtendimento
  };
}

function inserirResumoControleServicoModal(rows = []) {
  document.getElementById('controleServicoResumoModal')?.remove();
  if (!equipesModal) return;

  const tabelaWrap = equipesModal.querySelector('.andon-modal-table-wrap');
  if (!tabelaWrap) return;

  equipesModal.classList.add('andon-modal-controle-servico');
  const resumo = calcularResumoControleServicoModal(rows);
  const cards = [
    ['SERVICOS DESIGNADOS', formatInt(resumo.designados)],
    ['SERVICOS REALIZADOS', formatInt(resumo.realizados)],
    ['META DO DIA', formatNumber3(resumo.metaDia)],
    ['U.S PREVISTAS', formatNumber3(resumo.usPrev)],
    ['U.S EXECUTADAS', formatNumber3(resumo.usExec)],
    ['PRODUTIVOS', formatInt(resumo.produtivos)],
    ['IMPRODUTIVOS', formatInt(resumo.improdutivos)],
    ['% IMPEDIMENTO', formatPercent(resumo.percImpedimento), resumo.percImpedimento > 0 ? 'alerta' : 'ok'],
    ['1 ATENDIMENTO', resumo.primeiroAtendimento],
    ['ULTIMO ATENDIMENTO', resumo.ultimoAtendimento]
  ];

  tabelaWrap.insertAdjacentHTML('beforebegin', `
    <div class="andon-controle-servico-kpis" id="controleServicoResumoModal">
      ${cards.map(([label, value, status]) => `
        <div class="andon-controle-servico-kpi">
          <div class="andon-controle-servico-kpi-title">${label}</div>
          <div class="andon-controle-servico-kpi-value ${status ? `is-${status}` : ''}">${value}</div>
        </div>
      `).join('')}
    </div>
  `);
}

function obterCodigosEquipesUoAtual() {
  if (!headerSelectedUo && !headerSelectedSupervisor) return null;
  return obterCodigosReportRows(filtrarReportRowsAndon());
}

function itemTemDadosWm(item = {}) {
  const temSinalOperacionalWm = Boolean(
    Number(item.producaoWm || 0) > 0 ||
    (item.faixaWm && item.faixaWm !== '-') ||
    (item.inicioJornada && item.inicioJornada !== '-') ||
    (item.primeiroAtendimento && item.primeiroAtendimento !== '-') ||
    (item.ultimoAtendimento && item.ultimoAtendimento !== '-') ||
    (item.fimJornada && item.fimJornada !== '-') ||
    (item.jornadaProdutiva && item.jornadaProdutiva !== '-')
  );
  if (Object.prototype.hasOwnProperty.call(item, '_temWm')) {
    return Boolean(item._temWm) || temSinalOperacionalWm;
  }
  return Boolean(
    Number(item.metaWm || 0) > 0 ||
    temSinalOperacionalWm
  );
}

function itemPossuiProducaoWmOuLote(item = {}) {
  return Number(item.producaoWm || 0) > 0 || Number(item.prodDia || 0) > 0;
}

function itemEquipeEhMtami(item = {}) {
  return textoContemMtami(item.equipe || item.NOME_EQUIPE || item.Nome || item.NOME || '');
}

function obterDataPrincipalItem(item = {}) {
  return normalizarDataIso((item.datas && item.datas[0]) || item.data || item.DATA || '');
}

function valoresProximos(a, b, tolerancia = 0.001) {
  return Math.abs(Number(a || 0) - Number(b || 0)) <= tolerancia;
}

function aplicarPareamentoMtamiPorProducao(lista = []) {
  const wmPorData = new Map();
  const lotePorDataProd = new Map();

  lista.forEach((item) => {
    if (!itemEquipeEhMtami(item)) return;
    const data = obterDataPrincipalItem(item);
    if (!data) return;

    if (itemTemDadosWm(item) && Number(item.producaoWm || 0) > 0) {
      if (!wmPorData.has(data)) wmPorData.set(data, []);
      wmPorData.get(data).push(item);
      return;
    }

    if (Number(item.prodDia || 0) > 0) {
      const chave = `${data}|${Number(item.prodDia || 0).toFixed(3)}`;
      if (!lotePorDataProd.has(chave)) lotePorDataProd.set(chave, []);
      lotePorDataProd.get(chave).push(item);
    }
  });

  const pares = [];
  let semPar = 0;

  wmPorData.forEach((wms, data) => {
    wms.forEach((wm) => {
      const producaoPar = Number(wm.producaoWm || 0) / 2;
      if (!Number.isFinite(producaoPar) || producaoPar <= 0) return;

      const chave = `${data}|${producaoPar.toFixed(3)}`;
      const candidatos = lotePorDataProd.get(chave) || [];
      if (candidatos.length < 2) return;

      const par = candidatos.splice(0, 2);
      const pairId = `MTAMI|${data}|${String(wm.codigo || '')}|${pares.length + 1}`;
      par.forEach((item) => {
        item._temWm = true;
        item._mtamiPareado = true;
        item._mtamiPairId = pairId;
        item._mtamiWmCodigo = wm.codigo || '';
        item.comparativo = 'WM E LOTE';
        item.producaoWm = producaoPar;
        item.percentualWm = Number(item.metaWm || 0) > 0 ? (producaoPar / Number(item.metaWm || 0)) * 100 : item.percentualWm;
      });
      wm._mtamiPareadoPorLote = true;
      if (Number(wm.prodDia || 0) <= 0) wm._ocultarLinhaPareadaMtami = true;
      pares.push({ pairId, wm, itens: par });
    });
  });

  lotePorDataProd.forEach((restantes) => {
    semPar += restantes.filter((item) => itemEquipeEhMtami(item)).length;
  });

  return { pares: pares.length, semPar };
}

function calcularMetricasComparativoLote(lista = [], codigosDwm = new Set(), codigosLoteDRegra = new Set(), somenteD = false) {
  if (!somenteD) {
    return {
      totalDwm: lista.length,
      totalDLote: lista.length,
      somenteWm: 0,
      somenteLote: 0,
      mtamiSemPar: 0
    };
  }

  const paresMtami = new Set();
  let mtamiSemPar = 0;
  let totalDLote = 0;
  let somenteLote = 0;

  lista.forEach((item) => {
    const codigo = String(item.codigo || '').trim();
    if (!codigosLoteDRegra.has(codigo)) return;

    if (item._mtamiPareado && item._mtamiPairId) {
      if (!paresMtami.has(item._mtamiPairId)) {
        paresMtami.add(item._mtamiPairId);
        totalDLote += 1;
      }
      return;
    }

    totalDLote += 1;
    if (itemEquipeEhMtami(item)) mtamiSemPar += 1;
    if (item.comparativo === 'SOMENTE LOTE') somenteLote += 1;
  });

  return {
    totalDwm: new Set(lista
      .filter((item) => itemPossuiProducaoWmOuLote(item) && (item.comparativo === 'SOMENTE WM' || item.comparativo === 'WM E LOTE'))
      .map((item) => String(item._mtamiWmCodigo || item.codigo || '').trim())
      .filter(Boolean)
    ).size,
    totalDLote,
    somenteWm: lista.filter((item) => item.comparativo === 'SOMENTE WM').length,
    somenteLote,
    mtamiSemPar
  };
}

function montarListaComparativoEquipesDLoteProd(options = {}) {
  const somenteD = options.somenteD !== false;
  const agruparPorData = Boolean(options.agruparPorData);
  const codigosUoAtual = obterCodigosEquipesUoAtual();
  const reportRowsModal = options.reportRows || filtrarReportRowsAndon();
  const codigosDwm = obterEquipesDBaseTotal(reportRowsModal).equipesD;
  const rowsBase = Array.isArray(options.rows)
    ? options.rows
    : filtrarLoteProdEquipesRowsAndon();
  const rowsLoteTodasFiltradas = rowsBase.filter((row) => {
    if (options.codigos && options.codigos.size) return options.codigos.has(obterCodigoEquipeLote(row));
    if (!codigosUoAtual) return true;
    return codigosUoAtual.has(obterCodigoEquipeLote(row));
  });
  const codigosLoteDRegra = obterEquipesDBaseLoteProd(rowsLoteTodasFiltradas).equipesD;
  const codigosComparativo = somenteD
    ? new Set([...Array.from(codigosDwm), ...Array.from(codigosLoteDRegra)])
    : null;
  const rowsLoteFiltradas = codigosComparativo
    ? rowsLoteTodasFiltradas.filter((row) => codigosComparativo.has(obterCodigoEquipeLote(row)))
    : rowsLoteTodasFiltradas;

  const listaBase = montarLinhasModalEquipesLoteProd(rowsLoteFiltradas, reportRowsModal, { agruparPorData });
  const codigosNaLista = new Set(listaBase.map((item) => String(item.codigo || '').trim()).filter(Boolean));
  const listaWmSemLote = somenteD
    ? Array.from(codigosDwm)
        .filter((codigo) => !codigosNaLista.has(String(codigo)))
        .map((codigo) => {
          const wm = montarLinhasModalEquipes(reportRowsModal, 'todas', filtrarControleRowsAndon(), { agruparPorData })
            .find((item) => String(item.codigo || '').trim() === String(codigo));
          return {
            ...(wm || {}),
            codigo: String(codigo),
            datas: wm?.datas || [],
            data: wm?.data || '-',
            diasTrabalhados: wm?.diasTrabalhados || 0,
            supervisor: wm?.supervisor || '-',
            equipe: wm?.equipe || String(codigo),
            _temWm: true,
            metaWm: Number(wm?.metaDia || 0),
            producaoWm: Number(wm?.prodDia || 0),
            percentualWm: Number(wm?.metaDia || 0) > 0 ? (Number(wm?.prodDia || 0) / Number(wm?.metaDia || 0)) * 100 : 0,
            faixaWm: wm?.faixaDia || '-',
            metaDia: 0,
            prodDia: 0,
            percentualLote: 0,
            faixaLote: '-',
            comparativo: 'SOMENTE WM'
          };
        })
    : [];

  let lista = [...listaBase, ...listaWmSemLote]
    .filter((item) => {
      if (!somenteD) return true;
      const codigo = String(item.codigo || '').trim();
      return codigosDwm.has(codigo) || codigosLoteDRegra.has(codigo);
    })
    .map((item) => {
      if (!somenteD) return { ...item, comparativo: item.comparativo || 'LOTE PROD.' };
      const codigo = String(item.codigo || '').trim();
      const inDLote = codigosLoteDRegra.has(codigo);
      const inWm = itemTemDadosWm(item);
      return {
        ...item,
        comparativo: inWm && inDLote ? 'WM E LOTE' : (inWm ? 'SOMENTE WM' : 'SOMENTE LOTE')
      };
    });

  const pareamentoMtami = aplicarPareamentoMtamiPorProducao(lista);
  lista = lista.filter((item) => !item._ocultarLinhaPareadaMtami && itemPossuiProducaoWmOuLote(item));

  return {
    lista,
    pareamentoMtami,
    codigosDwm,
    codigosLoteDRegra,
    rowsLoteFiltradas,
    reportRowsModal
  };
}

function contarEquipesDLoteProdVisiveis(options = {}) {
  const contexto = montarListaComparativoEquipesDLoteProd({ ...options, somenteD: true });
  return calcularMetricasComparativoLote(
    contexto.lista,
    contexto.codigosDwm,
    contexto.codigosLoteDRegra,
    true
  ).totalDLote;
}

function abrirModalEquipesDLoteProd(options = {}) {
  if (!equipesModal || !equipesModalBody) return;
  aplicarModalTelaCheia(true);

  const somenteD = options.somenteD !== false;
  const agruparPorData = Boolean(options.agruparPorData);
  const habilitarDetalheDias = options.habilitarDetalheDias !== false && !agruparPorData;
  const contextoLote = montarListaComparativoEquipesDLoteProd(options);
  const codigosDwm = contextoLote.codigosDwm;
  const codigosLoteDRegra = contextoLote.codigosLoteDRegra;
  const rowsLoteFiltradas = contextoLote.rowsLoteFiltradas;
  const reportRowsModal = contextoLote.reportRowsModal;
  const pareamentoMtami = contextoLote.pareamentoMtami;
  let lista = contextoLote.lista;
  lista = lista.sort((a, b) => compararFaixaDiaDesc({ ...a, faixaDia: a.faixaLote }, { ...b, faixaDia: b.faixaLote }));

  renderCabecalhoModalEquipesDLoteProd();
  equipesModal.classList.toggle('andon-modal-detalhe-datas', agruparPorData);

  if (equipesModalTitle) equipesModalTitle.textContent = options.title || (somenteD ? 'Equipes D Lote Prod.' : 'Total Equipes Lote Prod.');

  const metricasComparativo = calcularMetricasComparativoLote(lista, codigosDwm, codigosLoteDRegra, somenteD);
  const totalDwm = metricasComparativo.totalDwm;
  const totalDLoteNoComparativo = metricasComparativo.totalDLote;
  const somenteWm = metricasComparativo.somenteWm;
  const somenteLote = metricasComparativo.somenteLote;
  const avisoMtami = pareamentoMtami.semPar
    ? ` | MTAMI sem par: ${formatInt(pareamentoMtami.semPar)}`
    : '';
  if (equipesModalMeta) {
    equipesModalMeta.textContent = options.meta && !somenteD ? options.meta : (somenteD
      ? `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | D WM: ${formatInt(totalDwm)} | D Lote: ${formatInt(totalDLoteNoComparativo)} | Somente WM: ${formatInt(somenteWm)} | Somente Lote: ${formatInt(somenteLote)}${avisoMtami}`
      : `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes: ${formatInt(lista.length)}`);
  }

  modalDetalheEquipesDias = new Map();
  configurarBotaoVoltarModalEquipes(options.voltarContexto || null);
  if (habilitarDetalheDias) {
    lista.forEach((item, index) => {
      const detalheId = `lote-dias-${Date.now()}-${index}`;
      item.detalheDiasId = detalheId;
      modalDetalheEquipesDias.set(detalheId, {
        tipoDetalhe: 'lote-prod',
        item,
        rows: rowsLoteFiltradas,
        reportRows: reportRowsModal,
        somenteD,
        title: equipesModalTitle?.textContent || '',
        meta: equipesModalMeta?.textContent || '',
        origemOptions: {
          ...options,
          rows: rowsLoteFiltradas,
          reportRows: reportRowsModal,
          somenteD,
          agruparPorData: false,
          habilitarDetalheDias: true
        }
      });
    });
  }

  modalLoteEstado = {
    lista,
    busca: '',
    options,
    habilitarDetalheDias,
    title: equipesModalTitle?.textContent || '',
    meta: equipesModalMeta?.textContent || ''
  };
  renderizarListaLoteModal();
  restaurarFiltrosModalQuandoPronto(options.modalFiltros || null);

  equipesModal.classList.remove('hidden');
}

function linhaLotePassaBusca(item = {}, busca = '') {
  const termo = normalizarTextoFiltroModal(busca);
  if (!termo) return true;
  return [
    item.data,
    item.supervisor,
    item.codigo,
    item.equipe,
    item.faixaWm,
    item.faixaLote,
    item.comparativo
  ].some((valor) => normalizarTextoFiltroModal(valor).includes(termo));
}

function obterListaLoteFiltrada() {
  return (modalLoteEstado.lista || []).filter((item) => linhaLotePassaBusca(item, modalLoteEstado.busca || ''));
}

function obterDiagnosticoLote(lista = []) {
  if (!lista.length) return 'Nenhuma equipe encontrada para o filtro atual.';
  const somenteLote = lista.filter((item) => String(item.comparativo || '').includes('SOMENTE LOTE')).length;
  const somenteWm = lista.filter((item) => String(item.comparativo || '').includes('SOMENTE WM')).length;
  const dLote = lista.filter((item) => String(item.faixaLote || '').toUpperCase() === 'D').length;
  const ranking = obterRankingLotePorSupervisor(lista)[0];
  return `D Lote: ${formatInt(dLote)} | Somente Lote: ${formatInt(somenteLote)} | Somente WM: ${formatInt(somenteWm)} | supervisor critico: ${ranking?.supervisor || '-'}`;
}

function renderizarPainelLoteModal(lista = []) {
  const tableWrap = equipesModal?.querySelector('.andon-modal-table-wrap');
  if (!tableWrap) return;
  document.getElementById('andonLoteModalPanel')?.remove();
  equipesModal?.classList.add('andon-modal-lote');
  const dLote = lista.filter((item) => String(item.faixaLote || '').toUpperCase() === 'D').length;
  const wmELote = lista.filter((item) => String(item.comparativo || '').includes('WM E LOTE')).length;
  const painel = document.createElement('div');
  painel.id = 'andonLoteModalPanel';
  painel.className = 'andon-performance-panel';
  painel.innerHTML = `
    <div class="andon-performance-toolbar">
      <label>
        <span>Busca</span>
        <input type="search" class="andon-lote-search" value="${escaparHtmlModal(modalLoteEstado.busca || '')}" placeholder="Equipe, supervisor, faixa, comparativo...">
      </label>
      <button type="button" class="andon-lote-search-btn">Buscar</button>
      <button type="button" class="andon-lote-ranking-btn">Ranking</button>
    </div>
    <div class="andon-performance-summary">
      <div><span>Total</span><strong>${formatInt(lista.length)}</strong></div>
      <div><span>D Lote</span><strong>${formatInt(dLote)}</strong></div>
      <div><span>WM e Lote</span><strong>${formatInt(wmELote)}</strong></div>
      <div><span>Somente Lote</span><strong>${formatInt(lista.filter((item) => String(item.comparativo || '').includes('SOMENTE LOTE')).length)}</strong></div>
      <div><span>Somente WM</span><strong>${formatInt(lista.filter((item) => String(item.comparativo || '').includes('SOMENTE WM')).length)}</strong></div>
      <div><span>Media % Lote</span><strong>${formatPercent(mediaNumericaAndon(lista.map((item) => Number(item.percentualLote || 0)).filter(Number.isFinite)))}</strong></div>
    </div>
    <div class="andon-performance-diagnostic">
      <span>Diagnostico automatico</span>
      <strong>${escaparHtmlModal(obterDiagnosticoLote(lista))}</strong>
    </div>
  `;
  tableWrap.insertAdjacentElement('beforebegin', painel);
  painel.querySelector('.andon-lote-search')?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    modalLoteEstado.busca = event.target.value || '';
    renderizarListaLoteModal();
  });
  painel.querySelector('.andon-lote-search-btn')?.addEventListener('click', () => {
    modalLoteEstado.busca = painel.querySelector('.andon-lote-search')?.value || '';
    renderizarListaLoteModal();
  });
  painel.querySelector('.andon-lote-ranking-btn')?.addEventListener('click', abrirRankingLoteModal);
}

function renderizarListaLoteModal() {
  const lista = obterListaLoteFiltrada();
  renderCabecalhoModalEquipesDLoteProd();
  if (equipesModalTitle && modalLoteEstado.title) equipesModalTitle.textContent = modalLoteEstado.title;
  if (equipesModalMeta && modalLoteEstado.meta) equipesModalMeta.textContent = modalLoteEstado.meta;
  renderizarPainelLoteModal(lista);
  renderizarModalBodyEmLotes(
    lista,
    (item) => `
        <tr>
          <td class="andon-modal-datas" title="${item.data || '-'}">${item.data || '-'}</td>
          <td class="${item.detalheDiasId && Number(item.diasTrabalhados || 0) > 0 ? 'andon-dias-trab-cell' : ''}" data-dias-id="${item.detalheDiasId || ''}">
            ${modalLoteEstado.habilitarDetalheDias && item.detalheDiasId && Number(item.diasTrabalhados || 0) > 0
              ? `<button class="andon-dias-trab-btn" type="button" data-dias-id="${item.detalheDiasId}">${formatInt(item.diasTrabalhados || 0)}</button>`
              : formatInt(item.diasTrabalhados || 0)}
          </td>
          <td>${item.supervisor || '-'}</td>
          <td>${item.equipe || '-'}</td>
          <td>${formatNumber3(item.metaWm)}</td>
          <td>${formatNumber3(item.producaoWm)}</td>
          <td class="andon-faixa faixa-${item.faixaWm || '-'}">${item.faixaWm || '-'}</td>
          <td>${formatPercent(item.percentualWm)}</td>
          <td>${formatNumber3Scale100(item.prodDia)}</td>
          <td class="andon-faixa faixa-${item.faixaLote || '-'}">${item.faixaLote || '-'}</td>
          <td>${formatPercent(item.percentualLote)}</td>
          <td>${item.inicioJornada || '-'}</td>
          <td>${item.inicioRefeicao || '-'}</td>
          <td>${item.terminoRefeicao || '-'}</td>
          <td>${item.primeiroAtendimento || '-'}</td>
          <td>${item.ultimoAtendimento || '-'}</td>
          <td>${item.fimJornada || '-'}</td>
          <td>${item.jornadaProdutiva || '-'}</td>
          <td>${item.comparativo}</td>
        </tr>
      `,
    '<tr><td colspan="19" class="andon-modal-empty">Nenhuma equipe encontrada no lote produtivo.</td></tr>'
  );
  renderizarRodapeModalLoteProd(lista);
}

function obterRankingLotePorSupervisor(lista = []) {
  const mapa = new Map();
  lista.forEach((item) => {
    const supervisor = String(item.supervisor || '-').trim() || '-';
    const atual = mapa.get(supervisor) || { supervisor, total: 0, dLote: 0, somenteLote: 0, somaPerc: 0, qtdPerc: 0 };
    atual.total += 1;
    if (String(item.faixaLote || '').toUpperCase() === 'D') atual.dLote += 1;
    if (String(item.comparativo || '').includes('SOMENTE LOTE')) atual.somenteLote += 1;
    const perc = Number(item.percentualLote || 0);
    if (Number.isFinite(perc)) {
      atual.somaPerc += perc;
      atual.qtdPerc += 1;
    }
    mapa.set(supervisor, atual);
  });
  return Array.from(mapa.values())
    .map((item) => ({ ...item, mediaPerc: item.qtdPerc ? item.somaPerc / item.qtdPerc : Number.NaN }))
    .sort((a, b) => b.dLote - a.dLote || b.somenteLote - a.somenteLote || b.total - a.total);
}

function abrirRankingLoteModal() {
  const ranking = obterRankingLotePorSupervisor(obterListaLoteFiltrada());
  removerPainelPerformanceModal();
  renderCabecalhoModalGenerico([
    { label: 'Rank' },
    { label: 'Supervisor' },
    { label: 'Total' },
    { label: 'D Lote' },
    { label: 'Somente Lote' },
    { label: '% Medio Lote' }
  ]);
  if (equipesModalTitle) equipesModalTitle.textContent = 'Ranking Lote por Supervisor';
  if (equipesModalMeta) equipesModalMeta.textContent = `Base: ${formatInt(obterListaLoteFiltrada().length)} equipes`;
  configurarBotaoVoltarModalEquipes({ tipoContexto: 'lote-lista' });
  renderizarModalBodyEmLotes(
    ranking,
    (item, index) => `
      <tr>
        <td>${formatInt(index + 1)}</td>
        <td>${escaparHtmlModal(item.supervisor || '-')}</td>
        <td>${formatInt(item.total)}</td>
        <td>${formatInt(item.dLote)}</td>
        <td>${formatInt(item.somenteLote)}</td>
        <td>${Number.isFinite(item.mediaPerc) ? formatPercent(item.mediaPerc) : '-'}</td>
      </tr>
    `,
    '<tr><td colspan="6" class="andon-modal-empty">Nenhum ranking encontrado.</td></tr>'
  );
}

function abrirModalLoteProdDetalhes() {
  abrirModalEquipesDLoteProd({
    somenteD: false,
    title: 'Classificação Lote Prod.',
    meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Visão consolidada por equipe`
  });
  return;

  const codigosUoAtual = obterCodigosEquipesUoAtual();
  const rows = filtrarLoteProdEquipesRowsAndon().filter((row) => {
    if (!codigosUoAtual) return true;
    return codigosUoAtual.has(obterCodigoEquipeLote(row));
  });
  const mapaNomes = obterMapaNomesEquipesReport();

  abrirModalTabelaGenerica({
    title: 'Classificação Lote Prod.',
    meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Registros: ${formatInt(rows.length)}`,
    columns: [
      { label: 'Equipe', value: (row) => mapaNomes.get(obterCodigoEquipeLote(row)) || obterCodigoEquipeLote(row) || '-' },
      { label: 'Meta Dia', value: (row) => formatNumber3Scale100(toNumberSafe(obterValorPrimeiro(row, ['META', 'Meta']))) },
      { label: 'Produção Dia', value: (row) => formatNumber3Scale100(toNumberSafe(obterValorPrimeiro(row, ['VALOR_US', 'Valor_US', 'valor_us']))) },
      { label: 'Faixa Dia', value: (row) => String(obterValorPrimeiro(row, ['FAIXA_DIA', 'Faixa_Dia', 'faixa_dia']) || '-') },
      { label: '% Prod. Dia', value: (row) => {
        const meta = toNumberSafe(obterValorPrimeiro(row, ['META', 'Meta']));
        const prod = toNumberSafe(obterValorPrimeiro(row, ['VALOR_US', 'Valor_US', 'valor_us']));
        return meta > 0 ? formatPercent((prod / meta) * 100) : '-';
      } }
    ]
  });
}

function obterResumoEquipesHoraAtual(rows = []) {
  const horasDisponiveis = [...new Set(rows.map(obterHoraLinha).filter((hora) => ANDON_FAIXAS.includes(hora)))].sort();
  const horaAtual = horasDisponiveis.length ? horasDisponiveis[horasDisponiveis.length - 1] : '17';
  const horasAcumuladas = obterHorasAcumuladasAndon(horaAtual);
  const horaPorData = new Map();
  const mapa = new Map();

  if (filtroPeriodoMultiDiaAtivo()) {
    obterMetricasReportPorEquipe(rows).forEach((item, codigo) => {
      mapa.set(codigo, {
        metaDia: Number(item.metaDia || 0),
        prodAtual: Number(item.prodDia || 0)
      });
    });
    return { horaAtual, horasAcumuladas, mapa };
  }

  rows.forEach((row) => {
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA'])) || 'sem-data';
    const hora = obterHoraLinha(row);
    if (!ANDON_FAIXAS.includes(hora)) return;
    const atual = horaPorData.get(dataIso);
    if (!atual || hora > atual) horaPorData.set(dataIso, hora);
  });

  rows.forEach((row) => {
    const codigo = obterCodigoEquipeLinha(row);
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA'])) || 'sem-data';
    const horaLinha = obterHoraLinha(row);
    const horaReferencia = filtroPeriodoMultiDiaAtivo()
      ? (horaPorData.get(dataIso) || horaAtual)
      : horaAtual;
    if (!codigo || horaLinha !== horaReferencia) return;

    const atual = mapa.get(codigo) || { metaDia: 0, prodAtual: 0 };
    const metaLinha = ajustarMetaComFallbackNomenclatura(
      toNumberSafe(obterValorPrimeiro(row, ['Meta Prog.', 'META PROG', 'META_PROG'])),
      obterValorPrimeiro(row, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR']),
      obterValorPrimeiro(row, ['Nome', 'NOME_EQUIPE', 'NOME'])
    );
    const prodLinha = toNumberSafe(obterValorPrimeiro(row, ['Produção', 'PRODUÇÃO', 'PRODUCAO']));
    if (filtroPeriodoMultiDiaAtivo()) {
      atual.metaDia += metaLinha;
      atual.prodAtual += prodLinha;
    } else {
      atual.metaDia = Math.max(atual.metaDia, metaLinha);
      atual.prodAtual = Math.max(atual.prodAtual, prodLinha);
    }
    mapa.set(codigo, atual);
  });

  return { horaAtual, horasAcumuladas, mapa };
}

function montarLinhasModalEquipes(rows = [], filtro = 'todas', controleRows = null, options = {}) {
  const agruparPorData = Boolean(options.agruparPorData);
  const rowsBaseModal = options.apenasComInicioJornada ? filtrarReportRowsPorDiasComInicioJornada(rows) : rows;
  const baseTotal = obterEquipesDBaseTotal(rowsBaseModal);
  const mapaControle = new Map();
  const codigosAcordadas = filtro === 'acordadas' ? obterCodigosSdcaPorTipo(rows, 'acordadas') : null;
  const codigosJustificadas = filtro === 'justificadas' ? obterCodigosSdcaPorTipo(rows, 'justificadas') : null;
  const obterChaveEquipe = (codigo, dataIso = '') => agruparPorData && dataIso ? `${codigo}__${dataIso}` : codigo;

  const controleRowsBase = Array.isArray(controleRows) ? controleRows : filtrarControleRowsAndon();

  controleRowsBase.forEach((row) => {
    const codigo = String(
      obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || ''
    ).trim();
    if (!codigo) return;
    const dataControleIso = obterDataControleLinha(row);
    const chaveControle = obterChaveEquipe(codigo, dataControleIso);

    const atual = mapaControle.get(chaveControle) || {
      inicioJornada: '-',
      primeiroAtendimento: '-',
      ultimoAtendimento: '-',
      fimJornada: '-'
    };

    const inicio = obterHoraTexto(obterValorPrimeiro(row, ['DATA_DESIGNACAO', 'DESIGNACAO', 'DATA DESIGNACAO']));
    const inicioRefeicao = obterHoraTexto(obterValorPrimeiro(row, ['INICIO_REFEICAO', 'INICIO REFEICAO', 'INICIO REFEIÃ‡ÃƒO', 'INICIO REFEIÃƒâ€¡ÃƒÆ’O']));
    const terminoRefeicao = obterHoraTexto(obterValorPrimeiro(row, ['TERMINO_REFEICAO', 'TERMINO REFEICAO', 'TERMINO REFEIÃ‡ÃƒO', 'TERMINO REFEIÃƒâ€¡ÃƒÆ’O']));
    const primeiro = obterHoraTexto(obterValorPrimeiro(row, ['DATA_ACIONAMENTO', 'ACIONAMENTO', 'DATA ACIONAMENTO']));
    const ultimo = obterHoraTexto(
      obterValorPrimeiro(row, ['DATA_TERMINO_REAL', 'ENCERRAMENTO', 'DATA_TERMINO', 'DATA_LOCALIZACAO', 'LOCALIZACAO'])
    );

    if (Number.isFinite(horaParaMinutos(inicio)) && (!Number.isFinite(horaParaMinutos(atual.inicioJornada)) || horaParaMinutos(inicio) < horaParaMinutos(atual.inicioJornada))) {
      atual.inicioJornada = inicio;
    }
    if (Number.isFinite(horaParaMinutos(inicioRefeicao)) && (!Number.isFinite(horaParaMinutos(atual.inicioRefeicao)) || horaParaMinutos(inicioRefeicao) < horaParaMinutos(atual.inicioRefeicao))) {
      atual.inicioRefeicao = inicioRefeicao;
    }
    if (Number.isFinite(horaParaMinutos(terminoRefeicao)) && (!Number.isFinite(horaParaMinutos(atual.terminoRefeicao)) || horaParaMinutos(terminoRefeicao) > horaParaMinutos(atual.terminoRefeicao))) {
      atual.terminoRefeicao = terminoRefeicao;
    }
    if (Number.isFinite(horaParaMinutos(primeiro)) && (!Number.isFinite(horaParaMinutos(atual.primeiroAtendimento)) || horaParaMinutos(primeiro) < horaParaMinutos(atual.primeiroAtendimento))) {
      atual.primeiroAtendimento = primeiro;
    }
    if (Number.isFinite(horaParaMinutos(ultimo)) && (!Number.isFinite(horaParaMinutos(atual.ultimoAtendimento)) || horaParaMinutos(ultimo) > horaParaMinutos(atual.ultimoAtendimento))) {
      atual.ultimoAtendimento = ultimo;
      atual.fimJornada = ultimo;
    }

    mapaControle.set(chaveControle, atual);
  });

  const mapa = new Map();
  const mapaFimJornadaReport = new Map();
  rowsBaseModal.forEach((row) => {
    const codigo = obterCodigoEquipeLinha(row);
    if (!codigo) return;
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
    const fimLinhaReport = obterHoraTexto(obterValorPrimeiro(row, ['FIM_JORNADA', 'Fim Jornada', 'Fim de Jornada']));
    if (dataIso && fimLinhaReport && fimLinhaReport !== '-') {
      mapaFimJornadaReport.set(`${codigo}__${dataIso}`, fimLinhaReport);
    }
    const chaveEquipe = obterChaveEquipe(codigo, dataIso);

    const atual = mapa.get(chaveEquipe) || {
      codigo,
      data: formatarDataBrAndon(dataIso),
      datas: [],
      supervisor: String(obterValorPrimeiro(row, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR', 'SUPERVISOR_EQUIPE']) || '-').trim() || '-',
      equipe: String(obterValorPrimeiro(row, ['Nome', 'NOME_EQUIPE', 'NOME']) || '-'),
      metaDia: 0,
      prodDia: 0,
      inicioJornada: '-',
      inicioRefeicao: '-',
      terminoRefeicao: '-',
      primeiroAtendimento: '-',
      ultimoAtendimento: '-',
      fimJornada: '-',
      jornadaProdutiva: '-'
    };

    if (dataIso && !atual.datas.includes(dataIso)) atual.datas.push(dataIso);
    atual.data = formatarSequenciaDatasAndon(atual.datas);

    atual.metaDia = Math.max(
      atual.metaDia,
      ajustarMetaComFallbackNomenclatura(
        toNumberSafe(obterValorPrimeiro(row, ['Meta Prog.', 'META PROG', 'META_PROG'])),
        obterValorPrimeiro(row, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR']),
        obterValorPrimeiro(row, ['Nome', 'NOME_EQUIPE', 'NOME'])
      )
    );
    atual.prodDia = Math.max(atual.prodDia, toNumberSafe(obterValorPrimeiro(row, ['Produção', 'PRODUÇÃO', 'PRODUCAO'])));

    const inicio = obterHoraTexto(obterValorPrimeiro(row, ['INICIO_JORNADA', 'Inicio Jornada', 'Início Jornada']));
    const primeiro = obterHoraTexto(obterValorPrimeiro(row, ['1º Atendimento', '1Âº Atendimento', 'PRIMEIRO_ATENDIMENTO']));
    const inicioRefeicao = obterHoraTexto(obterValorPrimeiro(row, ['INICIO_REFEICAO', 'INICIO REFEICAO', 'INICIO REFEIÇÃO', 'INICIO REFEIÃ‡ÃƒO']));
    const terminoRefeicao = obterHoraTexto(obterValorPrimeiro(row, ['TERMINO_REFEICAO', 'TERMINO REFEICAO', 'TERMINO REFEIÇÃO', 'TERMINO REFEIÃ‡ÃƒO']));
    const ultimo = obterHoraTexto(obterValorPrimeiro(row, ['Ult. Atendimento', 'ULTIMO_ATENDIMENTO']));
    const fim = obterHoraTexto(obterValorPrimeiro(row, ['FIM_JORNADA', 'Fim Jornada', 'Fim de Jornada']));
    const jornada = obterHoraTexto(obterValorPrimeiro(row, ['Jornada Produtiva', 'JORNADA_PRODUTIVA']));

    if (Number.isFinite(horaParaMinutos(inicio)) && (!Number.isFinite(horaParaMinutos(atual.inicioJornada)) || horaParaMinutos(inicio) < horaParaMinutos(atual.inicioJornada))) {
      atual.inicioJornada = inicio;
    }
    if (Number.isFinite(horaParaMinutos(inicioRefeicao)) && (!Number.isFinite(horaParaMinutos(atual.inicioRefeicao)) || horaParaMinutos(inicioRefeicao) < horaParaMinutos(atual.inicioRefeicao))) {
      atual.inicioRefeicao = inicioRefeicao;
    }
    if (Number.isFinite(horaParaMinutos(terminoRefeicao)) && (!Number.isFinite(horaParaMinutos(atual.terminoRefeicao)) || horaParaMinutos(terminoRefeicao) > horaParaMinutos(atual.terminoRefeicao))) {
      atual.terminoRefeicao = terminoRefeicao;
    }
    if (Number.isFinite(horaParaMinutos(primeiro)) && (!Number.isFinite(horaParaMinutos(atual.primeiroAtendimento)) || horaParaMinutos(primeiro) < horaParaMinutos(atual.primeiroAtendimento))) {
      atual.primeiroAtendimento = primeiro;
    }
    if (Number.isFinite(horaParaMinutos(ultimo)) && (!Number.isFinite(horaParaMinutos(atual.ultimoAtendimento)) || horaParaMinutos(ultimo) > horaParaMinutos(atual.ultimoAtendimento))) {
      atual.ultimoAtendimento = ultimo;
    }
    if (Number.isFinite(horaParaMinutos(fim)) && (!Number.isFinite(horaParaMinutos(atual.fimJornada)) || horaParaMinutos(fim) > horaParaMinutos(atual.fimJornada))) {
      atual.fimJornada = fim;
    }
    if (jornada && jornada !== '-') {
      atual.jornadaProdutiva = jornada;
    }

    mapa.set(chaveEquipe, atual);
  });

  const lista = Array.from(mapa.values()).map((item) => {
    const dataItemIso = normalizarDataIso(item.datas && item.datas[0]);
    const controle = mapaControle.get(obterChaveEquipe(item.codigo, dataItemIso)) || {};
    const fimJornadaReport = agruparPorData
      ? (mapaFimJornadaReport.get(`${item.codigo}__${dataItemIso}`) || '-')
      : '-';
    const inicioJornada = item.inicioJornada !== '-' ? item.inicioJornada : (controle.inicioJornada || '-');
    const primeiroAtendimento = item.primeiroAtendimento !== '-' ? item.primeiroAtendimento : (controle.primeiroAtendimento || '-');
    const ultimoAtendimento = item.ultimoAtendimento !== '-' ? item.ultimoAtendimento : (controle.ultimoAtendimento || '-');
    const fimJornada = item.fimJornada !== '-' ? item.fimJornada : fimJornadaReport;
    const jornadaProdutiva = item.jornadaProdutiva !== '-'
      ? item.jornadaProdutiva
      : diffHoraTexto(primeiroAtendimento, ultimoAtendimento);

    return {
      ...item,
      data: formatarSequenciaDatasAndon(item.datas),
      diasTrabalhados: contarDiasTrabalhadosAndon(item.datas),
      percProdDia: Number(item.metaDia || 0) > 0
        ? (Number(item.prodDia || 0) / Number(item.metaDia || 0)) * 100
        : 0,
      faixaDia: classificarFaixa(
        Number(item.metaDia || 0) > 0
          ? (Number(item.prodDia || 0) / Number(item.metaDia || 0)) * 100
          : 0
      ),
      inicioJornada,
      inicioRefeicao: item.inicioRefeicao || '-',
      terminoRefeicao: item.terminoRefeicao || '-',
      primeiroAtendimento,
      ultimoAtendimento,
      fimJornada: fimJornada || ultimoAtendimento || '-',
      jornadaProdutiva
    };
  }).map((item) => {
    if (agruparPorData || !filtroPeriodoMultiDiaAtivo() || Number(item.diasTrabalhados || 0) <= 1) {
      return item;
    }

    const codigo = String(item.codigo || '').trim();
    const datas = new Set((item.datas || []).map((data) => normalizarDataIso(data)).filter(Boolean));
    if (!codigo || !datas.size) return item;

    const rowsEquipe = rowsBaseModal.filter((row) => {
      const codigoRow = String(obterCodigoEquipeLinha(row) || '').trim();
      const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
      return codigoRow === codigo && datas.has(dataIso);
    });
    const controleEquipe = controleRowsBase.filter((row) => {
      const codigoRow = String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '').trim();
      const dataIso = obterDataControleLinha(row);
      return codigoRow === codigo && datas.has(dataIso);
    });
    const linhasDias = montarLinhasModalEquipes(rowsEquipe, 'todas', controleEquipe, { agruparPorData: true });
    if (!linhasDias.length) return item;

    const resumo = obterResumoRodapeModalEquipes(linhasDias);
    const metaPeriodo = toNumberSafe(resumo.meta);
    const prodPeriodo = toNumberSafe(resumo.producao);
    const percProdDia = metaPeriodo > 0 ? (prodPeriodo / metaPeriodo) * 100 : 0;

    return {
      ...item,
      metaDia: metaPeriodo,
      prodDia: prodPeriodo,
      percProdDia,
      faixaDia: classificarFaixa(percProdDia),
      inicioJornada: resumo.inicioJornada,
      inicioRefeicao: resumo.inicioRefeicao,
      terminoRefeicao: resumo.terminoRefeicao,
      primeiroAtendimento: resumo.primeiroAtendimento,
      ultimoAtendimento: resumo.ultimoAtendimento,
      fimJornada: resumo.fimJornada,
      jornadaProdutiva: resumo.jornadaProdutiva
    };
  }).filter(itemEquipeDeveAparecerModal).filter((item) => {
    const codigo = String(item.codigo || '');
    if (filtro === 'd') return baseTotal.equipesD.has(codigo);
    if (filtro === 'acordadas') return codigosAcordadas && codigosAcordadas.has(codigo);
    if (filtro === 'justificadas') return codigosJustificadas && codigosJustificadas.has(codigo);
    return true;
  });

  if (agruparPorData) {
    return lista.sort((a, b) => {
      const dataA = normalizarDataIso(a.datas && a.datas[0]);
      const dataB = normalizarDataIso(b.datas && b.datas[0]);
      const diffData = String(dataA).localeCompare(String(dataB));
      if (diffData !== 0) return diffData;
      return String(a.equipe || '').localeCompare(String(b.equipe || ''), 'pt-BR', { sensitivity: 'base' });
    });
  }

  return lista.sort(compararFaixaDiaDesc);
}

function abrirModalEquipesAndonContexto({
  filtro = 'todas',
  rows = filtrarReportRowsAndon(),
  controleRows = null,
  title = '',
  meta = '',
  agruparPorData = false,
  habilitarDetalheDias = true,
  voltarContexto = null,
  modalFiltros = null,
  apenasComInicioJornada = false,
  tipoModal = ''
} = {}) {
  if (!equipesModal || !equipesModalBody) return;
  aplicarModalTelaCheia(true);
  const modalPerformance = tipoModal === 'performance';
  equipesModal.classList.toggle('andon-modal-detalhe-datas', Boolean(agruparPorData));
  renderCabecalhoModalEquipesPadrao({ comHistorico: modalPerformance });

  const rowsModal = apenasComInicioJornada ? filtrarReportRowsComInicioJornada(rows) : rows;
  const lista = montarLinhasModalEquipes(rowsModal, filtro, controleRows, { agruparPorData, apenasComInicioJornada });
  const titulo = title || (
    filtro === 'd'
      ? 'Equipes D WM'
      : filtro === 'acordadas'
        ? 'Equipes Acordadas'
        : filtro === 'justificadas'
          ? 'Equipes Justificadas'
          : 'Total de Equipes'
  );

  const metaTexto = meta || `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Registros: ${formatInt(lista.length)}`;

  if (equipesModalTitle) equipesModalTitle.textContent = titulo;
  if (equipesModalMeta) equipesModalMeta.textContent = metaTexto;
  configurarBotaoVoltarModalEquipes(voltarContexto);

  modalDetalheEquipesDias = new Map();
  if (habilitarDetalheDias) {
    lista.forEach((item, index) => {
      const detalheId = `dias-${Date.now()}-${index}`;
      item.detalheDiasId = detalheId;
      modalDetalheEquipesDias.set(detalheId, {
        item,
        rows: rowsModal,
        controleRows,
        filtro,
        tituloOrigem: titulo,
        metaOrigem: metaTexto,
        apenasComInicioJornada,
        tipoModal
      });
    });
  }

  if (modalPerformance) {
    modalPerformanceEstado = {
      lista,
      rows: rowsModal,
      controleRows,
      contexto: { filtro, title: titulo, meta: metaTexto, habilitarDetalheDias, apenasComInicioJornada },
      busca: ''
    };
    renderizarListaPerformanceModal();
  } else {
    renderizarModalBodyEmLotes(
      lista,
      (item) => `
        <tr>
          <td class="andon-modal-datas" title="${item.data || '-'}">${item.data || '-'}</td>
          <td class="${habilitarDetalheDias && Number(item.diasTrabalhados || 0) > 0 ? 'andon-dias-trab-cell' : ''}" data-dias-id="${habilitarDetalheDias ? item.detalheDiasId || '' : ''}">${
            habilitarDetalheDias && Number(item.diasTrabalhados || 0) > 0
              ? `<button class="andon-dias-trab-btn" type="button" data-dias-id="${item.detalheDiasId}">${formatInt(item.diasTrabalhados || 0)}</button>`
              : formatInt(item.diasTrabalhados || 0)
          }</td>
          <td>${item.supervisor || '-'}</td>
          <td>${item.equipe}</td>
          <td>${formatNumber3(item.metaDia)}</td>
          <td>${formatNumber3(item.prodDia)}</td>
          <td class="andon-faixa faixa-${item.faixaDia || '-'}">${item.faixaDia || '-'}</td>
          <td>${formatPercent(item.percProdDia || 0)}</td>
          <td>${item.inicioJornada || '-'}</td>
          <td>${item.inicioRefeicao || '-'}</td>
          <td>${item.terminoRefeicao || '-'}</td>
          <td>${item.primeiroAtendimento || '-'}</td>
          <td>${item.ultimoAtendimento || '-'}</td>
          <td>${item.fimJornada || '-'}</td>
          <td>${item.jornadaProdutiva || '-'}</td>
        </tr>
      `,
      `<tr><td colspan="15" class="andon-modal-empty">Nenhuma equipe encontrada para este filtro.</td></tr>`
    );
    renderizarRodapeModalEquipes(lista);
  }
  restaurarFiltrosModalQuandoPronto(modalFiltros);

  equipesModal.classList.remove('hidden');
}

function abrirModalEquipesAndon(filtro = 'todas') {
  return abrirModalEquipesAndonContexto({ filtro });
}

function abrirModalDetalheDiasTrabalhadosLoteProd(detalhe) {
  if (!detalhe || !detalhe.item) return;
  const codigo = String(detalhe.item.codigo || '').trim();
  const datas = new Set((detalhe.item.datas || []).map((data) => normalizarDataIso(data)).filter(Boolean));
  if (!codigo) return;

  const reportRowsEquipe = (Array.isArray(detalhe.reportRows) ? detalhe.reportRows : []).filter((row) => {
    const codigoRow = String(obterCodigoEquipeLinha(row) || '').trim();
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
    if (codigoRow === codigo && dataIso) datas.add(dataIso);
    return codigoRow === codigo;
  });

  if (!datas.size) return;

  const rowsEquipe = (Array.isArray(detalhe.rows) ? detalhe.rows : []).filter((row) => {
    const codigoRow = obterCodigoEquipeLote(row);
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
    return codigoRow === codigo && datas.has(dataIso);
  });
  const datasComLote = new Set(rowsEquipe.map((row) => normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']))).filter(Boolean));
  const rowsSomenteWm = Array.from(datas)
    .filter((dataIso) => !datasComLote.has(dataIso))
    .map((dataIso) => {
      const reportRow = reportRowsEquipe.find((row) => normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data'])) === dataIso) || {};
      return {
        DATA: dataIso,
        COD_EQUIPE: codigo,
        NOME_EQUIPE: detalhe.item.equipe || obterValorPrimeiro(reportRow, ['Nome', 'NOME_EQUIPE', 'NOME']) || codigo,
        NOME_SUPERVISOR: detalhe.item.supervisor || obterValorPrimeiro(reportRow, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR', 'SUPERVISOR_EQUIPE']) || '-',
        META: 0,
        VALOR_US: 0,
        FAIXA_DIA: '-',
        _SOMENTE_WM: true
      };
    });

  abrirModalEquipesDLoteProd({
    rows: [...rowsEquipe, ...rowsSomenteWm],
    reportRows: detalhe.reportRows,
    somenteD: false,
    title: `Dias Trabalhados - ${detalhe.item.equipe || codigo}`,
    meta: `Equipe: ${detalhe.item.equipe || '-'} | Datas: ${formatInt(datas.size)} | Origem: ${detalhe.title || '-'}`,
    agruparPorData: true,
    habilitarDetalheDias: false,
    voltarContexto: {
      tipoContexto: 'lote-prod',
      options: {
        ...(detalhe.origemOptions || {
        rows: detalhe.rows,
        reportRows: detalhe.reportRows,
        somenteD: detalhe.somenteD,
        title: detalhe.title,
        meta: detalhe.meta,
        agruparPorData: false,
        habilitarDetalheDias: true
        }),
        modalFiltros: detalhe.filtrosOrigem || null
      }
    }
  });
}

function abrirModalDetalheDiasTrabalhadosEquipe(detalheId) {
  const detalhe = modalDetalheEquipesDias.get(String(detalheId || ''));
  if (!detalhe || !detalhe.item) return;
  const filtrosOrigem = capturarFiltrosModalAtual();
  detalhe.filtrosOrigem = filtrosOrigem;
  if (detalhe.tipoDetalhe === 'controle-servico') {
    abrirModalControleServicoDetalheDias(detalhe);
    return;
  }
  if (detalhe.tipoDetalhe === 'lote-prod') {
    abrirModalDetalheDiasTrabalhadosLoteProd(detalhe);
    return;
  }
  if (detalhe.tipoDetalhe === 'equipes-acordadas') {
    abrirModalDetalheDiasAcordados(detalhe);
    return;
  }

  const codigo = String(detalhe.item.codigo || '').trim();
  const datas = new Set((detalhe.item.datas || []).map((data) => normalizarDataIso(data)).filter(Boolean));
  if (!codigo || !datas.size) return;

  const rowsEquipe = (Array.isArray(detalhe.rows) ? detalhe.rows : []).filter((row) => {
    const codigoRow = String(obterCodigoEquipeLinha(row) || '').trim();
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
    return codigoRow === codigo && datas.has(dataIso);
  });

  const controleBase = Array.isArray(detalhe.controleRows) ? detalhe.controleRows : filtrarControleRowsAndon();
  const controleEquipe = controleBase.filter((row) => {
    const codigoRow = String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '').trim();
    const dataIso = obterDataControleLinha(row);
    return codigoRow === codigo && datas.has(dataIso);
  });

  abrirModalEquipesAndonContexto({
    filtro: 'todas',
    rows: rowsEquipe,
    controleRows: controleEquipe,
    title: `Dias Trabalhados - ${detalhe.item.equipe || codigo}`,
    meta: `Equipe: ${detalhe.item.equipe || '-'} | Datas: ${formatInt(datas.size)} | Origem: ${detalhe.tituloOrigem || '-'}`,
    agruparPorData: true,
    habilitarDetalheDias: false,
    voltarContexto: {
      filtro: detalhe.filtro || 'todas',
      rows: detalhe.rows,
      controleRows: detalhe.controleRows,
      title: detalhe.tituloOrigem || '',
      meta: detalhe.metaOrigem || '',
      agruparPorData: false,
      habilitarDetalheDias: true,
      modalFiltros: filtrosOrigem,
      apenasComInicioJornada: Boolean(detalhe.apenasComInicioJornada)
    }
  });
}

function formatarDataBrAndon(value) {
  const dataIso = normalizarDataIso(value);
  return dataIso ? dataIso.split('-').reverse().join('/') : '-';
}

function formatarSequenciaDatasAndon(datas = []) {
  const datasValidas = Array.from(new Set(
    datas.map((data) => normalizarDataIso(data)).filter(Boolean)
  )).sort();
  return datasValidas.length
    ? datasValidas.map(formatarDataBrAndon).join(' | ')
    : '-';
}

function contarDiasTrabalhadosAndon(datas = []) {
  return Array.from(new Set(
    datas.map((data) => normalizarDataIso(data)).filter(Boolean)
  )).length;
}

function calcularResumoServicos13hPorEquipe(controleRows = [], options = {}) {
  const agruparPorData = Boolean(options.agruparPorData);
  const obterChaveEquipe = (codigo, dataIso = '') => agruparPorData && dataIso ? `${codigo}__${dataIso}` : codigo;
  const limite13h = 13 * 60;
  const mapa = new Map();

  controleRows.forEach((row) => {
    const codigo = String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '').trim();
    if (!codigo) return;
    const dataIso = obterDataControleLinha(row);
    const chave = obterChaveEquipe(codigo, dataIso);

    const horaDesignacao = horaParaMinutos(obterValorPrimeiro(row, ['DATA_DESIGNACAO', 'DESIGNACAO', 'DATA DESIGNACAO', 'DATA_ATUALIZACAO']));
    if (!Number.isFinite(horaDesignacao) || horaDesignacao > limite13h) return;

    const item = mapa.get(chave) || {
      designados: 0,
      servicos: 0,
      produtivos: 0,
      improdutivos: 0
    };
    const flag = normalizarFlagServico(obterValorPrimeiro(row, ['PRODUTIVO', 'PRODUTIVOS']));

    item.designados += 1;
    if (flag === 'SIM' || flag === 'NAO') item.servicos += 1;
    if (flag === 'SIM') item.produtivos += 1;
    if (flag === 'NAO') item.improdutivos += 1;

    mapa.set(chave, item);
  });

  return mapa;
}

function montarLinhasModalEquipesAcordadas(reportRows = filtrarReportRowsAndon(), controleRows = filtrarControleRowsAndon(), tipo = 'acordadas', options = {}) {
  const agruparPorData = Boolean(options.agruparPorData);
  const obterChaveEquipe = (codigo, dataIso = '') => agruparPorData && dataIso ? `${codigo}__${dataIso}` : codigo;
  reportRows = filtrarReportRowsComInicioJornada(reportRows);
  const codigosSdca = obterCodigosSdcaPorTipo(reportRows, tipo);
  const mapaJustificativas = new Map();
  const mapaDatasAcordadas = new Map();
  const adicionarDataAcordada = (codigo, dataIso) => {
    const codigoTexto = String(codigo || '').trim();
    const dataTexto = normalizarDataIso(dataIso);
    if (!codigoTexto || !dataTexto) return;
    if (!mapaDatasAcordadas.has(codigoTexto)) mapaDatasAcordadas.set(codigoTexto, new Set());
    mapaDatasAcordadas.get(codigoTexto).add(dataTexto);
  };

  const { mapa: mapaHoraAtual } = obterResumoEquipesHoraAtual(reportRows);
  const codigosVisiveis = new Set(Array.from(mapaHoraAtual.keys()).map((codigo) => String(codigo)));
  obterRegistrosSdcaAndon(codigosVisiveis).forEach((registro) => {
    const dataRegistro = normalizarDataIso(registro && registro.data);
    Object.values(registro && registro.acordos || {}).forEach((item) => {
      const codigo = String(item && item.codigo || '').trim();
      if (codigo && codigosSdca.has(codigo)) adicionarDataAcordada(codigo, dataRegistro);
    });
    if (tipo === 'justificadas') {
      Object.values(registro && registro.justificativas || {}).forEach((item) => {
        const codigo = String(item && item.codigo || '').trim();
        const texto = String(item && item.justificativa || '').trim();
        if (codigo && texto && codigosSdca.has(codigo)) {
          mapaJustificativas.set(codigo, texto);
          adicionarDataAcordada(codigo, dataRegistro);
        }
      });
    }
  });
  const mapaJornada = new Map(
    montarLinhasModalEquipes(reportRows, 'todas', controleRows, { agruparPorData })
      .map((item) => {
        const codigo = String(item.codigo || '').trim();
        const dataIso = normalizarDataIso(item.datas && item.datas[0]);
        return [obterChaveEquipe(codigo, dataIso), item];
      })
      .filter(([codigo]) => Boolean(codigo))
  );
  const mapaServicos13h = calcularResumoServicos13hPorEquipe(controleRows, { agruparPorData });
  const mapa = new Map();
  const horas13 = obterHorasAcumuladasAndon('13');

  reportRows.forEach((row) => {
    const codigo = obterCodigoEquipeLinha(row);
    if (!codigo || !codigosSdca.has(String(codigo))) return;

    const supervisor = String(obterValorPrimeiro(row, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR']) || '-').trim() || '-';
    const equipe = String(obterValorPrimeiro(row, ['Nome', 'NOME_EQUIPE', 'NOME']) || codigo || '-').trim() || '-';
    const frota = String(obterValorPrimeiro(row, ['FROTA', 'Frota', 'PREFIXO', 'Prefixo', 'PLACA', 'Placa']) || '-').trim() || '-';
    const metaLinha = ajustarMetaComFallbackNomenclatura(
      toNumberSafe(obterValorPrimeiro(row, ['Meta Prog.', 'META PROG', 'META_PROG'])),
      supervisor,
      equipe
    );
    const producaoLinha = toNumberSafe(obterValorPrimeiro(row, ['Produção', 'ProduÃ§Ã£o', 'PRODUÇÃO', 'PRODUÃ‡ÃƒO', 'PRODUCAO']));
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA']));
    const hora = obterHoraLinha(row);
    const chaveEquipe = obterChaveEquipe(codigo, dataIso);

    const atual = mapa.get(chaveEquipe) || {
      codigo,
      dataIso: '',
      supervisor,
      frota,
      equipe,
      metaDia: 0,
      prod13: 0,
      prodDia: 0
    };

    if (dataIso && (!atual.dataIso || dataIso > atual.dataIso)) atual.dataIso = dataIso;
    atual.supervisor = supervisor || atual.supervisor;
    atual.frota = frota || atual.frota;
    atual.equipe = equipe || atual.equipe;
    atual.metaDia = Math.max(atual.metaDia, metaLinha);
    atual.prodDia = Math.max(atual.prodDia, producaoLinha);
    if (hora === '13') atual.prod13 = Math.max(atual.prod13, producaoLinha);

    mapa.set(chaveEquipe, atual);
  });

  return Array.from(mapa.values()).map((item) => {
    const jornada = mapaJornada.get(obterChaveEquipe(String(item.codigo || '').trim(), normalizarDataIso(item.dataIso)))
      || mapaJornada.get(String(item.codigo || '').trim())
      || {};
    const servicos13h = mapaServicos13h.get(obterChaveEquipe(String(item.codigo || '').trim(), normalizarDataIso(item.dataIso)))
      || mapaServicos13h.get(String(item.codigo || '').trim())
      || {
      designados: 0,
      servicos: 0,
      produtivos: 0,
      improdutivos: 0
    };
    const perc13 = Number(item.metaDia || 0) > 0 ? (Number(item.prod13 || 0) / Number(item.metaDia || 0)) * 100 : 0;
    const previsaoProducao = horas13 > 0 ? (Number(item.prod13 || 0) / horas13) * 9 : 0;
    const previsaoPercentual = Number(item.metaDia || 0) > 0 ? (previsaoProducao / Number(item.metaDia || 0)) * 100 : 0;
    const percDia = Number(item.metaDia || 0) > 0 ? (Number(item.prodDia || 0) / Number(item.metaDia || 0)) * 100 : 0;
    const percImprod13 = servicos13h.servicos > 0 ? (servicos13h.improdutivos / servicos13h.servicos) * 100 : 0;

    return {
      ...item,
      faixa13: classificarFaixa(perc13),
      perc13,
      previsaoProducao,
      previsaoPercentual,
      previsaoFaixaDia: classificarFaixa(previsaoPercentual),
      faixaDia: classificarFaixa(percDia),
      percDia,
      servicos13h,
      percImprod13,
      datasAcordadas: agruparPorData
        ? [item.dataIso].filter(Boolean)
        : Array.from(mapaDatasAcordadas.get(String(item.codigo || '').trim()) || []).sort(),
      diasAcordados: agruparPorData
        ? 1
        : (mapaDatasAcordadas.get(String(item.codigo || '').trim()) || new Set()).size,
      justificativa: separarGrupoDescricaoJustificativa(mapaJustificativas.get(String(item.codigo || '').trim()) || '-').justificativa || '-',
      inicioJornada: jornada.inicioJornada || '-',
      primeiroAtendimento: jornada.primeiroAtendimento || '-',
      ultimoAtendimento: jornada.ultimoAtendimento || '-',
      fimJornada: jornada.fimJornada || '-',
      jornadaProdutiva: jornada.jornadaProdutiva || '-'
    };
  }).sort((a, b) => {
    const diffSupervisor = String(a.supervisor || '').localeCompare(String(b.supervisor || ''), 'pt-BR', { sensitivity: 'base' });
    if (diffSupervisor !== 0) return diffSupervisor;
    return String(a.equipe || '').localeCompare(String(b.equipe || ''), 'pt-BR', { sensitivity: 'base' });
  });
}

function abrirModalEquipesAcordadasDetalhado() {
  if (!equipesModal || !equipesModalBody) return;
  aplicarModalTelaCheia(true);

  const reportRows = filtrarReportRowsAndon();
  const controleRows = filtrarControleRowsAndon();
  const rows = montarLinhasModalEquipesAcordadas(reportRows, controleRows);

  renderCabecalhoModalGenerico([
    { label: 'DATA' },
    { label: 'Dias Acordados' },
    { label: 'SUPERVISOR' },
    { label: 'Equipes' },
    { label: 'Meta' },
    { label: 'Produção' },
    { label: 'Faixa 13H' },
    { label: '% PROD.DIA 13 H' },
    { label: 'Previsão Produção' },
    { label: 'Previsão %Meta' },
    { label: 'Previsão Faixa Dia' },
    { label: 'Produção' },
    { label: 'Faixa Dia' },
    { label: '% PROD.DIA' },
    { label: 'Designados 13H' },
    { label: 'Serviços 13H' },
    { label: 'Produtivos 13 H' },
    { label: 'Improdutivos 13 H' },
    { label: '% IMPROD. 13 H' },
    { label: 'Início Jornada' },
    { label: '1º Atendimento' },
    { label: 'Últ. Atendimento' },
    { label: 'Fim Jornada' },
    { label: 'Jornada Produtiva' }
  ]);

  if (equipesModalTitle) equipesModalTitle.textContent = 'Equipes Acordadas';
  if (equipesModalMeta) {
    equipesModalMeta.textContent = `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes: ${formatInt(rows.length)}`;
  }

  modalDetalheEquipesDias = new Map();
  rows.forEach((row, index) => {
    const detalheId = `acordadas-${Date.now()}-${index}`;
    row.detalheDiasAcordadosId = detalheId;
    modalDetalheEquipesDias.set(detalheId, {
      tipoDetalhe: 'equipes-acordadas',
      item: row,
      rows: reportRows,
      controleRows,
      tituloOrigem: 'Equipes Acordadas'
    });
  });

  renderizarModalBodyEmLotes(
    rows,
    (row) => `
      <tr>
        <td>${formatarSequenciaDatasAndon(row.datasAcordadas && row.datasAcordadas.length ? row.datasAcordadas : [row.dataIso])}</td>
        <td class="andon-dias-trab-cell" data-dias-id="${row.detalheDiasAcordadosId || ''}">${
          Number(row.diasAcordados || 0) > 0
            ? `<button class="andon-dias-trab-btn" type="button" data-dias-id="${row.detalheDiasAcordadosId || ''}">${formatInt(row.diasAcordados || 0)}</button>`
            : '0'
        }</td>
        <td>${row.supervisor || '-'}</td>
        <td>${row.equipe || '-'}</td>
        <td>${formatNumber3(row.metaDia)}</td>
        <td>${formatNumber3(row.prod13)}</td>
        <td class="andon-faixa faixa-${row.faixa13 || '-'}">${row.faixa13 || '-'}</td>
        <td>${formatPercent(row.perc13 || 0)}</td>
        <td>${formatNumber3(row.previsaoProducao)}</td>
        <td>${formatPercent(row.previsaoPercentual || 0)}</td>
        <td class="andon-faixa faixa-${row.previsaoFaixaDia || '-'}">${row.previsaoFaixaDia || '-'}</td>
        <td>${formatNumber3(row.prodDia)}</td>
        <td class="andon-faixa faixa-${row.faixaDia || '-'}">${row.faixaDia || '-'}</td>
        <td>${formatPercent(row.percDia || 0)}</td>
        <td>${formatInt(row.servicos13h.designados)}</td>
        <td>${formatInt(row.servicos13h.servicos)}</td>
        <td>${formatInt(row.servicos13h.produtivos)}</td>
        <td>${formatInt(row.servicos13h.improdutivos)}</td>
        <td>${formatPercent(row.percImprod13 || 0)}</td>
        <td>${row.inicioJornada || '-'}</td>
        <td>${row.primeiroAtendimento || '-'}</td>
        <td>${row.ultimoAtendimento || '-'}</td>
        <td>${row.fimJornada || '-'}</td>
        <td>${row.jornadaProdutiva || '-'}</td>
      </tr>
    `,
    '<tr><td colspan="24" class="andon-modal-empty">Nenhuma equipe acordada encontrada para o filtro atual.</td></tr>'
  );

  equipesModal.classList.remove('hidden');
}

function abrirModalDetalheDiasAcordados(detalhe) {
  if (!detalhe || !detalhe.item) return;
  const codigo = String(detalhe.item.codigo || '').trim();
  const datas = new Set((detalhe.item.datasAcordadas || []).map((data) => normalizarDataIso(data)).filter(Boolean));
  if (!codigo || !datas.size) return;

  const reportRows = (Array.isArray(detalhe.rows) ? detalhe.rows : []).filter((row) => {
    const codigoRow = String(obterCodigoEquipeLinha(row) || '').trim();
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
    return codigoRow === codigo && datas.has(dataIso);
  });
  const controleRows = (Array.isArray(detalhe.controleRows) ? detalhe.controleRows : filtrarControleRowsAndon()).filter((row) => {
    const codigoRow = String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '').trim();
    const dataIso = obterDataControleLinha(row);
    return codigoRow === codigo && datas.has(dataIso);
  });
  const rows = montarLinhasModalEquipesAcordadas(reportRows, controleRows, 'acordadas', { agruparPorData: true });

  renderCabecalhoModalGenerico([
    { label: 'DATA' },
    { label: 'Dias Acordados' },
    { label: 'SUPERVISOR' },
    { label: 'Equipes' },
    { label: 'Meta' },
    { label: 'ProduÃ§Ã£o' },
    { label: 'Faixa 13H' },
    { label: '% PROD.DIA 13 H' },
    { label: 'PrevisÃ£o ProduÃ§Ã£o' },
    { label: 'PrevisÃ£o %Meta' },
    { label: 'PrevisÃ£o Faixa Dia' },
    { label: 'ProduÃ§Ã£o' },
    { label: 'Faixa Dia' },
    { label: '% PROD.DIA' },
    { label: 'Designados 13H' },
    { label: 'ServiÃ§os 13H' },
    { label: 'Produtivos 13 H' },
    { label: 'Improdutivos 13 H' },
    { label: '% IMPROD. 13 H' },
    { label: 'InÃ­cio Jornada' },
    { label: '1Âº Atendimento' },
    { label: 'Ãšlt. Atendimento' },
    { label: 'Fim Jornada' },
    { label: 'Jornada Produtiva' }
  ]);

  if (equipesModalTitle) equipesModalTitle.textContent = `Dias Acordados - ${detalhe.item.equipe || codigo}`;
  if (equipesModalMeta) {
    equipesModalMeta.textContent = `Equipe: ${detalhe.item.equipe || '-'} | Datas: ${formatInt(datas.size)} | Origem: ${detalhe.tituloOrigem || '-'}`;
  }
  configurarBotaoVoltarModalEquipes({ tipoContexto: 'equipes-acordadas' });

  renderizarModalBodyEmLotes(
    rows,
    (row) => `
      <tr>
        <td>${formatarDataBrAndon(row.dataIso)}</td>
        <td>${formatInt(row.diasAcordados || 1)}</td>
        <td>${row.supervisor || '-'}</td>
        <td>${row.equipe || '-'}</td>
        <td>${formatNumber3(row.metaDia)}</td>
        <td>${formatNumber3(row.prod13)}</td>
        <td class="andon-faixa faixa-${row.faixa13 || '-'}">${row.faixa13 || '-'}</td>
        <td>${formatPercent(row.perc13 || 0)}</td>
        <td>${formatNumber3(row.previsaoProducao)}</td>
        <td>${formatPercent(row.previsaoPercentual || 0)}</td>
        <td class="andon-faixa faixa-${row.previsaoFaixaDia || '-'}">${row.previsaoFaixaDia || '-'}</td>
        <td>${formatNumber3(row.prodDia)}</td>
        <td class="andon-faixa faixa-${row.faixaDia || '-'}">${row.faixaDia || '-'}</td>
        <td>${formatPercent(row.percDia || 0)}</td>
        <td>${formatInt(row.servicos13h.designados)}</td>
        <td>${formatInt(row.servicos13h.servicos)}</td>
        <td>${formatInt(row.servicos13h.produtivos)}</td>
        <td>${formatInt(row.servicos13h.improdutivos)}</td>
        <td>${formatPercent(row.percImprod13 || 0)}</td>
        <td>${row.inicioJornada || '-'}</td>
        <td>${row.primeiroAtendimento || '-'}</td>
        <td>${row.ultimoAtendimento || '-'}</td>
        <td>${row.fimJornada || '-'}</td>
        <td>${row.jornadaProdutiva || '-'}</td>
      </tr>
    `,
    '<tr><td colspan="24" class="andon-modal-empty">Nenhum dia acordado encontrado para esta equipe.</td></tr>'
  );

  equipesModal.classList.remove('hidden');
}

function separarGrupoDescricaoJustificativa(texto) {
  const valor = String(texto || '').trim();
  if (!valor || valor === '-') return { grupo: '-', grupos: ['-'], descricao: '-', justificativa: '-', vozes: [] };
  const segmentosCompostos = valor
    .split(/\s+\+\s+/g)
    .map((segmento) => segmento.trim())
    .filter(Boolean);
  if (segmentosCompostos.filter((segmento) => /\s+-\s+/.test(segmento)).length > 1) {
    const vozes = [];
    let grupoAtual = '-';
    segmentosCompostos.forEach((segmento) => {
      const partesSegmento = segmento.split(/\s+-\s+/);
      let textoVoz = segmento;
      if (partesSegmento.length > 1) {
        grupoAtual = partesSegmento.shift().trim() || grupoAtual;
        textoVoz = partesSegmento.join(' - ').trim();
      }
      const matchDescricaoJustificativa = textoVoz.match(/^([^:]+):\s*(.+)$/);
      vozes.push({
        grupo: grupoAtual,
        descricao: matchDescricaoJustificativa ? matchDescricaoJustificativa[1].trim() || '-' : textoVoz || '-',
        justificativa: matchDescricaoJustificativa ? matchDescricaoJustificativa[2].trim() || '-' : '-'
      });
    });
    const grupos = Array.from(new Set(vozes.map((voz) => voz.grupo).filter(Boolean)));
    const descricoes = Array.from(new Set(vozes.map((voz) => voz.descricao).filter(Boolean)));
    const justificativas = Array.from(new Set(vozes.map((voz) => voz.justificativa).filter((valor) => valor && valor !== '-')));
    return {
      grupo: grupos.length ? grupos.join(' + ') : '-',
      grupos: grupos.length ? grupos : ['-'],
      descricao: descricoes.length ? descricoes.join(' + ') : '-',
      justificativa: justificativas.length ? justificativas.join(' + ') : '-',
      vozes
    };
  }
  const partes = valor.split(/\s+-\s+/);
  const grupoTexto = partes.length <= 1 ? valor : partes.shift().trim() || '-';
  const grupos = grupoTexto
    .split(/\s*(?:\+|;|\|)\s*/g)
    .map((grupo) => grupo.trim())
    .filter(Boolean);
  const textoDepoisGrupo = partes.length ? partes.join(' - ').trim() : '-';
  const matchDescricaoJustificativa = textoDepoisGrupo.match(/^([^:]+):\s*(.+)$/);
  const descricao = matchDescricaoJustificativa
    ? matchDescricaoJustificativa[1].trim() || '-'
    : textoDepoisGrupo || '-';
  const justificativa = matchDescricaoJustificativa
    ? matchDescricaoJustificativa[2].trim() || '-'
    : '-';
  const descricoes = descricao
    .split(/\s*(?:\+|;|\|)\s*/g)
    .map((item) => item.trim())
    .filter(Boolean);
  let vozes = [];
  if (grupos.length > 1 && descricoes.length > 1) {
    vozes = parearGruposDescricoesJustificadas(grupos, descricoes, justificativa);
  } else if (grupos.length > 1 && descricoes.length === 1) {
    const grupoDescricao = escolherGrupoDescricaoJustificada(grupos, descricoes[0]);
    vozes = [{
      grupo: grupoDescricao,
      descricao: descricoes[0],
      justificativa
    }];
  } else {
    vozes = grupos.flatMap((grupo) =>
      (descricoes.length ? descricoes : ['-']).map((descricaoItem) => ({
      grupo,
      descricao: descricaoItem,
      justificativa
      }))
    );
  }
  return {
    grupo: grupos.length ? grupos.join(' + ') : '-',
    grupos: grupos.length ? grupos : ['-'],
    descricao,
    justificativa,
    vozes
  };
}

function pontuarDescricaoGrupoJustificada(grupo, descricao) {
  const grupoNorm = normalizarTextoFiltroModal(grupo);
  const descNorm = normalizarTextoFiltroModal(descricao);
  const regras = [
    { grupo: 'NEC', palavras: ['CODIGO', 'CODIGO X', 'CODIGO-X', 'NEC'] },
    { grupo: 'ATRASO / DIFICULTADOR', palavras: ['INSPECAO', 'SERVICO', 'MANOBRA', 'COMPLEXO', 'SEM DEMANDA', 'VISITA PRE REPROVA', 'PAROU MAIS CEDO', 'FALHA DE SISTEMA', 'LOTE DE SERVICO', 'DIFICULDADE', 'ELEVADA QUANTIDADE', 'AGUARDANDO', 'ATRASO', 'CENTRAL', 'IMPEDIMENTO', 'INTERFERENCIA'] },
    { grupo: 'DESLOCAMENTO', palavras: ['DESLOCAMENTO', 'RURAL', 'INTERMUNICIPAL', 'FORA DO PREVISTO'] },
    { grupo: 'MATERIAL', palavras: ['MATERIAL', 'ALMOXARIFADO', 'EQUIPAMENTO', 'DANIFICADO'] },
    { grupo: 'VEICULO', palavras: ['VEICULO', 'MANUTENCAO', 'ABASTEC', 'CORRETIVA'] },
    { grupo: 'PESSOAL', palavras: ['PESSOAL', 'FUNCIONARIO', 'MEDICO', 'SAIDA MAIS CEDO'] },
    { grupo: 'PERFORMANCE', palavras: ['PERFORMANCE', 'DESPACHO', 'PROGRAMACAO', 'TRIAGEM', 'INEFICIENCIA', 'TEMPO DE PLATAFORMA', 'APOIO FORA DO PROCESSO', 'APOIO COM COMPLEMENTO'] },
    { grupo: 'EVENTOS', palavras: ['EVENTO', 'REUNIAO', 'ASO', 'TREINATIVA'] }
  ];
  const regra = regras.find((item) => grupoNorm === normalizarTextoFiltroModal(item.grupo));
  if (!regra) return 0;
  return regra.palavras.reduce((total, palavra) => (
    descNorm.includes(normalizarTextoFiltroModal(palavra)) ? total + 1 : total
  ), 0);
}

function obterVozesJustificadasFiltradas(row = {}, contexto = {}) {
  const vozesLinha = Array.isArray(row.vozes) ? row.vozes : [];
  const grupoSelecionado = normalizarTextoFiltroModal(contexto.grupoAtivo || '');
  const descricaoSelecionada = normalizarTextoFiltroModal(contexto.descricaoAtiva || '');
  return vozesLinha.filter((voz) => {
    if (grupoSelecionado && normalizarTextoFiltroModal(voz.grupo || '') !== grupoSelecionado) return false;
    if (descricaoSelecionada && normalizarTextoFiltroModal(voz.descricao || '') !== descricaoSelecionada) return false;
    return true;
  });
}

function escolherGrupoDescricaoJustificada(grupos = [], descricao = '-') {
  const grupoPadrao = grupos.find(Boolean) || '-';
  const candidatos = grupos
    .map((grupo, index) => ({
      grupo,
      index,
      score: pontuarDescricaoGrupoJustificada(grupo, descricao)
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index);
  return candidatos[0]?.grupo || grupoPadrao;
}

function parearGruposDescricoesJustificadas(grupos = [], descricoes = [], justificativa = '-') {
  const descricoesDisponiveis = descricoes.map((descricao, index) => ({ descricao, index, usado: false }));
  return grupos.map((grupo, indexGrupo) => {
    let melhor = null;
    descricoesDisponiveis.forEach((item) => {
      if (item.usado) return;
      const score = pontuarDescricaoGrupoJustificada(grupo, item.descricao);
      if (!melhor || score > melhor.score || (score === melhor.score && Math.abs(item.index - indexGrupo) < Math.abs(melhor.index - indexGrupo))) {
        melhor = { ...item, score };
      }
    });

    if (!melhor || melhor.score <= 0) {
      melhor = descricoesDisponiveis.find((item) => !item.usado && item.index === indexGrupo)
        || descricoesDisponiveis.find((item) => !item.usado)
        || descricoesDisponiveis[descricoesDisponiveis.length - 1]
        || { descricao: '-', index: -1 };
    }

    const escolhido = descricoesDisponiveis.find((item) => item.index === melhor.index);
    if (escolhido) escolhido.usado = true;

    return {
      grupo,
      descricao: melhor.descricao || '-',
      justificativa
    };
  });
}

function filtroSemanaAndonAtivo() {
  return Array.isArray(headerSelectedWeeks) && headerSelectedWeeks.length > 0 && !headerSelectedDate && !headerSelectedMonth;
}

function montarLinhasAnaliseJustificadas(reportRows = [], rowsDetalhadas = []) {
  const codigosVisiveis = new Set(rowsDetalhadas.map((row) => String(row.codigo || '').trim()).filter(Boolean));
  const mapaEquipe = new Map();

  reportRows.forEach((row) => {
    const codigo = String(obterCodigoEquipeLinha(row) || '').trim();
    if (!codigo || (codigosVisiveis.size && !codigosVisiveis.has(codigo))) return;
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA']));
    const info = {
      dataIso,
      supervisor: String(obterValorPrimeiro(row, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR', 'SUPERVISOR_EQUIPE']) || '-').trim() || '-',
      codigo,
      equipe: String(obterValorPrimeiro(row, ['Nome', 'NOME_EQUIPE', 'NOME']) || codigo || '-').trim() || '-'
    };
    if (dataIso) mapaEquipe.set(`${codigo}__${dataIso}`, info);
    if (!mapaEquipe.has(codigo) || (dataIso && dataIso > String(mapaEquipe.get(codigo)?.dataIso || ''))) {
      mapaEquipe.set(codigo, info);
    }
  });

  rowsDetalhadas.forEach((row) => {
    const codigo = String(row.codigo || '').trim();
    if (!codigo) return;
    const info = {
      dataIso: normalizarDataIso(row.dataIso),
      supervisor: row.supervisor || '-',
      codigo,
      equipe: row.equipe || codigo || '-'
    };
    if (info.dataIso && !mapaEquipe.has(`${codigo}__${info.dataIso}`)) mapaEquipe.set(`${codigo}__${info.dataIso}`, info);
    if (!mapaEquipe.has(codigo)) mapaEquipe.set(codigo, info);
  });

  const linhas = [];
  obterRegistrosSdcaAndon(codigosVisiveis).forEach((registro) => {
    const dataIso = normalizarDataIso(registro?.data || registro?.data_ref || registro?.dataRef || '');
    Object.values(registro && registro.justificativas || {}).forEach((item) => {
      const codigo = String(item && item.codigo || '').trim();
      const justificativa = String(item && item.justificativa || '').trim();
      if (!codigo || !justificativa || (codigosVisiveis.size && !codigosVisiveis.has(codigo))) return;
      const equipeInfo = mapaEquipe.get(`${codigo}__${dataIso}`) || mapaEquipe.get(codigo) || {};
      const partes = separarGrupoDescricaoJustificativa(justificativa);
      linhas.push({
        dataIso,
        supervisor: equipeInfo.supervisor || '-',
        codigo,
        equipe: equipeInfo.equipe || codigo,
        grupo: partes.grupo,
        grupos: partes.grupos,
        descricao: partes.descricao,
        justificativa: partes.justificativa,
        vozes: partes.vozes
      });
    });
  });

  const recorrencias = new Map();
  linhas.forEach((row) => {
    const chave = [
      normalizarTextoFiltroModal(row.codigo),
      normalizarTextoFiltroModal(row.grupo),
      normalizarTextoFiltroModal(row.descricao),
      normalizarTextoFiltroModal(row.justificativa)
    ].join('|');
    recorrencias.set(chave, (recorrencias.get(chave) || 0) + 1);
  });

  return linhas
    .map((row) => {
      const chave = [
        normalizarTextoFiltroModal(row.codigo),
        normalizarTextoFiltroModal(row.grupo),
        normalizarTextoFiltroModal(row.descricao),
        normalizarTextoFiltroModal(row.justificativa)
      ].join('|');
      return { ...row, recorrenciaSemana: recorrencias.get(chave) || 1 };
    })
    .sort((a, b) => {
      if (a.dataIso !== b.dataIso) return String(a.dataIso || '').localeCompare(String(b.dataIso || ''));
      const diffSupervisor = String(a.supervisor || '').localeCompare(String(b.supervisor || ''), 'pt-BR', { sensitivity: 'base' });
      if (diffSupervisor !== 0) return diffSupervisor;
      return String(a.equipe || '').localeCompare(String(b.equipe || ''), 'pt-BR', { sensitivity: 'base' });
    });
}

function obterValoresCampoJustificadas(row = {}, campo = 'grupo', contexto = {}) {
  const vozesFiltradas = obterVozesJustificadasFiltradas(row, contexto);
  if (campo === 'grupo') {
    if (contexto.descricaoAtiva && vozesFiltradas.length) {
      return [...new Set(vozesFiltradas.map((voz) => String(voz.grupo || '-').trim() || '-'))];
    }
    const grupos = Array.isArray(row.grupos) && row.grupos.length ? row.grupos : [row.grupo || '-'];
    return grupos.map((grupo) => String(grupo || '-').trim() || '-');
  }
  if (campo === 'descricao') {
    const vozesLinha = Array.isArray(row.vozes) ? row.vozes : [];
    if (contexto.grupoAtivo) {
      const descricoesVozes = vozesFiltradas
        .map((voz) => String(voz.descricao || '-').trim() || '-')
        .filter(Boolean);
      if (descricoesVozes.length) return descricoesVozes;

      const gruposLinha = Array.isArray(row.grupos) && row.grupos.length ? row.grupos : [row.grupo || '-'];
      const gruposNormalizados = gruposLinha.map((grupo) => normalizarTextoFiltroModal(grupo));
      if (gruposNormalizados.length !== 1 || gruposNormalizados[0] !== normalizarTextoFiltroModal(contexto.grupoAtivo)) return [];
    }
    if (contexto.descricaoAtiva) {
      const descricoesVozes = vozesFiltradas
        .map((voz) => String(voz.descricao || '-').trim() || '-')
        .filter(Boolean);
      return descricoesVozes.length ? descricoesVozes : [];
    }
    const descricoes = String(row.descricao || '-')
      .split(/\s*(?:\+|;|\|)\s*/g)
      .map((descricao) => descricao.trim())
      .map((descricao) => descricao.replace(/^[^-]+?\s+-\s+/, '').trim())
      .filter(Boolean);
    return descricoes.length ? descricoes : ['-'];
  }
  return [String(row[campo] || '-').trim() || '-'];
}

function formatarListaUnicaJustificada(valores = []) {
  const lista = [...new Set(valores.map((valor) => String(valor || '').trim()).filter(Boolean))];
  return lista.length ? lista.join(' + ') : '-';
}

function obterResumoCampoJustificadas(rows = [], campo = 'grupo', contexto = {}) {
  const mapa = new Map();
  rows.forEach((row) => {
    obterValoresCampoJustificadas(row, campo, contexto).forEach((valor) => {
      mapa.set(valor, (mapa.get(valor) || 0) + 1);
    });
  });
  const totalOcorrencias = Array.from(mapa.values()).reduce((total, valor) => total + valor, 0);
  const resumo = Array.from(mapa.entries())
    .map(([valor, total]) => ({ valor, total }))
    .sort((a, b) => b.total - a.total || a.valor.localeCompare(b.valor, 'pt-BR', { sensitivity: 'base' }));
  return [{ valor: 'Total', total: totalOcorrencias, totalBar: true }, ...resumo];
}

function linhaJustificadaPassaBusca(row = {}, busca = '') {
  const termo = normalizarTextoFiltroModal(busca);
  if (!termo) return true;
  return [
    row.dataIso,
    row.supervisor,
    row.codigo,
    row.equipe,
    row.grupo,
    row.descricao,
    row.justificativa,
    ...(Array.isArray(row.vozes) ? row.vozes.flatMap((voz) => [voz.grupo, voz.descricao, voz.justificativa]) : [])
  ].some((valor) => normalizarTextoFiltroModal(valor).includes(termo));
}

function filtrarRowsAnaliseJustificadas(rows = [], { grupoAtivo = '', descricaoAtiva = '', busca = '' } = {}) {
  return rows.filter((row) => {
    if (grupoAtivo && !obterValoresCampoJustificadas(row, 'grupo', { descricaoAtiva }).includes(grupoAtivo)) return false;
    if (descricaoAtiva && !obterValoresCampoJustificadas(row, 'descricao', { grupoAtivo }).includes(descricaoAtiva)) return false;
    if (!linhaJustificadaPassaBusca(row, busca)) return false;
    return true;
  });
}

function obterValorPredominanteJustificadas(rows = [], campo = '', contexto = {}) {
  return obterResumoCampoJustificadas(rows, campo, contexto).find((item) => !item.totalBar) || { valor: '-', total: 0 };
}

function removerAnaliseJustificadasModal() {
  equipesModal?.querySelector('.andon-justificadas-analytics')?.remove();
  equipesModal?.classList.remove('andon-modal-justificadas-analytics');
}

function formatarRotuloGraficoJustificadas(valor = '') {
  const texto = String(valor || '-').trim();
  if (!texto || texto === '-') return '-';
  if (normalizarTextoFiltroModal(texto) === 'TOTAL') return 'Total';

  const palavrasMinimas = new Set(['a', 'as', 'o', 'os', 'de', 'da', 'das', 'do', 'dos', 'e', 'em', 'por', 'com', 'sem', 'ao', 'aos']);
  const siglas = new Set(['BH', 'COD', 'NEC', 'TOP20']);
  return texto
    .toLocaleLowerCase('pt-BR')
    .split(/(\s+|\/|-)/)
    .map((parte, index) => {
      const limpa = parte.trim();
      const normalizada = normalizarTextoFiltroModal(limpa);
      if (!limpa || /^\s+$/.test(parte) || parte === '/' || parte === '-') return parte;
      if (siglas.has(normalizada)) return normalizada;
      if (index > 0 && palavrasMinimas.has(limpa)) return limpa;
      return limpa.charAt(0).toLocaleUpperCase('pt-BR') + limpa.slice(1);
    })
    .join('');
}

function renderizarBarrasJustificadas({ rows = [], campo = 'grupo', titulo = '', ativo = '', contexto = {} } = {}) {
  const resumo = obterResumoCampoJustificadas(rows, campo, contexto);
  const max = Math.max(...resumo.map((item) => item.total), 1);
  return `
    <section class="andon-justificadas-chart-card">
      <h4>${escaparHtmlModal(titulo)}</h4>
      <div class="andon-justificadas-chart" aria-label="${escaparHtmlModal(titulo)}">
        ${resumo.map((item) => {
          const altura = Math.max(8, (item.total / max) * 100);
          const selecionado = !item.totalBar && ativo && item.valor === ativo;
          const rotulo = formatarRotuloGraficoJustificadas(item.valor);
          return `
            <button type="button" class="andon-justificadas-bar campo-${escaparHtmlModal(campo)} ${selecionado ? 'active' : ''} ${item.totalBar ? 'total' : ''}" data-campo="${escaparHtmlModal(campo)}" data-valor="${escaparHtmlModal(item.valor)}" data-total="${item.totalBar ? '1' : '0'}" title="${escaparHtmlModal(rotulo)}">
              <strong>${formatInt(item.total)}</strong>
              <span class="andon-justificadas-bar-track"><span style="height:${altura}%"></span></span>
              <span class="andon-justificadas-bar-label">${escaparHtmlModal(rotulo)}</span>
            </button>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function formatarDataInputModal(date) {
  if (!date) return '';
  const data = date instanceof Date ? date : new Date(`${date}T00:00:00`);
  if (Number.isNaN(data.getTime())) return '';
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function formatarSemanaInputModal(week = null) {
  if (!week || !week.start) return '';
  const ano = week.start.getFullYear();
  return `${ano}-W${String(week.weekNum || getWeekOfYear(week.start)).padStart(2, '0')}`;
}

function obterDataPorSemanaInputModal(value) {
  const match = String(value || '').match(/^(\d{4})-W(\d{2})$/);
  if (!match) return null;
  const ano = Number(match[1]);
  const semana = Number(match[2]);
  if (!Number.isFinite(ano) || !Number.isFinite(semana)) return null;
  const janeiro4 = new Date(ano, 0, 4);
  const inicioIso = new Date(janeiro4);
  inicioIso.setDate(janeiro4.getDate() - ((janeiro4.getDay() + 6) % 7));
  const referencia = new Date(inicioIso);
  referencia.setDate(inicioIso.getDate() + ((semana - 1) * 7) + 3);
  return referencia;
}

function renderizarFiltrosConsultaJustificadas() {
  const dataValor = headerSelectedDate ? formatarDataInputModal(headerSelectedDate) : '';
  const semanaValor = !headerSelectedDate && headerSelectedWeeks.length === 1 ? formatarSemanaInputModal(headerSelectedWeeks[0]) : '';
  const mesValor = headerSelectedMonth
    ? `${headerSelectedMonth.year}-${String(headerSelectedMonth.month + 1).padStart(2, '0')}`
    : '';
  const uoOptions = ['', ...andonAvailableUos].map((uo) => {
    const selecionado = String(headerSelectedUo || '').replace(/[^\d]/g, '') === String(uo || '');
    return `<option value="${escaparHtmlModal(uo)}" ${selecionado ? 'selected' : ''}>${uo ? `U.O. ${escaparHtmlModal(uo)}` : 'Todas as U.O.'}</option>`;
  }).join('');
  const supervisorOptions = ['', ...obterSupervisoresHeaderDisponiveis()].map((supervisor) => {
    const selecionado = normalizarTextoFiltroModal(headerSelectedSupervisor || '') === normalizarTextoFiltroModal(supervisor || '');
    return `<option value="${escaparHtmlModal(supervisor)}" ${selecionado ? 'selected' : ''}>${supervisor || 'Todos'}</option>`;
  }).join('');

  return `
    <div class="andon-justificadas-filterbar">
      <label>
        <span>U.O.</span>
        <select data-just-filter="uo">${uoOptions}</select>
      </label>
      <label>
        <span>Data</span>
        <input type="date" data-just-filter="data" value="${escaparHtmlModal(dataValor)}">
      </label>
      <label>
        <span>Semana</span>
        <input type="week" data-just-filter="semana" value="${escaparHtmlModal(semanaValor)}">
      </label>
      <label>
        <span>Mes</span>
        <input type="month" data-just-filter="mes" value="${escaparHtmlModal(mesValor)}">
      </label>
      <label>
        <span>Supervisor</span>
        <select data-just-filter="supervisor">${supervisorOptions}</select>
      </label>
      <label>
        <span>Busca</span>
        <input type="search" data-just-filter="busca" value="${escaparHtmlModal(modalJustificadasAnaliseEstado.busca || '')}" placeholder="Equipe, supervisor, motivo...">
      </label>
      <button type="button" class="andon-justificadas-filter-apply">Consultar</button>
      <button type="button" class="andon-justificadas-filter-clear">Limpar</button>
      <button type="button" class="andon-justificadas-export">Resumo CSV</button>
    </div>
  `;
}

function obterResumoFiltrosAtivosJustificadas() {
  const filtros = [];
  const uo = String(headerSelectedUo || '').replace(/[^\d]/g, '');
  filtros.push(uo ? `U.O. ${uo}` : 'Todas as U.O.');
  filtros.push(headerSelectedSupervisor || 'Todos os supervisores');
  if (headerSelectedDate) {
    filtros.push(`Data ${fmtHeaderDate(headerSelectedDate)}`);
  } else if (headerSelectedWeeks.length) {
    filtros.push(headerDateDisplay?.value || 'Semana selecionada');
  } else if (headerSelectedMonth) {
    filtros.push(`Mes ${fmtHeaderMonth(headerSelectedMonth.year, headerSelectedMonth.month)}`);
  } else {
    filtros.push('Periodo geral');
  }
  return filtros;
}

function renderizarResumoFiltrosJustificadas(grupoAtivo = '', descricaoAtiva = '') {
  const filtros = obterResumoFiltrosAtivosJustificadas();
  if (grupoAtivo) filtros.push(`Grupo ${grupoAtivo}`);
  if (descricaoAtiva) filtros.push(`Descricao ${descricaoAtiva}`);
  return `
    <div class="andon-justificadas-context">
      <span>Filtro atual</span>
      <strong>${filtros.map((filtro) => escaparHtmlModal(filtro)).join(' | ')}</strong>
    </div>
  `;
}

function obterAlertasQualidadeJustificadas(rows = []) {
  const alertas = [];
  const semGrupo = rows.filter((row) => !String(row.grupo || '').trim() || String(row.grupo || '').trim() === '-').length;
  const semDescricao = rows.filter((row) => !String(row.descricao || '').trim() || String(row.descricao || '').trim() === '-').length;
  const compostas = rows.filter((row) => Array.isArray(row.grupos) && row.grupos.length > 1).length;
  const recorrentes = rows.filter((row) => Number(row.recorrenciaSemana || 1) >= 2).length;
  const semVozes = rows.filter((row) => {
    const grupos = Array.isArray(row.grupos) ? row.grupos.filter(Boolean) : [];
    return grupos.length > 1 && (!Array.isArray(row.vozes) || !row.vozes.length);
  }).length;

  if (semGrupo) alertas.push({ label: 'Sem grupo', total: semGrupo });
  if (semDescricao) alertas.push({ label: 'Sem descricao', total: semDescricao });
  if (recorrentes) alertas.push({ label: 'Recorrentes na semana', total: recorrentes });
  if (compostas) alertas.push({ label: 'Justificativas compostas', total: compostas });
  if (semVozes) alertas.push({ label: 'Compostas sem vinculo', total: semVozes });
  return alertas;
}

function renderizarAlertasQualidadeJustificadas(rows = []) {
  const alertas = obterAlertasQualidadeJustificadas(rows);
  if (!alertas.length) {
    return `
      <div class="andon-justificadas-quality is-ok">
        <span>Qualidade dos dados</span>
        <strong>Sem inconsistencias aparentes</strong>
      </div>
    `;
  }
  return `
    <div class="andon-justificadas-quality">
      <span>Atencao nos dados</span>
      <div>
        ${alertas.map((alerta) => `
          <strong>${escaparHtmlModal(alerta.label)}: ${formatInt(alerta.total)}</strong>
        `).join('')}
      </div>
    </div>
  `;
}

function obterDiagnosticoJustificadas(rows = [], contexto = {}) {
  if (!rows.length) return 'Nenhuma justificativa encontrada para o filtro atual.';
  const topSupervisor = contarPorCampoJustificadas(rows, 'supervisor')[0] || { valor: '-', total: 0 };
  const topGrupo = obterValorPredominanteJustificadas(rows, 'grupo', contexto);
  const topDescricao = obterValorPredominanteJustificadas(rows, 'descricao', contexto);
  const recorrentes = rows.filter((row) => Number(row.recorrenciaSemana || 1) >= 2).length;
  return `${topSupervisor.valor} concentra ${formatInt(topSupervisor.total)} justificativas | maior causa: ${topGrupo.valor} / ${topDescricao.valor} | recorrentes: ${formatInt(recorrentes)}`;
}

function renderizarDiagnosticoJustificadas(rows = [], contexto = {}) {
  return `
    <div class="andon-justificadas-diagnostic">
      <span>Diagnostico automatico</span>
      <strong>${escaparHtmlModal(obterDiagnosticoJustificadas(rows, contexto))}</strong>
    </div>
  `;
}

function contarPorCampoJustificadas(rows = [], campo = '') {
  const mapa = new Map();
  rows.forEach((row) => {
    const valor = String(row[campo] || '-').trim() || '-';
    mapa.set(valor, (mapa.get(valor) || 0) + 1);
  });
  return Array.from(mapa.entries())
    .map(([valor, total]) => ({ valor, total }))
    .sort((a, b) => b.total - a.total || a.valor.localeCompare(b.valor, 'pt-BR', { sensitivity: 'base' }));
}

function renderizarRankingOperacionalJustificadas(rows = [], contexto = {}) {
  const topSupervisor = contarPorCampoJustificadas(rows, 'supervisor')[0] || { valor: '-', total: 0 };
  const topEquipe = contarPorCampoJustificadas(rows, 'equipe')[0] || { valor: '-', total: 0 };
  const topGrupo = obterValorPredominanteJustificadas(rows, 'grupo', contexto);
  const topDescricao = obterValorPredominanteJustificadas(rows, 'descricao', contexto);
  return `
    <div class="andon-justificadas-ranking">
      <div><span>Supervisor critico</span><strong>${escaparHtmlModal(topSupervisor.valor)} (${formatInt(topSupervisor.total)})</strong></div>
      <div><span>Equipe recorrente</span><strong>${escaparHtmlModal(topEquipe.valor)} (${formatInt(topEquipe.total)})</strong></div>
      <div><span>Grupo dominante</span><strong>${escaparHtmlModal(topGrupo.valor)} (${formatInt(topGrupo.total)})</strong></div>
      <div><span>Descricao dominante</span><strong>${escaparHtmlModal(topDescricao.valor)} (${formatInt(topDescricao.total)})</strong></div>
    </div>
  `;
}

function escaparCsvAndon(valor) {
  const texto = String(valor ?? '');
  return /[;"\n\r]/.test(texto) ? `"${texto.replace(/"/g, '""')}"` : texto;
}

function montarLinhasCsvResumoJustificadas() {
  const grupoAtivo = modalJustificadasAnaliseEstado.grupoAtivo || '';
  const descricaoAtiva = modalJustificadasAnaliseEstado.descricaoAtiva || '';
  const busca = modalJustificadasAnaliseEstado.busca || '';
  const rows = filtrarRowsAnaliseJustificadas(modalJustificadasAnaliseEstado.rows || [], { grupoAtivo, descricaoAtiva, busca });
  const filtros = obterResumoFiltrosAtivosJustificadas();
  if (grupoAtivo) filtros.push(`Grupo ${grupoAtivo}`);
  if (descricaoAtiva) filtros.push(`Descricao ${descricaoAtiva}`);
  if (busca) filtros.push(`Busca ${busca}`);

  const linhas = [
    ['Secao', 'Item', 'Valor'],
    ['Filtros', 'Filtro atual', filtros.join(' | ')],
    ['Resumo', 'Total de justificativas', rows.length],
    ['Resumo', 'Supervisor critico', `${contarPorCampoJustificadas(rows, 'supervisor')[0]?.valor || '-'} (${formatInt(contarPorCampoJustificadas(rows, 'supervisor')[0]?.total || 0)})`],
    ['Resumo', 'Equipe recorrente', `${contarPorCampoJustificadas(rows, 'equipe')[0]?.valor || '-'} (${formatInt(contarPorCampoJustificadas(rows, 'equipe')[0]?.total || 0)})`]
  ];

  obterAlertasQualidadeJustificadas(rows).forEach((alerta) => {
    linhas.push(['Alertas', alerta.label, alerta.total]);
  });

  obterResumoCampoJustificadas(rows, 'grupo').filter((item) => !item.totalBar).slice(0, 10).forEach((item, index) => {
    linhas.push(['Top grupos', `${index + 1}. ${item.valor}`, item.total]);
  });

  obterResumoCampoJustificadas(rows, 'descricao', { grupoAtivo }).filter((item) => !item.totalBar).slice(0, 10).forEach((item, index) => {
    linhas.push(['Top descricoes', `${index + 1}. ${item.valor}`, item.total]);
  });

  return linhas;
}

function nomeArquivoResumoJustificadas() {
  const agora = new Date();
  const stamp = [
    agora.getFullYear(),
    String(agora.getMonth() + 1).padStart(2, '0'),
    String(agora.getDate()).padStart(2, '0'),
    String(agora.getHours()).padStart(2, '0'),
    String(agora.getMinutes()).padStart(2, '0')
  ].join('');
  return `resumo_justificativas_andon_${stamp}.csv`;
}

function exportarResumoExecutivoJustificadas() {
  const linhas = montarLinhasCsvResumoJustificadas();
  const csv = linhas.map((linha) => linha.map(escaparCsvAndon).join(';')).join('\r\n');
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = nomeArquivoResumoJustificadas();
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  link.remove();
}

function sincronizarHeaderComFiltrosConsultaModal() {
  const uo = String(headerSelectedUo || '').replace(/[^\d]/g, '');
  if (headerUoDisplay) headerUoDisplay.value = uo ? `U.O. ${uo}` : 'Todas as U.O.';
  if (headerSupervisorDisplay) headerSupervisorDisplay.value = headerSelectedSupervisor || 'Todos';
  if (headerDateDisplay) {
    if (headerSelectedDate) {
      headerDateDisplay.value = fmtHeaderDate(headerSelectedDate);
    } else if (headerSelectedWeeks.length) {
      updateWeekDisplay();
    } else {
      headerDateDisplay.value = '';
    }
  }
  if (headerMonthDisplay) {
    headerMonthDisplay.value = headerSelectedMonth ? fmtHeaderMonth(headerSelectedMonth.year, headerSelectedMonth.month) : '';
  }
}

function atualizarAnaliseJustificadasNoModal() {
  executarAtualizacaoDashboardAndon();
  abrirModalEquipesJustificadasDetalhado();
  renderizarAnaliseJustificadasModal('', '');
}

function aplicarFiltrosConsultaJustificadas(painel) {
  const obterCampo = (nome) => painel?.querySelector(`[data-just-filter="${nome}"]`);
  const uo = String(obterCampo('uo')?.value || '').replace(/[^\d]/g, '');
  const supervisor = String(obterCampo('supervisor')?.value || '').trim();
  const data = String(obterCampo('data')?.value || '').trim();
  const semana = String(obterCampo('semana')?.value || '').trim();
  const mes = String(obterCampo('mes')?.value || '').trim();
  const busca = String(obterCampo('busca')?.value || '').trim();
  modalJustificadasAnaliseEstado.busca = busca;

  headerSelectedUo = uo ? `U.O. ${uo}` : '';
  headerSelectedSupervisor = supervisor;
  headerSelectedDate = null;
  headerSelectedWeeks = [];
  headerSelectedMonth = null;

  if (data) {
    headerSelectedDate = new Date(`${data}T00:00:00`);
    headerDatePickerMonth = new Date(headerSelectedDate.getFullYear(), headerSelectedDate.getMonth(), 1);
    headerMonthPickerYear = headerSelectedDate.getFullYear();
  } else if (semana) {
    const referencia = obterDataPorSemanaInputModal(semana);
    if (referencia) {
      const range = getWeekRange(referencia);
      headerSelectedWeeks = [{ weekNum: getWeekOfYear(referencia), start: range.start, end: range.end }];
      headerDatePickerMonth = new Date(range.start.getFullYear(), range.start.getMonth(), 1);
      headerMonthPickerYear = range.start.getFullYear();
    }
  } else if (mes) {
    const [ano, mesNumero] = mes.split('-').map(Number);
    if (Number.isFinite(ano) && Number.isFinite(mesNumero)) {
      headerSelectedMonth = { year: ano, month: mesNumero - 1 };
      headerDatePickerMonth = new Date(ano, mesNumero - 1, 1);
      headerMonthPickerYear = ano;
    }
  }

  limparCacheAndon();
  garantirSupervisorSelecionadoDisponivel();
  sincronizarHeaderComFiltrosConsultaModal();
  renderHeaderUoOptions();
  renderHeaderSupervisorOptions();
  atualizarAnaliseJustificadasNoModal();
}

function limparFiltrosConsultaJustificadas() {
  headerSelectedUo = '';
  headerSelectedSupervisor = '';
  headerSelectedDate = null;
  headerSelectedWeeks = [];
  headerSelectedMonth = null;
  modalJustificadasAnaliseEstado.busca = '';
  limparCacheAndon();
  sincronizarHeaderComFiltrosConsultaModal();
  renderHeaderUoOptions();
  renderHeaderSupervisorOptions();
  atualizarAnaliseJustificadasNoModal();
}

function aplicarBuscaAnaliseJustificadas(painel) {
  modalJustificadasAnaliseEstado.busca = String(painel?.querySelector('[data-just-filter="busca"]')?.value || '').trim();
  renderizarAnaliseJustificadasModal(
    modalJustificadasAnaliseEstado.grupoAtivo || '',
    modalJustificadasAnaliseEstado.descricaoAtiva || ''
  );
}

function renderizarGraficoJustificadas(rows = [], grupoAtivo = '', descricaoAtiva = '') {
  renderizarGraficoJustificadasDuplo(rows, grupoAtivo, descricaoAtiva);
  return;
  removerAnaliseJustificadasModal();
  const tabelaWrap = equipesModal?.querySelector('.andon-modal-table-wrap');
  if (!tabelaWrap) return;

  const total = rows.length;
  const resumoGrupo = obterResumoCampoJustificadas(rows, 'grupo').filter((item) => !item.totalBar);
  const resumoDescricao = obterResumoCampoJustificadas(rows, 'descricao').filter((item) => !item.totalBar);
  const topGrupo = resumoGrupo[0]?.valor || '-';
  const topDescricao = resumoDescricao[0]?.valor || '-';
  const topTotal = resumoDescricao[0]?.total || 0;
  const temFiltro = Boolean(grupoAtivo || descricaoAtiva);

  const painel = document.createElement('div');
  painel.className = 'andon-justificadas-analytics';
  painel.innerHTML = `
    ${renderizarFiltrosConsultaJustificadas()}
    <div class="andon-justificadas-summary">
      <div>
        <span>Total de justificativas</span>
        <strong>${formatInt(total)}</strong>
      </div>
      <div>
        <span>Voz predominante</span>
        <strong>${escaparHtmlModal(topGrupo)}</strong>
      </div>
      <div>
        <span>Ocorrências da voz</span>
        <strong>${formatInt(topTotal)}</strong>
      </div>
      <button type="button" class="andon-justificadas-clear ${grupoAtivo ? '' : 'hidden'}">Limpar seleção</button>
    </div>
    <div class="andon-justificadas-chart" aria-label="Gráfico de vozes de justificativa">
      ${resumo.map((item) => {
        const largura = Math.max(6, (item.total / max) * 100);
        const ativo = grupoAtivo && item.grupo === grupoAtivo;
        return `
          <button type="button" class="andon-justificadas-bar ${ativo ? 'active' : ''}" data-grupo="${escaparHtmlModal(item.grupo)}">
            <span class="andon-justificadas-bar-label">${escaparHtmlModal(item.grupo)}</span>
            <span class="andon-justificadas-bar-track"><span style="width:${largura}%"></span></span>
            <strong>${formatInt(item.total)}</strong>
          </button>
        `;
      }).join('')}
    </div>
  `;

  painel.querySelectorAll('.andon-justificadas-bar').forEach((botao) => {
    botao.addEventListener('click', () => {
      const grupo = botao.dataset.grupo || '';
      renderizarAnaliseJustificadasModal(grupo === modalJustificadasAnaliseEstado.grupoAtivo ? '' : grupo);
    });
  });
  painel.querySelector('.andon-justificadas-clear')?.addEventListener('click', () => renderizarAnaliseJustificadasModal(''));
  tabelaWrap.insertAdjacentElement('beforebegin', painel);
}

function renderizarGraficoJustificadasDuplo(rows = [], grupoAtivo = '', descricaoAtiva = '') {
  removerAnaliseJustificadasModal();
  const tabelaWrap = equipesModal?.querySelector('.andon-modal-table-wrap');
  if (!tabelaWrap) return;

  const busca = modalJustificadasAnaliseEstado.busca || '';
  const rowsBusca = rows.filter((row) => linhaJustificadaPassaBusca(row, busca));
  const rowsFiltradas = filtrarRowsAnaliseJustificadas(rows, { grupoAtivo, descricaoAtiva, busca });
  const rowsGraficoGrupo = descricaoAtiva
    ? rowsBusca.filter((row) => obterValoresCampoJustificadas(row, 'descricao', { grupoAtivo }).includes(descricaoAtiva))
    : rowsBusca;
  const rowsGraficoDescricao = grupoAtivo
    ? rowsBusca.filter((row) => obterValoresCampoJustificadas(row, 'grupo').includes(grupoAtivo))
    : rowsBusca;
  const total = rowsFiltradas.length;
  const resumoGrupo = obterResumoCampoJustificadas(rowsFiltradas, 'grupo').filter((item) => !item.totalBar);
  const resumoDescricao = obterResumoCampoJustificadas(rowsFiltradas, 'descricao', { grupoAtivo }).filter((item) => !item.totalBar);
  const topGrupo = resumoGrupo[0]?.valor || '-';
  const topDescricao = resumoDescricao[0]?.valor || '-';
  const topTotal = resumoDescricao[0]?.total || 0;
  const temFiltro = Boolean(grupoAtivo || descricaoAtiva);

  const painel = document.createElement('div');
  painel.className = 'andon-justificadas-analytics';
  painel.innerHTML = `
    ${renderizarFiltrosConsultaJustificadas()}
    ${renderizarResumoFiltrosJustificadas(grupoAtivo, descricaoAtiva)}
    <div class="andon-justificadas-summary">
      <div>
        <span>Total de justificativas</span>
        <strong>${formatInt(total)}</strong>
      </div>
      <div>
        <span>Grupo predominante</span>
        <strong>${escaparHtmlModal(topGrupo)}</strong>
      </div>
      <div>
        <span>Descricao predominante</span>
        <strong>${escaparHtmlModal(topDescricao)} (${formatInt(topTotal)})</strong>
      </div>
      <button type="button" class="andon-justificadas-clear ${temFiltro ? '' : 'hidden'}">Limpar selecao</button>
    </div>
    ${renderizarAlertasQualidadeJustificadas(rowsFiltradas)}
    ${renderizarDiagnosticoJustificadas(rowsFiltradas, { grupoAtivo, descricaoAtiva })}
    ${renderizarRankingOperacionalJustificadas(rowsFiltradas, { grupoAtivo, descricaoAtiva })}
    ${renderizarBarrasJustificadas({ rows: rowsGraficoGrupo, campo: 'grupo', titulo: 'Grafico por Grupo', ativo: grupoAtivo })}
    ${renderizarBarrasJustificadas({ rows: rowsGraficoDescricao, campo: 'descricao', titulo: 'Grafico por Descricao', ativo: descricaoAtiva, contexto: { grupoAtivo } })}
  `;

  painel.querySelectorAll('.andon-justificadas-bar').forEach((botao) => {
    botao.addEventListener('click', () => {
      const campo = botao.dataset.campo || '';
      const valor = botao.dataset.valor || '';
      const total = botao.dataset.total === '1';
      const grupo = campo === 'grupo'
        ? (total || valor === modalJustificadasAnaliseEstado.grupoAtivo ? '' : valor)
        : modalJustificadasAnaliseEstado.grupoAtivo;
      const descricao = campo === 'descricao'
        ? (total || valor === modalJustificadasAnaliseEstado.descricaoAtiva ? '' : valor)
        : modalJustificadasAnaliseEstado.descricaoAtiva;
      renderizarAnaliseJustificadasModal(grupo, descricao);
    });
  });
  painel.querySelector('.andon-justificadas-clear')?.addEventListener('click', () => renderizarAnaliseJustificadasModal('', ''));
  painel.querySelector('.andon-justificadas-filter-apply')?.addEventListener('click', () => aplicarFiltrosConsultaJustificadas(painel));
  painel.querySelector('.andon-justificadas-filter-clear')?.addEventListener('click', limparFiltrosConsultaJustificadas);
  painel.querySelector('.andon-justificadas-export')?.addEventListener('click', exportarResumoExecutivoJustificadas);
  painel.querySelectorAll('.andon-justificadas-filterbar input, .andon-justificadas-filterbar select').forEach((campo) => {
    campo.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') aplicarFiltrosConsultaJustificadas(painel);
    });
  });
  tabelaWrap.insertAdjacentElement('beforebegin', painel);
}

function renderizarAnaliseJustificadasModal(grupoAtivo = '', descricaoAtiva = '') {
  const rowsBase = modalJustificadasAnaliseEstado.rows || [];
  modalJustificadasAnaliseEstado.grupoAtivo = grupoAtivo || '';
  modalJustificadasAnaliseEstado.descricaoAtiva = descricaoAtiva || '';
  const rows = filtrarRowsAnaliseJustificadas(rowsBase, {
    grupoAtivo,
    descricaoAtiva,
    busca: modalJustificadasAnaliseEstado.busca || ''
  });
  const mostrarRecorrencia = filtroSemanaAndonAtivo();

  renderCabecalhoModalGenerico([
    { label: 'Data' },
    { label: 'Supervisor' },
    { label: 'Equipe' },
    { label: 'Grupo' },
    { label: 'Descrição' },
    { label: 'Justificativa' },
    { label: 'Hist.' },
    ...(mostrarRecorrencia ? [{ label: 'Qtd. Semana' }] : [])
  ]);
  equipesModal?.classList.add('andon-modal-justificadas-analytics');
  if (equipesModalTitle) equipesModalTitle.textContent = 'Analise de Justificativas';
  if (equipesModalMeta) {
    equipesModalMeta.textContent = `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Registros: ${formatInt(rows.length)}`;
  }
  configurarBotaoVoltarModalEquipes(null);
  configurarBotaoAnaliseJustificadas(true, true);
  renderizarGraficoJustificadasDuplo(rowsBase, grupoAtivo, descricaoAtiva);
  modalJustificadasAnaliseEstado.historico = new Map();
  renderizarModalBodyEmLotes(
    rows,
    (row, index) => {
      const contexto = { grupoAtivo, descricaoAtiva };
      const grupoLinha = grupoAtivo || formatarListaUnicaJustificada(obterValoresCampoJustificadas(row, 'grupo', contexto));
      const descricaoLinha = descricaoAtiva || formatarListaUnicaJustificada(obterValoresCampoJustificadas(row, 'descricao', contexto));
      const vozesLinha = obterVozesJustificadasFiltradas(row, contexto);
      const justificativaLinha = vozesLinha.length
        ? formatarListaUnicaJustificada(vozesLinha.map((voz) => voz.justificativa || row.justificativa || '-'))
        : row.justificativa || '-';
      const historicoId = `just-hist-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`;
      modalJustificadasAnaliseEstado.historico.set(historicoId, row);
      return `
        <tr>
          <td>${formatarDataBrAndon(row.dataIso)}</td>
          <td>${escaparHtmlModal(row.supervisor || '-')}</td>
          <td>${escaparHtmlModal(row.equipe || '-')}</td>
          <td>${escaparHtmlModal(grupoLinha || '-')}</td>
          <td>${escaparHtmlModal(descricaoLinha || '-')}</td>
          <td>${escaparHtmlModal(justificativaLinha || '-')}</td>
          <td><button type="button" class="andon-just-hist-btn" data-just-hist-id="${historicoId}">Ver</button></td>
          ${mostrarRecorrencia ? `<td>${formatInt(row.recorrenciaSemana || 1)}</td>` : ''}
        </tr>
      `;
    },
    `<tr><td colspan="${mostrarRecorrencia ? 8 : 7}" class="andon-modal-empty">Nenhuma justificativa encontrada.</td></tr>`
  );
}

function abrirHistoricoJustificadasEquipe(row = {}) {
  const codigo = String(row.codigo || '').trim();
  if (!codigo) return;
  removerAnaliseJustificadasModal();
  const historico = (modalJustificadasAnaliseEstado.rows || [])
    .filter((item) => String(item.codigo || '').trim() === codigo)
    .sort((a, b) => String(b.dataIso || '').localeCompare(String(a.dataIso || '')));

  renderCabecalhoModalGenerico([
    { label: 'Data' },
    { label: 'Supervisor' },
    { label: 'Equipe' },
    { label: 'Grupo' },
    { label: 'Descricao' },
    { label: 'Justificativa' },
    { label: 'Qtd. Semana' }
  ]);

  if (equipesModalTitle) equipesModalTitle.textContent = `Historico de justificativas - ${row.equipe || codigo}`;
  if (equipesModalMeta) equipesModalMeta.textContent = `Codigo: ${codigo} | Registros: ${formatInt(historico.length)}`;
  configurarBotaoAnaliseJustificadas(false, false);
  configurarBotaoVoltarModalEquipes({
    tipoContexto: 'justificadas-analise',
    grupoAtivo: modalJustificadasAnaliseEstado.grupoAtivo || '',
    descricaoAtiva: modalJustificadasAnaliseEstado.descricaoAtiva || ''
  });

  renderizarModalBodyEmLotes(
    historico,
    (item) => `
      <tr>
        <td>${formatarDataBrAndon(item.dataIso)}</td>
        <td>${escaparHtmlModal(item.supervisor || '-')}</td>
        <td>${escaparHtmlModal(item.equipe || '-')}</td>
        <td>${escaparHtmlModal(item.grupo || '-')}</td>
        <td>${escaparHtmlModal(item.descricao || '-')}</td>
        <td>${escaparHtmlModal(item.justificativa || '-')}</td>
        <td>${formatInt(item.recorrenciaSemana || 1)}</td>
      </tr>
    `,
    '<tr><td colspan="7" class="andon-modal-empty">Nenhum historico encontrado para esta equipe.</td></tr>'
  );
}

function abrirModalEquipesJustificadasDetalhado() {
  if (!equipesModal || !equipesModalBody) return;
  aplicarModalTelaCheia(true);
  removerAnaliseJustificadasModal();

  const reportRows = filtrarReportRowsAndon();
  const controleRows = filtrarControleRowsAndon();
  const rows = montarLinhasModalEquipesAcordadas(reportRows, controleRows, 'justificadas');
  modalJustificadasAnaliseEstado = {
    rows: montarLinhasAnaliseJustificadas(filtrarReportRowsComInicioJornada(reportRows), rows),
    grupoAtivo: '',
    descricaoAtiva: '',
    busca: modalJustificadasAnaliseEstado.busca || '',
    historico: new Map()
  };

  renderCabecalhoModalGenerico([
    { label: 'Data' },
    { label: 'Dias Acordados' },
    { label: 'Supervisor' },
    { label: 'Cód. Eqp.' },
    { label: 'Equipe' },
    { label: 'Meta' },
    { label: 'Prod.' },
    { label: 'Faixa 13 H' },
    { label: '% Prod. Dia 13 h' },
    { label: 'Justificativa' },
    { label: 'Prev. Prod.' },
    { label: 'Prev. %Meta' },
    { label: 'Prev. Faixa Dia' },
    { label: 'Prod.' },
    { label: 'Faixa Dia' },
    { label: '% PROD.DIA' },
    { label: 'Desig. 13 H' },
    { label: 'Serv. 13 H' },
    { label: 'Prod. 13 H' },
    { label: 'Improd. 13 H' },
    { label: '% IMPROD. 13 H' },
    { label: 'Início Jornada' },
    { label: '1º Atendimento' },
    { label: 'Últ. Atend.' },
    { label: 'Fim Jornada' },
    { label: 'Jornada Prod.' }
  ]);

  if (equipesModalTitle) equipesModalTitle.textContent = 'Equipes Justificadas';
  if (equipesModalMeta) {
    equipesModalMeta.textContent = `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes: ${formatInt(rows.length)}`;
  }
  configurarBotaoAnaliseJustificadas(true, false);

  renderizarModalBodyEmLotes(
    rows,
    (row) => `
      <tr>
        <td>${formatarSequenciaDatasAndon(row.datasAcordadas && row.datasAcordadas.length ? row.datasAcordadas : [row.dataIso])}</td>
        <td>${formatInt(row.diasAcordados || 1)}</td>
        <td>${row.supervisor || '-'}</td>
        <td>${row.codigo || '-'}</td>
        <td>${row.equipe || '-'}</td>
        <td>${formatNumber3(row.metaDia)}</td>
        <td>${formatNumber3(row.prod13)}</td>
        <td class="andon-faixa faixa-${row.faixa13 || '-'}">${row.faixa13 || '-'}</td>
        <td>${formatPercent(row.perc13 || 0)}</td>
        <td>${row.justificativa || '-'}</td>
        <td>${formatNumber3(row.previsaoProducao)}</td>
        <td>${formatPercent(row.previsaoPercentual || 0)}</td>
        <td class="andon-faixa faixa-${row.previsaoFaixaDia || '-'}">${row.previsaoFaixaDia || '-'}</td>
        <td>${formatNumber3(row.prodDia)}</td>
        <td class="andon-faixa faixa-${row.faixaDia || '-'}">${row.faixaDia || '-'}</td>
        <td>${formatPercent(row.percDia || 0)}</td>
        <td>${formatInt(row.servicos13h.designados)}</td>
        <td>${formatInt(row.servicos13h.servicos)}</td>
        <td>${formatInt(row.servicos13h.produtivos)}</td>
        <td>${formatInt(row.servicos13h.improdutivos)}</td>
        <td>${formatPercent(row.percImprod13 || 0)}</td>
        <td>${row.inicioJornada || '-'}</td>
        <td>${row.primeiroAtendimento || '-'}</td>
        <td>${row.ultimoAtendimento || '-'}</td>
        <td>${row.fimJornada || '-'}</td>
        <td>${row.jornadaProdutiva || '-'}</td>
      </tr>
    `,
    '<tr><td colspan="26" class="andon-modal-empty">Nenhuma equipe justificada encontrada para o filtro atual.</td></tr>'
  );

  equipesModal.classList.remove('hidden');
}

function obterCodigosEquipesSemRefeicao(reportRows = filtrarReportRowsAndon(), listaEquipes = null) {
  const equipes = Array.isArray(listaEquipes)
    ? listaEquipes
    : montarLinhasModalEquipes(reportRows, 'todas', filtrarControleRowsAndon());
  const codigosVisiveis = new Set(equipes.map((item) => String(item.codigo || '').trim()).filter(Boolean));
  const mapaRefeicaoRegistrada = new Map();

  reportRows.forEach((row) => {
    const codigo = String(obterCodigoEquipeLinha(row) || '').trim();
    if (!codigo || !codigosVisiveis.has(codigo)) return;

    const inicioRefeicao = String(
      obterValorPrimeiro(row, ['INICIO_REFEICAO', 'INICIO REFEICAO', 'INICIO REFEIÇÃO', 'INICIO REFEIÃ‡ÃƒO']) || ''
    ).trim();
    const terminoRefeicao = String(
      obterValorPrimeiro(row, ['TERMINO_REFEICAO', 'TERMINO REFEICAO', 'TERMINO REFEIÇÃO', 'TERMINO REFEIÃ‡ÃƒO']) || ''
    ).trim();

    if (!mapaRefeicaoRegistrada.has(codigo)) mapaRefeicaoRegistrada.set(codigo, false);
    if (inicioRefeicao || terminoRefeicao) mapaRefeicaoRegistrada.set(codigo, true);
  });

  return new Set(Array.from(codigosVisiveis).filter((codigo) => !mapaRefeicaoRegistrada.get(codigo)));
}

function abrirModalRefeicaoSemRegistro() {
  const reportRows = filtrarReportRowsComInicioJornada(filtrarReportRowsAndon());
  const controleRows = obterControleRowsPorCodigos(obterCodigosReportRows(reportRows));
  const listaEquipes = montarLinhasModalEquipes(reportRows, 'todas', controleRows);
  const codigosSemRefeicao = obterCodigosEquipesSemRefeicao(reportRows, listaEquipes);

  const rowsSemRefeicao = reportRows.filter((row) => codigosSemRefeicao.has(String(obterCodigoEquipeLinha(row) || '').trim()));
  const controleRowsSemRefeicao = controleRows.filter((row) => {
    const codigo = String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '').trim();
    return codigosSemRefeicao.has(codigo);
  });

  abrirModalEquipesAndonContexto({
    rows: rowsSemRefeicao,
    controleRows: controleRowsSemRefeicao,
    title: 'Refeição sem registro',
    meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes: ${formatInt(codigosSemRefeicao.size)}`
  });
}

function abrirModalJornadaProdutivaContexto(tipo = 'todas') {
  const reportRows = filtrarReportRowsPorDiasComInicioJornada(filtrarReportRowsAndon());
  const controleRows = obterControleRowsPorCodigos(obterCodigosReportRows(reportRows));
  const listaEquipes = montarLinhasModalEquipes(reportRows, 'todas', controleRows, { apenasComInicioJornada: true });
  const totalEfetiva = listaEquipes.length;

  if (tipo !== 'incompleta') {
    abrirModalEquipesAndonContexto({
      rows: reportRows,
      controleRows,
      title: 'Jornada Produtiva',
      meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes: ${formatInt(totalEfetiva)}`,
      apenasComInicioJornada: true
    });
    return;
  }

  const codigosIncompletas = new Set(
    listaEquipes
      .filter((item) => {
        const minutos = horaParaMinutos(item.jornadaProdutiva);
        return !Number.isFinite(minutos) || minutos < (7 * 60);
      })
      .map((item) => String(item.codigo || '').trim())
      .filter(Boolean)
  );
  const rowsIncompletas = reportRows.filter((row) => codigosIncompletas.has(String(obterCodigoEquipeLinha(row) || '').trim()));
  const controleIncompletas = controleRows.filter((row) => {
    const codigo = String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '').trim();
    return codigosIncompletas.has(codigo);
  });

  abrirModalEquipesAndonContexto({
    rows: rowsIncompletas,
    controleRows: controleIncompletas,
    title: 'Jornada Produtiva Incompleta',
    meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes: ${formatInt(codigosIncompletas.size)}`,
    apenasComInicioJornada: true
  });
}

function fecharModalEquipesAndon() {
  if (equipesModal) {
    equipesModal.classList.add('hidden');
    aplicarModalTelaCheia(false);
    equipesModal.classList.remove('andon-modal-detalhe-datas');
    removerAnaliseJustificadasModal();
    configurarBotaoAnaliseJustificadas(false);
    configurarBotaoVoltarModalEquipes(null);
  }
}

function linhaPassaFiltroSupervisorView(dataIso) {
  if (!dataIso) return false;
  if (supSelectedDate) {
    return dataIso === normalizarDataIso(supSelectedDate);
  }
  if (supSelectedWeeks.length) {
    return supSelectedWeeks.some((week) => dataIso >= normalizarDataIso(week.start) && dataIso <= normalizarDataIso(week.end));
  }
  return true;
}

function obterRowsSupervisorCard(card) {
  const supervisor = String(card?.dataset?.supervisor || '').trim();
  const uoCard = String(card?.dataset?.uo || '').replace(/[^\d]/g, '');
  const deveFiltrarUoCard = uoCard.length >= 3;

  return andonReportRows.filter((row) => {
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA']));
    if (!linhaPassaFiltrosPeriodo(dataIso)) return false;
    if (!linhaPassaFiltroSupervisorView(dataIso)) return false;
    if (deveFiltrarUoCard && obterUoLinha(row) !== uoCard) return false;

    const supervisorRow = String(obterValorPrimeiro(row, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR']) || '').trim();
    return supervisorRow.toUpperCase() === supervisor.toUpperCase();
  });
}

function obterControleRowsPorCodigos(codigos = new Set()) {
  const permitidos = new Set(Array.from(codigos).map((codigo) => String(codigo).trim()).filter(Boolean));
  if (!permitidos.size) return [];
  const mapa = obterMapaControlePorCodigoAndon();
  return Array.from(permitidos).flatMap((codigo) => mapa.get(codigo) || []);
}

function obterControleRowsSupervisorPorCodigos(card, codigos = new Set()) {
  const permitidos = new Set(Array.from(codigos).map((codigo) => String(codigo).trim()).filter(Boolean));
  if (!permitidos.size) return [];
  const rowsBase = Array.from(permitidos).flatMap((codigo) => obterMapaControlePorCodigoAndon().get(codigo) || []);
  return rowsBase.filter((row) => {
    const dataIso = obterDataControleLinha(row);
    if (!linhaPassaFiltroSupervisorView(dataIso)) return false;

    const codigo = String(
      obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || ''
    ).trim();
    if (!permitidos.has(codigo)) return false;

    const uoCard = String(card?.dataset?.uo || '').replace(/[^\d]/g, '');
    return !uoCard || uoCard.length < 3 || obterUoLinha(row) === uoCard;
  });
}

function obterImpedimentoPorCodigos(codigos = new Set()) {
  const rows = obterControleRowsPorCodigos(codigos);
  return calcularPercentualImpedimento(rows);
}

function normalizarFlagServico(value) {
  const texto = String(value || '').trim().toUpperCase();
  const semAcento = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (['SIM', 'S', 'T', '1', 'TRUE'].includes(semAcento)) return 'SIM';
  if (['NAO', 'N', 'F', '0', 'FALSE'].includes(semAcento)) return 'NAO';
  return semAcento;
}

function calcularEficiencia(rows = [], controleRows = []) {
  const codigosEquipes = obterCodigosReportRows(rows);
  const codigosComServico = new Set();
  let servicosProdutivos = 0;
  let servicosImprodutivos = 0;

  controleRows.forEach((row) => {
    const codigo = String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '').trim();
    if (codigo) codigosComServico.add(codigo);

    const flag = normalizarFlagServico(obterValorPrimeiro(row, ['PRODUTIVO', 'PRODUTIVOS']));
    if (flag === 'SIM') servicosProdutivos += 1;
    if (flag === 'NAO') servicosImprodutivos += 1;
  });

  const totalEfetiva = codigosComServico.size || codigosEquipes.size;
  const servicosDesignados = controleRows.length;
  const servicosExecutados = servicosProdutivos + servicosImprodutivos;
  const baseSemServico = codigosEquipes.size ? codigosEquipes : codigosComServico;
  const semServico = Array.from(baseSemServico).filter((codigo) => !codigosComServico.has(codigo)).length;
  const percImprodutivo = servicosExecutados > 0 ? (servicosImprodutivos / servicosExecutados) * 100 : 0;
  const mediaServicoPorEqp = totalEfetiva > 0 ? servicosDesignados / totalEfetiva : 0;

  return {
    totalEfetiva,
    servicosDesignados,
    servicosExecutados,
    servicosProdutivos,
    servicosImprodutivos,
    percImprodutivo,
    mediaServicoPorEqp,
    semServico
  };
}

function horaFolhaParaMinutos(value) {
  if (value == null || value === '') return Number.NaN;
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return (value.getHours() * 60) + value.getMinutes();
  }
  const texto = String(value || '').trim();
  const match = texto.match(/(\d{1,2}):(\d{2})/);
  if (!match) return Number.NaN;
  return (Number(match[1]) * 60) + Number(match[2]);
}

function minutosParaHoraFolha(minutos) {
  if (!Number.isFinite(minutos)) return '-';
  const total = Math.max(0, Math.round(minutos));
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

function formatarDiferencaMinutos(minutos) {
  if (!Number.isFinite(minutos)) return '-';
  return `${formatInt(Math.max(0, Math.round(minutos)))} min`;
}

function obterHorariosJornadaFolha(row) {
  const jornada = String(obterValorPrimeiro(row, ['JORNADA']) || '');
  const horarios = [...jornada.matchAll(/(\d{1,2}):(\d{2})/g)].map((match) => (Number(match[1]) * 60) + Number(match[2]));
  if (horarios.length < 2) return { inicio: Number.NaN, fim: Number.NaN };

  const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
  const data = dataIso ? new Date(`${dataIso}T00:00:00`) : null;
  const ehSexta = data && data.getDay() === 5;

  return {
    inicio: horarios[0],
    fim: ehSexta && horarios.length >= 4 ? horarios[3] : horarios[1]
  };
}

function calcularJornadaTrabalho(rowsReport = [], folhaRows = []) {
  const codigosReport = obterCodigosReportRows(rowsReport);
  const folhaFiltrada = codigosReport.size
    ? folhaRows.filter((row) => codigosReport.has(String(obterValorPrimeiro(row, ['COD_EQUIPE']) || '').trim()))
    : folhaRows;

  let atraso = 0;
  let saidaAntecipada = 0;
  let absenteismo = 0;
  let horaExtra = 0;

  folhaFiltrada.forEach((row) => {
    const entrada = horaFolhaParaMinutos(obterValorPrimeiro(row, ['HORA_ENTRADA_D']));
    const saida = horaFolhaParaMinutos(obterValorPrimeiro(row, ['HORA_SAIDA_D']));
    const extraEntrada = horaFolhaParaMinutos(obterValorPrimeiro(row, ['HORA_EXTRA_ENTRADA_D']));
    const extraSaida = horaFolhaParaMinutos(obterValorPrimeiro(row, ['HORA_EXTRA_SAIDA_D']));
    const jornada = obterHorariosJornadaFolha(row);
    const codMotFalta = String(obterValorPrimeiro(row, ['COD_MOT_FALTA']) || '').trim();
    const motivoFalta = String(obterValorPrimeiro(row, ['MOTIVO_FALTA']) || '').trim();

    if (Number.isFinite(entrada) && Number.isFinite(jornada.inicio) && (entrada - jornada.inicio) > LIMITE_ATRASO_MINUTOS) atraso += 1;
    if (Number.isFinite(saida) && Number.isFinite(jornada.fim) && saida < jornada.fim) saidaAntecipada += 1;
    if (codMotFalta || motivoFalta) absenteismo += 1;
    if (Number.isFinite(extraEntrada) || Number.isFinite(extraSaida)) horaExtra += 1;
  });

  return {
    totalEfetiva: codigosReport.size,
    atraso,
    saidaAntecipada,
    absenteismo,
    horaExtra
  };
}

function obterRowsAbsenteismo(rowsReport = filtrarReportRowsAndon(), folhaRows = filtrarFolhaPontoRowsAndon()) {
  const codigosReport = obterCodigosReportRows(rowsReport);
  return folhaRows
    .filter((row) => {
      const codigoEquipe = String(obterValorPrimeiro(row, ['COD_EQUIPE']) || '').trim();
      if (codigosReport.size && !codigosReport.has(codigoEquipe)) return false;

      const codMotFalta = String(obterValorPrimeiro(row, ['COD_MOT_FALTA']) || '').trim();
      const motivoFalta = String(obterValorPrimeiro(row, ['MOTIVO_FALTA']) || '').trim();
      return Boolean(codMotFalta || motivoFalta);
    })
    .sort((a, b) => {
      const dataA = normalizarDataIso(obterValorPrimeiro(a, ['DATA', 'Data']));
      const dataB = normalizarDataIso(obterValorPrimeiro(b, ['DATA', 'Data']));
      if (dataA !== dataB) return dataA.localeCompare(dataB);
      return String(obterValorPrimeiro(a, ['NOME_FUNCIONARIO']) || '').localeCompare(
        String(obterValorPrimeiro(b, ['NOME_FUNCIONARIO']) || ''),
        'pt-BR',
        { sensitivity: 'base' }
      );
    });
}

function obterMapaSupervisorPorEquipe(rowsReport = filtrarReportRowsAndon()) {
  const mapa = new Map();
  rowsReport.forEach((row) => {
    const codigo = String(obterCodigoEquipeLinha(row) || '').trim();
    if (!codigo || mapa.has(codigo)) return;
    mapa.set(codigo, String(obterValorPrimeiro(row, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR']) || '-').trim() || '-');
  });
  return mapa;
}

function obterResumoReincidenciaAbsenteismo(rows = []) {
  const contagemPorFuncionario = new Map();
  rows.forEach((row) => {
    const codigoFunc = String(obterValorPrimeiro(row, ['COD_FUNC']) || '').trim();
    if (!codigoFunc) return;
    contagemPorFuncionario.set(codigoFunc, (contagemPorFuncionario.get(codigoFunc) || 0) + 1);
  });

  const qtdReincidentes = Array.from(contagemPorFuncionario.values()).filter((total) => total > 1).length;
  const ocorrenciasReincidentes = rows.filter((row) => {
    const codigoFunc = String(obterValorPrimeiro(row, ['COD_FUNC']) || '').trim();
    return codigoFunc && (contagemPorFuncionario.get(codigoFunc) || 0) > 1;
  }).length;

  return {
    contagemPorFuncionario,
    qtdReincidentes,
    ocorrenciasReincidentes
  };
}

function obterRowsJornadaOcorrencia(tipo, rowsReport = filtrarReportRowsAndon(), folhaRows = filtrarFolhaPontoRowsAndon()) {
  const codigosReport = obterCodigosReportRows(rowsReport);
  return folhaRows
    .map((row) => {
      const codigoEquipe = String(obterValorPrimeiro(row, ['COD_EQUIPE']) || '').trim();
      if (codigosReport.size && !codigosReport.has(codigoEquipe)) return null;

      const jornada = obterHorariosJornadaFolha(row);
      const entrada = horaFolhaParaMinutos(obterValorPrimeiro(row, ['HORA_ENTRADA_D']));
      const saida = horaFolhaParaMinutos(obterValorPrimeiro(row, ['HORA_SAIDA_D']));

      if (tipo === 'atraso') {
        if (!Number.isFinite(entrada) || !Number.isFinite(jornada.inicio) || (entrada - jornada.inicio) <= LIMITE_ATRASO_MINUTOS) return null;
        return {
          row,
          horaEntrada: entrada,
          previsto: jornada.inicio,
          registrado: entrada,
          diferenca: entrada - jornada.inicio
        };
      }

      if (!Number.isFinite(saida) || !Number.isFinite(jornada.fim) || saida >= jornada.fim) return null;
      return {
        row,
        horaEntrada: entrada,
        previsto: jornada.fim,
        registrado: saida,
        diferenca: jornada.fim - saida
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      const dataA = normalizarDataIso(obterValorPrimeiro(a.row, ['DATA', 'Data']));
      const dataB = normalizarDataIso(obterValorPrimeiro(b.row, ['DATA', 'Data']));
      if (dataA !== dataB) return dataA.localeCompare(dataB);
      if (b.diferenca !== a.diferenca) return b.diferenca - a.diferenca;
      return String(obterValorPrimeiro(a.row, ['NOME_FUNCIONARIO']) || '').localeCompare(
        String(obterValorPrimeiro(b.row, ['NOME_FUNCIONARIO']) || ''),
        'pt-BR',
        { sensitivity: 'base' }
      );
    });
}

function abrirModalJornadaOcorrencia(tipo, options = {}) {
  if (!equipesModal || !equipesModalBody) return;

  const rows = obterRowsJornadaOcorrencia(
    tipo,
    Array.isArray(options.reportRows) ? options.reportRows : filtrarReportRowsComInicioJornada(filtrarReportRowsAndon()),
    Array.isArray(options.folhaRows) ? options.folhaRows : filtrarFolhaPontoRowsAndon()
  );
  const tituloPadrao = tipo === 'atraso' ? 'Atraso' : 'Saída Antecipada';

  aplicarModalTelaCheia(true);
  renderCabecalhoModalJornadaOcorrencia(tipo);
  if (equipesModalTitle) equipesModalTitle.textContent = options.title || tituloPadrao;
  if (equipesModalMeta) {
    equipesModalMeta.textContent = options.meta || `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Registros: ${formatInt(rows.length)}`;
  }

  if (!rows.length) {
    equipesModalBody.innerHTML = `<tr><td colspan="${tipo === 'saida-antecipada' ? 10 : 9}" class="andon-modal-empty">Nenhum registro encontrado.</td></tr>`;
  } else {
    equipesModalBody.innerHTML = rows.map((item) => {
      const row = item.row;
      const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
      const dataTxt = dataIso ? dataIso.split('-').reverse().join('/') : '-';
      const codigoEquipe = String(obterValorPrimeiro(row, ['COD_EQUIPE']) || '-').trim();
      const equipe = String(obterValorPrimeiro(row, ['NOME_EQUIPE']) || '-').trim();
      const codigoFunc = String(obterValorPrimeiro(row, ['COD_FUNC']) || '-').trim();
      const funcionario = String(obterValorPrimeiro(row, ['NOME_FUNCIONARIO']) || '-').trim();
      const jornada = String(obterValorPrimeiro(row, ['JORNADA']) || '-').trim();

      return `
        <tr>
          <td>${dataTxt}</td>
          <td>${codigoEquipe || '-'}</td>
          <td>${equipe || '-'}</td>
          <td>${codigoFunc || '-'}</td>
          <td>${funcionario || '-'}</td>
          <td>${jornada || '-'}</td>
          ${tipo === 'saida-antecipada' ? `<td>${minutosParaHoraFolha(item.horaEntrada)}</td>` : ''}
          <td>${minutosParaHoraFolha(item.previsto)}</td>
          <td>${minutosParaHoraFolha(item.registrado)}</td>
          <td>${formatarDiferencaMinutos(item.diferenca)}</td>
        </tr>
      `;
    }).join('');
  }

  equipesModal.classList.remove('hidden');
}

function abrirModalAbsenteismo(options = {}) {
  if (!equipesModal || !equipesModalBody) return;
  aplicarModalTelaCheia(true);

  const reportRows = Array.isArray(options.reportRows) ? options.reportRows : filtrarReportRowsComInicioJornada(filtrarReportRowsAndon());

  const rows = obterRowsAbsenteismo(
    reportRows,
    Array.isArray(options.folhaRows) ? options.folhaRows : filtrarFolhaPontoRowsAndon()
  );
  const mapaSupervisor = obterMapaSupervisorPorEquipe(reportRows);
  const reincidencia = obterResumoReincidenciaAbsenteismo(rows);

  renderCabecalhoModalAbsenteismo();
  if (equipesModalTitle) equipesModalTitle.textContent = options.title || 'Absenteísmo';
  if (equipesModalMeta) {
    const metaBase = options.meta || `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'}`;
    equipesModalMeta.textContent = `${metaBase} | Registros: ${formatInt(rows.length)} | Reincidentes: ${formatInt(reincidencia.qtdReincidentes)} | Ocorrências reincidentes: ${formatInt(reincidencia.ocorrenciasReincidentes)}`;
  }

  if (!rows.length) {
    equipesModalBody.innerHTML = `<tr><td colspan="9" class="andon-modal-empty">Nenhum registro de absenteísmo encontrado.</td></tr>`;
  } else {
    equipesModalBody.innerHTML = rows.map((row) => {
      const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
      const dataTxt = dataIso ? dataIso.split('-').reverse().join('/') : '-';
      const codigoEquipe = String(obterValorPrimeiro(row, ['COD_EQUIPE']) || '-').trim();
      const supervisor = mapaSupervisor.get(codigoEquipe) || '-';
      const equipe = String(obterValorPrimeiro(row, ['NOME_EQUIPE']) || '-').trim();
      const codigoFunc = String(obterValorPrimeiro(row, ['COD_FUNC']) || '-').trim();
      const funcionario = String(obterValorPrimeiro(row, ['NOME_FUNCIONARIO']) || '-').trim();
      const codMotivo = String(obterValorPrimeiro(row, ['COD_MOT_FALTA']) || '-').trim();
      const motivo = String(obterValorPrimeiro(row, ['MOTIVO_FALTA']) || '-').trim();
      const totalReincidencia = codigoFunc && codigoFunc !== '-'
        ? (reincidencia.contagemPorFuncionario.get(codigoFunc) || 0)
        : 0;
      const textoReincidencia = totalReincidencia > 1 ? `${formatInt(totalReincidencia)} vezes` : '1 vez';

      return `
        <tr>
          <td>${dataTxt}</td>
          <td>${supervisor || '-'}</td>
          <td>${codigoEquipe || '-'}</td>
          <td>${equipe || '-'}</td>
          <td>${codigoFunc || '-'}</td>
          <td>${funcionario || '-'}</td>
          <td>${codMotivo || '-'}</td>
          <td>${motivo || '-'}</td>
          <td>${textoReincidencia}</td>
        </tr>
      `;
    }).join('');
  }

  equipesModal.classList.remove('hidden');
}

function obterRowsControleServicoPorTipo(tipo = 'todos') {
  const controleRows = filtrarControleRowsAndon();

  if (tipo === 'produtivos') {
    return controleRows.filter((row) => normalizarFlagServico(obterValorPrimeiro(row, ['PRODUTIVO', 'PRODUTIVOS'])) === 'SIM');
  }
  if (tipo === 'improdutivos') {
    return controleRows.filter((row) => normalizarFlagServico(obterValorPrimeiro(row, ['PRODUTIVO', 'PRODUTIVOS'])) === 'NAO');
  }
  if (tipo === 'executados') {
    return controleRows.filter((row) => ['SIM', 'NAO'].includes(normalizarFlagServico(obterValorPrimeiro(row, ['PRODUTIVO', 'PRODUTIVOS']))));
  }
  return controleRows;
}

function abrirModalControleServico(tipo = 'todos', title = 'Serviços') {
  const rows = obterRowsControleServicoPorTipo(tipo);
  abrirModalTabelaGenerica({
    title,
    meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Registros: ${formatInt(rows.length)}`,
    columns: [
      { label: 'Data Atualização', value: (row) => String(obterValorPrimeiro(row, ['DATA_ATUALIZACAO', 'DATA ATUALIZACAO']) || '-') },
      { label: 'U.O.', value: (row) => String(obterValorPrimeiro(row, ['COD_UO', 'UO']) || '-') },
      { label: 'Cód. Equipe', value: (row) => String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '-') },
      { label: 'Equipe', value: (row) => String(obterValorPrimeiro(row, ['NOME', 'NOME_EQUIPE']) || '-') },
      { label: 'Serviço', value: (row) => String(obterValorPrimeiro(row, ['NUM_SERVICO', 'SERVICO']) || '-') },
      { label: 'Tipo Serviço', value: (row) => String(obterValorPrimeiro(row, ['TIPO_SERVICO']) || '-') },
      { label: 'Situação', value: (row) => String(obterValorPrimeiro(row, ['SITUACAO']) || '-') },
      { label: 'Produtivo', value: (row) => normalizarFlagServico(obterValorPrimeiro(row, ['PRODUTIVO', 'PRODUTIVOS'])) || '-' },
      { label: 'US Prev.', value: (row) => formatNumber3(toNumberSafe(obterValorPrimeiro(row, ['US_PREV', 'US PREV']))) },
      { label: 'US Exec.', value: (row) => formatNumber3(toNumberSafe(obterValorPrimeiro(row, ['US_EXEC', 'US EXEC']))) },
      { label: 'Designação', value: (row) => obterHoraTexto(obterValorPrimeiro(row, ['DATA_DESIGNACAO', 'DESIGNACAO', 'DATA DESIGNACAO'])) },
      { label: 'Acionamento', value: (row) => obterHoraTexto(obterValorPrimeiro(row, ['DATA_ACIONAMENTO', 'ACIONAMENTO', 'DATA ACIONAMENTO'])) },
      { label: 'Localização', value: (row) => obterHoraTexto(obterValorPrimeiro(row, ['DATA_LOCALIZACAO', 'LOCALIZACAO'])) },
      { label: 'Término', value: (row) => obterHoraTexto(obterValorPrimeiro(row, ['DATA_TERMINO_REAL', 'ENCERRAMENTO', 'DATA_TERMINO'])) }
    ]
  });
}

async function obterRowsControleServicoModalDireto(tipo = 'todos') {
  const periodo = obterPeriodoFiltroAndon();
  const params = new URLSearchParams();
  if (periodo.inicio) params.set('dataInicio', periodo.inicio);
  if (periodo.fim) params.set('dataFim', periodo.fim);
  if (headerSelectedUo) params.set('uo', String(headerSelectedUo).replace(/[^\d]/g, ''));
  const usarDataTermino = tipo === 'improdutivos';
  if (usarDataTermino) params.set('dataRef', 'termino');
  params.set('limit', usarDataTermino ? '200000' : '50000');

  try {
    const resp = await fetch(`/api/controle-servico?${params.toString()}`, { cache: 'no-store' });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const payload = await resp.json().catch(() => ({}));
    const rowsApi = Array.isArray(payload && payload.rows) ? payload.rows : [];
    const codigosSupervisor = headerSelectedSupervisor ? obterCodigosEquipesUoAtual() : null;
    const rows = codigosSupervisor
      ? rowsApi.filter((row) => codigosSupervisor.has(obterCodigoEquipeControle(row)))
      : rowsApi;
    andonControleRows = rows;
    andonControleLoadedKey = obterChavePeriodoFiltroAndon();
    limparCacheAndon();
    if (tipo !== 'improdutivos') {
      atualizarCardsEficiencia();
    }

    if (tipo === 'produtivos') {
      return rows.filter((row) => normalizarFlagServico(obterValorPrimeiro(row, ['PRODUTIVO', 'PRODUTIVOS'])) === 'SIM');
    }
    if (tipo === 'improdutivos') {
      return rows.filter((row) => normalizarFlagServico(obterValorPrimeiro(row, ['PRODUTIVO', 'PRODUTIVOS'])) === 'NAO');
    }
    if (tipo === 'executados') {
      return rows.filter((row) => ['SIM', 'NAO'].includes(normalizarFlagServico(obterValorPrimeiro(row, ['PRODUTIVO', 'PRODUTIVOS']))));
    }
    return rows;
  } catch (error) {
    console.error('Erro ao buscar controle_servico para modal:', error);
    return obterRowsControleServicoPorTipo(tipo);
  }
}

function obterCodigoEquipeControle(row) {
  return String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '').trim();
}

function obterNomeEquipeControle(row) {
  return String(obterValorPrimeiro(row, ['NOME', 'NOME_EQUIPE', 'EQUIPE']) || '-').trim() || '-';
}

function obterUoControle(row) {
  return String(obterValorPrimeiro(row, ['COD_UO', 'UO']) || '-').trim() || '-';
}

function obterResumoServicoEquipeControle(rows = []) {
  let primeiroAtendimentoMin = Infinity;
  let ultimoAtendimentoMin = -Infinity;
  let primeiroAtendimento = '-';
  let ultimoAtendimento = '-';
  let produtivos = 0;
  let improdutivos = 0;

  rows.forEach((row) => {
    const flag = normalizarFlagServico(obterValorPrimeiro(row, ['PRODUTIVO', 'PRODUTIVOS']));
    if (flag === 'SIM') produtivos += 1;
    if (flag === 'NAO') improdutivos += 1;

    const acionamento = obterHoraTexto(obterValorPrimeiro(row, ['DATA_ACIONAMENTO', 'ACIONAMENTO', 'DATA ACIONAMENTO']));
    const acionamentoMin = horaParaMinutos(acionamento);
    if (Number.isFinite(acionamentoMin) && acionamentoMin < primeiroAtendimentoMin) {
      primeiroAtendimentoMin = acionamentoMin;
      primeiroAtendimento = acionamento;
    }

    const fim = obterHoraTexto(obterReferenciaFinalServico(row));
    const fimMin = horaParaMinutos(fim);
    if (Number.isFinite(fimMin) && fimMin > ultimoAtendimentoMin) {
      ultimoAtendimentoMin = fimMin;
      ultimoAtendimento = fim;
    }
  });

  return {
    servicos: rows.length,
    produtivos,
    improdutivos,
    percImpedimento: rows.length ? (improdutivos / rows.length) * 100 : 0,
    usPrev: rows.reduce((acc, row) => acc + toNumberSafe(obterValorPrimeiro(row, ['US_PREV', 'US PREV'])), 0),
    usExec: rows.reduce((acc, row) => acc + toNumberSafe(obterValorPrimeiro(row, ['US_EXEC', 'US EXEC'])), 0),
    primeiroAtendimento,
    ultimoAtendimento
  };
}

function obterDataTerminoControleLinha(row) {
  return normalizarDataIso(obterReferenciaFinalServico(row));
}

function montarLinhasControleServicoPorEquipe(rows = [], obterSupervisorControle = () => '-', obterDataLinha = obterDataAtualizacaoControleLinha) {
  const mapa = new Map();

  rows.forEach((row) => {
    const codigo = obterCodigoEquipeControle(row);
    if (!codigo) return;
    const dataIso = obterDataLinha(row);
    const atual = mapa.get(codigo) || {
      codigo,
      uo: obterUoControle(row),
      supervisor: obterSupervisorControle(row),
      equipe: obterNomeEquipeControle(row),
      datas: [],
      rows: []
    };

    if (dataIso && !atual.datas.includes(dataIso)) atual.datas.push(dataIso);
    if (!atual.supervisor || atual.supervisor === '-') atual.supervisor = obterSupervisorControle(row);
    if (!atual.equipe || atual.equipe === '-') atual.equipe = obterNomeEquipeControle(row);
    if (!atual.uo || atual.uo === '-') atual.uo = obterUoControle(row);
    atual.rows.push(row);
    mapa.set(codigo, atual);
  });

  return Array.from(mapa.values()).map((item) => {
    const resumo = obterResumoServicoEquipeControle(item.rows);
    const datas = Array.from(new Set(item.datas.map((data) => normalizarDataIso(data)).filter(Boolean))).sort();
    return {
      ...item,
      datas,
      data: formatarSequenciaDatasAndon(datas),
      diasTrabalhados: contarDiasTrabalhadosAndon(datas),
      ...resumo
    };
  }).sort((a, b) => {
    const dataA = a.datas[0] || '';
    const dataB = b.datas[0] || '';
    const diffData = dataA.localeCompare(dataB);
    if (diffData !== 0) return diffData;
    return String(a.equipe || '').localeCompare(String(b.equipe || ''), 'pt-BR', { sensitivity: 'base' });
  });
}

function obterColunasControleServicoDetalhe(obterSupervisorControle = () => '-') {
  return [
    { label: 'Datas', value: (row) => formatarDataBrAndon(obterDataAtualizacaoControleLinha(row)) },
    { label: 'Dias Trab.', value: () => '1' },
    { label: 'U.O.', value: (row) => obterUoControle(row) },
    { label: 'Supervisor', value: obterSupervisorControle },
    { label: 'Cod. Equipe', value: (row) => obterCodigoEquipeControle(row) || '-' },
    { label: 'Equipe', value: (row) => obterNomeEquipeControle(row) },
    { label: 'Servico', value: (row) => String(obterValorPrimeiro(row, ['NUM_SERVICO', 'SERVICO']) || '-') },
    { label: 'Tipo Servico', value: (row) => String(obterValorPrimeiro(row, ['TIPO_SERVICO']) || '-') },
    { label: 'Situacao', value: (row) => String(obterValorPrimeiro(row, ['SITUACAO']) || '-') },
    { label: 'Produtivo', value: (row) => normalizarFlagServico(obterValorPrimeiro(row, ['PRODUTIVO', 'PRODUTIVOS'])) || '-' },
    { label: 'COD. ATIV.', value: (row) => String(obterValorPrimeiro(row, ['COD_ATIV', 'COD. ATIV.', 'COD_ATIVIDADE']) || '-') },
    { label: 'US Prev.', value: (row) => formatNumber3(toNumberSafe(obterValorPrimeiro(row, ['US_PREV', 'US PREV']))) },
    { label: 'US Exec.', value: (row) => formatNumber3(toNumberSafe(obterValorPrimeiro(row, ['US_EXEC', 'US EXEC']))) },
    { label: 'Designacao', value: (row) => obterHoraTexto(obterValorPrimeiro(row, ['DATA_DESIGNACAO', 'DESIGNACAO', 'DATA DESIGNACAO'])) },
    { label: 'Lancamento Lote', value: (row) => obterHoraTexto(obterValorPrimeiro(row, ['DATA_LANCAMENTO_LOTE', 'LANCAMENTO_LOTE', 'LANCAMENTO LOTE', 'DATA_LANCAMENTO'])) || '-' },
    { label: 'Acionamento', value: (row) => obterHoraTexto(obterValorPrimeiro(row, ['DATA_ACIONAMENTO', 'ACIONAMENTO', 'DATA ACIONAMENTO'])) },
    { label: 'Localizacao', value: (row) => obterHoraTexto(obterValorPrimeiro(row, ['DATA_LOCALIZACAO', 'LOCALIZACAO'])) },
    { label: 'Termino', value: (row) => obterHoraTexto(obterValorPrimeiro(row, ['DATA_TERMINO_REAL', 'ENCERRAMENTO', 'DATA_TERMINO'])) },
    { label: 'AREA', value: (row) => String(obterValorPrimeiro(row, ['AREA', 'TIPO_AREA', 'TIPO AREA']) || '-') }
  ];
}

function renderizarRodapeControleServicoPorEquipe(rows = []) {
  removerRodapeModalEquipes();
  if (!equipesModal || !rows.length) return;
  const table = equipesModal.querySelector('.andon-modal-table');
  if (!table) return;
  const datas = rows.flatMap((row) => row.datas || []).map(normalizarDataIso).filter(Boolean).sort();
  const primeiraData = datas.length ? formatarDataBrAndon(datas[0]) : '-';
  const ultimaData = datas.length ? formatarDataBrAndon(datas[datas.length - 1]) : '-';
  const dias = rows.reduce((acc, row) => acc + Number(row.diasTrabalhados || 0), 0);
  const servicos = rows.reduce((acc, row) => acc + Number(row.servicos || 0), 0);
  const produtivos = rows.reduce((acc, row) => acc + Number(row.produtivos || 0), 0);
  const improdutivos = rows.reduce((acc, row) => acc + Number(row.improdutivos || 0), 0);
  const usPrev = rows.reduce((acc, row) => acc + Number(row.usPrev || 0), 0);
  const usExec = rows.reduce((acc, row) => acc + Number(row.usExec || 0), 0);
  const perc = servicos ? (improdutivos / servicos) * 100 : 0;
  const supervisor = obterTextoAgrupadoRodapeModalEquipes(rows, 'supervisor');
  const equipe = obterTextoAgrupadoRodapeModalEquipes(rows, 'equipe');

  table.insertAdjacentHTML('beforeend', `
    <tfoot class="andon-modal-footer-summary">
      <tr>
        <td>${primeiraData === ultimaData ? primeiraData : `${primeiraData} a ${ultimaData}`}</td>
        <td>${formatInt(dias)}</td>
        <td>TODAS</td>
        <td>${supervisor}</td>
        <td>TODOS</td>
        <td>${equipe}</td>
        <td>${formatInt(servicos)}</td>
        <td>${formatInt(produtivos)}</td>
        <td>${formatInt(improdutivos)}</td>
        <td>${formatPercent(perc)}</td>
        <td>${formatNumber3(usPrev)}</td>
        <td>${formatNumber3(usExec)}</td>
        <td>-</td>
        <td>-</td>
      </tr>
    </tfoot>
  `);
}

function formatarMediaHoraControle(rows = [], keys = []) {
  return formatHoraMedia(mediaNumericaAndon(
    rows
      .map((row) => horaParaMinutos(obterHoraTexto(obterValorPrimeiro(row, keys))))
      .filter((valor) => Number.isFinite(valor))
  )).replace('--', '-');
}

function obterTextoAgrupadoControle(rows = [], getter = () => '') {
  const valores = rows.map(getter).map((valor) => String(valor || '').trim()).filter(Boolean);
  if (!valores.length) return '-';
  const unicos = new Map();
  valores.forEach((valor) => {
    const chave = normalizarTextoFiltroModal(valor);
    if (!unicos.has(chave)) unicos.set(chave, valor);
  });
  return unicos.size === 1 ? Array.from(unicos.values())[0] : 'TODOS';
}

function renderizarRodapeControleServicoDetalhe(rows = [], obterSupervisorControle = () => '-') {
  removerRodapeModalEquipes();
  if (!equipesModal || !rows.length) return;
  const table = equipesModal.querySelector('.andon-modal-table');
  if (!table) return;
  const datas = rows.map(obterDataAtualizacaoControleLinha).filter(Boolean).sort();
  const datasUnicas = Array.from(new Set(datas));
  const primeiraData = datasUnicas.length ? formatarDataBrAndon(datasUnicas[0]) : '-';
  const ultimaData = datasUnicas.length ? formatarDataBrAndon(datasUnicas[datasUnicas.length - 1]) : '-';
  const servicos = rows.length;
  const usPrev = rows.reduce((acc, row) => acc + toNumberSafe(obterValorPrimeiro(row, ['US_PREV', 'US PREV'])), 0);
  const usExec = rows.reduce((acc, row) => acc + toNumberSafe(obterValorPrimeiro(row, ['US_EXEC', 'US EXEC'])), 0);

  table.insertAdjacentHTML('beforeend', `
    <tfoot class="andon-modal-footer-summary">
      <tr>
        <td>${primeiraData === ultimaData ? primeiraData : `${primeiraData} a ${ultimaData}`}</td>
        <td>${formatInt(datasUnicas.length)}</td>
        <td>${obterTextoAgrupadoControle(rows, obterUoControle)}</td>
        <td>${obterTextoAgrupadoControle(rows, obterSupervisorControle)}</td>
        <td>${obterTextoAgrupadoControle(rows, obterCodigoEquipeControle)}</td>
        <td>${obterTextoAgrupadoControle(rows, obterNomeEquipeControle)}</td>
        <td>${formatInt(servicos)}</td>
        <td>TODOS</td>
        <td>TODOS</td>
        <td>${obterTextoAgrupadoControle(rows, (row) => normalizarFlagServico(obterValorPrimeiro(row, ['PRODUTIVO', 'PRODUTIVOS'])) || '-')}</td>
        <td>TODOS</td>
        <td>${formatNumber3(usPrev)}</td>
        <td>${formatNumber3(usExec)}</td>
        <td>${formatarMediaHoraControle(rows, ['DATA_DESIGNACAO', 'DESIGNACAO', 'DATA DESIGNACAO'])}</td>
        <td>${formatarMediaHoraControle(rows, ['DATA_LANCAMENTO_LOTE', 'LANCAMENTO_LOTE', 'LANCAMENTO LOTE', 'DATA_LANCAMENTO'])}</td>
        <td>${formatarMediaHoraControle(rows, ['DATA_ACIONAMENTO', 'ACIONAMENTO', 'DATA ACIONAMENTO'])}</td>
        <td>${formatarMediaHoraControle(rows, ['DATA_LOCALIZACAO', 'LOCALIZACAO'])}</td>
        <td>${formatarMediaHoraControle(rows, ['DATA_TERMINO_REAL', 'ENCERRAMENTO', 'DATA_TERMINO'])}</td>
        <td>${obterTextoAgrupadoControle(rows, (row) => String(obterValorPrimeiro(row, ['AREA', 'TIPO_AREA', 'TIPO AREA']) || '-'))}</td>
      </tr>
    </tfoot>
  `);
}

function abrirModalControleServicoDetalheDias(detalhe) {
  if (!detalhe || !detalhe.item) return;
  const codigo = String(detalhe.item.codigo || '').trim();
  const datas = new Set((detalhe.item.datas || []).map(normalizarDataIso).filter(Boolean));
  if (!codigo || !datas.size) return;

  const obterDataLinha = detalhe.obterDataLinha || obterDataAtualizacaoControleLinha;
  const rowsEquipe = (Array.isArray(detalhe.rows) ? detalhe.rows : [])
    .filter((row) => obterCodigoEquipeControle(row) === codigo && datas.has(obterDataLinha(row)))
    .sort((a, b) => {
      const dataA = obterDataLinha(a);
      const dataB = obterDataLinha(b);
      if (dataA !== dataB) return dataA.localeCompare(dataB);
      return obterHoraTexto(obterValorPrimeiro(a, ['DATA_ATUALIZACAO', 'DATA_ATUALIZACAO_D', 'DATA ATUALIZACAO']))
        .localeCompare(obterHoraTexto(obterValorPrimeiro(b, ['DATA_ATUALIZACAO', 'DATA_ATUALIZACAO_D', 'DATA ATUALIZACAO'])));
    });

  aplicarModalTelaCheia(true);
  const columns = obterColunasControleServicoDetalhe(detalhe.obterSupervisorControle);
  renderCabecalhoModalGenerico(columns);
  equipesModal?.classList.add('andon-modal-controle-servico', 'andon-modal-controle-agregado', 'andon-modal-detalhe-datas');
  if (equipesModalTitle) equipesModalTitle.textContent = `Dias Trabalhados - ${detalhe.item.equipe || codigo}`;
  if (equipesModalMeta) equipesModalMeta.textContent = `Equipe: ${detalhe.item.equipe || '-'} | Datas: ${formatInt(datas.size)} | Origem: ${detalhe.tituloOrigem || '-'}`;
  configurarBotaoVoltarModalEquipes({
    tipoContexto: 'controle-servico',
    tipo: detalhe.tipo || 'improdutivos',
    title: detalhe.tituloOrigem || 'Impedimento',
    options: {
      agruparPorEquipe: true,
      modalFiltros: detalhe.filtrosOrigem || null
    }
  });
  renderizarModalTabelaPaginada(rowsEquipe, columns, 'Nenhum registro de impedimento encontrado para esta equipe.');
  renderizarRodapeControleServicoDetalhe(rowsEquipe, detalhe.obterSupervisorControle);
  equipesModal.classList.remove('hidden');
  inserirResumoControleServicoModal(rowsEquipe);
}

async function abrirModalControleServicoModelo(tipo = 'todos', title = 'Servicos', options = {}) {
  if (!equipesModal || !equipesModalBody) return;
  const rows = await obterRowsControleServicoModalDireto(tipo);
  const mapaSupervisor = obterMapaSupervisorPorEquipe(filtrarReportRowsAndon());
  const obterSupervisorControle = (row) => {
    const codigo = String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '').trim();
    return mapaSupervisor.get(codigo) || String(obterValorPrimeiro(row, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR', 'SUPERVISOR_EQUIPE']) || '-').trim() || '-';
  };

  const usarAgrupadoImpedimento = options.agruparPorEquipe || normalizarTextoFiltroModal(title) === 'IMPEDIMENTO';
  if (usarAgrupadoImpedimento) {
    const usarDadosTermino = title.toLowerCase() === 'impedimento' || tipo === 'improdutivos';
    const lista = montarLinhasControleServicoPorEquipe(
      rows,
      obterSupervisorControle,
      usarDadosTermino ? obterDataTerminoControleLinha : obterDataAtualizacaoControleLinha
    );
    modalDetalheEquipesDias = new Map();
    lista.forEach((item, index) => {
      const detalheId = `controle-dias-${Date.now()}-${index}`;
      item.detalheDiasId = detalheId;
      modalDetalheEquipesDias.set(detalheId, {
        tipoDetalhe: 'controle-servico',
        tipo,
        item,
        rows,
        obterSupervisorControle,
        obterDataLinha: usarDadosTermino ? obterDataTerminoControleLinha : obterDataAtualizacaoControleLinha,
        tituloOrigem: title
      });
    });

    const columns = [
      {
        label: 'Datas',
        value: (row) => row.data || '-',
        className: 'andon-modal-datas',
        attrs: (row) => `title="${row.data || '-'}"`
      },
      {
        label: 'Dias Trab.',
        value: (row) => formatInt(row.diasTrabalhados || 0),
        className: 'andon-dias-trab-cell',
        attrs: (row) => `data-dias-id="${row.detalheDiasId || ''}"`,
        render: (row) => Number(row.diasTrabalhados || 0) > 0
          ? `<button class="andon-dias-trab-btn" type="button" data-dias-id="${row.detalheDiasId}">${formatInt(row.diasTrabalhados || 0)}</button>`
          : formatInt(row.diasTrabalhados || 0)
      },
      { label: 'U.O.', value: (row) => row.uo || '-' },
      { label: 'Supervisor', value: (row) => row.supervisor || '-' },
      { label: 'Cod. Equipe', value: (row) => row.codigo || '-' },
      { label: 'Equipe', value: (row) => row.equipe || '-' },
      { label: 'Servicos', value: (row) => formatInt(row.servicos || 0) },
      { label: 'Produtivos', value: (row) => formatInt(row.produtivos || 0) },
      { label: 'Improdutivos', value: (row) => formatInt(row.improdutivos || 0) },
      { label: '% Impedimento', value: (row) => formatPercent(row.percImpedimento || 0) },
      { label: 'US Prev.', value: (row) => formatNumber3(row.usPrev || 0) },
      { label: 'US Exec.', value: (row) => formatNumber3(row.usExec || 0) },
      { label: '1 Atendimento', value: (row) => row.primeiroAtendimento || '-' },
      { label: 'Ultimo Atendimento', value: (row) => row.ultimoAtendimento || '-' }
    ];

    aplicarModalTelaCheia(true);
    renderCabecalhoModalGenerico(columns);
    equipesModal.classList.add('andon-modal-controle-servico', 'andon-modal-controle-agregado');
    equipesModal.classList.remove('andon-modal-detalhe-datas');
    if (equipesModalTitle) equipesModalTitle.textContent = title;
    if (equipesModalMeta) equipesModalMeta.textContent = `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes: ${formatInt(lista.length)} | Registros: ${formatInt(rows.length)}`;
    configurarBotaoVoltarModalEquipes(null);
    renderizarModalTabelaPaginada(lista, columns, 'Nenhuma equipe com impedimento encontrada.');
    renderizarRodapeControleServicoPorEquipe(lista);
    restaurarFiltrosModalQuandoPronto(options.modalFiltros || null);
    equipesModal.classList.remove('hidden');
    inserirResumoControleServicoModal(rows);
    return;
  }

  const columns = [
    { label: 'Data Atualizacao', value: (row) => String(obterValorPrimeiro(row, ['DATA_ATUALIZACAO', 'DATA_ATUALIZACAO_D', 'DATA ATUALIZACAO']) || '-') },
    { label: 'U.O.', value: (row) => String(obterValorPrimeiro(row, ['COD_UO', 'UO']) || '-') },
    { label: 'Supervisor', value: obterSupervisorControle },
    { label: 'Cod. Equipe', value: (row) => String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '-') },
    { label: 'Equipe', value: (row) => String(obterValorPrimeiro(row, ['NOME', 'NOME_EQUIPE']) || '-') },
    { label: 'Servico', value: (row) => String(obterValorPrimeiro(row, ['NUM_SERVICO', 'SERVICO']) || '-') },
    { label: 'Tipo Servico', value: (row) => String(obterValorPrimeiro(row, ['TIPO_SERVICO']) || '-') },
    { label: 'Situacao', value: (row) => String(obterValorPrimeiro(row, ['SITUACAO']) || '-') },
    { label: 'Produtivo', value: (row) => normalizarFlagServico(obterValorPrimeiro(row, ['PRODUTIVO', 'PRODUTIVOS'])) || '-' },
    { label: 'COD. ATIV.', value: (row) => String(obterValorPrimeiro(row, ['COD_ATIV', 'COD. ATIV.', 'COD_ATIVIDADE']) || '-') },
    { label: 'US Prev.', value: (row) => formatNumber3(toNumberSafe(obterValorPrimeiro(row, ['US_PREV', 'US PREV']))) },
    { label: 'US Exec.', value: (row) => formatNumber3(toNumberSafe(obterValorPrimeiro(row, ['US_EXEC', 'US EXEC']))) },
    { label: 'Designacao', value: (row) => obterHoraTexto(obterValorPrimeiro(row, ['DATA_DESIGNACAO', 'DESIGNACAO', 'DATA DESIGNACAO'])) },
    { label: 'Lancamento Lote', value: (row) => obterHoraTexto(obterValorPrimeiro(row, ['DATA_LANCAMENTO_LOTE', 'LANCAMENTO_LOTE', 'LANCAMENTO LOTE', 'DATA_LANCAMENTO'])) || '-' },
    { label: 'Acionamento', value: (row) => obterHoraTexto(obterValorPrimeiro(row, ['DATA_ACIONAMENTO', 'ACIONAMENTO', 'DATA ACIONAMENTO'])) },
    { label: 'Localizacao', value: (row) => obterHoraTexto(obterValorPrimeiro(row, ['DATA_LOCALIZACAO', 'LOCALIZACAO'])) },
    { label: 'Termino', value: (row) => obterHoraTexto(obterValorPrimeiro(row, ['DATA_TERMINO_REAL', 'ENCERRAMENTO', 'DATA_TERMINO'])) },
    { label: 'AREA', value: (row) => String(obterValorPrimeiro(row, ['AREA', 'TIPO_AREA', 'TIPO AREA']) || '-') }
  ];

  aplicarModalTelaCheia(true);
  equipesModal.classList.remove('andon-modal-controle-agregado');
  renderCabecalhoModalGenerico(columns);
  if (equipesModalTitle) equipesModalTitle.textContent = title;
  if (equipesModalMeta) equipesModalMeta.textContent = `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Registros: ${formatInt(rows.length)}`;
  renderizarModalTabelaPaginada(rows, columns);
  restaurarFiltrosModalQuandoPronto(options.modalFiltros || null);
  equipesModal.classList.remove('hidden');
  inserirResumoControleServicoModal(rows);
}

function abrirModalResumoControleServicoPorEquipe() {
  const controleRows = filtrarControleRowsAndon();
  const mapaSupervisoresReport = new Map();
  filtrarReportRowsAndon().forEach((row) => {
    const codigo = String(obterCodigoEquipeLinha(row) || '').trim();
    if (!codigo || mapaSupervisoresReport.has(codigo)) return;
    const supervisor = String(obterValorPrimeiro(row, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR', 'SUPERVISOR_EQUIPE']) || '').trim();
    if (supervisor) mapaSupervisoresReport.set(codigo, supervisor);
  });
  const mapa = new Map();

  controleRows.forEach((row) => {
    const codigo = String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '').trim();
    if (!codigo) return;
    const supervisorRow = String(obterValorPrimeiro(row, [
      'SUPERVISOR - SETOR',
      'NOME_SUPERVISOR',
      'SUPERVISOR_EQUIPE',
      'SUPERVISOR',
      'NOME SUPERVISOR'
    ]) || '').trim();
    const item = mapa.get(codigo) || {
      codigo,
      dataIso: normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data', 'DATA_ATUALIZACAO', 'DATA_DESIGNACAO'])),
      supervisor: supervisorRow || mapaSupervisoresReport.get(codigo) || '-',
      equipe: String(obterValorPrimeiro(row, ['NOME_EQUIPE', 'NOME', 'EQUIPE']) || codigo),
      designados: 0,
      executados: 0,
      produtivos: 0,
      improdutivos: 0
    };
    const dataIsoRow = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data', 'DATA_ATUALIZACAO', 'DATA_DESIGNACAO']));
    if (dataIsoRow && (!item.dataIso || dataIsoRow < item.dataIso)) item.dataIso = dataIsoRow;
    if (!item.dataIso) item.dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data', 'DATA_ATUALIZACAO', 'DATA_DESIGNACAO']));
    if (!item.supervisor || item.supervisor === '-') {
      item.supervisor = supervisorRow || mapaSupervisoresReport.get(codigo) || '-';
    }
    if (!item.equipe || item.equipe === codigo) {
      item.equipe = String(obterValorPrimeiro(row, ['NOME_EQUIPE', 'NOME', 'EQUIPE']) || codigo);
    }
    const flag = normalizarFlagServico(obterValorPrimeiro(row, ['PRODUTIVO', 'PRODUTIVOS']));
    item.designados += 1;
    if (flag === 'SIM' || flag === 'NAO') item.executados += 1;
    if (flag === 'SIM') item.produtivos += 1;
    if (flag === 'NAO') item.improdutivos += 1;
    mapa.set(codigo, item);
  });

  const rows = Array.from(mapa.values()).sort((a, b) => {
    if (b.designados !== a.designados) return b.designados - a.designados;
    return String(a.equipe || '').localeCompare(String(b.equipe || ''), 'pt-BR', { sensitivity: 'base' });
  });

  abrirModalTabelaGenerica({
    title: 'Total de Equipes Efetiva - Eficiência',
    meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes: ${formatInt(rows.length)}`,
    rows,
    columns: [
      { label: 'DATA', value: (row) => formatarDataBrAndon(row.dataIso) },
      { label: 'SUPERVISOR', value: (row) => row.supervisor || '-' },
      { label: 'Cód. Equipe', value: (row) => row.codigo || '-' },
      { label: 'Equipe', value: (row) => row.equipe || '-' },
      { label: 'Serviços Desig.', value: (row) => formatInt(row.designados) },
      { label: 'Serviços Exec.', value: (row) => formatInt(row.executados) },
      { label: 'Produtivos', value: (row) => formatInt(row.produtivos) },
      { label: 'Improdutivos', value: (row) => formatInt(row.improdutivos) },
      { label: '% Improd.', value: (row) => row.executados > 0 ? formatPercent((row.improdutivos / row.executados) * 100) : '0,00%' }
    ]
  });
}

function abrirModalHoraExtra() {
  const reportRows = filtrarReportRowsComInicioJornada(filtrarReportRowsAndon());
  const codigos = obterCodigosReportRows(reportRows);
  const rows = filtrarFolhaPontoRowsAndon().filter((row) => {
    const codigoEquipe = String(obterValorPrimeiro(row, ['COD_EQUIPE']) || '').trim();
    if (codigos.size && !codigos.has(codigoEquipe)) return false;
    return Number.isFinite(horaFolhaParaMinutos(obterValorPrimeiro(row, ['HORA_EXTRA_ENTRADA_D'])))
      || Number.isFinite(horaFolhaParaMinutos(obterValorPrimeiro(row, ['HORA_EXTRA_SAIDA_D'])));
  });

  abrirModalTabelaGenerica({
    title: 'Hora Extra',
    meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Registros: ${formatInt(rows.length)}`,
    columns: [
      { label: 'Data', value: (row) => normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data'])).split('-').reverse().join('/') || '-' },
      { label: 'Cód. Equipe', value: (row) => String(obterValorPrimeiro(row, ['COD_EQUIPE']) || '-') },
      { label: 'Equipe', value: (row) => String(obterValorPrimeiro(row, ['NOME_EQUIPE']) || '-') },
      { label: 'Cód. Funcionário', value: (row) => String(obterValorPrimeiro(row, ['COD_FUNC']) || '-') },
      { label: 'Funcionário', value: (row) => String(obterValorPrimeiro(row, ['NOME_FUNCIONARIO']) || '-') },
      { label: 'Entrada HE', value: (row) => obterHoraTexto(obterValorPrimeiro(row, ['HORA_EXTRA_ENTRADA_D'])) },
      { label: 'Saída HE', value: (row) => obterHoraTexto(obterValorPrimeiro(row, ['HORA_EXTRA_SAIDA_D'])) }
    ]
  });
}

function abrirModalEquipesSemServico() {
  const reportRows = filtrarReportRowsAndon();
  const controleRows = filtrarControleRowsAndon();
  const codigosComServico = new Set(controleRows.map((row) => String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '').trim()).filter(Boolean));
  const rowsSemServico = reportRows.filter((row) => !codigosComServico.has(String(obterCodigoEquipeLinha(row) || '').trim()));
  abrirModalEquipesAndonContexto({
    rows: rowsSemServico,
    controleRows: [],
    title: 'Equipe sem serviço',
    meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes: ${formatInt(obterCodigosReportRows(rowsSemServico).size)}`
  });
}

async function carregarEquipesSdcaFallback() {
  const periodo = obterPeriodoFiltroAndon();
  const params = new URLSearchParams();
  if (periodo.inicio) params.set('dataInicio', periodo.inicio);
  if (periodo.fim) params.set('dataFim', periodo.fim);
  if (headerSelectedUo) params.set('uo', String(headerSelectedUo).replace(/[^\d]/g, ''));

  const resp = await fetch(`/api/sdca/equipes?${params.toString()}`, { cache: 'no-store' });
  if (!resp.ok) return [];
  const payload = await resp.json().catch(() => ({}));
  return Array.isArray(payload && payload.rows) ? payload.rows : [];
}

async function abrirModalSdcaTotalEquipes() {
  let reportRows = filtrarReportRowsComInicioJornada(filtrarReportRowsAndon());
  if (!reportRows.length) {
    reportRows = filtrarReportRowsComInicioJornada(andonReportRows.filter((row) => {
      const uo = obterUoLinha(row);
      if (headerSelectedUo && uo !== headerSelectedUo.replace(/[^\d]/g, '')) return false;
      const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA']));
      return !dataIso || linhaPassaFiltrosPeriodo(dataIso);
    }));
  }
  if (!reportRows.length && andonReportRows.length) {
    const datas = [...new Set(
      andonReportRows
        .map((row) => normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA'])))
        .filter(Boolean)
    )].sort();
    const ultimaData = datas[datas.length - 1];
    reportRows = filtrarReportRowsComInicioJornada(andonReportRows.filter((row) => {
      const uo = obterUoLinha(row);
      if (headerSelectedUo && uo !== headerSelectedUo.replace(/[^\d]/g, '')) return false;
      return normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA'])) === ultimaData;
    }));
  }
  const controleRows = filtrarControleRowsAndon();
  let listaEquipes = montarLinhasModalEquipes(reportRows, 'todas', controleRows, { apenasComInicioJornada: true });
  if (!listaEquipes.length) {
    const rowsFallback = await carregarEquipesSdcaFallback();
    listaEquipes = rowsFallback.map((row) => {
      const metaDia = toNumberSafe(obterValorPrimeiro(row, ['META']));
      const prodDia = toNumberSafe(obterValorPrimeiro(row, ['US_EXEC']));
      const percProdDia = metaDia > 0 ? (prodDia / metaDia) * 100 : 0;
      return {
        codigo: String(obterValorPrimeiro(row, ['COD_EQUIPE']) || '').trim(),
        equipe: String(obterValorPrimeiro(row, ['NOME_EQUIPE']) || obterValorPrimeiro(row, ['COD_EQUIPE']) || '-'),
        metaDia,
        prodDia,
        percProdDia,
        faixaDia: String(obterValorPrimeiro(row, ['FAIXA_DIA']) || classificarFaixa(percProdDia) || '-').trim(),
        inicioJornada: obterHoraTexto(obterValorPrimeiro(row, ['INICIO_JORNADA'])),
        ultimoAtendimento: obterHoraTexto(obterValorPrimeiro(row, ['ULTIMO_ATENDIMENTO']))
      };
    }).filter((item) => Number.isFinite(horaParaMinutos(item.inicioJornada)));
  }
  const codigosVisiveis = new Set(listaEquipes.map((item) => String(item.codigo || '').trim()).filter(Boolean));
  const registros = obterRegistrosSdcaAndon(codigosVisiveis);
  const mapaAcordos = new Map();
  const mapaJustificativas = new Map();

  registros.forEach((registro) => {
    Object.values(registro && registro.acordos || {}).forEach((item) => {
      const codigo = String(item && item.codigo || '').trim();
      if (codigo && codigosVisiveis.has(codigo)) mapaAcordos.set(codigo, item);
    });
    Object.values(registro && registro.justificativas || {}).forEach((item) => {
      const codigo = String(item && item.codigo || '').trim();
      const texto = String(item && item.justificativa || '').trim();
      if (codigo && texto && codigosVisiveis.has(codigo)) mapaJustificativas.set(codigo, item);
    });
  });

  const rows = listaEquipes.map((item) => {
    const codigo = String(item.codigo || '').trim();
    const acordo = mapaAcordos.get(codigo);
    const justificativa = mapaJustificativas.get(codigo);
    return {
      ...item,
      acordo,
      justificativa,
      statusSdca: justificativa ? 'Justificada' : acordo ? 'Acordada' : 'Sem ação'
    };
  }).sort(compararFaixaDiaDesc);

  aplicarModalTelaCheia(true);
  renderCabecalhoModalGenerico([
    { label: 'Equipe' },
    { label: 'Faixa Dia' },
    { label: '% Prod. Dia' },
    { label: 'Status SDCA' },
    { label: 'Acordada' },
    { label: 'Justificada' },
    { label: 'Justificativa' },
    { label: 'Início Jornada' },
    { label: 'Últ. Atendimento' }
  ]);

  if (equipesModalTitle) equipesModalTitle.textContent = 'Total de Equipes - Ações SDCA';
  if (equipesModalMeta) {
    equipesModalMeta.textContent = `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes: ${formatInt(rows.length)} | Acordadas: ${sdcaEquipesAcordadas?.textContent || '0'} | Justificadas: ${sdcaEquipesJustificadas?.textContent || '0'}`;
  }

  if (!rows.length) {
    equipesModalBody.innerHTML = '<tr><td colspan="9" class="andon-modal-empty">Nenhuma equipe encontrada para o filtro atual de data/U.O.</td></tr>';
  } else {
    equipesModalBody.innerHTML = rows.map((row) => `
      <tr>
        <td>${row.equipe || '-'}</td>
        <td>${row.faixaDia || '-'}</td>
        <td>${formatPercent(row.percProdDia || 0)}</td>
        <td>${row.statusSdca || '-'}</td>
        <td>${row.acordo ? 'Sim' : 'Não'}</td>
        <td>${row.justificativa ? 'Sim' : 'Não'}</td>
        <td>${String(row.justificativa?.justificativa || '-')}</td>
        <td>${row.inicioJornada || '-'}</td>
        <td>${row.ultimoAtendimento || '-'}</td>
      </tr>
    `).join('');
  }

  equipesModal.classList.remove('hidden');
}

function atualizarCardsJornadaTrabalho() {
  const reportRows = filtrarReportRowsComInicioJornada(filtrarReportRowsAndon());
  const folhaRows = filtrarFolhaPontoRowsAndon();
  const jornada = calcularJornadaTrabalho(reportRows, folhaRows);

  if (jornadaTrabalhoValores['TOTAL DE EQUIP. EFETIVA']) jornadaTrabalhoValores['TOTAL DE EQUIP. EFETIVA'].textContent = formatInt(jornada.totalEfetiva);
  if (jornadaTrabalhoValores['ATRASO']) jornadaTrabalhoValores['ATRASO'].textContent = formatInt(jornada.atraso);
  if (jornadaTrabalhoValores['SAIDA ANTECIPADA']) jornadaTrabalhoValores['SAIDA ANTECIPADA'].textContent = formatInt(jornada.saidaAntecipada);
  if (jornadaTrabalhoValores['ABSENTEISMO']) jornadaTrabalhoValores['ABSENTEISMO'].textContent = formatInt(jornada.absenteismo);
  if (jornadaTrabalhoValores['HORA EXTRA']) jornadaTrabalhoValores['HORA EXTRA'].textContent = formatInt(jornada.horaExtra);
}

function atualizarCardsEficiencia() {
  const rows = filtrarReportRowsAndon();
  const controleRows = filtrarControleRowsAndon();
  const eficiencia = calcularEficiencia(rows, controleRows);

  if (eficienciaValores['TOTAL DE EQUIP. EFETIVA']) eficienciaValores['TOTAL DE EQUIP. EFETIVA'].textContent = formatInt(eficiencia.totalEfetiva);
  if (eficienciaValores['SERVICOS DESIG.']) eficienciaValores['SERVICOS DESIG.'].textContent = formatInt(eficiencia.servicosDesignados);
  if (eficienciaValores['SERVICOS EXEC.']) eficienciaValores['SERVICOS EXEC.'].textContent = formatInt(eficiencia.servicosExecutados);
  if (eficienciaValores['SERVICOS PRODUTIVO']) eficienciaValores['SERVICOS PRODUTIVO'].textContent = formatInt(eficiencia.servicosProdutivos);
  if (eficienciaValores['SERVICOS IMPRODUTIVOS']) eficienciaValores['SERVICOS IMPRODUTIVOS'].textContent = formatInt(eficiencia.servicosImprodutivos);
  if (eficienciaValores['% SERV. IMPROD.']) {
    eficienciaValores['% SERV. IMPROD.'].textContent = formatPercent(eficiencia.percImprodutivo);
    aplicarCorPercentualKpi(eficienciaValores['% SERV. IMPROD.'], eficiencia.percImprodutivo);
  }
  if (eficienciaValores['MED. SERVICO POR EQP.']) eficienciaValores['MED. SERVICO POR EQP.'].textContent = formatNumber2(eficiencia.mediaServicoPorEqp);
  if (eficienciaValores['EQUIPE SEM SERVICO']) eficienciaValores['EQUIPE SEM SERVICO'].textContent = formatInt(eficiencia.semServico);
}

function atualizarCardsJornadaProdutivaVazios() {
  if (journeyProdTotalEfetiva) journeyProdTotalEfetiva.textContent = '0';
  if (journeyProdMedPrimeiroAtend) journeyProdMedPrimeiroAtend.textContent = '--';
  if (journeyProdMedUltimoAtend) journeyProdMedUltimoAtend.textContent = '--';
  if (journeyProdSemRefeicao) journeyProdSemRefeicao.textContent = '0';
  if (journeyProdMedJornada) journeyProdMedJornada.textContent = '--';
  if (journeyProdPercIncomp) journeyProdPercIncomp.textContent = '0,00%';
}

function atualizarCardsJornadaProdutiva() {
  const reportRows = filtrarReportRowsPorDiasComInicioJornada(filtrarReportRowsAndon());
  const controleRows = obterControleRowsPorCodigos(obterCodigosReportRows(reportRows));
  const listaEquipes = montarLinhasModalEquipes(reportRows, 'todas', controleRows, { apenasComInicioJornada: true });

  if (!listaEquipes.length) {
    atualizarCardsJornadaProdutivaVazios();
    return;
  }

  const minutosPrimeiro = listaEquipes
    .map((item) => horaParaMinutos(item.primeiroAtendimento))
    .filter((valor) => Number.isFinite(valor));
  const minutosUltimo = listaEquipes
    .map((item) => horaParaMinutos(item.ultimoAtendimento))
    .filter((valor) => Number.isFinite(valor));
  const minutosJornada = listaEquipes
    .map((item) => horaParaMinutos(item.jornadaProdutiva))
    .filter((valor) => Number.isFinite(valor) && valor >= 0 && valor <= (12 * 60));

  const semRefeicao = obterCodigosEquipesSemRefeicao(reportRows, listaEquipes).size;

  const jornadasIncompletas = listaEquipes.filter((item) => {
    const minutos = horaParaMinutos(item.jornadaProdutiva);
    return !Number.isFinite(minutos) || minutos < (7 * 60);
  }).length;

  const mediaPrimeiro = mediaNumericaAndon(minutosPrimeiro);
  const mediaUltimo = mediaNumericaAndon(minutosUltimo);
  const mediaJornada = mediaNumericaAndon(minutosJornada);
  const totalEfetiva = listaEquipes.length;
  const percIncompleta = totalEfetiva > 0 ? (jornadasIncompletas / totalEfetiva) * 100 : 0;

  if (journeyProdTotalEfetiva) journeyProdTotalEfetiva.textContent = formatInt(totalEfetiva);
  if (journeyProdMedPrimeiroAtend) journeyProdMedPrimeiroAtend.textContent = formatHoraMedia(mediaPrimeiro);
  if (journeyProdMedUltimoAtend) journeyProdMedUltimoAtend.textContent = formatHoraMedia(mediaUltimo);
  if (journeyProdSemRefeicao) journeyProdSemRefeicao.textContent = formatInt(semRefeicao);
  if (journeyProdMedJornada) journeyProdMedJornada.textContent = formatHoraMedia(mediaJornada);
  if (journeyProdPercIncomp) journeyProdPercIncomp.textContent = formatPercent(percIncompleta);
}

function obterMetricasSecaoSupervisor(card, sectionName, roles = []) {
  const secao = card.querySelector(`[data-section="${sectionName}"]`);
  if (!secao) return [];

  const metricas = Array.from(secao.querySelectorAll('.metric'));
  metricas.forEach((metrica, index) => {
    if (!metrica.dataset.metricRole) {
      metrica.dataset.metricRole = roles[index] || '';
    }
  });
  return metricas;
}

function obterValoresMetricasSupervisor(metricas = []) {
  return Object.fromEntries(
    metricas
      .map((metrica) => [metrica.dataset.metricRole, metrica.querySelector('.metric-value')])
      .filter((item) => item[0] && item[1])
  );
}

function obterLoteProdSupervisor(rows = []) {
  const codigos = obterCodigosReportRows(rows);
  const loteRows = filtrarLoteProdPorCodigos(filtrarLoteProdEquipesRowsAndon(), codigos);
  const baseTotal = obterEquipesDBaseTotal(rows);
  const codigosDwm = baseTotal.equipesD;
  const baseLote = obterEquipesDBaseLoteProd(loteRows);
  const codigosLoteD = baseLote.equipesD;
  const loteDRows = loteRows.filter((row) => codigosLoteD.has(obterCodigoEquipeLote(row)));
  const somenteWm = Array.from(codigosDwm).filter((codigo) => !codigosLoteD.has(String(codigo))).length;
  const somenteLote = Array.from(codigosLoteD).filter((codigo) => !codigosDwm.has(String(codigo))).length;
  const wmELote = Array.from(codigosDwm).filter((codigo) => codigosLoteD.has(String(codigo))).length;

  return {
    codigos,
    rows: loteRows,
    rowsD: loteDRows,
    classificacao: calcularClassificacaoLoteProdEquipes(loteRows),
    equipesD: codigosLoteD.size,
    wmELote,
    somenteWm,
    somenteLote
  };
}

function formatarComparativoLoteSupervisor(loteProd = {}) {
  return `${formatInt(loteProd.equipesD || 0)} | S.WM ${formatInt(loteProd.somenteWm || 0)} | S.Lote ${formatInt(loteProd.somenteLote || 0)}`;
}

function calcularSdcaSupervisor(rows = []) {
  return calcularSdcaMetricas(rows);
}

function calcularJornadaSupervisor(rows = []) {
  const rowsComInicio = filtrarReportRowsPorDiasComInicioJornada(rows);
  const controleRows = obterControleRowsPorCodigos(obterCodigosReportRows(rowsComInicio));
  const listaEquipes = montarLinhasModalEquipes(rowsComInicio, 'todas', controleRows, { apenasComInicioJornada: true });
  const minutosPrimeiro = listaEquipes.map((item) => horaParaMinutos(item.primeiroAtendimento)).filter((valor) => Number.isFinite(valor));
  const minutosUltimo = listaEquipes.map((item) => horaParaMinutos(item.ultimoAtendimento)).filter((valor) => Number.isFinite(valor));
  const minutosJornada = listaEquipes
    .map((item) => horaParaMinutos(item.jornadaProdutiva))
    .filter((valor) => Number.isFinite(valor) && valor >= 0 && valor <= (12 * 60));
  const codigosSemRefeicao = obterCodigosEquipesSemRefeicao(rowsComInicio, listaEquipes);

  return {
    listaEquipes,
    controleRows,
    totalEfetiva: listaEquipes.length,
    mediaPrimeiro: mediaNumericaAndon(minutosPrimeiro),
    mediaUltimo: mediaNumericaAndon(minutosUltimo),
    semRefeicao: codigosSemRefeicao.size,
    mediaJornada: mediaNumericaAndon(minutosJornada),
    codigosSemRefeicao
  };
}

function inicializarMetricasPerformanceSupervisor() {
  supervisorCards.forEach((card) => {
    const metricas = obterMetricasSecaoSupervisor(card, 'performance', [
      'total-equipes',
      'classificacao-wm',
      'classificacao-lote',
      'equipes-d-wm',
      'equipes-d-lote',
      'impedimento'
    ]);
    metricas.forEach((metrica, index) => {
      if (!metrica.dataset.metricBound && ['total-equipes', 'equipes-d-wm', 'equipes-d-lote'].includes(metrica.dataset.metricRole)) {
        metrica.classList.add('andon-card-clickable');
        metrica.addEventListener('click', () => {
          const rows = obterRowsSupervisorCard(card);
          const role = metrica.dataset.metricRole;

          if (role === 'equipes-d-lote') {
            const loteProd = obterLoteProdSupervisor(rows);
            abrirModalEquipesDLoteProd({
              rows: loteProd.rowsD,
              codigos: loteProd.codigos,
              reportRows: rows,
              title: `Equipes D Lote Prod. - ${card.dataset.supervisor || ''}`
            });
            return;
          }

          const filtro = role === 'equipes-d-wm' ? 'd' : 'todas';
          const apenasComInicioJornada = role === 'total-equipes' || role === 'equipes-d-wm';
          const rowsModal = apenasComInicioJornada ? filtrarReportRowsComInicioJornada(rows) : rows;
          const codigosD = new Set(Array.from(obterEquipesDBaseTotal(rowsModal).equipesD));
          const codigosControle = filtro === 'd' ? codigosD : obterCodigosReportRows(rowsModal);
          const controleRows = obterControleRowsPorCodigos(codigosControle);
          abrirModalEquipesAndonContexto({
            filtro,
            rows: rowsModal,
            controleRows,
            title: `${filtro === 'd' ? 'Equipes D WM' : 'Total de Equipes'} - ${card.dataset.supervisor || ''}`,
            meta: `Supervisor: ${card.dataset.supervisor || '-'} | U.O.: ${card.dataset.uo || '-'} | Equipes: ${formatInt(filtro === 'd' ? codigosD.size : obterCodigosReportRows(rowsModal).size)}`,
            apenasComInicioJornada
          });
        });
        metrica.dataset.metricBound = '1';
      }
    });

    obterMetricasSecaoSupervisor(card, 'sdca', ['total-equipes', 'equipes-d', 'acordadas', 'justificadas', 'perc-justificadas'])
      .forEach((metrica) => {
        if (metrica.dataset.metricBound || !['total-equipes', 'equipes-d', 'acordadas', 'justificadas'].includes(metrica.dataset.metricRole)) return;
        metrica.classList.add('andon-card-clickable');
        metrica.addEventListener('click', () => {
          const role = metrica.dataset.metricRole;
          const filtro = role === 'equipes-d' ? 'd' : role;
          const rows = filtrarReportRowsComInicioJornada(obterRowsSupervisorCard(card));
          const controleRows = obterControleRowsPorCodigos(obterCodigosReportRows(rows));
          const titles = {
            'total-equipes': 'Total de Equipes',
            'equipes-d': 'Equipes D',
            acordadas: 'Equipes Acordadas',
            justificadas: 'Equipes Justificadas'
          };

          abrirModalEquipesAndonContexto({
            filtro: filtro === 'total-equipes' ? 'todas' : filtro,
            rows,
            controleRows,
            title: `${titles[role] || 'Equipes'} - ${card.dataset.supervisor || ''}`,
            meta: `Supervisor: ${card.dataset.supervisor || '-'} | U.O.: ${card.dataset.uo || '-'}`,
            apenasComInicioJornada: true
          });
        });
        metrica.dataset.metricBound = '1';
      });

    obterMetricasSecaoSupervisor(card, 'jornada-produtiva', ['total-efetiva', 'med-primeiro', 'med-ultimo', 'sem-refeicao', 'med-jornada'])
      .forEach((metrica) => {
        if (metrica.dataset.metricBound || !['total-efetiva', 'sem-refeicao'].includes(metrica.dataset.metricRole)) return;
        metrica.classList.add('andon-card-clickable');
        metrica.addEventListener('click', () => {
          const rows = obterRowsSupervisorCard(card);
          const jornada = calcularJornadaSupervisor(rows);
          const role = metrica.dataset.metricRole;

          if (role === 'sem-refeicao') {
            const rowsSemRefeicao = rows.filter((row) => jornada.codigosSemRefeicao.has(String(obterCodigoEquipeLinha(row) || '').trim()));
            const controleRowsSemRefeicao = jornada.controleRows.filter((row) => {
              const codigo = String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '').trim();
              return jornada.codigosSemRefeicao.has(codigo);
            });
            abrirModalEquipesAndonContexto({
              rows: rowsSemRefeicao,
              controleRows: controleRowsSemRefeicao,
              title: `RefeiÃ§Ã£o sem registro - ${card.dataset.supervisor || ''}`,
              meta: `Supervisor: ${card.dataset.supervisor || '-'} | U.O.: ${card.dataset.uo || '-'} | Equipes: ${formatInt(jornada.codigosSemRefeicao.size)}`
            });
            return;
          }

          abrirModalEquipesAndonContexto({
            rows,
            controleRows: jornada.controleRows,
            title: `Total Eqp Efetiva - ${card.dataset.supervisor || ''}`,
            meta: `Supervisor: ${card.dataset.supervisor || '-'} | U.O.: ${card.dataset.uo || '-'} | Equipes: ${formatInt(jornada.totalEfetiva)}`
          });
        });
        metrica.dataset.metricBound = '1';
      });

    obterMetricasSecaoSupervisor(card, 'eficiencia', [
      'total-efetiva',
      'servicos-designados',
      'servicos-executados',
      'servicos-produtivos',
      'servicos-improdutivos',
      'perc-improdutivo',
      'media-servico',
      'sem-servico'
    ]);

    obterMetricasSecaoSupervisor(card, 'jornada-trabalho', [
      'total-efetiva',
      'atraso',
      'saida-antecipada',
      'absenteismo',
      'hora-extra'
    ]).forEach((metrica) => {
      if (metrica.dataset.metricBound || !['atraso', 'saida-antecipada', 'absenteismo'].includes(metrica.dataset.metricRole)) return;
      metrica.classList.add('andon-card-clickable');
      metrica.addEventListener('click', () => {
        const rows = obterRowsSupervisorCard(card);
        if (metrica.dataset.metricRole === 'atraso' || metrica.dataset.metricRole === 'saida-antecipada') {
          const tipo = metrica.dataset.metricRole === 'atraso' ? 'atraso' : 'saida-antecipada';
          abrirModalJornadaOcorrencia(tipo, {
            reportRows: rows,
            folhaRows: filtrarFolhaPontoRowsAndon(),
            title: `${tipo === 'atraso' ? 'Atraso' : 'Saída Antecipada'} - ${card.dataset.supervisor || ''}`,
            meta: `Supervisor: ${card.dataset.supervisor || '-'} | U.O.: ${card.dataset.uo || '-'}`
          });
          return;
        }

        abrirModalAbsenteismo({
          reportRows: rows,
          folhaRows: filtrarFolhaPontoRowsAndon(),
          title: `Absenteísmo - ${card.dataset.supervisor || ''}`,
          meta: `Supervisor: ${card.dataset.supervisor || '-'} | U.O.: ${card.dataset.uo || '-'}`
        });
      });
      metrica.dataset.metricBound = '1';
    });

    Array.from(card.querySelectorAll('.metric')).forEach((metrica) => {
      if (metrica.dataset.metricBound) return;
      metrica.classList.add('andon-card-clickable');
      metrica.addEventListener('click', () => {
        const rows = obterRowsSupervisorCard(card);
        abrirModalEquipesAndonContexto({
          rows,
          controleRows: obterControleRowsSupervisorPorCodigos(card, obterCodigosReportRows(rows)),
          title: `${String(metrica.childNodes[0]?.textContent || 'Detalhes').trim()} - ${card.dataset.supervisor || ''}`,
          meta: `Supervisor: ${card.dataset.supervisor || '-'} | U.O.: ${card.dataset.uo || '-'} | Equipes: ${formatInt(obterCodigosReportRows(rows).size)}`
        });
      });
      metrica.dataset.metricBound = '1';
    });
  });
}

function atualizarSupervisorPerformanceCards() {
  supervisorCards.forEach((card) => {
    const rows = obterRowsSupervisorCard(card);
    const performanceValores = obterValoresMetricasSupervisor(
      obterMetricasSecaoSupervisor(card, 'performance', [
        'total-equipes',
        'classificacao-wm',
        'classificacao-lote',
        'equipes-d-wm',
        'equipes-d-lote',
        'impedimento'
      ])
    );
    const baseTotal = obterEquipesDBaseTotal(rows);
    const baseTotalComInicio = obterEquipesDBaseTotalComInicioJornada(rows);
    const percentualTotal = baseTotalComInicio.totalMetaDia > 0
      ? (baseTotalComInicio.totalProdDia / baseTotalComInicio.totalMetaDia) * 100
      : NaN;
    const impedimento = obterImpedimentoPorCodigos(obterCodigosReportRows(rows));
    const loteProd = obterLoteProdSupervisor(rows);

    if (performanceValores['total-equipes']) performanceValores['total-equipes'].textContent = formatInt(obterTotalEquipesComInicioJornada(rows));
    if (performanceValores['classificacao-wm']) performanceValores['classificacao-wm'].textContent = formatClassificacao(percentualTotal);
    if (performanceValores['classificacao-lote']) performanceValores['classificacao-lote'].textContent = loteProd.classificacao;
    if (performanceValores['equipes-d-wm']) performanceValores['equipes-d-wm'].textContent = formatInt(obterEquipesDBaseTotalComInicioJornada(rows).equipesD.size);
    if (performanceValores['equipes-d-lote']) {
      performanceValores['equipes-d-lote'].classList.remove('metric-value-compact');
      performanceValores['equipes-d-lote'].textContent = formatInt(loteProd.equipesD);
      performanceValores['equipes-d-lote'].title = `D Lote: ${formatInt(loteProd.equipesD)} | WM e Lote: ${formatInt(loteProd.wmELote)} | Somente WM: ${formatInt(loteProd.somenteWm)} | Somente Lote: ${formatInt(loteProd.somenteLote)}`;
    }
    if (performanceValores['impedimento']) performanceValores['impedimento'].textContent = formatPercent(impedimento);

    const sdca = calcularSdcaSupervisor(rows);
    const sdcaValores = obterValoresMetricasSupervisor(
      obterMetricasSecaoSupervisor(card, 'sdca', ['total-equipes', 'equipes-d', 'acordadas', 'justificadas', 'perc-justificadas'])
    );
    if (sdcaValores['total-equipes']) sdcaValores['total-equipes'].textContent = formatInt(sdca.totalEquipes);
    if (sdcaValores['equipes-d']) sdcaValores['equipes-d'].textContent = formatInt(sdca.equipesD);
    if (sdcaValores['acordadas']) sdcaValores['acordadas'].textContent = formatInt(sdca.acordadas);
    if (sdcaValores['justificadas']) sdcaValores['justificadas'].textContent = formatInt(sdca.justificadas);
    if (sdcaValores['perc-justificadas']) sdcaValores['perc-justificadas'].textContent = formatPercent(sdca.percJustificadas);

    const jornada = calcularJornadaSupervisor(rows);
    const jornadaValores = obterValoresMetricasSupervisor(
      obterMetricasSecaoSupervisor(card, 'jornada-produtiva', ['total-efetiva', 'med-primeiro', 'med-ultimo', 'sem-refeicao', 'med-jornada'])
    );
    if (jornadaValores['total-efetiva']) jornadaValores['total-efetiva'].textContent = formatInt(jornada.totalEfetiva);
    if (jornadaValores['med-primeiro']) jornadaValores['med-primeiro'].textContent = formatHoraMedia(jornada.mediaPrimeiro);
    if (jornadaValores['med-ultimo']) jornadaValores['med-ultimo'].textContent = formatHoraMedia(jornada.mediaUltimo);
    if (jornadaValores['sem-refeicao']) jornadaValores['sem-refeicao'].textContent = formatInt(jornada.semRefeicao);
    if (jornadaValores['med-jornada']) jornadaValores['med-jornada'].textContent = formatHoraMedia(jornada.mediaJornada);

    const codigos = obterCodigosReportRows(rows);
    const controleSupervisor = obterControleRowsSupervisorPorCodigos(card, codigos);
    const eficiencia = calcularEficiencia(rows, controleSupervisor);
    const eficienciaValoresSupervisor = obterValoresMetricasSupervisor(
      obterMetricasSecaoSupervisor(card, 'eficiencia', [
        'total-efetiva',
        'servicos-designados',
        'servicos-executados',
        'servicos-produtivos',
        'servicos-improdutivos',
        'perc-improdutivo',
        'media-servico',
        'sem-servico'
      ])
    );

    if (eficienciaValoresSupervisor['total-efetiva']) eficienciaValoresSupervisor['total-efetiva'].textContent = formatInt(eficiencia.totalEfetiva);
    if (eficienciaValoresSupervisor['servicos-designados']) eficienciaValoresSupervisor['servicos-designados'].textContent = formatInt(eficiencia.servicosDesignados);
    if (eficienciaValoresSupervisor['servicos-executados']) eficienciaValoresSupervisor['servicos-executados'].textContent = formatInt(eficiencia.servicosExecutados);
    if (eficienciaValoresSupervisor['servicos-produtivos']) eficienciaValoresSupervisor['servicos-produtivos'].textContent = formatInt(eficiencia.servicosProdutivos);
    if (eficienciaValoresSupervisor['servicos-improdutivos']) eficienciaValoresSupervisor['servicos-improdutivos'].textContent = formatInt(eficiencia.servicosImprodutivos);
    if (eficienciaValoresSupervisor['perc-improdutivo']) eficienciaValoresSupervisor['perc-improdutivo'].textContent = formatPercent(eficiencia.percImprodutivo);
    if (eficienciaValoresSupervisor['media-servico']) eficienciaValoresSupervisor['media-servico'].textContent = formatNumber2(eficiencia.mediaServicoPorEqp);
    if (eficienciaValoresSupervisor['sem-servico']) eficienciaValoresSupervisor['sem-servico'].textContent = formatInt(eficiencia.semServico);

    const folhaSupervisor = filtrarFolhaPontoRowsAndon();
    const jornadaTrabalho = calcularJornadaTrabalho(rows, folhaSupervisor);
    const jornadaTrabalhoValoresSupervisor = obterValoresMetricasSupervisor(
      obterMetricasSecaoSupervisor(card, 'jornada-trabalho', [
        'total-efetiva',
        'atraso',
        'saida-antecipada',
        'absenteismo',
        'hora-extra'
      ])
    );

    if (jornadaTrabalhoValoresSupervisor['total-efetiva']) jornadaTrabalhoValoresSupervisor['total-efetiva'].textContent = formatInt(jornadaTrabalho.totalEfetiva);
    if (jornadaTrabalhoValoresSupervisor['atraso']) jornadaTrabalhoValoresSupervisor['atraso'].textContent = formatInt(jornadaTrabalho.atraso);
    if (jornadaTrabalhoValoresSupervisor['saida-antecipada']) jornadaTrabalhoValoresSupervisor['saida-antecipada'].textContent = formatInt(jornadaTrabalho.saidaAntecipada);
    if (jornadaTrabalhoValoresSupervisor['absenteismo']) jornadaTrabalhoValoresSupervisor['absenteismo'].textContent = formatInt(jornadaTrabalho.absenteismo);
    if (jornadaTrabalhoValoresSupervisor['hora-extra']) jornadaTrabalhoValoresSupervisor['hora-extra'].textContent = formatInt(jornadaTrabalho.horaExtra);
  });
}

function carregarBaseAcordosLocalAndon() {
  try {
    const keys = [
      'painel_producao_acordos_v2',
      'painel_producao_acordos_v1',
      'painel_producao_acordos',
      'painel_producao_acordos_v2_backup'
    ];

    for (const key of keys) {
      const bruto = localStorage.getItem(key);
      if (!bruto) continue;
      const obj = JSON.parse(bruto);
      if (!obj || typeof obj !== 'object') continue;
      const dados = obj && obj.tipo === 'backup-acordos-painel' ? (obj.dados || {}) : obj;
      if (dados && typeof dados === 'object' && !Array.isArray(dados)) return dados;
    }
  } catch (error) {
    console.error('Erro ao ler acordos locais do ANDON:', error);
  }
  return {};
}

async function carregarBaseAcordosBancoAndon() {
  try {
    const resp = await fetch('/api/state/acordos', { cache: 'no-store' });
    if (!resp.ok) return null;
    const payload = await resp.json().catch(() => ({}));
    const base = payload && payload.base;
    return base && typeof base === 'object' && !Array.isArray(base) ? base : {};
  } catch (error) {
    console.error('Erro ao carregar acordos do banco no ANDON:', error);
    return null;
  }
}

async function sincronizarBaseAcordosAndon() {
  const baseBanco = await carregarBaseAcordosBancoAndon();
  if (baseBanco && typeof baseBanco === 'object') {
    andonAcordosBase = baseBanco;
    return baseBanco;
  }

  andonAcordosBase = carregarBaseAcordosLocalAndon();
  return andonAcordosBase;
}

function obterRegistrosSdcaAndon(codigosVisiveis = new Set()) {
  return Object.values(andonAcordosBase || {}).filter((registro) => {
    const dataRegistro = normalizarDataIso(String(registro && registro.data || '').trim());
    if (!linhaPassaFiltrosPeriodo(dataRegistro)) return false;

    const uoSelecionada = String(headerSelectedUo || '').replace(/[^\d]/g, '');
    const uoRegistro = String(registro && registro.uo || '').replace(/[^\d]/g, '');
    if (uoSelecionada && uoRegistro && uoRegistro !== uoSelecionada) return false;

    const codigosRegistro = new Set([
      ...Object.values(registro && registro.acordos || {}).map((item) => String(item && item.codigo || '').trim()).filter(Boolean),
      ...Object.values(registro && registro.justificativas || {}).map((item) => String(item && item.codigo || '').trim()).filter(Boolean)
    ]);

    if (!codigosRegistro.size) return false;
    if (!codigosVisiveis || !codigosVisiveis.size) return true;

    for (const codigo of codigosRegistro) {
      if (codigosVisiveis.has(codigo)) return true;
    }
    return false;
  });
}

function obterChaveSdcaAcumulada(codigo, dataIso = '') {
  const codigoTexto = String(codigo || '').trim();
  if (!codigoTexto) return '';
  if (!filtroPeriodoMultiDiaAtivo()) return codigoTexto;
  const dataTexto = normalizarDataIso(dataIso);
  return dataTexto ? `${codigoTexto}__${dataTexto}` : '';
}

function calcularSdcaMetricas(rows = []) {
  const rowsSdca = filtrarReportRowsComInicioJornada(rows);
  const baseTotal = obterEquipesDBaseTotal(rowsSdca);
  const codigosVisiveis = obterCodigosReportRows(rowsSdca);
  const chavesVisiveis = new Set();

  rowsSdca.forEach((row) => {
    if (filtroPeriodoMultiDiaAtivo() && !linhaReportPossuiInicioJornada(row)) return;
    const codigo = obterCodigoEquipeLinha(row);
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA']));
    const chave = obterChaveSdcaAcumulada(codigo, dataIso);
    if (chave) chavesVisiveis.add(chave);
  });

  const registros = obterRegistrosSdcaAndon(codigosVisiveis);
  const acordadas = new Set();
  const justificadas = new Set();

  registros.forEach((registro) => {
    const dataRegistro = normalizarDataIso(String(registro && registro.data || '').trim());
    Object.values(registro && registro.acordos || {}).forEach((acordo) => {
      const codigo = String(acordo && acordo.codigo || '').trim();
      const chave = obterChaveSdcaAcumulada(codigo, dataRegistro);
      if (codigo && codigosVisiveis.has(codigo) && (!chavesVisiveis.size || chavesVisiveis.has(chave))) {
        acordadas.add(chave || codigo);
      }
    });
    Object.values(registro && registro.justificativas || {}).forEach((item) => {
      const codigo = String(item && item.codigo || '').trim();
      const texto = String(item && item.justificativa || '').trim();
      const chave = obterChaveSdcaAcumulada(codigo, dataRegistro);
      if (codigo && texto && codigosVisiveis.has(codigo) && (!chavesVisiveis.size || chavesVisiveis.has(chave))) {
        justificadas.add(chave || codigo);
      }
    });
  });

  const totalEquipes = filtroPeriodoMultiDiaAtivo()
    ? contarEquipesDiasComInicioJornada(rows)
    : baseTotal.totalEquipes;

  return {
    totalEquipes,
    equipesD: baseTotal.equipesD.size,
    acordadas: acordadas.size,
    justificadas: justificadas.size,
    percAcordadas: totalEquipes > 0 ? (acordadas.size / totalEquipes) * 100 : 0,
    percJustificadas: totalEquipes > 0 ? (justificadas.size / totalEquipes) * 100 : 0
  };
}

function obterCodigosSdcaPorTipo(rows = [], tipo = 'acordadas') {
  const { mapa } = obterResumoEquipesHoraAtual(rows);
  const codigosVisiveis = new Set(Array.from(mapa.keys()).map((codigo) => String(codigo)));
  const registros = obterRegistrosSdcaAndon(codigosVisiveis);
  const codigos = new Set();

  registros.forEach((registro) => {
    if (tipo === 'justificadas') {
      Object.values(registro && registro.justificativas || {}).forEach((item) => {
        const codigo = String(item && item.codigo || '').trim();
        const texto = String(item && item.justificativa || '').trim();
        if (codigo && texto && codigosVisiveis.has(codigo)) {
          codigos.add(codigo);
        }
      });
      return;
    }

    Object.values(registro && registro.acordos || {}).forEach((item) => {
      const codigo = String(item && item.codigo || '').trim();
      if (codigo && codigosVisiveis.has(codigo)) {
        codigos.add(codigo);
      }
    });
  });

  return codigos;
}

function atualizarCardsPerformanceVazios() {
  if (perfTotalEquipes) perfTotalEquipes.textContent = '0';
  if (perfTotalEquipesLote) perfTotalEquipesLote.textContent = '0';
  if (perfClassificacaoWm) perfClassificacaoWm.textContent = '--';
  if (perfClassificacaoLote) perfClassificacaoLote.textContent = '--';
  aplicarCorFaixaKpi(cardPerfClassificacaoWm, '');
  aplicarCorFaixaKpi(cardPerfClassificacaoLote, '');
  if (perfEquipesDWm) perfEquipesDWm.textContent = '0';
  if (perfEquipesDLote) perfEquipesDLote.textContent = '0';
  if (perfImpedimento) perfImpedimento.textContent = '0,00%';
  aplicarCorPercentualKpi(perfImpedimento, 0);
}

function calcularPerformance(rows = []) {
  if (!rows.length) {
    return { totalEquipes: 0, classificacaoWm: '--', classificacaoLote: '--', equipesDWm: 0, equipesDLote: 0 };
  }

  const { horasAcumuladas, mapa } = obterResumoEquipesHoraAtual(rows);
  const equipes = Array.from(mapa.values());
  const totalMetaDia = equipes.reduce((acc, item) => acc + Number(item.metaDia || 0), 0);
  const totalMetaWm = equipes.reduce((acc, item) => acc + ((Number(item.metaDia || 0) / 9) * horasAcumuladas), 0);
  const totalProd = equipes.reduce((acc, item) => acc + Number(item.prodAtual || 0), 0);
  const percWm = totalMetaWm > 0 ? (totalProd / totalMetaWm) * 100 : NaN;
  const percLote = totalMetaDia > 0 ? (totalProd / totalMetaDia) * 100 : NaN;

  const equipesDWm = equipes.filter((item) => {
    const metaWm = (Number(item.metaDia || 0) / 9) * horasAcumuladas;
    return classificarFaixa(metaWm > 0 ? (Number(item.prodAtual || 0) / metaWm) * 100 : 0) === 'D';
  }).length;

  const equipesDLote = equipes.filter((item) =>
    classificarFaixa(Number(item.metaDia || 0) > 0 ? (Number(item.prodAtual || 0) / Number(item.metaDia || 0)) * 100 : 0) === 'D'
  ).length;

  return {
    totalEquipes: equipes.length,
    classificacaoWm: formatClassificacao(percWm),
    classificacaoLote: formatClassificacao(percLote),
    equipesDWm,
    equipesDLote
  };
}

function obterEquipesDBaseTotal(rows = []) {
  const mapa = obterMetricasReportPorEquipe(rows);

  const equipesD = new Set();
  mapa.forEach((item, codigo) => {
    const percentualDia = Number(item.metaDia || 0) > 0
      ? (Number(item.prodDia || 0) / Number(item.metaDia || 0)) * 100
      : 0;
    if (classificarFaixa(percentualDia) === 'D') {
      equipesD.add(String(codigo));
    }
  });

  return {
    totalEquipes: mapa.size,
    totalMetaDia: Array.from(mapa.values()).reduce((acc, item) => acc + Number(item.metaDia || 0), 0),
    totalProdDia: Array.from(mapa.values()).reduce((acc, item) => acc + Number(item.prodDia || 0), 0),
    equipesD
  };
}

function atualizarCardsSdcaVazios() {
  if (sdcaTotalEquipes) sdcaTotalEquipes.textContent = '0';
  if (sdcaEquipesD) sdcaEquipesD.textContent = '0';
  if (sdcaEquipesAcordadas) sdcaEquipesAcordadas.textContent = '0';
  if (sdcaPercAcordadas) sdcaPercAcordadas.textContent = '0,00%';
  if (sdcaEquipesJustificadas) sdcaEquipesJustificadas.textContent = '0';
  if (sdcaPercJustificadas) sdcaPercJustificadas.textContent = '0,00%';
}

function atualizarCardsSdca() {
  const reportRows = filtrarReportRowsComInicioJornada(filtrarReportRowsAndon());
  const sdca = calcularSdcaMetricas(reportRows);

  if (sdcaTotalEquipes) sdcaTotalEquipes.textContent = formatInt(sdca.totalEquipes);
  if (sdcaEquipesD) sdcaEquipesD.textContent = formatInt(sdca.equipesD);
  if (sdcaEquipesAcordadas) sdcaEquipesAcordadas.textContent = formatInt(sdca.acordadas);
  if (sdcaPercAcordadas) sdcaPercAcordadas.textContent = formatPercent(sdca.percAcordadas);
  if (sdcaEquipesJustificadas) sdcaEquipesJustificadas.textContent = formatInt(sdca.justificadas);
  if (sdcaPercJustificadas) sdcaPercJustificadas.textContent = formatPercent(sdca.percJustificadas);
}

function supervisorViewEstaAberta() {
  return Boolean(supervisorView && !supervisorView.classList.contains('hidden'));
}

function atualizarSupervisorPerformanceCardsSeVisivel() {
  if (supervisorViewEstaAberta()) {
    atualizarSupervisorPerformanceCards();
  }
}

function executarAtualizacaoDashboardAndon() {
  atualizarCardsPerformance();
  atualizarCardsSdca();
  atualizarCardsJornadaProdutiva();
  atualizarCardsJornadaTrabalho();
  atualizarCardsEficiencia();
  atualizarSupervisorPerformanceCardsSeVisivel();

  const chavePeriodo = obterChavePeriodoFiltroAndon();
  if (andonControleLoadedKey !== chavePeriodo && !andonControleLoadingPromise) {
    carregarControleServicoAndon().then(() => {
      atualizarCardsPerformance();
      atualizarCardsJornadaProdutiva();
      atualizarCardsEficiencia();
      atualizarSupervisorPerformanceCardsSeVisivel();
    });
  }

  const chaveFolha = `${chavePeriodo}:${String(headerSelectedUo || '').replace(/[^\d]/g, '') || 'todas'}`;
  if (andonFolhaPontoLoadedKey !== chaveFolha && !andonFolhaPontoLoadingPromise) {
    carregarFolhaPontoAndon().then(() => {
      atualizarCardsJornadaTrabalho();
      atualizarSupervisorPerformanceCardsSeVisivel();
    });
  }

  if (andonLoteProdEquipesLoadedKey !== chavePeriodo && !andonLoteProdEquipesLoadingPromise) {
    carregarLoteProdEquipesAndon().then(() => {
      atualizarCardsPerformance();
      atualizarSupervisorPerformanceCardsSeVisivel();
    });
  }
}

function atualizarDashboardAndon() {
  if (andonDashboardUpdateTimer) {
    window.clearTimeout(andonDashboardUpdateTimer);
  }
  andonDashboardUpdateTimer = window.setTimeout(() => {
    andonDashboardUpdateTimer = null;
    executarAtualizacaoDashboardAndon();
  }, 80);
}

function calcularPercentualImpedimento(rows = []) {
  let realizados = 0;
  let improdutivos = 0;

  rows.forEach((row) => {
    const flag = normalizarFlagServico(obterValorPrimeiro(row, ['PRODUTIVO', 'PRODUTIVOS']));
    if (flag === 'SIM') realizados += 1;
    if (flag === 'NAO') {
      realizados += 1;
      improdutivos += 1;
    }
  });

  return realizados > 0 ? (improdutivos / realizados) * 100 : 0;
}

function atualizarCardsPerformance() {
  const reportRows = filtrarReportRowsAndon();
  const controleRows = filtrarControleRowsAndon();
  const loteProd = calcularResumoLoteProd(filtrarLoteProdRowsAndon());
  const totalEquipesLote = calcularTotalEquipesLoteProd();
  const baseTotal = obterEquipesDBaseTotal(reportRows);
  const baseTotalComInicio = obterEquipesDBaseTotalComInicioJornada(reportRows);
  const totalEquipesComInicio = obterTotalEquipesComInicioJornada(reportRows);
  const percentualImpedimento = calcularPercentualImpedimento(controleRows);
  const percentualTotal = baseTotalComInicio.totalMetaDia > 0
    ? (baseTotalComInicio.totalProdDia / baseTotalComInicio.totalMetaDia) * 100
    : NaN;

  if (perfTotalEquipes) perfTotalEquipes.textContent = formatInt(totalEquipesComInicio);
  if (perfTotalEquipesLote) perfTotalEquipesLote.textContent = formatInt(totalEquipesLote);
  const classificacaoWm = formatClassificacao(percentualTotal);
  if (perfClassificacaoWm) perfClassificacaoWm.textContent = classificacaoWm;
  aplicarCorFaixaKpi(cardPerfClassificacaoWm, Number.isFinite(percentualTotal) ? classificarFaixa(percentualTotal) : obterFaixaClassificacaoTexto(classificacaoWm));
  if (perfClassificacaoLote) perfClassificacaoLote.textContent = loteProd.classificacao;
  aplicarCorFaixaKpi(cardPerfClassificacaoLote, obterFaixaClassificacaoTexto(loteProd.classificacao));
  if (perfEquipesDWm) perfEquipesDWm.textContent = formatInt(baseTotalComInicio.equipesD.size);
  if (perfEquipesDLote) perfEquipesDLote.textContent = formatInt(loteProd.equipesD);
  if (perfImpedimento) perfImpedimento.textContent = formatPercent(percentualImpedimento);
  aplicarCorPercentualKpi(perfImpedimento, percentualImpedimento);
}

async function carregarDadosAndon() {
  if (andonLoadingPromise) return andonLoadingPromise;

  andonLoadingPromise = (async () => {
    const reportUrl = '/api/report?strictHours=false&onlyStartedJourney=false';
    const [reportResp, loteProdResp, loteProdEquipesDResp, acordosBanco] = await Promise.all([
      fetch(reportUrl, { cache: 'no-store' }),
      fetch('/api/lote-prod', { cache: 'no-store' }),
      fetch('/api/lote-prod/equipes-d', { cache: 'no-store' }),
      carregarBaseAcordosBancoAndon()
    ]);

    if (!reportResp.ok) {
      throw new Error(`Erro ao carregar ${reportUrl} (${reportResp.status}).`);
    }

    const reportPayload = await reportResp.json();
    andonReportRows = Array.isArray(reportPayload && reportPayload.rows) ? reportPayload.rows : [];
    limparCacheAndon();

    if (loteProdResp.ok) {
      const loteProdPayload = await loteProdResp.json();
      andonLoteProdRows = Array.isArray(loteProdPayload && loteProdPayload.rows) ? loteProdPayload.rows : [];
    } else {
      andonLoteProdRows = [];
    }
    limparCacheAndon();

    if (loteProdEquipesDResp.ok) {
      const loteProdEquipesDPayload = await loteProdEquipesDResp.json();
      andonLoteProdEquipesDRows = Array.isArray(loteProdEquipesDPayload && loteProdEquipesDPayload.rows)
        ? loteProdEquipesDPayload.rows
        : [];
    } else {
      andonLoteProdEquipesDRows = [];
    }
    limparCacheAndon();

    andonAcordosBase = acordosBanco && Object.keys(acordosBanco).length
      ? acordosBanco
      : carregarBaseAcordosLocalAndon();

    andonAvailableUos = [...new Set(andonReportRows.map(obterUoLinha).filter(Boolean))].sort((a, b) => Number(a) - Number(b));

    if (!headerSelectedDate && !headerSelectedWeeks.length && !headerSelectedMonth) {
      const datas = [...new Set(
        andonReportRows
          .map((row) => normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA'])))
          .filter(Boolean)
      )].sort();
      const ultimaData = datas[datas.length - 1];
      if (ultimaData) {
        const [ano, mes, dia] = ultimaData.split('-').map(Number);
        const data = new Date(ano, mes - 1, dia);
        headerSelectedDate = data;
        headerSelectedMonth = { year: ano, month: mes - 1 };
        headerDatePickerMonth = new Date(ano, mes - 1, 1);
        headerMonthPickerYear = ano;
        if (headerDateDisplay) headerDateDisplay.value = fmtHeaderDate(data);
        if (headerMonthDisplay) headerMonthDisplay.value = fmtHeaderMonth(ano, mes - 1);
      }
    }

    if (!headerUoDisplay.value) {
      headerUoDisplay.value = 'Todas as U.O.';
    }

    renderHeaderUoOptions();
    if (!headerSupervisorDisplay.value) {
      headerSupervisorDisplay.value = 'Todos';
    }
    garantirSupervisorSelecionadoDisponivel();
    renderHeaderSupervisorOptions();
    atualizarDashboardAndon();
    Promise.all([
      carregarControleServicoAndon(),
      carregarFolhaPontoAndon(),
      carregarLoteProdEquipesAndon()
    ]).then(() => {
      atualizarDashboardAndon();
    }).catch((error) => {
      console.error('Erro ao carregar dados complementares do ANDON:', error);
    });
  })().catch((error) => {
    console.error('Erro ao carregar dados do ANDON:', error);
    atualizarCardsPerformanceVazios();
    atualizarCardsSdcaVazios();
  }).finally(() => {
    andonLoadingPromise = null;
  });

  return andonLoadingPromise;
}

function tagSupervisorSections() {
  const labelMap = {
    'performance':       'performance',
    'ações sdca':        'sdca',
    'jornada produtiva': 'jornada-produtiva',
    'jornada de trabalho': 'jornada-trabalho',
    'eficiência':        'eficiencia'
  };
  document.querySelectorAll('.supervisor-card-section').forEach(section => {
    if (section.dataset.section) return;
    const labelEl = section.querySelector('.section-label');
    if (!labelEl) return;
    const key = labelEl.textContent.trim().toLowerCase();
    const keyNormalizada = key.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (labelMap[key]) section.dataset.section = labelMap[key];
    if (!section.dataset.section && keyNormalizada === 'acoes sdca') section.dataset.section = 'sdca';
    if (!section.dataset.section && keyNormalizada === 'eficiencia') section.dataset.section = 'eficiencia';
  });
}

function appendEfficiencySections() {
  supervisorCards.forEach(card => {
    if (card.querySelector('[data-section="eficiencia"]')) {
      return;
    }

    const section = document.createElement('div');
    section.className = 'supervisor-card-section';
    section.dataset.section = 'eficiencia';
    section.innerHTML = `
      <div class="section-label">Eficiência</div>
      <div class="supervisor-metrics supervisor-metrics-5">
        <div class="metric">TOTAL EQP EFETIVA<div class="metric-value">40</div></div>
        <div class="metric">SERVIÇOS DESIG.<div class="metric-value">35</div></div>
        <div class="metric">SERVIÇOS EXEC.<div class="metric-value">0</div></div>
        <div class="metric">SERVIÇOS PRODUTIVO<div class="metric-value">28</div></div>
        <div class="metric">SERVIÇOS IMPRODUTIVOS<div class="metric-value">7</div></div>
        <div class="metric">% SERV. IMPROD.<div class="metric-value">20%</div></div>
        <div class="metric">MED. SERVIÇO POR EQP.<div class="metric-value">--</div></div>
        <div class="metric">EQUIPE SEM SERVIÇO<div class="metric-value">--</div></div>
      </div>
    `;

    card.appendChild(section);
  });
}

function renderSearchResults(results) {
  const container = document.createElement('div');
  container.className = 'search-results-list';

  if (!results.length) {
    const message = document.createElement('div');
    message.className = 'result-item';
    message.textContent = 'Nenhum resultado encontrado. Tente outro termo.';
    container.appendChild(message);
    return container;
  }

  results.forEach(item => {
    const card = document.createElement('div');
    card.className = 'result-item';
    card.innerHTML = `<strong>${item.title}</strong><br>${item.value}`;
    container.appendChild(card);
  });

  return container;
}

function handleSearch() {
  if (!searchInput || !searchResults) {
    return;
  }

  const query = searchInput.value.trim().toLowerCase();
  const existingResults = searchResults.querySelector('.search-results-list');
  if (existingResults) {
    existingResults.remove();
  }

  const results = query
    ? sampleData.filter(item => item.title.toLowerCase().includes(query) || item.value.toLowerCase().includes(query))
    : [];

  const newResults = renderSearchResults(results);
  searchResults.appendChild(newResults);
}

function updateSupervisorSummary() {
  const selectedCheckboxes = Array.from(document.querySelectorAll('.supervisor-checkbox:checked'));
  const count = selectedCheckboxes.length;
  supervisorCount.textContent = count === 0 
    ? '0 supervisores selecionados' 
    : `${count} supervisor${count !== 1 ? 'es' : ''} selecionado${count !== 1 ? 's' : ''}`;
  
  filterSupervisorCards();
}

function toggleSupervisorContainer() {
  isSupervisorExpanded = !isSupervisorExpanded;
  
  if (isSupervisorExpanded) {
    supervisorCheckboxContainer.classList.remove('collapsed');
    supervisorSummary.classList.add('expanded');
  } else {
    supervisorCheckboxContainer.classList.add('collapsed');
    supervisorSummary.classList.remove('expanded');
  }
}

function closeSupervisorContainer() {
  if (isSupervisorExpanded) {
    supervisorCheckboxContainer.classList.add('collapsed');
    supervisorSummary.classList.remove('expanded');
    isSupervisorExpanded = false;
  }
}

function populateSupervisorCheckboxes() {
  const selectedUo = uoFilter.value;
  const supervisorList = selectedUo && supervisorsByUO[selectedUo] ? supervisorsByUO[selectedUo] : [];
  
  supervisorCheckboxContainer.innerHTML = '';
  
  supervisorList.sort().forEach(supervisor => {
    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.className = 'checkbox-wrapper';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `supervisor-${supervisor}`;
    checkbox.value = supervisor;
    checkbox.className = 'supervisor-checkbox';
    checkbox.addEventListener('change', updateSupervisorSummary);
    
    const label = document.createElement('label');
    label.htmlFor = `supervisor-${supervisor}`;
    label.className = 'checkbox-label';
    
    const textSpan = document.createElement('span');
    textSpan.className = 'checkbox-text';
    textSpan.textContent = supervisor;
    label.appendChild(textSpan);

    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(label);
    supervisorCheckboxContainer.appendChild(checkboxWrapper);
  });
  
  updateSupervisorSummary();
}

function populateUoOptions() {
  const uoOptions = ['Todas as U.O.', 'U.O. 284', 'U.O. 286'];
  
  uoOptionsContainer.innerHTML = '';
  
  uoOptions.forEach((uo, index) => {
    const optionButton = document.createElement('button');
    optionButton.type = 'button';
    optionButton.className = 'uo-option-button';
    optionButton.textContent = uo;
    optionButton.addEventListener('click', () => {
      if (uo === 'Todas as U.O.') {
        uoFilter.value = '';
        uoSelected.textContent = uo;
      } else {
        uoFilter.value = uo;
        uoSelected.textContent = uo;
      }
      uoOptionsContainer.querySelectorAll('.uo-option-button').forEach(btn => btn.classList.remove('active'));
      optionButton.classList.add('active');
      populateSupervisorCheckboxes();
      filterSupervisorCards();
      closeUoContainer();
    });
    uoOptionsContainer.appendChild(optionButton);
    if (!uoFilter.value && index === 0) {
      optionButton.classList.add('active');
      uoFilter.value = '';
      uoSelected.textContent = uo;
    }
  });
}

function toggleUoContainer() {
  isUoExpanded = !isUoExpanded;
  
  if (isUoExpanded) {
    uoOptionsContainer.classList.remove('collapsed');
    uoSummary.classList.add('expanded');
  } else {
    uoOptionsContainer.classList.add('collapsed');
    uoSummary.classList.remove('expanded');
  }
}

function closeUoContainer() {
  if (isUoExpanded) {
    uoOptionsContainer.classList.add('collapsed');
    uoSummary.classList.remove('expanded');
    isUoExpanded = false;
  }
}

function formatDateDisplay(date) {
  return date.toLocaleDateString('pt-BR');
}

function formatDateISO(date) {
  return date.toISOString().split('T')[0];
}

function renderSupDatePicker() {
  const year = supDatePickerMonth.getFullYear();
  const month = supDatePickerMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const monthName = firstDay.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  supDatePopup.innerHTML = '';

  const hdr = document.createElement('div');
  hdr.className = 'date-picker-header';
  hdr.innerHTML = `
    <button type="button" id="supPrevMonth">‹</button>
    <div class="date-picker-title">${monthName}</div>
    <button type="button" id="supNextMonth">›</button>
  `;

  const weekdays = ['Sem','D','S','T','Q','Q','S','S'];
  const grid = document.createElement('div');
  grid.className = 'date-picker-grid date-picker-grid-week';

  weekdays.forEach(d => {
    const wd = document.createElement('div');
    wd.className = 'date-picker-weekday' + (d === 'Sem' ? ' week-num-header' : '');
    wd.textContent = d;
    grid.appendChild(wd);
  });

  const startOffset = firstDay.getDay();
  const lastDayWeekday = lastDay.getDay();
  const endPadding = (6 - lastDayWeekday + 7) % 7;
  const calStart = new Date(year, month, 1 - startOffset);
  const calEnd = new Date(year, month, lastDay.getDate() + endPadding);

  let weekStart = new Date(calStart);
  while (weekStart <= calEnd) {
    const thursday = new Date(weekStart.getTime() + 4 * 86400000);
    const weekNum = getWeekOfYear(thursday);
    const weekRange = getWeekRange(thursday);
    const isWeekSelected = supSelectedWeeks.some(w => w.start.getTime() === weekRange.start.getTime());

    const weekCell = document.createElement('button');
    weekCell.type = 'button';
    weekCell.className = 'date-picker-day week-num-cell' + (isWeekSelected ? ' selected' : '');
    weekCell.textContent = weekNum;
    weekCell.addEventListener('click', () => selectSupWeek(thursday));
    grid.appendChild(weekCell);

    for (let col = 0; col < 7; col++) {
      const dateVal = new Date(weekStart.getTime() + col * 86400000);
      const isCurrentMonth = dateVal.getMonth() === month && dateVal.getFullYear() === year;
      const isSelected = supSelectedDate && supSelectedDate.toDateString() === dateVal.toDateString();
      const inWeek = supSelectedWeeks.some(w => dateVal.getTime() >= w.start.getTime() && dateVal.getTime() <= w.end.getTime());
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'date-picker-day' +
        (!isCurrentMonth ? ' outside-day' : '') +
        (isSelected ? ' selected' : '') +
        (inWeek && !isSelected ? ' in-week' : '');
      btn.textContent = String(dateVal.getDate()).padStart(2, '0');
      btn.addEventListener('click', () => selectSupDate(dateVal));
      grid.appendChild(btn);
    }
    weekStart = new Date(weekStart.getTime() + 7 * 86400000);
  }

  const footer = document.createElement('div');
  footer.className = 'date-picker-footer';
  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.textContent = 'Limpar';
  clearBtn.addEventListener('click', clearSupDate);
  const todayBtn = document.createElement('button');
  todayBtn.type = 'button';
  todayBtn.textContent = 'Hoje';
  todayBtn.addEventListener('click', () => {
    const today = new Date();
    supDatePickerMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    selectSupDate(today);
  });
  footer.appendChild(clearBtn);
  footer.appendChild(todayBtn);

  supDatePopup.appendChild(hdr);
  supDatePopup.appendChild(grid);
  supDatePopup.appendChild(footer);

  document.getElementById('supPrevMonth').addEventListener('click', () => {
    supDatePickerMonth.setMonth(supDatePickerMonth.getMonth() - 1);
    renderSupDatePicker();
  });
  document.getElementById('supNextMonth').addEventListener('click', () => {
    supDatePickerMonth.setMonth(supDatePickerMonth.getMonth() + 1);
    renderSupDatePicker();
  });
}

function openSupDatePicker() {
  isSupDateOpen = true;
  supDatePopup.classList.remove('hidden');
  renderSupDatePicker();
}

function closeSupDatePicker() {
  if (!isSupDateOpen) return;
  isSupDateOpen = false;
  supDatePopup.classList.add('hidden');
}

function toggleSupDatePicker() {
  if (isSupDateOpen) { closeSupDatePicker(); } else { openSupDatePicker(); }
}

function updateSupWeekDisplay() {
  if (supSelectedWeeks.length === 0) { supDateDisplay.value = ''; return; }
  const sorted = [...supSelectedWeeks].sort((a, b) => a.start - b.start);
  const periodStart = sorted[0].start;
  const periodEnd = sorted[sorted.length - 1].end;
  const weekNums = sorted.map(w => `Sem ${w.weekNum}`).join(', ');
  const startStr = periodStart.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  const endStr = periodEnd.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  supDateDisplay.value = `${weekNums}  (${startStr} – ${endStr})`;
}

function selectSupDate(date) {
  supSelectedDate = date;
  supSelectedWeeks = [];
  supDateDisplay.value = date.toLocaleDateString('pt-BR');
  closeSupDatePicker();
  filterSupervisorCards();
}

function selectSupWeek(referenceDate) {
  const weekNum = getWeekOfYear(referenceDate);
  const range = getWeekRange(referenceDate);
  supSelectedDate = null;
  const existingIdx = supSelectedWeeks.findIndex(w => w.start.getTime() === range.start.getTime());
  if (existingIdx >= 0) {
    supSelectedWeeks.splice(existingIdx, 1);
  } else {
    supSelectedWeeks.push({ weekNum, start: range.start, end: range.end });
  }
  updateSupWeekDisplay();
  renderSupDatePicker();
  filterSupervisorCards();
}

function clearSupDate() {
  supSelectedDate = null;
  supSelectedWeeks = [];
  supDateDisplay.value = '';
  closeSupDatePicker();
  filterSupervisorCards();
}

function closeDatePicker() { closeSupDatePicker(); }

function showSupervisorView() {
  contentElement.classList.add('hidden');
  supervisorView.classList.remove('hidden');
  populateUoOptions();
  populateSupervisorCheckboxes();
  inicializarMetricasPerformanceSupervisor();
  atualizarSupervisorPerformanceCards();
  filterSupervisorCards();
  sincronizarBaseAcordosAndon().then(() => atualizarDashboardAndon()).catch(() => null);
}

function hideSupervisorView() {
  supervisorView.classList.add('hidden');
  contentElement.classList.remove('hidden');
}

function abrirMenuAndon() {
  if (!andonMenuDrawer || !andonMenuOverlay) return;
  andonMenuDrawer.classList.remove('hidden');
  andonMenuOverlay.classList.remove('hidden');
  andonMenuDrawer.setAttribute('aria-hidden', 'false');
}

function fecharMenuAndon() {
  if (!andonMenuDrawer || !andonMenuOverlay) return;
  andonMenuDrawer.classList.add('hidden');
  andonMenuOverlay.classList.add('hidden');
  andonMenuDrawer.setAttribute('aria-hidden', 'true');
}

function abrirDashboardAndon() {
  hideSupervisorView();
  fecharMenuAndon();
}

function abrirSupervisoresAndon() {
  showSupervisorView();
  fecharMenuAndon();
}

function filterSupervisorCards() {
  const selectedUo = uoFilter.value;
  const selectedSupervisorCheckboxes = Array.from(document.querySelectorAll('.supervisor-checkbox:checked'));
  const selectedSupervisors = selectedSupervisorCheckboxes.map(checkbox => checkbox.value);
  supervisorCards.forEach(card => {
    const cardUo = card.dataset.uo;
    const cardSupervisor = card.dataset.supervisor;
    const cardDate = card.dataset.date ? new Date(card.dataset.date + 'T00:00:00') : null;

    const matchesUo = !selectedUo || cardUo === selectedUo;
    const matchesSupervisor = selectedSupervisors.length === 0 || selectedSupervisors.includes(cardSupervisor);
    let matchesDate = true;
    if (supSelectedDate && cardDate) {
      matchesDate = supSelectedDate.toDateString() === cardDate.toDateString();
    } else if (supSelectedWeeks.length > 0 && cardDate) {
      matchesDate = supSelectedWeeks.some(w => cardDate.getTime() >= w.start.getTime() && cardDate.getTime() <= w.end.getTime());
    }

    card.style.display = matchesUo && matchesSupervisor && matchesDate ? '' : 'none';
  });
  atualizarSupervisorPerformanceCards();
}

if (andonMenuButton) {
  andonMenuButton.addEventListener('click', abrirMenuAndon);
}

if (andonMenuClose) {
  andonMenuClose.addEventListener('click', fecharMenuAndon);
}

if (andonMenuOverlay) {
  andonMenuOverlay.addEventListener('click', fecharMenuAndon);
}

document.querySelectorAll('.andon-menu-item').forEach(item => {
  item.addEventListener('click', () => {
    const href = item.dataset.href;
    const action = item.dataset.menuAction;

    if (href) {
      window.location.href = href;
      return;
    }

    if (action === 'dashboard') {
      abrirDashboardAndon();
      return;
    }

    if (action === 'supervisores') {
      abrirSupervisoresAndon();
    }
  });
});

supervisorButton.addEventListener('click', event => {
  event.preventDefault();
  showSupervisorView();
});

backButton.addEventListener('click', () => {
  hideSupervisorView();
});

function vincularModalCard(card, handler) {
  if (!card || card.dataset.modalBound) return;
  card.classList.add('andon-card-clickable');
  card.addEventListener('click', handler);
  card.dataset.modalBound = '1';
}

if (cardPerfTotalEquipes) {
  vincularModalCard(cardPerfTotalEquipes, () => {
    const rows = filtrarReportRowsComInicioJornada(filtrarReportRowsAndon());
    abrirModalEquipesAndonContexto({
      filtro: 'todas',
      rows,
      controleRows: obterControleRowsPorCodigos(obterCodigosReportRows(rows)),
      title: 'Total de Equipes',
      meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes com início de jornada: ${formatInt(obterCodigosReportRows(rows).size)}`,
      apenasComInicioJornada: true,
      tipoModal: 'performance'
    });
  });
}

if (cardPerfTotalEquipesLote) {
  vincularModalCard(cardPerfTotalEquipesLote, () => abrirModalEquipesDLoteProd({ somenteD: false }));
}

if (cardPerfEquipesDWm) {
  vincularModalCard(cardPerfEquipesDWm, () => {
    const rows = filtrarReportRowsComInicioJornada(filtrarReportRowsAndon());
    const baseD = obterEquipesDBaseTotal(rows);
    abrirModalEquipesAndonContexto({
      filtro: 'd',
      rows,
      controleRows: obterControleRowsPorCodigos(baseD.equipesD),
      title: 'Equipes D WM',
      meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes D com inÃ­cio de jornada: ${formatInt(baseD.equipesD.size)}`,
      apenasComInicioJornada: true,
      tipoModal: 'performance'
    });
  });
}

if (cardPerfEquipesDLote) {
  vincularModalCard(cardPerfEquipesDLote, abrirModalEquipesDLoteProd);
}

vincularModalCard(cardPerfClassificacaoWm, () => abrirModalEquipesAndonContexto({
  filtro: 'todas',
  rows: filtrarReportRowsComInicioJornada(filtrarReportRowsAndon()),
  title: 'Classificacao WM',
  meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Registros: ${perfTotalEquipes?.textContent || '0'}`,
  apenasComInicioJornada: true,
  tipoModal: 'performance'
}));
vincularModalCard(cardPerfClassificacaoLote, abrirModalLoteProdDetalhes);
vincularModalCard(cardPerfImpedimento, () => abrirModalControleServicoModelo('improdutivos', 'Impedimento'));
vincularModalCard(cardSdcaTotalEquipes, abrirModalSdcaTotalEquipes);
vincularModalCard(cardSdcaEquipesD, () => {
  const rows = filtrarReportRowsComInicioJornada(filtrarReportRowsAndon());
  abrirModalEquipesAndonContexto({
    filtro: 'd',
    rows,
    controleRows: obterControleRowsPorCodigos(obterEquipesDBaseTotal(rows).equipesD),
    title: 'Equipes D - Ações SDCA',
    meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes D com início de jornada: ${formatInt(obterEquipesDBaseTotal(rows).equipesD.size)}`,
    apenasComInicioJornada: true
  });
});

if (cardSdcaEquipesAcordadas) {
  vincularModalCard(cardSdcaEquipesAcordadas, abrirModalEquipesAcordadasDetalhado);
}

if (cardSdcaEquipesJustificadas) {
  vincularModalCard(cardSdcaEquipesJustificadas, abrirModalEquipesJustificadasDetalhado);
}

vincularModalCard(cardSdcaPercAcordadas, () => {
  const rows = filtrarReportRowsComInicioJornada(filtrarReportRowsAndon());
  abrirModalEquipesAndonContexto({
    filtro: 'acordadas',
    rows,
    controleRows: obterControleRowsPorCodigos(obterCodigosReportRows(rows)),
    title: '% Equipes Acordadas',
    meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes: ${sdcaEquipesAcordadas?.textContent || '0'}`,
    apenasComInicioJornada: true
  });
});
vincularModalCard(cardSdcaPercJustificadas, () => {
  const rows = filtrarReportRowsComInicioJornada(filtrarReportRowsAndon());
  abrirModalEquipesAndonContexto({
    filtro: 'justificadas',
    rows,
    controleRows: obterControleRowsPorCodigos(obterCodigosReportRows(rows)),
    title: '% Equipes Justificadas',
    meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes: ${sdcaEquipesJustificadas?.textContent || '0'}`,
    apenasComInicioJornada: true
  });
});

vincularModalCard(cardJourneyProdTotal, () => abrirModalJornadaProdutivaContexto('todas'));
vincularModalCard(cardJourneyProdMedPrimeiro, () => abrirModalJornadaProdutivaContexto('todas'));
vincularModalCard(cardJourneyProdMedUltimo, () => abrirModalJornadaProdutivaContexto('todas'));
vincularModalCard(cardJourneyProdMedJornada, () => abrirModalJornadaProdutivaContexto('todas'));
vincularModalCard(cardJourneyProdPercIncomp, () => abrirModalJornadaProdutivaContexto('incompleta'));

if (cardJourneyProdSemRefeicao) {
  vincularModalCard(cardJourneyProdSemRefeicao, abrirModalRefeicaoSemRegistro);
}

vincularModalCard(cardJornadaTrabalhoTotal, () => {
  const rows = filtrarReportRowsComInicioJornada(filtrarReportRowsAndon());
  abrirModalEquipesAndonContexto({
    filtro: 'todas',
    rows,
    controleRows: obterControleRowsPorCodigos(obterCodigosReportRows(rows)),
    title: 'Total de Equipes Efetiva - Jornada de Trabalho',
    meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes com inÃ­cio de jornada: ${formatInt(obterCodigosReportRows(rows).size)}`,
    apenasComInicioJornada: true
  });
});

if (cardJornadaTrabalhoAtraso) {
  vincularModalCard(cardJornadaTrabalhoAtraso, () => {
    abrirModalJornadaOcorrencia('atraso', {
      title: 'Atraso',
      meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Registros: ${jornadaTrabalhoValores['ATRASO']?.textContent || '0'}`
    });
  });
}

if (cardJornadaTrabalhoSaidaAntecipada) {
  vincularModalCard(cardJornadaTrabalhoSaidaAntecipada, () => {
    abrirModalJornadaOcorrencia('saida-antecipada', {
      title: 'Saída Antecipada',
      meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Registros: ${jornadaTrabalhoValores['SAIDA ANTECIPADA']?.textContent || '0'}`
    });
  });
}

if (cardJornadaTrabalhoAbsenteismo) {
  vincularModalCard(cardJornadaTrabalhoAbsenteismo, () => {
    abrirModalAbsenteismo({
      title: 'Absenteísmo',
      meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'}`
    });
  });
}

vincularModalCard(cardJornadaTrabalhoHoraExtra, abrirModalHoraExtra);
vincularModalCard(cardEficienciaTotal, abrirModalResumoControleServicoPorEquipe);
vincularModalCard(cardEficienciaServDesignados, () => abrirModalControleServicoModelo('todos', 'Serviços Designados'));
vincularModalCard(cardEficienciaServExecutados, () => abrirModalControleServicoModelo('executados', 'Serviços Executados'));
vincularModalCard(cardEficienciaServProdutivo, () => abrirModalControleServicoModelo('produtivos', 'Serviços Produtivos'));
vincularModalCard(cardEficienciaServImprodutivos, () => abrirModalControleServicoModelo('improdutivos', 'Serviços Improdutivos'));
vincularModalCard(cardEficienciaPercImprod, () => abrirModalControleServicoModelo('improdutivos', '% Serviço Improdutivo'));
vincularModalCard(cardEficienciaMediaServico, () => abrirModalControleServicoModelo('todos', 'Média de Serviço por Equipe'));
vincularModalCard(cardEficienciaSemServico, abrirModalEquipesSemServico);

if (equipesModalClose) {
  equipesModalClose.addEventListener('click', fecharModalEquipesAndon);
}

const equipesModalBack = obterBotaoVoltarModalEquipes();
if (equipesModalBack) {
  equipesModalBack.addEventListener('click', voltarModalEquipesAnterior);
}

const equipesModalExportImage = obterBotaoExportarImagemModalEquipes();
if (equipesModalExportImage) {
  equipesModalExportImage.addEventListener('click', exportarImagemModalEquipes);
}

const equipesModalAnaliseJustificadas = obterBotaoAnaliseJustificadasModal();
if (equipesModalAnaliseJustificadas) {
  equipesModalAnaliseJustificadas.addEventListener('click', () => {
    const emAnalise = equipesModal?.classList.contains('andon-modal-justificadas-analytics');
    if (emAnalise) {
      abrirModalEquipesJustificadasDetalhado();
      return;
    }
    renderizarAnaliseJustificadasModal('');
  });
}

if (equipesModalBody) {
  equipesModalBody.addEventListener('click', (event) => {
    const alvoHistoricoPerformance = event.target.closest('.andon-performance-hist-btn');
    if (alvoHistoricoPerformance) {
      abrirHistoricoPerformanceEquipe(alvoHistoricoPerformance.dataset.performanceHistCodigo || '');
      return;
    }

    const alvoHistoricoJust = event.target.closest('.andon-just-hist-btn');
    if (alvoHistoricoJust) {
      abrirHistoricoJustificadasEquipe(modalJustificadasAnaliseEstado.historico?.get(alvoHistoricoJust.dataset.justHistId) || {});
      return;
    }

    const alvoDias = event.target.closest('.andon-dias-trab-btn, .andon-dias-trab-cell');
    if (!alvoDias) return;
    event.preventDefault();
    event.stopPropagation();
    abrirModalDetalheDiasTrabalhadosEquipe(alvoDias.dataset.diasId);
  });
}

if (equipesModal) {
  equipesModal.addEventListener('click', (event) => {
    if (event.target === equipesModal) fecharModalEquipesAndon();
  });
}

supervisorSummary.addEventListener('click', event => {
  event.stopPropagation();
  closeUoContainer();
  closeSupDatePicker();
  toggleSupervisorContainer();
});

uoSummary.addEventListener('click', event => {
  event.stopPropagation();
  closeSupervisorContainer();
  closeSupDatePicker();
  toggleUoContainer();
});

supDateDisplay.addEventListener('click', event => {
  event.stopPropagation();
  closeSupervisorContainer();
  closeUoContainer();
  toggleSupDatePicker();
});
supDateClear.addEventListener('click', event => {
  event.stopPropagation();
  clearSupDate();
});

document.addEventListener('click', event => {
  if (supervisorView.classList.contains('hidden')) return;
  
  const supervisorWrapper = supervisorCheckboxContainer.closest('.supervisor-wrapper');
  const uoWrapper = uoOptionsContainer.closest('.uo-wrapper');
  if (supervisorWrapper && !supervisorWrapper.contains(event.target)) {
    closeSupervisorContainer();
  }
  if (uoWrapper && !uoWrapper.contains(event.target)) {
    closeUoContainer();
  }

  if (supDateWrapper && !supDateWrapper.contains(event.target)) {
    closeSupDatePicker();
  }
});

if (searchButton) {
  searchButton.addEventListener('click', handleSearch);
}

if (searchInput) {
  searchInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });
}

window.addEventListener('load', () => {
  if (searchInput) {
    searchInput.value = '';
  }
  appendEfficiencySections();
  tagSupervisorSections();
  inicializarMetricasPerformanceSupervisor();
  populateUoOptions();
  populateSupervisorCheckboxes();
  carregarDadosAndon();
});

// ─── Header Filters (DATA & MÊS) ─────────────────────────────────────────────
const headerDateWrapper = document.getElementById('headerDateWrapper');
const headerDateDisplay = document.getElementById('headerDateDisplay');
const headerDateClear = document.getElementById('headerDateClear');
const headerDatePopup = document.getElementById('headerDatePopup');

const headerUoWrapper = document.getElementById('headerUoWrapper');
const headerUoDisplay = document.getElementById('headerUoDisplay');
const headerUoClear = document.getElementById('headerUoClear');
const headerUoPopup = document.getElementById('headerUoPopup');

const headerMonthWrapper = document.getElementById('headerMonthWrapper');
const headerMonthDisplay = document.getElementById('headerMonthDisplay');
const headerMonthClear = document.getElementById('headerMonthClear');
const headerMonthPopup = document.getElementById('headerMonthPopup');
const headerSupervisorWrapper = document.getElementById('headerSupervisorWrapper');
const headerSupervisorDisplay = document.getElementById('headerSupervisorDisplay');
const headerSupervisorClear = document.getElementById('headerSupervisorClear');
const headerSupervisorPopup = document.getElementById('headerSupervisorPopup');

let headerSelectedUo = '';
let headerSelectedSupervisor = '';
let headerSelectedDate = null;
let headerSelectedMonth = null;   // { year, month } (0-indexed)
let headerSelectedWeeks = [];     // array de { weekNum, start (Seg), end (Dom) } — acumulativo
let headerDatePickerMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let headerMonthPickerYear = new Date().getFullYear();
let isHeaderUoOpen = false;
let isHeaderDateOpen = false;
let isHeaderMonthOpen = false;
let isHeaderSupervisorOpen = false;

const MONTH_NAMES_PT = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

function fmtHeaderDate(date) {
  return date.toLocaleDateString('pt-BR');
}

function fmtHeaderMonth(year, month) {
  return new Date(year, month, 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
}

function renderHeaderUoOptions() {
  const uoOptions = ['Todas as U.O.', ...andonAvailableUos.map(uo => `U.O. ${uo}`)];
  headerUoPopup.innerHTML = '';

  uoOptions.forEach(option => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'header-filter-option';
    button.textContent = option;

    const optionValue = option === 'Todas as U.O.' ? '' : option;
    if (headerSelectedUo === optionValue || (!headerSelectedUo && optionValue === '')) {
      button.classList.add('active');
    }

    button.addEventListener('click', () => {
      headerSelectedUo = optionValue;
      headerUoDisplay.value = option;
      garantirSupervisorSelecionadoDisponivel();
      closeHeaderUoPicker();
      renderHeaderUoOptions();
      renderHeaderSupervisorOptions();
      atualizarDashboardAndon();
    });

    headerUoPopup.appendChild(button);
  });
}

function openHeaderUoPicker() {
  closeHeaderDatePicker();
  closeHeaderMonthPicker();
  closeHeaderSupervisorPicker();
  isHeaderUoOpen = true;
  headerUoPopup.classList.remove('hidden');
  headerUoDisplay.classList.add('active');
  renderHeaderUoOptions();
}

function closeHeaderUoPicker() {
  if (!isHeaderUoOpen) return;
  isHeaderUoOpen = false;
  headerUoPopup.classList.add('hidden');
  headerUoDisplay.classList.remove('active');
}

function clearHeaderUo() {
  headerSelectedUo = '';
  headerUoDisplay.value = 'Todas as U.O.';
  garantirSupervisorSelecionadoDisponivel();
  renderHeaderUoOptions();
  renderHeaderSupervisorOptions();
  closeHeaderUoPicker();
  atualizarDashboardAndon();
}

function obterSupervisoresHeaderDisponiveis() {
  const uoSelecionada = String(headerSelectedUo || '').replace(/[^\d]/g, '');
  const mapa = new Map();
  andonReportRows.forEach((row) => {
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA']));
    if (!linhaPassaFiltrosPeriodo(dataIso)) return;
    if (uoSelecionada && obterUoLinha(row) !== uoSelecionada) return;
    const supervisor = String(obterValorPrimeiro(row, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR', 'SUPERVISOR_EQUIPE']) || '').trim();
    if (!supervisor) return;
    const chave = normalizarTextoFiltroModal(supervisor);
    if (!mapa.has(chave)) mapa.set(chave, supervisor);
  });
  return Array.from(mapa.values()).sort((a, b) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }));
}

function garantirSupervisorSelecionadoDisponivel() {
  if (!headerSelectedSupervisor) return;
  const disponiveis = new Set(obterSupervisoresHeaderDisponiveis().map((nome) => normalizarTextoFiltroModal(nome)));
  if (!disponiveis.has(normalizarTextoFiltroModal(headerSelectedSupervisor))) {
    headerSelectedSupervisor = '';
    if (headerSupervisorDisplay) headerSupervisorDisplay.value = 'Todos';
  }
}

function renderHeaderSupervisorOptions() {
  if (!headerSupervisorPopup) return;
  const supervisores = ['Todos', ...obterSupervisoresHeaderDisponiveis()];
  headerSupervisorPopup.innerHTML = '';

  supervisores.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'header-filter-option';
    button.textContent = option;

    const optionValue = option === 'Todos' ? '' : option;
    if (normalizarTextoFiltroModal(headerSelectedSupervisor) === normalizarTextoFiltroModal(optionValue)) {
      button.classList.add('active');
    }

    button.addEventListener('click', () => {
      headerSelectedSupervisor = optionValue;
      headerSupervisorDisplay.value = option;
      limparCacheAndon();
      closeHeaderSupervisorPicker();
      renderHeaderSupervisorOptions();
      atualizarDashboardAndon();
    });

    headerSupervisorPopup.appendChild(button);
  });
}

function openHeaderSupervisorPicker() {
  closeHeaderUoPicker();
  closeHeaderDatePicker();
  closeHeaderMonthPicker();
  isHeaderSupervisorOpen = true;
  headerSupervisorPopup.classList.remove('hidden');
  headerSupervisorDisplay.classList.add('active');
  renderHeaderSupervisorOptions();
}

function closeHeaderSupervisorPicker() {
  if (!isHeaderSupervisorOpen) return;
  isHeaderSupervisorOpen = false;
  headerSupervisorPopup.classList.add('hidden');
  headerSupervisorDisplay.classList.remove('active');
}

function clearHeaderSupervisor() {
  headerSelectedSupervisor = '';
  headerSupervisorDisplay.value = 'Todos';
  limparCacheAndon();
  renderHeaderSupervisorOptions();
  closeHeaderSupervisorPicker();
  atualizarDashboardAndon();
}

// ─── Day Picker ───────────────────────────────────────────────────────────────
function getWeekRange(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0=Dom, 6=Sab
  const sunday = new Date(d);
  sunday.setDate(d.getDate() - day); // recua até domingo
  sunday.setHours(0, 0, 0, 0);
  const saturday = new Date(sunday);
  saturday.setDate(sunday.getDate() + 6);
  saturday.setHours(23, 59, 59, 999);
  return { start: sunday, end: saturday };
}

function getWeekOfYear(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function renderHeaderDatePicker() {
  const year = headerDatePickerMonth.getFullYear();
  const month = headerDatePickerMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const monthName = firstDay.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  headerDatePopup.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'date-picker-header';
  header.innerHTML = `
    <button type="button" id="hPrevMonth">‹</button>
    <div class="date-picker-title">${monthName}</div>
    <button type="button" id="hNextMonth">›</button>
  `;

  // 8 colunas: Sem + D S T Q Q S S
  const weekdays = ['Sem','D','S','T','Q','Q','S','S'];
  const grid = document.createElement('div');
  grid.className = 'date-picker-grid date-picker-grid-week';

  weekdays.forEach(d => {
    const wd = document.createElement('div');
    wd.className = 'date-picker-weekday' + (d === 'Sem' ? ' week-num-header' : '');
    wd.textContent = d;
    grid.appendChild(wd);
  });

  const startOffset = firstDay.getDay(); // 0 = Domingo
  const lastDayWeekday = lastDay.getDay();
  const endPadding = (6 - lastDayWeekday + 7) % 7; // dias do próx. mês para fechar últ. semana

  // Primeiro domingo visível (pode ser do mês anterior)
  const calStart = new Date(year, month, 1 - startOffset);
  // Último sábado visível (pode ser do mês seguinte)
  const calEnd = new Date(year, month, lastDay.getDate() + endPadding);

  let weekStart = new Date(calStart);

  while (weekStart <= calEnd) {
    // Usa a quinta-feira da semana como referência ISO para número de semana
    const thursday = new Date(weekStart.getTime() + 4 * 86400000);
    const weekNum = getWeekOfYear(thursday);
    const weekRange = getWeekRange(thursday);
    const isWeekSelected = headerSelectedWeeks.some(
      w => w.start.getTime() === weekRange.start.getTime()
    );

    // Célula do número da semana
    const weekCell = document.createElement('button');
    weekCell.type = 'button';
    weekCell.className = 'date-picker-day week-num-cell' + (isWeekSelected ? ' selected' : '');
    weekCell.textContent = weekNum;
    weekCell.addEventListener('click', () => selectHeaderWeek(thursday));
    grid.appendChild(weekCell);

    // 7 células de dias
    for (let col = 0; col < 7; col++) {
      const dateVal = new Date(weekStart.getTime() + col * 86400000);
      const isCurrentMonth = dateVal.getMonth() === month && dateVal.getFullYear() === year;
      const isSelected = headerSelectedDate && headerSelectedDate.toDateString() === dateVal.toDateString();
      const inWeek = headerSelectedWeeks.some(
        w => dateVal.getTime() >= w.start.getTime() && dateVal.getTime() <= w.end.getTime()
      );
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'date-picker-day' +
        (!isCurrentMonth ? ' outside-day' : '') +
        (isSelected ? ' selected' : '') +
        (inWeek && !isSelected ? ' in-week' : '');
      btn.textContent = String(dateVal.getDate()).padStart(2, '0');
      btn.addEventListener('click', () => selectHeaderDate(dateVal));
      grid.appendChild(btn);
    }

    weekStart = new Date(weekStart.getTime() + 7 * 86400000);
  }

  const footer = document.createElement('div');
  footer.className = 'date-picker-footer';
  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.textContent = 'Limpar';
  clearBtn.addEventListener('click', clearHeaderDate);
  const todayBtn = document.createElement('button');
  todayBtn.type = 'button';
  todayBtn.textContent = 'Hoje';
  todayBtn.addEventListener('click', () => {
    const today = new Date();
    headerDatePickerMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    selectHeaderDate(today);
  });
  footer.appendChild(clearBtn);
  footer.appendChild(todayBtn);

  headerDatePopup.appendChild(header);
  headerDatePopup.appendChild(grid);
  headerDatePopup.appendChild(footer);

  document.getElementById('hPrevMonth').addEventListener('click', () => {
    headerDatePickerMonth.setMonth(headerDatePickerMonth.getMonth() - 1);
    renderHeaderDatePicker();
  });
  document.getElementById('hNextMonth').addEventListener('click', () => {
    headerDatePickerMonth.setMonth(headerDatePickerMonth.getMonth() + 1);
    renderHeaderDatePicker();
  });
}

function openHeaderDatePicker() {
  closeHeaderUoPicker();
  closeHeaderMonthPicker();
  closeHeaderSupervisorPicker();
  isHeaderDateOpen = true;
  headerDatePopup.classList.remove('hidden');
  headerDateDisplay.classList.add('active');
  renderHeaderDatePicker();
}

function closeHeaderDatePicker() {
  if (!isHeaderDateOpen) return;
  isHeaderDateOpen = false;
  headerDatePopup.classList.add('hidden');
  headerDateDisplay.classList.remove('active');
}

function updateWeekDisplay() {
  if (headerSelectedWeeks.length === 0) {
    headerDateDisplay.value = '';
    return;
  }
  const sorted = [...headerSelectedWeeks].sort((a, b) => a.start - b.start);
  const periodStart = sorted[0].start;
  const periodEnd = sorted[sorted.length - 1].end;
  const weekNums = sorted.map(w => `Sem ${w.weekNum}`).join(', ');
  const startStr = periodStart.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  const endStr = periodEnd.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  headerDateDisplay.value = `${weekNums}  (${startStr} – ${endStr})`;
  headerSelectedMonth = null;
  headerMonthDisplay.value = '';
  headerMonthPickerYear = periodStart.getFullYear();
  garantirSupervisorSelecionadoDisponivel();
  renderHeaderSupervisorOptions();
}

function selectHeaderDate(date) {
  headerSelectedDate = date;
  headerSelectedWeeks = []; // limpa seleção de semanas
  headerDateDisplay.value = fmtHeaderDate(date);
  headerSelectedMonth = null;
  headerMonthDisplay.value = '';
  headerMonthPickerYear = date.getFullYear();
  garantirSupervisorSelecionadoDisponivel();
  renderHeaderSupervisorOptions();
  closeHeaderDatePicker();
  atualizarDashboardAndon();
}

function selectHeaderWeek(referenceDate) {
  const weekNum = getWeekOfYear(referenceDate);
  const range = getWeekRange(referenceDate);
  headerSelectedDate = null; // limpa seleção de dia individual

  const existingIdx = headerSelectedWeeks.findIndex(
    w => w.start.getTime() === range.start.getTime()
  );
  if (existingIdx >= 0) {
    // Já selecionada → remove (deseleciona)
    headerSelectedWeeks.splice(existingIdx, 1);
  } else {
    // Nova semana → adiciona ao acumulado
    headerSelectedWeeks.push({ weekNum, start: range.start, end: range.end });
  }

  updateWeekDisplay();
  garantirSupervisorSelecionadoDisponivel();
  renderHeaderSupervisorOptions();
  renderHeaderDatePicker(); // re-renderiza para destacar semanas acumuladas
  atualizarDashboardAndon();
}

function clearHeaderDate() {
  headerSelectedDate = null;
  headerSelectedWeeks = [];
  headerDateDisplay.value = '';
  garantirSupervisorSelecionadoDisponivel();
  renderHeaderSupervisorOptions();
  closeHeaderDatePicker();
  atualizarDashboardAndon();
}

// ─── Month Picker ─────────────────────────────────────────────────────────────
function renderHeaderMonthPicker() {
  headerMonthPopup.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'date-picker-header';
  header.innerHTML = `
    <button type="button" id="hPrevYear">‹</button>
    <div class="date-picker-title">${headerMonthPickerYear}</div>
    <button type="button" id="hNextYear">›</button>
  `;

  const grid = document.createElement('div');
  grid.className = 'month-picker-grid';

  MONTH_NAMES_PT.forEach((name, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'month-picker-btn';
    btn.textContent = name;
    if (headerSelectedMonth && headerSelectedMonth.year === headerMonthPickerYear && headerSelectedMonth.month === idx) {
      btn.classList.add('selected');
    }
    btn.addEventListener('click', () => selectHeaderMonth(headerMonthPickerYear, idx));
    grid.appendChild(btn);
  });

  const footer = document.createElement('div');
  footer.className = 'date-picker-footer';
  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.textContent = 'Limpar';
  clearBtn.addEventListener('click', clearHeaderMonth);
  const thisMonthBtn = document.createElement('button');
  thisMonthBtn.type = 'button';
  thisMonthBtn.textContent = 'Mês Atual';
  thisMonthBtn.addEventListener('click', () => {
    const now = new Date();
    headerMonthPickerYear = now.getFullYear();
    selectHeaderMonth(now.getFullYear(), now.getMonth());
  });
  footer.appendChild(clearBtn);
  footer.appendChild(thisMonthBtn);

  headerMonthPopup.appendChild(header);
  headerMonthPopup.appendChild(grid);
  headerMonthPopup.appendChild(footer);

  document.getElementById('hPrevYear').addEventListener('click', () => {
    headerMonthPickerYear--;
    renderHeaderMonthPicker();
  });
  document.getElementById('hNextYear').addEventListener('click', () => {
    headerMonthPickerYear++;
    renderHeaderMonthPicker();
  });
}

function openHeaderMonthPicker() {
  closeHeaderUoPicker();
  closeHeaderDatePicker();
  closeHeaderSupervisorPicker();
  isHeaderMonthOpen = true;
  headerMonthPopup.classList.remove('hidden');
  headerMonthDisplay.classList.add('active');
  renderHeaderMonthPicker();
}

function closeHeaderMonthPicker() {
  if (!isHeaderMonthOpen) return;
  isHeaderMonthOpen = false;
  headerMonthPopup.classList.add('hidden');
  headerMonthDisplay.classList.remove('active');
}

function selectHeaderMonth(year, month) {
  headerSelectedMonth = { year, month };
  headerMonthDisplay.value = fmtHeaderMonth(year, month);
  headerMonthPickerYear = year;
  headerSelectedDate = null;
  headerSelectedWeeks = [];
  headerDateDisplay.value = '';
  // Navega o calendário de dia para o mês escolhido
  headerDatePickerMonth = new Date(year, month, 1);
  garantirSupervisorSelecionadoDisponivel();
  renderHeaderSupervisorOptions();
  closeHeaderMonthPicker();
  atualizarDashboardAndon();
}

function clearHeaderMonth() {
  headerSelectedMonth = null;
  headerMonthDisplay.value = '';
  garantirSupervisorSelecionadoDisponivel();
  renderHeaderSupervisorOptions();
  closeHeaderMonthPicker();
  atualizarDashboardAndon();
}

// ─── Event Listeners Header Filters ──────────────────────────────────────────
headerDateDisplay.addEventListener('click', e => {
  e.stopPropagation();
  if (isHeaderDateOpen) closeHeaderDatePicker();
  else openHeaderDatePicker();
});

headerUoDisplay.addEventListener('click', e => {
  e.stopPropagation();
  if (isHeaderUoOpen) closeHeaderUoPicker();
  else openHeaderUoPicker();
});

headerUoClear.addEventListener('click', e => {
  e.stopPropagation();
  clearHeaderUo();
});

headerDateClear.addEventListener('click', e => {
  e.stopPropagation();
  clearHeaderDate();
});

headerMonthDisplay.addEventListener('click', e => {
  e.stopPropagation();
  if (isHeaderMonthOpen) closeHeaderMonthPicker();
  else openHeaderMonthPicker();
});

headerMonthClear.addEventListener('click', e => {
  e.stopPropagation();
  clearHeaderMonth();
});

headerSupervisorDisplay.addEventListener('click', e => {
  e.stopPropagation();
  if (isHeaderSupervisorOpen) closeHeaderSupervisorPicker();
  else openHeaderSupervisorPicker();
});

headerSupervisorClear.addEventListener('click', e => {
  e.stopPropagation();
  clearHeaderSupervisor();
});

document.addEventListener('click', e => {
  if (!headerUoWrapper.contains(e.target)) closeHeaderUoPicker();
  if (!headerDateWrapper.contains(e.target)) closeHeaderDatePicker();
  if (!headerMonthWrapper.contains(e.target)) closeHeaderMonthPicker();
  if (!headerSupervisorWrapper.contains(e.target)) closeHeaderSupervisorPicker();
});

headerUoDisplay.value = 'Todas as U.O.';
headerSupervisorDisplay.value = 'Todos';
