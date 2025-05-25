import React, { useState, useEffect } from "react";
import "../styles/FormularioEdital.css";

function FormularioEdital({ onSubmitSuccess }) {
  // Estados originais mantidos
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
  const [errors, setErrors] = useState({
    prazoEntrega: "",
    dataDeAbertura: ""
  });

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
    if (!novoOrgao.estado) {
      alert("Selecione um Estado (UF) para o órgão.");
      return;
    }
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

  const handleDateChange = (field, value) => {
    const newForm = { ...form, [field]: value };
    setForm(newForm);
    
    if (newForm.prazoEntrega && newForm.dataDeAbertura) {
      const prazoDate = new Date(newForm.prazoEntrega);
      const aberturaDate = new Date(newForm.dataDeAbertura);
      
      if (aberturaDate > prazoDate) {
        setErrors({
          prazoEntrega: 'Prazo não pode ser antes da abertura',
          dataDeAbertura: 'Abertura não pode ser após o prazo'
        });
      } else {
        setErrors({ prazoEntrega: '', dataDeAbertura: '' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(form.prazoEntrega) < new Date(form.dataDeAbertura)) {
      setErrors({
        prazoEntrega: 'Data inválida',
        dataDeAbertura: 'Data inválida'
      });
      return;
    }

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

  function formatarCNPJ(valor) {
    return valor
      .replace(/\D/g, '') // remove não dígitos
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18);
  }

  function formatarCEP(valor) {
    return valor
      .replace(/\D/g, '') // remove não dígitos
      .replace(/^(\d{5})(\d)/, '$1-$2')
      .slice(0, 9);
  }

  const estadosBrasileiros = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  return (
    <div className="container-formulario-edital">
      <h1>Cadastrar Edital</h1>
      <form className="form-edital" onSubmit={handleSubmit}>
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
                <input 
                  lassName="input-nome-orgao" 
                  placeholder="Nome" 
                  value={novoOrgao.nomeOrgao} 
                  onChange={(e) => setNovoOrgao({ ...novoOrgao, nomeOrgao: e.target.value })} 
                />

                <input
                  className="input-cnpj-orgao"
                  placeholder="CNPJ (ex: 12.345.678/0001-19)"
                  value={novoOrgao.cnpj}
                  onChange={(e) => {
                    const valorFormatado = formatarCNPJ(e.target.value);
                    setNovoOrgao({ ...novoOrgao, cnpj: valorFormatado });
                  }}
                />

                <input 
                  className="input-rua-orgao" 
                  placeholder="Rua" 
                  value={novoOrgao.rua} 
                  onChange={(e) => setNovoOrgao({ ...novoOrgao, rua: e.target.value })} 
                />

                <input 
                  className="input-bairro-orgao" 
                  placeholder="Bairro" 
                  value={novoOrgao.bairro} 
                  onChange={(e) => setNovoOrgao({ ...novoOrgao, bairro: e.target.value })} 
                />

                <input
                  className="input-cep-orgao"
                  placeholder="CEP (ex: 12345-678)"
                  value={novoOrgao.cep}
                  onChange={(e) => {
                    const valorFormatado = formatarCEP(e.target.value);
                    setNovoOrgao({ ...novoOrgao, cep: valorFormatado });
                  }}
                />

                <input 
                  className="input-numero-orgao" 
                  placeholder="Número" 
                  value={novoOrgao.numero} 
                  onChange={(e) => setNovoOrgao({ ...novoOrgao, numero: e.target.value })} 
                />

                <select
                  className="input-estado-orgao"
                  value={novoOrgao.estado}
                  onChange={(e) => setNovoOrgao({ ...novoOrgao, estado: e.target.value })}
                >
                  <option value="">Selecione o Estado (UF)</option>
                  {estadosBrasileiros.map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>

                <input 
                  className="input-municipio-orgao" 
                  placeholder="Município" 
                  value={novoOrgao.municipio} 
                  onChange={(e) => setNovoOrgao({ ...novoOrgao, municipio: e.target.value })} 
                />

                <button type="button" className="botao-salvar" onClick={handleCadastroOrgao}>
                  Salvar órgão
                </button>
              </div>
            )}
          </div>

          <div>
            <label>Data de Abertura:</label>
            <input
              className={`input-data-abertura ${errors.dataDeAbertura ? 'error' : ''}`}
              type="date"
              value={form.dataDeAbertura}
              onChange={(e) => handleDateChange('dataDeAbertura', e.target.value)}
              max={form.prazoEntrega}
            />
            {errors.dataDeAbertura && <div className="error-message">{errors.dataDeAbertura}</div>}
          </div>

          <div>
            <label>Prazo de Entrega:</label>
            <input
              className={`input-prazo-entrega ${errors.prazoEntrega ? 'error' : ''}`}
              type="date"
              value={form.prazoEntrega}
              onChange={(e) => handleDateChange('prazoEntrega', e.target.value)}
              min={form.dataDeAbertura}
            />
            {errors.prazoEntrega && <div className="error-message">{errors.prazoEntrega}</div>}
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
              type="text"
              value={form.valorEstimado ? 
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(form.valorEstimado) : 'R$ 0,00'}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, '');
                const numericValue = rawValue ? parseFloat(rawValue) / 100 : 0;
                setForm({ ...form, valorEstimado: numericValue });
              }}
              onBlur={() => {
                if (form.valorEstimado < 0) {
                  setForm({ ...form, valorEstimado: 0 });
                }
              }}
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
    </div>
  );
}

export default FormularioEdital;