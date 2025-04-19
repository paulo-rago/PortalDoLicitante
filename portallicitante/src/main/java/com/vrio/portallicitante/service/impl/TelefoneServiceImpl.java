package com.vrio.portallicitante.service.impl;

import com.vrio.portallicitante.model.Telefone;
import com.vrio.portallicitante.repository.TelefoneRepository;
import com.vrio.portallicitante.service.TelefoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TelefoneServiceImpl implements TelefoneService {

    @Autowired
    private TelefoneRepository telefoneRepository;

    @Override
    public void salvar(Telefone telefone) {
        telefoneRepository.salvar(telefone);
    }

    @Override
    public void atualizar(Telefone telefone) {
        telefoneRepository.atualizar(telefone);
    }

    @Override
    public void deletar(int idTelefone) {
        telefoneRepository.deletar(idTelefone);
    }
}
