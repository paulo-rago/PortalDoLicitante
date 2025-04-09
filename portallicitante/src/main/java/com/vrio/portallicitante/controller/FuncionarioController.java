package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.model.Funcionario;
import com.vrio.portallicitante.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable int id, @RequestBody Funcionario funcionario) {
        funcionario.setIdFuncionario(id);
        funcionarioService.atualizar(funcionario);
        return ResponseEntity.ok("Funcionário atualizado com sucesso.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable int id) {
        funcionarioService.deletar(id);
        return ResponseEntity.ok("Funcionário deletado com sucesso.");
    }
}
