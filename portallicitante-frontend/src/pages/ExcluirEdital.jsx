import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ExcluirEdital.css";

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
    <div className = 'container_excluir_edital'>
      <h2>Confirmar Exclusão</h2>
      <p>Você realmente deseja excluir o edital <strong>{edital.numeroLicitacao}</strong>?</p>
      <p className="aviso">Esta ação não poderá ser desfeita!</p>

      <button onClick={confirmarExclusao} className="button-excluir-edital">
        Sim, excluir
      </button>
      <button onClick={() => navigate("/listar-processos")}>Cancelar</button>
    </div>
  );
}

export default ExcluirEdital;
