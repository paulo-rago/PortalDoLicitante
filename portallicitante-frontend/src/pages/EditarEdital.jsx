import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Editar Edital</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Número da Licitação"
          value={form.numeroLicitacao}
          onChange={(e) => setForm({ ...form, numeroLicitacao: e.target.value })}
        /><br /><br />

        <label>Órgão Responsável:</label>
        <select
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

        <label>Data de Abertura:</label>
        <input
          type="date"
          value={form.dataDeAbertura}
          onChange={(e) => setForm({ ...form, dataDeAbertura: e.target.value })}
        /><br /><br />

        <label>Prazo de Entrega:</label>
        <input
          type="date"
          value={form.prazoEntrega}
          onChange={(e) => setForm({ ...form, prazoEntrega: e.target.value })}
        /><br /><br />

        <label>Exigências Técnicas:</label>
        <textarea
          value={form.exigenciaTecnicas}
          onChange={(e) => setForm({ ...form, exigenciaTecnicas: e.target.value })}
        /><br /><br />

        <label>Documentação Obrigatória:</label>
        <textarea
          value={form.documentacaoObrigatoria}
          onChange={(e) => setForm({ ...form, documentacaoObrigatoria: e.target.value })}
        /><br /><br />

        <label>Valor Estimado:</label>
        <input
          type="number"
          value={form.valorEstimado}
          onChange={(e) => setForm({ ...form, valorEstimado: e.target.value })}
        /><br /><br />

        <button type="submit">Salvar alterações</button>
      </form>
    </div>
  );
}

export default EditarEdital;
