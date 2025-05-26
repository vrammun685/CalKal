import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../auth/axiosConfig';

export default function AdminPanel() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  api('paneladmin/')
    .then(res => {
      if (res.status === 403) {
        navigate('/login');
        return null;
      }
      return res.data; // ✅ RETORNAR datos
    })
    .then(data => {
      if (data) {
        setData(data);
      }
    })
    .catch(error => {
      console.error('Error al obtener datos del panel:', error);
      navigate('/login');
    });
}, [navigate]);

  return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administración</h1>

      {!data ? (
        <p className="text-gray-500">Cargando datos...</p>
      ) : (
        <>
          {/* Sección Usuarios */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Usuarios Registrados</h2>
          <div className="overflow-x-auto mb-10">
            <table className="min-w-full table-auto border">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Usuario</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Edad</th>
                  <th className="px-4 py-2">Altura</th>
                  <th className="px-4 py-2">Peso</th>
                  <th className="px-4 py-2">Género</th>
                  <th className="px-4 py-2">Rol</th>
                </tr>
              </thead>
              <tbody>
                {data.usuarios.map(user => (
                  <tr key={user.id} className="border-t">
                    <td className="px-4 py-2">{user.id}</td>
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.first_name} {user.last_name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.edad}</td>
                    <td className="px-4 py-2">{user.altura} cm</td>
                    <td className="px-4 py-2">{user.peso} kg</td>
                    <td className="px-4 py-2 capitalize">{user.genero}</td>
                    <td className="px-4 py-2">
                      {user.is_superuser ? 'SuperAdmin' : user.is_staff ? 'Admin' : 'Usuario'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sección Alimentos */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Listado de Alimentos</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-2">Código</th>
                  <th className="px-4 py-2">Nombre (ES)</th>
                  <th className="px-4 py-2">Nombre (EN)</th>
                  <th className="px-4 py-2">Calorías</th>
                  <th className="px-4 py-2">Grasas</th>
                  <th className="px-4 py-2">Proteínas</th>
                  <th className="px-4 py-2">Carbohidratos</th>
                  <th className="px-4 py-2">Medida</th>
                </tr>
              </thead>
              <tbody>
                {data.alimentos.map(alimento => (
                  <tr key={alimento.id} className="border-t">
                    <td className="px-4 py-2">{alimento.codigo}</td>
                    <td className="px-4 py-2">{alimento.nombre_es}</td>
                    <td className="px-4 py-2">{alimento.nombre_en}</td>
                    <td className="px-4 py-2">{alimento.calorias} kcal</td>
                    <td className="px-4 py-2">{alimento.grasas} g</td>
                    <td className="px-4 py-2">{alimento.proteinas} g</td>
                    <td className="px-4 py-2">{alimento.carbohidratos} g</td>
                    <td className="px-4 py-2">{alimento.medida}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  </div>
);
}
