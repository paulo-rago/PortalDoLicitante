import React, { useEffect, useState } from "react";
import "../styles/Funcionarios.css"; // Opcional: para estilos personalizados

function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/funcionarios")
      .then((res) => res.json())
      .then((data) => setFuncionarios(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Erro ao carregar funcionários:", err));
  }, []);

  return (
    <div className="funcionarios-container">
      <h1>Funcionários Cadastrados</h1>
      <div className="funcionarios-lista">
        {funcionarios.map((func) => (
          <div key={func.idFuncionario} className="funcionario-card">
            <h3>{func.nome}</h3>
            <p><strong>CPF:</strong> {func.cpf}</p>
            <p><strong>Email:</strong> {func.emailCorporativo}</p>
            <p><strong>Status:</strong> {func.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Funcionarios;
