// src/pages/ExcluirPregao.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function ExcluirPregao() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleConfirm = () => {
    fetch(`http://localhost:8080/pregao/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        alert("Pregão excluído com sucesso ✅");
        navigate("/listar-pregoes");
      })
      .catch((err) => console.error("Erro ao excluir:", err));
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Confirma a exclusão do Pregão ID {id}?</h2>
      <button onClick={handleConfirm} style={{ marginRight: 10 }}>Sim, excluir</button>
      <button onClick={() => navigate("/listar-pregoes")}>Cancelar</button>
    </div>
  );
}

export default ExcluirPregao;
