import React from "react";
import DashboardValorArrematado from "../components/DashboardValorArrematado";
import TaxaSucessoGauge from "../components/TaxaSucessoGauge";

function Dashboards() {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "2rem", alignItems: "flex-start" }}>
      <div>
        <DashboardValorArrematado />
      </div>
      <div >
        <TaxaSucessoGauge />
      </div>
    </div>
  );
}

export default Dashboards;
