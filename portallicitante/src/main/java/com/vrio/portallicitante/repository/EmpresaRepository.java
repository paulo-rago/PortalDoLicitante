package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.model.Empresa;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Repository
public class EmpresaRepository {

    private final DataSource dataSource;

    public EmpresaRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void salvar(Empresa empresa) {
        String sql = """
            INSERT INTO Empresa (
                CNPJ_empresa, telefone_empresa, cep, rua, bairro, numero, estado
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, empresa.getCNPJ());
            stmt.setString(3, empresa.getCEP());
            stmt.setString(4, empresa.getRua());
            stmt.setString(6, empresa.getNumero());
            stmt.setString(7, empresa.getEstado());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
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
                estado = ?
            WHERE id_empresa = ?
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, empresa.getCNPJ());
            stmt.setString(3, empresa.getCEP());
            stmt.setString(4, empresa.getRua());
            stmt.setString(6, empresa.getNumero());
            stmt.setString(7, empresa.getEstado());
            stmt.setInt(8, empresa.getIdEmpresa());

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
