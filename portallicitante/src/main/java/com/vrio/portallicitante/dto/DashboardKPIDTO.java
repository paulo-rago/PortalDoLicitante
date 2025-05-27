package com.vrio.portallicitante.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardKPIDTO {
    private int totalPregoes;
    private int pregoesAbertos;
    private int pregoesEncerrados;
}
