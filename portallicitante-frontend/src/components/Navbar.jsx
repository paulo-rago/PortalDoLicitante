// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>Portal do Licitante</h1>
      <ul style={styles.navLinks}>
        <li><Link to="/menu" style={styles.link}>Dashboards</Link></li>
        <li><Link to="/cadastrar-edital" style={styles.link}>Cadastro de Processo</Link></li>
        <li><Link to="/listar-editais" style={styles.link}>Visualização de Processos</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
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
    gap: '1rem',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
};

export default Navbar;
