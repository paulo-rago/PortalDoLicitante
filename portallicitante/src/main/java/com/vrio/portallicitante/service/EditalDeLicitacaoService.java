package com.vrio.portallicitante.service;

import com.vrio.portallicitante.model.EditalDeLicitacao;
import com.vrio.portallicitante.repository.EditalDeLicitacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public interface EditalDeLicitacaoService {


    void cadastrar(EditalDeLicitacao edital);

    void atualizar(EditalDeLicitacao edital);

     void deletar(int id);
}

