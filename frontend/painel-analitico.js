const $ = (id) => document.getElementById(id);

const state = {
  editando: false,
  ultimoPayload: null
};

const PROFILE_PHOTO_KEY = 'painel_analitico_fotos_perfil_v1';
const ANALITICO_FILTERS_KEY = 'painel_analitico_filtros_v1';
const HTML2CANVAS_CDN_URL = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';

function fmtInt(value) {
  return Math.round(Number(value || 0)).toLocaleString('pt-BR');
}

function fmtNum(value, digits = 1) {
  return Number(value || 0).toLocaleString('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
}

function fmtPct(value, digits = 0) {
  return `${Number(value || 0).toFixed(digits).replace('.', ',')}%`;
}

function labelPeriodo(inicio, fim) {
  const toBr = (iso) => {
    const [y, m, d] = String(iso || '').split('-');
    return y && m && d ? `${d}/${m}/${y}` : iso;
  };
  return `${toBr(inicio)} a ${toBr(fim)}`;
}

function shortName(name = '') {
  return String(name).replace(/^BH-/i, 'BH-');
}

function carregarScript(src) {
  return new Promise((resolve, reject) => {
    const existente = document.querySelector(`script[src="${src}"]`);
    if (existente && typeof html2canvas !== 'undefined') {
      resolve();
      return;
    }
    const script = existente || document.createElement('script');
    if (!existente) {
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener('load', resolve, { once: true });
    script.addEventListener('error', () => reject(new Error('html2canvas não carregou. Verifique a conexão com a internet.')), { once: true });
  });
}

async function garantirHtml2Canvas() {
  if (typeof html2canvas !== 'undefined') return;
  await carregarScript(HTML2CANVAS_CDN_URL);
}

function getProfilePhotos() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_PHOTO_KEY) || '{}') || {};
  } catch (_) {
    return {};
  }
}

function profilePhotoId(supervisor = '') {
  return normalizarTexto(supervisor).replace(/\s+/g, ' ').trim() || 'DEFAULT';
}

function aplicarFotoPerfil(dataUrl = '') {
  const avatar = $('avatarPerfil');
  if (!avatar) return;
  if (dataUrl) {
    avatar.style.setProperty('--profile-photo', `url("${dataUrl}")`);
    avatar.style.backgroundImage = `url("${dataUrl}")`;
    avatar.classList.add('has-photo');
  } else {
    avatar.style.removeProperty('--profile-photo');
    avatar.style.removeProperty('background-image');
    avatar.classList.remove('has-photo');
  }
}

function carregarFotoPerfilAtual() {
  const supervisor = $('supervisorSelect')?.value || '';
  const fotos = getProfilePhotos();
  aplicarFotoPerfil(fotos[profilePhotoId(supervisor)] || '');
}

function salvarFotoPerfil(supervisor, dataUrl) {
  const fotos = getProfilePhotos();
  fotos[profilePhotoId(supervisor)] = dataUrl;
  localStorage.setItem(PROFILE_PHOTO_KEY, JSON.stringify(fotos));
}

function arquivoParaFotoPerfil(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Nao foi possivel ler a foto selecionada.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Arquivo de imagem invalido.'));
      img.onload = () => {
        const maxSize = 520;
        const scale = Math.min(1, maxSize / Math.max(img.naturalWidth, img.naturalHeight));
        const width = Math.max(1, Math.round(img.naturalWidth * scale));
        const height = Math.max(1, Math.round(img.naturalHeight * scale));
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.86));
      };
      img.src = String(reader.result || '');
    };
    reader.readAsDataURL(file);
  });
}

function configurarFotoPerfil() {
  const input = $('fotoPerfilInput');
  if (!input) return;
  input.addEventListener('change', async () => {
    const file = input.files?.[0];
    const supervisor = $('supervisorSelect')?.value || '';
    if (!file || !supervisor) return;
    try {
      const dataUrl = await arquivoParaFotoPerfil(file);
      aplicarFotoPerfil(dataUrl);
      salvarFotoPerfil(supervisor, dataUrl);
    } catch (error) {
      console.error(error);
      alert('Nao consegui carregar essa foto. Tente uma imagem JPG ou PNG menor.');
    } finally {
      input.value = '';
    }
  });
}

function apiBaseUrl() {
  const origin = window.location.origin;
  if (window.location.protocol === 'file:' || origin === 'null') {
    return 'http://127.0.0.1:3001';
  }
  return origin;
}

async function fetchJson(url) {
  const requestUrl = url.startsWith('http') ? url : `${apiBaseUrl()}${url}`;
  const resp = await fetch(requestUrl, { cache: 'no-store' });
  const payload = await resp.json().catch(() => ({}));
  if (!resp.ok || payload.ok === false) throw new Error(payload.error || `HTTP ${resp.status}`);
  return payload;
}

async function carregarSupervisores() {
  const params = new URLSearchParams({
    dataInicio: $('dataInicio').value,
    dataFim: $('dataFim').value
  });
  const payload = await fetchJson(`/api/painel-analitico/supervisores?${params}`);
  const select = $('supervisorSelect');
  const atual = select.value;
  select.innerHTML = payload.rows.map((item) => (
    `<option value="${escapeHtml(item.supervisor)}">${escapeHtml(item.supervisor)} (${fmtInt(item.equipes)})</option>`
  )).join('');
  if (atual && payload.rows.some((item) => item.supervisor === atual)) select.value = atual;
  if (!select.value && payload.rows.length) select.value = payload.rows[0].supervisor;
}

function parseIsoDate(value) {
  const [year, month, day] = String(value || '').split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function isoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function monthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function monthLabel(date) {
  const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  return `${meses[date.getMonth()]}/${String(date.getFullYear()).slice(2)}`;
}

function monthRange(date) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return {
    key: monthKey(start),
    label: monthLabel(start),
    dataInicio: isoDate(start),
    dataFim: isoDate(end)
  };
}

function defaultFilterRange() {
  const hoje = new Date();
  return monthRange(addMonths(new Date(hoje.getFullYear(), hoje.getMonth(), 1), -1));
}

function getSavedFilters() {
  try {
    return JSON.parse(localStorage.getItem(ANALITICO_FILTERS_KEY) || '{}') || {};
  } catch (_) {
    return {};
  }
}

function salvarFiltrosPainel() {
  const filtros = {
    dataInicio: $('dataInicio')?.value || '',
    dataFim: $('dataFim')?.value || '',
    supervisor: $('supervisorSelect')?.value || ''
  };
  localStorage.setItem(ANALITICO_FILTERS_KEY, JSON.stringify(filtros));
}

function aplicarFiltrosIniciais() {
  const salvos = getSavedFilters();
  const padrao = defaultFilterRange();
  if ($('dataInicio')) $('dataInicio').value = salvos.dataInicio || padrao.dataInicio;
  if ($('dataFim')) $('dataFim').value = salvos.dataFim || padrao.dataFim;
}

function vozMensalDoPayload(payload, mes) {
  const impedimento = Number(payload.eficiencia?.indiceImpedimento || 0);
  const produtividade = Number(payload.performance?.geral || 0);
  const jornadaIncompleta = Number(payload.jornada?.percentualIncompleta || 0);
  return {
    mes: mes.key,
    label: mes.label,
    impedimento,
    produtividade,
    jornada: Math.max(0, Math.min(100, 100 - jornadaIncompleta)),
    executados: Number(payload.eficiencia?.executados || 0),
    improdutivos: Number(payload.eficiencia?.improdutivos || 0),
    jornadasValidas: 0,
    jornadasIncompletas: 0,
    totalServicos: Number(payload.totalServicos || 0),
    totalEquipes: Number(payload.totalEquipes || 0)
  };
}

async function carregarHistoricoVozesFallback(payload, supervisor) {
  const dataFim = parseIsoDate(payload?.periodo?.dataFim || $('dataFim').value);
  if (!dataFim) return [];

  const meses = [
    monthRange(addMonths(dataFim, -1)),
    monthRange(dataFim)
  ];
  const mesAtual = monthKey(dataFim);
  const historico = [];

  for (const mes of meses) {
    if (mes.key === mesAtual) {
      historico.push(vozMensalDoPayload(payload, mes));
      continue;
    }

    const params = new URLSearchParams({
      supervisor,
      dataInicio: mes.dataInicio,
      dataFim: mes.dataFim
    });
    const mensal = await fetchJson(`/api/painel-analitico?${params}`);
    historico.push(vozMensalDoPayload(mensal, mes));
  }

  return historico.filter((item) => item.totalServicos > 0 || item.totalEquipes > 0);
}

function limitarHistoricoAteMesAtual(payload) {
  const dataFim = parseIsoDate(payload?.periodo?.dataFim || $('dataFim').value);
  if (!dataFim || !Array.isArray(payload.historicoVozes)) return;
  const mesAtual = monthKey(dataFim);
  payload.historicoVozes = payload.historicoVozes.filter((item) => !item?.mes || item.mes <= mesAtual);
}

async function carregarPainel() {
  const supervisor = $('supervisorSelect').value;
  if (!supervisor) return;
  const params = new URLSearchParams({
    supervisor,
    dataInicio: $('dataInicio').value,
    dataFim: $('dataFim').value
  });
  const panel = $('painelAnalitico');
  panel.classList.add('loading');
  try {
    const payload = await fetchJson(`/api/painel-analitico?${params}`);
    if (!Array.isArray(payload.historicoVozes) || payload.historicoVozes.length < 2) {
      payload.historicoVozes = await carregarHistoricoVozesFallback(payload, supervisor);
    } else {
      limitarHistoricoAteMesAtual(payload);
    }
    state.ultimoPayload = payload;
    salvarFiltrosPainel();
    renderPainel(payload);
  } finally {
    panel.classList.remove('loading');
  }
}

function normalizarTexto(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
}

function numeroPainel(value) {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return 0;
    const normalized = trimmed.includes(',')
      ? trimmed.replace(/\./g, '').replace(',', '.')
      : trimmed;
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function primeiroValor(row, keys) {
  for (const key of keys) {
    if (row && row[key] !== undefined && row[key] !== null && String(row[key]).trim() !== '') {
      return row[key];
    }
  }
  return '';
}

function classificarPerformance(percentual) {
  const value = Number(percentual);
  if (!Number.isFinite(value)) return '-';
  if (value >= 95) return 'AA';
  if (value >= 85) return 'A';
  if (value >= 75) return 'B';
  if (value >= 65) return 'C';
  return 'D';
}

function isEquipeD(percentual) {
  const value = Number(percentual);
  return Number.isFinite(value) && value <= 75;
}

function tipoEquipePainel(item = {}) {
  const texto = normalizarTexto(`${item.tipo || ''} ${item.equipe || ''} ${item.NOME_EQUIPE || ''} ${item.NOME || ''}`);
  return texto.includes('MOTO') || texto.includes('MTVP') ? 'MOTO' : 'MULTI';
}

async function carregarPerformanceLote(payload) {
  const equipes = Array.isArray(payload?.equipes) ? payload.equipes : [];
  const codigos = new Set(equipes.map((item) => String(item.codigo || item.COD_EQUIPE || '').trim()).filter(Boolean));
  if (!codigos.size) return null;

  const tipoPorCodigo = new Map();
  equipes.forEach((item) => {
    const codigo = String(item.codigo || item.COD_EQUIPE || '').trim();
    if (codigo && !tipoPorCodigo.has(codigo)) tipoPorCodigo.set(codigo, tipoEquipePainel(item));
  });

  const params = new URLSearchParams({
    dataInicio: payload?.periodo?.dataInicio || payload?.filtros?.dataInicio || $('dataInicio').value,
    dataFim: payload?.periodo?.dataFim || payload?.filtros?.dataFim || $('dataFim').value
  });
  const lotePayload = await fetchJson(`/api/lote-prod/equipes?${params}`);
  const rows = (Array.isArray(lotePayload?.rows) ? lotePayload.rows : []).filter((row) => {
    const codigo = String(primeiroValor(row, ['COD_EQUIPE', 'cod_equipe', 'Cod_Equipe'])).trim();
    return codigos.has(codigo);
  });
  if (!rows.length) return null;

  const somar = (lista, keys) => lista.reduce((acc, row) => acc + numeroPainel(primeiroValor(row, keys)), 0);
  const performanceRows = (lista) => {
    const meta = somar(lista, ['META', 'Meta', 'meta']);
    const prod = somar(lista, ['VALOR_US', 'Valor_US', 'valor_us']);
    return meta > 0 ? (prod / meta) * 100 : 0;
  };

  const porEquipe = new Map();
  rows.forEach((row) => {
    const codigo = String(primeiroValor(row, ['COD_EQUIPE', 'cod_equipe', 'Cod_Equipe'])).trim();
    const atual = porEquipe.get(codigo) || { meta: 0, prod: 0 };
    atual.meta += numeroPainel(primeiroValor(row, ['META', 'Meta', 'meta']));
    atual.prod += numeroPainel(primeiroValor(row, ['VALOR_US', 'Valor_US', 'valor_us']));
    porEquipe.set(codigo, atual);
  });

  const equipesD = Array.from(porEquipe.values()).filter((item) => {
    const percentual = item.meta > 0 ? (item.prod / item.meta) * 100 : 0;
    return isEquipeD(percentual);
  }).length;

  return {
    geral: performanceRows(rows),
    moto: performanceRows(rows.filter((row) => tipoPorCodigo.get(String(primeiroValor(row, ['COD_EQUIPE', 'cod_equipe', 'Cod_Equipe'])).trim()) === 'MOTO')),
    multi: performanceRows(rows.filter((row) => tipoPorCodigo.get(String(primeiroValor(row, ['COD_EQUIPE', 'cod_equipe', 'Cod_Equipe'])).trim()) === 'MULTI')),
    equipesD
  };
}

function setText(id, text) {
  const el = $(id);
  if (el) el.textContent = text;
}

function prepararKpiCards() {
  const jornada = document.querySelector('.summary .green.kpi-card');
  if (jornada && !jornada.querySelector('.kpi-main')) {
    jornada.innerHTML = `
      <h3 data-edit>JORNADA PRODUTIVA</h3>
      <p class="kpi-main"><span>Media jornada</span><strong id="medJornada">--:--</strong></p>
      <div class="kpi-details">
        <p><span>1o atend.</span><strong id="medPrimeiro">--:--</strong></p>
        <p><span>Ult. atend.</span><strong id="medUltimo">--:--</strong></p>
        <p class="danger"><span>Incomp.</span><strong id="jornadaIncomp">0%</strong></p>
      </div>
    `;
  }

  const eficiencia = document.querySelector('.summary .teal.kpi-card');
  if (eficiencia && !eficiencia.querySelector('.kpi-main')) {
    eficiencia.innerHTML = `
      <h3 data-edit>EFICIENCIA</h3>
      <p class="kpi-main"><span>Media serv./dia</span><strong id="mediaServDia">0</strong></p>
      <div class="kpi-details">
        <p class="danger"><span>% improd.</span><strong id="impGeral">0%</strong></p>
        <p><span>Moto</span><strong id="impMoto">0%</strong></p>
        <p><span>Multi</span><strong id="impMulti">0%</strong></p>
      </div>
    `;
  }
}

function classificarCriticidade(indice) {
  const value = Number(indice || 0);
  if (value >= 50) return 'Critico';
  if (value >= 30) return 'Alto';
  if (value >= 20) return 'Atencao';
  return 'Controlado';
}

function fmtDeltaPontos(value) {
  const abs = Math.abs(Number(value || 0));
  return `${abs.toFixed(1).replace('.', ',')} p.p.`;
}

function tendenciaVoz(historico, key) {
  const pontos = (Array.isArray(historico) ? historico : [])
    .map((item) => ({ label: item?.label || item?.mes || '', value: Number(item?.[key]) }))
    .filter((item) => Number.isFinite(item.value));
  if (pontos.length < 2) return { delta: null, classe: 'flat', texto: 'Sem comparativo mensal' };
  const anterior = pontos[pontos.length - 2];
  const atual = pontos[pontos.length - 1];
  const delta = atual.value - anterior.value;
  const contexto = atual.label && anterior.label ? ` ${atual.label} vs ${anterior.label}` : ' vs mes anterior';
  if (Math.abs(delta) < 0.05) return { delta, classe: 'flat', texto: `Estavel${contexto}` };
  return {
    delta,
    classe: delta > 0 ? 'up' : 'down',
    texto: `${delta > 0 ? 'Subiu' : 'Caiu'} ${fmtDeltaPontos(delta)}${contexto}`
  };
}

function renderContextoExecutivo(data) {
  const indice = Number(data.eficiencia?.indiceImpedimento || 0);
  const totalServicos = Number(data.totalServicos || 0);
  const acima30 = Number(data.estatisticas?.equipesAcima30 || 0);
  const acima30Perc = Number(data.estatisticas?.equipesAcima30Perc || 0);
  const top10 = Number(data.estatisticas?.top10Perc ?? top10PercentualVolume(data) ?? data.estatisticas?.top5Perc ?? 0);
  const maior = data.estatisticas?.maiorImpedimento || {};
  const servicosImpactados = Math.round(totalServicos * (indice / 100));

  setText('ctxCriticidade', `${classificarCriticidade(indice)} - ${fmtPct(indice)} de impedimento medio`);
  setText('ctxImpacto', `${fmtInt(servicosImpactados)} servicos sob risco no periodo`);
  setText('ctxConcentracao', `Top 10 responde por ${fmtPct(top10, 2)} do volume`);

  const equipeCritica = shortName(maior.equipe || '');
  const acao = acima30 > 0
    ? `Priorizar ${fmtInt(acima30)} equipes acima de 30% (${fmtPct(acima30Perc)}).`
    : `Manter rotina preventiva; nenhuma equipe acima de 30%.`;
  setText('ctxAcao', equipeCritica ? `${acao} Revisar ${equipeCritica}.` : acao);
}

function renderIndiceVozes(data, targetId = 'voiceIndexChart', expanded = false) {
  const chart = $(targetId);
  if (!chart) return;

  const impedimento = Number(data.eficiencia?.indiceImpedimento || 0);
  const produtividade = Number(data.performance?.geral || 0);
  const jornadaIncompleta = Number(data.jornada?.percentualIncompleta || 0);
  const jornada = Math.max(0, Math.min(100, 100 - jornadaIncompleta));
  const historicoBase = Array.isArray(data.historicoVozes) ? data.historicoVozes : [];
  const dataFimAtual = parseIsoDate(data?.periodo?.dataFim || data?.filtros?.dataFim || $('dataFim')?.value);
  const mesAtual = dataFimAtual ? monthKey(dataFimAtual) : '';
  const historico = historicoBase.length
    ? historicoBase.map((item) => {
      if (item?.mes !== mesAtual) return item;
      return {
        ...item,
        impedimento,
        produtividade,
        jornada
      };
    })
    : [{ label: 'Atual', impedimento, produtividade, jornada }];

  const vozes = [
    {
      key: 'impedimento',
      label: 'Impedimento',
      value: impedimento,
      meta: '<= 30%',
      detalhe: `${fmtInt(data.eficiencia?.improdutivos)} improdutivos de ${fmtInt(data.eficiencia?.executados)} executados`,
      color: '#c91522'
    },
    {
      key: 'produtividade',
      label: 'Produtividade',
      value: produtividade,
      meta: '>= 85%',
      detalhe: `Resultado geral de performance operacional`,
      color: '#08714c'
    },
    {
      key: 'jornada',
      label: 'Jornada',
      value: jornada,
      meta: 'Aderencia',
      detalhe: `${fmtPct(jornadaIncompleta, 2)} de jornadas incompletas`,
      color: '#15596b'
    }
  ];
  const larguraSvg = 420;
  const alturaSvg = expanded ? 190 : 150;
  const plot = { left: 36, right: larguraSvg - 18, top: 20, bottom: alturaSvg - 32 };
  const plotW = plot.right - plot.left;
  const plotH = plot.bottom - plot.top;
  const xMes = (index) => plot.left + (historico.length <= 1 ? plotW / 2 : (plotW / (historico.length - 1)) * index);
  const yValor = (value) => plot.bottom - (Math.max(0, Math.min(100, Number(value || 0))) / 100) * plotH;
  const polyline = (key) => historico.map((item, index) => `${xMes(index)},${yValor(item[key])}`).join(' ');
  const linhas = vozes.map((voz) => `
    <polyline class="voice-line ${voz.key}" style="--voice-color: ${voz.color};" points="${polyline(voz.key)}"></polyline>
  `).join('');
  const pontos = vozes.map((voz) => historico.map((item, index) => {
    const x = xMes(index);
    const y = yValor(item[voz.key]);
    return `
      <g class="voice-point ${voz.key}" style="--voice-color: ${voz.color};">
        <circle cx="${x}" cy="${y}" r="${expanded ? 4.8 : 3.8}"></circle>
        ${index === historico.length - 1 ? `<text class="point-value" x="${x}" y="${y - 9}">${fmtPct(item[voz.key], 0)}</text>` : ''}
      </g>
    `;
  }).join('')).join('');
  const labels = historico.map((item, index) => `
    <text class="point-label" x="${xMes(index)}" y="${alturaSvg - 10}">${escapeHtml(item.label || item.mes || '')}</text>
  `).join('');

  chart.classList.toggle('expanded', expanded);
  chart.innerHTML = `
    <div class="voice-index-head">
      <strong>Evolucao mensal das vozes operacionais</strong>
      <span>Comparativo com meses anteriores</span>
    </div>
    <div class="voice-line-chart" aria-label="Grafico em linha das vozes">
      <svg viewBox="0 0 ${larguraSvg} ${alturaSvg}" role="img">
        <line class="grid-line" x1="${plot.left}" y1="${plot.top}" x2="${plot.right}" y2="${plot.top}"></line>
        <line class="grid-line" x1="${plot.left}" y1="${plot.top + plotH / 2}" x2="${plot.right}" y2="${plot.top + plotH / 2}"></line>
        <line class="grid-line" x1="${plot.left}" y1="${plot.bottom}" x2="${plot.right}" y2="${plot.bottom}"></line>
        <text class="axis-label" x="8" y="${plot.top + 3}">100</text>
        <text class="axis-label" x="14" y="${plot.top + plotH / 2 + 3}">50</text>
        <text class="axis-label" x="20" y="${plot.bottom + 3}">0</text>
        ${linhas}
        ${pontos}
        ${labels}
      </svg>
      <div class="voice-legend">
        ${vozes.map((voz) => `<span style="--voice-color: ${voz.color};">${escapeHtml(voz.label)}</span>`).join('')}
      </div>
    </div>
    <div class="voice-summary">
    ${vozes.map((voz) => {
      const tendencia = tendenciaVoz(historico, voz.key);
      return `
        <article class="voice-row ${voz.key}" style="--voice-color: ${voz.color};">
          <div class="voice-row-main">
            <span>${escapeHtml(voz.label)}</span>
            <strong>${fmtPct(voz.value, 1)}</strong>
          </div>
          <div class="voice-row-foot">
            <small>${escapeHtml(voz.detalhe)}</small>
            <em class="${tendencia.classe}">${escapeHtml(tendencia.texto)}</em>
          </div>
        </article>
      `;
    }).join('')}
    </div>
  `;
}

function abrirVozesModal() {
  if (!state.ultimoPayload) return;
  renderIndiceVozes(state.ultimoPayload, 'voiceIndexModalChart', true);
  setText('vozesModalSubtitulo', labelPeriodo(state.ultimoPayload.periodo?.dataInicio, state.ultimoPayload.periodo?.dataFim));
  const modal = $('vozesModal');
  modal?.classList.add('open');
  modal?.setAttribute('aria-hidden', 'false');
}

function fecharVozesModal() {
  const modal = $('vozesModal');
  modal?.classList.remove('open');
  modal?.setAttribute('aria-hidden', 'true');
}

function renderPainel(data) {
  const supervisorCurto = String(data.supervisor || '').replace(/\s+SILVA$/i, '');
  setText('supervisorNome', supervisorCurto);
  carregarFotoPerfilAtual();
  setText('processoTitulo', 'PROCESSO - ANALÍTICO');
  setText('perfResultado', fmtPct(data.performance?.geral));
  setText('perfMoto', fmtPct(data.performance?.moto));
  setText('perfMulti', fmtPct(data.performance?.multi));
  setText('totalEquipesTop', fmtInt(data.totalEquipes));
  setText('equipesD', fmtInt(data.performance?.equipesD));
  setText('medPrimeiro', data.jornada?.mediaPrimeiroAtendimento || '--:--');
  setText('medUltimo', data.jornada?.mediaUltimoAtendimento || '--:--');
  setText('medJornada', data.jornada?.mediaJornadaProdutiva || '--:--');
  setText('jornadaIncomp', fmtPct(data.jornada?.percentualIncompleta, 2));
  setText('mediaServDia', fmtNum(data.mediaServEquipeDia, 1));
  setText('impGeral', fmtPct(data.eficiencia?.indiceImpedimento, 2));
  setText('impMoto', fmtPct(data.eficiencia?.improdutivoMoto, 2));
  setText('impMulti', fmtPct(data.eficiencia?.improdutivoMulti, 2));

  setText('totalEquipes', fmtInt(data.totalEquipes));
  setText('totalServicos', fmtInt(data.totalServicos));
  setText('mediaMensal', fmtInt(data.mediaMensalServicos));
  setText('indiceMedio', fmtPct(data.eficiencia?.indiceImpedimento));

  renderTop(data);
  renderStats(data);
  renderFaixas(data);
  melhorarDistribuicaoFaixas(data);
  renderContextoExecutivo(data);
  renderIndiceVozes(data);

  const top10 = data.estatisticas?.top10Perc ?? top10PercentualVolume(data) ?? data.estatisticas?.top5Perc ?? 0;
  const top5 = top10;
  const acima30 = data.estatisticas?.equipesAcima30 || 0;
  setText('notaTop5', `As 5 primeiras equipes concentram ${fmtPct(top5, 2)} do total de serviços realizados.`);
  setText('notaAcima30', `${fmtInt(acima30)} equipes possuem índice de impedimento acima de 30%.`);
  setText('notaIndice', `O índice médio de impedimento é de ${fmtPct(data.eficiencia?.indiceImpedimento)}, indicando oportunidades de melhoria.`);
  setText('notaTop5', `As 10 primeiras equipes concentram ${fmtPct(top10, 2)} do total de servicos realizados.`);
  setText('fonteTexto', `Fonte: Banco MySQL | Dados consolidados de ${labelPeriodo(data.periodo?.dataInicio, data.periodo?.dataFim)}`);

  aplicarEditavel();
}

function renderTop(data) {
  const rows = equipesOrdenadasPorVolume(data).slice(0, 10);
  $('topEquipesBody').innerHTML = rows.map((item, index) => `
    <tr style="--row-share: ${Math.max(0, Math.min(100, Number(item.percVolume || 0)))}%;">
      <td><span class="rank r${index + 1}">${index + 1}</span></td>
      <td class="value-edit team-cell">${escapeHtml(shortName(item.equipe))}</td>
      <td class="value-edit">${fmtInt(item.totalServicos)}</td>
      <td class="value-edit">${fmtInt(item.executados)}</td>
      <td class="value-edit">${fmtInt(item.produtivos)}</td>
      <td class="value-edit"><span class="indicator-chip danger">${fmtPct(item.impedimento, 1)}</span></td>
      <td class="value-edit"><span class="indicator-chip neutral">${escapeHtml(item.jornadaProdutiva || '--:--')}</span></td>
      <td class="value-edit"><span class="indicator-chip good">${fmtPct(item.performance, 1)}</span></td>
      <td class="value-edit"><span class="indicator-chip neutral">${escapeHtml(item.faixa || '-')}</span></td>
      <td class="value-edit share-cell"><span>${fmtPct(item.percVolume, 2)}</span></td>
    </tr>
  `).join('');
  setText('topTotal', fmtInt(data.totalServicos));
}

function equipesOrdenadasPorVolume(data) {
  const totalServicos = Number(data.totalServicos || 0);
  return (data.equipes || [])
    .slice()
    .sort((a, b) => Number(b.totalServicos || 0) - Number(a.totalServicos || 0) || String(a.equipe || '').localeCompare(String(b.equipe || ''), 'pt-BR'))
    .map((item, index) => ({
      ...item,
      produtivos: Number.isFinite(Number(item.produtivos))
        ? Number(item.produtivos)
        : Math.max(0, Number(item.executados || 0) - Number(item.improdutivos || 0)),
      pos: index + 1,
      percVolume: totalServicos ? (Number(item.totalServicos || 0) / totalServicos) * 100 : 0
    }));
}

function top10PercentualVolume(data) {
  return equipesOrdenadasPorVolume(data)
    .slice(0, 10)
    .reduce((acc, item) => acc + Number(item.percVolume || 0), 0);
}

function renderEquipesModal(data) {
  const rows = equipesOrdenadasPorVolume(data);
  const body = $('equipesModalBody');
  if (!body) return;
  body.innerHTML = rows.map((item) => `
    <tr>
      <td><span class="rank">${item.pos}</span></td>
      <td class="team-cell">${escapeHtml(shortName(item.equipe))}</td>
      <td>${fmtInt(item.totalServicos)}</td>
      <td>${fmtInt(item.executados)}</td>
      <td>${fmtInt(item.produtivos)}</td>
      <td><span class="indicator-chip danger">${fmtPct(item.impedimento, 1)}</span></td>
      <td><span class="indicator-chip neutral">${escapeHtml(item.jornadaProdutiva || '--:--')}</span></td>
      <td><span class="indicator-chip good">${fmtPct(item.performance, 1)}</span></td>
      <td><span class="indicator-chip neutral">${escapeHtml(item.faixa || '-')}</span></td>
      <td>${fmtPct(item.percVolume, 2)}</td>
    </tr>
  `).join('');
  setText('equipesModalSubtitulo', `${fmtInt(rows.length)} equipes | ${labelPeriodo(data.periodo?.dataInicio, data.periodo?.dataFim)}`);
}

function abrirEquipesModal() {
  if (!state.ultimoPayload) return;
  renderEquipesModal(state.ultimoPayload);
  const modal = $('equipesModal');
  modal?.classList.add('open');
  modal?.setAttribute('aria-hidden', 'false');
}

function fecharEquipesModal() {
  const modal = $('equipesModal');
  modal?.classList.remove('open');
  modal?.setAttribute('aria-hidden', 'true');
}

function renderStats(data) {
  const maior = data.estatisticas?.maiorImpedimento || {};
  const menor = data.estatisticas?.menorImpedimento || {};
  setText('statIndice', fmtPct(data.eficiencia?.indiceImpedimento));
  setText('maiorEquipe', shortName(maior.equipe || '-'));
  setText('maiorImp', fmtPct(maior.impedimento));
  setText('menorEquipe', shortName(menor.equipe || '-'));
  setText('menorImp', fmtPct(menor.impedimento));
  setText('acima30', fmtInt(data.estatisticas?.equipesAcima30));
  setText('acima30Perc', `(${fmtPct(data.estatisticas?.equipesAcima30Perc)} do total de equipes)`);
}

function renderFaixas(data) {
  const faixas = data.faixasImpedimento || [];
  $('faixaHeader').innerHTML = '<th>FAIXA DE IMPEDIMENTO</th>' + faixas.map((f) => `<th>${escapeHtml(f.label)}</th>`).join('');
  $('faixaQtd').innerHTML = '<th>Nº DE EQUIPES</th>' + faixas.map((f) => `<td class="value-edit">${fmtInt(f.quantidade)}</td>`).join('');
  $('faixaPerc').innerHTML = '<th>% DO TOTAL DE EQUIPES</th>' + faixas.map((f) => `<td class="value-edit">${fmtPct(f.percentual, 2)}</td>`).join('');
}

function melhorarDistribuicaoFaixas(data) {
  const faixas = data.faixasImpedimento || [];
  Array.from(document.querySelectorAll('#faixaQtd td')).forEach((cell) => {
    cell.innerHTML = `<strong>${escapeHtml(cell.textContent.trim())}</strong>`;
  });
  Array.from(document.querySelectorAll('#faixaPerc td')).forEach((cell, index) => {
    const percentual = Math.max(0, Math.min(100, Number(faixas[index]?.percentual || 0)));
    const label = cell.textContent.trim();
    cell.classList.add('faixa-percent');
    cell.style.setProperty('--faixa-share', `${percentual}%`);
    cell.innerHTML = `<span>${escapeHtml(label)}</span>`;
  });
}

function aplicarEditavel() {
  document.querySelectorAll('[data-edit], .value-edit').forEach((el) => {
    el.contentEditable = state.editando ? 'true' : 'false';
  });
  $('painelAnalitico').classList.toggle('editable', state.editando);
  $('btnEditar').textContent = state.editando ? 'Bloquear edição' : 'Editar textos';
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function coletarCssPainel() {
  const textos = [];
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      if (sheet.cssRules) {
        textos.push(Array.from(sheet.cssRules).map((rule) => rule.cssText).join('\n'));
      }
    } catch (error) {
      const href = sheet.href;
      if (!href) continue;
      try {
        textos.push(await fetch(href, { cache: 'no-store' }).then((resp) => resp.ok ? resp.text() : ''));
      } catch (_) {
        // Ignora folhas que o navegador bloquear; os estilos principais são locais.
      }
    }
  }
  return textos.join('\n');
}

function nomeArquivoPainel() {
  const supervisor = normalizarTexto($('supervisorSelect')?.value || 'supervisor')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'supervisor';
  const inicio = $('dataInicio')?.value || 'inicio';
  const fim = $('dataFim')?.value || 'fim';
  return `painel-analitico-${supervisor}-${inicio}-${fim}.png`;
}

function canvasText(id, fallback = '') {
  return ($(id)?.textContent || fallback).trim();
}

function baixarCanvas(canvas, filename) {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function clonarPainelParaExportacao(panel) {
  const clone = panel.cloneNode(true);
  clone.classList.remove('loading', 'editable');
  clone.querySelectorAll('[contenteditable]').forEach((el) => el.removeAttribute('contenteditable'));
  return clone;
}

async function exportarImagemFiel(panel, filename) {
  const rect = panel.getBoundingClientRect();
  const width = Math.ceil(panel.scrollWidth || rect.width);
  const height = Math.ceil(panel.scrollHeight || rect.height);
  const css = await coletarCssPainel();
  const resp = await fetch('/api/painel-analitico/export-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      width,
      height,
      css,
      html: clonarPainelParaExportacao(panel).outerHTML,
      filename
    })
  });
  if (!resp.ok) {
    const payload = await resp.json().catch(() => ({}));
    throw new Error(payload.error || `HTTP ${resp.status}`);
  }
  const blob = await resp.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function fillRoundRect(ctx, x, y, width, height, radius, color) {
  ctx.fillStyle = color;
  roundRect(ctx, x, y, width, height, radius);
  ctx.fill();
}

function drawCenteredText(ctx, text, x, y, width, font, color) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + width / 2, y);
}

function wrapLinesCanvas(ctx, text, maxWidth, maxLines = 3) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';
  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  });
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

function drawCard(ctx, { x, y, w, h, color, title, rows, split = false, bigRow = false }) {
  fillRoundRect(ctx, x, y, w, h, 8, color);
  ctx.fillStyle = 'rgba(255,255,255,.55)';
  ctx.fillRect(x, y, w, 4);
  ctx.font = '900 13px Arial';
  ctx.fillStyle = 'rgba(255,255,255,.88)';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, x + 16, y + 24);
  rows.forEach((row, index) => {
    const yy = index === 0 ? y + 58 : y + 91 + (index - 1) * 24;
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'middle';
    if (index === 0) {
      ctx.textAlign = 'left';
      ctx.font = '900 10px Arial';
      ctx.fillStyle = 'rgba(255,255,255,.72)';
      ctx.fillText(row.label, x + 18, yy);
      ctx.textAlign = 'right';
      ctx.font = '900 31px Arial';
      ctx.fillStyle = '#fff';
      ctx.fillText(row.value, x + w - 16, yy + 2);
      ctx.strokeStyle = 'rgba(255,255,255,.2)';
      ctx.beginPath();
      ctx.moveTo(x + 16, y + 78);
      ctx.lineTo(x + w - 16, y + 78);
      ctx.stroke();
    } else if (split) {
      fillRoundRect(ctx, x + 16, yy - 10, w - 32, 20, 5, 'rgba(255,255,255,.1)');
      ctx.textAlign = 'left';
      ctx.font = '900 10px Arial';
      ctx.fillStyle = 'rgba(255,255,255,.78)';
      ctx.fillText(row.label, x + 24, yy);
      ctx.textAlign = 'right';
      ctx.font = '900 15px Arial';
      ctx.fillStyle = row.danger ? '#ff4b5b' : '#fff';
      ctx.fillText(row.value, x + w - 24, yy);
    } else {
      ctx.textAlign = 'right';
      ctx.font = bigRow && index === rows.length - 1 ? '900 22px Arial' : '900 13px Arial';
      ctx.fillText(`${row.label}:`, x + w * 0.54, yy);
      ctx.textAlign = 'left';
      ctx.font = '900 22px Arial';
      ctx.fillText(row.value, x + w * 0.57, yy);
    }
  });
}

function drawBoxHeader(ctx, x, y, w, title, color = '#073875') {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, 26);
  drawCenteredText(ctx, title, x, y + 13, w, '900 14px Arial', '#fff');
}

function drawAnaliticoCanvas() {
  const scale = 2;
  const width = 1280;
  const height = 900;
  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  ctx.fillStyle = '#f7f8f4';
  ctx.fillRect(0, 0, width, height);
  ctx.font = '900 22px Arial';
  ctx.fillStyle = '#1c4971';
  ctx.textAlign = 'left';
  ctx.fillText(canvasText('supervisorNome', 'SUPERVISOR'), 78, 48);
  drawCenteredText(ctx, canvasText('processoTitulo', 'PROCESSO - ANALITICO'), 360, 38, 560, '900 34px Arial', '#16446b');
  ctx.textAlign = 'right';
  ctx.font = '900 38px Arial';
  ctx.fillStyle = '#0a3974';
  ctx.fillText('NCSR', 1238, 40);
  ctx.font = '900 12px Arial';
  ctx.fillText('E N E R G I A', 1238, 61);

  drawCard(ctx, {
    x: 45, y: 80, w: 238, h: 138, color: '#123f7d', title: 'PERFORMANCE',
    rows: [
      { label: 'RESULTADO', value: canvasText('perfResultado', '0%') },
      { label: 'MOTO', value: canvasText('perfMoto', '0%') },
      { label: 'MULTI', value: canvasText('perfMulti', '0%') }
    ],
    split: true
  });
  drawCard(ctx, {
    x: 348, y: 80, w: 238, h: 138, color: '#123f7d', title: 'BASE OPERACIONAL',
    rows: [
      { label: 'TOTAL DE EQUIPES', value: canvasText('totalEquipesTop', '0') },
      { label: 'EQUIPES D', value: canvasText('equipesD', '0'), danger: true }
    ],
    split: true
  });
  drawCard(ctx, {
    x: 651, y: 80, w: 262, h: 138, color: '#05664d', title: 'JORNADA PRODUTIVA', split: true,
    rows: [
      { label: 'MED. 1º ATEND.:', value: canvasText('medPrimeiro', '--:--') },
      { label: 'MED ULT. ATEND.:', value: canvasText('medUltimo', '--:--') },
      { label: 'MED JORN PROD.:', value: canvasText('medJornada', '--:--') },
      { label: 'JORN. PROD. INCOMP.:', value: canvasText('jornadaIncomp', '0%') }
    ]
  });
  drawCard(ctx, {
    x: 960, y: 80, w: 260, h: 138, color: '#15596b', title: 'EFICIÊNCIA', split: true,
    rows: [
      { label: 'MÉDIA SERV./DIA:', value: canvasText('mediaServDia', '0') },
      { label: '% IMPROD.:', value: canvasText('impGeral', '0%'), danger: true },
      { label: 'IMPROD. MOTO:', value: canvasText('impMoto', '0%') },
      { label: 'IMPROD. MULTI:', value: canvasText('impMulti', '0%') }
    ]
  });

  const boxY = 250;
  fillRoundRect(ctx, 20, boxY, 312, 272, 7, '#fff');
  drawBoxHeader(ctx, 20, boxY, 312, 'DESEMPENHO GERAL');
  [
    ['Total de Equipes', canvasText('totalEquipes', '0')],
    ['Total de Serviços', canvasText('totalServicos', '0')],
    ['Média Mensal Serv.', canvasText('mediaMensal', '0')],
    ['Índice Médio Imped.', canvasText('indiceMedio', '0%')]
  ].forEach((row, index) => {
    const y = boxY + 62 + index * 58;
    ctx.strokeStyle = '#e1e6ee';
    ctx.beginPath();
    ctx.moveTo(36, y + 32);
    ctx.lineTo(316, y + 32);
    ctx.stroke();
    ctx.fillStyle = '#123f7d';
    ctx.beginPath();
    ctx.arc(55, y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '900 14px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'left';
    ctx.fillText(row[0], 96, y + 5);
    ctx.font = '900 26px Arial';
    ctx.fillStyle = index === 3 ? '#c91522' : '#073875';
    ctx.textAlign = 'right';
    ctx.fillText(row[1], 315, y + 6);
  });

  fillRoundRect(ctx, 345, boxY, 505, 272, 7, '#fff');
  drawBoxHeader(ctx, 345, boxY, 505, 'TOP 5 EQUIPES - MAIOR VOLUME DE SERVIÇOS', '#08714c');
  ctx.font = '900 11px Arial';
  ctx.fillStyle = '#153566';
  ctx.textAlign = 'center';
  ['POS.', 'Equipe', 'Total', '%', '% Acum.'].forEach((h, i) => ctx.fillText(h, [380, 470, 600, 705, 805][i], boxY + 48));
  const topRows = Array.from(document.querySelectorAll('#topEquipesBody tr')).slice(0, 5);
  topRows.forEach((tr, index) => {
    const cells = Array.from(tr.cells).map((td) => td.textContent.trim());
    const y = boxY + 82 + index * 38;
    ctx.fillStyle = ['#c91522', '#e87911', '#f5b700', '#08835f', '#08835f'][index] || '#08835f';
    ctx.beginPath();
    ctx.arc(395, y - 4, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '900 12px Arial';
    ctx.fillText(String(index + 1), 395, y);
    ctx.fillStyle = '#000';
    ctx.textAlign = 'left';
    ctx.font = '900 12px Arial';
    wrapLinesCanvas(ctx, cells[1], 170, 2).forEach((line, lineIndex) => ctx.fillText(line, 445, y - 8 + lineIndex * 14));
    ctx.textAlign = 'center';
    ctx.fillText(cells[2] || '', 600, y);
    ctx.fillText(cells[3] || '', 705, y);
    ctx.fillText(cells[4] || '', 805, y);
  });
  ctx.fillStyle = '#073875';
  ctx.fillRect(345, boxY + 244, 505, 28);
  ctx.fillStyle = '#fff';
  ctx.font = '900 14px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('TOTAL GERAL', 450, boxY + 263);
  ctx.textAlign = 'center';
  ctx.fillText(canvasText('topTotal', '0'), 600, boxY + 263);
  ctx.fillText('100%', 705, boxY + 263);
  ctx.fillText('-', 805, boxY + 263);

  fillRoundRect(ctx, 865, boxY, 395, 272, 7, '#fff');
  drawBoxHeader(ctx, 865, boxY, 395, 'ESTATÍSTICAS DE IMPEDIMENTO', '#c98b00');
  [
    ['Índice Médio de Impedimento', canvasText('statIndice', '0%')],
    [`Equipe com Maior Impedimento ${canvasText('maiorEquipe', '-')}`, canvasText('maiorImp', '0%')],
    [`Equipe com Menor Impedimento ${canvasText('menorEquipe', '-')}`, canvasText('menorImp', '0%')],
    [`Equipes com Impedimento Acima de 30% ${canvasText('acima30Perc', '')}`, canvasText('acima30', '0')]
  ].forEach((row, index) => {
    const y = boxY + 72 + index * 58;
    ctx.font = '900 13px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'left';
    wrapLinesCanvas(ctx, row[0], 230, 2).forEach((line, lineIndex) => ctx.fillText(line, 935, y - 6 + lineIndex * 14));
    ctx.font = '900 26px Arial';
    ctx.fillStyle = '#c91522';
    ctx.textAlign = 'right';
    ctx.fillText(row[1], 1240, y + 5);
  });

  fillRoundRect(ctx, 20, 535, 730, 170, 7, '#fff');
  drawBoxHeader(ctx, 20, 535, 730, 'DISTRIBUIÇÃO DO ÍNDICE DE IMPEDIMENTO', '#eef3fb');
  ctx.fillStyle = '#153566';
  ctx.font = '900 14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('DISTRIBUIÇÃO DO ÍNDICE DE IMPEDIMENTO', 385, 553);
  const colors = ['#f8e4e1', '#f9eee0', '#fbf3dc', '#e4f2e8', '#e6f3e5', '#e0f0e7'];
  const colorText = ['#bf202b', '#ba6d00', '#b78a00', '#08714c', '#08714c', '#08714c'];
  const headers = Array.from(document.querySelectorAll('#faixaHeader th')).map((th) => th.textContent.trim());
  const qtd = Array.from(document.querySelectorAll('#faixaQtd th, #faixaQtd td')).map((td) => td.textContent.trim());
  const perc = Array.from(document.querySelectorAll('#faixaPerc th, #faixaPerc td')).map((td) => td.textContent.trim());
  [headers, qtd, perc].forEach((row, rowIndex) => {
    row.forEach((text, colIndex) => {
      const x = 20 + (colIndex === 0 ? 0 : 180 + (colIndex - 1) * 91);
      const w = colIndex === 0 ? 180 : 91;
      const y = 565 + rowIndex * 30;
      ctx.fillStyle = colIndex === 0 ? '#f5f7fb' : (rowIndex === 0 ? colors[colIndex - 1] : '#fff');
      ctx.fillRect(x, y, w, 30);
      ctx.fillStyle = colIndex === 0 ? '#153566' : (rowIndex === 0 ? colorText[colIndex - 1] : '#001f4e');
      ctx.font = '900 11px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(text, x + w / 2, y + 19);
    });
  });

  fillRoundRect(ctx, 762, 535, 498, 170, 7, '#fff');
  drawBoxHeader(ctx, 762, 535, 498, 'PRINCIPAIS DESTAQUES', '#eef3fb');
  ctx.fillStyle = '#153566';
  ctx.font = '900 14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('PRINCIPAIS DESTAQUES', 1011, 553);
  [canvasText('notaTop5'), canvasText('notaAcima30'), canvasText('notaIndice')].forEach((text, index) => {
    const y = 590 + index * 28;
    ctx.fillStyle = '#08835f';
    ctx.beginPath();
    ctx.arc(785, y - 4, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.font = '900 12px Arial';
    ctx.textAlign = 'left';
    wrapLinesCanvas(ctx, text, 430, 2).forEach((line, lineIndex) => ctx.fillText(line, 805, y + lineIndex * 13));
  });

  [
    ['CRITICIDADE', canvasText('ctxCriticidade', '-')],
    ['IMPACTO ESTIMADO', canvasText('ctxImpacto', '-')],
    ['CONCENTRACAO', canvasText('ctxConcentracao', '-')],
    ['ACAO SUGERIDA', canvasText('ctxAcao', '-')]
  ].forEach((item, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = 778 + col * 236;
    const y = 642 + row * 42;
    fillRoundRect(ctx, x, y, 220, 34, 5, '#f8fafc');
    ctx.fillStyle = '#073875';
    ctx.fillRect(x, y, 4, 34);
    ctx.fillStyle = '#5b6d82';
    ctx.font = '900 9px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(item[0], x + 12, y + 12);
    ctx.fillStyle = '#102f57';
    ctx.font = '900 10px Arial';
    wrapLinesCanvas(ctx, item[1], 198, 2).forEach((line, lineIndex) => ctx.fillText(line, x + 12, y + 25 + lineIndex * 10));
  });

  ctx.fillStyle = '#edf3fb';
  ctx.fillRect(20, 725, 1240, 43);
  ctx.fillStyle = '#073875';
  ctx.font = '900 18px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('FOCO:', 44, 753);
  ctx.fillStyle = '#000';
  ctx.font = '900 13px Arial';
  ctx.fillText('Maximizar as horas produtivas, reduzindo impactos e perdas para alcançar melhores resultados com eficiência e disciplina operacional.', 120, 753);
  ctx.font = '900 11px Arial';
  ctx.fillStyle = '#1d3552';
  ctx.fillText(canvasText('fonteTexto', 'Fonte: Banco MySQL | Dados consolidados'), 24, 792);

  return canvas;
}

async function exportarImagemPainel() {
  const panel = $('painelAnalitico');
  const btn = $('btnExportarImagem');
  if (!panel) return;

  const textoOriginal = btn?.textContent || '';
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Exportando...';
  }

  const estavaEditando = state.editando;
  try {
    await document.fonts?.ready;
    const filename = nomeArquivoPainel();
    panel.classList.remove('loading', 'editable');
    panel.querySelectorAll('[contenteditable]').forEach((el) => el.setAttribute('data-export-contenteditable', el.getAttribute('contenteditable') || ''));
    panel.querySelectorAll('[contenteditable]').forEach((el) => el.removeAttribute('contenteditable'));

    try {
      await exportarImagemFiel(panel, filename);
    } catch (fielError) {
      console.warn('Exportacao fiel falhou; usando canvas desenhado como fallback.', fielError);
      baixarCanvas(drawAnaliticoCanvas(), filename);
    }
  } catch (error) {
    alert(`Não foi possível exportar a imagem: ${error?.message || String(error) || 'erro desconhecido'}`);
    console.error(error);
  } finally {
    panel.querySelectorAll('[data-export-contenteditable]').forEach((el) => {
      el.setAttribute('contenteditable', el.getAttribute('data-export-contenteditable'));
      el.removeAttribute('data-export-contenteditable');
    });
    panel.classList.toggle('editable', estavaEditando);
    if (btn) {
      btn.disabled = false;
      btn.textContent = textoOriginal;
    }
  }
}

async function init() {
  prepararKpiCards();
  configurarFotoPerfil();
  aplicarFiltrosIniciais();
  $('btnCarregar').addEventListener('click', carregarPainel);
  $('btnEditar').addEventListener('click', () => {
    state.editando = !state.editando;
    aplicarEditavel();
  });
  $('btnExportarImagem')?.addEventListener('click', exportarImagemPainel);
  $('btnTopEquipesTelaCheia')?.addEventListener('click', abrirEquipesModal);
  $('btnFecharEquipesModal')?.addEventListener('click', fecharEquipesModal);
  $('btnVozesTelaCheia')?.addEventListener('click', abrirVozesModal);
  $('btnFecharVozesModal')?.addEventListener('click', fecharVozesModal);
  $('equipesModal')?.addEventListener('click', (event) => {
    if (event.target === $('equipesModal')) fecharEquipesModal();
  });
  $('vozesModal')?.addEventListener('click', (event) => {
    if (event.target === $('vozesModal')) fecharVozesModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      fecharEquipesModal();
      fecharVozesModal();
    }
  });
  $('btnImprimir').addEventListener('click', () => window.print());
  $('dataInicio').addEventListener('change', async () => {
    salvarFiltrosPainel();
    await carregarSupervisores();
  });
  $('dataFim').addEventListener('change', async () => {
    salvarFiltrosPainel();
    await carregarSupervisores();
  });
  $('supervisorSelect').addEventListener('change', async () => {
    carregarFotoPerfilAtual();
    salvarFiltrosPainel();
    await carregarPainel();
  });

  await carregarSupervisores();
  const filtrosSalvos = getSavedFilters();
  if (filtrosSalvos.supervisor && Array.from($('supervisorSelect').options).some((opt) => opt.value === filtrosSalvos.supervisor)) {
    $('supervisorSelect').value = filtrosSalvos.supervisor;
  } else {
    const cleydivan = Array.from($('supervisorSelect').options).find((opt) => opt.value.toUpperCase().includes('CLEYDIVAN'));
    if (cleydivan) $('supervisorSelect').value = cleydivan.value;
  }
  await carregarPainel();
}

init().catch((error) => {
  alert(`Não foi possível carregar o painel analítico: ${error.message}`);
  console.error(error);
});
