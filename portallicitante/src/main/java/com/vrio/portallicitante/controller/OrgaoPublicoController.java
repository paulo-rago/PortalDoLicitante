package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.model.OrgaoPublico;
import com.vrio.portallicitante.service.OrgaoPublicoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable int id, @RequestBody OrgaoPublico orgao) {
        orgao.setIdOrgaoPublico(id);
        service.atualizar(orgao);
        return ResponseEntity.ok("Órgão público atualizado com sucesso.");
    }

    @GetMapping
    public ResponseEntity<List<OrgaoPublico>> listarTodos() {
        List<OrgaoPublico> lista = service.listarTodos();
        return ResponseEntity.ok(lista);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable int id) {
        service.deletar(id);
        return ResponseEntity.ok("Órgão público deletado com sucesso.");
    }
}
