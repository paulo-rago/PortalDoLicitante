import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboards() {
  const navigate = useNavigate();

  const sair = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
      <h2>Dashboards Principal</h2>
      <button onClick={() => navigate("/cadastrar-edital")}>Cadastrar Edital</button><br /><br />
      <button onClick={() => navigate("/listar-editais")}>Visualizar Editais</button><br /><br />
      <button onClick={() => navigate("/cadastrar-pregao")}>Cadastrar Pregão</button><br /><br />
      <button onClick={() => navigate("/listar-pregoes")}>Visualizar Pregões</button><br /><br />
      <button onClick={sair}>Logout</button>
    </div>
  );
}

export default Dashboards;
