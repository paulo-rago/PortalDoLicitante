package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.model.AnalistaDeLicitacao;
import com.vrio.portallicitante.security.JwtUtil;
import com.vrio.portallicitante.service.AnalistaDeLicitacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/analistas")
public class AnalistaDeLicitacaoController {

    private final AnalistaDeLicitacaoService service;
    private final JwtUtil jwtUtil;

    public AnalistaDeLicitacaoController(AnalistaDeLicitacaoService service, JwtUtil jwtUtil) {
        this.service = service;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody AnalistaDeLicitacao analista) {
        service.salvar(analista);
        return ResponseEntity.status(201).body("Analista cadastrado com sucesso ✅");
    }

    @PutMapping
    public ResponseEntity<?> atualizar(@RequestBody AnalistaDeLicitacao analista) {
        try {
            service.atualizar(analista);
            return ResponseEntity.ok("Analista atualizado com sucesso ✅");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro interno: " + e.getMessage());
        }
    }

    @DeleteMapping("/{idFuncionario}")
    public ResponseEntity<?> deletar(@PathVariable int idFuncionario, @RequestHeader("Authorization") String token) {
        int idLogado = jwtUtil.getFuncionarioIdFromToken(token);
        if (!service.isSupervisor(idLogado)) {
            return ResponseEntity.status(403).body("Apenas supervisores podem excluir analistas.");
        }
        service.deletar(idFuncionario);
        return ResponseEntity.ok("Analista deletado com sucesso ✅");
    }

    @GetMapping
    public List<AnalistaDeLicitacao> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/verificar-supervisor")
    public ResponseEntity<Boolean> isSupervisor(@RequestHeader(value = "Authorization", required = false) String token) {
        System.out.println("🔐 Token recebido: " + token);

        if (token == null) {
            System.out.println("❌ Token ausente no header");
            return ResponseEntity.status(401).body(false);
        }

        try {
            int idLogado = jwtUtil.getFuncionarioIdFromToken(token);
            boolean ehSupervisor = service.isSupervisor(idLogado);
            return ResponseEntity.ok(ehSupervisor);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(false);
        }
    }

}
