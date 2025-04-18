package com.vrio.portallicitante.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Empresa {
    private int idEmpresa;
    private String CNPJ;
    // criar tabela no banco para armazenar nome
    private String nome;
    private String CEP;
    private String rua;
    private String numero;
    private String estado;
}
