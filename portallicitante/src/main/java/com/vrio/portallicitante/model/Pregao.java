package com.vrio.portallicitante.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pregao {
    private int idPregao;
    private String numeroPregao;
    private String statusPregao;
    private String modeloPregao;
    private String modalidade;
    private Time horarioAbertura;
    private Date dataEncerramento;
    private int fkEditalDeLicitacao;
    private int fkAnalistaDeLicitacao;
}
