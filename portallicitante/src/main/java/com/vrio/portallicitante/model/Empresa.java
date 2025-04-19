package com.vrio.portallicitante.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Empresa {
    private int idEmpresa;
    private String cnpj;
    private String telefone;
    private String cep;
    private String rua;
    private String bairro;
    private String numero;
    private String estado;
    private String nome;
}

