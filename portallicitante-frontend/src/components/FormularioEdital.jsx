import React, { useState, useEffect } from "react";
import "../styles/FormularioEdital.css";

function FormularioEdital({ onSubmitSuccess }) {
  const [orgaos, setOrgaos] = useState([]);
  const [novoOrgao, setNovoOrgao] = useState({
    nomeOrgao: "",
    cnpj: "",
    rua: "",
    bairro: "",
    cep: "",
    numero: "",
    estado: "",
    municipio: ""
  });
  const [mostrarNovoOrgao, setMostrarNovoOrgao] = useState(false);

  const [form, setForm] = useState({
    numeroLicitacao: "",
    orgaoResponsavel: "",
    dataDeAbertura: "",
    prazoEntrega: "",
    exigenciaTecnicas: "",
    documentacaoObrigatoria: "",
    valorEstimado: ""
  });

  useEffect(() => {
    fetch("http://localhost:8080/orgaos")
      .then((res) => res.json())
      .then((data) => setOrgaos(Array.isArray(data) ? data : []));
  }, []);

  const handleCadastroOrgao = () => {
    fetch("http://localhost:8080/orgaos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoOrgao)
    })
      .then((res) => res.json())
      .then((orgaoSalvo) => {
        setOrgaos([...orgaos, orgaoSalvo]);
        setNovoOrgao({
          nomeOrgao: "",
          cnpj: "",
          rua: "",
          bairro: "",
          cep: "",
          numero: "",
          estado: "",
          municipio: ""
        });
        setMostrarNovoOrgao(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      fkOrgaoPublicoId: form.orgaoResponsavel
    };

    try {
      const response = await fetch("http://localhost:8080/editais", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Erro ao cadastrar edital");

      const data = await response.json();
      alert("Edital cadastrado com sucesso ✅");

      if (onSubmitSuccess) {
        onSubmitSuccess(data.id);
      }
    } catch (err) {
      alert("Erro: " + err.message);
    }
  };

  return (
    <form className="form-edital" onSubmit={handleSubmit}>
      <h2>Cadastrar Edital</h2>

      <div className="form-grid">
        <div>
          <label>Nº da Licitação:</label>
          <input
            className="input-numero-licitacao"
            value={form.numeroLicitacao}
            onChange={(e) =>
              setForm({ ...form, numeroLicitacao: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>Órgão Responsável:</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <select
              className="input-orgao-responsavel"
              value={form.orgaoResponsavel}
              onChange={(e) =>
                setForm({ ...form, orgaoResponsavel: e.target.value })
              }
              required
            >
              <option value="">Selecione um órgão</option>
              {orgaos.map((orgao) => (
                <option key={orgao.idOrgaoPublico} value={orgao.idOrgaoPublico}>
                  {orgao.nomeOrgao}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="botao-mais-orgao"
              onClick={() => setMostrarNovoOrgao(!mostrarNovoOrgao)}
              title="Adicionar novo órgão"
            >
              +
            </button>
          </div>

          {mostrarNovoOrgao && (
            <div className="bloco-novo-orgao">
              <h4>Novo Órgão Público</h4>
              <input className="input-nome-orgao" placeholder="Nome" value={novoOrgao.nomeOrgao} onChange={(e) => setNovoOrgao({ ...novoOrgao, nomeOrgao: e.target.value })} />
              <input className="input-cnpj-orgao" placeholder="CNPJ" value={novoOrgao.cnpj} onChange={(e) => setNovoOrgao({ ...novoOrgao, cnpj: e.target.value })} />
              <input className="input-rua-orgao" placeholder="Rua" value={novoOrgao.rua} onChange={(e) => setNovoOrgao({ ...novoOrgao, rua: e.target.value })} />
              <input className="input-bairro-orgao" placeholder="Bairro" value={novoOrgao.bairro} onChange={(e) => setNovoOrgao({ ...novoOrgao, bairro: e.target.value })} />
              <input className="input-cep-orgao" placeholder="CEP" value={novoOrgao.cep} onChange={(e) => setNovoOrgao({ ...novoOrgao, cep: e.target.value })} />
              <input className="input-numero-orgao" placeholder="Número" value={novoOrgao.numero} onChange={(e) => setNovoOrgao({ ...novoOrgao, numero: e.target.value })} />
              <input className="input-estado-orgao" placeholder="Estado (UF)" value={novoOrgao.estado} onChange={(e) => setNovoOrgao({ ...novoOrgao, estado: e.target.value })} />
              <input className="input-municipio-orgao" placeholder="Município" value={novoOrgao.municipio} onChange={(e) => setNovoOrgao({ ...novoOrgao, municipio: e.target.value })} />
              <button type="button" className="botao-salvar" onClick={handleCadastroOrgao}>
                Salvar órgão
              </button>
            </div>
          )}
        </div>

        <div>
          <label>Prazo de Entrega:</label>
          <input
            className="input-prazo-entrega"
            type="date"
            value={form.prazoEntrega}
            onChange={(e) =>
              setForm({ ...form, prazoEntrega: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>Data de Abertura:</label>
          <input
            className="input-data-abertura"
            type="date"
            value={form.dataDeAbertura}
            onChange={(e) =>
              setForm({ ...form, dataDeAbertura: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>Exigências Técnicas:</label>
          <input
            className="input-exigencias-tecnicas"
            value={form.exigenciaTecnicas}
            onChange={(e) =>
              setForm({ ...form, exigenciaTecnicas: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label>Valor Estimado:</label>
          <input
            className="input-valor-estimado"
            type="number"
            value={form.valorEstimado}
            onChange={(e) =>
              setForm({ ...form, valorEstimado: e.target.value })
            }
            required
          />
        </div>

        <div className="linha-completa">
          <label>Documentação Obrigatória:</label>
          <input
            className="input-documentacao-obrigatoria"
            value={form.documentacaoObrigatoria}
            onChange={(e) =>
              setForm({ ...form, documentacaoObrigatoria: e.target.value })
            }
            required
          />
        </div>
      </div>

      <button type="submit" className="botao-salvar">
        Salvar Modificações
      </button>
    </form>
  );
}

export default FormularioEdital;
