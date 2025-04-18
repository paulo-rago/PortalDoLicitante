package com.vrio.portallicitante.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Telefone{
    private int fkIdFuncionario;
    private int idTelefone;
    private String numeroTelefone;
}
