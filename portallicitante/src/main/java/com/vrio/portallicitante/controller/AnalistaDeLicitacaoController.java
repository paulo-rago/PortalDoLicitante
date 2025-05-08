package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.model.AnalistaDeLicitacao;
import com.vrio.portallicitante.service.AnalistaDeLicitacaoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/analista")
public class AnalistaDeLicitacaoController {

    private final AnalistaDeLicitacaoService service;

    public AnalistaDeLicitacaoController(AnalistaDeLicitacaoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Void> salvar(@RequestBody AnalistaDeLicitacao analista) {
        service.salvar(analista);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public List<AnalistaDeLicitacao> listarTodos() {
        return service.listarTodos();
    }
}
