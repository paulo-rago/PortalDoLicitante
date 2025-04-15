package com.vrio.portallicitante.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
