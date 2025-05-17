package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.model.Funcionario;
import com.vrio.portallicitante.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    // ✅ CADASTRAR FUNCIONÁRIO
    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Funcionario funcionario) {
        try {
            funcionarioService.cadastrar(funcionario);
            return ResponseEntity.ok("Funcionário cadastrado com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao cadastrar funcionário: " + e.getMessage());
        }
    }

    // ✅ LISTAR TODOS
    @GetMapping
    public ResponseEntity<List<Funcionario>> listarTodos() {
        List<Funcionario> lista = funcionarioService.listarTodos();
        return ResponseEntity.ok(lista);
    }

    // ✅ ATUALIZAR
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable int id, @RequestBody Funcionario funcionario) {
        funcionario.setIdFuncionario(id);
        funcionarioService.atualizar(funcionario);
        return ResponseEntity.ok("Funcionário atualizado com sucesso.");
    }

    // ✅ DELETAR
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable int id) {
        funcionarioService.deletar(id);
        return ResponseEntity.ok("Funcionário deletado com sucesso.");
    }

    // ✅ BUSCAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> buscarPorId(@PathVariable int id) {
        Funcionario funcionario = funcionarioService.buscarPorId(id);
        if (funcionario != null) {
            return ResponseEntity.ok(funcionario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
 