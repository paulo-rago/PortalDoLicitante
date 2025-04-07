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
            stmt.setDate(3, edital.getDataDeAbertura()); // ← corrigido
            stmt.setDate(4, edital.getPrazoEntrega());   // ← corrigido
            stmt.setString(5, edital.getExigenciaTecnicas());
            stmt.setString(6, edital.getDocumentacaoObrigatoria());
            stmt.setDouble(7, edital.getValorEstimado());
            stmt.setInt(8, edital.getFkOrgaoPublicoId());

            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
