package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.model.VinculoLoteEditalPregao;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Repository
public class VinculoLoteEditalPregaoRepository {

    private final DataSource dataSource;

    public VinculoLoteEditalPregaoRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void salvar(VinculoLoteEditalPregao vinculo) {
        String sql = """
            INSERT INTO Possui_Edital_de_Licitacao_Lote_Pregao (
                fk_Lote_id_lote,
                fk_Pregao_id_pregao,
                fk_Edital_de_Licitacao_id_licitacao
            ) VALUES (?, ?, ?)
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, vinculo.getFkLoteId());
            stmt.setInt(2, vinculo.getFkPregaoId());
            stmt.setInt(3, vinculo.getFkEditalId());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
