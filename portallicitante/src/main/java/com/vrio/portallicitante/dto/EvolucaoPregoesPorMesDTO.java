package com.vrio.portallicitante.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EvolucaoPregoesPorMesDTO {
    private int ano;
    private int mes;
    private int total;
}
