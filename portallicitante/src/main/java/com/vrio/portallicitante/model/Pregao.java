package com.vrio.portallicitante.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pregao {
    private int idPregao;
    private String numeroPregao;
    private String statusPregao;
    private String modeloPregao;
    private String modalidade;
}
