package com.vrio.portallicitante.service;

import com.vrio.portallicitante.model.Telefone;

public interface TelefoneService {
    void salvar(Telefone telefone);
    void atualizar(Telefone telefone);
    void deletar(int idTelefone);
}
