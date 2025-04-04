package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.model.Funcionario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class FuncionarioRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Optional<Funcionario> buscarPorCpf(String cpf) {
        String sql = "SELECT * FROM Funcionario WHERE cpf = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Funcionario.class), cpf)
                .stream().findFirst();
    }

    public void salvar(Funcionario funcionario) {
        String sql = "INSERT INTO Funcionario (nome_funcionario, cpf, email_corporativo, status, senha) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                funcionario.getNomeFuncionario(),
                funcionario.getCpf(),
                funcionario.getEmailCorporativo(),
                funcionario.getStatus(),
                funcionario.getSenha());
    }
}
