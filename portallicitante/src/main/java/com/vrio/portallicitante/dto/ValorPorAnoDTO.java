package com.vrio.portallicitante.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ValorPorAnoDTO {
    private int ano;
    private double totalArrematado;
}
