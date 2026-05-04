/*
 * Formulario de registro de paciente.
 *
 * Responsabilidad:
 * - Capturar datos administrativos y demográficos del paciente.
 * - Enviar el registro al backend Node/Express.
 * - Mantener una estructura visual cercana al formulario del proyecto Java.
 */

import { useState } from "react";
import { crearPaciente } from "../services/pacienteApi";

function PacienteForm({ onPacienteCreado, onCancelar }) {
  /*
   * Estado principal del formulario.
   * Cada propiedad representa un campo del paciente.
   */
  const [formulario, setFormulario] = useState({
    tipoDocumento: "CC",
    numeroDocumento: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    genero: "",
    fechaNacimiento: "",
    ciudad: "",
    departamento: "",
    estadoCivil: "",
    ocupacion: "",
    eps: "",
    telefono: "",
    email: ""
  });

  /*
   * Estado de error usado para mostrar validaciones devueltas por el backend.
   */
  const [error, setError] = useState("");

  /*
   * Actualiza dinámicamente cualquier campo del formulario.
   * El atributo "name" del input debe coincidir con la propiedad del estado.
   */
  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario({
      ...formulario,
      [name]: value
    });
  }

  /*
   * Envía los datos del paciente al backend.
   * Si la operación es correcta, notifica al componente padre para cerrar
   * el formulario y recargar la lista lateral.
   */
  async function manejarSubmit(evento) {
    evento.preventDefault();
    setError("");

    try {
      await crearPaciente(formulario);
      onPacienteCreado();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="patient-workspace-card">
      <header className="patient-form-header">
        <h1 className="patient-form-title">Registro</h1>
      </header>

      {error && <div className="patient-form-alert">{error}</div>}

      <form onSubmit={manejarSubmit}>
        <div className="patient-form-grid">
          <div className="patient-form-group">
            <label>Tipo de documento</label>

            <select
              name="tipoDocumento"
              value={formulario.tipoDocumento}
              onChange={manejarCambio}
            >
              <option value="CC">Cédula de ciudadanía</option>
              <option value="TI">Tarjeta de identidad</option>
              <option value="CE">Cédula de extranjería</option>
              <option value="PA">Pasaporte</option>
            </select>
          </div>

          <div className="patient-form-group">
            <label>Número de documento</label>

            <input
              name="numeroDocumento"
              value={formulario.numeroDocumento}
              onChange={manejarCambio}
              placeholder="Ingrese el número de documento"
            />
          </div>

          <div className="patient-form-group">
            <label>Primer nombre</label>

            <input
              name="primerNombre"
              value={formulario.primerNombre}
              onChange={manejarCambio}
              placeholder="Primer nombre"
            />
          </div>

          <div className="patient-form-group">
            <label>Segundo nombre</label>

            <input
              name="segundoNombre"
              value={formulario.segundoNombre}
              onChange={manejarCambio}
              placeholder="Segundo nombre"
            />
          </div>

          <div className="patient-form-group">
            <label>Primer apellido</label>

            <input
              name="primerApellido"
              value={formulario.primerApellido}
              onChange={manejarCambio}
              placeholder="Primer apellido"
            />
          </div>

          <div className="patient-form-group">
            <label>Segundo apellido</label>

            <input
              name="segundoApellido"
              value={formulario.segundoApellido}
              onChange={manejarCambio}
              placeholder="Segundo apellido"
            />
          </div>

          <div className="patient-form-group">
            <label>Género</label>

            <select
              name="genero"
              value={formulario.genero}
              onChange={manejarCambio}
            >
              <option value="">Seleccione una opción</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="patient-form-group">
            <label>Fecha de nacimiento</label>

            <input
              name="fechaNacimiento"
              type="date"
              value={formulario.fechaNacimiento}
              onChange={manejarCambio}
            />
          </div>

          <div className="patient-form-group">
            <label>Ciudad</label>

            <input
              name="ciudad"
              value={formulario.ciudad}
              onChange={manejarCambio}
              placeholder="Ciudad"
            />
          </div>

          <div className="patient-form-group">
            <label>Departamento</label>

            <input
              name="departamento"
              value={formulario.departamento}
              onChange={manejarCambio}
              placeholder="Departamento"
            />
          </div>

          <div className="patient-form-group">
            <label>Estado civil</label>

            <input
              name="estadoCivil"
              value={formulario.estadoCivil}
              onChange={manejarCambio}
              placeholder="Estado civil"
            />
          </div>

          <div className="patient-form-group">
            <label>Ocupación</label>

            <input
              name="ocupacion"
              value={formulario.ocupacion}
              onChange={manejarCambio}
              placeholder="Ocupación"
            />
          </div>

          <div className="patient-form-group">
            <label>EPS / Aseguradora</label>

            <input
              name="eps"
              value={formulario.eps}
              onChange={manejarCambio}
              placeholder="EPS o aseguradora"
            />
          </div>

          <div className="patient-form-group">
            <label>Teléfono</label>

            <input
              name="telefono"
              value={formulario.telefono}
              onChange={manejarCambio}
              placeholder="Teléfono"
            />
          </div>

          <div className="patient-form-group patient-form-group-full">
            <label>Correo electrónico</label>

            <input
              name="email"
              type="email"
              value={formulario.email}
              onChange={manejarCambio}
              placeholder="correo@ejemplo.com"
            />
          </div>
        </div>

        <div className="patient-form-actions">
          <button
            type="button"
            className="patient-action-btn patient-action-secondary"
            onClick={onCancelar}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="patient-action-btn patient-action-primary"
          >
            Guardar
          </button>
        </div>
      </form>
    </section>
  );
}

export default PacienteForm;