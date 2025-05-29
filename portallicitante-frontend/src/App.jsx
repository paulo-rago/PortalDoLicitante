import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboards from "./pages/Dashboards";
import ListarProcessos from "./pages/ListarProcessos";
import EditarEdital from "./pages/EditarEdital";
import EditarPregao from "./pages/EditarPregao";
import Navbar from "./components/Navbar";
import CadastroCompleto from "./pages/CadastroCompleto";
import Funcionarios from "./pages/Funcionarios";
import CadastroDeFuncionario from "./pages/CadastroDeFuncionario";
import EditarInformacoesFunc from "./pages/EditarInformacoesFunc";


function LayoutComNavbar() {
  const location = useLocation();
  const isLogin = location.pathname === "/" || location.pathname === "/login";

  return (
    <>
      {!isLogin && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Dashboards" element={<Dashboards />} />
        <Route path="/listar-processos" element={<ListarProcessos />} />
        <Route path="/editar-edital/:id" element={<EditarEdital />} />
        <Route path="/editar-pregao/:id" element={<EditarPregao />} />
        <Route path="/cadastro-completo" element={<CadastroCompleto />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/cadastro-funcionario" element={<CadastroDeFuncionario />} />
        <Route path="/funcionarios/editar/:id" element={<EditarInformacoesFunc />} />
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
