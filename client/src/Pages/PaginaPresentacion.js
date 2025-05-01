import '../App.css';
import '../estilos/Paginas/Presentacion.css'
import { useState, useEffect } from 'react';
import { CambioIdioma } from '../Componentes/idioma';
import { Link } from "react-router-dom";
import { FondoCambiante } from '../Componentes/Visual';


export default function PaginaPresentacion() {
  const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'es');
  const [logoAnimado, setLogoAnimado] = useState(false);

  const cambiarIdioma = (nuevoIdioma) => {
    setIdioma(nuevoIdioma);
    localStorage.setItem('idioma', nuevoIdioma);
  };

  const animarLogo = () => {
    setLogoAnimado(true);
    setTimeout(() => setLogoAnimado(false), 800); // Duración de la animación
  };

  return (
    <div className="pagina-presentacion">
      <section className="seccion-video">
        <FondoCambiante className='video-fondo' />

        {/* El selector de idioma se posiciona en la parte superior derecha */}
        <CambioIdioma className='cambioIdioma' idioma={idioma} onChangeIdioma={cambiarIdioma} />

        <div className="tarjeta-Presentacion">
          <img className='imagen-logo' src='/media/logo.png' alt='logo' />
          <h1 className='titulo'>{idioma === 'es' ? 'Bienvenido a CalKal' : 'Welcome to CalKal'}</h1>
          <p className='subtitulo'>
            {idioma === 'es'
              ? 'Tu guía de alimentación, salud y bienestar.'
              : 'Your guide to food, health, and wellness.'}
          </p>
          <Link to="/login">
            <button className="boton-inicio">
              {idioma === 'es' ? '¡Empecemos!' : "Let's get started!"}
            </button>
          </Link>

        </div>
        <a href="#info" className="flecha-abajo">⬇</a>
      </section>

      <section id="info" className="descripcion-app">
        <h2 className="titulo-seccion">
          {idioma === 'es' ? 'Sobre nosotros' : 'About us'}
        </h2>

        <div className="tarjetas-info">
          <div className="tarjeta-info">
            <h3>{idioma === 'es' ? '¿Qué es CalKal?' : 'What is CalKal?'}</h3>
            <p>
              {idioma === 'es'
                ? 'Una aplicación para registrar tus comidas, controlar tus calorías y mejorar tus hábitos diarios.'
                : 'An app to log meals, track calories, and improve your daily habits.'}
            </p>
          </div>

          <div className="tarjeta-info">
            <h3>{idioma === 'es' ? '¿Por qué elegirnos?' : 'Why choose us?'}</h3>
            <p>
              {idioma === 'es'
                ? 'Porque combinamos salud, tecnología y simplicidad para ayudarte a alcanzar tus objetivos de bienestar.'
                : 'Because we combine health, technology, and simplicity to help you achieve your wellness goals.'}
            </p>
          </div>

          <div className="tarjeta-info">
            <h3>{idioma === 'es' ? 'Contacto' : 'Contact'}</h3>
            <p>
              {idioma === 'es'
                ? 'Si encuentras algún problema, contáctanos mediante:'
                : 'If you encounter any issue, contact us at:'}
            </p>
            <p><strong>calkal685@gmail.com</strong></p>
          </div>
        </div>
        
        <Link to="/registro">
          <button className="boton-extra">
            {idioma === 'es' ? 'Crear cuenta' : "Create account"}
          </button>
        </Link>

      
      </section>
    </div>
  );
}
