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
        horarioAbertura: `${pregao.horarioAbertura}:00`,
        fkEditalDeLicitacao: editalId,
        fkAnalistaDeLicitacao: 1
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

      onSubmitSuccess(data.idPregao);

    } catch (err) {
      setMensagem("Erro: " + err.message);
    }
  };

  return (
    <div className="container-formulario-pregao-1">
      <h1>Cadastrar Pregão</h1>
      <div className="container-formulario-pregao-2">
        <form className="formulario-pregao-form" onSubmit={handleSubmit}>

          <div className="formulario-pregao-inputs-wrapper">
            <div className="left-container">
              <div>
                <label>N° do Pregão</label>
                <input
                  className="formulario-pregao-input"
                  type="text"
                  value={pregao.numeroPregao}
                  onChange={(e) => setPregao({ ...pregao, numeroPregao: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Modalidade</label>
                <input
                  className="formulario-pregao-input"
                  type="text"
                  value={pregao.modalidade}
                  onChange={(e) => setPregao({ ...pregao, modalidade: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Horário de Abertura</label>
                <input
                  className="formulario-pregao-input"
                  type="time"
                  value={pregao.horarioAbertura}
                  onChange={(e) => setPregao({ ...pregao, horarioAbertura: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="right-container">
              <div>
                <label>Status do Pregão</label>
                <input
                  className="formulario-pregao-input"
                  type="text"
                  value={pregao.statusPregao}
                  onChange={(e) => setPregao({ ...pregao, statusPregao: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Modelo do Pregão</label>
                <input
                  className="formulario-pregao-input"
                  type="text"
                  value={pregao.modeloPregao}
                  onChange={(e) => setPregao({ ...pregao, modeloPregao: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Data de Encerramento</label>
                <input
                  className="formulario-pregao-input"
                  type="date"
                  value={pregao.dataEncerramento}
                  onChange={(e) => setPregao({ ...pregao, dataEncerramento: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <button className="formulario-pregao-btn" type="submit">
            Cadastrar
          </button>
          <p className="formulario-pregao-msg">{mensagem}</p>
        </form>
      </div>
    </div>
  );
}

export default FormularioPregao;
