import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area } from 'recharts';

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
