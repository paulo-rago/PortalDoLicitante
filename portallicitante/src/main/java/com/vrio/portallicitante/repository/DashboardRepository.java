package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.dto.TaxaSucessoDTO;
import com.vrio.portallicitante.dto.ValorPorAnoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class DashboardRepository {

    @Autowired
    private DataSource dataSource;

    public List<ValorPorAnoDTO> buscarValoresPorAno(String nomeEmpresa) {
        List<ValorPorAnoDTO> lista = new ArrayList<>();
        String sql = "{CALL get_valor_arrematado_por_ano(?)}";

        try (Connection conn = dataSource.getConnection();
             CallableStatement stmt = conn.prepareCall(sql)) {

            stmt.setString(1, nomeEmpresa);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                int ano = rs.getInt("ano");
                double total = rs.getDouble("total_arrematado");
                lista.add(new ValorPorAnoDTO(ano, total));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lista;
    }

    public Optional<TaxaSucessoDTO> buscarTaxaSucesso(String nomeEmpresa) {
        String sql = "{CALL get_taxa_sucesso_licitacoes(?)}";

        try (Connection conn = dataSource.getConnection();
             CallableStatement stmt = conn.prepareCall(sql)) {

            stmt.setString(1, nomeEmpresa);

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                int totalParticipados = rs.getInt("total_pregoes_participados");
                int totalVencidos = rs.getInt("total_pregoes_vencidos");
                double taxaSucesso = rs.getDouble("taxa_sucesso_percentual");

                return Optional.of(new TaxaSucessoDTO(totalParticipados, totalVencidos, taxaSucesso));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return Optional.empty();
    }
}
