package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.model.Lote;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;

@Repository
public class LoteRepository {

    private final DataSource dataSource;

    public LoteRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public int salvar(Lote lote) {
        String sql = """
            INSERT INTO Lote (
                quantidade,
                numero_lote,
                objeto,
                modelo_veiculo,
                ano_fabricacao_veiculo,
                tipo_veiculo,
                valor_arremate,
                fk_Empresa_id_empresa,
                fk_Edital_de_Licitacao_id_licitacao,
                fk_Pregao_id_pregao
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, lote.getQuantidade());
            stmt.setString(2, lote.getNumeroLote());
            stmt.setString(3, lote.getObjetoDoLote());
            stmt.setString(4, lote.getModelo_veiculo());
            stmt.setString(5, lote.getAno_fabricacao());
            stmt.setString(6, lote.getTipo_veiculo());

            if (lote.getValorArremate() == 0.0) {
                stmt.setNull(7, Types.DOUBLE);
            } else {
                stmt.setDouble(7, lote.getValorArremate());
            }

            if (lote.getFkIdEmpresa() == 0) {
                stmt.setNull(8, Types.INTEGER);
            } else {
                stmt.setInt(8, lote.getFkIdEmpresa());
            }

            stmt.setInt(9, lote.getFkIdEditalDeLicitacao());
            stmt.setInt(10, lote.getFkIdPregao());

            int linhasAfetadas = stmt.executeUpdate();
            if (linhasAfetadas == 0) {
                throw new SQLException("Erro ao inserir o lote, nenhuma linha afetada.");
            }

            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    return rs.getInt(1);
                } else {
                    throw new SQLException("Erro ao obter ID do lote gerado.");
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao salvar lote: " + e.getMessage(), e);
        }
    }

    public void atualizar(Lote lote) {
        String sql = """
            UPDATE Lote SET
                quantidade = ?,
                numero_lote = ?,
                objeto = ?,
                modelo_veiculo = ?,
                ano_fabricacao_veiculo = ?,
                tipo_veiculo = ?,
                valor_arremate = ?,
                fk_Empresa_id_empresa = ?,
                fk_Edital_de_Licitacao_id_licitacao = ?,
                fk_Pregao_id_pregao = ?
            WHERE id_lote = ?
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, lote.getQuantidade());
            stmt.setString(2, lote.getNumeroLote());
            stmt.setString(3, lote.getObjetoDoLote());
            stmt.setString(4, lote.getModelo_veiculo());
            stmt.setString(5, lote.getAno_fabricacao());
            stmt.setString(6, lote.getTipo_veiculo());

            if (lote.getValorArremate() == 0.0) {
                stmt.setNull(7, Types.DOUBLE);
            } else {
                stmt.setDouble(7, lote.getValorArremate());
            }

            if (lote.getFkIdEmpresa() == 0) {
                stmt.setNull(8, Types.INTEGER);
            } else {
                stmt.setInt(8, lote.getFkIdEmpresa());
            }

            stmt.setInt(9, lote.getFkIdEditalDeLicitacao());
            stmt.setInt(10, lote.getFkIdPregao());
            stmt.setInt(11, lote.getIdLote());

            stmt.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao atualizar lote: " + e.getMessage(), e);
        }
    }

    public void deletar(int idLote) {
        String sql = "DELETE FROM Lote WHERE id_lote = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idLote);
            stmt.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao deletar lote: " + e.getMessage(), e);
        }
    }
}
