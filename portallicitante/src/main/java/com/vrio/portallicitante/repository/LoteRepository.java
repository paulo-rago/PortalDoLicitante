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
                objeto,
                quantidade,
                modelo_veiculo,
                ano_fabricacao_veiculo,
                tipo_veiculo,
                valorArremate,
                fk_Empresa_id_empresa,
                fk_Pregao_id_pregao,
                fk_Edital_de_Licitacao_id_licitacao
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, lote.getIdLote());
            stmt.setString(2, lote.getNumeroLote());
            stmt.setString(3, lote.getObjetoDoLote());
            stmt.setString(4, lote.getQuantidade());
            stmt.setString(5, lote.getModelo_veiculo());
            stmt.setString(6, lote.getAno_fabricacao());
            stmt.setString(7, lote.getTipo_veiculo());

            if (lote.getValorArremate() == 0.0) {
                stmt.setNull(8, java.sql.Types.DOUBLE);
            } else {
                stmt.setDouble(8, lote.getValorArremate());
            }

            if (lote.getFkIdEmpresa() == 0) {
                stmt.setNull(9, java.sql.Types.INTEGER);
            } else {
                stmt.setInt(9, lote.getFkIdEmpresa());
            }

            stmt.setInt(10, lote.getFkIdPregao());
            stmt.setInt(11, lote.getFkIdEditalDeLicitacao());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void atualizar(Lote lote) {
        String sql = """
            UPDATE Lote SET
                numero_lote = ?,
                objeto = ?,
                quantidade = ?,
                modelo_veiculo = ?,
                ano_fabricacao_veiculo = ?,
                tipo_veiculo = ?,
                valorArremate = ?,
                fk_Empresa_id_empresa = ?,
                fk_Pregao_id_pregao = ?,
                fk_Edital_de_Licitacao_id_licitacao = ?
            WHERE id_lote = ?
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, lote.getNumeroLote());
            stmt.setString(2, lote.getObjetoDoLote());
            stmt.setString(3, lote.getQuantidade());
            stmt.setString(4, lote.getModelo_veiculo());
            stmt.setString(5, lote.getAno_fabricacao());
            stmt.setString(6, lote.getTipo_veiculo());

            if (lote.getValorArremate() == 0.0) {
                stmt.setNull(7, java.sql.Types.DOUBLE);
            } else {
                stmt.setDouble(7, lote.getValorArremate());
            }

            if (lote.getFkIdEmpresa() == 0) {
                stmt.setNull(8, java.sql.Types.INTEGER);
            } else {
                stmt.setInt(8, lote.getFkIdEmpresa());
            }

            stmt.setInt(9, lote.getFkIdPregao());
            stmt.setInt(10, lote.getFkIdEditalDeLicitacao());
            stmt.setInt(11, lote.getIdLote());

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
