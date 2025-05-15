import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css";
import logo from "../assets/logovrio.png"; // imagem do logotipo

const Navbar = () => {
  const [isSupervisor, setIsSupervisor] = useState(false);
  const [nomeFuncionario, setNomeFuncionario] = useState("Funcionário");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const nome = localStorage.getItem("nomeFuncionario");

    if (nome) {
      setNomeFuncionario(nome);
    }

    if (!token) return;

    fetch("http://localhost:8080/analistas/verificar-supervisor", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.ok ? response.json() : false)
      .then(data => setIsSupervisor(data))
      .catch(error => console.error("Erro ao verificar supervisor:", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nomeFuncionario");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <button
            className="navbar-logo"
            onClick={() => navigate("/Dashboards")}
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <img src={logo} alt="Logo VRIO" className="navbar-logo-image" />
          </button>
        </li>
        <li>
          <button className="navbar-link" onClick={() => navigate("/Dashboards")}>
            Dashboards
          </button>
        </li>
        <li>
          <button className="navbar-link" onClick={() => navigate("/cadastro-completo")}>
            Cadastro de Processo
          </button>
        </li>
        <li>
          <button className="navbar-link" onClick={() => navigate("/listar-editais")}>
            Processos
          </button>
        </li>
        {isSupervisor && (
          <li>
            <button className="navbar-link" onClick={() => navigate("/funcionarios")}>
              Funcionários
            </button>
          </li>
        )}
      </ul>
      <div className="navbar-username">
        {nomeFuncionario}
      </div>
      <button onClick={handleLogout} className="navbar-logout">Logout</button>
    </nav>
  );
};

export default Navbar;
