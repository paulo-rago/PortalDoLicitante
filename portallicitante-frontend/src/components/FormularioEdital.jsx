import React, { useState, useEffect } from "react";

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
  const [editandoOrgao, setEditandoOrgao] = useState(false);

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
        setEditandoOrgao(false);
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
        onSubmitSuccess(data.id); // <- Importante! Chama o avanço de etapa com o ID
      }

    } catch (err) {
      alert("Erro: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Edital</h2>

      <input
        placeholder="Número da Licitação"
        value={form.numeroLicitacao}
        onChange={(e) =>
          setForm({ ...form, numeroLicitacao: e.target.value })
        }
        required
      /><br /><br />

      <label>Órgão Responsável:</label><br />
      <select
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
      <button type="button" onClick={() => setEditandoOrgao(true)}>
        + Novo órgão
      </button>
      <br /><br />

      {editandoOrgao && (
        <div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 20 }}>
          <h4>Novo Órgão Público</h4>
          <input
            placeholder="Nome"
            value={novoOrgao.nomeOrgao}
            onChange={(e) =>
              setNovoOrgao({ ...novoOrgao, nomeOrgao: e.target.value })
            }
          /><br />
          <input
            placeholder="CNPJ"
            value={novoOrgao.cnpj}
            onChange={(e) => setNovoOrgao({ ...novoOrgao, cnpj: e.target.value })}
          /><br />
          <input
            placeholder="Rua"
            value={novoOrgao.rua}
            onChange={(e) => setNovoOrgao({ ...novoOrgao, rua: e.target.value })}
          /><br />
          <input
            placeholder="Bairro"
            value={novoOrgao.bairro}
            onChange={(e) => setNovoOrgao({ ...novoOrgao, bairro: e.target.value })}
          /><br />
          <input
            placeholder="CEP"
            value={novoOrgao.cep}
            onChange={(e) => setNovoOrgao({ ...novoOrgao, cep: e.target.value })}
          /><br />
          <input
            placeholder="Número"
            value={novoOrgao.numero}
            onChange={(e) =>
              setNovoOrgao({ ...novoOrgao, numero: e.target.value })
            }
          /><br />
          <input
            placeholder="Estado (UF)"
            value={novoOrgao.estado}
            onChange={(e) =>
              setNovoOrgao({ ...novoOrgao, estado: e.target.value })
            }
          /><br />
          <input
            placeholder="Município"
            value={novoOrgao.municipio}
            onChange={(e) =>
              setNovoOrgao({ ...novoOrgao, municipio: e.target.value })
            }
          /><br />
          <button type="button" onClick={handleCadastroOrgao}>
            Salvar órgão
          </button>
        </div>
      )}

      <label>Data de Abertura:</label><br />
      <input
        type="date"
        value={form.dataDeAbertura}
        onChange={(e) =>
          setForm({ ...form, dataDeAbertura: e.target.value })
        }
        required
      /><br /><br />

      <label>Prazo de Entrega:</label><br />
      <input
        type="date"
        value={form.prazoEntrega}
        onChange={(e) =>
          setForm({ ...form, prazoEntrega: e.target.value })
        }
        required
      /><br /><br />

      <textarea
        placeholder="Exigências Técnicas"
        value={form.exigenciaTecnicas}
        onChange={(e) =>
          setForm({ ...form, exigenciaTecnicas: e.target.value })
        }
        required
      /><br /><br />

      <textarea
        placeholder="Documentação Obrigatória"
        value={form.documentacaoObrigatoria}
        onChange={(e) =>
          setForm({ ...form, documentacaoObrigatoria: e.target.value })
        }
        required
      /><br /><br />

      <input
        type="number"
        placeholder="Valor Estimado (R$)"
        value={form.valorEstimado}
        onChange={(e) =>
          setForm({ ...form, valorEstimado: e.target.value })
        }
        required
      /><br /><br />

      <button type="submit">Cadastrar Edital</button>
    </form>
  );
}

export default FormularioEdital;
