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
    <div className="container-formulario-pregao-1">
      <h1>Cadastrar Pregão</h1>
      <div className="container-formulario-pregao-2">
        <form className="formulario-pregao-form" onSubmit={handleSubmit}>
          <div className="left-container">
            <div className="item-1">
              <label>N° do Pregão</label>
              <input
                className="formulario-pregao-input formulario-pregao-numero"
                type="text"
                value={pregao.numeroPregao}
                onChange={(e) => setPregao({ ...pregao, numeroPregao: e.target.value })}
                required
                name="numeroPregao"
                id="formulario-pregao-numero"
              />
            </div>
            <div className="item-2">
              <label>Modalidade</label>
              <input
                className="formulario-pregao-input formulario-pregao-modalidade"
                type="text"
                value={pregao.modalidade}
                onChange={(e) => setPregao({ ...pregao, modalidade: e.target.value })}
                required
                name="modalidadePregao"
                id="formulario-pregao-modalidade"
              />
            </div>
            <div className="item-3">
              <label>Horário de Abertura</label>
              <input
                className="formulario-pregao-input formulario-pregao-horario"
                type="time"
                value={pregao.horarioAbertura}
                onChange={(e) => setPregao({ ...pregao, horarioAbertura: e.target.value })}
                required
                name="horarioAbertura"
                id="formulario-pregao-horario"
              />
            </div>
          </div>

          <div className="right-container">
            <div className="item-4">
              <label>Status do Pregão</label>
              <input
                className="formulario-pregao-input formulario-pregao-status"
                type="text"
                value={pregao.statusPregao}
                onChange={(e) => setPregao({ ...pregao, statusPregao: e.target.value })}
                required
                name="statusPregao"
                id="formulario-pregao-status"
              />
            </div>
            <div className="item-5">
              <label>Modelo do Pregão</label>
              <input
                className="formulario-pregao-input formulario-pregao-modelo"
                type="text"
                value={pregao.modeloPregao}
                onChange={(e) => setPregao({ ...pregao, modeloPregao: e.target.value })}
                required
                name="modeloPregao"
                id="formulario-pregao-modelo"
              />
            </div>
            <div className="item-6">
              <label>Data de Encerramento</label>
              <input
                className="formulario-pregao-input formulario-pregao-data-encerramento"
                type="date"
                value={pregao.dataEncerramento}
                onChange={(e) => setPregao({ ...pregao, dataEncerramento: e.target.value })}
                required
                name="dataEncerramento"
                id="formulario-pregao-data-encerramento"
              />
            </div>
          </div>
          <button className="formulario-pregao-btn" type="submit">Cadastrar</button>
          <p className="formulario-pregao-msg">{mensagem}</p>
        </form>
      </div>
    </div>
  );
}

export default FormularioPregao;
