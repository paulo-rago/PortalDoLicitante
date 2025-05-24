import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditarEdital.css";

function EditarEdital() {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    numeroLicitacao: "",
    orgaoResponsavel: "",
    dataDeAbertura: "",
    prazoEntrega: "",
    exigenciaTecnicas: "",
    documentacaoObrigatoria: "",
    valorEstimado: "",
    fkOrgaoPublicoId: "",
  });

  const [orgaos, setOrgaos] = useState([]);

  useEffect(() => {
    // Buscar dados do edital
    fetch(`http://localhost:8080/editais/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setForm(data));

    // Buscar lista de órgãos
    fetch("http://localhost:8080/orgaos", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrgaos(data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/editais/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.ok) {
          alert("Edital atualizado com sucesso ✅");
          navigate("/listar-editais");
        } else {
          alert("Erro ao atualizar edital");
        }
      });
  };

  return (
    <div className="container-editar-edital">
      <h1>Editar Edital</h1>
      <form className="form-editar-edital" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label>N° da Licitação:</label>
            <input
              className="input-numero-licitacao"
              value={form.numeroLicitacao}
              onChange={(e) => setForm({ ...form, numeroLicitacao: e.target.value })}
            /><br /><br />
          </div>

          <div>
            <label>Órgão Responsável:</label>
            <select
              className="input-orgao-responsavel"
              value={form.fkOrgaoPublicoId}
              onChange={(e) => setForm({ ...form, fkOrgaoPublicoId: e.target.value })}
            >
              <option value="">Selecione</option>
              {orgaos.map((orgao) => (
                <option key={orgao.idOrgaoPublico} value={orgao.idOrgaoPublico}>
                  {orgao.nomeOrgao}
                </option>
              ))}
            </select><br /><br />
          </div>

          <div>
            <label>Prazo de Entrega:</label>
            <input
              className="input-prazo-entrega"
              type="date"
              value={form.prazoEntrega}
              onChange={(e) => setForm({ ...form, prazoEntrega: e.target.value })}
            /><br /><br />
          </div>

          <div>
            <label>Data de Abertura:</label>
            <input
              className="input-data-abertura"
              type="date"
              value={form.dataDeAbertura}
              onChange={(e) => setForm({ ...form, dataDeAbertura: e.target.value })}
            /><br /><br />
          </div>

          <div>
            <label>Exigências Técnicas:</label>
            <input
              className="input-exigencias-tecnicas"
              value={form.exigenciaTecnicas}
              onChange={(e) => setForm({ ...form, exigenciaTecnicas: e.target.value })}
            /><br /><br />
          </div>

          <div>
            <label>Valor Estimado:</label>
            <input
              className="input-valor-estimado"
              type="number"
              min="0"  
              value={form.valorEstimado}
              onChange={(e) => setForm({ ...form, valorEstimado: e.target.value })}
            /><br /><br />
          </div>

          <div className="linha-completa">
            <label>Documentação Obrigatória:</label>
            <input
              className="input-documentacao-obrigatoria"
              value={form.documentacaoObrigatoria}
              onChange={(e) => setForm({ ...form, documentacaoObrigatoria: e.target.value })}
            /><br /><br />
          </div>

          
        </div>

        <button className="botao-salvar-alteracoes" type="submit">Salvar alterações</button>
      </form>
    </div>
  );
}

export default EditarEdital;
