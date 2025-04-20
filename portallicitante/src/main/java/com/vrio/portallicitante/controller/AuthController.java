package com.vrio.portallicitante.controller;

import com.vrio.portallicitante.dto.AuthRequestDTO;
import com.vrio.portallicitante.dto.AuthResponseDTO;
import com.vrio.portallicitante.model.Funcionario;
import com.vrio.portallicitante.security.JwtUtil;
import com.vrio.portallicitante.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private FuncionarioService funcionarioService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequestDTO request) {
        Optional<Funcionario> usuario = funcionarioService.autenticar(request.getCpf(), request.getSenha());

        if (usuario.isPresent()) {
            String token = jwtUtil.gerarToken(usuario.get().getCpf());
            return ResponseEntity.ok(new AuthResponseDTO(token));
        } else {
            return ResponseEntity.status(401).body("CPF ou senha inválidos");
        }
    }

    @PostMapping("/registrar")
    public ResponseEntity<?> registrar(@RequestBody AuthRequestDTO request) {
        try {
            Funcionario f = new Funcionario();
            f.setNomeFuncionario(request.getNomeFuncionario());
            f.setCpf(request.getCpf());
            f.setEmailCorporativo(request.getEmailCorporativo());
            f.setSenha(request.getSenha());
            f.setStatus(request.getStatus() != null ? request.getStatus() : "ATIVO");
            funcionarioService.cadastrar(f);
            return ResponseEntity.ok("Funcionário cadastrado com sucesso ✅");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Erro ao cadastrar: " + e.getMessage());
        }
    }
}
