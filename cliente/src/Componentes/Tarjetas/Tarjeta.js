import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function TarjetaDeAcciones({idioma}){
  const navigate = useNavigate();
  
  const acciones = [
    {texto: idioma === "es" ? "Añade hoy tus Alimentos que vas a consumir" : "Log today's meals and food items", boton: idioma === "es" ? "Ver" : "View",ruta: "/Alimento/Añadir",},
    {texto: idioma === "es" ? "Registra tus recetas favoritas ahora" : "Save your favorite recipes now", boton: idioma === "es" ? "Ver" : "View",ruta:"/Receta/Añadir",},
    {texto: idioma === "es" ? "Activa las notificaciones para no perderte nada" : "Enable notifications so you don't miss a thing", boton: idioma === "es" ? "Ver" : "Enable",ruta:"Perfil",},
  ];

  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndice((prev) => (prev + 1) % acciones.length);
    }, 7500); // Cambia cada 5 segundos

    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    navigate(acciones[indice].ruta);
  };

  return (
    <div className="tarjeta-acciones">
      <p>{acciones[indice].texto}</p>
      <button className="boton" onClick={() => alert(`Has pulsado: ${acciones[indice].boton}`)}>{acciones[indice].boton}</button>
    </div>
  );

}