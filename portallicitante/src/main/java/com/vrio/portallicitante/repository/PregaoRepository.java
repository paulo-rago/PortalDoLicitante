package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.model.Pregao;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Repository
public class PregaoRepository {

    private final DataSource dataSource;

    public PregaoRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void salvar(Pregao pregao) {
        String sql = """
            INSERT INTO Pregao (
                id_pregao,
                numero_pregao,
                status_pregao,
                modelo_pregao
            ) VALUES (?, ?, ?, ?)
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, pregao.getIdPregao());
            stmt.setString(2, pregao.getNumeroPregao());
            stmt.setString(3, pregao.getStatusPregao());
            stmt.setString(4, pregao.getModeloPregao());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void atualizar(Pregao pregao) {
        String sql = """
            UPDATE Pregao SET
                numero_pregao = ?,
                status_pregao = ?,
                modelo_pregao = ?
            WHERE id_pregao = ?
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, pregao.getNumeroPregao());
            stmt.setString(2, pregao.getStatusPregao());
            stmt.setString(3, pregao.getModeloPregao());
            stmt.setInt(4, pregao.getIdPregao());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deletar(int idPregao) {
        String sql = "DELETE FROM Pregao WHERE id_pregao = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idPregao);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
