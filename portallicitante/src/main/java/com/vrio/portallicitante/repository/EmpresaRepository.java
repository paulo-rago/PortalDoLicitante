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
            CNPJ_empresa, telefone_empresa, cep, rua, bairro, numero, estado, nome
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
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
            System.out.println("CNPJ: " + empresa.getCnpj());
            System.out.println("CEP: " + empresa.getCep());

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
