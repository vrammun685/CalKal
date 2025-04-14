import '../App.css';
import { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';


export function FormularioLogin({idioma}) {
    const handleSubmit = (e) => {
      e.preventDefault();
      // Aquí puedes manejar el login con React (por ejemplo, enviarlo a una API)
      console.log("Login enviado");
    };
  
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 ">
        <div className="card p-4 shadow" style={{ width: '350px' }}>
          <h3 className="text-center mb-4">{idioma === 'es' ? 'Inicia Sesión' : 'Log in'}</h3>
  
          <form onSubmit={handleSubmit}>
            <div className="coolinput mb-3">
              <input
                type="text"
                id="username"
                name="username"
                placeholder={idioma === 'es' ? 'Usuario' : 'User'}
                className="input form-control"
                required
              />
            </div>
  
            <div className="coolinput mb-4">
              <input
                type="password"
                id="password"
                name="password"
                placeholder={idioma === 'es' ? 'Contraseña' : 'Password'}
                className="input form-control"
                required
              />
            </div>
  
            <button type="submit" className="btn btn-primary w-100 mb-3">
              {idioma === 'es' ? 'Inicia Sesión' : 'Log in'}
            </button>
          </form>
  
          <div className="text-center">
            <Link to="/RecuperarContraseña">{idioma === 'es' ? '¿Has olvidado tu contraseña?' : 'Forgot password?'}</Link><br/>
            <Link to="/registro">{idioma === 'es' ? 'Registrate' : 'Singn up'}</Link>
          </div>
        </div>
      </div>
    );
  }


export function FormulariosPrueba(){
    return(
        <form >
            <label>Username: </label>
            <input
                type="text"
                placeholder="Escribe un usuarioname..."
                className="input form-control"
                required
              /><br/>
              <input type='submit'/>
        </form>
    )
}

export function FiltroAlimentos({ filtro, setFiltro }) {
    return (
      <div name="filtro">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Buscar..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>
    );
  }

  export default function FormularioRegistro({ idioma }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      // Aquí puedes manejar el login con React (por ejemplo, enviarlo a una API)
      console.log("Login enviado");
    };

    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ width: '400px' }}>
          <h3 className="text-center mb-4">
            {idioma === 'es' ? 'Registro de Usuario' : 'User Registration'}
          </h3>
  
          <form onSubmit={handleSubmit}>
            {/* DATOS PERSONALES */}
            <h5 className="mb-3">{idioma === 'es' ? 'Datos Personales' : 'Personal Information'}</h5>
  
            <div className="mb-3">
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder={idioma === 'es' ? 'Nombre de usuario' : 'Username'}
                required
              />
            </div>
  
            <div className="mb-3">
              <input
                type="text"
                name="first_name"
                className="form-control"
                placeholder={idioma === 'es' ? 'Nombre' : 'First Name'}
                required
              />
            </div>
  
            <div className="mb-3">
              <input
                type="text"
                name="last_name"
                className="form-control"
                placeholder={idioma === 'es' ? 'Apellido' : 'Last Name'}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder='Email'
                required
              />
            </div>
  
            {/* MEDIDAS Y PREFERENCIAS */}
            <h5 className="mb-3 mt-4">{idioma === 'es' ? 'Medidas y Preferencias' : 'Measurements & Preferences'}</h5>
  
            <div className="mb-3">
              <input
                type="number"
                name="altura"
                className="form-control"
                placeholder={idioma === 'es' ? 'Altura (cm)' : 'Height (cm)'}
              />
            </div>
  
            <div className="mb-3">
              <input
                type="number"
                name="peso"
                className="form-control"
                placeholder={idioma === 'es' ? 'Peso (kg)' : 'Weight (kg)'}
              />
            </div>
  
            <div className="mb-3">
              <input
                type="number"
                name="edad"
                className="form-control"
                placeholder={idioma === 'es' ? 'Edad' : 'Age'}
              />
            </div>
  
            <div className="mb-3">
              <select name="genero" className="form-control">
                <option value="">{idioma === 'es' ? 'Género' : 'Gender'}</option>
                <option value="M">{idioma === 'es' ? 'Masculino' : 'Male'}</option>
                <option value="F">{idioma === 'es' ? 'Femenino' : 'Female'}</option>
              </select>
            </div>
  
            <div className="mb-3">
              <select name="objetivo" className="form-control">
                <option value="">{idioma === 'es' ? 'Objetivo' : 'Goal'}</option>
                <option value="perder">{idioma === 'es' ? 'Perder peso' : 'Lose weight'}</option>
                <option value="mantener">{idioma === 'es' ? 'Mantener peso' : 'Maintain weight'}</option>
                <option value="ganar">{idioma === 'es' ? 'Ganar peso' : 'Gain weight'}</option>
              </select>
            </div>
  
            <div className="mb-3">
              <select name="actividad" className="form-control">
                <option value="">{idioma === 'es' ? 'Nivel de actividad' : 'Activity level'}</option>
                <option value="bajo">{idioma === 'es' ? 'Bajo' : 'Low'}</option>
                <option value="medio">{idioma === 'es' ? 'Medio' : 'Medium'}</option>
                <option value="alto">{idioma === 'es' ? 'Alto' : 'High'}</option>
              </select>
            </div>
  
            <div className="mb-3">
              <input
                type="file"
                name="imagen_Perfil"
                className="form-control"
                accept="image/*"
              />
            </div>
  
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" name="notificaciones" id="notificaciones" />
              <label className="form-check-label" htmlFor="notificaciones">
                {idioma === 'es' ? 'Recibir notificaciones' : 'Receive notifications'}
              </label>
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder={idioma === 'es' ? 'Contraseña' : 'Password'}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder={idioma === 'es' ? 'Confirmar Contraseña' : 'Confirm Password'}
                required
              />
            </div>
  
            <button type="submit" className="btn btn-success w-100">
              {idioma === 'es' ? 'Registrarse' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    );
  }
  