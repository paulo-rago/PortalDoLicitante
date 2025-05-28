package com.vrio.portallicitante.service;

import com.vrio.portallicitante.dto.*;

import java.util.List;
import java.util.Optional;

public interface DashboardService {
    List<ValorPorAnoDTO> getValoresPorAno(String nomeEmpresa);

    Optional<TaxaSucessoDTO> getTaxaSucesso(String nomeEmpresa);

    Optional<DashboardKPIDTO> getKpiProcessos();

    List<EvolucaoPregoesPorMesDTO> getEvolucaoPregoesPorMes();

    List<PregoesPorOrgaoDTO> getPregoesPorOrgao();

    List<PregoesPorStatusDTO> getPregoesPorStatus();

    List<PodioAnalistasDTO> getAnalistasComPregoesDeAutoVrio();
}

