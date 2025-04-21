import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CadastrarLote() {
  const { idPregao } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    numeroLote: "",
    objetoDoLote: "",
    quantidade: "",
    fkIdEmpresa: ""
  });

  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/empresas")
      .then((res) => res.json())
      .then((data) => setEmpresas(data))
      .catch((err) => console.error("Erro ao carregar empresas:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const lotePayload = {
      ...form,
      fkIdPregao: parseInt(idPregao)
    };

    fetch("http://localhost:8080/lotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(lotePayload),
    })
      .then((res) => {
        if (res.ok) {
          alert("Lote cadastrado com sucesso ✅");
          navigate("/listar-pregoes");
        } else {
          throw new Error("Erro ao cadastrar lote");
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Cadastrar Lote para o Pregão #{idPregao}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Número do Lote"
          value={form.numeroLote}
          onChange={(e) => setForm({ ...form, numeroLote: e.target.value })}
          required
        /><br /><br />

        <input
          placeholder="Objeto do Lote"
          value={form.objetoDoLote}
          onChange={(e) => setForm({ ...form, objetoDoLote: e.target.value })}
          required
        /><br /><br />

        <input
          placeholder="Quantidade"
          type="number"
          value={form.quantidade}
          onChange={(e) => setForm({ ...form, quantidade: e.target.value })}
          required
        /><br /><br />

        <label>Empresa (opcional):</label>
        <select
          value={form.fkIdEmpresa}
          onChange={(e) => setForm({ ...form, fkIdEmpresa: e.target.value })}
        >
          <option value="">-- Nenhuma --</option>
          {empresas.map((emp) => (
            <option key={emp.idEmpresa} value={emp.idEmpresa}>
              {emp.nome}
            </option>
          ))}
        </select>
        <br /><br />

        <button type="submit">Cadastrar Lote</button>
      </form>
    </div>
  );
}

export default CadastrarLote;
