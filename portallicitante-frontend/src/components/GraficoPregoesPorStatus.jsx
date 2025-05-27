import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

function GraficoPregoesPorStatus() {
  const [dados, setDados] = useState([]);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/dashboard/pregoes-por-status')
      .then((res) => {
        if (!res.ok) throw new Error('Erro na requisição: ' + res.status);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setDados(data);
        } else {
          console.error('Resposta não é um array:', data);
          setDados([]);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
        setErro(true);
        setDados([]);
      });
  }, []);

  if (erro) return <p style={{ color: 'red' }}>Erro ao carregar dados do gráfico de status.</p>;
  if (dados.length === 0) return <p>Sem dados para exibir no gráfico de status.</p>;

  return (
    <div className="dashboard-card">
      <h2 className="dashboard-card-title">Distribuição de Pregões por Status</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#0087C1" radius={[20, 20, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoPregoesPorStatus;
