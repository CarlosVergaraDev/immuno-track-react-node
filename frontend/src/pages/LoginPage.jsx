/*
 * Página de inicio de sesión de ImmunoTrack.
 *
 * Responsabilidad:
 * - Mostrar la pantalla de acceso principal.
 * - Mantener una apariencia similar al proyecto Java original.
 * - Consumir el backend Node/Express para validar el login simulado.
 * - Guardar la sesión académica en localStorage cuando el acceso es correcto.
 */

import { useState } from "react";
import { loginDoctor } from "../services/authApi";

function LoginPage({ onLogin }) {
  /*
   * Credenciales iniciales precargadas para facilitar la demostración académica.
   * Estas credenciales coinciden con los datos simulados definidos en el backend.
   */
  const [correo, setCorreo] = useState("doctor@immunotrack.com");
  const [password, setPassword] = useState("123456");

  /*
   * Estado utilizado para mostrar errores enviados por el backend,
   * por ejemplo credenciales incorrectas o campos vacíos.
   */
  const [error, setError] = useState("");

  /*
   * URL pública del logo institucional usado en el proyecto original.
   * Se usa como recurso visual para conservar identidad gráfica.
   */
  const logoUrl =
    "https://i.ibb.co/6ckj3Z9S/700022db-4e5a-4b82-b949-ce860df45d62.png";

  /*
   * Procesa el envío del formulario de login.
   *
   * Flujo:
   * 1. Evita la recarga normal del navegador.
   * 2. Envía correo y contraseña al backend.
   * 3. Guarda token y usuario en localStorage.
   * 4. Notifica al componente App que existe una sesión activa.
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
    <main className="auth-shell">
      <section className="auth-visual">
        <div className="auth-visual-copy">
          <h1>
            Inmunología de
            <br />
            Precisión.
          </h1>

          <p>
            Construya un registro clínico para la gestión de datos y seguimiento
            avanzado de perfiles autoinmunes.
          </p>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-panel-inner">
          <div className="auth-brand-lockup">
            <div className="auth-brand-logo-box">
              <img
                src={logoUrl}
                alt="Logo ImmunoTrack"
                className="auth-brand-logo"
              />
            </div>

            <span className="auth-brand-separator" />

            <h1 className="auth-brand-text">IMT</h1>
          </div>

          <h2 className="auth-title">Acceso clínico</h2>

          <p className="auth-subtitle">
            Ingrese con sus credenciales para acceder al portal de gestión de
            pacientes.
          </p>

          {error && <div className="auth-alert">{error}</div>}

          <form className="auth-form" onSubmit={manejarSubmit}>
            <div className="auth-form-group">
              <label>Correo electrónico</label>

              <input
                type="email"
                value={correo}
                onChange={(evento) => setCorreo(evento.target.value)}
                required
              />
            </div>

            <div className="auth-form-group">
              <label>Contraseña</label>

              <input
                type="password"
                value={password}
                onChange={(evento) => setPassword(evento.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-submit">
              Ingresar
            </button>
          </form>

          <p className="auth-footer-note">
            Versión académica React + Node.js con caché en memoria.
          </p>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;