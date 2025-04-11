package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.model.OrgaoPublico;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Repository
public class OrgaoPublicoRepository {

    private final DataSource dataSource;

    public OrgaoPublicoRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void salvar(OrgaoPublico orgao) {
        String sql = """
            INSERT INTO Orgao_Publico (
                CNPJ, nome_orgao, rua, bairro, cep, numero, estado, municipio
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, orgao.getCnpj());
            stmt.setString(2, orgao.getNomeOrgao());
            stmt.setString(3, orgao.getRua());
            stmt.setString(4, orgao.getBairro());
            stmt.setString(5, orgao.getCep());
            stmt.setString(6, orgao.getNumero());
            stmt.setString(7, orgao.getEstado());
            stmt.setString(8, orgao.getMunicipio());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void atualizar(OrgaoPublico orgao) {
        String sql = """
            UPDATE Orgao_Publico SET 
                CNPJ = ?, 
                nome_orgao = ?, 
                rua = ?, 
                bairro = ?, 
                cep = ?, 
                numero = ?, 
                estado = ?, 
                municipio = ?
            WHERE id_orgao_publico = ?
        """;

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, orgao.getCnpj());
            stmt.setString(2, orgao.getNomeOrgao());
            stmt.setString(3, orgao.getRua());
            stmt.setString(4, orgao.getBairro());
            stmt.setString(5, orgao.getCep());
            stmt.setString(6, orgao.getNumero());
            stmt.setString(7, orgao.getEstado());
            stmt.setString(8, orgao.getMunicipio());
            stmt.setInt(9, orgao.getIdOrgaoPublico());

            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void deletar(int id) {
        String sql = "DELETE FROM Orgao_Publico WHERE id_orgao_publico = ?";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            stmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
