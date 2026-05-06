# 📊 Mapa Completo de Conexões SQL - REPORT_PROD_MYSQL

## 🗄️ Estrutura Geral

**Projeto:** REPORT_PROD_MYSQL  
**Backend:** Python (Flask) + Node.js (Express)  
**Banco de Dados:** MySQL (Dual - REPORT_PROD_MYSQL + Login DB)  
**Data:** Maio 2026

---

## 📌 Bancos de Dados Utilizados

| Banco | Variável de Ambiente | Descrição |
|-------|----------------------|-----------|
| **REPORT_PROD_MYSQL** | `MYSQL_DATABASE` | Banco principal com dados de produção |
| **Login DB** | `MYSQL_LOGIN_DATABASE` | Banco de autenticação de usuários |
| **Equipe Func** | `MYSQL_DATABASE_FOLHA_PONTO` | Banco de folha de ponto e funcionários |
| **Lote Prod** | `MYSQL_DATABASE_LOTE_PROD` | Banco de lote de produção |

---

## 📋 Tabelas Mapeadas

| Tabela | Banco | Variável de Ambiente | Descrição |
|--------|-------|----------------------|-----------|
| `report_csc_hoje` | REPORT_PROD_MYSQL | `MYSQL_TABLE` | Relatório principal de CSC do dia |
| `report_csc_cod_x` | REPORT_PROD_MYSQL | `MYSQL_TABLE_CODX` | Mapeamento de códigos X |
| `controle_servico` | REPORT_PROD_MYSQL | `MYSQL_TABLE_CONTROLE_SERVICO` | Controle de serviços designados |
| `folha_ponto` | equipe_func | `MYSQL_TABLE_FOLHA_PONTO` | Registro de ponto via folha |
| `equipe_funcionario` | equipe_func | `MYSQL_TABLE_EQUIPE_FUNCIONARIO` | Vínculo equipe-funcionário |
| `painel_acordos_estado` | REPORT_PROD_MYSQL | `MYSQL_TABLE_STATE_ACORDOS` | Estado/contexto de acordos |
| `historico_acordos` | REPORT_PROD_MYSQL | `MYSQL_TABLE_HIST_ACORDOS` | Histórico de acordos salvos |
| `historico_justificativas` | REPORT_PROD_MYSQL | `MYSQL_TABLE_HIST_JUSTIFICATIVAS` | Histórico de justificativas |
| `jornadas` (dinâmica) | REPORT_PROD_MYSQL | `JORNADAS_TABLE` (fallback: MYSQL_TABLE) | Jornadas de produtividade |
| `login_table` | Login DB | `MYSQL_LOGIN_TABLE` | Tabela de usuários (login) |

---

## 🔍 QUERIES SQL POR ENDPOINT

### **1. HEALTH CHECK & STATUS**

#### `GET /api/health` (Python & Node.js)
```sql
SELECT 1
```
**Propósito:** Verificar conectividade MySQL  
**Retorno:** `{ok: true, mysql: true, time: "<timestamp>"}`

---

#### `GET /api/status/dados` (Python & Node.js)
```sql
-- Informações de timestamp e timezone
SELECT
  DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s') AS now_mysql,
  DATE_FORMAT(NOW(), '%d/%m/%Y %H:%i:%s') AS now_br,
  DATE_FORMAT(CURDATE(), '%d/%m/%Y') AS hoje_br,
  HOUR(NOW()) AS hora_atual,
  @@system_time_zone AS system_tz,
  TIMEDIFF(NOW(), UTC_TIMESTAMP()) AS offset_mysql

-- Status da tabela report_csc_hoje
SELECT DATA, COUNT(*) AS total_linhas, MAX(hora_atualizacao) AS ultima_hora, MAX(id) AS max_id
FROM `report_csc_hoje`
GROUP BY DATA
ORDER BY STR_TO_DATE(DATA, '%d/%m/%Y') DESC, DATA DESC
LIMIT 1

-- Detalhes da última hora atualizada
SELECT COUNT(*) AS total_linhas, MIN(id) AS min_id, MAX(id) AS max_id
FROM `report_csc_hoje`
WHERE DATA = %s AND hora_atualizacao = %s

-- Status da tabela controle_servico
SELECT
  COUNT(*) AS total_linhas,
  DATE_FORMAT(MAX(DATA_ATUALIZACAO), '%Y-%m-%d %H:%i:%s') AS ultima_atualizacao,
  DATE_FORMAT(MAX(DATA_ATUALIZACAO), '%d/%m/%Y %H:%i:%s') AS ultima_atualizacao_br,
  TIMESTAMPDIFF(MINUTE, MAX(DATA_ATUALIZACAO), NOW()) AS atraso_minutos,
  DATE_FORMAT(MAX(DATA_DESIGNACAO), '%d/%m/%Y %H:%i:%s') AS ultima_designacao_br,
  DATE_FORMAT(MAX(DATA_ACIONAMENTO), '%d/%m/%Y %H:%i:%s') AS ultimo_acionamento_br,
  DATE_FORMAT(MAX(DATA_TERMINO_REAL), '%d/%m/%Y %H:%i:%s') AS ultimo_encerramento_br
FROM `controle_servico`

-- Status da tabela report_csc_cod_x
SELECT COUNT(*) AS total_linhas, MAX(id) AS max_id
FROM `report_csc_cod_x`
```
**Propósito:** Obter status de atualização de múltiplas tabelas  
**Retorno:** JSON com timestamps, contadores e status (ok/atenção/atrasado)

---

### **2. COLUNAS & ESTRUTURA**

#### `GET /api/columns` (Node.js)
```sql
SHOW COLUMNS FROM `report_csc_hoje`
```

#### `GET /api/controle-servico/columns` (Node.js)
```sql
SHOW COLUMNS FROM `controle_servico`
```

#### `INTERNAL: get_table_columns()` (Python & Node.js)
```sql
SHOW COLUMNS FROM `{table_name}`
```
**Propósito:** Descobrir colunas dinâmicas de qualquer tabela  
**Uso:** Mapeamento automático de nomes de colunas

---

### **3. CONSULTAS DE DADOS BÁSICAS**

#### `GET /api/rows` (Node.js)
```sql
SELECT * FROM `report_csc_hoje`
LIMIT ? OFFSET ?
```
**Parâmetros:** `limit` (1-500), `offset`

#### `GET /api/controle-servico/sample` (Node.js)
```sql
SELECT * FROM `controle_servico`
LIMIT ?
```
**Parâmetros:** `limit` (1-50)

---

### **4. RELATÓRIO PRINCIPAL - CONTROLE DE SERVIÇO**

#### `GET /api/controle-servico` (Python & Node.js)
```sql
SELECT * FROM `controle_servico`
[WHERE filtros...]
[ORDER BY coluna_data ASC]
LIMIT ?
```

**Filtros suportados:**
- `dataInicio`: `DATE(coluna_data) >= ?`
- `dataFim`: `DATE(coluna_data) <= ?`
- `data`: Suporta ISO (YYYY-MM-DD) ou BR (DD/MM/YYYY)
- `uo`: `COD_UO = ?` ou similar
- `codEquipe`: `COD_EQUIPE = ?`

**Mapeamento dinâmico de colunas:**
- DATA_ATUALIZACAO → DATA ATUALIZACAO → DATA_ATUALIZAÇÃO
- COD_EQUIPE_WM → COD_EQUIPE → NUM_EQUIPE
- COD_UO → UO

**Fallback:** Se UO especificado e sem resultados → re-executa sem filtro UO

---

### **5. FOLHA DE PONTO & VINCULAÇÕES**

#### `GET /api/folha-ponto` (Python & Node.js)
```sql
SELECT
  fp.*,
  ef.COD_EQUIPE,
  ef.COD_UO,
  ef.NOME_EQUIPE,
  ef.NOME_FUNCIONARIO,
  ef.STATUS AS STATUS_EQUIPE_FUNC
FROM `equipe_func`.`folha_ponto` fp
LEFT JOIN `equipe_func`.`equipe_funcionario` ef
  ON ef.COD_FUNC = fp.COD_FUNC
  AND (ef.DATA_FIM IS NULL OR ef.DATA_FIM >= fp.DATA)
WHERE fp.DATA IS NOT NULL
  [AND DATE(fp.DATA) >= ?]
  [AND DATE(fp.DATA) <= ?]
  [AND ef.COD_UO = ?]
ORDER BY fp.DATA ASC, ef.COD_UO ASC, ef.COD_EQUIPE ASC, fp.COD_FUNC ASC
LIMIT ?
```

**Parâmetros:**
- `dataInicio`: Filtro inicial
- `dataFim`: Filtro final
- `uo`: Mapeado como COD_UO (digits only)
- `limit`: 1-100000, default 50000

---

### **6. SDCA - EQUIPES**

#### `GET /api/sdca/equipes` (Node.js)
```sql
SELECT
  DATA,
  COD_UO,
  COD_EQUIPE,
  COALESCE(NULLIF(NOME_EQUIPE, ''), NULLIF(NOME, ''), COD_EQUIPE) AS NOME_EQUIPE,
  NOME_SUPERVISOR,
  MAX(CAST(REPLACE(CAST(META AS CHAR), ',', '.') AS DECIMAL(15,4))) AS META,
  MAX(CAST(REPLACE(CAST(US_EXEC AS CHAR), ',', '.') AS DECIMAL(15,4))) AS US_EXEC,
  COALESCE(
    MAX(NULLIF(COD_CLASSIFICACAO_DINAMICO, '')),
    MAX(NULLIF(CLASSIFICACAO_EXEC_META, '')),
    MAX(NULLIF(CLASSIFICACAO_PREV_META, ''))
  ) AS FAIXA_DIA,
  MIN(NULLIF(INICIO_JORNADA, '')) AS INICIO_JORNADA,
  MAX(NULLIF(ULTIMO_ATENDIMENTO, '')) AS ULTIMO_ATENDIMENTO
FROM `report_csc_hoje`
WHERE DATA IS NOT NULL
  AND TRIM(CAST(COD_EQUIPE AS CHAR)) <> ''
  [AND STR_TO_DATE(DATA, '%d/%m/%Y') >= ?]
  [AND STR_TO_DATE(DATA, '%d/%m/%Y') <= ?]
  [AND CAST(COD_UO AS CHAR) = ?]
GROUP BY DATA, COD_UO, COD_EQUIPE, NOME_EQUIPE, NOME, NOME_SUPERVISOR
ORDER BY NOME_EQUIPE ASC
```

**Se sem datas:** Filtra pela data máxima da tabela

---

### **7. CONTROLE-SERVICO - RESUMOS**

#### `GET /api/controle-servico/designados-resumo` (Node.js)
```sql
SELECT
  TRIM(CAST(`COD_EQUIPE` AS CHAR)) AS codigo_equipe,
  COUNT(*) AS servicos_designados
FROM `controle_servico`
[WHERE filtros...]
GROUP BY TRIM(CAST(`COD_EQUIPE` AS CHAR))
ORDER BY servicos_designados DESC, codigo_equipe ASC
```

#### `GET /api/controle-servico/resumo-equipes` (Node.js)
```sql
SELECT
  TRIM(CAST(`COLUNA_EQUIPE` AS CHAR)) AS codigo_equipe,
  COUNT(*) AS servicos_designados,
  SUM(CASE WHEN `PRODUTIVO` IN ('T', 'SIM', 'S', '1', 'TRUE') THEN 1 ELSE 0 END) AS servicos_produtivos,
  SUM(CASE WHEN `PRODUTIVO` IN ('F', 'NAO', 'NÃO', 'N', '0', 'FALSE') THEN 1 ELSE 0 END) AS servicos_improdutivos,
  SUM(CASE WHEN (`PRODUTIVO` IN ('T','SIM',...) OR `PRODUTIVO` IN ('F','NAO',...)) THEN 1 ELSE 0 END) AS servicos_realizados,
  DATE_FORMAT(MIN(`DATA_DESIGNACAO`), '%H:%i') AS inicio_jornada,
  DATE_FORMAT(MIN(`DATA_ACIONAMENTO`), '%H:%i') AS primeiro_atendimento,
  DATE_FORMAT(MAX(`DATA_TERMINO_REAL`), '%H:%i') AS ultimo_atendimento,
  DATE_FORMAT(SEC_TO_TIME(TIMESTAMPDIFF(SECOND, MIN(`DATA_ACIONAMENTO`), MAX(`DATA_TERMINO_REAL`))), '%H:%i') AS jornada_produtiva
FROM `controle_servico`
[WHERE filtros...]
GROUP BY TRIM(CAST(`COD_EQUIPE` AS CHAR))
ORDER BY servicos_designados DESC, codigo_equipe ASC
```

---

### **8. HISTÓRICO DE ACORDOS**

#### `POST /api/historico/acordos` (Node.js)
```sql
-- Criação automática se não existir
CREATE TABLE IF NOT EXISTS `historico_acordos` (
  id BIGINT NOT NULL AUTO_INCREMENT,
  data_ref VARCHAR(20) NOT NULL,
  uo VARCHAR(50) NULL,
  tipo_visao VARCHAR(50) NOT NULL,
  supervisor VARCHAR(255) NULL,
  hora_referencia VARCHAR(20) NOT NULL,
  codigo_equipe VARCHAR(50) NOT NULL,
  equipe VARCHAR(255) NULL,
  acao VARCHAR(20) NOT NULL,
  meta_dia_acordo DECIMAL(15,3) NULL,
  meta_acordo DECIMAL(15,3) NULL,
  prod_acordo DECIMAL(15,3) NULL,
  faixa_acordo VARCHAR(20) NULL,
  perc_acordo DECIMAL(10,2) NULL,
  usuario_salvo VARCHAR(255) NULL,
  salvo_em DATETIME NOT NULL,
  PRIMARY KEY (id),
  KEY idx_hist_acordos_contexto (data_ref, tipo_visao, hora_referencia, codigo_equipe),
  KEY idx_hist_acordos_salvo_em (salvo_em)
)

-- Insert
INSERT INTO `historico_acordos` (
  data_ref, uo, tipo_visao, supervisor, hora_referencia,
  codigo_equipe, equipe, acao, meta_dia_acordo, meta_acordo,
  prod_acordo, faixa_acordo, perc_acordo, usuario_salvo, salvo_em
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
```

#### `GET /api/historico/acordos` (Node.js)
```sql
SELECT * FROM `historico_acordos`
[WHERE uo = ?]
[AND UPPER(TRIM(COALESCE(supervisor, ''))) = ?]
[AND tipo_visao = ?]
ORDER BY salvo_em DESC
LIMIT ?
```

**Parâmetros:**
- `periodo`: diario (default), semanal, mensal
- `data`: Filtro por data específica (ISO: YYYY-MM-DD)
- `mes`: Filtro por mês (YYYY-MM)
- `uo`: Unidade operacional
- `supervisor`: Nome do supervisor
- `tipo_visao`: Tipo de visão
- `limit`: 1-5000, default 1000

---

### **9. HISTÓRICO DE JUSTIFICATIVAS**

#### `POST /api/historico/justificativas` (Node.js)
```sql
-- Criação automática se não existir
CREATE TABLE IF NOT EXISTS `historico_justificativas` (
  id BIGINT NOT NULL AUTO_INCREMENT,
  data_ref VARCHAR(20) NOT NULL,
  uo VARCHAR(50) NULL,
  tipo_visao VARCHAR(50) NOT NULL,
  supervisor VARCHAR(255) NULL,
  hora_referencia VARCHAR(20) NOT NULL,
  codigo_equipe VARCHAR(50) NOT NULL,
  equipe VARCHAR(255) NULL,
  justificativa LONGTEXT NULL,
  motivo_grupo VARCHAR(255) NULL,
  motivo_grupos LONGTEXT NULL,
  motivo_descricao VARCHAR(255) NULL,
  motivo_descricoes LONGTEXT NULL,
  detalhe LONGTEXT NULL,
  acao VARCHAR(20) NOT NULL,
  usuario_salvo VARCHAR(255) NULL,
  salvo_em DATETIME NOT NULL,
  PRIMARY KEY (id),
  KEY idx_hist_just_contexto (data_ref, tipo_visao, hora_referencia, codigo_equipe),
  KEY idx_hist_just_salvo_em (salvo_em)
)

-- Insert
INSERT INTO `historico_justificativas` (
  data_ref, uo, tipo_visao, supervisor, hora_referencia,
  codigo_equipe, equipe, justificativa, motivo_grupo, motivo_grupos,
  motivo_descricao, motivo_descricoes, detalhe, acao, usuario_salvo, salvo_em
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
```

#### `GET /api/historico/justificativas` (Node.js)
```sql
SELECT * FROM `historico_justificativas`
[WHERE uo = ?]
[AND UPPER(TRIM(COALESCE(supervisor, ''))) LIKE ?]
[AND tipo_visao = ?]
ORDER BY salvo_em DESC
LIMIT ?
```

---

### **10. JORNADAS DE PRODUTIVIDADE**

#### `GET /jornadas` (Python)
```sql
-- Se tabela for 'report_csc_hoje' (conversão de datas de BR para ISO)
SELECT
  COD_UO,
  NOME_SUPERVISOR AS SUPERVISOR_EQUIPE,
  NOME_LIDER AS LIDER_CONTROLADOR,
  NOME_CONTROLADOR,
  NOME_EQUIPE,
  COD_CLASSIFICACAO_DINAMICO,
  META,
  US_EXEC AS PRODUCAO,
  EXECUTADOS AS SERVICOS_EXECUTADOS,
  PRODUTIVOS,
  IMPRODUTIVOS,
  DATE_FORMAT(STR_TO_DATE(INICIO_JORNADA, '%d/%m/%Y %H:%i:%s'), '%H:%i') AS INICIO_JORNADA,
  DATE_FORMAT(STR_TO_DATE(PRIMEIRO_ATENDIMENTO, '%d/%m/%Y %H:%i:%s'), '%H:%i') AS PRIMEIRO_ATENDIMENTO,
  DATE_FORMAT(STR_TO_DATE(INICIO_REFEICAO, '%d/%m/%Y %H:%i:%s'), '%H:%i') AS INICIO_REFEICAO,
  DATE_FORMAT(STR_TO_DATE(TERMINO_REFEICAO, '%d/%m/%Y %H:%i:%s'), '%H:%i') AS TERMINO_REFEICAO,
  DATE_FORMAT(STR_TO_DATE(ULTIMO_ATENDIMENTO, '%d/%m/%Y %H:%i:%s'), '%H:%i') AS ULTIMO_ATENDIMENTO,
  DATE_FORMAT(STR_TO_DATE(FIM_JORNADA, '%d/%m/%Y %H:%i:%s'), '%H:%i') AS FIM_JORNADA,
  LPAD(hora_ini_jornada, 2, '0') AS HORA,
  DATE_FORMAT(STR_TO_DATE(DATA, '%d/%m/%Y'), '%Y-%m-%d') AS DATA_DIA,
  DATE_FORMAT(STR_TO_DATE(ULTIMA_ATUALIZACAO_DADOS, '%d/%m/%Y %H:%i:%s'), '%Y-%m-%d %H:%i:%s') AS atualizado_em
FROM report_csc_hoje
WHERE [filtros de data]
ORDER BY
  STR_TO_DATE(DATA, '%d/%m/%Y') DESC,
  STR_TO_DATE(ULTIMA_ATUALIZACAO_DADOS, '%d/%m/%Y %H:%i:%s') DESC,
  NOME_EQUIPE ASC

-- Se tabela for outra (padrão ISO)
SELECT
  COD_UO,
  SUPERVISOR_EQUIPE,
  LIDER_CONTROLADOR,
  NOME_CONTROLADOR,
  NOME_EQUIPE,
  COD_CLASSIFICACAO_DINAMICO,
  META,
  US_EXEC AS PRODUCAO,
  EXECUTADOS AS SERVICOS_EXECUTADOS,
  PRODUTIVOS,
  IMPRODUTIVOS,
  DATE_FORMAT(INICIO_JORNADA, '%H:%i') AS INICIO_JORNADA,
  DATE_FORMAT(PRIMEIRO_ATENDIMENTO, '%H:%i') AS PRIMEIRO_ATENDIMENTO,
  DATE_FORMAT(INICIO_REFEICAO, '%H:%i') AS INICIO_REFEICAO,
  DATE_FORMAT(TERMINO_REFEICAO, '%H:%i') AS TERMINO_REFEICAO,
  DATE_FORMAT(ULTIMO_ATENDIMENTO, '%H:%i') AS ULTIMO_ATENDIMENTO,
  DATE_FORMAT(FIM_JORNADA, '%H:%i') AS FIM_JORNADA,
  HORA,
  COALESCE(DATE_FORMAT(DATA_DIA, '%Y-%m-%d'), DATE_FORMAT(atualizado_em, '%Y-%m-%d')) AS DATA_DIA,
  DATE_FORMAT(atualizado_em, '%Y-%m-%d %H:%i:%s') AS atualizado_em
FROM `jornadas_table`
WHERE [filtros de data]
ORDER BY
  COALESCE(DATA_DIA, DATE(atualizado_em)) DESC,
  atualizado_em DESC,
  NOME_EQUIPE ASC
```

**Parâmetros:**
- `dataInicio`: ISO format YYYY-MM-DD (optional)
- `dataFim`: ISO format YYYY-MM-DD (optional)
- Se sem datas: Usa a data máxima da tabela

---

### **11. PAINEL DE ACORDOS - ESTADO**

#### `GET /api/state/acordos` (Python)
```sql
-- Leitura de estado
SELECT context_key, payload_json, updated_at FROM `painel_acordos_estado`
ORDER BY updated_at DESC

-- Exclusão por contexto
DELETE FROM `painel_acordos_estado` WHERE context_key = ?

-- Exclusão de contextos não utilizados (housekeeping)
DELETE FROM `painel_acordos_estado` WHERE context_key NOT IN (?, ?, ...)
```

#### `POST /api/state/acordos/...` (Python)
```sql
-- Criação automática se não existir
CREATE TABLE IF NOT EXISTS `painel_acordos_estado` (
  context_key VARCHAR(255) NOT NULL,
  data_ref VARCHAR(20) NULL,
  uo VARCHAR(50) NULL,
  tipo_visao VARCHAR(50) NULL,
  supervisor VARCHAR(255) NULL,
  payload_json LONGTEXT NOT NULL,
  updated_at DATETIME NOT NULL,
  PRIMARY KEY (context_key)
)

-- Upsert (insert com duplicação de chave)
INSERT INTO `painel_acordos_estado` (
  context_key, data_ref, uo, tipo_visao, supervisor, payload_json, updated_at
) VALUES (?, ?, ?, ?, ?, ?, NOW())
ON DUPLICATE KEY UPDATE
  payload_json = VALUES(payload_json),
  updated_at = NOW()
```

---

### **12. LOGIN**

#### `GET /api/login` (Python)
```sql
SELECT * FROM `login_table`
WHERE `username_column` = ? LIMIT 1
```

**Mapeamento dinâmico de colunas:**
- USER → USUARIO → USUÁRIO
- PASSWORD → SENHA → PASS
- STATUS → ATIVO

---

### **13. REPORT - VISUALIZAÇÕES**

#### `GET /api/report` (Python)
```sql
-- Via VIEW: view_acordos_justificativas_acumulado (se existir)
SELECT
  [colunas dinâmicas]
FROM `{database}`.`{view}`
WHERE DATA IS NOT NULL
  [AND filtros...]
[ORDER BY DATA DESC, ...]
[LIMIT ?]
```

---

## 🔄 PADRÕES DE CONEXÃO

### **1. Pool de Conexões MySQL**
```python
# app.py
def get_db_connection(autocommit=True):
    conn = mysql.connector.connect(
        host=MYSQL_HOST,
        port=MYSQL_PORT,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_DATABASE,
        autocommit=autocommit
    )
    return conn

def get_login_db_connection():
    conn = mysql.connector.connect(
        host=MYSQL_HOST,
        port=MYSQL_PORT,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        database=MYSQL_LOGIN_DATABASE,
        autocommit=True
    )
    return conn
```

### **2. Execução Genérica de Query**
```python
def execute_query(sql, params=None):
    """Executa SQL e retorna lista de dicts"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(sql, params or [])
        return cursor.fetchall()
    finally:
        cursor.close()
        conn.close()

def execute_login_query(sql, params=None):
    """Executa SQL no banco de login"""
    conn = get_login_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(sql, params or [])
        return cursor.fetchall()
    finally:
        cursor.close()
        conn.close()
```

### **3. Sanitização de Nomes**
```python
def sanitize_table_name(name):
    """Sanitiza nomes de tabelas/databases"""
    sanitized_parts = [
        re.sub(r'[^\w]', '', part) 
        for part in str(name).split('.')
    ]
    return ".".join(f"`{part}`" for part in sanitized_parts if part)
```

### **4. Mapeamento Dinâmico de Colunas**
```python
def pick_column(columns, candidates):
    """Seleciona primeira coluna disponível da lista"""
    col_map = {col.lower(): col for col in columns}
    for candidate in candidates:
        if candidate.lower() in col_map:
            return col_map[candidate.lower()]
    return None
```

---

## 📊 ESTATÍSTICAS DE QUERIES

| Tipo de Query | Quantidade | Exemplo |
|---------------|-----------|---------|
| SELECT simples | 30+ | Health check, columns |
| SELECT com WHERE | 25+ | Filtros por data, UO, equipe |
| SELECT com JOIN | 3 | Folha-ponto, resumos |
| SELECT com GROUP BY | 8 | Designados-resumo, jornadas |
| SELECT com CASE WHEN | 2 | Contagem produtivos/improdutivos |
| INSERT | 4 | Acordos, justificativas, estado |
| DELETE | 2 | Housekeeping de estado |
| CREATE TABLE | 3 | Tabelas de histórico, estado |
| SHOW COLUMNS | 5+ | Descoberta dinâmica |
| **TOTAL** | **82+** | - |

---

## 🛡️ SEGURANÇA & BOAS PRÁTICAS

✅ **Implementado:**
- ✓ Parameterized queries (?) evita SQL injection
- ✓ Sanitização de nomes de tabelas com backticks
- ✓ Mapeamento dinâmico de colunas (tolerância a variações)
- ✓ Tratamento de exceções em todas as queries
- ✓ Connection pooling implícito (conexão por request)
- ✓ Autocommit True para operações INSERT/UPDATE/DELETE

⚠️ **Considerações:**
- Limites de limite (LIMIT) implementados (ex: max 50000 rows)
- Validação de parâmetros numéricos (limit, offset)
- Fallback patterns (ex: sem resultado com UO, repetir sem UO)

---

## 📈 ESTRUTURA LÓGICA DE DADOS

```
REPORT_PROD_MYSQL (Main Database)
├── report_csc_hoje (Relatório CSC do dia)
├── report_csc_cod_x (Mapeamento de códigos)
├── controle_servico (Serviços designados)
├── painel_acordos_estado (Estado de acordos - persistência local)
├── historico_acordos (Histórico de acordos salvos)
└── historico_justificativas (Histórico de justificativas)

equipe_func (Secondary Database)
├── folha_ponto (Registros de ponto)
└── equipe_funcionario (Vínculo funcionário-equipe)

Login DB
└── login_table (Usuários)
```

---

## 🔗 VARIÁVEIS DE AMBIENTE NECESSÁRIAS

```bash
# MySQL Connection
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=user
MYSQL_PASSWORD=password

# Databases
MYSQL_DATABASE=REPORT_PROD_MYSQL
MYSQL_LOGIN_DATABASE=login

# Tables - Main
MYSQL_TABLE=report_csc_hoje
MYSQL_TABLE_CONTROLE_SERVICO=controle_servico
MYSQL_TABLE_CODX=report_csc_cod_x
MYSQL_TABLE_HIST_ACORDOS=historico_acordos
MYSQL_TABLE_HIST_JUSTIFICATIVAS=historico_justificativas
MYSQL_TABLE_STATE_ACORDOS=painel_acordos_estado

# Tables - Secondary Databases
MYSQL_DATABASE_FOLHA_PONTO=equipe_func
MYSQL_TABLE_FOLHA_PONTO=folha_ponto
MYSQL_TABLE_EQUIPE_FUNCIONARIO=equipe_funcionario
MYSQL_TABLE_LOGIN=login_table
MYSQL_LOGIN_TABLE=login_table
JORNADAS_TABLE=jornadas (optional, fallback to MYSQL_TABLE)

# Application
PORT=3001
```

---

## 📝 Notas Importantes

1. **Formatos de Data:** Sistema suporta ISO (YYYY-MM-DD) e BR (DD/MM/YYYY) transparentemente
2. **Descoberta Automática:** Colunas são mapeadas dinamicamente - funciona com variações de nome
3. **Type Coercion:** Decimais com vírgula (1,5) são convertidas para ponto (1.5) automaticamente
4. **Timezone:** Todas as timestamps usam Brasília (UTC-3)
5. **Max ID Tracking:** Mantém controle de MAX(id) para replicação/sincronização

---

Generated: 2026-05-05  
Project: REPORT_PROD_MYSQL  
Status: ✅ Documentado Completamente
