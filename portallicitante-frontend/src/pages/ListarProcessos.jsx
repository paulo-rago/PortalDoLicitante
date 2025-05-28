// src/pages/ListarProcessos.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ListarProcessos.css"; // Adicione o caminho correto para o CSS

function ListarProcessos() {
  const [editais, setEditais] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/editais")
      .then(res => res.json())
      .then(data => {
        console.log("Editais recebidos:", data);
        if (Array.isArray(data)) {
          setEditais(data);
        } else {
          console.error("Resposta inesperada:", data);
        }
      })
      .catch(err => console.error("Erro ao buscar editais:", err));
  }, []);

  return (
    <div className="listar-processos-container">
      <table className="listar-processos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Número</th>
            <th>Órgão Responsável</th>
            <th>Data de Abertura</th>
            <th>Prazo de Entrega</th>
            <th>Exigências Técnicas</th>
            <th>Documentação Obrigatória</th>
            <th>Valor Estimado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {editais.length === 0 ? (
            <tr>
              <td colSpan="9">Nenhum edital cadastrado.</td>
            </tr>
          ) : (
            editais.map((edital) => (
              <tr key={edital.id}>
                <td>{edital.id}</td>
                <td>{edital.numeroLicitacao}</td>
                <td>{edital.orgaoResponsavel}</td>
                <td>{edital.dataDeAbertura}</td>
                <td>{edital.prazoEntrega}</td>
                <td>{edital.exigenciaTecnicas}</td>
                <td>{edital.documentacaoObrigatoria}</td>
                <td>{edital.valorEstimado}</td>
                <td>
                  <button
                    className="listar-processos-btn"
                    onClick={() => navigate(`/editar-edital/${edital.id}`)}
                  >
                    Editar
                  </button>
                  <button 
                    className="listar-processos-btn"                  
                    onClick={() => navigate(`/excluir-edital/${edital.id}`)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListarProcessos;
