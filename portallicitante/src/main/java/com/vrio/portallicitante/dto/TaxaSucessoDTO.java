package com.vrio.portallicitante.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaxaSucessoDTO {
    private int totalPregoesParticipados;
    private int totalPregoesVencidos;
    private double taxaSucessoPercentual;
}
