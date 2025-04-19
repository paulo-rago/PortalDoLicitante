package com.vrio.portallicitante.service;

import com.vrio.portallicitante.model.Pregao;

public interface PregaoService {
    void salvar(Pregao pregao);
    void atualizar(Pregao pregao);
    void deletar(int id);
}
