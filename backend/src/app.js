// Importa Express, que permite crear el servidor HTTP y definir rutas.
const express = require("express");

// Importa CORS para permitir que React pueda comunicarse con este backend.
const cors = require("cors");

// Importa las rutas del módulo de autenticación.
const authRoutes = require("./routes/auth.routes");

// Importa las rutas del módulo de pacientes.
const pacienteRoutes = require("./routes/paciente.routes");

// Crea una instancia de la aplicación Express.
const app = express();

// Define el puerto donde se ejecutará el servidor backend.
const PORT = 3000;

// Habilita CORS para permitir peticiones desde el frontend React.
app.use(cors());

// Permite que el servidor reciba datos en formato JSON.
app.use(express.json());

// Ruta básica para comprobar que el backend está funcionando.
app.get("/", (req, res) => {
  res.json({
    ok: true,
    mensaje: "Backend ImmunoTrack activo"
  });
});

// Ruta de prueba técnica para verificar el estado del servidor.
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    mensaje: "Backend ImmunoTrack funcionando correctamente"
  });
});

// Registra las rutas relacionadas con autenticación.
app.use("/api/auth", authRoutes);

// Registra las rutas relacionadas con pacientes.
app.use("/api/pacientes", pacienteRoutes);

// Inicia el servidor en el puerto definido.
app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
});