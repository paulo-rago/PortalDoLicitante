package com.vrio.portallicitante.service.impl;

import com.vrio.portallicitante.model.OrgaoPublico;
import com.vrio.portallicitante.model.Pregao;
import com.vrio.portallicitante.repository.PregaoRepository;
import com.vrio.portallicitante.service.PregaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PregaoServiceImpl implements PregaoService {

    @Autowired
    private PregaoRepository repository;

    @Override
    @Transactional
    public int salvar(Pregao pregao) {
        return repository.salvar(pregao);
    }

    @Override
    public void atualizar(Pregao pregao) {
        repository.atualizar(pregao);
    }

    @Override
    public void deletar(int id) {
        repository.deletar(id);
    }


    public List<Pregao> listarTodos() {
        return repository.listarTodos();
    }
}
