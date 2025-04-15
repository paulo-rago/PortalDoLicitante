package com.vrio.portallicitante.service;

import com.vrio.portallicitante.model.OrgaoPublico;

public interface OrgaoPublicoService {
    void cadastrar(OrgaoPublico orgao);
    void atualizar(OrgaoPublico orgao);
    void deletar(int id);
}