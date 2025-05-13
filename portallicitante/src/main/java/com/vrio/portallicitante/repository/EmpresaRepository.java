package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.model.Empresa;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;

@Repository
public class EmpresaRepository {

    private final DataSource dataSource;

    public EmpresaRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public int salvar(Empresa empresa) {
        String sql = """
            INSERT INTO Empresa (
                CNPJ_empresa, telefone_empresa, cep, rua, bairro, numero, estado, nome
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, empresa.getCnpj());
            stmt.setString(2, empresa.getTelefone());
            stmt.setString(3, empresa.getCep());
            stmt.setString(4, empresa.getRua());
            stmt.setString(5, empresa.getBairro());
            stmt.setString(6, empresa.getNumero());
            stmt.setString(7, empresa.getEstado());
            stmt.setString(8, empresa.getNome());

            int affectedRows = stmt.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Erro ao inserir empresa, nenhuma linha afetada.");
            }

            try (ResultSet rs = stmt.getGeneratedKeys()) {
                if (rs.next()) {
                    return rs.getInt(1);
                } else {
                    throw new SQLException("Erro ao obter ID da empresa gerada.");
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException("Erro ao salvar empresa: " + e.getMessage(), e);
        }
    }

    public void atualizar(Empresa empresa) {
        String sql = """
        UPDATE Empresa SET 
            CNPJ_empresa = ?, 
            telefone_empresa = ?, 
            cep = ?, 
            rua = ?, 
            bairro = ?, 
            numero = ?, 
            estado = ?, 
            nome = ?
        WHERE id_empresa = ?
    """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, empresa.getCnpj());
            stmt.setString(2, empresa.getTelefone());
            stmt.setString(3, empresa.getCep());
            stmt.setString(4, empresa.getRua());
            stmt.setString(5, empresa.getBairro());
            stmt.setString(6, empresa.getNumero());
            stmt.setString(7, empresa.getEstado());
            stmt.setString(8, empresa.getNome());
            stmt.setInt(9, empresa.getIdEmpresa());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deletar(int id) {
        String sql = "DELETE FROM Empresa WHERE id_empresa = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
