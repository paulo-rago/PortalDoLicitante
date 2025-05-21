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
    <form className="formulario-pregao-form" onSubmit={handleSubmit}>
      <h2 className="formulario-pregao-title">Cadastrar Pregão</h2>

      <input
        className="formulario-pregao-input formulario-pregao-numero"
        type="text"
        placeholder="Número do Pregão"
        value={pregao.numeroPregao}
        onChange={(e) => setPregao({ ...pregao, numeroPregao: e.target.value })}
        required
        name="numeroPregao"
        id="formulario-pregao-numero"
      /><br /><br />

      <input
        className="formulario-pregao-input formulario-pregao-status"
        type="text"
        placeholder="Status do Pregão"
        value={pregao.statusPregao}
        onChange={(e) => setPregao({ ...pregao, statusPregao: e.target.value })}
        required
        name="statusPregao"
        id="formulario-pregao-status"
      /><br /><br />

      <input
        className="formulario-pregao-input formulario-pregao-modelo"
        type="text"
        placeholder="Modelo do Pregão"
        value={pregao.modeloPregao}
        onChange={(e) => setPregao({ ...pregao, modeloPregao: e.target.value })}
        required
        name="modeloPregao"
        id="formulario-pregao-modelo"
      /><br /><br />

      <input
        className="formulario-pregao-input formulario-pregao-modalidade"
        type="text"
        placeholder="Modalidade"
        value={pregao.modalidade}
        onChange={(e) => setPregao({ ...pregao, modalidade: e.target.value })}
        required
        name="modalidadePregao"
        id="formulario-pregao-modalidade"
      /><br /><br />

      <label className="formulario-pregao-label" htmlFor="formulario-pregao-horario">Horário de Abertura:</label><br />
      <input
        className="formulario-pregao-input formulario-pregao-horario"
        type="time"
        value={pregao.horarioAbertura}
        onChange={(e) => setPregao({ ...pregao, horarioAbertura: e.target.value })}
        required
        name="horarioAbertura"
        id="formulario-pregao-horario"
      /><br /><br />

      <label className="formulario-pregao-label" htmlFor="formulario-pregao-data-encerramento">Data de Encerramento:</label><br />
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
  );
}

export default FormularioPregao;
