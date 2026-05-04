/*
 * Página de inicio de sesión.
 *
 * Responsabilidad:
 * - Capturar las credenciales del doctor.
 * - Enviar los datos al backend mediante authApi.
 * - Guardar la sesión simulada en localStorage.
 * - Notificar al componente App cuando el login es correcto.
 */

import { useState } from "react";
import { loginDoctor } from "../services/authApi";

function LoginPage({ onLogin }) {
  /*
   * Estados del formulario.
   * Se dejan credenciales precargadas para facilitar la prueba académica.
   */
  const [correo, setCorreo] = useState("doctor@immunotrack.com");
  const [password, setPassword] = useState("123456");

  /*
   * Estado para mostrar mensajes de error cuando el backend rechaza el login.
   */
  const [error, setError] = useState("");

  /*
   * Maneja el envío del formulario de login.
   *
   * Flujo:
   * 1. Evita la recarga de la página.
   * 2. Envía credenciales al backend.
   * 3. Guarda token y usuario en localStorage.
   * 4. Actualiza el estado global de sesión.
   */
  async function manejarSubmit(evento) {
    evento.preventDefault();
    setError("");

    try {
      const respuesta = await loginDoctor({ correo, password });

      localStorage.setItem("token", respuesta.data.token);
      localStorage.setItem("usuario", JSON.stringify(respuesta.data.usuario));

      onLogin(respuesta.data.usuario);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>ImmunoTrack</h1>
        <p>Sistema clínico académico</p>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={manejarSubmit}>
          <label>Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(evento) => setCorreo(evento.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
            required
          />

          <button type="submit">Ingresar</button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;