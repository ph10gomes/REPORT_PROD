const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

const OUT_DIR = path.join(process.cwd(), 'tmp', 'analitico');
const OUT_SVG = path.join(OUT_DIR, 'painel_analitico_cleydivan_ligacao_abril_2026.svg');
const OUT_JSON = path.join(OUT_DIR, 'painel_analitico_cleydivan_ligacao_abril_2026.json');

const DATA_INICIO = '2026-04-01';
const DATA_FIM_EXCLUSIVO = '2026-05-01';
const SUPERVISOR = 'CLEYDIVAN NASCIMENTO SILVA';

function n(value) {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return 0;
    const normalized = trimmed.includes(',')
      ? trimmed.replace(/\./g, '').replace(',', '.')
      : trimmed;
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function pct(value, digits = 0) {
  return `${n(value).toFixed(digits).replace('.', ',')}%`;
}

function intBr(value) {
  return Math.round(n(value)).toLocaleString('pt-BR');
}

function numBr(value, digits = 2) {
  return n(value).toLocaleString('pt-BR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function dateOnly(value) {
  return String(value || '').slice(0, 10);
}

function timeToMinutes(value) {
  const match = String(value || '').match(/(\d{1,2}):(\d{2})/);
  if (!match) return NaN;
  return Number(match[1]) * 60 + Number(match[2]);
}

function minutesToTime(value) {
  if (!Number.isFinite(value)) return '--:--';
  const total = Math.max(0, Math.round(value));
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

function avg(values) {
  const lista = values.filter(Number.isFinite);
  return lista.length ? lista.reduce((acc, value) => acc + value, 0) / lista.length : NaN;
}

function finalizado(row) {
  return Boolean(row.DATA_TERMINO_REAL);
}

function flagProdutivo(row) {
  const value = String(row.PRODUTIVO || '').trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
  if (['SIM', 'S', 'T', '1', 'TRUE', 'PRODUTIVO'].includes(value)) return 'SIM';
  if (['NAO', 'N', 'F', '0', 'FALSE', 'IMPRODUTIVO', 'IMPEDIMENTO'].includes(value)) return 'NAO';
  return '';
}

function wrap(text, max = 28, maxLines = 2) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

function teamShort(name) {
  return String(name || '').replace(/^BH-MFLG-/i, 'BH-MFLG-');
}

function tipoEquipe(row) {
  const texto = `${row?.TIPO_EQUIPE || ''} ${row?.NOME_EQUIPE || row?.NOME || ''}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
  if (texto.includes('MOTO') || texto.includes('MTVP')) return 'MOTO';
  return 'MULTI';
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

function barIcon(x, y, color = '#123f75') {
  return `
    <rect x="${x}" y="${y + 26}" width="8" height="14" fill="${color}"/>
    <rect x="${x + 12}" y="${y + 18}" width="8" height="22" fill="${color}"/>
    <rect x="${x + 24}" y="${y + 10}" width="8" height="30" fill="${color}"/>
    <rect x="${x + 36}" y="${y}" width="8" height="40" fill="${color}"/>
  `;
}

function pieIcon(x, y, color = '#123f75') {
  return `
    <circle cx="${x + 22}" cy="${y + 22}" r="22" fill="${color}"/>
    <path d="M${x + 22} ${y + 22} L${x + 22} ${y} A22 22 0 0 1 ${x + 44} ${y + 22} Z" fill="#e8eef7"/>
    <path d="M${x + 22} ${y + 22} L${x + 44} ${y + 22} A22 22 0 0 1 ${x + 32} ${y + 40} Z" fill="#83b7d0"/>
  `;
}

function metricRow(y, icon, label, value, color = '#0d3570') {
  return `
    ${icon}
    <text x="98" y="${y + 20}" class="label">${esc(label)}</text>
    <text x="315" y="${y + 24}" text-anchor="end" class="metric" fill="${color}">${esc(value)}</text>
    <line x1="30" y1="${y + 47}" x2="315" y2="${y + 47}" stroke="#e1e7f0"/>
  `;
}

function makeSvg(data) {
  const topRows = data.topEquipes.map((item, index) => {
    const y = 292 + index * 40;
    const colors = ['#c91522', '#e87911', '#f5b700', '#0d8657', '#08835f'];
    const lines = wrap(item.equipe, 32, 2);
    return `
      <circle cx="375" cy="${y + 14}" r="13" fill="${colors[index]}"/>
      <text x="375" y="${y + 19}" text-anchor="middle" fill="#fff" font-weight="800" font-size="13">${index + 1}</text>
      <text x="405" y="${y + 8}" class="tableText">${esc(lines[0] || '')}</text>
      <text x="405" y="${y + 24}" class="tableText">${esc(lines[1] || '')}</text>
      <text x="625" y="${y + 18}" text-anchor="middle" class="tableText">${intBr(item.total)}</text>
      <text x="724" y="${y + 18}" text-anchor="middle" class="tableText">${pct(item.perc, 2)}</text>
      <text x="810" y="${y + 18}" text-anchor="middle" class="tableText">${pct(item.acum, 2)}</text>
      <line x1="350" y1="${y + 38}" x2="850" y2="${y + 38}" stroke="#dfe5ec"/>
    `;
  }).join('');

  const faixaRows = data.faixas.map((f, index) => {
    const x = 200 + index * 92;
    return `
      <rect x="${x}" y="573" width="92" height="30" fill="${f.bg}"/>
      <text x="${x + 46}" y="592" text-anchor="middle" class="smallHead" fill="${f.color}">${esc(f.label)}</text>
      <text x="${x + 46}" y="624" text-anchor="middle" class="tableText">${intBr(f.qtd)}</text>
      <text x="${x + 46}" y="655" text-anchor="middle" class="tableText">${pct(f.perc, 2)}</text>
    `;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs>
    <style>
      .title{font:800 34px Arial, sans-serif;fill:#1c4971;letter-spacing:.5px}
      .name{font:800 20px Arial, sans-serif;fill:#1c4971}
      .cardTitle{font:800 18px Arial, sans-serif;fill:#fff}
      .cardText{font:600 13px Arial, sans-serif;fill:#fff}
      .cardNum{font:800 22px Arial, sans-serif;fill:#fff}
      .sectionTitle{font:800 14px Arial, sans-serif;fill:#fff}
      .label{font:700 14px Arial, sans-serif;fill:#111}
      .metric{font:800 24px Arial, sans-serif}
      .tableHead{font:800 11px Arial, sans-serif;fill:#153566}
      .smallHead{font:800 12px Arial, sans-serif}
      .tableText{font:800 12px Arial, sans-serif;fill:#1b1f2a}
      .note{font:700 12px Arial, sans-serif;fill:#111}
      .muted{font:600 11px Arial, sans-serif;fill:#1d3552}
    </style>
  </defs>
  <rect width="1280" height="720" fill="#f7f8f4"/>
  <rect x="0" y="0" width="1280" height="214" fill="#fbfcf9"/>

  <circle cx="62" cy="36" r="28" fill="#1d4970"/>
  <circle cx="62" cy="27" r="9" fill="#f5c7a2"/>
  <path d="M42 58c5-17 35-17 40 0z" fill="#0b315d"/>
  <text x="92" y="43" class="name">CLEYDIVAN NASCIMENTO</text>
  <text x="640" y="49" text-anchor="middle" class="title">PROCESSO - LIGAÇÃO</text>
  <text x="1138" y="42" font-family="Arial" font-weight="900" font-size="38" fill="#0a3974">NCSR</text>
  <text x="1143" y="61" font-family="Arial" font-weight="700" font-size="12" fill="#0a3974" letter-spacing="6">ENERGIA</text>
  <line x1="1263" y1="14" x2="1263" y2="58" stroke="#16804e" stroke-width="3"/>

  <rect x="50" y="74" width="238" height="138" rx="20" fill="#143f7e"/>
  <text x="169" y="98" text-anchor="middle" class="cardTitle">PERFORMANCE</text>
  <text x="169" y="120" text-anchor="middle" class="cardText">RESULTADO: <tspan font-weight="900">${pct(data.performanceGeral, 0)}</tspan></text>
  <text x="169" y="140" text-anchor="middle" class="cardText">MOTO: <tspan font-weight="900">${pct(data.performanceMoto, 0)}</tspan></text>
  <text x="169" y="160" text-anchor="middle" class="cardText">MULTI: <tspan font-weight="900">${pct(data.performanceMulti, 0)}</tspan></text>

  <rect x="350" y="70" width="238" height="138" rx="20" fill="#143f7e"/>
  <text x="469" y="94" text-anchor="middle" class="cardTitle">PERFORMANCE</text>
  <text x="393" y="128" class="cardText">TOTAL DE EQUIPES:</text><text x="548" y="129" text-anchor="middle" class="cardNum">${intBr(data.totalEquipes)}</text>
  <text x="443" y="160" text-anchor="middle" font-family="Arial" font-size="21" fill="#fff">EQUIPES</text>
  <text x="499" y="160" text-anchor="middle" font-family="Arial" font-size="22" font-weight="900" fill="#f01828">D:</text>
  <text x="536" y="160" text-anchor="middle" class="cardNum">${intBr(data.equipesD)}</text>

  <rect x="648" y="74" width="262" height="136" rx="20" fill="#05664d"/>
  <text x="779" y="97" text-anchor="middle" class="cardTitle">JORNADA PRODUTIVA</text>
  <text x="703" y="122" class="cardText">MED. 1º ATEND.:</text><text x="835" y="122" class="cardNum" font-size="18">${esc(data.mediaPrimeiro)}</text>
  <text x="698" y="148" class="cardText">MED ULT. ATEND.:</text><text x="840" y="148" class="cardNum" font-size="18">${esc(data.mediaUltimo)}</text>
  <text x="707" y="173" class="cardText">MED JORN PROD.:</text><text x="840" y="173" class="cardNum" font-size="18">${esc(data.mediaJornada)}</text>
  <text x="677" y="198" class="cardText">JORN. PROD. INCOMP.:</text><text x="846" y="198" class="cardNum" font-size="18">${pct(data.percJornadaIncomp, 2)}</text>

  <rect x="956" y="72" width="260" height="139" rx="20" fill="#15596b"/>
  <text x="1086" y="95" text-anchor="middle" class="cardTitle">EFICIÊNCIA</text>
  <text x="1004" y="120" class="cardText">MÉDIA SERV./DIA:</text><text x="1182" y="121" text-anchor="end" class="cardNum" font-size="18">${numBr(data.mediaServEquipeDia, 1)}</text>
  <text x="1004" y="147" class="cardText">% IMPROD.:</text><text x="1182" y="147" text-anchor="end" class="cardNum" font-size="18">${pct(data.indiceImpedimento, 2)}</text>
  <text x="1004" y="172" class="cardText">IMP. MOTO:</text><text x="1182" y="172" text-anchor="end" class="cardNum" font-size="18">${pct(data.impMoto, 2)}</text>
  <text x="1004" y="197" class="cardText">IMP. MULTI:</text><text x="1182" y="197" text-anchor="end" class="cardNum" font-size="18">${pct(data.impMulti, 2)}</text>

  <rect x="20" y="242" width="312" height="296" rx="7" fill="#fff" stroke="#dfe4ea"/>
  <rect x="20" y="242" width="312" height="24" rx="6" fill="#073875"/>
  <text x="176" y="260" text-anchor="middle" class="sectionTitle">DESEMPENHO GERAL</text>
  ${metricRow(292, '<g transform="translate(39 294)"><circle cx="9" cy="9" r="7" fill="#123f75"/><circle cx="26" cy="7" r="8" fill="#123f75"/><circle cx="43" cy="9" r="7" fill="#123f75"/><path d="M0 42c2-18 50-18 52 0z" fill="#123f75"/></g>', 'Total de Equipes', intBr(data.totalEquipes))}
  ${metricRow(354, '<g transform="translate(43 350)"><rect x="0" y="0" width="34" height="39" rx="4" fill="none" stroke="#123f75" stroke-width="4"/><line x1="8" y1="13" x2="26" y2="13" stroke="#123f75" stroke-width="3"/><line x1="8" y1="24" x2="26" y2="24" stroke="#123f75" stroke-width="3"/></g>', 'Total de Serviços', intBr(data.totalServicos))}
  ${metricRow(415, `<g>${barIcon(42, 415)}</g>`, 'Média Mensal Serv.', intBr(data.mediaMensalServicos))}
  ${metricRow(476, '<g transform="translate(39 473)"><circle cx="22" cy="22" r="18" fill="none" stroke="#123f75" stroke-width="5"/><line x1="10" y1="34" x2="34" y2="10" stroke="#123f75" stroke-width="5"/><circle cx="14" cy="15" r="4" fill="#123f75"/><circle cx="30" cy="30" r="4" fill="#123f75"/></g>', 'Índice Médio Imped.', pct(data.indiceImpedimento, 0), '#c91522')}

  <rect x="345" y="242" width="505" height="296" rx="7" fill="#fff" stroke="#dfe4ea"/>
  <rect x="345" y="242" width="505" height="24" rx="6" fill="#08714c"/>
  <text x="598" y="260" text-anchor="middle" class="sectionTitle">TOP 5 EQUIPES - MAIOR VOLUME DE SERVIÇOS</text>
  <text x="374" y="284" text-anchor="middle" class="tableHead">POS.</text>
  <text x="488" y="284" text-anchor="middle" class="tableHead">EQUIPE</text>
  <text x="625" y="284" text-anchor="middle" class="tableHead">TOTAL DE SERV.</text>
  <text x="724" y="284" text-anchor="middle" class="tableHead">%</text>
  <text x="810" y="284" text-anchor="middle" class="tableHead">% ACUMULADO</text>
  ${topRows}
  <rect x="345" y="516" width="505" height="22" fill="#073875"/>
  <text x="405" y="532" class="sectionTitle" font-size="12">TOTAL GERAL</text>
  <text x="625" y="532" text-anchor="middle" class="sectionTitle" font-size="12">${intBr(data.totalServicos)}</text>
  <text x="724" y="532" text-anchor="middle" class="sectionTitle" font-size="12">100%</text>
  <text x="810" y="532" text-anchor="middle" class="sectionTitle" font-size="12">-</text>

  <rect x="864" y="242" width="400" height="296" rx="7" fill="#fff" stroke="#dfe4ea"/>
  <rect x="864" y="242" width="400" height="24" rx="6" fill="#c98b00"/>
  <text x="1064" y="260" text-anchor="middle" class="sectionTitle">ESTATÍSTICAS DE IMPEDIMENTO</text>
  <text x="948" y="306" class="label">Índice Médio de Impedimento</text>
  <text x="1220" y="309" text-anchor="end" class="metric" fill="#c91522">${pct(data.indiceImpedimento, 0)}</text>
  <path d="M910 284 l19 34 h-38 z" fill="#e0a320"/><text x="910" y="311" text-anchor="middle" font-size="30" fill="#fff" font-weight="900">!</text>
  <line x1="875" y1="329" x2="1253" y2="329" stroke="#e1e3e8"/>
  ${barIcon(891, 348, '#d8a100')}
  <text x="948" y="363" class="label">Equipe com Maior Impedimento</text>
  <text x="948" y="383" class="tableText">${esc(wrap(data.maiorImpEquipe, 37, 1)[0] || '-')}</text>
  <text x="948" y="400" class="tableText">${esc(wrap(data.maiorImpEquipe, 37, 2)[1] || '')}</text>
  <text x="1220" y="368" text-anchor="end" class="metric" fill="#c91522">${pct(data.maiorImp, 0)}</text>
  <line x1="875" y1="412" x2="1253" y2="412" stroke="#e1e3e8"/>
  ${barIcon(891, 431, '#147b85')}
  <text x="948" y="446" class="label">Equipe com Menor Impedimento</text>
  <text x="948" y="466" class="tableText">${esc(wrap(data.menorImpEquipe, 37, 1)[0] || '-')}</text>
  <text x="948" y="483" class="tableText">${esc(wrap(data.menorImpEquipe, 37, 2)[1] || '')}</text>
  <text x="1220" y="451" text-anchor="end" class="metric" fill="#08835f">${pct(data.menorImp, 0)}</text>
  <line x1="875" y1="494" x2="1253" y2="494" stroke="#e1e3e8"/>
  ${pieIcon(888, 500)}
  <text x="948" y="520" class="label">Equipes com Impedimento</text>
  <text x="948" y="539" class="label">Acima de 30%</text>
  <text x="948" y="557" class="tableText">(${pct(data.equipesAcima30Perc, 0)} do total de equipes)</text>
  <text x="1220" y="540" text-anchor="end" class="metric" fill="#c91522">${intBr(data.equipesAcima30)}</text>

  <rect x="20" y="548" width="730" height="115" rx="6" fill="#fff" stroke="#dfe4ea"/>
  <rect x="20" y="548" width="730" height="25" rx="6" fill="#eef3fb"/>
  <text x="385" y="565" text-anchor="middle" class="smallHead" fill="#153566">DISTRIBUIÇÃO DO ÍNDICE DE IMPEDIMENTO</text>
  <rect x="20" y="573" width="180" height="90" fill="#f5f7fb"/>
  <text x="110" y="592" text-anchor="middle" class="smallHead" fill="#153566">FAIXA DE IMPEDIMENTO</text>
  <text x="110" y="624" text-anchor="middle" class="smallHead" fill="#153566">Nº DE EQUIPES</text>
  <text x="110" y="655" text-anchor="middle" class="smallHead" fill="#153566">% DO TOTAL DE EQUIPES</text>
  ${faixaRows}
  <line x1="20" y1="603" x2="750" y2="603" stroke="#dfe4ea"/>
  <line x1="20" y1="633" x2="750" y2="633" stroke="#dfe4ea"/>

  <rect x="762" y="548" width="502" height="115" rx="6" fill="#fff" stroke="#dfe4ea"/>
  <rect x="762" y="548" width="502" height="25" rx="6" fill="#eef3fb"/>
  <text x="1013" y="565" text-anchor="middle" class="smallHead" fill="#153566">PRINCIPAIS DESTAQUES</text>
  <circle cx="783" cy="586" r="8" fill="#08835f"/><text x="783" y="590" text-anchor="middle" fill="#fff" font-size="11" font-weight="900">✓</text>
  <text x="803" y="590" class="note">As 5 primeiras equipes concentram ${pct(data.top5Perc, 2)} do total de serviços realizados.</text>
  <circle cx="783" cy="612" r="8" fill="#08835f"/><text x="783" y="616" text-anchor="middle" fill="#fff" font-size="11" font-weight="900">✓</text>
  <text x="803" y="616" class="note">${intBr(data.equipesAcima30)} equipes possuem índice de impedimento acima de 30%.</text>
  <circle cx="783" cy="638" r="8" fill="#08835f"/><text x="783" y="642" text-anchor="middle" fill="#fff" font-size="11" font-weight="900">✓</text>
  <text x="803" y="642" class="note">O índice médio de impedimento é de ${pct(data.indiceImpedimento, 0)}, indicando oportunidades de melhoria.</text>

  <rect x="20" y="673" width="1244" height="35" rx="6" fill="#edf3fb"/>
  <circle cx="58" cy="691" r="13" fill="none" stroke="#123f75" stroke-width="4"/>
  <circle cx="58" cy="691" r="5" fill="#123f75"/>
  <text x="101" y="696" font-family="Arial" font-size="17" font-weight="900" fill="#123f75">FOCO:</text>
  <text x="180" y="696" class="muted">Maximizar as horas produtivas, reduzindo impactos e perdas para alcançar melhores resultados com eficiência e disciplina operacional.</text>
  <text x="22" y="725" class="muted">Fonte: Banco MySQL report_csc_hoje / controle_servico</text>
  <text x="275" y="725" class="muted">|</text>
  <text x="300" y="725" class="muted">Dados consolidados de 01/04/2026 a 30/04/2026</text>
</svg>`;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    dateStrings: true
  });

  const reportWhere = `
    STR_TO_DATE(DATA, '%d/%m/%Y') >= ?
    AND STR_TO_DATE(DATA, '%d/%m/%Y') < ?
    AND UPPER(NOME_SUPERVISOR) = ?
  `;

  const [reportRows] = await pool.query(`
    SELECT r.*
    FROM report_csc_hoje r
    JOIN (
      SELECT MAX(id) id
      FROM report_csc_hoje
      WHERE ${reportWhere}
      GROUP BY DATA, COD_EQUIPE
    ) ult ON ult.id = r.id
    ORDER BY STR_TO_DATE(r.DATA, '%d/%m/%Y'), r.NOME_EQUIPE
  `, [DATA_INICIO, DATA_FIM_EXCLUSIVO, SUPERVISOR]);

  const codes = [...new Set(reportRows.map((row) => String(row.COD_EQUIPE || '').trim()).filter(Boolean))];
  if (!codes.length) throw new Error('Nenhuma equipe encontrada para os filtros informados.');

  const placeholders = codes.map(() => '?').join(',');
  const [controleRows] = await pool.query(`
    SELECT *
    FROM controle_servico
    WHERE COD_EQUIPE_WM IN (${placeholders})
      AND DATE(DATA_DESIGNACAO) >= ?
      AND DATE(DATA_DESIGNACAO) < ?
  `, [...codes, DATA_INICIO, DATA_FIM_EXCLUSIVO]);

  const databaseLote = process.env.MYSQL_DATABASE_LOTE_PROD || 'producao';
  const viewLote = process.env.MYSQL_VIEW_LOTE_PROD || 'nivel_1_meta';
  const [loteRows] = await pool.query(`
    SELECT
      DATA,
      TRIM(CAST(COD_EQUIPE AS CHAR)) AS COD_EQUIPE,
      VALOR_US,
      META,
      FAIXA_DIA
    FROM \`${databaseLote}\`.\`${viewLote}\`
    WHERE DATA IS NOT NULL
      AND DATA >= ?
      AND DATA < ?
      AND TRIM(CAST(COD_EQUIPE AS CHAR)) IN (${placeholders})
  `, [DATA_INICIO, DATA_FIM_EXCLUSIVO, ...codes]);

  await pool.end();

  const byTeamReport = new Map();
  reportRows.forEach((row) => {
    const codigo = String(row.COD_EQUIPE || '').trim();
    if (!byTeamReport.has(codigo)) byTeamReport.set(codigo, []);
    byTeamReport.get(codigo).push(row);
  });

  const byTeamServices = new Map();
  controleRows.forEach((row) => {
    const codigo = String(row.COD_EQUIPE_WM || '').trim();
    if (!byTeamServices.has(codigo)) byTeamServices.set(codigo, []);
    byTeamServices.get(codigo).push(row);
  });

  const tipoPorCodigo = new Map();
  reportRows.forEach((row) => {
    const codigo = String(row.COD_EQUIPE || '').trim();
    if (codigo && !tipoPorCodigo.has(codigo)) tipoPorCodigo.set(codigo, tipoEquipe(row));
  });

  const totalMetaLote = loteRows.reduce((acc, row) => acc + n(row.META), 0);
  const totalExecLote = loteRows.reduce((acc, row) => acc + n(row.VALOR_US), 0);
  const performanceGeral = totalMetaLote > 0 ? (totalExecLote / totalMetaLote) * 100 : 0;
  const performanceTipo = (tipo) => {
    const rows = loteRows.filter((row) => tipoPorCodigo.get(String(row.COD_EQUIPE || '').trim()) === tipo);
    const meta = rows.reduce((acc, row) => acc + n(row.META), 0);
    const prod = rows.reduce((acc, row) => acc + n(row.VALOR_US), 0);
    return meta > 0 ? (prod / meta) * 100 : 0;
  };
  const lotePorEquipe = new Map();
  loteRows.forEach((row) => {
    const codigo = String(row.COD_EQUIPE || '').trim();
    if (!codigo) return;
    const atual = lotePorEquipe.get(codigo) || { meta: 0, prod: 0 };
    atual.meta += n(row.META);
    atual.prod += n(row.VALOR_US);
    lotePorEquipe.set(codigo, atual);
  });
  const equipesD = Array.from(lotePorEquipe.values()).filter((item) => {
    const percentual = item.meta > 0 ? (item.prod / item.meta) * 100 : 0;
    return classificarPerformance(percentual) === 'D';
  }).length;

  const firstTimes = reportRows.map((row) => timeToMinutes(row.PRIMEIRO_ATENDIMENTO));
  const lastTimes = reportRows.map((row) => timeToMinutes(row.ULTIMO_ATENDIMENTO));
  const jornadaTimes = reportRows.map((row) => {
    const first = timeToMinutes(row.PRIMEIRO_ATENDIMENTO);
    const last = timeToMinutes(row.ULTIMO_ATENDIMENTO);
    return Number.isFinite(first) && Number.isFinite(last) && last >= first ? last - first : NaN;
  });
  const jornadaIncomp = jornadaTimes.filter((min) => Number.isFinite(min) && min < 7 * 60).length;
  const jornadaValidas = jornadaTimes.filter(Number.isFinite).length;

  const executados = controleRows.filter((row) => finalizado(row) && ['SIM', 'NAO'].includes(flagProdutivo(row)));
  const improdutivos = executados.filter((row) => flagProdutivo(row) === 'NAO');
  const indiceImpedimento = executados.length ? (improdutivos.length / executados.length) * 100 : 0;
  const flagsControle = [...new Set(controleRows.map((row) => String(row.PRODUTIVO || '').trim()).filter(Boolean))].sort();
  const indiceImpTipo = (tipo) => {
    const rows = executados.filter((row) => tipoPorCodigo.get(String(row.COD_EQUIPE_WM || '').trim()) === tipo);
    const imp = rows.filter((row) => flagProdutivo(row) === 'NAO').length;
    return rows.length ? (imp / rows.length) * 100 : 0;
  };

  const teamStats = codes.map((codigo) => {
    const report = byTeamReport.get(codigo) || [];
    const services = byTeamServices.get(codigo) || [];
    const exec = services.filter((row) => finalizado(row) && ['SIM', 'NAO'].includes(flagProdutivo(row)));
    const imp = exec.filter((row) => flagProdutivo(row) === 'NAO');
    const meta = report.reduce((acc, row) => acc + n(row.META), 0);
    const prod = report.reduce((acc, row) => acc + n(row.US_EXEC), 0);
    const first = report[0] || {};
    return {
      codigo,
      equipe: first.NOME_EQUIPE || services[0]?.NOME || codigo,
      tipo: tipoEquipe(first),
      total: services.length,
      executados: exec.length,
      improdutivos: imp.length,
      impedimento: exec.length ? (imp.length / exec.length) * 100 : 0,
      performance: meta > 0 ? (prod / meta) * 100 : 0,
      dias: new Set(report.map((row) => dateOnly(row.DATA))).size
    };
  });

  const totalServicos = controleRows.length;
  const totalEquipes = codes.length;
  const totalDiasEquipe = teamStats.reduce((acc, item) => acc + item.dias, 0);
  const mediaServEquipeDia = totalDiasEquipe ? totalServicos / totalDiasEquipe : 0;
  const mediaMensalServicos = totalEquipes ? totalServicos / totalEquipes : 0;
  const topEquipes = teamStats
    .slice()
    .sort((a, b) => b.total - a.total || a.equipe.localeCompare(b.equipe, 'pt-BR'))
    .slice(0, 5)
    .map((item, index, arr) => {
      const percItem = totalServicos ? (item.total / totalServicos) * 100 : 0;
      const acum = arr.slice(0, index + 1).reduce((acc, row) => acc + (totalServicos ? (row.total / totalServicos) * 100 : 0), 0);
      return { ...item, perc: percItem, acum };
    });

  const sortedByImp = teamStats.filter((item) => item.executados > 0).sort((a, b) => b.impedimento - a.impedimento);
  const maiorImp = sortedByImp[0] || {};
  const menorImp = sortedByImp.slice().reverse()[0] || {};
  const equipesAcima30 = teamStats.filter((item) => item.impedimento > 30).length;

  const ranges = [
    { label: '≥ 50%', min: 50, max: Infinity, bg: '#f8e4e1', color: '#bf202b' },
    { label: '40% a 49%', min: 40, max: 50, bg: '#f9eee0', color: '#ba6d00' },
    { label: '30% a 39%', min: 30, max: 40, bg: '#fbf3dc', color: '#b78a00' },
    { label: '20% a 29%', min: 20, max: 30, bg: '#e4f2e8', color: '#08714c' },
    { label: '10% a 19%', min: 10, max: 20, bg: '#e6f3e5', color: '#08714c' },
    { label: '< 10%', min: -Infinity, max: 10, bg: '#e0f0e7', color: '#08714c' }
  ];
  const faixas = ranges.map((range) => {
    const qtd = teamStats.filter((item) => item.impedimento >= range.min && item.impedimento < range.max).length;
    return { ...range, qtd, perc: totalEquipes ? (qtd / totalEquipes) * 100 : 0 };
  });

  const data = {
    supervisor: SUPERVISOR,
    processo: 'Ligação',
    periodo: 'Abril/2026',
    codigos: codes,
    totalEquipes,
    equipesD,
    totalServicos,
    mediaMensalServicos,
    mediaServEquipeDia,
    performanceGeral,
    performanceMoto: performanceTipo('MOTO'),
    performanceMulti: performanceTipo('MULTI'),
    mediaPrimeiro: minutesToTime(avg(firstTimes)),
    mediaUltimo: minutesToTime(avg(lastTimes)),
    mediaJornada: minutesToTime(avg(jornadaTimes)),
    percJornadaIncomp: jornadaValidas ? (jornadaIncomp / jornadaValidas) * 100 : 0,
    indiceImpedimento,
    impMoto: indiceImpTipo('MOTO'),
    impMulti: indiceImpTipo('MULTI'),
    topEquipes,
    top5Perc: topEquipes.reduce((acc, item) => acc + item.perc, 0),
    maiorImp: maiorImp.impedimento || 0,
    maiorImpEquipe: teamShort(maiorImp.equipe || '-'),
    menorImp: menorImp.impedimento || 0,
    menorImpEquipe: teamShort(menorImp.equipe || '-'),
    equipesAcima30,
    equipesAcima30Perc: totalEquipes ? (equipesAcima30 / totalEquipes) * 100 : 0,
    faixas,
    flagsControle,
    controleExecutados: executados.length,
    controleImprodutivos: improdutivos.length,
    reportRows: reportRows.length,
    teamStats
  };

  fs.writeFileSync(OUT_JSON, JSON.stringify(data, null, 2), 'utf8');
  fs.writeFileSync(OUT_SVG, makeSvg(data), 'utf8');

  console.log(JSON.stringify({
    outSvg: OUT_SVG,
    outJson: OUT_JSON,
    totalEquipes: data.totalEquipes,
    totalServicos: data.totalServicos,
    indiceImpedimento: data.indiceImpedimento,
    performanceGeral: data.performanceGeral,
    top5Perc: data.top5Perc
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
