package com.vrio.portallicitante.service;

import com.vrio.portallicitante.model.EditalDeLicitacao;
import com.vrio.portallicitante.repository.EditalDeLicitacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EditalDeLicitacaoService {

    @Autowired
    private EditalDeLicitacaoRepository repository;

    public void cadastrar(EditalDeLicitacao edital) {
        repository.salvar(edital);
    }

    public void atualizar(EditalDeLicitacao edital) {
        repository.atualizar(edital);
    }

    public void deletar(int id) {
        repository.deletar(id);
    }

}

