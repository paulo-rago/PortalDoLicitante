package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.dto.*;
import com.vrio.portallicitante.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService service;

    @GetMapping("/valores-arrematados/{empresa}")
    public ResponseEntity<List<ValorPorAnoDTO>> listarValores(@PathVariable String empresa) {
        List<ValorPorAnoDTO> dados = service.getValoresPorAno(empresa);
        return ResponseEntity.ok(dados);
    }

    @GetMapping("/taxa-sucesso/{empresa}")
    public ResponseEntity<?> getTaxaSucesso(@PathVariable String empresa) {
        return service.getTaxaSucesso(empresa)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/kpi-processos")
    public Optional<DashboardKPIDTO> buscarKpiProcessos() {
        return service.getKpiProcessos();
    }

    @GetMapping("/evolucao-pregoes")
    public List<EvolucaoPregoesPorMesDTO> getEvolucaoPregoesPorMes() {
        return service.getEvolucaoPregoesPorMes();
    }

    @GetMapping("/pregoes-por-orgao")
    public List<PregoesPorOrgaoDTO> getPregoesPorOrgao() {
        return service.getPregoesPorOrgao();
    }

    @GetMapping("/pregoes-por-status")
    public List<PregoesPorStatusDTO> getPregoesPorStatus() {
        return service.getPregoesPorStatus();
    }

    @GetMapping("/analistas-pregoes-autovrio")
    public List<PodioAnalistasDTO> getAnalistasComPregoesDeAutoVrio() {
        return service.getAnalistasComPregoesDeAutoVrio();
    }

}

