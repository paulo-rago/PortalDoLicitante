import {
  ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useEffect, useState } from 'react';

function GraficoAnalistasAutoVrio() {
  const [dados, setDados] = useState([]);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/dashboard/analistas-pregoes-autovrio')
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

  const top1 = dados.slice(0, 1);

  if (erro)
    return (
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        padding: '2rem',
        margin: '2rem 0',
        textAlign: 'center',
        color: 'red',
        fontWeight: 600,
        fontSize: '1.1rem',
      }}>
        Erro ao carregar dados dos analistas.
      </div>
    );

  if (dados.length === 0)
    return (
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        padding: '2rem',
        margin: '2rem 0',
        textAlign: 'center',
        color: '#333',
        fontWeight: 500,
        fontSize: '1.1rem',
      }}>
        Sem dados para exibir no gráfico dos analistas.
      </div>
    );

  return (
    <div
      className="dashboard-card grafico-analistas-autovrio"
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '2.5rem',
        alignItems: 'flex-start',
        margin: '2rem 0',
        background: '#fff',
        borderRadius: '18px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        padding: '2.5rem 2rem',
        flexWrap: 'wrap',
        width: '850px',
        maxWidth: '100%',
        marginLeft: '40px',
      }}
    >
      {/* GRÁFICO */}
      <div style={{ flex: 3, minWidth: 0 }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            color: '#0087C1',
            letterSpacing: '0.5px',
            fontFamily: 'inherit',
          }}
        >
          Analistas que mais arremataram processos para AutoVrio
        </h2>
        <div style={{
          background: '#f7fafd',
          borderRadius: '12px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
          padding: '1.5rem 1rem',
        }}>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#e0e0e0" />
              <XAxis dataKey="analista" type="category" tick={{ fontWeight: 500, fontSize: 13 }} />
              <YAxis dataKey="totalPregoes" type="number" tick={{ fontWeight: 500, fontSize: 13 }} />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ borderRadius: 8, fontSize: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                labelStyle={{ fontWeight: 600, color: '#0087C1' }}
              />
              <Legend wrapperStyle={{ fontWeight: 600, fontSize: 14 }} />              <Scatter 
                name="Total de Pregões" 
                data={dados} 
                fill="#0087C1"
                shape={(props) => {
                  const { cx, cy, payload } = props;
                  // Use the analyst's photo as the scatter point
                  return (
                    <image                      x={cx - 25}
                      y={cy - 25}
                      width={50}
                      height={50}                      href={payload.caminhoFoto
                        ? `http://localhost:8080/funcionarios/foto/${payload.caminhoFoto}`
                        : 'https://via.placeholder.com/50'}
                      style={{ 
                        borderRadius: '50%',
                        clipPath: 'circle(50%)'
                      }}
                    />
                  );
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TOP 1 ANALISTA */}
      <div style={{
        flex: 1,
        minWidth: 260,
        maxWidth: 340,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h3
          style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            marginBottom: '1.2rem',
            color: '#0087C1',
            letterSpacing: '0.2px',
            fontFamily: 'inherit',
            textAlign: 'center',
          }}
        >
          Top 1 Analista
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {top1.map((analista) => (
            <div
              key={analista.analista}
              style={{
                background: '#f7fafd',
                borderRadius: '18px',
                boxShadow: '0 4px 18px rgba(0,0,0,0.10)',
                padding: '2rem 1.2rem 2rem 1.2rem',
                textAlign: 'center',
                cursor: 'pointer',
                border: '2.5px solid #e0e0e0',
                minWidth: 170,
                minHeight: 260,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,135,193,0.13)';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.025)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <img
                src={analista.caminhoFoto
                  ? `http://localhost:8080/funcionarios/foto/${analista.caminhoFoto}`
                  : 'https://via.placeholder.com/150'}
                alt={analista.analista}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  boxShadow: '0 4px 16px rgba(0,135,193,0.13)',
                  border: '4px solid #fff',
                  marginBottom: '1.2rem',
                  background: '#e0e0e0',
                }}
              />
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 700, fontSize: '1.25rem', color: '#222', letterSpacing: '0.5px' }}>{analista.analista}</p>
              <p style={{ margin: 0, fontWeight: 700, color: '#0087C1', fontSize: '1.18rem', letterSpacing: '0.7px' }}>{analista.totalPregoes} pregões</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GraficoAnalistasAutoVrio;
