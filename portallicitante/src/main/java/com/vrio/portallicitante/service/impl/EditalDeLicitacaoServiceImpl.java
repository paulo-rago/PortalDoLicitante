package com.vrio.portallicitante.service.impl;

import com.vrio.portallicitante.model.EditalDeLicitacao;
import com.vrio.portallicitante.repository.EditalDeLicitacaoRepository;
import com.vrio.portallicitante.service.EditalDeLicitacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EditalDeLicitacaoServiceImpl implements EditalDeLicitacaoService {

    private static final Logger logger = LoggerFactory.getLogger(EditalDeLicitacaoServiceImpl.class);

    @Autowired
    private EditalDeLicitacaoRepository repository;

    @Override
    @Transactional
    public int cadastrar(EditalDeLicitacao edital) {
        logger.info("Cadastrando edital de licitação: {}", edital);
        return repository.salvar(edital); // Aqui você retorna o ID gerado
    }


    @Override
    @Transactional
    public void atualizar(EditalDeLicitacao edital) {
        logger.info("Atualizando edital de licitação com ID: {}", edital.getId());
        repository.atualizar(edital);
    }

    @Override
    @Transactional
    public void deletar(int id) {
        logger.info("Deletando edital de licitação com ID: {}", id);
        repository.deletar(id);
    }
    @Override
    @Transactional(readOnly = true)
    public List<EditalDeLicitacao> listarTodos() {
        return repository.listarTodos();
    }

}