package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.model.AnalistaDeLicitacao;
import com.vrio.portallicitante.model.Funcionario;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class AnalistaDeLicitacaoRepository {

    private final DataSource dataSource;

    public AnalistaDeLicitacaoRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void salvar(AnalistaDeLicitacao analista) {
        String sql = "INSERT INTO Analista_de_Licitacao (fk_Funcionario_id_funcionario, supervisor) VALUES (?, ?)";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, analista.getFuncionario().getIdFuncionario());

            if (analista.getSupervisor() == null || analista.getSupervisor() == 0) {
                stmt.setNull(2, Types.INTEGER);
            } else {
                stmt.setInt(2, analista.getSupervisor());
            }

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<AnalistaDeLicitacao> listarTodos() {
        List<AnalistaDeLicitacao> lista = new ArrayList<>();
        String sql = "SELECT * FROM Analista_de_Licitacao";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Funcionario funcionario = new Funcionario();
                funcionario.setIdFuncionario(rs.getInt("fk_Funcionario_id_funcionario"));

                AnalistaDeLicitacao analista = new AnalistaDeLicitacao();
                analista.setFuncionario(funcionario);
                analista.setSupervisor(rs.getInt("supervisor"));

                lista.add(analista);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lista;
    }
}
