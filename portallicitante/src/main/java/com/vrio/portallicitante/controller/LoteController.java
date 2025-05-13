package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.model.Lote;
import com.vrio.portallicitante.service.LoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lotes")
public class LoteController {

    @Autowired
    private LoteService loteService;

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Lote lote) {
        try {
            int id = loteService.salvar(lote);
            lote.setIdLote(id);
            return ResponseEntity.ok(lote); // retorna o objeto com idLote gerado
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao cadastrar lote: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable int id, @RequestBody Lote lote) {
        lote.setIdLote(id);
        loteService.atualizar(lote);
        return ResponseEntity.ok("Lote atualizado.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable int id) {
        loteService.deletar(id);
        return ResponseEntity.ok("Lote removido.");
    }
}
