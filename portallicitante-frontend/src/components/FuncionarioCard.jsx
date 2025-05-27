import "../styles/FuncionarioCard.css";


function FuncionarioCard({ id, nome, cpf, status, email, onEditar, caminhoFoto }) {
  console.log("Funcionario recebido no Card:", { caminhoFoto });
  const urlImagem = caminhoFoto
    ? `http://localhost:8080/funcionarios/foto/${caminhoFoto}`
    : "https://via.placeholder.com/150";

  return (
    <div className="funcionario-card">
      <div className="imagem-container">
        <img src={urlImagem} alt={`Foto de ${nome}`} className="foto-perfil" />
      </div>
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
