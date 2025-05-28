package com.vrio.portallicitante.service.impl;

import com.vrio.portallicitante.dto.*;
import com.vrio.portallicitante.repository.DashboardRepository;
import com.vrio.portallicitante.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private DashboardRepository repository;

    @Override
    public List<ValorPorAnoDTO> getValoresPorAno(String nomeEmpresa) {
        return repository.buscarValoresPorAno(nomeEmpresa);
    }

    @Override
    public Optional<TaxaSucessoDTO> getTaxaSucesso(String nomeEmpresa) {
        return repository.buscarTaxaSucesso(nomeEmpresa);
    }

    @Override
    public Optional<DashboardKPIDTO> getKpiProcessos() {
        return repository.buscarKpiProcessos();
    }

    @Override
    public List<EvolucaoPregoesPorMesDTO> getEvolucaoPregoesPorMes() {
        return repository.buscarEvolucaoPregoesPorMes();
    }

    @Override
    public List<PregoesPorOrgaoDTO> getPregoesPorOrgao() {
        return repository.buscarPregoesPorOrgao();
    }

    @Override
    public List<PregoesPorStatusDTO> getPregoesPorStatus() {
        return repository.buscarPregoesPorStatus();
    }

    @Override
    public List<PodioAnalistasDTO> getAnalistasComPregoesDeAutoVrio() {
        return repository.buscarAnalistasComPregoesDeAutoVrio();
    }
}

