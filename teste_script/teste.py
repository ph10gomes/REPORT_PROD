import requests
import pymysql
import xml.etree.ElementTree as ET
from datetime import datetime

# ================= CONFIG =================

URLS = [
    f"http://ws.remo.com.br/api/Consulta/XML?LOGIN=hudson.moreira&SENHA=dedicado009&NOME=WS_GI_CSC_HOJE&cod_uo=284",
    f"http://ws.remo.com.br/api/Consulta/XML?LOGIN=hudson.moreira&SENHA=dedicado009&NOME=WS_GI_CSC_HOJE&cod_uo=286"
]

HOST = "localhost"
USER = "root"
PASSWORD = "@029907"
DATABASE = "report_csc_hoje"
# ==========================================

# conexão MySQL
conn = pymysql.connect(
    host=HOST,
    user=USER,
    password=PASSWORD,
    database=DATABASE
)

cursor = conn.cursor()

# hora fixa da execução
hora_atual = datetime.now().hour

# ================= FUNÇÃO SEGURA =================
def get_text(item, tag):
    el = item.find(tag)

    if el is None or el.text is None:
        return None

    valor = el.text.strip()

    if valor == "":
        return None

    return valor

# ================= LOOP NAS APIs =================
for url in URLS:

    print(f"🔄 Consumindo API: {url}")

    response = requests.get(url, timeout=60)
    root = ET.fromstring(response.content)

    for item in root.findall(".//WS_GI_CSC_HOJE"):

        dados = {
            "COD_UO": get_text(item, "COD_UO"),
            "PERIODO": get_text(item, "PERIODO"),
            "FATOR_UO_PROG_ORC_MES": get_text(item, "FATOR_UO_PROG_ORC_MES"),
            "CLASSIFICACAO_PROG_ORC_MES": get_text(item, "CLASSIFICACAO_PROG_ORC_MES"),
            "DATA": get_text(item, "DATA"),
            "TIPO_EQUIPE": get_text(item, "TIPO_EQUIPE"),
            "FATOR_EQUIPE_PROG_ORC": get_text(item, "FATOR_EQUIPE_PROG_ORC"),
            "CLASSIFICACAO_PROG_ORC": get_text(item, "CLASSIFICACAO_PROG_ORC"),
            "MATRICULA_CLIENTE": get_text(item, "MATRICULA_CLIENTE"),
            "NOME": get_text(item, "NOME"),
            "COD_EQUIPE": get_text(item, "COD_EQUIPE"),
            "NUM_EQUIPE": get_text(item, "NUM_EQUIPE"),
            "NOME_EQUIPE": get_text(item, "NOME_EQUIPE"),
            "NOME_CONTROLADOR": get_text(item, "NOME_CONTROLADOR"),
            "NOME_LIDER": get_text(item, "NOME_LIDER"),
            "NOME_SUPERVISOR": get_text(item, "NOME_SUPERVISOR"),
            "ULTIMA_ATUALIZACAO_DADOS": get_text(item, "ULTIMA_ATUALIZACAO_DADOS"),
            "TOTAL_SERVICOS": get_text(item, "TOTAL_SERVICOS"),
            "DESIGNADOS": get_text(item, "DESIGNADOS"),
            "EXECUTADOS": get_text(item, "EXECUTADOS"),
            "PRODUTIVOS": get_text(item, "PRODUTIVOS"),
            "IMPRODUTIVOS": get_text(item, "IMPRODUTIVOS"),
            "SERVICOS_CONCLUIDOS_NAO_MENSURADOS": get_text(item, "SERVICOS_CONCLUIDOS_NAO_MENSURADOS"),
            "META": get_text(item, "META"),
            "US_PREV": get_text(item, "US_PREV"),
            "US_EXEC": get_text(item, "US_EXEC"),
            "FATOR_PREV_META": get_text(item, "FATOR_PREV_META"),
            "FATOR_EXEC_META": get_text(item, "FATOR_EXEC_META"),
            "CLASSIFICACAO_PREV_META": get_text(item, "CLASSIFICACAO_PREV_META"),
            "CLASSIFICACAO_EXEC_META": get_text(item, "CLASSIFICACAO_EXEC_META"),
            "COD_CLASSIFICACAO_DINAMICO": get_text(item, "COD_CLASSIFICACAO_DINAMICO"),
            "INICIO_JORNADA": get_text(item, "INICIO_JORNADA"),
            "INICIO_REFEICAO": get_text(item, "INICIO_REFEICAO"),
            "TERMINO_REFEICAO": get_text(item, "TERMINO_REFEICAO"),
            "FIM_JORNADA": get_text(item, "FIM_JORNADA"),
            "PRIMEIRO_ATENDIMENTO": get_text(item, "PRIMEIRO_ATENDIMENTO"),
            "ULTIMO_ATENDIMENTO": get_text(item, "ULTIMO_ATENDIMENTO")
        }

        # ================= TRATAR HORA JORNADA =================
        valor_jornada = dados.get("INICIO_JORNADA")
        hora_jornada = None

        if valor_jornada and valor_jornada.strip():

            formatos = [
                "%d/%m/%Y %H:%M",
                "%d/%m/%Y %H:%M:%S",
                "%H:%M",
                "%H:%M:%S"
            ]

            for fmt in formatos:
                try:
                    hora_jornada = datetime.strptime(valor_jornada.strip(), fmt).hour
                    break
                except:
                    continue

        # ================= INSERT (SEM VALIDAÇÃO) =================
        colunas = ", ".join(dados.keys()) + ", hora_atualizacao, hora_ini_jornada"
        placeholders = ", ".join(["%s"] * (len(dados) + 2))

        sql = f"INSERT INTO report_csc_hoje ({colunas}) VALUES ({placeholders})"

        valores = list(dados.values()) + [hora_atual, hora_jornada]

        cursor.execute(sql, valores)

# commit final
conn.commit()
cursor.close()
conn.close()

print("✅ Inserção concluída (modo histórico - append puro)")
