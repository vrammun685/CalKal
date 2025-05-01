import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area } from 'recharts';

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


export function GraficoPesos({pesos}) {
  const datosOrdenados = [...pesos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  const datosGrafico = datosOrdenados.map(peso => ({
    fecha: peso.fecha,  // Asegúrate de que la fecha esté en formato string (YYYY-MM-DD)
    peso: peso.peso
  }));

  const minPeso = Math.floor(Math.min(...datosGrafico.map(p => p.peso)) / 10) * 10;
  const maxPeso = Math.ceil(Math.max(...datosGrafico.map(p => p.peso)) / 10) * 10;

  // Generar ticks de 10 en 10
  const ticks = [];
  for (let i = minPeso; i <= maxPeso; i += 10) {
    ticks.push(i);
  }

  return(
    <div style={{ width: '90%', height: 400 }}>
      <h3>Evolución del Peso</h3>
      <ResponsiveContainer>
        <LineChart data={datosGrafico}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis domain={[minPeso, maxPeso]} ticks={ticks}/>
          <Tooltip />
          
          {/* Área de color debajo de la línea */}
          
          {/* Línea que representa el peso */}
          <Line
            type="linear"
            dataKey="peso"
            stroke="#8884d8"
            strokeWidth={2}
            dot={true}  // No mostrar los puntos en la línea
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
