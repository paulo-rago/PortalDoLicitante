package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.model.AnalistaDeLicitacao;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Repository
public class AnalistaDeLicitacaoRepository {

    private final DataSource dataSource;

    public AnalistaDeLicitacaoRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void salvar(AnalistaDeLicitacao analista) {
        String sql = "INSERT INTO Analista_de_Licitacao (fk_Funcionario_id_funcionario, supervisor) VALUES (?, ?)";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, analista.getFuncionario().getIdFuncionario());
            stmt.setString(2, analista.getSupervisor());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void atualizar(AnalistaDeLicitacao analista) {
        String sql = "UPDATE Analista_de_Licitacao SET supervisor = ? WHERE fk_Funcionario_id_funcionario = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, analista.getSupervisor());
            stmt.setInt(2, analista.getFuncionario().getIdFuncionario());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deletar(int idFuncionario) {
        String sql = "DELETE FROM Analista_de_Licitacao WHERE fk_Funcionario_id_funcionario = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idFuncionario);
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}