package com.vrio.portallicitante.repository;

import com.vrio.portallicitante.model.OrgaoPublico;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

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

    public List<OrgaoPublico> listarTodos() {
        List<OrgaoPublico> lista = new ArrayList<>();
        String sql = "SELECT * FROM Orgao_Publico";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                OrgaoPublico o = new OrgaoPublico();
                o.setIdOrgaoPublico(rs.getInt("id_orgao_publico"));
                o.setCnpj(rs.getString("CNPJ"));
                o.setNomeOrgao(rs.getString("nome_orgao"));
                o.setRua(rs.getString("rua"));
                o.setBairro(rs.getString("bairro"));
                o.setCep(rs.getString("cep"));
                o.setNumero(rs.getString("numero"));
                o.setEstado(rs.getString("estado"));
                o.setMunicipio(rs.getString("municipio"));
                lista.add(o);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return lista;
    }
}
