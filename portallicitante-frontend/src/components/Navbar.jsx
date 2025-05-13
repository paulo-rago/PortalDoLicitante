import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css";
import logo from "../assets/logovrio.png"; // Import the logo image

const Navbar = () => {
  const [isSupervisor, setIsSupervisor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
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
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/menu" className="navbar-logo">
            <img src={logo} alt="Logo" className="navbar-logo-image" />
          </Link>
        </li>
        <li><Link to="/menu" className="navbar-link">Dashboards</Link></li>
        <li><Link to="/cadastrar-edital" className="navbar-link">Cadastro de Processo</Link></li>
        <li><Link to="/listar-editais" className="navbar-link">Visualização de Processos</Link></li>
        {isSupervisor && (
          <li><Link to="/cadastrar-usuario" className="navbar-link">Cadastrar Usuário</Link></li>
        )}
      </ul>
      <div className="navbar-username">
        {localStorage.getItem("username") || "Usuário"}
      </div>
      <button onClick={handleLogout} className="navbar-logout">Logout</button>
    </nav>
  );
};

export default Navbar;
