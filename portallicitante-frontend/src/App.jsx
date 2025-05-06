import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Menu from "./pages/Menu";
import CadastrarEdital from "./pages/CadastroCompleto";
import CadastrarPregao from "./pages/CadastrarPregao";
import ListarEditais from "./pages/ListarEditais";
import ListarPregoes from "./pages/ListarPregoes";
import EditarEdital from "./pages/EditarEdital";
import ExcluirEdital from "./pages/ExcluirEdital";
import EditarPregao from "./pages/EditarPregao";
import ExcluirPregao from "./pages/ExcluirPregao";
import CadastrarLote from "./pages/CadastrarLote";
import ListarLotes from "./pages/ListarLotes";
import Navbar from "./components/Navbar";
import CadastroCompleto from "./pages/CadastroCompleto";


function LayoutComNavbar() {
  const location = useLocation();
  const isLogin = location.pathname === "/" || location.pathname === "/login";

  return (
    <>
      {!isLogin && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cadastrar-edital" element={<CadastrarEdital />} />
        <Route path="/listar-editais" element={<ListarEditais />} />
        <Route path="/cadastrar-pregao" element={<CadastrarPregao />} />
        <Route path="/listar-pregoes" element={<ListarPregoes />} />
        <Route path="/editar-edital/:id" element={<EditarEdital />} />
        <Route path="/excluir-edital/:id" element={<ExcluirEdital />} />
        <Route path="/editar-pregao/:id" element={<EditarPregao />} />
        <Route path="/excluir-pregao/:id" element={<ExcluirPregao />} />
        <Route path="/cadastrar-lote" element={<CadastrarLote />} />
        <Route path="/listar-lotes/:idPregao" element={<ListarLotes />} />
        <Route path="/cadastro-completo" element={<CadastroCompleto />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutComNavbar />
    </Router>
  );
}

export default App;
