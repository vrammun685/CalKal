import React from 'react';
import './GraficoCalorias.css';
import { PieChart, Pie, Cell,} from 'recharts';

export function GraficoCalorias({ consumidas, objetivo }) {
  const restante = Math.max(objetivo - consumidas, 0);

  const data = [
    { name: 'Consumidas', value: consumidas },
    { name: 'Restante', value: restante },
  ];

  const COLORS = ['#4CAF87', '#E4B363']; // Verde y gris Bootstrap-like

  return (
    <div className="position-relative d-flex justify-content-center align-items-center py-4">
      <PieChart width={500} height={500}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={175}
          outerRadius={240}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>

      {/* Texto centrado encima del gráfico */}
      <div
        className="position-absolute text-center"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '2em',
        }}
      >
        <p className="h2 mb-1 fw-bold">{consumidas} / {objetivo}</p>
        <p className="text-muted small">kcal</p>
      </div>
    </div>
  );
}