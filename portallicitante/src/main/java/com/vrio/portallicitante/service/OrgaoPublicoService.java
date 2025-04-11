package com.vrio.portallicitante.service;

import com.vrio.portallicitante.model.OrgaoPublico;
import com.vrio.portallicitante.repository.OrgaoPublicoRepository;
import org.springframework.stereotype.Service;

@Service
public class OrgaoPublicoService {

    private final OrgaoPublicoRepository repository;

    public OrgaoPublicoService(OrgaoPublicoRepository repository) {
        this.repository = repository;
    }

    public void cadastrar(OrgaoPublico orgao) {
        repository.salvar(orgao);
    }

    public void atualizar(OrgaoPublico orgao) {
        repository.atualizar(orgao);
    }

    public void deletar(int id) {
        repository.deletar(id);
    }
}
