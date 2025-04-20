package com.vrio.portallicitante.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditalDeLicitacao {
    private int id;
    private String numeroLicitacao;
    private String orgaoResponsavel;
    private LocalDate dataDeAbertura;
    private LocalDate  prazoEntrega;
    private String exigenciaTecnicas;
    private String documentacaoObrigatoria;
    private BigDecimal  valorEstimado;
    private int fkOrgaoPublicoId;
}
