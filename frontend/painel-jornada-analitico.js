const $ = (id) => document.getElementById(id);

const state = {
  editando: false,
  ultimoPayload: null
};

function fmtInt(value) {
  return Math.round(Number(value || 0)).toLocaleString('pt-BR');
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

function normalizarTexto(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
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

function aplicarParametrosUrl() {
  const params = new URLSearchParams(window.location.search);
  const inicio = params.get('dataInicio');
  const fim = params.get('dataFim');
  if (inicio) $('dataInicio').value = inicio;
  if (fim) $('dataFim').value = fim;
  return params.get('supervisor') || '';
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
    const payload = await fetchJson(`/api/painel-jornada-analitico?${params}`);
    state.ultimoPayload = payload;
    renderPainel(payload);
  } finally {
    panel.classList.remove('loading');
  }
}

function setText(id, text) {
  const el = $(id);
  if (el) el.textContent = text;
}

function renderPainel(data) {
  const supervisorCurto = String(data.supervisor || '').replace(/\s+SILVA$/i, '');
  setText('supervisorNome', supervisorCurto);
  setText('processoTitulo', 'PROCESSO - JORNADA');

  setText('mediaInicio', data.jornada?.mediaInicio || '--:--');
  setText('mediaFim', data.jornada?.mediaFim || '--:--');
  setText('mediaTrabalho', data.jornada?.mediaTrabalho || '--:--');
  setText('mediaProdutiva', data.jornada?.mediaProdutiva || '--:--');
  setText('mediaPrimeiro', data.jornada?.mediaPrimeiro || '--:--');
  setText('mediaUltimo', data.jornada?.mediaUltimo || '--:--');

  setText('percIncompleta', fmtPct(data.jornada?.percentualIncompleta, 2));
  setText('percSemRefeicao', fmtPct(data.jornada?.percentualSemRefeicao, 2));
  setText('percInicioTardio', fmtPct(data.jornada?.percentualInicioTardio, 2));
  setText('percSemPrimeiro', fmtPct(data.jornada?.percentualSemPrimeiro, 2));
  setText('percSemUltimo', fmtPct(data.jornada?.percentualSemUltimo, 2));
  setText('percUltimoCedo', fmtPct(data.jornada?.percentualUltimoCedo, 2));

  setText('totalEquipes', fmtInt(data.totalEquipes));
  setText('resumoProdutiva', data.jornada?.mediaProdutiva || '--:--');
  setText('resumoJornada', data.jornada?.mediaTrabalho || '--:--');
  setText('resumoIncomp', fmtPct(data.jornada?.percentualIncompleta));

  renderTop(data);
  renderStats(data);
  renderFaixas(data);
  setText('notaIncompleta', `${fmtInt(data.estatisticas?.equipesComIncompleta)} equipes apresentaram pelo menos uma jornada produtiva inferior a 7h30.`);
  setText('notaRefeicao', `${fmtInt(data.estatisticas?.equipesSemRefeicao)} equipes possuem dias sem registro de refeição no período.`);
  setText('notaAtendimento', `Média de atendimento: ${data.jornada?.mediaPrimeiro || '--:--'} até ${data.jornada?.mediaUltimo || '--:--'}, com jornada média de ${data.jornada?.mediaProdutiva || '--:--'}.`);
  setText('fonteTexto', `Fonte: Banco MySQL | Dados consolidados de ${labelPeriodo(data.periodo?.dataInicio, data.periodo?.dataFim)}`);
  setText('notaAtendimento', `Trabalho m\u00e9dio: ${data.jornada?.mediaInicio || '--:--'} at\u00e9 ${data.jornada?.mediaFim || '--:--'} (${data.jornada?.mediaTrabalho || '--:--'}). Produtiva m\u00e9dia: ${data.jornada?.mediaPrimeiro || '--:--'} at\u00e9 ${data.jornada?.mediaUltimo || '--:--'} (${data.jornada?.mediaProdutiva || '--:--'}).`);

  aplicarEditavel();
}

function renderTop(data) {
  const rows = data.topRisco || [];
  $('topJornadaBody').innerHTML = rows.map((item, index) => `
    <tr>
      <td><span class="rank r${index + 1}">${index + 1}</span></td>
      <td class="value-edit">${escapeHtml(shortName(item.equipe))}</td>
      <td class="value-edit">${escapeHtml(item.mediaPrimeiro || '--:--')}</td>
      <td class="value-edit">${escapeHtml(item.mediaUltimo || '--:--')}</td>
      <td class="value-edit">${escapeHtml(item.mediaJornada || '--:--')}</td>
    </tr>
  `).join('');
  setText('topTotalEquipes', fmtInt(data.totalEquipes));
}

function renderStats(data) {
  const menor = data.estatisticas?.menorJornada || {};
  const maior = data.estatisticas?.maiorJornada || {};
  const recorrencia = data.estatisticas?.maiorRecorrenciaProdMenor730 || data.estatisticas?.maiorRecorrenciaProdMenor7h || {};
  const recorrenciaBox = $('inicioTardioEquipe')?.closest('.stat');
  const recorrenciaLabel = recorrenciaBox?.querySelector('b');
  if (recorrenciaLabel) {
    recorrenciaLabel.childNodes[0].nodeValue = 'Maior Recorrencia Prod. < 7h30';
  }
  setText('menorJornadaEquipe', shortName(menor.equipe || '-'));
  setText('menorJornada', menor.mediaJornada || '--:--');
  setText('maiorJornadaEquipe', shortName(maior.equipe || '-'));
  setText('maiorJornada', maior.mediaJornada || '--:--');
  setText('inicioTardioEquipe', shortName(recorrencia.equipe || '-'));
  setText('inicioTardioHora', fmtInt(recorrencia.incompletas || 0));
  setText('equipesIncomp', fmtInt(data.estatisticas?.equipesComIncompleta));
}

function renderFaixas(data) {
  const faixas = data.faixasJornada || [];
  $('faixaHeader').innerHTML = '<th>FAIXA PRODUTIVA</th>' + faixas.map((f) => `<th>${escapeHtml(f.label)}</th>`).join('');
  $('faixaQtd').innerHTML = '<th>Nº DE EQUIPES</th>' + faixas.map((f) => `<td class="value-edit">${fmtInt(f.quantidade)}</td>`).join('');
  $('faixaPerc').innerHTML = '<th>% DO TOTAL DE EQUIPES</th>' + faixas.map((f) => `<td class="value-edit">${fmtPct(f.percentual, 2)}</td>`).join('');
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

function nomeArquivoPainel() {
  const supervisor = normalizarTexto($('supervisorSelect')?.value || 'supervisor')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'supervisor';
  return `painel-jornada-${supervisor}-${$('dataInicio').value}-${$('dataFim').value}.png`;
}

async function exportarImagemPainel() {
  const panel = $('painelAnalitico');
  const btn = $('btnExportarImagem');
  if (!panel || typeof html2canvas === 'undefined') {
    alert('html2canvas não carregado.');
    return;
  }
  const textoOriginal = btn?.textContent || '';
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Exportando...';
  }
  const estavaEditando = state.editando;
  try {
    await document.fonts?.ready;
    panel.classList.remove('loading', 'editable');
    const canvas = await html2canvas(panel, {
      backgroundColor: '#f7f8f4',
      scale: Math.max(2, window.devicePixelRatio || 1),
      useCORS: true,
      allowTaint: false,
      logging: false
    });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = nomeArquivoPainel();
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    alert(`Não foi possível exportar a imagem: ${error?.message || String(error)}`);
  } finally {
    panel.classList.toggle('editable', estavaEditando);
    if (btn) {
      btn.disabled = false;
      btn.textContent = textoOriginal;
    }
  }
}

async function init() {
  const supervisorUrl = aplicarParametrosUrl();
  $('btnCarregar').addEventListener('click', carregarPainel);
  $('btnEditar').addEventListener('click', () => {
    state.editando = !state.editando;
    aplicarEditavel();
  });
  $('btnExportarImagem')?.addEventListener('click', exportarImagemPainel);
  $('btnImprimir').addEventListener('click', () => window.print());
  $('dataInicio').addEventListener('change', async () => {
    await carregarSupervisores();
    await carregarPainel();
  });
  $('dataFim').addEventListener('change', async () => {
    await carregarSupervisores();
    await carregarPainel();
  });
  $('supervisorSelect').addEventListener('change', carregarPainel);

  await carregarSupervisores();
  const supervisorParam = Array.from($('supervisorSelect').options).find((opt) => opt.value === supervisorUrl);
  const cleydivan = Array.from($('supervisorSelect').options).find((opt) => opt.value.toUpperCase().includes('CLEYDIVAN'));
  if (supervisorParam) $('supervisorSelect').value = supervisorParam.value;
  else if (cleydivan) $('supervisorSelect').value = cleydivan.value;
  await carregarPainel();
}

init().catch((error) => {
  alert(`Não foi possível carregar o painel de jornada: ${error.message}`);
  console.error(error);
});
