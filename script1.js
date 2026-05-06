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
const MODAL_PAGE_SIZE = 300;
let modalTabelaEstado = null;

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
  return parseFloat(String(value).trim().replace(/\./g, '').replace(',', '.')) || 0;
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
  }).format(Number(value || 0) / 100);
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
    obterValorPrimeiro(row, ['DATA_ATUALIZACAO', 'DATA_ATUALIZAÇÃO', 'DATA_ATUALIZAÃ‡ÃƒO', 'DATA_ATUALIZACAO_D', 'DATA_DESIGNACAO', 'DATA DESIGNACAO', 'DESIGNACAO'])
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

function obterChaveCacheFiltroAndon() {
  const uo = String(headerSelectedUo || '').replace(/[^\d]/g, '') || 'todas';
  const semanas = headerSelectedWeeks
    .map((week) => `${normalizarDataIso(week.start)}>${normalizarDataIso(week.end)}`)
    .join(',');
  const mes = headerSelectedMonth
    ? `${headerSelectedMonth.year}-${String(headerSelectedMonth.month + 1).padStart(2, '0')}`
    : '';

  return [
    obterChavePeriodoFiltroAndon(),
    uo,
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
    return linhaPassaFiltrosPeriodo(dataIso);
  });
  return cache.reportRows;
}

function filtrarControleRowsAndon() {
  const cache = obterCacheFiltroAndon();
  if (cache.controleRows) return cache.controleRows;
  cache.controleRows = andonControleRows.filter((row) => {
    const dataIso = obterDataControleLinha(row);
    const uo = obterUoLinha(row);
    if (headerSelectedUo && uo !== headerSelectedUo.replace(/[^\d]/g, '')) return false;
    return linhaPassaFiltrosPeriodo(dataIso);
  });
  return cache.controleRows;
}

function filtrarFolhaPontoRowsAndon() {
  const cache = obterCacheFiltroAndon();
  if (cache.folhaPontoRows) return cache.folhaPontoRows;
  cache.folhaPontoRows = andonFolhaPontoRows.filter((row) => {
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
    if (!linhaPassaFiltrosPeriodo(dataIso)) return false;
    const uo = String(obterValorPrimeiro(row, ['COD_UO', 'UO']) || '').replace(/[^\d]/g, '');
    if (headerSelectedUo && uo && uo !== headerSelectedUo.replace(/[^\d]/g, '')) return false;
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

function obterCodigosReportRows(rows = []) {
  return new Set(rows.map((row) => String(obterCodigoEquipeLinha(row) || '').trim()).filter(Boolean));
}

function filtrarLoteProdPorCodigos(rows = [], codigos = new Set()) {
  if (!codigos || !codigos.size) return [];
  return rows.filter((row) => codigos.has(obterCodigoEquipeLote(row)));
}

function calcularClassificacaoLoteProdEquipes(rows = []) {
  const totalMeta = rows.reduce((acc, row) => acc + toNumberSafe(obterValorPrimeiro(row, ['META', 'Meta'])), 0);
  const totalProducao = rows.reduce((acc, row) => acc + toNumberSafe(obterValorPrimeiro(row, ['VALOR_US', 'Valor_US', 'valor_us'])), 0);
  return totalMeta > 0 ? formatClassificacao((totalProducao / totalMeta) * 100) : '--';
}

function calcularResumoLoteProd(rows = []) {
  const totalMeta = rows.reduce((acc, row) => acc + toNumberSafe(obterValorPrimeiro(row, ['META', 'Meta'])), 0);
  const totalProducao = rows.reduce((acc, row) => acc + toNumberSafe(obterValorPrimeiro(row, ['VALOR_US', 'Valor_US', 'valor_us'])), 0);
  const percentual = totalMeta > 0 ? (totalProducao / totalMeta) * 100 : NaN;
  const codigosUoAtual = obterCodigosEquipesUoAtual();
  const equipesD = codigosUoAtual
    ? filtrarLoteProdEquipesDRowsAndon().filter((row) => {
        const codigo = String(obterValorPrimeiro(row, ['COD_EQUIPE', 'COD_EQUIPE_WM', 'NUM_EQUIPE']) || '').trim();
        return codigosUoAtual.has(codigo);
      }).length
    : rows.reduce((acc, row) => {
        const totalD = obterValorPrimeiro(row, ['EQUIPES_D', 'equipes_d']);
        if (totalD !== '') return acc + toNumberSafe(totalD);
        const faixa = String(obterValorPrimeiro(row, ['FAIXA_DIA', 'Faixa_Dia', 'faixa_dia']) || '').trim().toUpperCase();
        return acc + (faixa === 'D' ? 1 : 0);
      }, 0);

  return {
    classificacao: formatClassificacao(percentual),
    equipesD
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

function renderCabecalhoModalEquipesPadrao() {
  removerResumoControleServicoModal();
  const tr = document.querySelector('#equipesModal thead tr');
  if (!tr) return;
  tr.innerHTML = `
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
  `;
}

function renderCabecalhoModalEquipesDLoteProd() {
  removerResumoControleServicoModal();
  const tr = document.querySelector('#equipesModal thead tr');
  if (!tr) return;
  tr.innerHTML = `
    <th>Data</th>
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

function renderCabecalhoModalAbsenteismo() {
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
  const tr = document.querySelector('#equipesModal thead tr');
  if (!tr) return;
  tr.innerHTML = colunas.map((coluna, index) => `
    <th>
      <button type="button" class="andon-modal-sort" data-col="${index}">
        <span>${coluna.label}</span>
        <span class="andon-modal-sort-icon">↕</span>
      </button>
      <select class="andon-modal-filter-select" data-col="${index}" title="Filtrar coluna">
        <option value="">Todos</option>
      </select>
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
  return `<tr>${columns.map((coluna) => `<td>${obterValorCelulaModal(row, coluna)}</td>`).join('')}</tr>`;
}

function obterRowsFiltradasModal() {
  if (!modalTabelaEstado) return [];
  const { rows, columns, filtros } = modalTabelaEstado;
  return rows.filter((row) => columns.every((coluna, index) => {
    const filtro = filtros[index];
    if (!filtro) return true;
    return normalizarTextoFiltroModal(obterValorCelulaModal(row, coluna)) === filtro;
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
    modalTabelaEstado.filtros = Array.from(document.querySelectorAll('#equipesModal .andon-modal-filter-select'))
      .map((select) => select.value || '');
    modalTabelaEstado.page = 1;
    renderizarPaginaModalEstado();
    return;
  }
  const filtros = Array.from(document.querySelectorAll('#equipesModal .andon-modal-filter-select'))
    .map((input) => normalizarTextoFiltroModal(input.value));
  obterLinhasDadosModal().forEach((tr) => {
    const visivel = filtros.every((filtro, index) => {
      if (!filtro) return true;
      const texto = normalizarTextoFiltroModal(tr.children[index]?.textContent || '');
      return texto === filtro;
    });
    tr.classList.toggle('andon-modal-row-hidden', !visivel);
  });
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

function preencherListasFiltroModal() {
  document.querySelectorAll('#equipesModal .andon-modal-filter-select').forEach((select) => {
    const index = Number(select.dataset.col || 0);
    const valorAtual = select.value;
    const valores = new Map();
    if (modalTabelaEstado) {
      const coluna = modalTabelaEstado.columns[index];
      for (const row of modalTabelaEstado.rows) {
        const texto = obterValorCelulaModal(row, coluna).trim();
        if (!texto) continue;
        const chave = normalizarTextoFiltroModal(texto);
        if (!valores.has(chave)) valores.set(chave, texto);
        if (valores.size >= 300) break;
      }
    } else {
      obterLinhasDadosModal().forEach((tr) => {
        const texto = String(tr.children[index]?.textContent || '').trim();
        if (!texto) return;
        const chave = normalizarTextoFiltroModal(texto);
        if (!valores.has(chave)) valores.set(chave, texto);
      });
    }

    const ordenados = Array.from(valores.entries())
      .sort((a, b) => String(a[1]).localeCompare(String(b[1]), 'pt-BR', { numeric: true, sensitivity: 'base' }))
      .slice(0, 300);

    select.innerHTML = '<option value="">Todos</option>' + ordenados
      .map(([chave, texto]) => `<option value="${chave}">${texto}</option>`)
      .join('');

    if (valorAtual && valores.has(valorAtual)) select.value = valorAtual;
  });
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
  ths.forEach((th, index) => {
    if (th.querySelector('.andon-modal-filter-select')) return;
    const label = th.textContent.trim() || `Coluna ${index + 1}`;
    th.innerHTML = `
      <button type="button" class="andon-modal-sort" data-col="${index}">
        <span>${label}</span>
        <span class="andon-modal-sort-icon">↕</span>
      </button>
      <select class="andon-modal-filter-select" data-col="${index}" title="Filtrar coluna">
        <option value="">Todos</option>
      </select>
    `;
  });
  preencherListasFiltroModal();
  document.querySelectorAll('#equipesModal .andon-modal-filter-select').forEach((input) => {
    if (input.dataset.filtroBound === '1') return;
    input.dataset.filtroBound = '1';
    input.addEventListener('change', () => {
      input.classList.toggle('ativo', Boolean(input.value));
      aplicarFiltrosModalAtual();
    });
  });
  document.querySelectorAll('#equipesModal .andon-modal-sort').forEach((btn) => {
    if (btn.dataset.sortBound === '1') return;
    btn.dataset.sortBound = '1';
    btn.addEventListener('click', () => ordenarModalPorColuna(Number(btn.dataset.col || 0)));
  });
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

function abrirModalTabelaGenerica({ title = 'Detalhes', meta = '', columns = [], rows = [], empty = 'Nenhum registro encontrado.' } = {}) {
  if (!equipesModal || !equipesModalBody) return;
  const listaRows = Array.isArray(rows) ? rows : Array.from(rows || []);
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
  equipesModal?.classList.remove('andon-modal-controle-servico');
  modalTabelaEstado = null;
}

function obterRowsReportPorCodigos(codigos = new Set()) {
  const permitidos = new Set(Array.from(codigos).map((codigo) => String(codigo).trim()).filter(Boolean));
  if (!permitidos.size) return [];
  return filtrarReportRowsAndon().filter((row) => permitidos.has(String(obterCodigoEquipeLinha(row) || '').trim()));
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
  if (!headerSelectedUo) return null;
  return new Set(
    filtrarReportRowsAndon()
      .map((row) => String(obterCodigoEquipeLinha(row) || '').trim())
      .filter(Boolean)
  );
}

function abrirModalEquipesDLoteProd(options = {}) {
  if (!equipesModal || !equipesModalBody) return;
  aplicarModalTelaCheia(true);

  const somenteD = options.somenteD !== false;
  const codigosUoAtual = obterCodigosEquipesUoAtual();
  const reportRowsModal = options.reportRows || filtrarReportRowsAndon();
  const codigosDwm = obterEquipesDBaseTotal(reportRowsModal).equipesD;
  const datasDwmPorCodigo = new Map();
  const chavesDwm = new Set();
  const obterChaveComparativo = (codigo, dataIso = '') => `${String(codigo || '').trim()}|${dataIso || ''}`;
  reportRowsModal.forEach((row) => {
    const codigo = String(obterCodigoEquipeLinha(row) || '').trim();
    if (!codigo || !codigosDwm.has(codigo)) return;
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
    if (dataIso) {
      if (!datasDwmPorCodigo.has(codigo)) datasDwmPorCodigo.set(codigo, new Set());
      datasDwmPorCodigo.get(codigo).add(dataIso);
    }
    chavesDwm.add(obterChaveComparativo(codigo, dataIso));
  });
  const rowsBase = Array.isArray(options.rows)
    ? options.rows
    : (somenteD ? filtrarLoteProdEquipesDRowsAndon() : filtrarLoteProdEquipesRowsAndon());
  const rowsLoteFiltradas = rowsBase.filter((row) => {
    if (options.codigos && options.codigos.size) return options.codigos.has(obterCodigoEquipeLote(row));
    if (!codigosUoAtual) return true;
    return codigosUoAtual.has(obterCodigoEquipeLote(row));
  });
  const mapaLote = new Map();
  const codigosLote = new Set();
  rowsLoteFiltradas.forEach((row) => {
    const codigo = obterCodigoEquipeLote(row);
    if (!codigo) return;
    const dataLote = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
    codigosLote.add(codigo);
    const chave = obterChaveComparativo(codigo, dataLote);
    const faixa = String(obterValorPrimeiro(row, ['FAIXA_DIA', 'Faixa_Dia', 'faixa_dia']) || '').trim().toUpperCase();
    const atual = mapaLote.get(chave) || mapaLote.get(obterChaveComparativo(codigo, ''));
    if (!atual || faixa === 'D') mapaLote.set(chave, row);
  });
  const rows = somenteD
    ? [
        ...Array.from(chavesDwm).map((chave) => {
          const [codigo, dataIso = ''] = chave.split('|');
          return mapaLote.get(chave) || mapaLote.get(obterChaveComparativo(codigo, '')) || {
            COD_EQUIPE: String(codigo),
            DATA: dataIso,
            _SOMENTE_WM: true
          };
        }),
        ...rowsLoteFiltradas
          .filter((row) => {
            const codigo = obterCodigoEquipeLote(row);
            const dataLote = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
            return codigo && !chavesDwm.has(obterChaveComparativo(codigo, dataLote)) && !chavesDwm.has(obterChaveComparativo(codigo, ''));
          })
          .map((row) => ({ ...row, _SOMENTE_LOTE: true }))
      ]
    : rowsLoteFiltradas;
  const mapaNomes = obterMapaNomesEquipesReport(reportRowsModal);
  const mapaSupervisor = new Map();
  reportRowsModal.forEach((reportRow) => {
    const codigo = String(obterCodigoEquipeLinha(reportRow) || '').trim();
    if (!codigo || mapaSupervisor.has(codigo)) return;
    mapaSupervisor.set(codigo, String(obterValorPrimeiro(reportRow, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR']) || '-').trim() || '-');
  });
  const mapaWm = new Map(
    montarLinhasModalEquipes(reportRowsModal, 'todas', filtrarControleRowsAndon())
      .map((item) => [String(item.codigo || '').trim(), item])
      .filter(([codigo]) => Boolean(codigo))
  );
  renderCabecalhoModalEquipesDLoteProd();

  if (equipesModalTitle) equipesModalTitle.textContent = options.title || (somenteD ? 'Equipes D Lote Prod.' : 'Total Equipes Lote Prod.');

  const rowsOrdenadas = [...rows].sort((a, b) => {
    const faixaA = String(obterValorPrimeiro(a, ['FAIXA_DIA', 'Faixa_Dia', 'faixa_dia']) || '').trim().toUpperCase();
    const faixaB = String(obterValorPrimeiro(b, ['FAIXA_DIA', 'Faixa_Dia', 'faixa_dia']) || '').trim().toUpperCase();
    return compararFaixaDiaDesc({ ...a, faixaDia: faixaA }, { ...b, faixaDia: faixaB });
  });
  const totalDwm = somenteD ? codigosDwm.size : rows.length;
  const totalDLoteNoComparativo = somenteD ? codigosLote.size : rows.length;
  const somenteWm = somenteD ? rows.filter((row) => row._SOMENTE_WM).length : 0;
  const somenteLote = somenteD ? rows.filter((row) => row._SOMENTE_LOTE).length : 0;
  if (equipesModalMeta) {
    equipesModalMeta.textContent = options.meta && !somenteD ? options.meta : (somenteD
      ? `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | D WM: ${formatInt(totalDwm)} | D Lote: ${formatInt(totalDLoteNoComparativo)} | Somente WM: ${formatInt(somenteWm)} | Somente Lote: ${formatInt(somenteLote)}`
      : `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes: ${formatInt(rows.length)}`);
  }

  renderizarModalBodyEmLotes(
    rowsOrdenadas,
    (row) => {
      const codigo = obterCodigoEquipeLote(row);
      const wm = mapaWm.get(String(codigo || '').trim()) || {};
      const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['DATA', 'Data']));
      const dataTxt = dataIso ? dataIso.split('-').reverse().join('/') : '-';
      const metaWm = Number(wm.metaDia || 0);
      const producaoWm = Number(wm.prodDia || 0);
      const percentualWm = metaWm > 0 ? (producaoWm / metaWm) * 100 : 0;
      const faixaWm = wm.faixaDia || classificarFaixa(percentualWm);
      const metaLote = toNumberSafe(obterValorPrimeiro(row, ['META', 'Meta']));
      const producaoLote = toNumberSafe(obterValorPrimeiro(row, ['VALOR_US', 'Valor_US', 'valor_us']));
      const percentualLote = metaLote > 0 ? (producaoLote / metaLote) * 100 : 0;
      const faixaLoteFallback = metaLote > 0 ? classificarFaixa(percentualLote) : '-';
      const faixaLote = String(obterValorPrimeiro(row, ['FAIXA_DIA', 'Faixa_Dia', 'faixa_dia']) || faixaLoteFallback || '-').trim().toUpperCase();
      const comparativo = row._SOMENTE_WM ? 'SOMENTE WM' : (row._SOMENTE_LOTE ? 'SOMENTE LOTE' : 'WM E LOTE');

      return `
        <tr>
          <td>${dataTxt}</td>
          <td>${String(obterValorPrimeiro(row, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR']) || mapaSupervisor.get(String(codigo || '').trim()) || '-')}</td>
          <td>${mapaNomes.get(codigo) || wm.equipe || codigo || '-'}</td>
          <td>${formatNumber3(metaWm)}</td>
          <td>${formatNumber3(producaoWm)}</td>
          <td class="andon-faixa faixa-${faixaWm || '-'}">${faixaWm || '-'}</td>
          <td>${formatPercent(percentualWm)}</td>
          <td>${formatNumber3Scale100(producaoLote)}</td>
          <td class="andon-faixa faixa-${faixaLote}">${faixaLote}</td>
          <td>${formatPercent(percentualLote)}</td>
          <td>${wm.inicioJornada || '-'}</td>
          <td>${wm.inicioRefeicao || '-'}</td>
          <td>${wm.terminoRefeicao || '-'}</td>
          <td>${wm.primeiroAtendimento || '-'}</td>
          <td>${wm.ultimoAtendimento || '-'}</td>
          <td>${wm.fimJornada || '-'}</td>
          <td>${wm.jornadaProdutiva || '-'}</td>
          <td>${comparativo}</td>
        </tr>
      `;
    },
    `<tr><td colspan="18" class="andon-modal-empty">Nenhuma equipe${somenteD ? ' D' : ''} encontrada no lote produtivo.</td></tr>`
  );

  equipesModal.classList.remove('hidden');
}

function abrirModalLoteProdDetalhes() {
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
  const mapa = new Map();

  rows.forEach((row) => {
    const codigo = obterCodigoEquipeLinha(row);
    if (!codigo || obterHoraLinha(row) !== horaAtual) return;

    const atual = mapa.get(codigo) || { metaDia: 0, prodAtual: 0 };
    atual.metaDia = Math.max(
      atual.metaDia,
      ajustarMetaClusterMtamiAndon(
        toNumberSafe(obterValorPrimeiro(row, ['Meta Prog.', 'META PROG', 'META_PROG'])),
        obterValorPrimeiro(row, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR']),
        obterValorPrimeiro(row, ['Nome', 'NOME_EQUIPE', 'NOME'])
      )
    );
    atual.prodAtual = Math.max(atual.prodAtual, toNumberSafe(obterValorPrimeiro(row, ['Produção', 'PRODUÇÃO', 'PRODUCAO'])));
    mapa.set(codigo, atual);
  });

  return { horaAtual, horasAcumuladas, mapa };
}

function montarLinhasModalEquipes(rows = [], filtro = 'todas', controleRows = null) {
  const baseTotal = obterEquipesDBaseTotal(rows);
  const mapaControle = new Map();
  const codigosAcordadas = filtro === 'acordadas' ? obterCodigosSdcaPorTipo(rows, 'acordadas') : null;
  const codigosJustificadas = filtro === 'justificadas' ? obterCodigosSdcaPorTipo(rows, 'justificadas') : null;

  const controleRowsBase = Array.isArray(controleRows) ? controleRows : filtrarControleRowsAndon();

  controleRowsBase.forEach((row) => {
    const codigo = String(
      obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || ''
    ).trim();
    if (!codigo) return;

    const atual = mapaControle.get(codigo) || {
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

    mapaControle.set(codigo, atual);
  });

  const mapa = new Map();
  rows.forEach((row) => {
    const codigo = obterCodigoEquipeLinha(row);
    if (!codigo) return;

    const atual = mapa.get(codigo) || {
      codigo,
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

    atual.metaDia = Math.max(
      atual.metaDia,
      ajustarMetaClusterMtamiAndon(
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

    mapa.set(codigo, atual);
  });

  const lista = Array.from(mapa.values()).map((item) => {
    const controle = mapaControle.get(item.codigo) || {};
    const inicioJornada = item.inicioJornada !== '-' ? item.inicioJornada : (controle.inicioJornada || '-');
    const primeiroAtendimento = item.primeiroAtendimento !== '-' ? item.primeiroAtendimento : (controle.primeiroAtendimento || '-');
    const ultimoAtendimento = item.ultimoAtendimento !== '-' ? item.ultimoAtendimento : (controle.ultimoAtendimento || '-');
    const fimJornada = item.fimJornada !== '-' ? item.fimJornada : (controle.fimJornada || ultimoAtendimento || '-');
    const jornadaProdutiva = item.jornadaProdutiva !== '-'
      ? item.jornadaProdutiva
      : diffHoraTexto(primeiroAtendimento, ultimoAtendimento);

    return {
      ...item,
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
  }).filter((item) => {
    const codigo = String(item.codigo || '');
    if (filtro === 'd') return baseTotal.equipesD.has(codigo);
    if (filtro === 'acordadas') return codigosAcordadas && codigosAcordadas.has(codigo);
    if (filtro === 'justificadas') return codigosJustificadas && codigosJustificadas.has(codigo);
    return true;
  });

  return lista.sort(compararFaixaDiaDesc);
}

function abrirModalEquipesAndonContexto({
  filtro = 'todas',
  rows = filtrarReportRowsAndon(),
  controleRows = null,
  title = '',
  meta = ''
} = {}) {
  if (!equipesModal || !equipesModalBody) return;
  aplicarModalTelaCheia(true);
  renderCabecalhoModalEquipesPadrao();

  const lista = montarLinhasModalEquipes(rows, filtro, controleRows);
  const titulo = title || (
    filtro === 'd'
      ? 'Equipes D WM'
      : filtro === 'acordadas'
        ? 'Equipes Acordadas'
        : filtro === 'justificadas'
          ? 'Equipes Justificadas'
          : 'Total de Equipes'
  );

  if (equipesModalTitle) equipesModalTitle.textContent = titulo;
  if (equipesModalMeta) {
    equipesModalMeta.textContent = meta || `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Registros: ${formatInt(lista.length)}`;
  }

  renderizarModalBodyEmLotes(
    lista,
    (item) => `
      <tr>
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
    `<tr><td colspan="12" class="andon-modal-empty">Nenhuma equipe encontrada para este filtro.</td></tr>`
  );

  equipesModal.classList.remove('hidden');
}

function abrirModalEquipesAndon(filtro = 'todas') {
  return abrirModalEquipesAndonContexto({ filtro });
}

function formatarDataBrAndon(value) {
  const dataIso = normalizarDataIso(value);
  return dataIso ? dataIso.split('-').reverse().join('/') : '-';
}

function calcularResumoServicos13hPorEquipe(controleRows = []) {
  const limite13h = 13 * 60;
  const mapa = new Map();

  controleRows.forEach((row) => {
    const codigo = String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '').trim();
    if (!codigo) return;

    const horaDesignacao = horaParaMinutos(obterValorPrimeiro(row, ['DATA_DESIGNACAO', 'DESIGNACAO', 'DATA DESIGNACAO', 'DATA_ATUALIZACAO']));
    if (!Number.isFinite(horaDesignacao) || horaDesignacao > limite13h) return;

    const item = mapa.get(codigo) || {
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

    mapa.set(codigo, item);
  });

  return mapa;
}

function montarLinhasModalEquipesAcordadas(reportRows = filtrarReportRowsAndon(), controleRows = filtrarControleRowsAndon(), tipo = 'acordadas') {
  const codigosSdca = obterCodigosSdcaPorTipo(reportRows, tipo);
  const mapaJustificativas = new Map();
  if (tipo === 'justificadas') {
    const { mapa: mapaHoraAtual } = obterResumoEquipesHoraAtual(reportRows);
    const codigosVisiveis = new Set(Array.from(mapaHoraAtual.keys()).map((codigo) => String(codigo)));
    obterRegistrosSdcaAndon(codigosVisiveis).forEach((registro) => {
      Object.values(registro && registro.justificativas || {}).forEach((item) => {
        const codigo = String(item && item.codigo || '').trim();
        const texto = String(item && item.justificativa || '').trim();
        if (codigo && texto && codigosSdca.has(codigo)) mapaJustificativas.set(codigo, texto);
      });
    });
  }
  const mapaJornada = new Map(
    montarLinhasModalEquipes(reportRows, 'todas', controleRows)
      .map((item) => [String(item.codigo || '').trim(), item])
      .filter(([codigo]) => Boolean(codigo))
  );
  const mapaServicos13h = calcularResumoServicos13hPorEquipe(controleRows);
  const mapa = new Map();
  const horas13 = obterHorasAcumuladasAndon('13');

  reportRows.forEach((row) => {
    const codigo = obterCodigoEquipeLinha(row);
    if (!codigo || !codigosSdca.has(String(codigo))) return;

    const supervisor = String(obterValorPrimeiro(row, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR']) || '-').trim() || '-';
    const equipe = String(obterValorPrimeiro(row, ['Nome', 'NOME_EQUIPE', 'NOME']) || codigo || '-').trim() || '-';
    const frota = String(obterValorPrimeiro(row, ['FROTA', 'Frota', 'PREFIXO', 'Prefixo', 'PLACA', 'Placa']) || '-').trim() || '-';
    const metaLinha = ajustarMetaClusterMtamiAndon(
      toNumberSafe(obterValorPrimeiro(row, ['Meta Prog.', 'META PROG', 'META_PROG'])),
      supervisor,
      equipe
    );
    const producaoLinha = toNumberSafe(obterValorPrimeiro(row, ['Produção', 'ProduÃ§Ã£o', 'PRODUÇÃO', 'PRODUÃ‡ÃƒO', 'PRODUCAO']));
    const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA']));
    const hora = obterHoraLinha(row);

    const atual = mapa.get(codigo) || {
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

    mapa.set(codigo, atual);
  });

  return Array.from(mapa.values()).map((item) => {
    const jornada = mapaJornada.get(String(item.codigo || '').trim()) || {};
    const servicos13h = mapaServicos13h.get(String(item.codigo || '').trim()) || {
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
      justificativa: mapaJustificativas.get(String(item.codigo || '').trim()) || '-',
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

  renderizarModalBodyEmLotes(
    rows,
    (row) => `
      <tr>
        <td>${formatarDataBrAndon(row.dataIso)}</td>
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
    '<tr><td colspan="23" class="andon-modal-empty">Nenhuma equipe acordada encontrada para o filtro atual.</td></tr>'
  );

  equipesModal.classList.remove('hidden');
}

function abrirModalEquipesJustificadasDetalhado() {
  if (!equipesModal || !equipesModalBody) return;
  aplicarModalTelaCheia(true);

  const reportRows = filtrarReportRowsAndon();
  const controleRows = filtrarControleRowsAndon();
  const rows = montarLinhasModalEquipesAcordadas(reportRows, controleRows, 'justificadas');

  renderCabecalhoModalGenerico([
    { label: 'Data' },
    { label: 'Supervisor' },
    { label: 'Cód. Eqp.' },
    { label: 'Frota' },
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

  renderizarModalBodyEmLotes(
    rows,
    (row) => `
      <tr>
        <td>${formatarDataBrAndon(row.dataIso)}</td>
        <td>${row.supervisor || '-'}</td>
        <td>${row.codigo || '-'}</td>
        <td>${row.frota || '-'}</td>
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
  const reportRows = filtrarReportRowsAndon();
  const controleRows = filtrarControleRowsAndon();
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
  const reportRows = filtrarReportRowsAndon();
  const controleRows = filtrarControleRowsAndon();
  const listaEquipes = montarLinhasModalEquipes(reportRows, 'todas', controleRows);

  if (tipo !== 'incompleta') {
    abrirModalEquipesAndonContexto({
      rows: reportRows,
      controleRows,
      title: 'Jornada Produtiva',
      meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes: ${formatInt(listaEquipes.length)}`
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
    meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes: ${formatInt(codigosIncompletas.size)}`
  });
}

function fecharModalEquipesAndon() {
  if (equipesModal) {
    equipesModal.classList.add('hidden');
    aplicarModalTelaCheia(false);
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
  return filtrarControleRowsAndon().filter((row) => {
    const codigo = String(
      obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || ''
    ).trim();
    return permitidos.has(codigo);
  });
}

function obterControleRowsSupervisorPorCodigos(card, codigos = new Set()) {
  const permitidos = new Set(Array.from(codigos).map((codigo) => String(codigo).trim()).filter(Boolean));
  return filtrarControleRowsAndon().filter((row) => {
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
  const codigosEquipes = new Set();
  const codigosComServico = new Set();
  let servicosProdutivos = 0;
  let servicosImprodutivos = 0;

  controleRows.forEach((row) => {
    const codigo = String(obterValorPrimeiro(row, ['COD_EQUIPE_WM', 'COD_EQUIPE', 'NUM_EQUIPE']) || '').trim();
    if (codigo) codigosEquipes.add(codigo);
    if (codigo) codigosComServico.add(codigo);

    const flag = normalizarFlagServico(obterValorPrimeiro(row, ['PRODUTIVO', 'PRODUTIVOS']));
    if (flag === 'SIM') servicosProdutivos += 1;
    if (flag === 'NAO') servicosImprodutivos += 1;
  });

  const totalEfetiva = codigosEquipes.size;
  const servicosDesignados = controleRows.length;
  const servicosExecutados = servicosProdutivos + servicosImprodutivos;
  const semServico = Array.from(codigosEquipes).filter((codigo) => !codigosComServico.has(codigo)).length;
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
    Array.isArray(options.reportRows) ? options.reportRows : filtrarReportRowsAndon(),
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

  const reportRows = Array.isArray(options.reportRows) ? options.reportRows : filtrarReportRowsAndon();

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
  params.set('limit', '50000');

  try {
    const resp = await fetch(`/api/controle-servico?${params.toString()}`, { cache: 'no-store' });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const payload = await resp.json().catch(() => ({}));
    const rows = Array.isArray(payload && payload.rows) ? payload.rows : [];
    andonControleRows = rows;
    andonControleLoadedKey = obterChavePeriodoFiltroAndon();
    limparCacheAndon();

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

async function abrirModalControleServicoModelo(tipo = 'todos', title = 'Servicos') {
  if (!equipesModal || !equipesModalBody) return;
  const rows = await obterRowsControleServicoModalDireto(tipo);
  const columns = [
    { label: 'Data Atualizacao', value: (row) => String(obterValorPrimeiro(row, ['DATA_ATUALIZACAO', 'DATA_ATUALIZACAO_D', 'DATA ATUALIZACAO']) || '-') },
    { label: 'U.O.', value: (row) => String(obterValorPrimeiro(row, ['COD_UO', 'UO']) || '-') },
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
  renderCabecalhoModalGenerico(columns);
  if (equipesModalTitle) equipesModalTitle.textContent = title;
  if (equipesModalMeta) equipesModalMeta.textContent = `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Registros: ${formatInt(rows.length)}`;
  renderizarModalTabelaPaginada(rows, columns);
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
  const reportRows = filtrarReportRowsAndon();
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
  let reportRows = filtrarReportRowsAndon();
  if (!reportRows.length) {
    reportRows = andonReportRows.filter((row) => {
      const uo = obterUoLinha(row);
      if (headerSelectedUo && uo !== headerSelectedUo.replace(/[^\d]/g, '')) return false;
      const dataIso = normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA']));
      return !dataIso || linhaPassaFiltrosPeriodo(dataIso);
    });
  }
  if (!reportRows.length && andonReportRows.length) {
    const datas = [...new Set(
      andonReportRows
        .map((row) => normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA'])))
        .filter(Boolean)
    )].sort();
    const ultimaData = datas[datas.length - 1];
    reportRows = andonReportRows.filter((row) => {
      const uo = obterUoLinha(row);
      if (headerSelectedUo && uo !== headerSelectedUo.replace(/[^\d]/g, '')) return false;
      return normalizarDataIso(obterValorPrimeiro(row, ['Data', 'DATA'])) === ultimaData;
    });
  }
  const controleRows = filtrarControleRowsAndon();
  let listaEquipes = montarLinhasModalEquipes(reportRows, 'todas', controleRows);
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
    });
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
  const reportRows = filtrarReportRowsAndon();
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
  const reportRows = filtrarReportRowsAndon();
  const controleRows = filtrarControleRowsAndon();
  const listaEquipes = montarLinhasModalEquipes(reportRows, 'todas', controleRows);

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
  const percIncompleta = listaEquipes.length > 0 ? (jornadasIncompletas / listaEquipes.length) * 100 : 0;

  if (journeyProdTotalEfetiva) journeyProdTotalEfetiva.textContent = formatInt(listaEquipes.length);
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
  const loteDRows = filtrarLoteProdPorCodigos(filtrarLoteProdEquipesDRowsAndon(), codigos);
  const baseTotal = obterEquipesDBaseTotal(rows);
  const codigosDwm = baseTotal.equipesD;
  const codigosLoteD = new Set(loteDRows.map((row) => obterCodigoEquipeLote(row)).filter(Boolean));
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
  const baseTotal = obterEquipesDBaseTotal(rows);
  const { mapa } = obterResumoEquipesHoraAtual(rows);
  const codigosVisiveis = new Set(Array.from(mapa.keys()).map((codigo) => String(codigo)));
  const registros = obterRegistrosSdcaAndon(codigosVisiveis);
  const acordadas = new Set();
  const justificadas = new Set();

  registros.forEach((registro) => {
    Object.values(registro && registro.acordos || {}).forEach((acordo) => {
      const codigo = String(acordo && acordo.codigo || '').trim();
      if (codigo && codigosVisiveis.has(codigo)) acordadas.add(codigo);
    });
    Object.values(registro && registro.justificativas || {}).forEach((item) => {
      const codigo = String(item && item.codigo || '').trim();
      const texto = String(item && item.justificativa || '').trim();
      if (codigo && texto && codigosVisiveis.has(codigo)) justificadas.add(codigo);
    });
  });

  const totalEquipes = baseTotal.totalEquipes || mapa.size;
  const totalAcordadas = acordadas.size;
  const totalJustificadas = justificadas.size;

  return {
    totalEquipes,
    equipesD: baseTotal.equipesD.size,
    acordadas: totalAcordadas,
    justificadas: totalJustificadas,
    percJustificadas: totalEquipes > 0 ? (totalJustificadas / totalEquipes) * 100 : 0
  };
}

function calcularJornadaSupervisor(rows = []) {
  const controleRows = obterControleRowsPorCodigos(obterCodigosReportRows(rows));
  const listaEquipes = montarLinhasModalEquipes(rows, 'todas', controleRows);
  const minutosPrimeiro = listaEquipes.map((item) => horaParaMinutos(item.primeiroAtendimento)).filter((valor) => Number.isFinite(valor));
  const minutosUltimo = listaEquipes.map((item) => horaParaMinutos(item.ultimoAtendimento)).filter((valor) => Number.isFinite(valor));
  const minutosJornada = listaEquipes
    .map((item) => horaParaMinutos(item.jornadaProdutiva))
    .filter((valor) => Number.isFinite(valor) && valor >= 0 && valor <= (12 * 60));
  const codigosSemRefeicao = obterCodigosEquipesSemRefeicao(rows, listaEquipes);

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
          const codigosD = new Set(Array.from(obterEquipesDBaseTotal(rows).equipesD));
          const codigosControle = filtro === 'd' ? codigosD : obterCodigosReportRows(rows);
          const controleRows = obterControleRowsPorCodigos(codigosControle);
          abrirModalEquipesAndonContexto({
            filtro,
            rows,
            controleRows,
            title: `${filtro === 'd' ? 'Equipes D WM' : 'Total de Equipes'} - ${card.dataset.supervisor || ''}`,
            meta: `Supervisor: ${card.dataset.supervisor || '-'} | U.O.: ${card.dataset.uo || '-'} | Equipes: ${formatInt(filtro === 'd' ? codigosD.size : obterCodigosReportRows(rows).size)}`
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
          const rows = obterRowsSupervisorCard(card);
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
            meta: `Supervisor: ${card.dataset.supervisor || '-'} | U.O.: ${card.dataset.uo || '-'}`
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
    const percentualTotal = baseTotal.totalMetaDia > 0
      ? (baseTotal.totalProdDia / baseTotal.totalMetaDia) * 100
      : NaN;
    const impedimento = obterImpedimentoPorCodigos(obterCodigosReportRows(rows));
    const loteProd = obterLoteProdSupervisor(rows);

    if (performanceValores['total-equipes']) performanceValores['total-equipes'].textContent = formatInt(baseTotal.totalEquipes);
    if (performanceValores['classificacao-wm']) performanceValores['classificacao-wm'].textContent = formatClassificacao(percentualTotal);
    if (performanceValores['classificacao-lote']) performanceValores['classificacao-lote'].textContent = loteProd.classificacao;
    if (performanceValores['equipes-d-wm']) performanceValores['equipes-d-wm'].textContent = formatInt(baseTotal.equipesD.size);
    if (performanceValores['equipes-d-lote']) {
      performanceValores['equipes-d-lote'].classList.add('metric-value-compact');
      performanceValores['equipes-d-lote'].textContent = formatarComparativoLoteSupervisor(loteProd);
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
  const mapa = new Map();

  rows.forEach((row) => {
    const codigo = obterCodigoEquipeLinha(row);
    if (!codigo) return;

    const atual = mapa.get(codigo) || { metaDia: 0, prodDia: 0 };
    atual.metaDia = Math.max(
      atual.metaDia,
      ajustarMetaClusterMtamiAndon(
        toNumberSafe(obterValorPrimeiro(row, ['Meta Prog.', 'META PROG', 'META_PROG'])),
        obterValorPrimeiro(row, ['SUPERVISOR - SETOR', 'NOME_SUPERVISOR']),
        obterValorPrimeiro(row, ['Nome', 'NOME_EQUIPE', 'NOME'])
      )
    );
    atual.prodDia = Math.max(
      atual.prodDia,
      toNumberSafe(obterValorPrimeiro(row, ['Produção', 'PRODUÇÃO', 'PRODUCAO']))
    );
    mapa.set(codigo, atual);
  });

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
  const reportRows = filtrarReportRowsAndon();
  const baseTotal = obterEquipesDBaseTotal(reportRows);
  const { mapa } = obterResumoEquipesHoraAtual(reportRows);
  const codigosVisiveisBruto = new Set(Array.from(mapa.keys()).map((codigo) => String(codigo)));
  const registros = obterRegistrosSdcaAndon(codigosVisiveisBruto);
  const equipesD = baseTotal.equipesD;

  const acordadas = new Set();
  const justificadas = new Set();
  registros.forEach((registro) => {
    Object.values(registro && registro.acordos || {}).forEach((acordo) => {
      const codigo = String(acordo && acordo.codigo || '').trim();
      if (codigo) acordadas.add(codigo);
    });
    Object.values(registro && registro.justificativas || {}).forEach((item) => {
      const codigo = String(item && item.codigo || '').trim();
      const texto = String(item && item.justificativa || '').trim();
      if (codigo && texto) justificadas.add(codigo);
    });
  });

  const totalEquipes = baseTotal.totalEquipes || mapa.size;
  const totalEquipesD = equipesD.size;
  const totalAcordadas = [...codigosVisiveisBruto].filter((codigo) => acordadas.has(codigo)).length;
  const totalJustificadas = [...codigosVisiveisBruto].filter((codigo) => justificadas.has(codigo)).length;
  const percAcordadas = totalEquipes > 0 ? (totalAcordadas / totalEquipes) * 100 : 0;
  const percJustificadas = totalEquipes > 0 ? (totalJustificadas / totalEquipes) * 100 : 0;

  if (sdcaTotalEquipes) sdcaTotalEquipes.textContent = formatInt(totalEquipes);
  if (sdcaEquipesD) sdcaEquipesD.textContent = formatInt(totalEquipesD);
  if (sdcaEquipesAcordadas) sdcaEquipesAcordadas.textContent = formatInt(totalAcordadas);
  if (sdcaPercAcordadas) sdcaPercAcordadas.textContent = formatPercent(percAcordadas);
  if (sdcaEquipesJustificadas) sdcaEquipesJustificadas.textContent = formatInt(totalJustificadas);
  if (sdcaPercJustificadas) sdcaPercJustificadas.textContent = formatPercent(percJustificadas);
}

function supervisorViewEstaAberta() {
  return Boolean(supervisorView && !supervisorView.classList.contains('hidden'));
}

function atualizarSupervisorPerformanceCardsSeVisivel() {
  if (supervisorViewEstaAberta()) {
    atualizarSupervisorPerformanceCards();
  }
}

function atualizarDashboardAndon() {
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
  const percentualImpedimento = calcularPercentualImpedimento(controleRows);
  const percentualTotal = baseTotal.totalMetaDia > 0
    ? (baseTotal.totalProdDia / baseTotal.totalMetaDia) * 100
    : NaN;

  if (perfTotalEquipes) perfTotalEquipes.textContent = formatInt(baseTotal.totalEquipes);
  if (perfTotalEquipesLote) perfTotalEquipesLote.textContent = formatInt(totalEquipesLote);
  const classificacaoWm = formatClassificacao(percentualTotal);
  if (perfClassificacaoWm) perfClassificacaoWm.textContent = classificacaoWm;
  aplicarCorFaixaKpi(cardPerfClassificacaoWm, Number.isFinite(percentualTotal) ? classificarFaixa(percentualTotal) : obterFaixaClassificacaoTexto(classificacaoWm));
  if (perfClassificacaoLote) perfClassificacaoLote.textContent = loteProd.classificacao;
  aplicarCorFaixaKpi(cardPerfClassificacaoLote, obterFaixaClassificacaoTexto(loteProd.classificacao));
  if (perfEquipesDWm) perfEquipesDWm.textContent = formatInt(baseTotal.equipesD.size);
  if (perfEquipesDLote) perfEquipesDLote.textContent = formatInt(loteProd.equipesD);
  if (perfImpedimento) perfImpedimento.textContent = formatPercent(percentualImpedimento);
  aplicarCorPercentualKpi(perfImpedimento, percentualImpedimento);
}

async function carregarDadosAndon() {
  if (andonLoadingPromise) return andonLoadingPromise;

  andonLoadingPromise = (async () => {
    const [reportResp, loteProdResp, loteProdEquipesDResp, acordosBanco] = await Promise.all([
      fetch('/api/report?strictHours=false', { cache: 'no-store' }),
      fetch('/api/lote-prod', { cache: 'no-store' }),
      fetch('/api/lote-prod/equipes-d', { cache: 'no-store' }),
      carregarBaseAcordosBancoAndon()
    ]);

    if (!reportResp.ok) {
      throw new Error(`Erro ao carregar /api/report?strictHours=false (${reportResp.status}).`);
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
  vincularModalCard(cardPerfTotalEquipes, () => abrirModalEquipesAndon('todas'));
}

if (cardPerfTotalEquipesLote) {
  vincularModalCard(cardPerfTotalEquipesLote, () => abrirModalEquipesDLoteProd({ somenteD: false }));
}

if (cardPerfEquipesDWm) {
  vincularModalCard(cardPerfEquipesDWm, () => abrirModalEquipesAndon('d'));
}

if (cardPerfEquipesDLote) {
  vincularModalCard(cardPerfEquipesDLote, abrirModalEquipesDLoteProd);
}

vincularModalCard(cardPerfClassificacaoWm, () => abrirModalEquipesAndon('todas'));
vincularModalCard(cardPerfClassificacaoLote, abrirModalLoteProdDetalhes);
vincularModalCard(cardPerfImpedimento, () => abrirModalControleServicoModelo('improdutivos', 'Impedimento'));
vincularModalCard(cardSdcaTotalEquipes, abrirModalSdcaTotalEquipes);
vincularModalCard(cardSdcaEquipesD, () => abrirModalEquipesAndon('d'));

if (cardSdcaEquipesAcordadas) {
  vincularModalCard(cardSdcaEquipesAcordadas, abrirModalEquipesAcordadasDetalhado);
}

if (cardSdcaEquipesJustificadas) {
  vincularModalCard(cardSdcaEquipesJustificadas, abrirModalEquipesJustificadasDetalhado);
}

vincularModalCard(cardSdcaPercAcordadas, () => {
  abrirModalEquipesAndonContexto({
    filtro: 'acordadas',
    title: '% Equipes Acordadas',
    meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes: ${sdcaEquipesAcordadas?.textContent || '0'}`
  });
});
vincularModalCard(cardSdcaPercJustificadas, () => {
  abrirModalEquipesAndonContexto({
    filtro: 'justificadas',
    title: '% Equipes Justificadas',
    meta: `U.O.: ${headerUoDisplay?.value || 'Todas as U.O.'} | Equipes: ${sdcaEquipesJustificadas?.textContent || '0'}`
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

vincularModalCard(cardJornadaTrabalhoTotal, () => abrirModalEquipesAndon('todas'));

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

let headerSelectedUo = '';
let headerSelectedDate = null;
let headerSelectedMonth = null;   // { year, month } (0-indexed)
let headerSelectedWeeks = [];     // array de { weekNum, start (Seg), end (Dom) } — acumulativo
let headerDatePickerMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let headerMonthPickerYear = new Date().getFullYear();
let isHeaderUoOpen = false;
let isHeaderDateOpen = false;
let isHeaderMonthOpen = false;

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
      closeHeaderUoPicker();
      renderHeaderUoOptions();
      atualizarDashboardAndon();
    });

    headerUoPopup.appendChild(button);
  });
}

function openHeaderUoPicker() {
  closeHeaderDatePicker();
  closeHeaderMonthPicker();
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
  renderHeaderUoOptions();
  closeHeaderUoPicker();
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
  // Sincroniza filtro de MÊS com o início do período
  headerSelectedMonth = { year: periodStart.getFullYear(), month: periodStart.getMonth() };
  headerMonthDisplay.value = fmtHeaderMonth(periodStart.getFullYear(), periodStart.getMonth());
  headerMonthPickerYear = periodStart.getFullYear();
}

function selectHeaderDate(date) {
  headerSelectedDate = date;
  headerSelectedWeeks = []; // limpa seleção de semanas
  headerDateDisplay.value = fmtHeaderDate(date);
  // Sincroniza o filtro de MÊS
  headerSelectedMonth = { year: date.getFullYear(), month: date.getMonth() };
  headerMonthDisplay.value = fmtHeaderMonth(date.getFullYear(), date.getMonth());
  headerMonthPickerYear = date.getFullYear();
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
  renderHeaderDatePicker(); // re-renderiza para destacar semanas acumuladas
  atualizarDashboardAndon();
}

function clearHeaderDate() {
  headerSelectedDate = null;
  headerSelectedWeeks = [];
  headerDateDisplay.value = '';
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
  // Se a data selecionada não pertence a este mês, limpa a data
  if (headerSelectedDate && (headerSelectedDate.getFullYear() !== year || headerSelectedDate.getMonth() !== month)) {
    headerSelectedDate = null;
    headerDateDisplay.value = '';
  }
  // Navega o calendário de dia para o mês escolhido
  headerDatePickerMonth = new Date(year, month, 1);
  closeHeaderMonthPicker();
  atualizarDashboardAndon();
}

function clearHeaderMonth() {
  headerSelectedMonth = null;
  headerMonthDisplay.value = '';
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

document.addEventListener('click', e => {
  if (!headerUoWrapper.contains(e.target)) closeHeaderUoPicker();
  if (!headerDateWrapper.contains(e.target)) closeHeaderDatePicker();
  if (!headerMonthWrapper.contains(e.target)) closeHeaderMonthPicker();
});

headerUoDisplay.value = 'Todas as U.O.';
