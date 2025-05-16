import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FuncionarioCard from "../components/FuncionarioCard";
import "../styles/Funcionarios.css"; // Importando o CSS para estilização

function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/funcionarios")
      .then(res => res.json())
      .then(data => setFuncionarios(Array.isArray(data) ? data : []))
      .catch(err => console.error("Erro ao carregar funcionários", err));
  }, []);

  return (
    <div className="pagina-funcionarios">
      <button className="botao-cadastrar-funcionario" onClick={() => navigate('/cadastro-funcionario')}>
        Cadastrar Funcionário
      </button>
      <div className="lista-funcionarios">
        {funcionarios.map((f) => (
          <FuncionarioCard
            key={f.idFuncionario}
            nome={f.nomeFuncionario}
            cpf={f.cpf}
            status={f.status}
            email={f.emailCorporativo}
            onEditar={() => console.log("Editar", f.idFuncionario)}
          />
        ))}
      </div>
    </div>
  );
}

export default Funcionarios;
