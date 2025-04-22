import '../App.css';
import { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export function FormularioCambiarContraseña({idioma}){
  const { uid, token } = useParams();
  const [errors, setErrors] = useState({});
  const redireccion = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ password: '', confirm_password: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.password !== formData.confirm_password) {
      errors.confirm_password = { es: 'Las contraseñas no coinciden', en: 'Passwords do not match' };
      setLoading(false);
      return
    }

    try{
      const response = await axios.post(`http://localhost:8000/api/CambiaContraseña/${uid}/${token}/`,
        { password: formData.password }
      );
      redireccion('/login');
    }
    catch (error){
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="container mt-5" style={{ maxWidth: '400px' }}>
        <h4 className="mb-3">{idioma === 'es' ? 'Establecer nueva Contraseña' : 'Set new Password'}</h4>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            placeholder={idioma === 'es' ? 'Contraseña' : 'Password'}
            required
          />
          {errors.password && <small className="text-danger">{errors.password[idioma]}</small>}
        </div>
  
        <div className="mb-3">
          <input
            type="password"
            name="confirm_password"
            className="form-control"
            onChange={handleChange}
            placeholder={idioma === 'es' ? 'Confirmar Contraseña' : 'Confirm Password'}
            required
          />
          {errors.confirm_password && <small className="text-danger">{errors.confirm_password[idioma]}</small>}
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">
          {loading ? (idioma === 'es' ? 'Cargando...' : 'Loading...') : idioma === 'es' ? 'Cambiar Contraseña' : 'Set Password'}
        </button>
      </form>
    </div>
  );
}


export function FormularioPedirEmail({idioma}){
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try{
      setErrors({})
      await axios.post('http://localhost:8000/api/solicitar-contraseña/', { email });
    }
    catch (error){
      if (error.response && error.response.status === 400) {
        setErrors({
          es: 'Email no registrado',
          en: 'Email not found'
        });
      }
    }

  };

  return(
    <form onSubmit={handleSubmit} className="container mt-5" style={{ maxWidth: '400px' }}>
      <h4 className="mb-3">{idioma === 'es' ? 'Recuperar contraseña' : 'e'}</h4>
      {errors && <small className="text-danger">{errors[idioma]}</small>}
      <div className="mb-3">
        <input
          type="email"
          id="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Solicitar correo</button>
    </form>
  )
}

export function FormularioLogin({ idioma }) {
  const [errors, setErrors]= useState({});
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });

  const redireccion = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== undefined && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:8000/api/login/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Suponiendo que el backend devuelve algo como: { token: "abc123", username: "pepe" }
    const { token, username } = response.data;

    // Guarda el token (puedes usar localStorage o sessionStorage)
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);

    //Limpia de errores
    setErrors({});
    // Redirige al usuario, por ejemplo, al home o dashboard
    redireccion('/');
    } catch (error) {
      setErrors({
        es: 'Usuario o Contraseña incorrectos',
        en: 'User or password invalid'
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '350px' }}>
        <h3 className="text-center mb-4">{idioma === 'es' ? 'Inicia Sesión' : 'Log in'}</h3>

        {errors && <small className="text-danger">{errors[idioma]}</small>}
        <form onSubmit={handleSubmit}>
          <div className="coolinput mb-3">
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder={idioma === 'es' ? 'Nombre Usuario' : 'Username'}
              className="input form-control"
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            {idioma === 'es' ? 'Inicia Sesión' : 'Log in'}
          </button>
        </form>

        <div className="text-center">
          <Link to="/RecuperarContraseña">{idioma === 'es' ? '¿Has olvidado tu contraseña?' : 'Forgot password?'}</Link><br />
          <Link to="/registro">{idioma === 'es' ? 'Regístrate' : 'Sign up'}</Link>
        </div>
      </div>
    </div>
  );
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
    const [errors, setErrors] = useState({});
    const redireccion = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState('')
    const [formData, setFormData] = useState({
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      altura: '',
      peso: '',
      edad: '',
      genero: '',
      objetivo: '',
      actividad: '',
      notificaciones: false,
      imagen_Perfil: null,
      accept_terms: false,
    });
  
    const handleChange = (e) => {
      const { name, value, type, checked, files } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked :
                type === 'file' ? files[0] :
                value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      setErrors({});

      const newErrors = {};

      if (formData.altura < 0 || isNaN(formData.altura)) {
        newErrors.altura = {
          es: 'La altura debe ser un número positivo',
          en: 'Height must be a positive number',
        };
      }
      
      if (formData.peso < 0 || isNaN(formData.peso)) {
        newErrors.peso = {
          es: 'El peso debe ser un número positivo',
          en: 'Weight must be a positive number',
        };
      }
      
      if (formData.edad < 0 || isNaN(formData.edad)) {
        newErrors.edad = {
          es: 'La edad debe ser un número positivo',
          en: 'Age must be a positive number',
        };
      }
      
      if (formData.password.length < 6) {
        newErrors.password = {
          es: 'La contraseña debe tener al menos 6 caracteres',
          en: 'Password must be at least 6 characters',
        };
      }
      
      if (formData.password !== confirmPassword) {
        newErrors.confirm_password = {
          es: 'Las contraseñas no coinciden',
          en: 'Passwords do not match',
        };
      }
      
      if (!formData.genero) {
        newErrors.genero = {
          es: 'Selecciona un género',
          en: 'Please select a gender',
        };
      }
      
      if (!formData.objetivo) {
        newErrors.objetivo = {
          es: 'Selecciona un objetivo',
          en: 'Please select a goal',
        };
      }
      
      if (!formData.actividad) {
        newErrors.actividad = {
          es: 'Selecciona un nivel de actividad',
          en: 'Please select an activity level',
        };
      }
      
      if (!formData.accept_terms) {
        newErrors.accept_terms = {
          es: 'Acepta los términos',
          en: 'Accept the terms',
        };
      }
      
      
      // Luego, seleccionas cuál mostrar
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      const data = new FormData();
      for (const key in formData) {
        if (formData[key] !== undefined && formData[key] !== null) {
          data.append(key, formData[key]);
        }
      }
  
      try {
        const response = await axios.post('http://localhost:8000/api/register/', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(response.data);
        redireccion('/login', { state: { mensajees:'Te has registrado correctamente', mensajeen: 'You have registered successfully' } });
      } catch (error) {
        const responseErrors = error.response?.data;
        if (responseErrors) {
          setErrors(responseErrors);
        } else {
          console.error(error);
          // En caso de error inesperado
          alert(idioma === 'es' ? 'Error del servidor' : 'Server error');
        }
      }
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
                value={formData.username}
                onChange={handleChange}
                placeholder={idioma === 'es' ? 'Nombre de usuario' : 'Username'}
                required
              />
              {errors.username && <small className="text-danger">{errors.username}</small>}
            </div>
  
            <div className="mb-3">
              <input
                type="text"
                name="first_name"
                className="form-control"
                value={formData.first_name}
                onChange={handleChange}
                placeholder={idioma === 'es' ? 'Nombre' : 'First Name'}
                required
              />
            </div>
  
            <div className="mb-3">
              <input
                type="text"
                name="last_name"
                className="form-control"
                value={formData.last_name}
                onChange={handleChange}
                placeholder={idioma === 'es' ? 'Apellido' : 'Last Name'}
                required
              />
            </div>
  
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
  
            {/* MEDIDAS Y PREFERENCIAS */}
            <h5 className="mb-3 mt-4">{idioma === 'es' ? 'Medidas y Preferencias' : 'Measurements & Preferences'}</h5>
  
            <div className="mb-3">
              <input
                type="number"
                name="altura"
                className="form-control"
                value={formData.altura}
                onChange={handleChange}
                placeholder={idioma === 'es' ? 'Altura (cm)' : 'Height (cm)'}
              />
              {errors.altura && <small className="text-danger">{errors.altura[idioma]}</small>}
            </div>
  
            <div className="mb-3">
              <input
                type="number"
                name="peso"
                className="form-control"
                value={formData.peso}
                onChange={handleChange}
                placeholder={idioma === 'es' ? 'Peso (kg)' : 'Weight (kg)'}
              />
              {errors.peso && <small className="text-danger">{errors.peso[idioma]}</small>}
            </div>
  
            <div className="mb-3">
              <input
                type="number"
                name="edad"
                className="form-control"
                value={formData.edad}
                onChange={handleChange}
                placeholder={idioma === 'es' ? 'Edad' : 'Age'}
              />
              {errors.edad && <small className="text-danger">{errors.edad[idioma]}</small>}
            </div>
  
            <div className="mb-3">
              <select
                name="genero"
                className="form-control"
                value={formData.genero}
                onChange={handleChange}
              >
                <option value="">{idioma === 'es' ? 'Género' : 'Gender'}</option>
                <option value="Masculino">{idioma === 'es' ? 'Masculino' : 'Male'}</option>
                <option value="Femenino">{idioma === 'es' ? 'Femenino' : 'Female'}</option>
              </select>
              {errors.genero && <small className="text-danger">{errors.genero[idioma]}</small>}
            </div>
  
            <div className="mb-3">
              <select
                name="objetivo"
                className="form-control"
                value={formData.objetivo}
                onChange={handleChange}
              >
                <option value="">{idioma === 'es' ? 'Objetivo' : 'Goal'}</option>
                <option value="Perder peso">{idioma === 'es' ? 'Perder peso' : 'Lose weight'}</option>
                <option value="Mantener peso">{idioma === 'es' ? 'Mantener peso' : 'Maintain weight'}</option>
                <option value="Ganar peso">{idioma === 'es' ? 'Ganar peso' : 'Gain weight'}</option>
              </select>
              {errors.objetivo && <small className="text-danger">{errors.objetivo[idioma]}</small>}
            </div>
  
            <div className="mb-3">
              <select
                name="actividad"
                className="form-control"
                value={formData.actividad}
                onChange={handleChange}
              >
                <option value="">{idioma === 'es' ? 'Nivel de actividad' : 'Activity level'}</option>
                <option value="Nula">{idioma === 'es' ? 'Nula' : 'None'}</option>
                <option value="1 a 2 veces en semana">{idioma === 'es' ? '1 a 2 veces en semana' : '1 to 2 times per week'}</option>
                <option value="3 a 5 veces en semana">{idioma === 'es' ? '3 a 5 veces en semana' : '3 to 5 times per week'}</option>
                <option value="6 a 7 veces en semana">{idioma === 'es' ? '6 a 7 veces en semana' : '6 to 7 times per week'}</option>
                <option value="Ejercicio intenso a diario">{idioma === 'es' ? 'Ejercicio intenso a diario' : 'Intense exercise daily'}</option>
              </select>
              {errors.actividad && <small className="text-danger">{errors.actividad[idioma]}</small>}
            </div>
  
            <div className="mb-3">
              <input
                type="file"
                name="imagen_Perfil"
                className="form-control"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
  
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                name="notificaciones"
                id="notificaciones"
                checked={formData.notificaciones}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="notificaciones">
                {idioma === 'es' ? 'Recibir notificaciones' : 'Receive notifications'}
              </label>
            </div>
  
            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder={idioma === 'es' ? 'Contraseña' : 'Password'}
                required
              />
              {errors.password && <small className="text-danger">{errors.password[idioma]}</small>}
            </div>
  
            <div className="mb-3">
              <input
                type="password"
                name="confirm_password"
                className="form-control"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={idioma === 'es' ? 'Confirmar Contraseña' : 'Confirm Password'}
                required
              />
              {errors.confirm_password && <small className="text-danger">{errors.confirm_password[idioma]}</small>}
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                name="accept_terms"
                className="form-check-input"
                required
                onChange={handleChange}
              />
              <label className="form-check-label">
                {idioma === 'es' ? (<>Acepto los <Link to="/registro/terminosYcondiciones">Términos y Condiciones</Link> y la  <Link to="/registro/PoliticaPrivacidad">Política de Privacidad</Link>.</>) : (<>I accept the <Link to="/registro/terminosYcondiciones">Terms and Conditions</Link> and the <Link to="/registro/PoliticaPrivacidad">Privacy Policy</Link>.</>)}
              </label>
            </div>

            <button type="submit" className="btn btn-success w-100">
              {idioma === 'es' ? 'Registrarse' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    );
  }
  

 