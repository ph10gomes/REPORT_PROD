USE report_csc_hoje;

CREATE OR REPLACE VIEW vw_acordos_justificativas_acumulado AS
SELECT
    'ACORDO' AS origem,
    a.id AS registro_id,
    a.data_ref,
    a.uo,
    a.tipo_visao,
    a.supervisor,
    a.hora_referencia,
    a.codigo_equipe,
    a.equipe,
    a.acao,
    a.meta_dia_acordo,
    a.meta_acordo,
    a.prod_acordo,
    a.faixa_acordo,
    a.perc_acordo,
    NULL AS justificativa,
    NULL AS motivo_grupo,
    NULL AS motivo_descricao,
    NULL AS detalhe,
    a.usuario_salvo,
    a.salvo_em
FROM historico_acordos a

UNION ALL

SELECT
    'JUSTIFICATIVA' AS origem,
    j.id AS registro_id,
    j.data_ref,
    j.uo,
    j.tipo_visao,
    j.supervisor,
    j.hora_referencia,
    j.codigo_equipe,
    j.equipe,
    j.acao,
    NULL AS meta_dia_acordo,
    NULL AS meta_acordo,
    NULL AS prod_acordo,
    NULL AS faixa_acordo,
    NULL AS perc_acordo,
    j.justificativa,
    j.motivo_grupo,
    j.motivo_descricao,
    j.detalhe,
    j.usuario_salvo,
    j.salvo_em
FROM historico_justificativas j;
