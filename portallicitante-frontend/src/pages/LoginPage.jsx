import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import logo from "../assets/logovrio.png";
import api from '../services/api';

function LoginPage() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();
  const fazerLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        cpf,
        senha
      });
        if (response.status !== 200) {
        throw new Error("CPF ou senha inválidos.");
      }const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("nomeFuncionario", data.nomeFuncionario); // 👈 Adicione esta linha
      setMensagem("Login realizado com sucesso ✅");
      navigate("/Dashboards"); // Redireciona para a página de dashboards após o login

    } catch (error) {
      setMensagem(error.message);
    }
  };

  return (
    <div className="login-background">
      <img src={logo} alt="Portal do Licitante Logo" className="logo" /> {/* Add the logo */}
      <div className="login-container">
        <h2>Login do portal do licitante</h2>
        <form onSubmit={fazerLogin}>
          <input
            type="text"
            placeholder="Usuário"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
