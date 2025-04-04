package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.model.Funcionario;
import com.vrio.portallicitante.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private FuncionarioService funcionarioService;

    @PostMapping("/registrar")
    public String registrar(@RequestBody Funcionario funcionario) {
        funcionario.setStatus("ATIVO"); // exemplo
        funcionarioService.cadastrar(funcionario);
        return "Funcionário registrado com sucesso!";
    }

    @PostMapping("/login")
    public String login(@RequestBody Funcionario funcionario) {
        return funcionarioService.autenticar(funcionario.getCpf(), funcionario.getSenha())
                .map(f -> "Login bem-sucedido! Bem-vindo " + f.getNomeFuncionario())
                .orElse("CPF ou senha inválidos.");
    }
}
