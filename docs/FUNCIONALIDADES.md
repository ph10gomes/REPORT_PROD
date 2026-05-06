# REPORT_PROD_MYSQL — Funcionalidades

Data: 2026-04-07

Este documento descreve as funcionalidades do sistema **REPORT_PROD_MYSQL** (Painel Produção) e como elas se organizam no frontend e no backend.

## 1) Visão geral

- O sistema é composto por:
  - **Frontend** estático (HTML/CSS/JS) com o painel e seus modais.
  - **Backend/API** em Node.js (Express) que lê uma tabela existente no **MySQL** e entrega os dados para o frontend via `fetch()`.
- O navegador **não** conecta direto no MySQL; sempre passa pelo backend.

## 2) Arquitetura e componentes

### Frontend

- Arquivos principais:
  - `index.html` (tela do painel)
  - `style.css` (estilos)
  - `script.js` (toda a lógica do painel)
- Bibliotecas usadas no browser:
  - `xlsx` (fallback de leitura do arquivo `.xlsm` quando a API não estiver disponível)
  - `html2canvas` (exportação do relatório/modais como imagem)

### Backend (API)

- Arquivo principal: `server/index.js`
- Conexão MySQL: `server/mysql.js`
- Mapper de compatibilidade (quando `MYSQL_TABLE=report_csc_hoje`): `server/mappers/report_csc_hoje.js`
  - Normaliza os nomes de colunas para os nomes esperados pelo frontend (ex.: `Meta Prog.`, `Produção`, `Cód.UO`, `Cód. Equipe`, etc.)

## 3) Modos do painel (navegação)

No menu lateral (drawer), o sistema oferece:

- **Tabela Diária (Hoje)**: visão do dia selecionado.
- **Tabela Semanal (Período)**: visão agregada por semana.
- **Tabela Mensal (Consolidado)**: visão agregada por mês.
- **1ª Quinzena** e **2ª Quinzena**: recortes do mês.
- **Painel Report NEC**: painel externo via `iframe`.
- **Report Jornada**: painel externo via `iframe` (altura ajustada automaticamente por mensagem `postMessage`).

## 4) Filtros e seleção de visualização

- **UO**: seleciona a unidade operacional (ou “Todas”).
- **Período** (varia conforme o modo):
  - **Data** (diário)
  - **Semana** (semanal)
  - **Mês** (mensal/quinzenas)
- **Visualizar**:
  - **Supervisor**
  - **Líder de Posto**
  - **Controlador**

## 5) Relatório principal (tabela + KPIs)

### KPIs principais

O topo do painel exibe indicadores (dependendo do modo/recorte):

- **Faixa** (AA/A/B/C/D) e percentual
- **Meta**, **Produção** e **Saldo**
- Contagem de equipes por faixa (**EQ AA/A/B/C/D**)
- Indicadores auxiliares do modal (ex.: jornada completa/incompleta, sem atendimento, improdutividade) quando aplicável

### Tabela por faixas horárias (09/11/13/15/17)

- O painel trabalha com snapshots em faixas fixas:
  - `09`, `11`, `13`, `15`, `17`
- As linhas são agrupadas conforme o “Visualizar” (Supervisor/Líder/Controlador) e apresentam:
  - Meta e Produção
  - Faixa por hora
  - Total de equipes e distribuição por faixa (AA/A/B/C/D)

## 6) Modal de equipes (detalhamento)

Ao clicar em uma linha/célula do relatório, abre o **modal de equipes**, com:

- Lista de equipes daquele agrupamento (Supervisor/Líder/Controlador).
- Produção “do dia” calculada até a **hora clicada** (ex.: clicar em 13h considera acumulado até 13h).
- Detalhes por equipe:
  - **Meta**, **Produção**, **Serviços**, **Produtivos**, **Improdutivos** e **% improdutivo**
  - **Início de jornada**, **1º atendimento**, **Últ. atendimento**
  - **Jornada Produtiva** (diferença entre último e primeiro atendimento)
  - **Status Jornada**

### Regra do Status Jornada (importante)

- **SEM ATENDIMENTO**: quando não existe `1º Atendimento`.
- **COMPLETA**: quando `Jornada Produtiva >= 07:00`.
- **INCOMPLETA**: demais casos.

## 7) Acordos e justificativas (persistência no navegador)

### Acordos

- O sistema permite marcar equipes no contexto de acordos (ex.: regras específicas por hora/faixa).
- Os acordos ficam salvos no **localStorage** do navegador.
- Existe um **modal de acordos** para visualizar/resumir acordos por supervisor/contexto.

### Justificativas

- Para equipes relevantes, é possível:
  - Inserir/editar justificativas
  - Visualizar justificativas em um modal dedicado (com filtros e contadores)
  - Copiar o texto da justificativa
- As justificativas também ficam no **localStorage**.

### Backup (exportar/importar)

- O sistema oferece:
  - **Exportar backup** (gera um `.json`)
  - **Importar/Restaurar backup** (recarrega os acordos/justificativas a partir de um `.json`)

## 8) Exportação/Impressão

O painel e os modais possuem ações no topo:

- **Imprimir**: abre a visualização de impressão do navegador.
- **Salvar PDF**: usa a função de impressão (o salvamento em PDF é feito pelo diálogo do navegador, “Salvar como PDF”).
- **Baixar imagem**:
  - Gera um `.png` do relatório ou do modal via `html2canvas`.

## 9) Endpoints da API (backend)

- `GET /api/health`
  - Testa conexão com o MySQL (`SELECT 1`).
- `GET /api/columns`
  - Lista colunas da tabela configurada (`SHOW COLUMNS`).
- `GET /api/rows?limit=50&offset=0`
  - Retorna linhas paginadas da tabela.
- `GET /api/report`
  - Retorna o dataset completo para o painel.
  - Suporta filtros:
    - `data=YYYY-MM-DD` (aceita também `DD/MM/YYYY`)
    - `uo=123` (filtra por `COD_UO`)
  - Para `MYSQL_TABLE=report_csc_hoje`:
    - Aplica normalização de colunas via mapper
    - Pode aplicar regras extras:
      - `onlyStartedJourney=true|1` (somente equipes que iniciaram jornada)
      - `strictHours=true|1` (somente horários compatíveis com faixas do painel)
- `GET /api/debug/grouping`
  - Endpoint de debug (apenas para `MYSQL_TABLE=report_csc_hoje`) para ajudar a entender agrupamentos e contagens.

## 10) Configuração do `.env`

O backend lê as variáveis no arquivo `.env` na raiz:

- `PORT` (opcional, padrão 3001)
- `MYSQL_HOST`
- `MYSQL_PORT` (opcional, padrão 3306)
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_DATABASE`
- `MYSQL_TABLE`

## 11) Observações operacionais

- A pasta `MYSQL/` é uma “variante” do frontend; atualmente ela aponta para os assets da raiz (para manter tudo consistente).
- Como acordos/justificativas ficam no navegador, sempre use o **Exportar backup** para migrar para outro PC/perfil.

