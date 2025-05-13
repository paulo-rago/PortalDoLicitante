package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.model.Pregao;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class PregaoRepository {

    private final DataSource dataSource;

    public PregaoRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public int salvar(Pregao pregao) {
        String sql = """
            INSERT INTO Pregao (
                numero_pregao,
                status_pregao,
                modelo_pregao,
                modalidade,
                horario_abertura,
                data_encerramento,
                fk_Edital_de_Licitacao_id_licitacao,
                fk_analista_de_licitacao_id_funcionario
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """;


        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, pregao.getNumeroPregao());
            stmt.setString(2, pregao.getStatusPregao());
            stmt.setString(3, pregao.getModeloPregao());
            stmt.setString(4, pregao.getModalidade());
            stmt.setTime(5, pregao.getHorarioAbertura());
            stmt.setDate(6, new java.sql.Date(pregao.getDataEncerramento().getTime()));
            stmt.setInt(7, pregao.getFkEditalDeLicitacao());
            stmt.setInt(8, pregao.getFkAnalistaDeLicitacao());

            int linhasAfetadas = stmt.executeUpdate();
            if (linhasAfetadas == 0) {
                throw new SQLException("Erro ao inserir o pregão, nenhuma linha afetada.");
            }

            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    return rs.getInt(1);
                } else {
                    throw new SQLException("Erro ao obter ID do pregão gerado.");
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao salvar pregão: " + e.getMessage(), e);
        }
    }

    public void atualizar(Pregao pregao) {
        String sql = """
            UPDATE Pregao SET
                numero_pregao = ?,
                status_pregao = ?,
                modelo_pregao = ?,
                modalidade = ?,
                horario_abertura = ?,
                data_encerramento = ?,
                fk_Edital_de_Licitacao_id_licitacao = ?,
                fk_analista_de_licitacao_id_funcionario = ?
            WHERE id_pregao = ?
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, pregao.getNumeroPregao());
            stmt.setString(2, pregao.getStatusPregao());
            stmt.setString(3, pregao.getModeloPregao());
            stmt.setString(4, pregao.getModalidade());
            stmt.setTime(5, pregao.getHorarioAbertura());
            stmt.setDate(6, new java.sql.Date(pregao.getDataEncerramento().getTime()));
            stmt.setInt(7, pregao.getFkEditalDeLicitacao());
            stmt.setInt(8, pregao.getFkAnalistaDeLicitacao());
            stmt.setInt(9, pregao.getIdPregao());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deletar(int idPregao) {
        String sql = "DELETE FROM Pregao WHERE id_pregao = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, idPregao);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Pregao> listarTodos() {
        List<Pregao> lista = new ArrayList<>();
        String sql = "SELECT * FROM Pregao";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Pregao pregao = new Pregao();
                pregao.setIdPregao(rs.getInt("id_pregao"));
                pregao.setNumeroPregao(rs.getString("numero_pregao"));
                pregao.setStatusPregao(rs.getString("status_pregao"));
                pregao.setModeloPregao(rs.getString("modelo_pregao"));
                pregao.setModalidade(rs.getString("modalidade"));
                pregao.setHorarioAbertura(rs.getTime("horario_abertura"));
                pregao.setDataEncerramento(rs.getDate("data_encerramento"));
                pregao.setFkEditalDeLicitacao(rs.getInt("fk_Edital_de_Licitacao_id_licitacao"));
                pregao.setFkAnalistaDeLicitacao(rs.getInt("fk_analista_de_licitacao_id_funcionario"));
                lista.add(pregao);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lista;
    }
}
