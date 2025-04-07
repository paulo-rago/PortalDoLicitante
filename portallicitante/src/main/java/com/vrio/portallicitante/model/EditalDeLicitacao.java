package com.vrio.portallicitante.model;

import lombok.Data;

import java.math.BigDecimal;
import java.sql.Date;

@Data
public class EditalDeLicitacao {
    private int id;
    private String numeroLicitacao;
    private String orgaoResponsavel;
    private Date dataDeAbertura;
    private Date prazoEntrega;
    private String exigenciaTecnicas;
    private String documentacaoObrigatoria;
    private double valorEstimado;
    private int fkOrgaoPublicoId;
}
