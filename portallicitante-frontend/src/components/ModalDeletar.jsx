import "../styles/FuncionarioCard.css";

function ModalDeletar({ open, onClose, onConfirm, nome = "este item" }) {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal} className="funcionario-card">
        <h2 style={{ color: "#c10000", marginBottom: 18 }}>Confirmar Exclusão</h2>
        <p style={{ fontSize: 16, marginBottom: 24 }}>
          Tem certeza que deseja excluir <strong>{nome}</strong>?
          <br />Esta ação não poderá ser desfeita.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button
            className="botao-editar"
            style={{ background: "#c10000", width: 120 }}
            onClick={onConfirm}
          >
            Excluir
          </button>
          <button
            className="botao-editar"
            style={{ background: "#929292", color: "#222", width: 120 }}
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    minWidth: 320,
    maxWidth: 340,
    minHeight: 200,
    background: "#fff",
    borderRadius: 22,
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
    padding: "32px 24px 28px 24px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
};

export default ModalDeletar;
