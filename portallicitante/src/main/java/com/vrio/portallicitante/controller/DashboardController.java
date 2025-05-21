package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.dto.ValorPorAnoDTO;
import com.vrio.portallicitante.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}

