import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

function GraficoEvolucaoPregoes() {
  const [dados, setDados] = useState([]);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/dashboard/evolucao-pregoes')
      .then((res) => {
        if (!res.ok) throw new Error('Erro na requisição: ' + res.status);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const formatado = data.map(item => ({
            mes: `${item.mes}/${item.ano}`,
            total: item.total
          }));
          setDados(formatado);
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

  if (erro) return <p style={{ color: 'red' }}>Erro ao carregar dados do gráfico de evolução.</p>;
  if (dados.length === 0) return <p>Sem dados para exibir no gráfico de evolução.</p>;

  return (
    <div className="dashboard-card">
      <h2 className="dashboard-card-title">Evolução dos Pregões por Mês</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dados} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#e0e0e0" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#0087C1" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoEvolucaoPregoes;
