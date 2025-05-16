import { useEffect, useState} from 'react';

export default function ListadoPesos({idioma, pesos, eliminar, editar}){
  const pesosOrdenados = [...pesos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  const abrirImagen = (url) => setImagenSeleccionada(url);
  const cerrarModal = () => setImagenSeleccionada(null);

  
  return(
    <div>
      <h2>Historial de pesos</h2>
      <table>
        <tbody>
          {pesosOrdenados.map((peso) => (
            <tr key={peso.id}>
              <td>{peso.fecha}</td>
              <td>{peso.peso}Kg</td>
              <td>{peso.foto_pesaje ? (<img src={peso.foto_pesaje} alt="Foto de pesaje" className='imagen-miniatura' onClick={() => abrirImagen(peso.foto_pesaje)}/>) : ("Sin Foto")}</td>
              <td><button>{idioma === 'es' ? "Editar" : "Update"}</button></td>
              <td><button onClick={() => eliminar(peso.id)}>{idioma === 'es' ? "Eliminar" : "Delete"}</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {imagenSeleccionada && (
      <div className='fondo-imagen-Agrandada' onClick={cerrarModal}>
        <img className='imagen-Agrandada'src={imagenSeleccionada} alt="Ampliada"/>
      </div>
      )}
    </div>
  )
}