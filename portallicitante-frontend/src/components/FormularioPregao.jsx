import React, { useState } from "react";
import "../styles/FormularioPregao.css";

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
    <div className="container-formulario-pregao">
      <h1>Cadastrar Pregão</h1>
      <form className="formulario-pregao-form" onSubmit={handleSubmit}>
        <label>N° do Pregão:</label>
        <input
          className="formulario-pregao-input formulario-pregao-numero"
          type="text"
          value={pregao.numeroPregao}
          onChange={(e) => setPregao({ ...pregao, numeroPregao: e.target.value })}
          required
          name="numeroPregao"
          id="formulario-pregao-numero"
        /><br /><br />

        <label>Status do Pregão:</label>
        <input
          className="formulario-pregao-input formulario-pregao-status"
          type="text"
          value={pregao.statusPregao}
          onChange={(e) => setPregao({ ...pregao, statusPregao: e.target.value })}
          required
          name="statusPregao"
          id="formulario-pregao-status"
        /><br /><br />

        <label>Modelo do Pregão:</label>
        <input
          className="formulario-pregao-input formulario-pregao-modelo"
          type="text"
          value={pregao.modeloPregao}
          onChange={(e) => setPregao({ ...pregao, modeloPregao: e.target.value })}
          required
          name="modeloPregao"
          id="formulario-pregao-modelo"
        /><br /><br />

        <label>Modalidade:</label>
        <input
          className="formulario-pregao-input formulario-pregao-modalidade"
          type="text"
          value={pregao.modalidade}
          onChange={(e) => setPregao({ ...pregao, modalidade: e.target.value })}
          required
          name="modalidadePregao"
          id="formulario-pregao-modalidade"
        /><br /><br />

        <label>Horário de Abertura:</label><br />
        <input
          className="formulario-pregao-input formulario-pregao-horario"
          type="time"
          value={pregao.horarioAbertura}
          onChange={(e) => setPregao({ ...pregao, horarioAbertura: e.target.value })}
          required
          name="horarioAbertura"
          id="formulario-pregao-horario"
        /><br /><br />

        <label>Data de Encerramento:</label>
        <input
          className="formulario-pregao-input formulario-pregao-data-encerramento"
          type="date"
          value={pregao.dataEncerramento}
          onChange={(e) => setPregao({ ...pregao, dataEncerramento: e.target.value })}
          required
          name="dataEncerramento"
          id="formulario-pregao-data-encerramento"
        /><br /><br />

        <button className="formulario-pregao-btn" type="submit">Cadastrar</button>
        <p className="formulario-pregao-msg">{mensagem}</p>
      </form>
    </div>
  );
}

export default FormularioPregao;
