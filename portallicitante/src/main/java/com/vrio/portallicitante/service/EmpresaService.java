package com.vrio.portallicitante.service;

import com.vrio.portallicitante.model.Empresa;

public interface EmpresaService {
    int salvar(Empresa empresa);
    void atualizar(Empresa empresa);
    void deletar(int id);
}
