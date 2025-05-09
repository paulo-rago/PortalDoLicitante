import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isSupervisor, setIsSupervisor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function verificarSupervisor() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:8080/analistas/verificar-supervisor", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const resultado = await response.json(); // true ou false
          setIsSupervisor(resultado);
        }
      } catch (error) {
        console.error("Erro ao verificar supervisor:", error);
      }
    }

    verificarSupervisor();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>Portal do Licitante</h1>
      <ul style={styles.navLinks}>
        <li><Link to="/menu" style={styles.link}>Dashboards</Link></li>
        <li><Link to="/cadastrar-edital" style={styles.link}>Cadastro de Processo</Link></li>
        <li><Link to="/listar-editais" style={styles.link}>Visualização de Processos</Link></li>
        {isSupervisor && (
          <li><Link to="/cadastrar-usuario" style={styles.link}>Cadastrar Usuário</Link></li>
        )}
        <li>
          <button
            onClick={() => {
              handleLogout();
              navigate("/auth/login");
            }}
            style={styles.logoutButton}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#282c34',
    color: 'white',
  },
  logo: {
    margin: 0,
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    margin: 0,
    padding: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    border: '1px solid white',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default Navbar;
