package com.vrio.portallicitante.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Funcionario {
    private Integer idFuncionario;
    private String nomeFuncionario;
    private String cpf;
    private String emailCorporativo;
    private String status;
    private String senha;
}
