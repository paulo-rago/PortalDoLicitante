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
}
