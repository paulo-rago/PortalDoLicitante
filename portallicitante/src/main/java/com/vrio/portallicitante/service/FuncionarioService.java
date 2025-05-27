package com.vrio.portallicitante.service;

import com.vrio.portallicitante.model.Funcionario;

import java.util.List;
import java.util.Optional;

public interface FuncionarioService {

    Funcionario cadastrar(Funcionario funcionario);

    void atualizar(Funcionario funcionario);

    void deletar(int id);

    void atualizarFoto(int idFuncionario, String caminhoFoto);

    List<Funcionario> listarTodos();

    Optional<Funcionario> autenticar(String cpf, String senha);

    Funcionario buscarPorId(int id);
}