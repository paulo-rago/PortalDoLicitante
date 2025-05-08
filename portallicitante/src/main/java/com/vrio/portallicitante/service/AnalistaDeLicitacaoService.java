package com.vrio.portallicitante.service;

import com.vrio.portallicitante.model.AnalistaDeLicitacao;

import java.util.List;

public interface AnalistaDeLicitacaoService {
    void salvar(AnalistaDeLicitacao analista);
    List<AnalistaDeLicitacao> listarTodos();
}
