package com.vrio.portallicitante.service;

import com.vrio.portallicitante.dto.ValorPorAnoDTO;

import java.util.List;

public interface DashboardService {
    List<ValorPorAnoDTO> getValoresPorAno(String nomeEmpresa);
}

