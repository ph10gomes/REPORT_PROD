require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./src/config/db");

const app = express();
const frontendDir = path.resolve(__dirname, "..", "frontend");

app.use(cors());
app.use(express.json());
app.use(express.static(frontendDir));

app.get("/health", (req, res) => res.json({ ok: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendDir, "jornada.html"));
});

app.get("/jornadas", async (req, res) => {
  try {
    const table = process.env.JORNADAS_TABLE || "jornadas";

    const sql =
      table === "report_csc_hoje"
        ? `
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
        ORDER BY
          STR_TO_DATE(DATA, '%d/%m/%Y') DESC,
          STR_TO_DATE(ULTIMA_ATUALIZACAO_DADOS, '%d/%m/%Y %H:%i:%s') DESC,
          NOME_EQUIPE ASC
      `
        : `
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
          COALESCE(
            DATE_FORMAT(DATA_DIA, '%Y-%m-%d'),
            DATE_FORMAT(atualizado_em, '%Y-%m-%d')
          ) AS DATA_DIA,

          DATE_FORMAT(atualizado_em, '%Y-%m-%d %H:%i:%s') AS atualizado_em
        FROM jornadas
        ORDER BY
          COALESCE(DATA_DIA, DATE(atualizado_em)) DESC,
          atualizado_em DESC,
          NOME_EQUIPE ASC
      `;

    const [rows] = await pool.query(sql);

    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => console.log("API: http://localhost:3000"));
