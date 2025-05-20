import MenuPrincipal from '../../Componentes/Menus/MenuPrincipal/MenuPrincipal';
import { useState, useEffect } from 'react';
import api from '../../auth/axiosConfig';

export default function PaginaDiarios() {
  const [idioma, setIdioma] = useState(localStorage.getItem("idioma") || "es");
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [diarios, setDiarios] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    api.get("/diario/")
      .then((res) => {
        setDatosUsuario(res.data.foto_perfil);
        setDiarios(res.data.diarios || []);
        setIndiceActual(0);
        console.log("Datos recibidos:", res.data);
      })
      .catch((err) => {
        console.error("Error al obtener los diarios del usuario:", err);
      });
  }, []);

  // Renderiza la lista combinada de alimentos y comidas para una parte del día
  const renderParteDelDia = (titulo, diarioParte) => {
    const alimentos = diarioParte.alimentos || [];
    const comidas = diarioParte.comidas || [];

    return (
      <div className="card">
        <h4>{titulo}</h4>

        {alimentos.length === 0 && comidas.length === 0 && (
          <p>No hay elementos registrados.</p>
        )}

        {alimentos.length > 0 && (
          <>
            <h5>Alimentos Consumidos</h5>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Unidad</th>
                  <th>Calorías</th>
                </tr>
              </thead>
              <tbody>
                {alimentos.map((alimento, idx) => (
                  <tr key={idx}>
                    <td>{alimento.nombre_es}</td>
                    <td>{alimento.cantidad}</td>
                    <td>{alimento.medida}</td>
                    <td>{alimento.calorias}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {comidas.length > 0 && (
          <>
            <h5>Comidas</h5>
            {comidas.map((comida, idx) => (
              <div key={idx} style={{ marginBottom: "1rem" }}>
                <strong>Personas:</strong> {comida.numeroPersonas}
                <ul>
                  {Array.isArray(comida.alimentos) && comida.alimentos.length > 0 ? (
                    comida.alimentos.map((ing, i) => (
                      <li key={i}>{ing.nombre_es} - {ing.cantidad} {ing.medida}</li>
                    ))
                  ) : (
                    <li>No hay ingredientes</li>
                  )}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
    );
  };

  const cambiarDia = (delta) => {
    setIndiceActual((prev) => Math.min(Math.max(prev + delta, 0), diarios.length - 1));
  };

  const diarioActual = diarios[indiceActual];

  return (
    <div>
      <MenuPrincipal idioma={idioma} setIdioma={setIdioma} imagenPerfil={datosUsuario} />

      {diarioActual ? (
        <div style={{ padding: "1rem" }}>
          <h2 style={{ textAlign: "center" }}>Diario del día: {diarioActual.fecha || "Sin fecha"}</h2>

          <div style={{ textAlign: "center", margin: "1rem" }}>
            <button onClick={() => cambiarDia(-1)} disabled={indiceActual === 0}>Anterior</button>
            <span style={{ margin: "0 1rem" }}>{indiceActual + 1} de {diarios.length}</span>
            <button onClick={() => cambiarDia(1)} disabled={indiceActual === diarios.length - 1}>Siguiente</button>
          </div>

          {['desayuno', 'almuerzo', 'cena', 'otro'].map((parte) => (
            <div key={parte}>
              {renderParteDelDia(
                parte.charAt(0).toUpperCase() + parte.slice(1),
                {
                  alimentos: diarioActual.alimentos?.[parte] || [],
                  comidas: diarioActual.comidas?.[parte] || []
                }
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>Cargando diarios...</p>
      )}

      <style jsx>{`
        .card {
          background: #f9f9f9;
          border-radius: 10px;
          padding: 1rem;
          margin: 1rem 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 0.5rem;
          border: 1px solid #ccc;
          text-align: left;
        }

        button {
          padding: 0.5rem 1rem;
          margin: 0.25rem;
          border: none;
          border-radius: 5px;
          background-color: #4CAF87;
          color: white;
          cursor: pointer;
        }

        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
