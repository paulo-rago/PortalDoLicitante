package com.vrio.portallicitante.service.impl;

import com.vrio.portallicitante.model.AnalistaDeLicitacao;
import com.vrio.portallicitante.repository.AnalistaDeLicitacaoRepository;
import com.vrio.portallicitante.service.AnalistaDeLicitacaoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalistaDeLicitacaoServiceImpl implements AnalistaDeLicitacaoService {

    private final AnalistaDeLicitacaoRepository repository;

    public AnalistaDeLicitacaoServiceImpl(AnalistaDeLicitacaoRepository repository) {
        this.repository = repository;
    }

    @Override
    public void salvar(AnalistaDeLicitacao analista) {
        repository.salvar(analista);
    }

    @Override
    public List<AnalistaDeLicitacao> listarTodos() {
        return repository.listarTodos();
    }
}
