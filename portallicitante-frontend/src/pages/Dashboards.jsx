import DashboardValorArrematado from "../components/DashboardValorArrematado";
import TaxaSucessoGauge from "../components/TaxaSucessoGauge";
import GraficoEvolucaoPregoes from "../components/GraficoEvolucaoPregoes";
import GraficoPregoesPorStatus from "../components/GraficoPregoesPorStatus";
import GraficoAnalistasAutoVrio from "../components/GraficoAnalistasAutoVrio";
import '../styles/Dashboards.css';


function Dashboards() {
  return (
    <div className="dashboards-container">
      <h1 className="dashboards-title">Dashboards</h1>

      {/* KPIs em Grid - lado a lado */}
      <div>
        <GraficoAnalistasAutoVrio />
      </div>
      <div className="dashboards-kpi-grid dashboards-kpi-row">
        <DashboardValorArrematado />
        <TaxaSucessoGauge />
      </div>

      {/* Gráficos em Grid */}
      <div className="dashboards-graph-grid">
        <GraficoEvolucaoPregoes />
        <GraficoPregoesPorStatus />
      </div>
    </div>
  );
}

export default Dashboards;
