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
    <>
        <h2  style={{ color: 'white' }}>Taxa de Sucesso - AutoVrio</h2>
        
        <div style={{
            width: '100%',
            maxWidth: '500px',
            height: '350px',
            backgroundColor: '#ffffff',
            borderRadius: '30px',
            padding: '30px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            textAlign: 'center',
            position: 'relative'
        }}>

            <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#0087C1',
                marginBottom: '10px'
            }}>
                {taxa}%
            </div>

            <div style={{ color: '#555', marginBottom: '20px' }}>de Sucesso em Licitações</div>

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
    </>
);
};

export default TaxaSucessoGauge;
