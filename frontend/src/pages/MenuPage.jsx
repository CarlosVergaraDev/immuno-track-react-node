/*
 * Página principal del sistema después del login.
 *
 * Responsabilidad:
 * - Mostrar el menú clínico principal.
 * - Listar pacientes desde el backend.
 * - Buscar pacientes por término.
 * - Seleccionar pacientes para ver su información.
 * - Abrir el formulario de nuevo registro.
 * - Eliminar pacientes usando la API Node/Express.
 */

import { useEffect, useState } from "react";
import PacienteForm from "../components/PacienteForm";
import {
  listarPacientes,
  buscarPacientes,
  eliminarPaciente
} from "../services/pacienteApi";

function MenuPage({ usuario, onLogout }) {
  /*
   * Lista de pacientes obtenida desde el backend.
   */
  const [pacientes, setPacientes] = useState([]);

  /*
   * Paciente actualmente seleccionado en el panel lateral.
   */
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  /*
   * Controla si se muestra el formulario de registro.
   */
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  /*
   * Texto digitado por el usuario en el buscador.
   */
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  /*
   * Consulta al backend todos los pacientes existentes.
   * Esta función se reutiliza después de crear o eliminar pacientes.
   */
  async function cargarPacientes() {
    const datos = await listarPacientes();
    setPacientes(datos);
  }

  /*
   * useEffect se ejecuta al cargar la pantalla.
   * Su objetivo es traer la lista inicial de pacientes desde Node/Express.
   */
  useEffect(() => {
    cargarPacientes();
  }, []);

  /*
   * Realiza la búsqueda de pacientes en tiempo real.
   * Cada cambio en el input consulta el backend con el término escrito.
   */
  async function manejarBusqueda(evento) {
    const valor = evento.target.value;
    setTerminoBusqueda(valor);

    const datos = await buscarPacientes(valor);
    setPacientes(datos);
  }

  /*
   * Elimina el paciente seleccionado.
   * Antes de eliminar, solicita confirmación para evitar acciones accidentales.
   */
  async function manejarEliminar() {
    if (!pacienteSeleccionado) return;

    const confirmar = confirm("¿Desea eliminar este paciente?");

    if (!confirmar) return;

    await eliminarPaciente(pacienteSeleccionado.id);

    setPacienteSeleccionado(null);
    cargarPacientes();
  }

  /*
   * Cierra la sesión simulada.
   * Elimina la información del navegador y vuelve al login.
   */
  function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    onLogout();
  }

  return (
    <main className="dashboard">
      <aside className="sidebar">
        <h2>IMT</h2>
        <p>Portal Clínico</p>

        <div className="doctor-box">
          Dr. {usuario.nombres} {usuario.apellidos}
        </div>

        <h3>Pacientes</h3>

        <input
          value={terminoBusqueda}
          onChange={manejarBusqueda}
          placeholder="Buscar por nombre o cédula"
        />

        <div className="patient-list">
          {pacientes.length === 0 && (
            <p className="empty-text">No hay pacientes registrados.</p>
          )}

          {pacientes.map((paciente) => (
            <button
              key={paciente.id}
              onClick={() => {
                setPacienteSeleccionado(paciente);
                setMostrarFormulario(false);
              }}
            >
              {paciente.primerNombre} {paciente.primerApellido}
            </button>
          ))}
        </div>

        <button onClick={() => setMostrarFormulario(true)}>
          Nuevo Registro
        </button>

        <button className="logout-button" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </aside>

      <section className="workspace">
        {mostrarFormulario ? (
          /*
           * Vista de registro de nuevo paciente.
           */
          <PacienteForm
            onCancelar={() => setMostrarFormulario(false)}
            onPacienteCreado={() => {
              setMostrarFormulario(false);
              cargarPacientes();
            }}
          />
        ) : pacienteSeleccionado ? (
          /*
           * Vista de detalle del paciente seleccionado.
           */
          <section className="panel">
            <h1>
              {pacienteSeleccionado.primerNombre}{" "}
              {pacienteSeleccionado.segundoNombre}{" "}
              {pacienteSeleccionado.primerApellido}{" "}
              {pacienteSeleccionado.segundoApellido}
            </h1>

            <div className="tabs">
              <button>Registro</button>
              <button>Historia</button>
              <button>Medicina</button>
              <button>Control</button>
            </div>

            <div className="patient-detail">
              <p>
                <strong>Documento:</strong>{" "}
                {pacienteSeleccionado.tipoDocumento}{" "}
                {pacienteSeleccionado.numeroDocumento}
              </p>

              <p>
                <strong>Género:</strong> {pacienteSeleccionado.genero}
              </p>

              <p>
                <strong>Fecha nacimiento:</strong>{" "}
                {pacienteSeleccionado.fechaNacimiento}
              </p>

              <p>
                <strong>Ciudad:</strong> {pacienteSeleccionado.ciudad}
              </p>

              <p>
                <strong>Departamento:</strong>{" "}
                {pacienteSeleccionado.departamento}
              </p>

              <p>
                <strong>EPS:</strong> {pacienteSeleccionado.eps}
              </p>

              <p>
                <strong>Teléfono:</strong> {pacienteSeleccionado.telefono}
              </p>

              <p>
                <strong>Email:</strong> {pacienteSeleccionado.email}
              </p>
            </div>

            <div className="form-actions">
              <button onClick={manejarEliminar}>Eliminar</button>
              <button disabled>Editar</button>
              <button disabled>Guardar</button>
            </div>
          </section>
        ) : (
          /*
           * Vista inicial cuando no hay paciente seleccionado.
           */
          <section className="empty-workspace">
            <h1>Área de trabajo</h1>
            <p>
              Selecciona un paciente para iniciar la gestión clínica. Desde aquí
              podrás acceder a su registro, historia, medicamentos y controles.
            </p>
          </section>
        )}
      </section>
    </main>
  );
}

export default MenuPage;