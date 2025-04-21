package com.vrio.portallicitante.service;

import com.vrio.portallicitante.model.OrgaoPublico;
import com.vrio.portallicitante.model.Pregao;

import java.util.List;

public interface PregaoService {
    void salvar(Pregao pregao);
    void atualizar(Pregao pregao);
    void deletar(int id);
    List<Pregao> listarTodos();
}
