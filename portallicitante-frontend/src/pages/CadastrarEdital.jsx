import React, { useState, useEffect } from "react";

function CadastrarEdital() {
  const [orgaos, setOrgaos] = useState([]);
  const [novoOrgao, setNovoOrgao] = useState({
    nomeOrgao: "",
    cnpj: "",
    rua: "",
    bairro: "",
    cep: "",
    numero: "",
    estado: "",
    municipio: "",
  });
  const [editandoOrgao, setEditandoOrgao] = useState(false);

  const [form, setForm] = useState({
    numeroLicitacao: "",
    orgaoResponsavel: "",
    dataAbertura: "",
    prazoEntrega: "",
    exigenciasTecnicas: "",
    documentacaoObrigatoria: "",
    valorEstimado: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/orgaos")
      .then((res) => res.json())
      .then((data) => setOrgaos(data));
  }, []);

  const handleCadastroOrgao = () => {
    fetch("http://localhost:8080/orgaos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoOrgao),
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
          municipio: "",
        });
        setEditandoOrgao(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      fkOrgaoPublicoId: form.orgaoResponsavel,
    };

    fetch("http://localhost:8080/editais", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() => alert("Edital cadastrado com sucesso ✅"));
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Cadastrar Edital</h2>
      <form onSubmit={handleSubmit}>
        <label>Número da Licitação:</label>
        <input
          placeholder="Ex: 45/2025"
          value={form.numeroLicitacao}
          onChange={(e) =>
            setForm({ ...form, numeroLicitacao: e.target.value })
          }
        />
        <br />
        <br />

        <label>Órgão Responsável:</label>
        <select
          value={form.orgaoResponsavel}
          onChange={(e) =>
            setForm({ ...form, orgaoResponsavel: e.target.value })
          }
        >
          <option value="">Selecione um órgão</option>
          {orgaos.map((orgao) => (
            <option key={orgao.idOrgaoPublico} value={orgao.idOrgaoPublico}>
              {orgao.nomeOrgao}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => setEditandoOrgao(true)}>
          + Novo órgão
        </button>
        <br />
        <br />

        {editandoOrgao && (
          <div>
            <h4>Novo Órgão Público</h4>
            <label>Nome:</label>
            <input
              placeholder="Nome do órgão público"
              value={novoOrgao.nomeOrgao}
              onChange={(e) =>
                setNovoOrgao({ ...novoOrgao, nomeOrgao: e.target.value })
              }
            />
            <br />
            <label>CNPJ:</label>
            <input
              placeholder="Ex: 12.345.678/0001-99"
              value={novoOrgao.cnpj}
              onChange={(e) =>
                setNovoOrgao({ ...novoOrgao, cnpj: e.target.value })
              }
            />
            <br />
            <label>Rua:</label>
            <input
              placeholder="Rua do órgão"
              value={novoOrgao.rua}
              onChange={(e) =>
                setNovoOrgao({ ...novoOrgao, rua: e.target.value })
              }
            />
            <br />
            <label>Bairro:</label>
            <input
              placeholder="Bairro"
              value={novoOrgao.bairro}
              onChange={(e) =>
                setNovoOrgao({ ...novoOrgao, bairro: e.target.value })
              }
            />
            <br />
            <label>CEP:</label>
            <input
              placeholder="00000-000"
              value={novoOrgao.cep}
              onChange={(e) =>
                setNovoOrgao({ ...novoOrgao, cep: e.target.value })
              }
            />
            <br />
            <label>Número:</label>
            <input
              placeholder="Número do prédio"
              value={novoOrgao.numero}
              onChange={(e) =>
                setNovoOrgao({ ...novoOrgao, numero: e.target.value })
              }
            />
            <br />
            <label>Estado (UF):</label>
            <input
              placeholder="Ex: PE"
              value={novoOrgao.estado}
              onChange={(e) =>
                setNovoOrgao({ ...novoOrgao, estado: e.target.value })
              }
            />
            <br />
            <label>Município:</label>
            <input
              placeholder="Cidade"
              value={novoOrgao.municipio}
              onChange={(e) =>
                setNovoOrgao({ ...novoOrgao, municipio: e.target.value })
              }
            />
            <br />
            <button type="button" onClick={handleCadastroOrgao}>
              Salvar órgão
            </button>
          </div>
        )}

        <br />
        <label>Data de Abertura:</label>
        <input
          type="date"
          value={form.dataAbertura}
          onChange={(e) => setForm({ ...form, dataAbertura: e.target.value })}
        />
        <br />
        <br />
        <label>Prazo de Entrega:</label>
        <input
          type="date"
          value={form.prazoEntrega}
          onChange={(e) => setForm({ ...form, prazoEntrega: e.target.value })}
        />
        <br />
        <br />
        <label>Exigências Técnicas:</label>
        <textarea
          placeholder="Descreva as exigências técnicas"
          value={form.exigenciasTecnicas}
          onChange={(e) =>
            setForm({ ...form, exigenciasTecnicas: e.target.value })
          }
        />
        <br />
        <br />
        <label>Documentação Obrigatória:</label>
        <textarea
          placeholder="Liste a documentação exigida"
          value={form.documentacaoObrigatoria}
          onChange={(e) =>
            setForm({ ...form, documentacaoObrigatoria: e.target.value })
          }
        />
        <br />
        <br />
        <label>Valor Estimado (R$):</label>
        <input
          type="number"
          placeholder="Ex: 50000.00"
          value={form.valorEstimado}
          onChange={(e) =>
            setForm({ ...form, valorEstimado: e.target.value })
          }
        />
        <br />
        <br />
        <button type="submit">Cadastrar Edital</button>
      </form>
    </div>
  );
}

export default CadastrarEdital;
