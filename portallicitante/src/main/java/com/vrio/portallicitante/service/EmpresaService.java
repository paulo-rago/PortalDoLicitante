package com.vrio.portallicitante.service;

import com.vrio.portallicitante.model.Empresa;

import java.util.List;

public interface EmpresaService {
    int salvar(Empresa empresa);
    void atualizar(Empresa empresa);
    void deletar(int id);
    List<Empresa> listarTodos();

}
