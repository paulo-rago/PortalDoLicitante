package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.model.Funcionario;
import com.vrio.portallicitante.security.JwtUtil;
import com.vrio.portallicitante.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private FuncionarioService funcionarioService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Funcionario funcionario) {
        Optional<Funcionario> usuario = funcionarioService.autenticar(funcionario.getCpf(), funcionario.getSenha());

        if (usuario.isPresent()) {
            String token = jwtUtil.gerarToken(usuario.get().getCpf());
            return ResponseEntity.ok(Map.of("token", token));
        } else {
            return ResponseEntity.status(401).body("CPF ou senha inválidos");
        }
    }

    @PostMapping("/registrar")
    public ResponseEntity<?> registrar(@RequestBody Funcionario funcionario) {
        try {
            funcionarioService.cadastrar(funcionario);
            return ResponseEntity.ok("Funcionário cadastrado com sucesso ✅");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Erro ao cadastrar: " + e.getMessage());
        }
    }
}
