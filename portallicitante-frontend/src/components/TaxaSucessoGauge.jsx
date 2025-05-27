import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import axios from 'axios';

const TaxaSucessoGauge = () => {
  const [taxa, setTaxa] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/dashboard/taxa-sucesso/AutoVrio');
        setTaxa(res.data.taxaSucessoPercentual);
      } catch (error) {
        console.error('Erro ao buscar taxa de sucesso:', error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { name: 'Sucesso', value: taxa },
    { name: 'Insucesso', value: 100 - taxa },
  ];

  const COLORS = ['#0087C1', '#ECECEC'];

return (
    <div className="dashboard-card">
        <h2 className="dashboard-card-title">Taxa de Sucesso - AutoVrio</h2>
        <div className="dashboard-gauge-value">{taxa}%</div>
        <div className="dashboard-gauge-label">de Sucesso em Licitações</div>
        <ResponsiveContainer width="100%" height={150}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="100%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={90}
                    outerRadius={120}
                    dataKey="value"
                    stroke="none"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    </div>
);
};

export default TaxaSucessoGauge;
