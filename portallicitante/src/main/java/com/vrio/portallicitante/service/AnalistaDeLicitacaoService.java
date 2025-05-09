package com.vrio.portallicitante.service;

import com.vrio.portallicitante.model.AnalistaDeLicitacao;
import java.util.List;

public interface AnalistaDeLicitacaoService {
    void salvar(AnalistaDeLicitacao analista);
    void atualizar(AnalistaDeLicitacao analista);
    void deletar(int idFuncionario);
    boolean isSupervisor(int idFuncionario);
    List<AnalistaDeLicitacao> listarTodos();
}