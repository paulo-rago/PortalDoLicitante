package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.model.EditalDeLicitacao;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

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
            stmt.setDate(3, edital.getDataDeAbertura() != null ? java.sql.Date.valueOf(edital.getDataDeAbertura()) : null);
            stmt.setDate(4, edital.getPrazoEntrega() != null ? java.sql.Date.valueOf(edital.getPrazoEntrega()) : null);
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
            stmt.setDate(3, edital.getDataDeAbertura() != null ? java.sql.Date.valueOf(edital.getDataDeAbertura()) : null);
            stmt.setDate(4, edital.getPrazoEntrega() != null ? java.sql.Date.valueOf(edital.getPrazoEntrega()) : null);
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

    public List<EditalDeLicitacao> listarTodos() {
        List<EditalDeLicitacao> lista = new ArrayList<>();
        String sql = "SELECT * FROM Edital_de_Licitacao";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                EditalDeLicitacao edital = new EditalDeLicitacao();
                edital.setId(rs.getInt("id_licitacao"));
                edital.setNumeroLicitacao(rs.getString("numero_licitacao"));
                edital.setOrgaoResponsavel(rs.getString("orgao_responsavel"));

                java.sql.Date dataAbertura = rs.getDate("data_de_abertura");
                if (dataAbertura != null) {
                    edital.setDataDeAbertura(dataAbertura.toLocalDate());
                }

                java.sql.Date prazoEntrega = rs.getDate("prazo_entrega");
                if (prazoEntrega != null) {
                    edital.setPrazoEntrega(prazoEntrega.toLocalDate());
                }

                edital.setExigenciaTecnicas(rs.getString("exigencia_tecnicas"));
                edital.setDocumentacaoObrigatoria(rs.getString("documentacao_obrigatoria"));
                edital.setValorEstimado(rs.getBigDecimal("valor_estimado"));
                edital.setFkOrgaoPublicoId(rs.getInt("fk_Orgao_Publico_id_orgao_publico"));

                lista.add(edital);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lista;
    }
}
