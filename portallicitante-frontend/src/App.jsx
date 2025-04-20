import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Menu from "./pages/Menu";
import CadastrarEdital from "./pages/CadastrarEdital"; // Importando o componente de cadastro de edital
import ListarEditais from "./pages/ListarEditais";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />          {/* página inicial */}
        <Route path="/login" element={<LoginPage />} />     {/* rota alternativa opcional */}
        <Route path="/menu" element={<Menu />} />
        <Route path="/cadastrar-edital" element={<CadastrarEdital />} /> {/* rota para cadastrar edital */}
        <Route path="/listar-editais" element={<ListarEditais />} /> {/* rota para listar editais */}
        <Route path="/cadastrar-pregao" element={<div>Cadastrar Pregão</div>} /> {/* rota para cadastrar pregão */}
        <Route path="/listar-pregoes" element={<div>Listar Pregões</div>} /> {/* rota para listar pregões */}
        {/* outras rotas podem ser adicionadas aqui */}
      </Routes>
    </Router>
  );
}

export default App;
