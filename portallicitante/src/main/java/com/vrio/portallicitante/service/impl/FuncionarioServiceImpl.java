package com.vrio.portallicitante.service.impl;

import com.vrio.portallicitante.model.Funcionario;
import com.vrio.portallicitante.repository.FuncionarioRepository;
import com.vrio.portallicitante.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioServiceImpl implements FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public void cadastrar(Funcionario funcionario) {
        funcionario.setSenha(passwordEncoder.encode(funcionario.getSenha()));
        funcionarioRepository.salvar(funcionario);
    }

    @Override
    @Transactional
    public void atualizar(Funcionario funcionario) {
        funcionarioRepository.atualizar(funcionario);
    }

    @Override
    @Transactional
    public void deletar(int id) {
        funcionarioRepository.deletar(id);
    }

    @Override
    public List<Funcionario> listarTodos() {
        return funcionarioRepository.listarTodos();
    }

    @Override
    public Optional<Funcionario> autenticar(String cpf, String senha) {
        Optional<Funcionario> funcionarioOpt = funcionarioRepository.buscarPorCpf(cpf);
        if (funcionarioOpt.isPresent() &&
                passwordEncoder.matches(senha, funcionarioOpt.get().getSenha())) {
            return funcionarioOpt;
        }
        return Optional.empty();
    }

    @Override
    public Funcionario buscarPorId(int id) {
        return funcionarioRepository.buscarPorId(id);
    }
}