import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ListarPregoes() {
  const [pregoes, setPregoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/pregao", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPregoes(data);
        } else {
          console.error("Resposta inesperada:", data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar pregões:", err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Pregões</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Número</th>
            <th>Status</th>
            <th>Modelo</th>
            <th>Modalidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pregoes.map((p) => (
            <tr key={p.idPregao}>
              <td>{p.idPregao}</td>
              <td>{p.numeroPregao}</td>
              <td>{p.statusPregao}</td>
              <td>{p.modeloPregao}</td>
              <td>{p.modalidade}</td>
              <td>
                <button
                  style={{ marginRight: 10 }}
                  onClick={() => navigate(`/editar-pregao/${p.idPregao}`)}
                >
                  Editar
                </button>
                <button
                  onClick={() => navigate(`/excluir-pregao/${p.idPregao}`)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarPregoes;
