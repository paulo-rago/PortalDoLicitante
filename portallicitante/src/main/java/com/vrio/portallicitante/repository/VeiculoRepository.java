package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.model.Veiculo;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Repository
public class VeiculoRepository {

    private final DataSource dataSource;

    public VeiculoRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void salvar(Veiculo veiculo) {
        String sql = """
            INSERT INTO Veiculo (
                id_veiculo,
                modelo,
                ano_de_fabricacao,
                tipo_de_veiculo,
                fk_id_lote
            ) VALUES (?, ?, ?, ?, ?)
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, veiculo.getIdVeiculo());
            stmt.setString(2, veiculo.getModelo());
            stmt.setString(3, veiculo.getAnoDeFabricacao());
            stmt.setString(4, veiculo.getTipoDeVeiculo());
            stmt.setInt(5, veiculo.getFkIdLote());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void atualizar(Veiculo veiculo) {
        String sql = """
            UPDATE Veiculo SET
                modelo = ?,
                ano_de_fabricacao = ?,
                tipo_de_veiculo = ?,
                fk_id_lote = ?
            WHERE id_veiculo = ?
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, veiculo.getModelo());
            stmt.setString(2, veiculo.getAnoDeFabricacao());
            stmt.setString(3, veiculo.getTipoDeVeiculo());
            stmt.setInt(4, veiculo.getFkIdLote());
            stmt.setInt(5, veiculo.getIdVeiculo());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deletar(int idVeiculo) {
        String sql = "DELETE FROM Veiculo WHERE id_veiculo = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idVeiculo);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

