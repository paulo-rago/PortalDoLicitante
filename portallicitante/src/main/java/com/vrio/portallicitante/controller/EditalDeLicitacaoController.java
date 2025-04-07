package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.model.EditalDeLicitacao;
import com.vrio.portallicitante.service.EditalDeLicitacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/editais")
public class EditalDeLicitacaoController {

    @Autowired
    private EditalDeLicitacaoService service;

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody EditalDeLicitacao edital) {
        try {
            service.cadastrar(edital);
            return ResponseEntity.ok("Edital cadastrado com sucesso ✅");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao cadastrar edital: " + e.getMessage());
        }
    }
}
