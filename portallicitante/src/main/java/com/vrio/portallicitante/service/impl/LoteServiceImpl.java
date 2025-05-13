package com.vrio.portallicitante.service.impl;

import com.vrio.portallicitante.model.Lote;
import com.vrio.portallicitante.repository.LoteRepository;
import com.vrio.portallicitante.service.LoteService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LoteServiceImpl implements LoteService {

    private final LoteRepository repository;

    public LoteServiceImpl(LoteRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public int salvar(Lote lote) {
        return repository.salvar(lote);
    }


    @Override
    public void atualizar(Lote lote) {
        repository.atualizar(lote);
    }

    @Override
    public void deletar(int id) {
        repository.deletar(id);
    }
}
