package com.vrio.portallicitante.service.impl;

import com.vrio.portallicitante.model.OrgaoPublico;
import com.vrio.portallicitante.repository.OrgaoPublicoRepository;
import com.vrio.portallicitante.service.OrgaoPublicoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class OrgaoPublicoServiceImpl implements OrgaoPublicoService {

    private static final Logger logger = LoggerFactory.getLogger(OrgaoPublicoServiceImpl.class);
    private final OrgaoPublicoRepository repository;

    public OrgaoPublicoServiceImpl(OrgaoPublicoRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public void cadastrar(OrgaoPublico orgao) {
        logger.info("Cadastrando órgão público: {}", orgao);
        repository.salvar(orgao);
    }

    @Override
    @Transactional
    public void atualizar(OrgaoPublico orgao) {
        logger.info("Atualizando órgão público com ID: {}", orgao.getIdOrgaoPublico());
        repository.atualizar(orgao);
    }

    @Override
    @Transactional
    public void deletar(int id) {
        logger.info("Deletando órgão público com ID: {}", id);
        repository.deletar(id);
    }

    @Override
    public List<OrgaoPublico> listarTodos() {
        return repository.listarTodos();
    }
}