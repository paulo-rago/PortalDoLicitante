// src/pages/EditarPregao.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditarPregao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pregao, setPregao] = useState({
    numeroPregao: "",
    statusPregao: "",
    modeloPregao: "",
    modalidade: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8080/pregao/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPregao(data))
      .catch((err) => console.error("Erro ao buscar pregão:", err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/pregao/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(pregao),
    })
      .then(() => {
        alert("Pregão atualizado com sucesso ✅");
        navigate("/listar-pregoes");
      })
      .catch((err) => console.error("Erro ao atualizar:", err));
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h2>Editar Pregão</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Número do Pregão"
          value={pregao.numeroPregao}
          onChange={(e) => setPregao({ ...pregao, numeroPregao: e.target.value })}
        /><br /><br />
        <input
          placeholder="Status"
          value={pregao.statusPregao}
          onChange={(e) => setPregao({ ...pregao, statusPregao: e.target.value })}
        /><br /><br />
        <input
          placeholder="Modelo"
          value={pregao.modeloPregao}
          onChange={(e) => setPregao({ ...pregao, modeloPregao: e.target.value })}
        /><br /><br />
        <input
          placeholder="Modalidade"
          value={pregao.modalidade}
          onChange={(e) => setPregao({ ...pregao, modalidade: e.target.value })}
        /><br /><br />
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarPregao;
