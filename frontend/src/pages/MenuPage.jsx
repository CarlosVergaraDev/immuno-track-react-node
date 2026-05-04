/*
 * Página principal del sistema ImmunoTrack.
 *
 * Responsabilidad:
 * - Renderizar el menú clínico posterior al login.
 * - Mostrar una estructura visual similar al proyecto Java original.
 * - Consultar pacientes desde el backend Node/Express.
 * - Permitir búsqueda, selección, registro y eliminación de pacientes.
 *
 * Nota académica:
 * - Historia, medicina, control y edición quedan como navegación visual.
 * - No se implementan todavía como módulos funcionales.
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
   * Estado con los pacientes consultados desde el backend.
   */
  const [pacientes, setPacientes] = useState([]);

  /*
   * Estado del paciente que el usuario selecciona desde el panel lateral.
   */
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  /*
   * Controla si el área de trabajo muestra el formulario de nuevo registro.
   */
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  /*
   * Almacena el texto escrito en el buscador lateral.
   */
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  /*
   * URL pública del logo institucional utilizado en el proyecto original.
   */
  const logoUrl =
    "https://i.ibb.co/6ckj3Z9S/700022db-4e5a-4b82-b949-ce860df45d62.png";

  /*
   * URL pública de imagen temporal del doctor usada en el proyecto Java original.
   */
  const doctorFotoUrl =
    "https://i.ibb.co/sp3ddZHQ/Gemini-Generated-Image-u0k4pfu0k4pfu0k4.png";

  /*
   * Consulta todos los pacientes desde el backend.
   * Se reutiliza después de crear o eliminar pacientes.
   */
  async function cargarPacientes() {
    const datos = await listarPacientes();
    setPacientes(datos);
  }

  /*
   * Carga inicial de pacientes al entrar al menú.
   */
  useEffect(() => {
    cargarPacientes();
  }, []);

  /*
   * Busca pacientes en tiempo real usando el backend.
   * La búsqueda se realiza por nombre, apellido o documento.
   */
  async function manejarBusqueda(evento) {
    const valor = evento.target.value;
    setTerminoBusqueda(valor);

    const datos = await buscarPacientes(valor);
    setPacientes(datos);
  }

  /*
   * Selecciona un paciente desde el panel lateral y oculta el formulario.
   */
  function manejarSeleccionPaciente(paciente) {
    setPacienteSeleccionado(paciente);
    setMostrarFormulario(false);
  }

  /*
   * Abre el formulario de nuevo registro.
   */
  function manejarNuevoRegistro() {
    setPacienteSeleccionado(null);
    setMostrarFormulario(true);
  }

  /*
   * Elimina el paciente seleccionado después de confirmación.
   */
  async function manejarEliminar() {
    if (!pacienteSeleccionado) return;

    const confirmar = confirm("¿Desea eliminar este paciente?");

    if (!confirmar) return;

    await eliminarPaciente(pacienteSeleccionado.id);

    setPacienteSeleccionado(null);
    await cargarPacientes();
  }

  /*
   * Cierra la sesión simulada eliminando la información del navegador.
   */
  function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    onLogout();
  }

  /*
   * Construye el nombre completo del doctor autenticado.
   */
  const nombreDoctor = `${usuario.nombres} ${usuario.apellidos}`;

  return (
    <main className="imt-shell">
      <header className="imt-topbar">
        <div className="imt-brand imt-brand-lockup">
          <div className="imt-header-logo-box">
            <img
              src={logoUrl}
              alt="Logo ImmunoTrack"
              className="imt-header-logo"
            />
          </div>

          <span className="imt-brand-separator" />

          <div className="imt-brand-text">
            <h1 className="imt-brand-title">IMT</h1>
            <p className="imt-brand-subtitle">Portal Clínico</p>
          </div>
        </div>

        <div className="imt-top-actions">
          <div className="doctor-chip">
            <img src={doctorFotoUrl} alt="Doctor" />
            <span>Dr. {nombreDoctor}</span>
          </div>

          <button className="top-icon-btn" type="button" title="Modo visual">
            ◐
          </button>

          <button className="top-icon-btn" type="button" title="Configuración">
            ⚙
          </button>

          <button
            className="top-icon-btn logout-btn"
            type="button"
            title="Cerrar sesión"
            onClick={cerrarSesion}
          >
            ↪
          </button>
        </div>
      </header>

      <section className="imt-main">
        <aside className="imt-sidebar">
          <div className="sidebar-content">
            <h2 className="sidebar-title">Pacientes</h2>

            <div className="patient-search">
              <input
                value={terminoBusqueda}
                onChange={manejarBusqueda}
                placeholder="Cédula, nombre o apellido"
              />

              <button type="button" aria-label="Buscar paciente">
                ⌕
              </button>
            </div>

            {pacientes.length === 0 ? (
              <div className="patient-empty">
                No hay pacientes registrados
                <br />
                en la lista
              </div>
            ) : (
              <div className="patient-list">
                {pacientes.map((paciente) => (
                  <button
                    key={paciente.id}
                    type="button"
                    className={
                      pacienteSeleccionado?.id === paciente.id
                        ? "patient-item active"
                        : "patient-item"
                    }
                    onClick={() => manejarSeleccionPaciente(paciente)}
                  >
                    <span className="patient-dot" />

                    <span>
                      {paciente.primerNombre} {paciente.primerApellido}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="sidebar-footer">
            <button
              type="button"
              className="new-record-btn"
              onClick={manejarNuevoRegistro}
            >
              ＋ Nuevo Registro
            </button>
          </div>
        </aside>

        <section className="workspace">
          {mostrarFormulario ? (
            <PacienteForm
              onCancelar={() => setMostrarFormulario(false)}
              onPacienteCreado={async () => {
                setMostrarFormulario(false);
                await cargarPacientes();
              }}
            />
          ) : pacienteSeleccionado ? (
            <section className="patient-workspace-card">
              <header className="patient-form-header">
                <div className="patient-header-profile">
                  <span className="patient-avatar patient-avatar-lg">
                    {pacienteSeleccionado.primerNombre.charAt(0)}
                    {pacienteSeleccionado.primerApellido.charAt(0)}
                  </span>

                  <div>
                    <h1 className="patient-form-title">
                      {pacienteSeleccionado.primerNombre}{" "}
                      {pacienteSeleccionado.segundoNombre}{" "}
                      {pacienteSeleccionado.primerApellido}{" "}
                      {pacienteSeleccionado.segundoApellido}
                    </h1>

                    <p className="patient-subtitle">
                      {pacienteSeleccionado.tipoDocumento}{" "}
                      {pacienteSeleccionado.numeroDocumento}
                    </p>
                  </div>
                </div>
              </header>

              <nav className="patient-tabs">
                <button className="patient-tab active" type="button">
                  Registro
                </button>

                <button className="patient-tab" type="button">
                  Historia
                </button>

                <button className="patient-tab" type="button">
                  Medicina
                </button>

                <button className="patient-tab" type="button">
                  Control
                </button>
              </nav>

              <div className="patient-form-grid">
                <div className="patient-form-group">
                  <label>Género</label>
                  <input value={pacienteSeleccionado.genero} disabled />
                </div>

                <div className="patient-form-group">
                  <label>Fecha de nacimiento</label>
                  <input value={pacienteSeleccionado.fechaNacimiento} disabled />
                </div>

                <div className="patient-form-group">
                  <label>Ciudad</label>
                  <input value={pacienteSeleccionado.ciudad} disabled />
                </div>

                <div className="patient-form-group">
                  <label>Departamento</label>
                  <input value={pacienteSeleccionado.departamento} disabled />
                </div>

                <div className="patient-form-group">
                  <label>EPS</label>
                  <input value={pacienteSeleccionado.eps} disabled />
                </div>

                <div className="patient-form-group">
                  <label>Teléfono</label>
                  <input value={pacienteSeleccionado.telefono} disabled />
                </div>

                <div className="patient-form-group">
                  <label>Correo electrónico</label>
                  <input value={pacienteSeleccionado.email} disabled />
                </div>

                <div className="patient-form-group">
                  <label>Ocupación</label>
                  <input value={pacienteSeleccionado.ocupacion || "No registrada"} disabled />
                </div>
              </div>

              <div className="patient-form-actions">
                <button
                  type="button"
                  className="patient-action-btn patient-action-danger"
                  onClick={manejarEliminar}
                >
                  Eliminar
                </button>

                <button
                  type="button"
                  className="patient-action-btn patient-action-disabled"
                  disabled
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="patient-action-btn patient-action-disabled"
                  disabled
                >
                  Guardar
                </button>
              </div>
            </section>
          ) : (
            <section className="workspace-card">
              <div className="workspace-empty">
                <p className="workspace-kicker">Área de trabajo</p>

                <h1 className="workspace-title">
                  Selecciona un paciente para iniciar la gestión clínica.
                </h1>

                <p className="workspace-text">
                  Desde aquí podrás acceder a su registro, historia,
                  medicamentos y controles. También puedes crear un nuevo
                  registro si aún no existen pacientes en la lista.
                </p>
              </div>
            </section>
          )}
        </section>
      </section>
    </main>
  );
}

export default MenuPage;