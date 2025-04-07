package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.model.OrgaoPublico;
import com.vrio.portallicitante.service.OrgaoPublicoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orgaos")
public class OrgaoPublicoController {

    private final OrgaoPublicoService service;

    public OrgaoPublicoController(OrgaoPublicoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody OrgaoPublico orgao) {
        service.cadastrar(orgao);
        return ResponseEntity.ok("Órgão público cadastrado com sucesso.");
    }
}
