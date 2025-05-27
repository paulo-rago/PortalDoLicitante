import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useEffect, useState } from 'react';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

function GraficoPregoesPorOrgao() {
  const [dados, setDados] = useState([]);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/dashboard/pregoes-por-orgao')
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

  if (erro) return <p style={{ color: 'red' }}>Erro ao carregar dados do gráfico de órgãos.</p>;
  if (dados.length === 0) return <p>Sem dados para exibir no gráfico de órgãos.</p>;

  return (
    <div className="dashboard-card">
      <h2 className="dashboard-card-title">Distribuição de Pregões por Órgão</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={dados}
          dataKey="total"
          nameKey="orgao"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {dados.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default GraficoPregoesPorOrgao;
