package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.model.VinculoLoteEditalPregao;
import com.vrio.portallicitante.service.VinculoLoteEditalPregaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vinculos")
public class VinculoLoteEditalPregaoController {

    private final VinculoLoteEditalPregaoService service;

    public VinculoLoteEditalPregaoController(VinculoLoteEditalPregaoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> vincular(@RequestBody VinculoLoteEditalPregao vinculo) {
        try {
            service.vincular(vinculo);
            return ResponseEntity.ok("Vínculo criado com sucesso entre lote, edital e pregão.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao criar vínculo: " + e.getMessage());
        }
    }
}
