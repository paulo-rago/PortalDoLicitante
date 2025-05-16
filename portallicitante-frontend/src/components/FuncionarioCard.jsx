import React from "react";
import "../styles/FuncionarioCard.css";

function FuncionarioCard({ nome, cpf, status, email, onEditar }) {
  return (
    <div className="funcionario-card">
      <div className="imagem-placeholder" />
      <h3 className="nome-funcionario">{nome}</h3>
      <p className="cpf"><strong>CPF:</strong> {cpf}</p>
      <p className="status"><strong>Status:</strong> {status}</p>
      <p className="email"><strong>Email:</strong> {email}</p>
      <button className="botao-editar" onClick={onEditar}>
        Editar Informações
      </button>
    </div>
  );
}

export default FuncionarioCard;
