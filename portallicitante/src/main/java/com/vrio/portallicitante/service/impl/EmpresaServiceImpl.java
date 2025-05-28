package com.vrio.portallicitante.service.impl;

import com.vrio.portallicitante.model.Empresa;
import com.vrio.portallicitante.repository.EmpresaRepository;
import com.vrio.portallicitante.service.EmpresaService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpresaServiceImpl implements EmpresaService {

    private final EmpresaRepository repository;

    public EmpresaServiceImpl(EmpresaRepository repository) {
        this.repository = repository;
    }

    public int salvar(Empresa empresa) {
        return repository.salvar(empresa);
    }


    @Override
    public void atualizar(Empresa empresa) {
        repository.atualizar(empresa);
    }

    @Override
    public void deletar(int id) {
        repository.deletar(id);
    }

    @Override
    public List<Empresa> listarTodos() {
        return repository.listarTodos();
    }
}
