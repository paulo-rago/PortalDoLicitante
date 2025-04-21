package com.vrio.portallicitante.service.impl;

import com.vrio.portallicitante.model.VinculoLoteEditalPregao;
import com.vrio.portallicitante.repository.VinculoLoteEditalPregaoRepository;
import com.vrio.portallicitante.service.VinculoLoteEditalPregaoService;
import org.springframework.stereotype.Service;

@Service
public class VinculoLoteEditalPregaoServiceImpl implements VinculoLoteEditalPregaoService {

    private final VinculoLoteEditalPregaoRepository repository;

    public VinculoLoteEditalPregaoServiceImpl(VinculoLoteEditalPregaoRepository repository) {
        this.repository = repository;
    }

    @Override
    public void vincular(VinculoLoteEditalPregao vinculo) {
        repository.salvar(vinculo);
    }
}
