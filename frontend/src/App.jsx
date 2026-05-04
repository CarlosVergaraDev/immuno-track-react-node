/*
 * Componente raíz de la aplicación ImmunoTrack.
 *
 * Responsabilidad:
 * - Controlar si el usuario tiene una sesión activa.
 * - Mostrar la pantalla de Login cuando no hay usuario autenticado.
 * - Mostrar el menú principal cuando existe una sesión simulada.
 */

import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import "./styles/app.css";

function App() {
  /*
   * Se consulta localStorage para verificar si ya existe un usuario autenticado.
   * Esto permite conservar la sesión simulada aunque el navegador se recargue.
   */
  const usuarioGuardado = localStorage.getItem("usuario");

  /*
   * Estado principal del usuario autenticado.
   * Si existe información en localStorage, se carga como sesión inicial.
   */
  const [usuario, setUsuario] = useState(
    usuarioGuardado ? JSON.parse(usuarioGuardado) : null
  );

  return (
    <>
      {usuario ? (
        /*
         * Si existe usuario, se muestra el menú clínico principal.
         */
        <MenuPage
          usuario={usuario}
          onLogout={() => setUsuario(null)}
        />
      ) : (
        /*
         * Si no existe usuario, se muestra la página de inicio de sesión.
         */
        <LoginPage onLogin={setUsuario} />
      )}
    </>
  );
}

export default App;