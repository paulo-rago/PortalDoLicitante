import React, { useState } from "react";

function FormularioPregao({ editalId, onSubmitSuccess }) {
  const [pregao, setPregao] = useState({
    numeroPregao: "",
    statusPregao: "",
    modeloPregao: "",
    modalidade: "",
    horarioAbertura: "",
    dataEncerramento: ""
  });

  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...pregao,
        horarioAbertura: `${pregao.horarioAbertura}:00`, // garante formato HH:mm:ss
        fkEditalDeLicitacao: editalId,
        fkAnalistaDeLicitacao: 1 // Substituir com ID real se houver
      };

      const response = await fetch("http://localhost:8080/pregao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

if (!response.ok) {
  const errorText = await response.text();
  throw new Error("Erro ao cadastrar pregão: " + errorText);
}
      const data = await response.json();
      setMensagem("Pregão cadastrado com sucesso ✅");
      setPregao({
        numeroPregao: "",
        statusPregao: "",
        modeloPregao: "",
        modalidade: "",
        horarioAbertura: "",
        dataEncerramento: ""
      });

      onSubmitSuccess(data.idPregao); // callback passando o ID

    } catch (err) {
      setMensagem("Erro: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Pregão</h2>

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

      <label>Horário de Abertura:</label><br />
      <input
        type="time"
        value={pregao.horarioAbertura}
        onChange={(e) => setPregao({ ...pregao, horarioAbertura: e.target.value })}
        required
      /><br /><br />

      <label>Data de Encerramento:</label><br />
      <input
        type="date"
        value={pregao.dataEncerramento}
        onChange={(e) => setPregao({ ...pregao, dataEncerramento: e.target.value })}
        required
      /><br /><br />

      <button type="submit">Cadastrar</button>
      <p>{mensagem}</p>
    </form>
  );
}

export default FormularioPregao;
