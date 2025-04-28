import React, { useState, useEffect } from "react";

function CadastrarEdital() {
  const [orgaos, setOrgaos] = useState([]);
  const [editandoOrgao, setEditandoOrgao] = useState(false);
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

  const [edital, setEdital] = useState({
    numeroLicitacao: "",
    fkOrgaoPublicoId: "",
    dataDeAbertura: "",
    prazoEntrega: "",
    exigenciaTecnicas: "",
    documentacaoObrigatoria: "",
    valorEstimado: ""
  });

  const [pregao, setPregao] = useState({
    numeroPregao: "",
    statusPregao: "",
    modeloPregao: "",
    modalidade: ""
  });

  const [lotes, setLotes] = useState([{ numeroLote: "", objetoDoLote: "", quantidade: "" }]);

  useEffect(() => {
    fetch("http://localhost:8080/orgaos", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrgaos(data);
        } else {
          console.error("Resposta inesperada:", data);
        }
      })
      .catch((err) => console.error("Erro ao buscar órgãos:", err));
  }, []);

  const handleAdicionarLote = () => {
    setLotes([...lotes, { numeroLote: "", objetoDoLote: "", quantidade: "" }]);
  };

  const handleLoteChange = (index, field, value) => {
    const novosLotes = [...lotes];
    novosLotes[index][field] = value;
    setLotes(novosLotes);
  };

  const handleCadastroOrgao = () => {
    fetch("http://localhost:8080/orgaos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(novoOrgao),
    })
      .then((res) => res.json())
      .then((orgaoSalvo) => {
        setOrgaos([...orgaos, orgaoSalvo]);
        setEditandoOrgao(false);
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
      })
      .catch((err) => alert("Erro ao cadastrar órgão: " + err.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { edital, pregao, lotes };

    fetch("http://localhost:8080/editais/completo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cadastrar");
        return res.json();
      })
      .then(() => alert("Cadastro realizado com sucesso ✅"))
      .catch((err) => alert("Erro ao cadastrar: " + err.message));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>Cadastrar Edital Completo</h2>
      <form onSubmit={handleSubmit}>

        <h3>Dados do Edital</h3>
        <input
          placeholder="Número da Licitação"
          value={edital.numeroLicitacao}
          onChange={(e) => setEdital({ ...edital, numeroLicitacao: e.target.value })}
        /><br /><br />

        <label>Órgão Responsável:</label>
        <select
          value={edital.fkOrgaoPublicoId}
          onChange={(e) => setEdital({ ...edital, fkOrgaoPublicoId: e.target.value })}
        >
          <option value="">Selecione um órgão</option>
          {orgaos.map((orgao) => (
            <option key={orgao.idOrgaoPublico} value={orgao.idOrgaoPublico}>
              {orgao.nomeOrgao}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => setEditandoOrgao(true)}>+ Novo órgão</button>
        <br /><br />

        {editandoOrgao && (
          <div>
            <h4>Novo Órgão Público</h4>
            <input placeholder="Nome do órgão" value={novoOrgao.nomeOrgao} onChange={(e) => setNovoOrgao({ ...novoOrgao, nomeOrgao: e.target.value })} /><br />
            <input placeholder="CNPJ" value={novoOrgao.cnpj} onChange={(e) => setNovoOrgao({ ...novoOrgao, cnpj: e.target.value })} /><br />
            <input placeholder="Rua" value={novoOrgao.rua} onChange={(e) => setNovoOrgao({ ...novoOrgao, rua: e.target.value })} /><br />
            <input placeholder="Bairro" value={novoOrgao.bairro} onChange={(e) => setNovoOrgao({ ...novoOrgao, bairro: e.target.value })} /><br />
            <input placeholder="CEP" value={novoOrgao.cep} onChange={(e) => setNovoOrgao({ ...novoOrgao, cep: e.target.value })} /><br />
            <input placeholder="Número" value={novoOrgao.numero} onChange={(e) => setNovoOrgao({ ...novoOrgao, numero: e.target.value })} /><br />
            <input placeholder="Estado (UF)" value={novoOrgao.estado} onChange={(e) => setNovoOrgao({ ...novoOrgao, estado: e.target.value })} /><br />
            <input placeholder="Município" value={novoOrgao.municipio} onChange={(e) => setNovoOrgao({ ...novoOrgao, municipio: e.target.value })} /><br />
            <button type="button" onClick={handleCadastroOrgao}>Salvar órgão</button>
          </div>
        )}

        <input
          type="date"
          placeholder="Data de Abertura"
          value={edital.dataDeAbertura}
          onChange={(e) => setEdital({ ...edital, dataDeAbertura: e.target.value })}
        /><br /><br />

        <input
          type="date"
          placeholder="Prazo de Entrega"
          value={edital.prazoEntrega}
          onChange={(e) => setEdital({ ...edital, prazoEntrega: e.target.value })}
        /><br /><br />

        <textarea
          placeholder="Exigências Técnicas"
          value={edital.exigenciaTecnicas}
          onChange={(e) => setEdital({ ...edital, exigenciaTecnicas: e.target.value })}
        ></textarea><br /><br />

        <textarea
          placeholder="Documentação Obrigatória"
          value={edital.documentacaoObrigatoria}
          onChange={(e) => setEdital({ ...edital, documentacaoObrigatoria: e.target.value })}
        ></textarea><br /><br />

        <input
          type="number"
          placeholder="Valor Estimado"
          value={edital.valorEstimado}
          onChange={(e) => setEdital({ ...edital, valorEstimado: e.target.value })}
        /><br /><br />

        <h3>Dados do Pregão</h3>
        <input
          placeholder="Número do Pregão"
          value={pregao.numeroPregao}
          onChange={(e) => setPregao({ ...pregao, numeroPregao: e.target.value })}
        /><br /><br />

        <input
          placeholder="Status do Pregão"
          value={pregao.statusPregao}
          onChange={(e) => setPregao({ ...pregao, statusPregao: e.target.value })}
        /><br /><br />

        <input
          placeholder="Modelo do Pregão"
          value={pregao.modeloPregao}
          onChange={(e) => setPregao({ ...pregao, modeloPregao: e.target.value })}
        /><br /><br />

        <input
          placeholder="Modalidade"
          value={pregao.modalidade}
          onChange={(e) => setPregao({ ...pregao, modalidade: e.target.value })}
        /><br /><br />

        <h3>Lotes</h3>
        {lotes.map((lote, index) => (
          <div key={index} style={{ marginBottom: "10px", border: "1px solid #ccc", padding: "10px" }}>
            <input
              placeholder="Número do Lote"
              value={lote.numeroLote}
              onChange={(e) => handleLoteChange(index, "numeroLote", e.target.value)}
            /><br />
            <input
              placeholder="Objeto do Lote"
              value={lote.objetoDoLote}
              onChange={(e) => handleLoteChange(index, "objetoDoLote", e.target.value)}
            /><br />
            <input
              placeholder="Quantidade"
              value={lote.quantidade}
              onChange={(e) => handleLoteChange(index, "quantidade", e.target.value)}
            /><br />
          </div>
        ))}
        <button type="button" onClick={handleAdicionarLote}>+ Adicionar Lote</button>

        <br /><br />
        <button type="submit">Salvar Edital Completo</button>
      </form>
    </div>
  );
}

export default CadastrarEdital;
