package com.vrio.portallicitante.model;

import lombok.Data;

@Data
public class Funcionario {
    private Integer idFuncionario;
    private String nomeFuncionario;
    private String cpf;
    private String emailCorporativo;
    private String status;
    private String senha;
}
