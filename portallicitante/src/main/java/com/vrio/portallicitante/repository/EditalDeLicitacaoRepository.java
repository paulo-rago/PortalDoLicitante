package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.model.EditalDeLicitacao;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Repository
public class EditalDeLicitacaoRepository {

    private final DataSource dataSource;

    public EditalDeLicitacaoRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void salvar(EditalDeLicitacao edital) {
        String sql = """
            INSERT INTO Edital_de_Licitacao (
                numero_licitacao,
                orgao_responsavel,
                data_de_abertura,
                prazo_entrega,
                exigencia_tecnicas,
                documentacao_obrigatoria,
                valor_estimado,
                fk_Orgao_Publico_id_orgao_publico
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, edital.getNumeroLicitacao());
            stmt.setString(2, edital.getOrgaoResponsavel());
            stmt.setDate(3, edital.getDataDeAbertura());
            stmt.setDate(4, edital.getPrazoEntrega());
            stmt.setString(5, edital.getExigenciaTecnicas());
            stmt.setString(6, edital.getDocumentacaoObrigatoria());
            stmt.setBigDecimal(7, edital.getValorEstimado());
            stmt.setInt(8, edital.getFkOrgaoPublicoId());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void atualizar(EditalDeLicitacao edital) {
        String sql = """
            UPDATE Edital_de_Licitacao
            SET numero_licitacao = ?, 
                orgao_responsavel = ?, 
                data_de_abertura = ?, 
                prazo_entrega = ?,
                exigencia_tecnicas = ?, 
                documentacao_obrigatoria = ?, 
                valor_estimado = ?, 
                fk_Orgao_Publico_id_orgao_publico = ?
            WHERE id_licitacao = ?
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, edital.getNumeroLicitacao());
            stmt.setString(2, edital.getOrgaoResponsavel());
            stmt.setDate(3, edital.getDataDeAbertura());
            stmt.setDate(4, edital.getPrazoEntrega());
            stmt.setString(5, edital.getExigenciaTecnicas());
            stmt.setString(6, edital.getDocumentacaoObrigatoria());
            stmt.setBigDecimal(7, edital.getValorEstimado());
            stmt.setInt(8, edital.getFkOrgaoPublicoId());
            stmt.setInt(9, edital.getId());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deletar(int id) {
        String sql = "DELETE FROM Edital_de_Licitacao WHERE id_licitacao = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
