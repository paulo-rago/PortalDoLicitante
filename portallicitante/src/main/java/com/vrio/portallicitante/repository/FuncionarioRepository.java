package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.model.Funcionario;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.Optional;

@Repository
public class FuncionarioRepository {

    private final DataSource dataSource;

    public FuncionarioRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Optional<Funcionario> buscarPorCpf(String cpf) {
        String sql = "SELECT * FROM Funcionario WHERE cpf = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, cpf);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                Funcionario f = new Funcionario();
                f.setIdFuncionario(rs.getInt("id_funcionario"));
                f.setNomeFuncionario(rs.getString("nome_funcionario"));
                f.setCpf(rs.getString("cpf"));
                f.setEmailCorporativo(rs.getString("email_corporativo"));
                f.setStatus(rs.getString("status"));
                f.setSenha(rs.getString("senha"));
                return Optional.of(f);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return Optional.empty();
    }

    public void salvar(Funcionario funcionario) {
        String sql = "INSERT INTO Funcionario (nome_funcionario, cpf, email_corporativo, status, senha) VALUES (?, ?, ?, ?, ?)";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, funcionario.getNomeFuncionario());
            stmt.setString(2, funcionario.getCpf());
            stmt.setString(3, funcionario.getEmailCorporativo());
            stmt.setString(4, funcionario.getStatus());
            stmt.setString(5, funcionario.getSenha());

            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
