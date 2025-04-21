import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ExcluirEdital() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edital, setEdital] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/editais/${id}`)
      .then(res => res.json())
      .then(data => setEdital(data))
      .catch(err => {
        console.error("Erro ao buscar edital:", err);
        navigate("/listar-editais");
      });
  }, [id, navigate]);

  const confirmarExclusao = () => {
    fetch(`http://localhost:8080/editais/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        alert("Edital excluído com sucesso ✅");
        navigate("/listar-editais");
      })
      .catch((error) => {
        console.error("Erro ao excluir:", error);
        alert("Erro ao excluir edital.");
      });
  };

  if (!edital) return <p>Carregando edital...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", padding: 30 }}>
      <h2>Confirmar Exclusão</h2>
      <p>Você realmente deseja excluir o edital <strong>{edital.numeroLicitacao}</strong>?</p>
      <p style={{ color: "red" }}>Esta ação não poderá ser desfeita!</p>

      <button onClick={confirmarExclusao} style={{ marginRight: 10, background: "red", color: "white" }}>
        Sim, excluir
      </button>
      <button onClick={() => navigate("/listar-editais")}>Cancelar</button>
    </div>
  );
}

export default ExcluirEdital;
