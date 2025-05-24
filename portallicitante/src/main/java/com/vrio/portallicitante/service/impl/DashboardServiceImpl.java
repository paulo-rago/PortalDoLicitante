package com.vrio.portallicitante.service.impl;

import com.vrio.portallicitante.dto.TaxaSucessoDTO;
import com.vrio.portallicitante.dto.ValorPorAnoDTO;
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
}

