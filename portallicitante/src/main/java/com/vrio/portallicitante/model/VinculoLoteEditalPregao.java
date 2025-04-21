package com.vrio.portallicitante.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VinculoLoteEditalPregao {
    private int fkLoteId;
    private int fkPregaoId;
    private int fkEditalId;
}
