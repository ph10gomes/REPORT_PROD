# REPORT_PROD_MYSQL

Sim: dá para ligar esse painel a um MySQL que já tem a tabela — mas **o navegador não conecta direto no MySQL**.
Você precisa de um **backend/API** (incluí um simples em Node.js) e o frontend faz `fetch()` nessa API.

## Rodar

1) Instale dependências:

```bash
npm install
```

2) Configure variáveis:

- Copie `.env.example` para `.env`
- Preencha `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE` e `MYSQL_TABLE`

3) Suba o servidor:

```bash
npm run dev
```

Abra `http://localhost:3001`.

## Backup dos acordos (â€œACORDOSâ€)

- Os acordos/justificativas ficam salvos no `localStorage` do navegador (ou seja: **nÃ£o** vÃ£o junto num backup/cÃ³pia da pasta do projeto).
- Para levar para outro PC/navegador, use os botÃµes no topo do modal de equipes:
  - `ðŸ’¾` Exportar backup (gera um `.json`)
  - `ðŸ“‚` Importar/Restaurar backup (seleciona o `.json`)

## Endpoints

- `GET /api/health` (testa conexão com MySQL)
- `GET /api/columns` (lista colunas da tabela configurada)
- `GET /api/rows?limit=50&offset=0` (traz linhas da tabela configurada)
- `GET /api/report` (traz todas as linhas; para `MYSQL_TABLE=report_csc_hoje` já devolve com os nomes de colunas que o `script.js` usa)
- `GET /api/report?data=YYYY-MM-DD&uo=123` (filtra por `DATA` e `COD_UO`)
