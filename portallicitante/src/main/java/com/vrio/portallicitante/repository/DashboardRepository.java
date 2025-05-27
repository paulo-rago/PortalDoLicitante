package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.*;

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

    public Optional<DashboardKPIDTO> buscarKpiProcessos() {
        String sql = "SELECT " +
                "(SELECT COUNT(*) FROM pregao) AS total_pregoes, " +
                "(SELECT COUNT(*) FROM pregao WHERE status_pregao = 'ABERTO') AS pregoes_abertos, " +
                "(SELECT COUNT(*) FROM pregao WHERE status_pregao = 'ENCERRADO') AS pregoes_encerrados";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            if (rs.next()) {
                int total = rs.getInt("total_pregoes");
                int abertos = rs.getInt("pregoes_abertos");
                int encerrados = rs.getInt("pregoes_encerrados");

                return Optional.of(new DashboardKPIDTO(total, abertos, encerrados));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return Optional.empty();
    }

    public List<EvolucaoPregoesPorMesDTO> buscarEvolucaoPregoesPorMes() {
        String sql = """
        SELECT 
            YEAR(horario_abertura) AS ano,
            MONTH(horario_abertura) AS mes,
            COUNT(*) AS total_pregoes
        FROM pregao
        GROUP BY ano, mes
        ORDER BY ano, mes;
    """;

        List<EvolucaoPregoesPorMesDTO> lista = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                lista.add(new EvolucaoPregoesPorMesDTO(
                        rs.getInt("ano"),
                        rs.getInt("mes"),
                        rs.getInt("total_pregoes")
                ));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lista;
    }

    public List<PregoesPorOrgaoDTO> buscarPregoesPorOrgao() {
        String sql = """
        SELECT 
            o.nome_orgao AS orgao,
            COUNT(p.id_pregao) AS total_pregoes
        FROM pregao p
        INNER JOIN edital_de_licitacao e ON p.fk_Edital_de_Licitacao_id_licitacao = e.id_licitacao
        INNER JOIN orgao_publico o ON e.fk_Orgao_Publico_id_orgao_publico = o.id_orgao_publico
        GROUP BY o.nome_orgao
        ORDER BY total_pregoes DESC;
    """;

        List<PregoesPorOrgaoDTO> lista = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                lista.add(new PregoesPorOrgaoDTO(
                        rs.getString("orgao"),
                        rs.getInt("total_pregoes")
                ));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lista;
    }

    public List<PregoesPorStatusDTO> buscarPregoesPorStatus() {
        String sql = """
        SELECT 
            status_pregao,
            COUNT(*) AS total
        FROM pregao
        GROUP BY status_pregao;
    """;

        List<PregoesPorStatusDTO> lista = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                lista.add(new PregoesPorStatusDTO(
                        rs.getString("status_pregao"),
                        rs.getInt("total")
                ));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lista;
    }

    public List<PodioAnalistasDTO> buscarPodioAnalistas() {
        String sql = """
        SELECT 
            f.nome_funcionario AS analista,
            COUNT(DISTINCT p.id_pregao) AS total_pregoes
        FROM pregao p
        INNER JOIN lote l ON l.fk_Pregao_id_pregao = p.id_pregao
        INNER JOIN empresa e ON l.fk_Empresa_id_empresa = e.id_empresa
        INNER JOIN funcionario f ON p.fk_analista_de_licitacao_id_funcionario = f.id_funcionario
        WHERE e.nome = 'AutoVrio'
        GROUP BY f.nome_funcionario
        ORDER BY total_pregoes DESC
        LIMIT 4;
    """;

        List<PodioAnalistasDTO> lista = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                lista.add(new PodioAnalistasDTO(
                        rs.getString("analista"),
                        rs.getInt("total_pregoes")
                ));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lista;
    }



}
