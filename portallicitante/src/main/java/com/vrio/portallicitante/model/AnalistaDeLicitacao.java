package com.vrio.portallicitante.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnalistaDeLicitacao {
    private Funcionario funcionario; // herança por composição
    private Integer supervisor;
}
