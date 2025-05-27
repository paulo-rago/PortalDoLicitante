import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CadastrarFuncionario.css";

function CadastrarFuncionario() {
  const [formData, setFormData] = useState({
    nomeFuncionario: "",
    cpf: "",
    emailCorporativo: "",
    status: "",
    senha: ""
  });

  const [foto, setFoto] = useState(null); // Foto de perfil
  const [mensagem, setMensagem] = useState("");
  const [isSupervisor, setIsSupervisor] = useState(null);
  const navigate = useNavigate();

  // Verificar se é supervisor
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8080/analistas/verificar-supervisor", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.ok ? response.json() : false)
      .then(data => {
        if (!data) {
          navigate("/");
        } else {
          setIsSupervisor(true);
        }
      })
      .catch(error => {
        console.error("Erro ao verificar supervisor:", error);
        navigate("/");
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const formDataEnvio = new FormData();

      formDataEnvio.append(
        "dados",
        new Blob([JSON.stringify(formData)], { type: "application/json" })
      );

      if (foto) {
        formDataEnvio.append("file", foto);
      }

      const resposta = await fetch("http://localhost:8080/funcionarios/cadastrar-com-foto", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataEnvio
      });

      if (!resposta.ok) throw new Error("Erro ao cadastrar funcionário.");

      const funcionario = await resposta.json();
      console.log(funcionario);
      setMensagem("Funcionário cadastrado com sucesso ✅");
      setTimeout(() => navigate("/funcionarios"), 1500);
    } catch (err) {
      console.error(err);
      setMensagem("❌ Erro ao cadastrar funcionário.");
    }
  };

  if (isSupervisor === null) return <p>Verificando permissões...</p>;

  return (
    <div className="pagina-cadastro-funcionario">
      <h2>Cadastrar Funcionário</h2>
      <form className="form-funcionario" onSubmit={handleSubmit}>
        <input
          name="nomeFuncionario"
          placeholder="Nome"
          onChange={handleChange}
          required
        />
        <input
          name="cpf"
          placeholder="CPF"
          onChange={handleChange}
          required
        />
        <input
          name="emailCorporativo"
          placeholder="Email Corporativo"
          onChange={handleChange}
          required
        />
        <input
          name="status"
          placeholder="Status"
          onChange={handleChange}
          required
        />
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          onChange={handleChange}
          required
        />

        {/* Upload de Foto */}
        <label>Foto de Perfil:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFoto(e.target.files[0])}
        />

        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default CadastrarFuncionario;
