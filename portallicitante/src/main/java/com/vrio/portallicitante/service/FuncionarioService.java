package com.vrio.portallicitante.service;

import com.vrio.portallicitante.model.Funcionario;
import com.vrio.portallicitante.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void cadastrar(Funcionario funcionario) {
        funcionario.setSenha(passwordEncoder.encode(funcionario.getSenha()));
        funcionarioRepository.salvar(funcionario);
    }

    public Optional<Funcionario> autenticar(String cpf, String senha) {
        Optional<Funcionario> funcionarioOpt = funcionarioRepository.buscarPorCpf(cpf);
        if (funcionarioOpt.isPresent() &&
                passwordEncoder.matches(senha, funcionarioOpt.get().getSenha())) {
            return funcionarioOpt;
        }
        return Optional.empty();
    }
}
