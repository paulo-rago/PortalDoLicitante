package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.model.EditalDeLicitacao;
import com.vrio.portallicitante.model.Pregao;
import com.vrio.portallicitante.service.EditalDeLicitacaoService;
import com.vrio.portallicitante.service.PregaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pregao")
public class PregaoController {

    @Autowired
    private PregaoService pregaoService;

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody Pregao pregao) {
        try {
            int id = pregaoService.salvar(pregao);
            pregao.setIdPregao(id);
            return ResponseEntity.ok(pregao); // Retorna objeto completo com ID
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao cadastrar pregão: " + e.getMessage());
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable int id, @RequestBody Pregao pregao) {
        pregao.setIdPregao(id);
        pregaoService.atualizar(pregao);
        return ResponseEntity.ok("Pregão atualizado com sucesso");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable int id) {
        pregaoService.deletar(id);
        return ResponseEntity.ok("Pregão deletado com sucesso");
    }

    @GetMapping
    public ResponseEntity<List<Pregao>> listarTodos() {
        List<Pregao> lista = pregaoService.listarTodos();
        return ResponseEntity.ok(lista);
    }

}
