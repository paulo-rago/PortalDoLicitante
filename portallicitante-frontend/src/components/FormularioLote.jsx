import React, { useState, useEffect } from "react";
import "../styles/FormularioLote.css";

function FormularioLote({ editalId, pregaoId }) {
  const [empresas, setEmpresas] = useState([]);
  const [novaEmpresa, setNovaEmpresa] = useState({
    cnpj: "",
    telefone: "",
    cep: "",
    rua: "",
    bairro: "",
    numero: "",
    estado: "",
    nome: ""
  });
  const [exibirFormularioEmpresa, setExibirFormularioEmpresa] = useState(false);

  const [lote, setLote] = useState({
    fkIdEmpresa: "",
    valorArremate: "",
    numeroLote: "",
    objetoDoLote: "",
    quantidade: "",
    modelo_veiculo: "",
    ano_fabricacao: "",
    tipo_veiculo: ""
  });

  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/empresas")
      .then((res) => res.json())
      .then((data) => setEmpresas(Array.isArray(data) ? data : []));
  }, []);

  const handleCadastroEmpresa = async () => {
    try {
      const response = await fetch("http://localhost:8080/empresas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaEmpresa)
      });

if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Erro ao cadastrar empresa: " + errorText);
    }
      const empresaSalva = await response.json();
      setEmpresas([...empresas, empresaSalva]);
      setNovaEmpresa({
        cnpj: "",
        telefone: "",
        cep: "",
        rua: "",
        bairro: "",
        numero: "",
        estado: "",
        nome: ""
      });
      setExibirFormularioEmpresa(false);
    } catch (err) {
      alert("Erro: " + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...lote,
      fkIdEmpresa: lote.fkIdEmpresa ? parseInt(lote.fkIdEmpresa) : 0,
      valorArremate: lote.valorArremate ? parseFloat(lote.valorArremate) : 0.0,
      fkIdEditalDeLicitacao: editalId,
      fkIdPregao: pregaoId
    };

    try {
      const response = await fetch("http://localhost:8080/lotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao cadastrar o lote: ${errorText}`);
    }

      await response.json();
      setMensagem("✅ Lote cadastrado com sucesso!");

      setLote({
        fkIdEmpresa: "",
        valorArremate: "",
        numeroLote: "",
        objetoDoLote: "",
        quantidade: "",
        modelo_veiculo: "",
        ano_fabricacao: "",
        tipo_veiculo: ""
      });

    } catch (err) {
      setMensagem("❌ Erro: " + err.message);
    }
  };

  return (
    <div className="container-formulario-lote-1">
      <h1>Cadastrar Lote</h1>
      <div className="container-formulario-lote-2">
        <form className="formulario-lote-form" onSubmit={handleSubmit}>

          <div className="left-column">
            <div className="box-1">
              <div className="item-1">
                <label>N° do Lote</label>
                  <input
                    className="formulario-lote-input"
                    value={lote.numeroLote}
                    onChange={(e) => setLote({ ...lote, numeroLote: e.target.value })}
                    required
                    name="numeroLote"
                    id="formulario-lote-numero"
                  />
              </div>
              <div className="item-2">
                <label>Quantidade</label>
                <input
                  className="formulario-lote-input"
                  value={lote.quantidade}
                  onChange={(e) => setLote({ ...lote, quantidade: e.target.value })}
                  required
                  name="quantidade"
                  id="formulario-lote-quantidade"
                />
              </div>
            </div>
            
            <div className="item-3">
              <label>Objeto</label>
              <input
                className="formulario-lote-input"
                value={lote.objetoDoLote}
                onChange={(e) => setLote({ ...lote, objetoDoLote: e.target.value })}
                required
                name="objetoDoLote"
                id="formulario-lote-objeto"
              />
            </div>

            <div className="item-4">
              <label>Tipo de Veículo</label>
              <input
                className="formulario-lote-input"
                value={lote.tipo_veiculo}
                onChange={(e) => setLote({ ...lote, tipo_veiculo: e.target.value })}
                required
                name="tipo_veiculo"
                id="formulario-lote-tipo-veiculo"
              />
            </div>
          </div>
            
          <div className="right-column">
            <div className="item-4">
              <label>Modelo do Veículo</label>
              <input
                className="formulario-lote-input"
                value={lote.modelo_veiculo}
                onChange={(e) => setLote({ ...lote, modelo_veiculo: e.target.value })}
                required
                name="modelo_veiculo"
                id="formulario-lote-modelo-veiculo"
              />
            </div>

            <div className="box-2">
              <div className="item-5">
                <label>Valor do Arremate</label>
                  <input
                    className="formulario-lote-input"
                    type="number"
                    value={lote.valorArremate}
                    onChange={(e) => setLote({ ...lote, valorArremate: e.target.value })}
                    name="valorArremate"
                    id="formulario-lote-valor-arremate"
                  />
              </div>
              <div className="item-6">
                <label>Ano de Fabricação</label>
                <input
                  className="formulario-lote-input"
                  value={lote.ano_fabricacao}
                  onChange={(e) => setLote({ ...lote, ano_fabricacao: e.target.value })}
                  required
                  name="ano_fabricacao"
                  id="formulario-lote-ano-fabricacao"
                />
              </div>  
            </div>
              <div className="item-7">
                <label>Empresa Participante</label>
                <div className="empresa-participante-row">
                  <select
                    className="formulario-lote-select"
                    id="formulario-lote-empresa"
                    value={lote.fkIdEmpresa}
                    onChange={(e) => setLote({ ...lote, fkIdEmpresa: e.target.value })}
                  >
                    <option value="">Selecione uma empresa (opcional)</option>
                    {empresas.map((empresa) => (
                      <option key={empresa.idEmpresa} value={empresa.idEmpresa}>
                        {empresa.nome}
                      </option>
                    ))}
                  </select>
                  <button
                    className="formulario-lote-btn-nova-empresa"
                    type="button"
                    onClick={() => setExibirFormularioEmpresa(!exibirFormularioEmpresa)}
                  >
                    +
                  </button>
                </div>

                {exibirFormularioEmpresa && (
                  <div className="formulario-lote-bloco-nova-empresa">
                    <h4 className="formulario-lote-subtitle">Nova Empresa</h4>
                    <input className="formulario-lote-input" placeholder="Nome" value={novaEmpresa.nome}
                      onChange={(e) => setNovaEmpresa({ ...novaEmpresa, nome: e.target.value })} /><br />
                    <input className="formulario-lote-input" placeholder="CNPJ" value={novaEmpresa.cnpj}
                      onChange={(e) => setNovaEmpresa({ ...novaEmpresa, cnpj: e.target.value })} /><br />
                    <input className="formulario-lote-input" placeholder="Telefone" value={novaEmpresa.telefone}
                      onChange={(e) => setNovaEmpresa({ ...novaEmpresa, telefone: e.target.value })} /><br />
                    <input className="formulario-lote-input" placeholder="CEP" value={novaEmpresa.cep}
                      onChange={(e) => setNovaEmpresa({ ...novaEmpresa, cep: e.target.value })} /><br />
                    <input className="formulario-lote-input" placeholder="Rua" value={novaEmpresa.rua}
                      onChange={(e) => setNovaEmpresa({ ...novaEmpresa, rua: e.target.value })} /><br />
                    <input className="formulario-lote-input" placeholder="Número" value={novaEmpresa.numero}
                      onChange={(e) => setNovaEmpresa({ ...novaEmpresa, numero: e.target.value })} /><br />
                    <input className="formulario-lote-input" placeholder="Bairro" value={novaEmpresa.bairro}
                      onChange={(e) => setNovaEmpresa({ ...novaEmpresa, bairro: e.target.value })} /><br />
                          <select
                            className="formulario-lote-select"
                            id="formulario-lote-estado"
                            value={novaEmpresa.estado}
                            onChange={(e) =>
                                setNovaEmpresa({ ...novaEmpresa, estado: e.target.value })
                            }
                            required
                          >
                          <option value="">Selecione o estado</option>
                          <option value="AC">Acre</option>
                          <option value="AL">Alagoas</option>
                          <option value="AP">Amapá</option>
                          <option value="AM">Amazonas</option>
                          <option value="BA">Bahia</option>
                          <option value="CE">Ceará</option>
                          <option value="DF">Distrito Federal</option>
                          <option value="ES">Espírito Santo</option>
                          <option value="GO">Goiás</option>
                          <option value="MA">Maranhão</option>
                          <option value="MT">Mato Grosso</option>
                          <option value="MS">Mato Grosso do Sul</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="PA">Pará</option>
                          <option value="PB">Paraíba</option>
                          <option value="PR">Paraná</option>
                          <option value="PE">Pernambuco</option>
                          <option value="PI">Piauí</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="RN">Rio Grande do Norte</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="RO">Rondônia</option>
                          <option value="RR">Roraima</option>
                          <option value="SC">Santa Catarina</option>
                          <option value="SP">São Paulo</option>
                          <option value="SE">Sergipe</option>
                          <option value="TO">Tocantins</option>
                          </select>
                    <button className="formulario-lote-btn-salvar-empresa" type="button" onClick={handleCadastroEmpresa}>Salvar Empresa</button>
                  </div>
                )}
            </div>
          </div>
        </form>
        <button className="formulario-lote-btn-cadastrar" type="submit">Cadastrar Lote</button>
          <p className="formulario-lote-msg">{mensagem}</p>
      </div>
    </div>
  );
}

export default FormularioLote;
