/*
 * Archivo principal de entrada de la aplicación React.
 *
 * Responsabilidad:
 * - Montar el componente raíz App dentro del elemento HTML con id "root".
 * - Activar StrictMode para ayudar a detectar posibles problemas durante desarrollo.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Renderiza la aplicación completa dentro del div principal definido en index.html.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);