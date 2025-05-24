package com.vrio.portallicitante.service;

import com.vrio.portallicitante.dto.TaxaSucessoDTO;
import com.vrio.portallicitante.dto.ValorPorAnoDTO;

import java.util.List;
import java.util.Optional;

public interface DashboardService {
    List<ValorPorAnoDTO> getValoresPorAno(String nomeEmpresa);

    Optional<TaxaSucessoDTO> getTaxaSucesso(String nomeEmpresa);
}

