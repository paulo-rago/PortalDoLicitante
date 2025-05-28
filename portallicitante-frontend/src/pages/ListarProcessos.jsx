// src/pages/ListarProcessos.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ListarProcessos.css";
import ModalDeletar from "../components/ModalDeletar";

function ListarProcessos() {
  const [editais, setEditais] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editalParaDeletar, setEditalParaDeletar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/editais")
      .then(res => res.json())
      .then(data => {
        console.log("Editais recebidos:", data);
        if (Array.isArray(data)) {
          setEditais(data);
        } else {
          console.error("Resposta inesperada:", data);
        }
      })
      .catch(err => console.error("Erro ao buscar editais:", err));
  }, []);

  const handleOpenModal = (edital) => {
    setEditalParaDeletar(edital);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditalParaDeletar(null);
  };

  const handleConfirmDelete = async () => {
    if (!editalParaDeletar || !editalParaDeletar.id) {
      console.error("ID do edital para deletar está indefinido:", editalParaDeletar);
      alert("Erro: ID do edital não encontrado.");
      handleCloseModal();
      return;
    }

    console.log("ID enviado para deleção:", editalParaDeletar.id); // <-- Aqui

    try {
      console.log("Deletando edital com id:", editalParaDeletar.id);
      const resp = await fetch(`http://localhost:8080/editais/${editalParaDeletar.id}`, {
        method: "DELETE",
      });
      if (!resp.ok) throw new Error("Erro ao deletar edital");
      setEditais(editais.filter(e => e.id !== editalParaDeletar.id));
      handleCloseModal();
    } catch (err) {
      alert("Erro ao deletar edital.");
      handleCloseModal();
    }
  };

  return (
    <div className="listar-processos-container">
      <ModalDeletar
        open={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        nome={editalParaDeletar ? `edital ${editalParaDeletar.numeroLicitacao}` : ""}
      />
      <table className="listar-processos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Número</th>
            <th>Órgão Responsável</th>
            <th>Data de Abertura</th>
            <th>Prazo de Entrega</th>
            <th>Exigências Técnicas</th>
            <th>Documentação Obrigatória</th>
            <th>Valor Estimado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {editais.length === 0 ? (
            <tr>
              <td colSpan="9">Nenhum edital cadastrado.</td>
            </tr>
          ) : (
            editais.map((edital) => (
              <tr key={edital.id}>
                <td>{edital.id}</td>
                <td>{edital.numeroLicitacao}</td>
                <td>{edital.orgaoResponsavel}</td>
                <td>{edital.dataDeAbertura}</td>
                <td>{edital.prazoEntrega}</td>
                <td>{edital.exigenciaTecnicas}</td>
                <td>{edital.documentacaoObrigatoria}</td>
                <td>{edital.valorEstimado}</td>
                <td>
                  <button
                    className="listar-processos-btn"
                    onClick={() => navigate(`/editar-edital/${edital.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="listar-processos-btn"
                    style={{ background: '#c10000', color: '#fff', marginLeft: 8 }}
                    onClick={() => handleOpenModal(edital)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListarProcessos;
