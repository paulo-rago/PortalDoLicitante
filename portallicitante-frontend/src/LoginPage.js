import React, { useState } from "react";

function LoginPage() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const fazerLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf, senha }),
      });

      if (!response.ok) {
        throw new Error("CPF ou senha inválidos.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setMensagem("Login realizado com sucesso ✅");

      // Redirecionar ou carregar dados após login...
    } catch (error) {
      setMensagem(error.message);
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={fazerLogin}>
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Entrar</button>
      </form>
      <p>{mensagem}</p>
    </div>
  );
}

export default LoginPage;
