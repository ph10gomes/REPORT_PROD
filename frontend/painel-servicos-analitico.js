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
    const payload = await fetchJson(`/api/painel-servicos-analitico?${params}`);
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
  setText('supervisorNome', data.supervisor || 'SUPERVISOR');
  setText('processoTitulo', 'PROCESSO - SERVIÇOS');
  setText('totalServicos', fmtInt(data.totalServicos));
  setText('totalExecutados', fmtInt(data.totalExecutados));
  setText('totalProdutivos', fmtInt(data.totalProdutivos));
  setText('totalImprodutivos', fmtPct(data.improdutividadeGeral, 1));
  setText('produtividadeGeral', fmtPct(data.produtividadeGeral, 1));
  setText('mediaServDia', fmtNum(data.mediaServDia, 1));
  setText('totalTipos', fmtInt(data.totalTipos));
  setText('tipoMaisFrequente', data.tipoMaisFrequente || '-');
  setText('tipoMaisImprodutivo', data.tipoMaisImprodutivo || '-');
  setText('totalEquipes', fmtInt(data.totalEquipes));
  setText('maiorEquipe', data.topEquipes?.[0]?.equipe || '-');
  setText('maiorEquipeServicos', fmtInt(data.topEquipes?.[0]?.totalServicos || 0));
  setText('topEquipesTotal', fmtInt(data.totalEquipes));
  setText('tiposTotalServicos', fmtInt(data.totalServicos));
  setText('fonteTexto', `Fonte: Banco MySQL | Dados consolidados de ${labelPeriodo(data.periodo?.dataInicio, data.periodo?.dataFim)}`);
  renderTopTipos(data);
  renderTopEquipes(data);
  renderDistribuicao(data);
  renderVozes(data);
  aplicarEditavel();
}

function fmtNum(value, digits = 1) {
  return Number(value || 0).toLocaleString('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
}

function renderTopTipos(data) {
  const header = document.querySelector('.servicos-panel .top5 thead tr');
  if (header) header.innerHTML = '<th>POS.</th><th>Tipo</th><th>Serviços</th><th>%</th><th>Improdutividade</th>';
  const rows = [...(data.topTipos || [])]
    .sort((a, b) => Number(b.totalServicos || 0) - Number(a.totalServicos || 0));
  $('topTiposBody').innerHTML = rows.map((item, index) => `
    <tr>
      <td><span class="rank r${index + 1}">${index + 1}</span></td>
      <td class="value-edit">${escapeHtml(item.tipo)}</td>
      <td class="value-edit">${fmtInt(item.totalServicos)}</td>
      <td class="value-edit">${fmtPct(item.percentual, 1)}</td>
      <td class="value-edit">${fmtPct(item.improdutividade, 1)}</td>
    </tr>
  `).join('');
}

function renderTopEquipes(data) {
  const header = document.querySelector('.servicos-panel .stats thead tr');
  if (header) header.innerHTML = '<th>POS.</th><th>Equipe</th><th>Servicos</th><th>Executados</th><th>% Improd.</th>';
  const rows = data.topEquipes || [];
  $('topEquipesBody').innerHTML = rows.map((item, index) => `
    <tr>
      <td><span class="rank r${index + 1}">${index + 1}</span></td>
      <td class="value-edit">${escapeHtml(item.equipe)}</td>
      <td class="value-edit">${fmtInt(item.totalServicos)}</td>
      <td class="value-edit">${fmtInt(item.executados)}</td>
      <td class="value-edit">${fmtPct(item.percImprodutivo, 1)}</td>
    </tr>
  `).join('');
}

function renderDistribuicao(data) {
  const titulo = document.querySelector('.servicos-panel .dist h3');
  const header = document.querySelector('.servicos-panel .dist thead tr');
  if (titulo) titulo.textContent = 'DISTRIBUICAO POR IMPRODUTIVOS';
  if (header) header.innerHTML = '<th>TIPO</th><th>SERVICOS</th><th>IMPROD.</th><th>% IMPROD.</th>';
  const rows = [...(data.tipos || [])]
    .filter((item) => Number(item.improdutivos || 0) > 0)
    .sort((a, b) => Number(b.improdutivos || 0) - Number(a.improdutivos || 0) || Number(b.improdutividade || 0) - Number(a.improdutividade || 0));
  const limite = 18;
  const principais = rows.slice(0, limite);
  const restantes = rows.slice(limite);
  const outros = restantes.length ? [{
    tipo: `OUTROS ${restantes.length} TIPOS`,
    totalServicos: restantes.reduce((acc, item) => acc + Number(item.totalServicos || 0), 0),
    improdutivos: restantes.reduce((acc, item) => acc + Number(item.improdutivos || 0), 0),
    improdutividade: mediaPonderada(restantes, 'improdutividade', 'executados')
  }] : [];
  const exibidos = [...principais, ...outros];
  $('tipoDistribuicaoBody').innerHTML = exibidos.map((item) => `
    <tr>
      <td class="value-edit">${escapeHtml(item.tipo)}</td>
      <td class="value-edit">${fmtInt(item.totalServicos)}</td>
      <td class="value-edit">${fmtInt(item.improdutivos)}</td>
      <td class="value-edit">
        <span class="pct-cell improd"><span style="width:${Math.max(2, Math.min(100, Number(item.improdutividade || 0)))}%"></span></span>
        <b>${fmtPct(item.improdutividade, 1)}</b>
      </td>
    </tr>
  `).join('');
}

function mediaPonderada(rows, valueKey, weightKey) {
  const totalPeso = rows.reduce((acc, item) => acc + Number(item[weightKey] || 0), 0);
  if (!totalPeso) return 0;
  return rows.reduce((acc, item) => acc + (Number(item[valueKey] || 0) * Number(item[weightKey] || 0)), 0) / totalPeso;
}

function renderVozes(data) {
  const titulo = document.querySelector('.servicos-panel .notes h3');
  if (titulo) titulo.textContent = 'IMPRODUTIVOS';
  const tipo = data.topTiposImprodutivos?.[0];
  const equipe = data.topEquipesImprodutivas?.[0];
  setText('vozTipoFrequente', tipo
    ? `${tipo.tipo} concentra ${fmtInt(tipo.improdutivos)} improdutivos (${fmtPct(tipo.participacaoImprodutivos, 1)} dos improdutivos).`
    : 'Nenhum improdutivo registrado no periodo.');
  setText('vozProdutividade', equipe
    ? `${equipe.equipe} lidera em improdutivos com ${fmtInt(equipe.improdutivos)} casos (${fmtPct(equipe.percImprodutivo, 1)} dos executados da equipe).`
    : 'Nenhuma equipe com improdutivos registrados.');
  setText('vozEquipeMaior', Number(data.totalExecutados || 0)
    ? `A improdutividade geral e ${fmtPct(data.improdutividadeGeral, 1)}: ${fmtInt(data.totalImprodutivos)} improdutivos em ${fmtInt(data.totalExecutados)} executados.`
    : 'Sem servicos executados para calcular improdutividade.');
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
  const supervisor = String($('supervisorSelect')?.value || 'supervisor')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'supervisor';
  return `painel-servicos-${supervisor}-${$('dataInicio').value}-${$('dataFim').value}.png`;
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
  alert(`Não foi possível carregar o painel de serviços: ${error.message}`);
  console.error(error);
});
