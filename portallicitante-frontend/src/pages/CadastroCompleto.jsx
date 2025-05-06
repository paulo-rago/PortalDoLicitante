import React from "react";
import FormularioEdital from "../components/FormularioEdital";
import FormularioPregao from "../components/FormularioPregao";

function CadastroCompleto() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1>Cadastro Completo</h1>

      <section>
        <h2>Cadastro de Edital</h2>
        <FormularioEdital />
      </section>

      <hr />

      <section>
        <h2>Cadastro de Pregão</h2>
        <FormularioPregao />
      </section>

      <hr />
    </div>
  );
}

export default CadastroCompleto;
