import datetime
import gzip
import json
import os
import re
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import mysql.connector

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(dotenv_path=BASE_DIR / ".env")

app = Flask(__name__, static_folder=None)
CORS(app)
app.config["JSON_SORT_KEYS"] = False

PORT = int(os.getenv("PORT", "3001"))


@app.after_request
def add_no_cache_headers(response):
    if request.path.endswith((".html", ".js", ".css")) or request.path == "/":
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"

    accept_encoding = request.headers.get("Accept-Encoding", "")
    compressible = response.mimetype in {
        "text/html",
        "text/css",
        "text/javascript",
        "application/javascript",
        "application/json",
    }

    if (
        "gzip" in accept_encoding.lower()
        and compressible
        and not response.direct_passthrough
        and not response.headers.get("Content-Encoding")
    ):
        data = response.get_data()
        if len(data) > 1024:
            response.set_data(gzip.compress(data))
            response.headers["Content-Encoding"] = "gzip"
            response.headers["Content-Length"] = str(len(response.get_data()))
            response.headers["Vary"] = "Accept-Encoding"

    return response


def require_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Variável de ambiente obrigatória ausente: {name}")
    return value


def sanitize_table_name(table: str) -> str:
    if not isinstance(table, str):
        raise RuntimeError("MYSQL_TABLE inválida.")
    value = table.strip()
    if not re.fullmatch(r"[A-Za-z0-9_]+", value):
        raise RuntimeError("MYSQL_TABLE inválida. Use apenas letras, números e underscore.")
    return value


def sanitize_table_name_unicode(table: str) -> str:
    if not isinstance(table, str):
        raise RuntimeError("Nome de tabela inválido.")
    value = table.strip()
    if not re.fullmatch(r"[A-Za-z0-9_À-ÖØ-öø-ÿ]+", value):
        raise RuntimeError("Nome de tabela inválido. Use apenas letras, números e underscore.")
    return value


def quote_qualified_table_name(table: str) -> str:
    if not isinstance(table, str):
        raise RuntimeError("Nome de tabela inválido.")
    parts = [part.strip() for part in table.split(".") if part.strip()]
    if not parts or len(parts) > 2:
        raise RuntimeError("Nome de tabela inválido. Use 'tabela' ou 'schema.tabela'.")

    sanitized_parts = [sanitize_table_name_unicode(part) for part in parts]
    return ".".join(f"`{part}`" for part in sanitized_parts)


def get_db_connection(autocommit=True):
    return mysql.connector.connect(
        host=os.getenv("MYSQL_HOST", "localhost"),
        port=int(os.getenv("MYSQL_PORT", "3306")),
        user=require_env("MYSQL_USER"),
        password=require_env("MYSQL_PASSWORD"),
        database=require_env("MYSQL_DATABASE"),
        autocommit=autocommit,
    )


def get_login_db_connection(autocommit=True):
    return mysql.connector.connect(
        host=os.getenv("MYSQL_LOGIN_HOST", os.getenv("MYSQL_HOST", "localhost")),
        port=int(os.getenv("MYSQL_LOGIN_PORT", os.getenv("MYSQL_PORT", "3306"))),
        user=os.getenv("MYSQL_LOGIN_USER", os.getenv("MYSQL_USER", "")),
        password=os.getenv("MYSQL_LOGIN_PASSWORD", os.getenv("MYSQL_PASSWORD", "")),
        database=os.getenv("MYSQL_LOGIN_DATABASE", "login"),
        autocommit=autocommit,
    )


def get_history_table_name(env_name: str, fallback_name: str) -> str:
    return sanitize_table_name(os.getenv(env_name, fallback_name))


def get_state_table_name() -> str:
    return sanitize_table_name(os.getenv("MYSQL_TABLE_STATE_ACORDOS", "painel_acordos_estado"))


def to_mysql_datetime(value):
    raw = str(value or "").strip()
    if not raw:
        return datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")

    if raw.endswith("Z"):
        raw = raw[:-1]

    for fmt in ("%Y-%m-%dT%H:%M:%S", "%Y-%m-%dT%H:%M:%S.%f", "%Y-%m-%d %H:%M:%S"):
        try:
            return datetime.datetime.strptime(raw, fmt).strftime("%Y-%m-%d %H:%M:%S")
        except ValueError:
            continue

    try:
        dt = datetime.datetime.fromisoformat(raw)
        return dt.strftime("%Y-%m-%d %H:%M:%S")
    except Exception:
        return datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")


def parse_flexible_date_ref(value):
    raw = str(value or "").strip()
    if not raw:
        return None

    if re.fullmatch(r"\d{4}-\d{2}-\d{2}", raw):
        return raw

    if re.fullmatch(r"\d{2}/\d{2}/\d{4}", raw):
        d, m, y = raw.split("/")
        return f"{y}-{m}-{d}"

    try:
        dt = datetime.datetime.fromisoformat(raw)
        return dt.strftime("%Y-%m-%d")
    except Exception:
        try:
            dt = datetime.datetime.strptime(raw, "%d/%m/%Y")
            return dt.strftime("%Y-%m-%d")
        except Exception:
            return None


def get_week_range_from_iso_date(iso_date):
    try:
        dt = datetime.datetime.strptime(iso_date, "%Y-%m-%d")
    except Exception:
        return None

    day = dt.weekday()
    monday = dt - datetime.timedelta(days=day)
    sunday = monday + datetime.timedelta(days=6)
    return {
        "start": monday.strftime("%Y-%m-%d"),
        "end": sunday.strftime("%Y-%m-%d"),
    }


def build_data_where(value, where, params):
    raw = str(value or "").strip()
    if not raw:
        return

    if re.fullmatch(r"\d{4}-\d{2}-\d{2}", raw):
        y, m, d = raw.split("-")
        br = f"{d}/{m}/{y}"
        where.append("(DATE(DATA) = %s OR CAST(DATA AS CHAR) = %s OR CAST(DATA AS CHAR) = %s)")
        params.extend([raw, raw, br])
        return

    if re.fullmatch(r"\d{2}/\d{2}/\d{4}", raw):
        d, m, y = raw.split("/")
        iso = f"{y}-{m}-{d}"
        where.append("(DATE(DATA) = %s OR CAST(DATA AS CHAR) = %s OR CAST(DATA AS CHAR) = %s)")
        params.extend([iso, iso, raw])
        return

    where.append("DATA = %s")
    params.append(raw)


def add_date_filter_for_columns(value, columns, where, params):
    raw = str(value or "").strip()
    if not raw or not columns:
        return

    iso = None
    br = None
    if re.fullmatch(r"\d{4}-\d{2}-\d{2}", raw):
        y, m, d = raw.split("-")
        iso = raw
        br = f"{d}/{m}/{y}"
    elif re.fullmatch(r"\d{2}/\d{2}/\d{4}", raw):
        d, m, y = raw.split("/")
        iso = f"{y}-{m}-{d}"
        br = raw

    or_parts = []
    for column in columns:
        if iso and br:
            or_parts.append(f"(DATE(`{column}`) = %s OR CAST(`{column}` AS CHAR) = %s OR CAST(`{column}` AS CHAR) = %s)")
            params.extend([iso, iso, br])
        else:
            or_parts.append(f"`{column}` = %s")
            params.append(raw)

    if or_parts:
        where.append(f"({' OR '.join(or_parts)})")


def add_data_range_filter(data_start, data_end, where, params):
    date_expr = "COALESCE(DATE(DATA), STR_TO_DATE(CAST(DATA AS CHAR), '%d/%m/%Y'))"
    if data_start and data_end:
        where.append(f"{date_expr} BETWEEN %s AND %s")
        params.extend([data_start, data_end])
    elif data_start:
        where.append(f"{date_expr} >= %s")
        params.append(data_start)
    elif data_end:
        where.append(f"{date_expr} <= %s")
        params.append(data_end)


def add_pending_previous_day_filters(pick_col, where, params):
    col_situacao = pick_col(["SITUACAO", "SITUAÇÃO", "SITUACAO_SERVICO"])
    col_produtivo = pick_col(["PRODUTIVO", "PRODUTIVOS"])
    col_us_exec = pick_col(["US_EXEC", "US EXEC", "US_EXECUTADAS"])
    col_termino = pick_col(["DATA_TERMINO_REAL", "ENCERRAMENTO", "DATA_TERMINO"])

    if col_situacao:
        where.append(f"UPPER(TRIM(CAST(`{col_situacao}` AS CHAR))) = %s")
        params.append("D")

    if col_produtivo:
        where.append(
            f"(`{col_produtivo}` IS NULL OR TRIM(CAST(`{col_produtivo}` AS CHAR)) = '' OR UPPER(TRIM(CAST(`{col_produtivo}` AS CHAR))) NOT IN ('T', 'SIM', 'S', '1', 'TRUE'))"
        )

    if col_us_exec:
        where.append(
            f"(`{col_us_exec}` IS NULL OR TRIM(CAST(`{col_us_exec}` AS CHAR)) = '' OR CAST(REPLACE(CAST(`{col_us_exec}` AS CHAR), ',', '.') AS DECIMAL(15,3)) = 0)"
        )

    if col_termino:
        where.append(f"(`{col_termino}` IS NULL OR TRIM(CAST(`{col_termino}` AS CHAR)) = '')")


def pick_column(columns, candidates):
    if not columns:
        return None
    lower_map = {str(col).lower(): col for col in columns if col is not None}
    for candidate in candidates:
        normalized = str(candidate).lower()
        if normalized in lower_map:
            return lower_map[normalized]
    return None


def get_table_columns(table):
    rows = execute_query(f"SHOW COLUMNS FROM `{table}`")
    return [row.get("Field") for row in rows if row.get("Field")]


def parse_time_to_minutes(value):
    if value is None:
        return None
    s = str(value).strip()
    if not s:
        return None

    time_part = s.split("T")[-1] if "T" in s else s.split(" ")[-1]
    match = re.fullmatch(r"(\d{1,2}):(\d{2})(?::(\d{2}))?", time_part)
    if not match:
        return None

    h = int(match.group(1))
    m = int(match.group(2))
    if h < 0 or h > 47 or m < 0 or m > 59:
        return None
    return h * 60 + m


def extract_hhmm(value):
    if value is None:
        return ""
    s = str(value).strip()
    if not s:
        return ""
    match = re.search(r"(\d{1,2}):(\d{2})", s)
    if not match:
        return ""
    return f"{int(match.group(1)):02d}:{match.group(2)}"


def minutes_to_hhmm(total_minutes):
    if total_minutes is None or not isinstance(total_minutes, int) or total_minutes < 0:
        return "-"
    h = total_minutes // 60
    m = total_minutes % 60
    return f"{h:02d}:{m:02d}"


def compute_jornada_produtiva(row):
    start = parse_time_to_minutes(row.get("PRIMEIRO_ATENDIMENTO"))
    end = parse_time_to_minutes(row.get("ULTIMO_ATENDIMENTO"))
    if start is None or end is None or end < start:
        return "-"
    return minutes_to_hhmm(end - start)


def compute_status_jornada(row):
    primeiro = str(row.get("PRIMEIRO_ATENDIMENTO") or "").strip()
    if not primeiro:
        return "SEM ATENDIMENTO"

    start = parse_time_to_minutes(row.get("PRIMEIRO_ATENDIMENTO"))
    end = parse_time_to_minutes(row.get("ULTIMO_ATENDIMENTO"))
    if start is None or end is None or end < start:
        return "INCOMPLETA"
    return "COMPLETA" if end - start >= 7 * 60 else "INCOMPLETA"


def first_non_empty(*values):
    for value in values:
        s = "" if value is None else str(value).strip()
        if s:
            return value
    return ""


def normalize_spaces(value):
    return re.sub(r"\s+", " ", str(value or "")).strip()


def map_hora_atualizacao_to_faixa(value):
    if value is None:
        return ""
    s = str(value).strip()
    if not s.isdigit():
        return ""
    n = int(s)
    if n < 7:
        return ""
    if n <= 9:
        return "09"
    if n <= 11:
        return "11"
    if n <= 13:
        return "13"
    if n <= 15:
        return "15"
    return "17"


def map_report_csc_hoje_row(db_row):
    cod_uo = db_row.get("COD_UO", "")
    cod_equipe = db_row.get("COD_EQUIPE", "")
    num_equipe = db_row.get("NUM_EQUIPE", "")
    data = db_row.get("DATA", "")
    hora = map_hora_atualizacao_to_faixa(db_row.get("hora_atualizacao"))
    hora_atualizacao_raw = db_row.get("hora_atualizacao", "")
    meta_prog = db_row.get("META", "")
    producao = db_row.get("US_EXEC", "")
    classificacao = first_non_empty(
        db_row.get("COD_CLASSIFICACAO_DINAMICO"),
        db_row.get("CLASSIFICACAO_EXEC_META"),
        db_row.get("CLASSIFICACAO_PREV_META"),
    )
    nome_equipe = first_non_empty(db_row.get("NOME_EQUIPE"), db_row.get("NOME"))

    primeiro_atend_raw = first_non_empty(
        db_row.get("PRIMEIRO_ATENDIMENTO"),
        db_row.get("1Âº Atendimento"),
        db_row.get("1º Atendimento"),
    )
    ultimo_atend_raw = first_non_empty(db_row.get("ULTIMO_ATENDIMENTO"), db_row.get("Ult. Atendimento"))
    inicio_refeicao_raw = first_non_empty(
        db_row.get("_INICIO_REFEICAO_ANY"),
        db_row.get("INICIO_REFEICAO"),
        db_row.get("INICIO REFEICAO"),
        db_row.get("INICIO REFEIÇÃO"),
    )
    termino_refeicao_raw = first_non_empty(
        db_row.get("_TERMINO_REFEICAO_ANY"),
        db_row.get("TERMINO_REFEICAO"),
        db_row.get("TERMINO REFEICAO"),
        db_row.get("TERMINO REFEIÇÃO"),
    )
    primeiro_atend = extract_hhmm(primeiro_atend_raw) or str(primeiro_atend_raw or "")
    ultimo_atend = extract_hhmm(ultimo_atend_raw) or str(ultimo_atend_raw or "")
    inicio_refeicao = extract_hhmm(inicio_refeicao_raw) or str(inicio_refeicao_raw or "")
    termino_refeicao = extract_hhmm(termino_refeicao_raw) or str(termino_refeicao_raw or "")
    jornada_prod = compute_jornada_produtiva(db_row)
    status_jornada = compute_status_jornada(db_row)

    return {
        "Data": data,
        "Hora": hora,
        "hora_atualizacao": hora_atualizacao_raw,
        "Meta Prog.": meta_prog,
        "Executados": db_row.get("EXECUTADOS", ""),
        "Produtivos": db_row.get("PRODUTIVOS", ""),
        "Nome": nome_equipe,
        "Cód.UO": cod_uo,
        "CÃ³d.UO": cod_uo,
        "CÃƒÂ³d.UO": cod_uo,
        "Cód. Equipe": cod_equipe,
        "CÃ³d. Equipe": cod_equipe,
        "CÃƒÂ³d. Equipe": cod_equipe,
        "NUM_EQUIPE": num_equipe,
        "SUPERVISOR - SETOR": normalize_spaces(db_row.get("NOME_SUPERVISOR", "")),
        "LIDER DE POSTO - SETOR": normalize_spaces(db_row.get("NOME_LIDER", "")),
        "CONTROLADOR - SETOR": normalize_spaces(db_row.get("NOME_CONTROLADOR", "")),
        "Classificação": classificacao,
        "ClassificaÃ§Ã£o": classificacao,
        "Produção": producao,
        "ProduÃ§Ã£o": producao,
        "ProduÃƒÂ§ÃƒÂ£o": producao,
        "1Âº Atendimento": primeiro_atend,
        "1º Atendimento": primeiro_atend,
        "Ult. Atendimento": ultimo_atend,
        "INICIO_JORNADA": extract_hhmm(db_row.get("INICIO_JORNADA")) or db_row.get("INICIO_JORNADA", ""),
        "INICIO_REFEICAO": inicio_refeicao,
        "TERMINO_REFEICAO": termino_refeicao,
        "PRIMEIRO_ATENDIMENTO": extract_hhmm(db_row.get("PRIMEIRO_ATENDIMENTO")) or db_row.get("PRIMEIRO_ATENDIMENTO", ""),
        "ULTIMO_ATENDIMENTO": extract_hhmm(db_row.get("ULTIMO_ATENDIMENTO")) or db_row.get("ULTIMO_ATENDIMENTO", ""),
        "Jornada Produtiva": jornada_prod,
        "Status Jornada": status_jornada,
        "OBS": normalize_spaces(db_row.get("OBS", "")),
    }


def compact_report_row(row):
    keys = [
        "Data",
        "Hora",
        "hora_atualizacao",
        "Meta Prog.",
        "Executados",
        "Produtivos",
        "Nome",
        "Cód.UO",
        "Cód. Equipe",
        "NUM_EQUIPE",
        "SUPERVISOR - SETOR",
        "LIDER DE POSTO - SETOR",
        "CONTROLADOR - SETOR",
        "Classificação",
        "Produção",
        "1º Atendimento",
        "Ult. Atendimento",
        "INICIO_JORNADA",
        "INICIO_REFEICAO",
        "TERMINO_REFEICAO",
        "PRIMEIRO_ATENDIMENTO",
        "ULTIMO_ATENDIMENTO",
        "Jornada Produtiva",
        "Status Jornada",
        "OBS",
    ]
    return {key: row.get(key, "") for key in keys}


def execute_query(sql, params=None, dictionary=True):
    connection = get_db_connection()
    try:
        cursor = connection.cursor(dictionary=dictionary)
        cursor.execute(sql, params or [])
        rows = cursor.fetchall()
        cursor.close()
        return rows
    finally:
        connection.close()


def execute_login_query(sql, params=None, dictionary=True):
    connection = get_login_db_connection()
    try:
        cursor = connection.cursor(dictionary=dictionary)
        cursor.execute(sql, params or [])
        rows = cursor.fetchall()
        cursor.close()
        return rows
    finally:
        connection.close()


def get_login_table_columns(table):
    quoted_table = quote_qualified_table_name(table)
    rows = execute_login_query(f"SHOW COLUMNS FROM {quoted_table}")
    return [row.get("Field") for row in rows if row.get("Field")]


def is_truthy_db_value(value):
    if value is None:
        return False
    s = str(value).strip().lower()
    return s in {"1", "true", "sim", "s", "ativo", "active", "a"}


def ensure_state_table(connection, table: str):
    cursor = connection.cursor()
    cursor.execute(
        f''' 
        CREATE TABLE IF NOT EXISTS `{table}` (
            context_key VARCHAR(255) NOT NULL,
            data_ref VARCHAR(20) NULL,
            uo VARCHAR(50) NULL,
            tipo_visao VARCHAR(50) NULL,
            supervisor VARCHAR(255) NULL,
            payload_json LONGTEXT NOT NULL,
            updated_at DATETIME NOT NULL,
            PRIMARY KEY (context_key)
        )
        '''
    )
    cursor.close()


def ensure_history_acordos_table(connection, table: str):
    cursor = connection.cursor()
    cursor.execute(
        f''' 
        CREATE TABLE IF NOT EXISTS `{table}` (
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
        '''
    )
    cursor.close()


def ensure_history_justificativas_table(connection, table: str):
    cursor = connection.cursor()
    cursor.execute(
        f''' 
        CREATE TABLE IF NOT EXISTS `{table}` (
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
        '''
    )
    cursor.close()


@app.route("/api/health")
def health():
    try:
        execute_query("SELECT 1")
        return jsonify({"ok": True, "mysql": True, "time": datetime.datetime.utcnow().isoformat() + "Z"})
    except Exception as error:
        return jsonify({"ok": False, "mysql": False, "error": str(error)}), 500


@app.route("/api/status/dados")
def status_dados():
    try:
        report_table = sanitize_table_name(require_env("MYSQL_TABLE"))
        controle_table = sanitize_table_name_unicode(os.getenv("MYSQL_TABLE_CONTROLE_SERVICO", "controle_servico"))
        codx_table = sanitize_table_name(os.getenv("MYSQL_TABLE_CODX", "report_csc_cod_x"))

        agora = execute_query(
            """
            SELECT
              DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s') AS now_mysql,
              DATE_FORMAT(NOW(), '%d/%m/%Y %H:%i:%s') AS now_br,
              DATE_FORMAT(CURDATE(), '%d/%m/%Y') AS hoje_br,
              HOUR(NOW()) AS hora_atual,
              @@system_time_zone AS system_tz,
              TIMEDIFF(NOW(), UTC_TIMESTAMP()) AS offset_mysql
            """
        )[0]

        report_ultima_data_rows = execute_query(
            f"""
            SELECT DATA, COUNT(*) AS total_linhas, MAX(hora_atualizacao) AS ultima_hora, MAX(id) AS max_id
            FROM `{report_table}`
            GROUP BY DATA
            ORDER BY STR_TO_DATE(DATA, '%d/%m/%Y') DESC, DATA DESC
            LIMIT 1
            """
        )
        report_ultima_data = report_ultima_data_rows[0] if report_ultima_data_rows else {}
        report_ultima_hora = {}
        if report_ultima_data.get("DATA") is not None and report_ultima_data.get("ultima_hora") is not None:
            rows_hora = execute_query(
                f"""
                SELECT COUNT(*) AS total_linhas, MIN(id) AS min_id, MAX(id) AS max_id
                FROM `{report_table}`
                WHERE DATA = %s AND hora_atualizacao = %s
                """,
                [report_ultima_data.get("DATA"), report_ultima_data.get("ultima_hora")],
            )
            report_ultima_hora = rows_hora[0] if rows_hora else {}

        controle = execute_query(
            f"""
            SELECT
              COUNT(*) AS total_linhas,
              DATE_FORMAT(MAX(DATA_ATUALIZACAO), '%Y-%m-%d %H:%i:%s') AS ultima_atualizacao,
              DATE_FORMAT(MAX(DATA_ATUALIZACAO), '%d/%m/%Y %H:%i:%s') AS ultima_atualizacao_br,
              TIMESTAMPDIFF(MINUTE, MAX(DATA_ATUALIZACAO), NOW()) AS atraso_minutos,
              DATE_FORMAT(MAX(DATA_DESIGNACAO), '%d/%m/%Y %H:%i:%s') AS ultima_designacao_br,
              DATE_FORMAT(MAX(DATA_ACIONAMENTO), '%d/%m/%Y %H:%i:%s') AS ultimo_acionamento_br,
              DATE_FORMAT(MAX(DATA_TERMINO_REAL), '%d/%m/%Y %H:%i:%s') AS ultimo_encerramento_br
            FROM `{controle_table}`
            """
        )[0]

        codx = execute_query(f"SELECT COUNT(*) AS total_linhas, MAX(id) AS max_id FROM `{codx_table}`")[0]

        report_hora_atual = int(agora.get("hora_atual") or 0)
        report_ultima_hora_num = int(report_ultima_data.get("ultima_hora") if report_ultima_data.get("ultima_hora") is not None else -1)
        report_eh_hoje = str(report_ultima_data.get("DATA") or "") == str(agora.get("hoje_br") or "")
        report_atraso_horas = max(report_hora_atual - report_ultima_hora_num, 0) if report_eh_hoje and report_ultima_hora_num >= 0 else None
        report_status = "atrasado" if (not report_eh_hoje or report_atraso_horas is None or report_atraso_horas >= 2) else ("atencao" if report_atraso_horas >= 1 else "ok")

        controle_atraso = int(controle.get("atraso_minutos") or 0)
        controle_status = "atrasado" if not controle.get("ultima_atualizacao") or controle_atraso >= 90 else ("atencao" if controle_atraso >= 60 else "ok")

        return jsonify({
            "ok": True,
            "timezone": {
                "label": "Horário de Brasília",
                "system": agora.get("system_tz") or "",
                "offset": str(agora.get("offset_mysql") or "-03:00:00"),
                "now": agora.get("now_mysql") or "",
                "now_br": agora.get("now_br") or "",
            },
            "report_csc_hoje": {
                "table": report_table,
                "status": report_status,
                "ultima_data": report_ultima_data.get("DATA") or "",
                "ultima_hora": report_ultima_data.get("ultima_hora"),
                "atraso_horas": report_atraso_horas,
                "total_dia": report_ultima_data.get("total_linhas") or 0,
                "total_ultima_hora": report_ultima_hora.get("total_linhas") or 0,
                "min_id_ultima_hora": report_ultima_hora.get("min_id"),
                "max_id": report_ultima_data.get("max_id"),
            },
            "controle_servico": {
                "table": controle_table,
                "status": controle_status,
                "ultima_atualizacao": controle.get("ultima_atualizacao") or "",
                "ultima_atualizacao_br": controle.get("ultima_atualizacao_br") or "",
                "atraso_minutos": controle.get("atraso_minutos"),
                "total_linhas": controle.get("total_linhas") or 0,
                "ultima_designacao_br": controle.get("ultima_designacao_br") or "",
                "ultimo_acionamento_br": controle.get("ultimo_acionamento_br") or "",
                "ultimo_encerramento_br": controle.get("ultimo_encerramento_br") or "",
            },
            "report_csc_cod_x": {
                "table": codx_table,
                "total_linhas": codx.get("total_linhas") or 0,
                "max_id": codx.get("max_id"),
            },
        })
    except Exception as error:
        return jsonify({"ok": False, "error": str(error)}), 500


@app.route("/api/weather")
def weather():
    return jsonify({
        "ok": True,
        "location": os.getenv("WEATHER_LOCATION", "Belo Horizonte/MG"),
        "temperature": os.getenv("WEATHER_TEMPERATURE", "22.0°C"),
        "condition": os.getenv("WEATHER_CONDITION", "Nublado"),
        "icon": os.getenv("WEATHER_ICON", "☁️"),
    })


@app.route("/api/login", methods=["POST"])
def login():
    try:
        body = request.get_json(silent=True) or {}
        usuario = str(body.get("usuario", "") or "").strip()
        senha = str(body.get("senha", "") or "").strip()

        if not usuario:
            return jsonify({"ok": False, "error": "Informe seu usuário."}), 400

        table = os.getenv("MYSQL_LOGIN_TABLE", "usuario")
        columns = get_login_table_columns(table)
        user_col = pick_column(columns, [
            os.getenv("MYSQL_LOGIN_USER_FIELD", ""),
            "usuario",
            "user",
            "username",
            "login",
            "matricula",
            "nome_usuario",
        ])
        pass_col = pick_column(columns, [
            os.getenv("MYSQL_LOGIN_PASSWORD_FIELD", ""),
            "senha",
            "password",
            "pass",
        ])
        active_col = pick_column(columns, [
            os.getenv("MYSQL_LOGIN_ACTIVE_FIELD", ""),
            "ativo",
            "active",
            "status",
        ])

        if not user_col:
            return jsonify({"ok": False, "error": "Tabela de login sem coluna de usuário reconhecida."}), 500

        quoted_table = quote_qualified_table_name(table)
        rows = execute_login_query(
            f"SELECT * FROM {quoted_table} WHERE `{user_col}` = %s LIMIT 1",
            [usuario],
        )
        if not rows:
            return jsonify({"ok": False, "error": "Usuário ou senha inválidos."}), 401

        row = rows[0]
        if active_col and not is_truthy_db_value(row.get(active_col)):
            return jsonify({"ok": False, "error": "Usuário inativo."}), 403

        stored_password = str(row.get(pass_col, "") or "").strip() if pass_col else ""
        if stored_password and senha != stored_password:
            return jsonify({"ok": False, "error": "Usuário ou senha inválidos."}), 401

        return jsonify({
            "ok": True,
            "usuario": usuario,
            "redirect": os.getenv("LOGIN_REDIRECT", "/index"),
        })
    except Exception as error:
        return jsonify({"ok": False, "error": str(error)}), 500


@app.route("/api/columns")
def columns():
    try:
        table = sanitize_table_name(require_env("MYSQL_TABLE"))
        rows = execute_query(f"SHOW COLUMNS FROM `{table}`")
        return jsonify({"table": table, "columns": rows})
    except Exception as error:
        return jsonify({"error": str(error)}), 500


@app.route("/api/rows")
def rows():
    try:
        table = sanitize_table_name(require_env("MYSQL_TABLE"))
        limit = int(request.args.get("limit", "50"))
        offset = int(request.args.get("offset", "0"))
        if limit < 1 or limit > 500 or offset < 0:
            raise ValueError("Parâmetros inválidos: limit/offset.")

        rows = execute_query(
            f"SELECT * FROM `{table}` LIMIT %s OFFSET %s",
            [limit, offset],
        )
        return jsonify({"table": table, "limit": limit, "offset": offset, "rows": rows})
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    except Exception as error:
        return jsonify({"error": str(error)}), 500


@app.route("/api/controle-servico/columns")
def controle_servico_columns():
    try:
        table_raw = os.getenv("MYSQL_TABLE_CONTROLE_SERVICO", "controle_servico")
        table = sanitize_table_name_unicode(table_raw)
        rows = execute_query(f"SHOW COLUMNS FROM `{table}`")
        return jsonify({"ok": True, "table": table, "columns": rows})
    except Exception as error:
        return jsonify({"ok": False, "error": str(error)}), 500


@app.route("/api/controle-servico/sample")
def controle_servico_sample():
    try:
        table_raw = os.getenv("MYSQL_TABLE_CONTROLE_SERVICO", "controle_servico")
        table = sanitize_table_name_unicode(table_raw)
        limit = int(request.args.get("limit", "5"))
        if limit < 1 or limit > 50:
            raise ValueError("Parametro invalido: limit.")

        rows = execute_query(f"SELECT * FROM `{table}` LIMIT %s", [limit])
        return jsonify({"ok": True, "table": table, "count": len(rows), "rows": rows})
    except ValueError as error:
        return jsonify({"ok": False, "error": str(error)}), 400
    except Exception as error:
        return jsonify({"ok": False, "error": str(error)}), 500


@app.route("/api/controle-servico")
def controle_servico():
    try:
        table_raw = os.getenv("MYSQL_TABLE_CONTROLE_SERVICO", "controle_servico")
        table = sanitize_table_name_unicode(table_raw)
        columns = get_table_columns(table)

        where = []
        params = []
        where_sem_uo = []
        params_sem_uo = []

        data = request.args.get("data")
        uo = request.args.get("uo")
        cod_equipe = request.args.get("codEquipe")

        date_cols = []
        col_data_atualizacao = pick_column(columns, ["DATA_ATUALIZACAO", "DATA ATUALIZACAO", "DATA_ATUALIZAÇÃO"])
        if not col_data_atualizacao:
            return jsonify({"ok": False, "error": "Coluna DATA_ATUALIZACAO nao encontrada na tabela de controle de servicos."}), 400
        date_cols.append(col_data_atualizacao)

        if data:
            add_date_filter_for_columns(data, date_cols, where, params)
            add_date_filter_for_columns(data, date_cols, where_sem_uo, params_sem_uo)

        if request.args.get("dataInicio"):
            data_inicio = str(request.args.get("dataInicio"))[:10]
            where.append(f"DATE(`{col_data_atualizacao}`) >= %s")
            params.append(data_inicio)
            where_sem_uo.append(f"DATE(`{col_data_atualizacao}`) >= %s")
            params_sem_uo.append(data_inicio)

        if request.args.get("dataFim"):
            data_fim = str(request.args.get("dataFim"))[:10]
            where.append(f"DATE(`{col_data_atualizacao}`) <= %s")
            params.append(data_fim)
            where_sem_uo.append(f"DATE(`{col_data_atualizacao}`) <= %s")
            params_sem_uo.append(data_fim)

        col_uo = pick_column(columns, ["COD_UO", "UO"])
        usou_uo = bool(uo and col_uo)
        if uo and col_uo:
            where.append(f"`{col_uo}` = %s")
            params.append(str(uo))

        col_eq = pick_column(columns, ["COD_EQUIPE_WM", "COD_EQUIPE", "NUM_EQUIPE"])
        if cod_equipe and col_eq:
            where.append(f"`{col_eq}` = %s")
            params.append(str(cod_equipe))
            where_sem_uo.append(f"`{col_eq}` = %s")
            params_sem_uo.append(str(cod_equipe))

        limit = int(request.args.get("limit", "20000"))
        if limit < 1 or limit > 50000:
            raise ValueError("Parâmetro inválido: limit.")

        sql = f"SELECT * FROM `{table}`"
        if where:
            sql += f" WHERE {' AND '.join(where)}"

        order_col = pick_column(columns, ["DATA_ATUALIZACAO", "DATA_ACIONAMENTO", "DATA_DESIGNACAO", "DATA_TERMINO_REAL", "DATA_LOCALIZACAO", "DATA", "ID", "id"])
        if order_col:
            sql += f" ORDER BY `{order_col}` ASC"

        sql += " LIMIT %s"
        params.append(limit)

        rows = execute_query(sql, params)

        if not rows and usou_uo:
            sql_sem_uo = f"SELECT * FROM `{table}`"
            if where_sem_uo:
                sql_sem_uo += f" WHERE {' AND '.join(where_sem_uo)}"
            if order_col:
                sql_sem_uo += f" ORDER BY `{order_col}` ASC"
            sql_sem_uo += " LIMIT %s"
            params_sem_uo.append(limit)
            rows = execute_query(sql_sem_uo, params_sem_uo)

        return jsonify({"ok": True, "table": table, "count": len(rows), "rows": rows})
    except ValueError as error:
        return jsonify({"ok": False, "error": str(error)}), 400
    except Exception as error:
        return jsonify({"ok": False, "error": str(error)}), 500


@app.route("/api/folha-ponto")
def folha_ponto():
    try:
        database = sanitize_table_name_unicode(os.getenv("MYSQL_DATABASE_FOLHA_PONTO", "equipe_func"))
        table = sanitize_table_name_unicode(os.getenv("MYSQL_TABLE_FOLHA_PONTO", "folha_ponto"))
        vinculo_table = sanitize_table_name_unicode(os.getenv("MYSQL_TABLE_EQUIPE_FUNCIONARIO", "equipe_funcionario"))

        where = ["fp.DATA IS NOT NULL"]
        params = []

        if request.args.get("dataInicio"):
            where.append("DATE(fp.DATA) >= %s")
            params.append(str(request.args.get("dataInicio"))[:10])
        if request.args.get("dataFim"):
            where.append("DATE(fp.DATA) <= %s")
            params.append(str(request.args.get("dataFim"))[:10])
        if request.args.get("uo"):
            uo_filter = re.sub(r"[^\d]", "", str(request.args.get("uo")))
            where.append("ef.COD_UO = %s")
            params.append(uo_filter)

        limit_raw = request.args.get("limit", "50000")
        limit = max(1, min(100000, int(limit_raw)))
        params.append(limit)

        where_clause = ' AND '.join(where)

        sql = """
            SELECT
              fp.*,
              ef.COD_EQUIPE,
              ef.COD_UO,
              ef.NOME_EQUIPE,
              ef.NOME_FUNCIONARIO,
              ef.STATUS AS STATUS_EQUIPE_FUNC
            FROM `%s`.`%s` fp
            LEFT JOIN `%s`.`%s` ef
              ON ef.COD_FUNC = fp.COD_FUNC
             AND (ef.DATA_FIM IS NULL OR ef.DATA_FIM >= fp.DATA)
            WHERE %s
            ORDER BY fp.DATA ASC, ef.COD_UO ASC, ef.COD_EQUIPE ASC, fp.COD_FUNC ASC
            LIMIT %%s
            """ % (database, table, database, vinculo_table, where_clause)

        rows = execute_query(sql, params)
        return jsonify({"ok": True, "database": database, "table": table, "count": len(rows), "rows": rows})
    except ValueError as error:
        return jsonify({"ok": False, "error": str(error)}), 400
    except Exception as error:
        return jsonify({"ok": False, "error": str(error)}), 500


@app.route("/api/controle-servico/designados-resumo")
def controle_servico_designados_resumo():
    try:
        table_raw = os.getenv("MYSQL_TABLE_CONTROLE_SERVICO", "controle_servico")
        table = sanitize_table_name_unicode(table_raw)
        columns = get_table_columns(table)

        col_data_atualizacao = pick_column(columns, ["DATA_ATUALIZACAO", "DATA ATUALIZACAO", "DATA_ATUALIZAÇÃO"])
        col_equipe = pick_column(columns, ["COD_EQUIPE_WM", "COD_EQUIPE", "NUM_EQUIPE"])
        col_uo = pick_column(columns, ["COD_UO", "UO"])

        if not col_data_atualizacao:
            return jsonify({"ok": False, "error": "Coluna DATA_ATUALIZACAO nao encontrada na tabela de controle de servicos."}), 400
        if not col_equipe:
            return jsonify({"ok": False, "error": "Coluna de equipe nao encontrada na tabela de controle de servicos."}), 400

        where = []
        params = []
        data = request.args.get("data")
        uo = request.args.get("uo")

        if data:
            add_date_filter_for_columns(data, [col_data_atualizacao], where, params)

        if uo and col_uo:
            where.append(f"`{col_uo}` = %s")
            params.append(str(uo))

        sql = f"SELECT TRIM(CAST(`{col_equipe}` AS CHAR)) AS codigo_equipe, COUNT(*) AS servicos_designados FROM `{table}`"
        if where:
            sql += f" WHERE {' AND '.join(where)}"
        sql += f" GROUP BY TRIM(CAST(`{col_equipe}` AS CHAR)) ORDER BY servicos_designados DESC, codigo_equipe ASC"

        rows = execute_query(sql, params)
        mapa = {}
        for row in rows:
            codigo = str(row.get("codigo_equipe") or "").strip()
            if codigo:
                mapa[codigo] = int(row.get("servicos_designados") or 0)

        return jsonify({
            "ok": True,
            "table": table,
            "filtros": {"data": data or None, "uo": uo or None},
            "count": len(rows),
            "rows": rows,
            "mapa": mapa
        })
    except Exception as error:
        return jsonify({"ok": False, "error": str(error)}), 500


@app.route("/api/controle-servico/resumo-equipes")
def controle_servico_resumo_equipes():
    try:
        table_raw = os.getenv("MYSQL_TABLE_CONTROLE_SERVICO", "controle_servico")
        table = sanitize_table_name_unicode(table_raw)
        columns = get_table_columns(table)

        col_data_atualizacao = pick_column(columns, ["DATA_ATUALIZACAO", "DATA ATUALIZACAO", "DATA_ATUALIZAÇÃO"])
        col_equipe = pick_column(columns, ["COD_EQUIPE_WM", "COD_EQUIPE", "NUM_EQUIPE"])
        col_uo = pick_column(columns, ["COD_UO", "UO"])
        col_produtivo = pick_column(columns, ["PRODUTIVO", "PRODUTIVOS"])
        col_data_designacao = pick_column(columns, ["DATA_DESIGNACAO", "DESIGNACAO", "DATA DESIGNACAO"])
        col_data_acionamento = pick_column(columns, ["DATA_ACIONAMENTO", "ACIONAMENTO", "DATA ACIONAMENTO"])
        col_data_localizacao = pick_column(columns, ["DATA_LOCALIZACAO", "LOCALIZACAO", "DATA LOCALIZACAO"])
        col_data_termino = pick_column(columns, ["DATA_TERMINO_REAL", "ENCERRAMENTO", "DATA_TERMINO"])

        if not col_data_atualizacao:
            return jsonify({"ok": False, "error": "Coluna DATA_ATUALIZACAO nao encontrada na tabela de controle de servicos."}), 400
        if not col_equipe:
            return jsonify({"ok": False, "error": "Coluna de equipe nao encontrada na tabela de controle de servicos."}), 400

        where = []
        params = []
        data = request.args.get("data")
        uo = request.args.get("uo")

        if data:
            add_date_filter_for_columns(data, [col_data_atualizacao], where, params)

        if uo and col_uo:
            where.append(f"`{col_uo}` = %s")
            params.append(str(uo))

        eq_expr = f"TRIM(CAST(`{col_equipe}` AS CHAR))"
        sim_expr = f"UPPER(TRIM(CAST(`{col_produtivo}` AS CHAR))) IN ('T', 'SIM', 'S', '1', 'TRUE')" if col_produtivo else "0 = 1"
        nao_expr = f"UPPER(TRIM(CAST(`{col_produtivo}` AS CHAR))) IN ('F', 'NAO', 'NÃO', 'N', '0', 'FALSE')" if col_produtivo else "0 = 1"
        inicio_expr = f"DATE_FORMAT(MIN(`{col_data_designacao}`), '%H:%i')" if col_data_designacao else "NULL"
        primeiro_expr = f"DATE_FORMAT(MIN(`{col_data_acionamento}`), '%H:%i')" if col_data_acionamento else "NULL"
        ultimo_base_expr = f"COALESCE(`{col_data_termino}`, {f'`{col_data_localizacao}`, ' if col_data_localizacao else ''}{f'`{col_data_acionamento}`' if col_data_acionamento else 'NULL'})"
        ultimo_expr = f"DATE_FORMAT(MAX({ultimo_base_expr}), '%H:%i')"
        jornada_expr = f"CASE WHEN MIN(`{col_data_acionamento}`) IS NULL OR MAX({ultimo_base_expr}) IS NULL THEN NULL ELSE DATE_FORMAT(SEC_TO_TIME(TIMESTAMPDIFF(SECOND, MIN(`{col_data_acionamento}`), MAX({ultimo_base_expr}))), '%H:%i') END" if col_data_acionamento else "NULL"

        sql = f"SELECT {eq_expr} AS codigo_equipe, COUNT(*) AS servicos_designados, SUM(CASE WHEN {sim_expr} THEN 1 ELSE 0 END) AS servicos_produtivos, SUM(CASE WHEN {nao_expr} THEN 1 ELSE 0 END) AS servicos_improdutivos, SUM(CASE WHEN ({sim_expr}) OR ({nao_expr}) THEN 1 ELSE 0 END) AS servicos_realizados, {inicio_expr} AS inicio_jornada, {primeiro_expr} AS primeiro_atendimento, {ultimo_expr} AS ultimo_atendimento, {jornada_expr} AS jornada_produtiva FROM `{table}`"
        if where:
            sql += f" WHERE {' AND '.join(where)}"
        sql += f" GROUP BY {eq_expr} ORDER BY servicos_designados DESC, codigo_equipe ASC"

        rows = execute_query(sql, params)
        mapa = {}
        for row in rows:
            codigo = str(row.get("codigo_equipe") or "").strip()
            if codigo:
                mapa[codigo] = {
                    "servicosDesignados": int(row.get("servicos_designados") or 0),
                    "servicosProdutivos": int(row.get("servicos_produtivos") or 0),
                    "servicosImprodutivos": int(row.get("servicos_improdutivos") or 0),
                    "servicosRealizados": int(row.get("servicos_realizados") or 0),
                    "inicioJornada": row.get("inicio_jornada") or "-",
                    "primeiroAtend": row.get("primeiro_atendimento") or "-",
                    "ultimoAtend": row.get("ultimo_atendimento") or "-",
                    "jornadaProd": row.get("jornada_produtiva") or "-"
                }

        return jsonify({
            "ok": True,
            "table": table,
            "filtros": {"data": data or None, "uo": uo or None},
            "count": len(rows),
            "rows": rows,
            "mapa": mapa
        })
    except Exception as error:
        return jsonify({"ok": False, "error": str(error)}), 500


@app.route("/api/historico/acordos", methods=["POST"])
def historico_acordos():
    try:
        body = request.get_json(silent=True) or {}
        table = get_history_table_name("MYSQL_TABLE_HIST_ACORDOS", "historico_acordos")
        connection = get_db_connection()
        ensure_history_acordos_table(connection, table)
        cursor = connection.cursor()

        payload = [
            str(body.get("data_ref", "") or "").strip(),
            str(body.get("uo", "") or "").strip() or None,
            str(body.get("tipo_visao", "") or "").strip() or None,
            str(body.get("supervisor", "") or "").strip() or None,
            str(body.get("hora_referencia", "") or "").strip(),
            str(body.get("codigo_equipe", "") or "").strip(),
            str(body.get("equipe", "") or "").strip() or None,
            str(body.get("acao", "") or "").strip().upper(),
            body.get("meta_dia_acordo"),
            body.get("meta_acordo"),
            body.get("prod_acordo"),
            str(body.get("faixa_acordo", "") or "").strip() or None,
            body.get("perc_acordo"),
            str(body.get("usuario_salvo", "") or "").strip() or None,
            to_mysql_datetime(body.get("salvo_em")),
        ]

        if not payload[0] or not payload[2] or not payload[4] or not payload[5] or not payload[7]:
            cursor.close()
            connection.close()
            return jsonify({"ok": False, "error": "Campos obrigatorios ausentes para historico de acordos."}), 400

        cursor.execute(
            f"""
            INSERT INTO `{table}` (
                data_ref, uo, tipo_visao, supervisor, hora_referencia,
                codigo_equipe, equipe, acao, meta_dia_acordo, meta_acordo,
                prod_acordo, faixa_acordo, perc_acordo, usuario_salvo, salvo_em
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """,
            payload,
        )
        cursor.close()
        connection.close()
        return jsonify({"ok": True, "table": table})
    except Exception as error:
        return jsonify({"ok": False, "error": str(error)}), 500


@app.route("/api/historico/acordos", methods=["GET"])
def historico_acordos_get():
    try:
        table = get_history_table_name("MYSQL_TABLE_HIST_ACORDOS", "historico_acordos")
        connection = get_db_connection()
        ensure_history_acordos_table(connection, table)
        connection.close()

        periodo = str(request.args.get("periodo", "diario") or "").strip().lower()
        data_ref = str(request.args.get("data", "") or "").strip()
        mes_ref = str(request.args.get("mes", "") or "").strip()
        uo = str(request.args.get("uo", "") or "").strip()
        supervisor = str(request.args.get("supervisor", "") or "").strip()
        tipo_visao = str(request.args.get("tipo_visao", "") or "").strip()
        limit = int(request.args.get("limit", "1000"))
        if limit < 1 or limit > 5000:
            raise ValueError("Parametro invalido: limit.")

        where = []
        params = []
        if uo:
            where.append("uo = %s")
            params.append(uo)
        if supervisor:
            where.append("UPPER(TRIM(COALESCE(supervisor, ''))) = %s")
            params.append(supervisor.upper())
        if tipo_visao:
            where.append("tipo_visao = %s")
            params.append(tipo_visao)

        sql = f"SELECT * FROM `{table}`"
        if where:
            sql += f" WHERE {' AND '.join(where)}"
        sql += " ORDER BY salvo_em DESC LIMIT %s"
        params.append(limit)

        rows = execute_query(sql, params)
        filtradas = []
        for row in rows:
            data_normalizada = parse_flexible_date_ref(row.get("data_ref"))
            if not data_normalizada:
                continue

            if periodo == "mensal":
                if not mes_ref or data_normalizada[:7] != mes_ref:
                    continue
            elif periodo == "semanal":
                if data_ref:
                    intervalo = get_week_range_from_iso_date(data_ref)
                    if intervalo and not (intervalo["start"] <= data_normalizada <= intervalo["end"]):
                        continue
            elif data_ref and data_normalizada != data_ref:
                continue

            row["data_ref_iso"] = data_normalizada
            filtradas.append(row)

        return jsonify({
            "ok": True,
            "table": table,
            "periodo": periodo,
            "filtros": {
                "data": data_ref or None,
                "mes": mes_ref or None,
                "uo": uo or None,
                "supervisor": supervisor or None,
                "tipo_visao": tipo_visao or None,
            },
            "count": len(filtradas),
            "rows": filtradas,
        })
    except ValueError as error:
        return jsonify({"ok": False, "error": str(error)}), 400
    except Exception as error:
        return jsonify({"ok": False, "error": str(error)}), 500


@app.route("/api/historico/justificativas", methods=["POST"])
def historico_justificativas():
    try:
        body = request.get_json(silent=True) or {}
        table = get_history_table_name("MYSQL_TABLE_HIST_JUSTIFICATIVAS", "historico_justificativas")
        connection = get_db_connection()
        ensure_history_justificativas_table(connection, table)
        cursor = connection.cursor()

        payload = [
            str(body.get("data_ref", "") or "").strip(),
            str(body.get("uo", "") or "").strip() or None,
            str(body.get("tipo_visao", "") or "").strip() or None,
            str(body.get("supervisor", "") or "").strip() or None,
            str(body.get("hora_referencia", "") or "").strip(),
            str(body.get("codigo_equipe", "") or "").strip(),
            str(body.get("equipe", "") or "").strip() or None,
            str(body.get("justificativa", "") or "") or None,
            str(body.get("motivo_grupo", "") or "") or None,
            json.dumps(body.get("motivo_grupos")) if isinstance(body.get("motivo_grupos"), list) else None,
            str(body.get("motivo_descricao", "") or "") or None,
            json.dumps(body.get("motivo_descricoes")) if isinstance(body.get("motivo_descricoes"), list) else None,
            str(body.get("detalhe", "") or "") or None,
            str(body.get("acao", "SALVAR") or "SALVAR").strip().upper(),
            str(body.get("usuario_salvo", "") or "").strip() or None,
            to_mysql_datetime(body.get("salvo_em")),
        ]

        if not payload[0] or not payload[2] or not payload[4] or not payload[5] or not payload[13]:
            cursor.close()
            connection.close()
            return jsonify({"ok": False, "error": "Campos obrigatorios ausentes para historico de justificativas."}), 400

        cursor.execute(
            f"""
            INSERT INTO `{table}` (
                data_ref, uo, tipo_visao, supervisor, hora_referencia,
                codigo_equipe, equipe, justificativa, motivo_grupo, motivo_grupos,
                motivo_descricao, motivo_descricoes, detalhe, acao, usuario_salvo, salvo_em
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """,
            payload,
        )
        cursor.close()
        connection.close()
        return jsonify({"ok": True, "table": table})
    except Exception as error:
        return jsonify({"ok": False, "error": str(error)}), 500


@app.route("/api/historico/justificativas", methods=["GET"])
def historico_justificativas_get():
    try:
        table = get_history_table_name("MYSQL_TABLE_HIST_JUSTIFICATIVAS", "historico_justificativas")
        connection = get_db_connection()
        ensure_history_justificativas_table(connection, table)
        connection.close()

        periodo = str(request.args.get("periodo", "diario") or "").strip().lower()
        data_ref = str(request.args.get("data", "") or "").strip()
        mes_ref = str(request.args.get("mes", "") or "").strip()
        uo = str(request.args.get("uo", "") or "").strip()
        supervisor = str(request.args.get("supervisor", "") or "").strip()
        tipo_visao = str(request.args.get("tipo_visao", "") or "").strip()
        limit = int(request.args.get("limit", "1000"))
        if limit < 1 or limit > 5000:
            raise ValueError("Parametro invalido: limit.")

        where = []
        params = []
        if uo:
            where.append("uo = %s")
            params.append(uo)
        if supervisor:
            where.append("UPPER(TRIM(COALESCE(supervisor, ''))) LIKE %s")
            params.append(f"%{supervisor.upper()}%")
        if tipo_visao:
            where.append("tipo_visao = %s")
            params.append(tipo_visao)

        sql = f"SELECT * FROM `{table}`"
        if where:
            sql += f" WHERE {' AND '.join(where)}"
        sql += " ORDER BY salvo_em DESC LIMIT %s"
        params.append(limit)

        rows = execute_query(sql, params)
        filtradas = []
        for row in rows:
            data_normalizada = parse_flexible_date_ref(row.get("data_ref"))
            if not data_normalizada:
                continue

            if periodo == "mensal":
                if not mes_ref or data_normalizada[:7] != mes_ref:
                    continue
            elif periodo == "semanal":
                if data_ref:
                    intervalo = get_week_range_from_iso_date(data_ref)
                    if intervalo and not (intervalo["start"] <= data_normalizada <= intervalo["end"]):
                        continue
            elif data_ref and data_normalizada != data_ref:
                continue

            row["data_ref_iso"] = data_normalizada
            filtradas.append(row)

        return jsonify({
            "ok": True,
            "table": table,
            "periodo": periodo,
            "filtros": {
                "data": data_ref or None,
                "mes": mes_ref or None,
                "uo": uo or None,
                "supervisor": supervisor or None,
                "tipo_visao": tipo_visao or None,
            },
            "count": len(filtradas),
            "rows": filtradas,
        })
    except ValueError as error:
        return jsonify({"ok": False, "error": str(error)}), 400
    except Exception as error:
        return jsonify({"ok": False, "error": str(error)}), 500


@app.route("/api/state/acordos")
def state_acordos():
    try:
        table = get_state_table_name()
        connection = get_db_connection()
        ensure_state_table(connection, table)
        cursor = connection.cursor(dictionary=True)
        cursor.execute(f"SELECT context_key, payload_json, updated_at FROM `{table}` ORDER BY updated_at DESC")
        rows = cursor.fetchall()
        cursor.close()
        connection.close()

        base = {}
        for row in rows:
            try:
                payload = json.loads(str(row.get("payload_json") or "{}"))
                if payload and isinstance(payload, dict):
                    base[str(row.get("context_key"))] = payload
            except Exception:
                pass

        return jsonify({"ok": True, "table": table, "base": base})
    except Exception as error:
        return jsonify({"ok": False, "error": str(error)}), 500


@app.route("/api/state/acordos/item", methods=["POST"])
def state_acordos_item():
    try:
        body = request.get_json(silent=True) or {}
        context_key = str(body.get("context_key", "") or "").strip()
        payload = body.get("payload")
        data_ref = str(body.get("data_ref", "") or "").strip() or None
        uo = str(body.get("uo", "") or "").strip() or None
        tipo_visao = str(body.get("tipo_visao", "") or "").strip() or None
        supervisor = str(body.get("supervisor", "") or "").strip() or None

        if not context_key:
            return jsonify({"ok": False, "error": "context_key obrigatorio."}), 400

        table = get_state_table_name()
        connection = get_db_connection()
        ensure_state_table(connection, table)
        cursor = connection.cursor()

        if not payload or not isinstance(payload, dict) or isinstance(payload, list):
            cursor.execute(f"DELETE FROM `{table}` WHERE context_key = %s", [context_key])
            cursor.close()
            connection.close()
            return jsonify({"ok": True, "table": table, "deleted": True, "context_key": context_key})

        cursor.execute(
            f"""
            INSERT INTO `{table}` (
                context_key, data_ref, uo, tipo_visao, supervisor, payload_json, updated_at
            ) VALUES (%s, %s, %s, %s, %s, %s, NOW())
            ON DUPLICATE KEY UPDATE
                data_ref = VALUES(data_ref),
                uo = VALUES(uo),
                tipo_visao = VALUES(tipo_visao),
                supervisor = VALUES(supervisor),
                payload_json = VALUES(payload_json),
                updated_at = NOW()
            """,
            [
                context_key,
                data_ref,
                uo,
                tipo_visao,
                supervisor,
                json.dumps(payload),
            ],
        )
        cursor.close()
        connection.close()
        return jsonify({"ok": True, "table": table, "context_key": context_key})
    except Exception as error:
        return jsonify({"ok": False, "error": str(error)}), 500


@app.route("/api/state/acordos/base", methods=["POST"])
def state_acordos_base():
    try:
        body = request.get_json(silent=True) or {}
        base = body.get("base")
        if not base or not isinstance(base, dict):
            return jsonify({"ok": False, "error": "base invalida."}), 400

        table = get_state_table_name()
        connection = get_db_connection(autocommit=False)
        ensure_state_table(connection, table)
        cursor = connection.cursor()

        entries = list(base.items())
        keys = [str(key) for key, _ in entries]

        try:
            if keys:
                placeholders = ", ".join(["%s"] * len(keys))
                cursor.execute(f"DELETE FROM `{table}` WHERE context_key NOT IN ({placeholders})", keys)
            else:
                cursor.execute(f"DELETE FROM `{table}`")

            for context_key, registro in entries:
                registro_dict = registro if isinstance(registro, dict) else {}
                cursor.execute(
                    f"""
                    INSERT INTO `{table}` (
                        context_key, data_ref, uo, tipo_visao, supervisor, payload_json, updated_at
                    ) VALUES (%s, %s, %s, %s, %s, %s, NOW())
                    ON DUPLICATE KEY UPDATE
                        data_ref = VALUES(data_ref),
                        uo = VALUES(uo),
                        tipo_visao = VALUES(tipo_visao),
                        supervisor = VALUES(supervisor),
                        payload_json = VALUES(payload_json),
                        updated_at = NOW()
                    """,
                    [
                        str(context_key),
                        str(registro_dict.get("data", "") or "").strip() or None,
                        str(registro_dict.get("uo", "") or "").strip() or None,
                        str(registro_dict.get("tipoVisao", "") or "").strip() or None,
                        str(registro_dict.get("supervisor", "") or "").strip() or None,
                        json.dumps(registro_dict),
                    ],
                )
            connection.commit()
        except Exception:
            connection.rollback()
            raise
        finally:
            cursor.close()
            connection.close()

        return jsonify({"ok": True, "table": table, "count": len(entries)})
    except Exception as error:
        return jsonify({"ok": False, "error": str(error)}), 500


@app.route("/api/report")
def report():
    try:
        table = sanitize_table_name(require_env("MYSQL_TABLE"))
        where = []
        params = []

        if table.lower() == "report_csc_hoje":
            where.append("DATA IS NOT NULL")
            only_started_journey = str(request.args.get("onlyStartedJourney", os.getenv("MYSQL_ONLY_STARTED_JOURNEY", ""))).lower()
            if only_started_journey in {"true", "1"}:
                where.append("((hora_atualizacao IS NOT NULL) AND ((hora_ini_jornada IS NOT NULL AND hora_ini_jornada <= hora_atualizacao) OR (hora_ini_jornada IS NULL AND INICIO_JORNADA IS NOT NULL AND INICIO_JORNADA <> '' AND CAST(SUBSTRING_INDEX(TRIM(INICIO_JORNADA), ':', 1) AS UNSIGNED) <= hora_atualizacao)))")
            strict_hours = str(request.args.get("strictHours", os.getenv("MYSQL_STRICT_HOURS", ""))).lower()
            if strict_hours in {"true", "1"}:
                where.append("hora_atualizacao IN (9,11,13,15,17)")

        if request.args.get("data"):
            build_data_where(request.args["data"], where, params)
        elif request.args.get("dataStart") or request.args.get("dataEnd"):
            data_start = parse_flexible_date_ref(request.args.get("dataStart"))
            data_end = parse_flexible_date_ref(request.args.get("dataEnd"))
            add_data_range_filter(data_start, data_end, where, params)
        elif table.lower() == "report_csc_hoje":
            where.append(f"DATA = (SELECT MAX(DATA) FROM `{table}` WHERE DATA IS NOT NULL)")
        if request.args.get("uo"):
            where.append("COD_UO = %s")
            params.append(str(request.args["uo"]))

        if table.lower() == "report_csc_hoje":
            where_sql = f" WHERE {' AND '.join(where)}" if where else ""
            meal_where = ["DATA IS NOT NULL"]
            meal_params = []
            if request.args.get("data"):
                build_data_where(request.args["data"], meal_where, meal_params)
            elif request.args.get("dataStart") or request.args.get("dataEnd"):
                data_start = parse_flexible_date_ref(request.args.get("dataStart"))
                data_end = parse_flexible_date_ref(request.args.get("dataEnd"))
                add_data_range_filter(data_start, data_end, meal_where, meal_params)
            else:
                meal_where.append(f"DATA = (SELECT MAX(DATA) FROM `{table}` WHERE DATA IS NOT NULL)")
            if request.args.get("uo"):
                meal_where.append("COD_UO = %s")
                meal_params.append(str(request.args["uo"]))
            meal_condition = (
                "((INICIO_REFEICAO IS NOT NULL AND TRIM(CAST(INICIO_REFEICAO AS CHAR)) <> '') "
                "OR (TERMINO_REFEICAO IS NOT NULL AND TRIM(CAST(TERMINO_REFEICAO AS CHAR)) <> ''))"
            )
            where_meal_sql = f" WHERE {' AND '.join(meal_where)} AND {meal_condition}"
            sql = (
                f"SELECT r.* FROM `{table}` r "
                f"JOIN ("
                f"SELECT MAX(id) AS id FROM `{table}` {where_sql} GROUP BY DATA, COD_UO, COD_EQUIPE, hora_atualizacao "
                f"UNION "
                f"SELECT MAX(id) AS id FROM `{table}` {where_meal_sql} GROUP BY DATA, COD_UO, COD_EQUIPE"
                f") m ON r.id = m.id "
                "ORDER BY r.id ASC"
            )
            params_query = params + meal_params
        else:
            sql = f"SELECT * FROM `{table}`"
            if where:
                sql += f" WHERE {' AND '.join(where)}"
            sql += " ORDER BY id ASC"
            params_query = params

        rows = execute_query(sql, params_query)
        mapped_rows = [map_report_csc_hoje_row(row) for row in rows] if table.lower() == "report_csc_hoje" else rows
        if table.lower() == "report_csc_hoje" and str(request.args.get("compact", "")).lower() in {"true", "1"}:
            mapped_rows = [compact_report_row(row) for row in mapped_rows]
        return jsonify({"table": table, "count": len(mapped_rows), "rows": mapped_rows})
    except Exception as error:
        return jsonify({"error": str(error)}), 500


@app.route("/api/lote-prod")
def lote_prod():
    try:
        database = sanitize_table_name_unicode(os.getenv("MYSQL_DATABASE_LOTE_PROD", "producao"))
        view = sanitize_table_name_unicode(os.getenv("MYSQL_VIEW_LOTE_PROD", "nivel_1_meta"))

        rows = execute_query(
            f"""
            SELECT
              DATA,
              SUM(COALESCE(VALOR_US, 0)) AS VALOR_US,
              SUM(COALESCE(META, 0)) AS META,
              SUM(CASE WHEN ASCII(UPPER(TRIM(CAST(COALESCE(FAIXA_DIA, '') AS CHAR)))) = 68 THEN 1 ELSE 0 END) AS EQUIPES_D
            FROM `{database}`.`{view}`
            WHERE DATA IS NOT NULL
            GROUP BY DATA
            ORDER BY DATA ASC
            """
        )
        return jsonify({"database": database, "view": view, "count": len(rows), "rows": rows})
    except Exception as error:
        return jsonify({"error": str(error)}), 500


@app.route("/api/lote-prod/equipes-d")
def lote_prod_equipes_d():
    try:
        database = sanitize_table_name_unicode(os.getenv("MYSQL_DATABASE_LOTE_PROD", "producao"))
        view = sanitize_table_name_unicode(os.getenv("MYSQL_VIEW_LOTE_PROD", "nivel_1_meta"))

        rows = execute_query(
            f"""
            SELECT
              DATA,
              COD_EQUIPE,
              VALOR_US,
              META,
              VALOR_US_MES,
              META_MES,
              FAIXA_DIA
            FROM `{database}`.`{view}`
            WHERE DATA IS NOT NULL
              AND ASCII(UPPER(TRIM(CAST(COALESCE(FAIXA_DIA, '') AS CHAR)))) = 68
            ORDER BY DATA ASC, COD_EQUIPE ASC
            """
        )
        return jsonify({"database": database, "view": view, "count": len(rows), "rows": rows})
    except Exception as error:
        return jsonify({"error": str(error)}), 500


@app.route("/api/lote-prod/equipes")
def lote_prod_equipes():
    try:
        database = sanitize_table_name_unicode(os.getenv("MYSQL_DATABASE_LOTE_PROD", "producao"))
        view = sanitize_table_name_unicode(os.getenv("MYSQL_VIEW_LOTE_PROD", "nivel_1_meta"))
        where = ["DATA IS NOT NULL"]
        params = []

        if request.args.get("dataInicio"):
            where.append("DATA >= %s")
            params.append(str(request.args.get("dataInicio"))[:10])
        if request.args.get("dataFim"):
            where.append("DATA <= %s")
            params.append(str(request.args.get("dataFim"))[:10])

        if not request.args.get("dataInicio") and not request.args.get("dataFim"):
            rows = execute_query(
                f"""
                SELECT
                  DATA,
                  COD_EQUIPE,
                  VALOR_US,
                  META,
                  VALOR_US_MES,
                  META_MES,
                  FAIXA_DIA
                FROM `{database}`.`{view}`
                WHERE DATA IS NOT NULL
                  AND DATA >= (
                    SELECT DATE_SUB(MAX(DATA), INTERVAL 31 DAY)
                    FROM `{database}`.`{view}`
                    WHERE DATA IS NOT NULL
                  )
                ORDER BY DATA ASC, COD_EQUIPE ASC
                """
            )
        else:
            sql = f"""
                SELECT
                  DATA,
                  COD_EQUIPE,
                  VALOR_US,
                  META,
                  VALOR_US_MES,
                  META_MES,
                  FAIXA_DIA
                FROM `{database}`.`{view}`
                WHERE {' AND '.join(where)}
                ORDER BY DATA ASC, COD_EQUIPE ASC
                """
            rows = execute_query(sql, params)

        return jsonify({"database": database, "view": view, "count": len(rows), "rows": rows})
    except Exception as error:
        return jsonify({"error": str(error)}), 500


@app.route("/api/codx")
def codx():
    try:
        table = sanitize_table_name(os.getenv("MYSQL_TABLE_CODX", "report_csc_cod_x"))
        where = []
        params = []

        if request.args.get("data"):
            build_data_where(request.args["data"], where, params)
        if request.args.get("uo"):
            where.append("COD_UO = %s")
            params.append(str(request.args["uo"]))
        if request.args.get("codEquipe"):
            where.append("COD_EQUIPE = %s")
            params.append(str(request.args["codEquipe"]))

        limit = int(request.args.get("limit", "2000"))
        if limit < 1 or limit > 5000:
            raise ValueError("Parâmetro inválido: limit.")

        sql = f"SELECT * FROM `{table}`"
        if where:
            sql += f" WHERE {' AND '.join(where)}"
        sql += " LIMIT %s"
        params.append(limit)

        rows = execute_query(sql, params)
        return jsonify({"table": table, "count": len(rows), "rows": rows})
    except ValueError as error:
        return jsonify({"error": str(error)}), 400
    except Exception as error:
        return jsonify({"error": str(error)}), 500


@app.route("/api/debug/grouping")
def debug_grouping():
    try:
        table = sanitize_table_name(require_env("MYSQL_TABLE"))
        if table.lower() != "report_csc_hoje":
            return jsonify({"error": "Debug disponível apenas para MYSQL_TABLE=report_csc_hoje."}), 400

        where = ["DATA IS NOT NULL"]
        params = []

        only_started_journey = str(request.args.get("onlyStartedJourney", os.getenv("MYSQL_ONLY_STARTED_JOURNEY", ""))).lower()
        if only_started_journey in {"true", "1"}:
            where.append("((INICIO_JORNADA IS NOT NULL AND INICIO_JORNADA <> '') OR (hora_ini_jornada IS NOT NULL))")

        strict_hours = str(request.args.get("strictHours", os.getenv("MYSQL_STRICT_HOURS", ""))).lower()
        if strict_hours in {"true", "1"}:
            where.append("hora_atualizacao IN (9,11,13,15,17)")

        if request.args.get("data"):
            build_data_where(request.args["data"], where, params)
        if request.args.get("uo"):
            where.append("COD_UO = %s")
            params.append(str(request.args["uo"]))

        where_sql = f"WHERE {' AND '.join(where)}" if where else ""

        tot_rows = execute_query(f"SELECT COUNT(*) AS total FROM `{table}` {where_sql}", params)
        sup_rows = execute_query(
            f"""
            SELECT NULLIF(TRIM(COALESCE(NOME_SUPERVISOR, '')), '') AS supervisor, COUNT(*) AS total
            FROM `{table}`
            {where_sql}
            GROUP BY supervisor
            ORDER BY total DESC
            LIMIT 200
            """,
            params,
        )
        lider_rows = execute_query(
            f"""
            SELECT NULLIF(TRIM(COALESCE(NOME_LIDER, '')), '') AS lider, COUNT(*) AS total
            FROM `{table}`
            {where_sql}
            GROUP BY lider
            ORDER BY total DESC
            LIMIT 200
            """,
            params,
        )
        ctrl_rows = execute_query(
            f"""
            SELECT NULLIF(TRIM(COALESCE(NOME_CONTROLADOR, '')), '') AS controlador, COUNT(*) AS total
            FROM `{table}`
            {where_sql}
            GROUP BY controlador
            ORDER BY total DESC
            LIMIT 200
            """,
            params,
        )

        return jsonify({
            "table": table,
            "filtros": {
                "data": request.args.get("data"),
                "uo": request.args.get("uo"),
                "strictHours": strict_hours in {"true", "1"},
                "onlyStartedJourney": only_started_journey in {"true", "1"},
            },
            "totalRows": int(tot_rows[0].get("total", 0) if tot_rows else 0),
            "porSupervisor": sup_rows,
            "porLider": lider_rows,
            "porControlador": ctrl_rows,
        })
    except Exception as error:
        return jsonify({"error": str(error)}), 500


@app.route("/jornadas")
def jornadas():
    try:
        table = sanitize_table_name(os.getenv("JORNADAS_TABLE") or os.getenv("MYSQL_TABLE") or "report_csc_hoje")
        data_inicio = parse_flexible_date_ref(request.args.get("dataInicio"))
        data_fim = parse_flexible_date_ref(request.args.get("dataFim"))
        report_date_expr = (
            "COALESCE("
            "DATE(DATA), "
            "CAST(CONCAT(SUBSTRING(CAST(DATA AS CHAR), 7, 4), '-', "
            "SUBSTRING(CAST(DATA AS CHAR), 4, 2), '-', "
            "SUBSTRING(CAST(DATA AS CHAR), 1, 2)) AS DATE)"
            ")"
        )
        jornadas_date_expr = "COALESCE(DATA_DIA, DATE(atualizado_em))"
        report_where = []
        report_params = []
        jornadas_where = []
        jornadas_params = []

        if data_inicio:
            report_where.append(f"{report_date_expr} >= %s")
            report_params.append(data_inicio)
            jornadas_where.append(f"{jornadas_date_expr} >= %s")
            jornadas_params.append(data_inicio)
        if data_fim:
            report_where.append(f"{report_date_expr} <= %s")
            report_params.append(data_fim)
            jornadas_where.append(f"{jornadas_date_expr} <= %s")
            jornadas_params.append(data_fim)
        if not data_inicio and not data_fim:
            report_where.append(f"{report_date_expr} = (SELECT MAX({report_date_expr}) FROM report_csc_hoje WHERE DATA IS NOT NULL)")
            jornadas_where.append(f"{jornadas_date_expr} = (SELECT MAX({jornadas_date_expr}) FROM `{table}`)")

        if table == "report_csc_hoje":
            sql = f"""
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

                  INICIO_JORNADA,
                  PRIMEIRO_ATENDIMENTO,
                  INICIO_REFEICAO,
                  TERMINO_REFEICAO,
                  ULTIMO_ATENDIMENTO,
                  FIM_JORNADA,

                  LPAD(hora_ini_jornada, 2, '0') AS HORA,
                  CAST({report_date_expr} AS CHAR) AS DATA_DIA,
                  ULTIMA_ATUALIZACAO_DADOS AS atualizado_em
                FROM report_csc_hoje
                WHERE {' AND '.join(report_where)}
                ORDER BY
                  {report_date_expr} DESC,
                  ULTIMA_ATUALIZACAO_DADOS DESC,
                  NOME_EQUIPE ASC
            """
        else:
            sql = f"""
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

                  INICIO_JORNADA,
                  PRIMEIRO_ATENDIMENTO,
                  INICIO_REFEICAO,
                  TERMINO_REFEICAO,
                  ULTIMO_ATENDIMENTO,
                  FIM_JORNADA,

                  HORA,
                  COALESCE(
                    CAST(DATA_DIA AS CHAR),
                    CAST(DATE(atualizado_em) AS CHAR)
                  ) AS DATA_DIA,

                  atualizado_em
                FROM `{table}`
                WHERE {' AND '.join(jornadas_where)}
                ORDER BY
                  COALESCE(DATA_DIA, DATE(atualizado_em)) DESC,
                  atualizado_em DESC,
                  NOME_EQUIPE ASC
            """

        params = report_params if table == "report_csc_hoje" else jornadas_params
        return jsonify(execute_query(sql, params))
    except Exception as error:
        return jsonify({"error": str(error)}), 500


@app.route("/")
def root():
    return send_from_directory(str(BASE_DIR), "login.html")


@app.route("/<path:path>")
def static_files(path):
    target = BASE_DIR / path
    if target.exists() and target.is_file():
        return send_from_directory(str(BASE_DIR), path)
    return send_from_directory(str(BASE_DIR), "index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=False)
