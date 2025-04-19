package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.model.Telefone;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Repository
public class TelefoneRepository {

    private final DataSource dataSource;

    public TelefoneRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void salvar(Telefone telefone) {
        String sql = """
            INSERT INTO Telefone (
                id_telefone,
                numero_telefone,
                fk_id_funcionario
            ) VALUES (?, ?, ?)
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, telefone.getIdTelefone());
            stmt.setString(2, telefone.getNumeroTelefone());
            stmt.setInt(3, telefone.getFkIdFuncionario());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void atualizar(Telefone telefone) {
        String sql = """
            UPDATE Telefone SET 
                numero_telefone = ?, 
                fk_id_funcionario = ?
            WHERE id_telefone = ?
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, telefone.getNumeroTelefone());
            stmt.setInt(2, telefone.getFkIdFuncionario());
            stmt.setInt(3, telefone.getIdTelefone());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deletar(int idTelefone) {
        String sql = "DELETE FROM Telefone WHERE id_telefone = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idTelefone);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

