import React, { useState } from "react";
import FormularioEdital from "../components/FormularioEdital";
import FormularioPregao from "../components/FormularioPregao";
import FormularioLote from "../components/FormularioLote";
import "../styles/CadastroCompleto.css"; // Adicione o caminho correto para o CSS

function CadastroCompleto() {
  const [etapa, setEtapa] = useState(1);
  const [editalId, setEditalId] = useState(null);
  const [pregaoId, setPregaoId] = useState(null);

  const avancarEtapa = () => setEtapa(etapa + 1);

  return (
    <div className="cadastro-completo">
      {etapa === 1 && (
        <>
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
          <h2>Cadastro de Pregão</h2>
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
          <h2>Cadastro de Lote</h2>
          <FormularioLote editalId={editalId} pregaoId={pregaoId} />
        </>
      )}
    </div>
  );
}

export default CadastroCompleto;
