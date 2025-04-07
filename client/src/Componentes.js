import './App.css';

export function FormularioLogin() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el login con React (por ejemplo, enviarlo a una API)
    console.log("Login enviado");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
      <div className="card p-4 shadow" style={{ width: '350px' }}>
        <h3 className="text-center mb-4">Inicia Sesión</h3>

        <form onSubmit={handleSubmit}>
          <div className="coolinput mb-3">
            <label htmlFor="username" className="text">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Escribe tu usuario..."
              className="input form-control"
              required
            />
          </div>

          <div className="coolinput mb-4">
            <label htmlFor="password" className="text">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Escribe tu contraseña..."
              className="input form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Iniciar Sesión
          </button>
        </form>

        <div className="text-center">
          <a href="#" className="d-block mb-1">¿Has olvidado tu contraseña?</a>
          <a href="#">Regístrate</a>
        </div>
      </div>
    </div>
  );
}


