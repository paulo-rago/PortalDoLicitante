// src/pages/CadastrarPregao.jsx
import React, { useState } from "react";

function CadastrarPregao() {
  const [pregao, setPregao] = useState({
    numeroPregao: "",
    statusPregao: "",
    modeloPregao: "",
    modalidade: ""
  });

  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/pregao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(pregao)
      });

      if (!response.ok) throw new Error("Erro ao cadastrar o pregão");

      setMensagem("Pregão cadastrado com sucesso ✅");
      setPregao({
        numeroPregao: "",
        statusPregao: "",
        modeloPregao: "",
        modalidade: ""
      });
    } catch (err) {
      setMensagem("Erro: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2>Cadastrar Pregão</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Número do Pregão"
          value={pregao.numeroPregao}
          onChange={(e) => setPregao({ ...pregao, numeroPregao: e.target.value })}
          required
        /><br /><br />

        <input
          type="text"
          placeholder="Status do Pregão"
          value={pregao.statusPregao}
          onChange={(e) => setPregao({ ...pregao, statusPregao: e.target.value })}
          required
        /><br /><br />

        <input
          type="text"
          placeholder="Modelo do Pregão"
          value={pregao.modeloPregao}
          onChange={(e) => setPregao({ ...pregao, modeloPregao: e.target.value })}
          required
        /><br /><br />

        <input
          type="text"
          placeholder="Modalidade"
          value={pregao.modalidade}
          onChange={(e) => setPregao({ ...pregao, modalidade: e.target.value })}
          required
        /><br /><br />

        <button type="submit">Cadastrar</button>
      </form>
      <p>{mensagem}</p>
    </div>
  );
}

export default CadastrarPregao;
