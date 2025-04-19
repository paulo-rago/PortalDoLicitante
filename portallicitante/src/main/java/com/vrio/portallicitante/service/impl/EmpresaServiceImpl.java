package com.vrio.portallicitante.service.impl;

import com.vrio.portallicitante.model.Empresa;
import com.vrio.portallicitante.repository.EmpresaRepository;
import com.vrio.portallicitante.service.EmpresaService;
import org.springframework.stereotype.Service;

@Service
public class EmpresaServiceImpl implements EmpresaService {

    private final EmpresaRepository repository;

    public EmpresaServiceImpl(EmpresaRepository repository) {
        this.repository = repository;
    }

    @Override
    public void salvar(Empresa empresa) {
        repository.salvar(empresa);
    }

    @Override
    public void atualizar(Empresa empresa) {
        repository.atualizar(empresa);
    }

    @Override
    public void deletar(int id) {
        repository.deletar(id);
    }
}
