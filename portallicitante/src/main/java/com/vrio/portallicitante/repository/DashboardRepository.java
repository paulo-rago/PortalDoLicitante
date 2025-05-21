package com.vrio.portallicitante.repository;

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

@Repository
public class DashboardRepository {

    @Autowired
    private DataSource dataSource;

    public List<ValorPorAnoDTO> buscarValoresPorAno(String nomeEmpresa) {
        List<ValorPorAnoDTO> lista = new ArrayList<>();
        String sql = "{CALL get_valor_arrematado_por_ano('AutoVrio')}";

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
}
