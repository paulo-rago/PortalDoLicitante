import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Menu from "./pages/Menu";
import CadastrarEdital from "./pages/CadastrarEdital"; 
import CadastrarPregao from "./pages/CadastrarPregao"; 
import ListarEditais from "./pages/ListarEditais";
import ListarPregoes from "./pages/ListarPregoes";
import EditarEdital from "./pages/EditarEdital"; 
import ExcluirEdital from "./pages/ExcluirEdital"; 
import EditarPregao from "./pages/EditarPregao";
import ExcluirPregao from "./pages/ExcluirPregao";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />          {/* página inicial */}
        <Route path="/login" element={<LoginPage />} />     {/* rota alternativa opcional */}
        <Route path="/menu" element={<Menu />} />
        <Route path="/cadastrar-edital" element={<CadastrarEdital />} /> {/* rota para cadastrar edital */}
        <Route path="/listar-editais" element={<ListarEditais />} /> {/* rota para listar editais */}
        <Route path="/cadastrar-pregao" element={<CadastrarPregao />} /> {/* rota para cadastrar pregão */}
        <Route path="/listar-pregoes" element={<ListarPregoes/>} /> {/* rota para listar pregões */}
        <Route path="/editar-edital/:id" element={<EditarEdital />} /> {/* rota para editar edital */}
        <Route path="/excluir-edital/:id" element={<ExcluirEdital />} /> {/* rota para excluir edital */}
        <Route path="/editar-pregao/:id" element={<EditarPregao />} /> {/* rota para editar pregão */}
        <Route path="/excluir-pregao/:id" element={<ExcluirPregao />} /> {/* rota para excluir pregão */}
      </Routes>
    </Router>
  );
}

export default App;
