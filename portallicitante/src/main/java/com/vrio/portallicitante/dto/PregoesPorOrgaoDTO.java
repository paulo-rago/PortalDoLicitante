package com.vrio.portallicitante.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PregoesPorOrgaoDTO {
    private String orgao;
    private int total;
}
