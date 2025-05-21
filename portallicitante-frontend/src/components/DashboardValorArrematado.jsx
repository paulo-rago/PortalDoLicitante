import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import '../styles/DashboardValorArrematado.css'; // Adicione o caminho correto para o CSS

const DashboardValorArrematado = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Se estiver usando JWT
        const response = await axios.get('http://localhost:8080/dashboard/valores-arrematados/AutoVrio', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDados(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className='valor_arrematado_h2' style={{ color: 'white' }}>Valor Arrematado por Ano - AutoVrio</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={dados}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
            borderRadius: 0
          }}
          style={{ background: '#fff', borderRadius: '30px' }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ano" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalArrematado" name="Valor Arrematado (R$)" fill="#0087C1" radius={[30, 30, 30, 30]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardValorArrematado;
