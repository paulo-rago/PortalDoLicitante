package com.vrio.portallicitante.service;

import com.vrio.portallicitante.model.Lote;

public interface LoteService {
    void salvar(Lote lote);
    void atualizar(Lote lote);
    void deletar(int id);
}
