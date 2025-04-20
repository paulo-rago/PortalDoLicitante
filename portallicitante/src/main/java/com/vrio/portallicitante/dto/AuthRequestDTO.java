package com.vrio.portallicitante.dto;

import lombok.Data;

@Data
public class AuthRequestDTO {
    private String nomeFuncionario;
    private String cpf;
    private String emailCorporativo;
    private String status;
    private String senha;
}
