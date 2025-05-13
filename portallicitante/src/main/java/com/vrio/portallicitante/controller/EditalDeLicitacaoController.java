package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.model.EditalDeLicitacao;
import com.vrio.portallicitante.service.EditalDeLicitacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/editais")
public class EditalDeLicitacaoController {

    @Autowired
    private EditalDeLicitacaoService service;

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody EditalDeLicitacao edital) {
        try {
            int id = service.cadastrar(edital); // precisa retornar o ID
            edital.setId(id);
            return ResponseEntity.ok(edital); // envia o edital com ID para o frontend
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao cadastrar edital: " + e.getMessage());
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable int id, @RequestBody EditalDeLicitacao edital) {
        edital.setId(id);
        service.atualizar(edital);
        return ResponseEntity.ok("Edital atualizado com sucesso.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable int id) {
        service.deletar(id);
        return ResponseEntity.ok("Edital deletado com sucesso.");
    }

    @GetMapping
    public ResponseEntity<List<EditalDeLicitacao>> listarTodos() {
        List<EditalDeLicitacao> lista = service.listarTodos();
        return ResponseEntity.ok(lista);
    }


}
