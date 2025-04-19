package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.model.Lote;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Repository
public class LoteRepository {

    private final DataSource dataSource;

    public LoteRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void salvar(Lote lote) {
        String sql = """
            INSERT INTO Lote (
                id_lote,
                numero_lote,
                objeto_do_lote,
                quantidade,
                fk_id_empresa
            ) VALUES (?, ?, ?, ?, ?)
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, lote.getIdLote());
            stmt.setString(2, lote.getNumeroLote());
            stmt.setString(3, lote.getObjetoDoLote());
            stmt.setString(4, lote.getQuantidade());

            // fk pode ser nulo
            if (lote.getFkIdEmpresa() == 0) {
                stmt.setNull(5, java.sql.Types.INTEGER);
            } else {
                stmt.setInt(5, lote.getFkIdEmpresa());
            }

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void atualizar(Lote lote) {
        String sql = """
            UPDATE Lote SET
                numero_lote = ?,
                objeto_do_lote = ?,
                quantidade = ?,
                fk_id_empresa = ?
            WHERE id_lote = ?
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, lote.getNumeroLote());
            stmt.setString(2, lote.getObjetoDoLote());
            stmt.setString(3, lote.getQuantidade());

            if (lote.getFkIdEmpresa() == 0) {
                stmt.setNull(4, java.sql.Types.INTEGER);
            } else {
                stmt.setInt(4, lote.getFkIdEmpresa());
            }

            stmt.setInt(5, lote.getIdLote());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deletar(int idLote) {
        String sql = "DELETE FROM Lote WHERE id_lote = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idLote);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
