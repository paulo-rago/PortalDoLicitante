package com.vrio.portallicitante.service;

import com.vrio.portallicitante.model.Funcionario;

import java.util.Optional;

public interface FuncionarioService {

    void cadastrar(Funcionario funcionario);

    void atualizar(Funcionario funcionario);

    void deletar(int id);

    Optional<Funcionario> autenticar(String cpf, String senha);

}