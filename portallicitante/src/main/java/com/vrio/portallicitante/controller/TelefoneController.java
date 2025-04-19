package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.model.Telefone;
import com.vrio.portallicitante.service.TelefoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/telefone")
public class TelefoneController {

    @Autowired
    private TelefoneService telefoneService;

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody Telefone telefone) {
        telefoneService.salvar(telefone);
        return ResponseEntity.ok("Telefone cadastrado com sucesso ✅");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable int id, @RequestBody Telefone telefone) {
        telefone.setIdTelefone(id);
        telefoneService.atualizar(telefone);
        return ResponseEntity.ok("Telefone atualizado com sucesso 🔁");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable int id) {
        telefoneService.deletar(id);
        return ResponseEntity.ok("Telefone deletado com sucesso ❌");
    }
}
