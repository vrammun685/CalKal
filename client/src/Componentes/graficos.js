import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

export function GraficoCalorias({ consumidas, objetivo }) {
  const restante = Math.max(objetivo - consumidas, 0);

  const data = [
    { name: 'Consumidas', value: consumidas },
    { name: 'Restante', value: restante },
  ];

  const COLORS = ['#28a745', '#dee2e6']; // Verde y gris Bootstrap-like

  return (
    <div
      className="position-relative d-flex justify-content-center align-items-center"
    >
      <PieChart width={350} height={350}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={105}
          outerRadius={170}
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
        }}
      >
        <p className="h5 mb-1 fw-bold">{consumidas} / {objetivo}</p>
        <p className="text-muted small">kcal</p>
      </div>
    </div>
  );
}
