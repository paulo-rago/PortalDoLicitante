import React, { useState } from "react";
import FormularioEdital from "../components/FormularioEdital";
import FormularioPregao from "../components/FormularioPregao";
import FormularioLote from "../components/FormularioLote";

function CadastroCompleto() {
  const [etapa, setEtapa] = useState(1);
  const [editalId, setEditalId] = useState(null);
  const [pregaoId, setPregaoId] = useState(null);

  const avancarEtapa = () => setEtapa(etapa + 1);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1>Cadastro Completo</h1>
      <p>Etapa {etapa} de 3</p>
      <hr />

      {etapa === 1 && (
        <>
          <h2>Etapa 1: Cadastro de Edital</h2>
          <FormularioEdital
            onSubmitSuccess={(idEdital) => {
              setEditalId(idEdital);
              avancarEtapa();
            }}
          />
        </>
      )}

      {etapa === 2 && editalId && (
        <>
          <h2>Etapa 2: Cadastro de Pregão</h2>
          <FormularioPregao
            editalId={editalId}
            onSubmitSuccess={(idPregao) => {
              setPregaoId(idPregao);
              avancarEtapa();
            }}
          />
        </>
      )}

      {etapa === 3 && editalId && pregaoId && (
        <>
          <h2>Etapa 3: Cadastro de Lote</h2>
          <FormularioLote editalId={editalId} pregaoId={pregaoId} />
        </>
      )}
    </div>
  );
}

export default CadastroCompleto;
