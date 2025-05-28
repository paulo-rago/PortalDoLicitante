
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/CadastrarFuncionario.css";

function EditarInformacoesFunc() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomeFuncionario: "",
    cpf: "",
    emailCorporativo: "",
    status: "",
    senha: ""
  });
  const [foto, setFoto] = useState(null);

  const [isSupervisor, setIsSupervisor] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Verifica se é supervisor
    fetch("http://localhost:8080/analistas/verificar-supervisor", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : false)
      .then(data => {
        if (!data) navigate("/");
        else setIsSupervisor(true);
      })
      .catch(() => navigate("/"));

    // Busca os dados do funcionário
    fetch(`http://localhost:8080/funcionarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setFormData(data);
        else setMensagem("Erro ao carregar dados.");
      })
      .catch(() => setMensagem("Erro ao buscar funcionário."));
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      const resp = await fetch(`http://localhost:8080/funcionarios/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formDataEnvio
      });
      if (!resp.ok) throw new Error("Erro ao atualizar funcionário.");
      setMensagem("Informações atualizadas com sucesso ✅");
      setTimeout(() => navigate("/funcionarios"), 1500);
    } catch {
      setMensagem("Erro ao salvar alterações ❌");
    }
  };

  if (isSupervisor === null) return <p>Verificando permissões...</p>;

  return (
    <div className="pagina-cadastro-funcionario">
      <h2>Editar Informações do Funcionário</h2>
      <form className="form-funcionario" onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Nome atual: <strong>{formData.nomeFuncionario}</strong>
          <input name="nomeFuncionario" value={formData.nomeFuncionario} onChange={handleChange} required />
        </label>

        <label>
          CPF atual: <strong>{formData.cpf}</strong>
          <input name="cpf" value={formData.cpf} onChange={handleChange} required />
        </label>

        <label>
          Email atual: <strong>{formData.emailCorporativo}</strong>
          <input name="emailCorporativo" value={formData.emailCorporativo} onChange={handleChange} required />
        </label>

        <label>
          Status atual: <strong>{formData.status}</strong>
          <input name="status" value={formData.status} onChange={handleChange} required />
        </label>

        <label>
          Senha atual: <strong>••••••••</strong>
          <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />
        </label>

        {/* Upload de Foto */}
        <label>Foto de Perfil:</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => setFoto(e.target.files[0])}
        />
        <button type="submit">Salvar Alterações</button>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default EditarInformacoesFunc;
