package com.vrio.portallicitante.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Veiculo {
    private int fkIdLote;
    private int idVeiculo;
    private String modelo;
    private String anoDeFabricacao;
    private String tipoDeVeiculo;
}
