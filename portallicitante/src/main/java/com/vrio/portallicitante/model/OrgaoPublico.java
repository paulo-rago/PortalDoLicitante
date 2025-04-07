package com.vrio.portallicitante.model;

import lombok.Data;

@Data
public class OrgaoPublico {
    private int idOrgaoPublico;
    private String cnpj;
    private String nomeOrgao;
    private String rua;
    private String bairro;
    private String cep;
    private String numero;
    private String estado;
    private String municipio;
}
