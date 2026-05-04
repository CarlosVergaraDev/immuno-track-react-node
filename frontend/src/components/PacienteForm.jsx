/*
 * Formulario reutilizable para crear y editar pacientes.
 *
 * Responsabilidad:
 * - Capturar datos administrativos y demográficos del paciente.
 * - Registrar nuevos pacientes mediante POST.
 * - Actualizar pacientes existentes mediante PUT.
 * - Reutilizar la misma interfaz para mantener consistencia visual y evitar duplicación.
 */

import { useEffect, useState } from "react";
import { crearPaciente, actualizarPaciente } from "../services/pacienteApi";

/*
 * Construye un objeto vacío con la estructura base del formulario.
 *
 * Esta función evita repetir la misma estructura en diferentes puntos del componente.
 */
function crearFormularioVacio() {
  return {
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
  };
}

/*
 * Convierte un paciente existente en estado inicial del formulario.
 *
 * Si no existe paciente inicial, retorna el formulario vacío.
 * Esto permite que el componente funcione tanto para crear como para editar.
 */
function construirFormularioInicial(pacienteInicial) {
  if (!pacienteInicial) {
    return crearFormularioVacio();
  }

  return {
    tipoDocumento: pacienteInicial.tipoDocumento || "CC",
    numeroDocumento: pacienteInicial.numeroDocumento || "",
    primerNombre: pacienteInicial.primerNombre || "",
    segundoNombre: pacienteInicial.segundoNombre || "",
    primerApellido: pacienteInicial.primerApellido || "",
    segundoApellido: pacienteInicial.segundoApellido || "",
    genero: pacienteInicial.genero || "",
    fechaNacimiento: pacienteInicial.fechaNacimiento || "",
    ciudad: pacienteInicial.ciudad || "",
    departamento: pacienteInicial.departamento || "",
    estadoCivil: pacienteInicial.estadoCivil || "",
    ocupacion: pacienteInicial.ocupacion || "",
    eps: pacienteInicial.eps || "",
    telefono: pacienteInicial.telefono || "",
    email: pacienteInicial.email || ""
  };
}

function PacienteForm({ pacienteInicial, onPacienteGuardado, onCancelar }) {
  /*
   * Determina si el formulario está creando un nuevo registro o editando uno existente.
   */
  const esEdicion = Boolean(pacienteInicial?.id);

  /*
   * Estado principal del formulario.
   */
  const [formulario, setFormulario] = useState(() =>
    construirFormularioInicial(pacienteInicial)
  );

  /*
   * Estado de error usado para mostrar validaciones devueltas por el backend.
   */
  const [error, setError] = useState("");

  /*
   * Sincroniza el formulario cuando cambia el paciente que se va a editar.
   *
   * Esto es importante porque el mismo componente puede abrirse primero para crear
   * y luego para editar otro paciente durante la misma sesión.
   */
  useEffect(() => {
    setFormulario(construirFormularioInicial(pacienteInicial));
    setError("");
  }, [pacienteInicial]);

  /*
   * Actualiza dinámicamente cualquier campo del formulario.
   *
   * El atributo "name" de cada input debe coincidir con una propiedad del estado.
   */
  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario({
      ...formulario,
      [name]: value
    });
  }

  /*
   * Envía los datos al backend.
   *
   * Flujo:
   * - Si hay pacienteInicial con id, ejecuta actualización.
   * - Si no hay pacienteInicial, ejecuta creación.
   * - Luego notifica al componente padre para recargar la lista.
   */
  async function manejarSubmit(evento) {
    evento.preventDefault();
    setError("");

    try {
      const respuesta = esEdicion
        ? await actualizarPaciente(pacienteInicial.id, formulario)
        : await crearPaciente(formulario);

      onPacienteGuardado(respuesta.data);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="patient-workspace-card">
      <header className="patient-form-header">
        <h1 className="patient-form-title">
          {esEdicion ? "Editar paciente" : "Registro"}
        </h1>
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
            {esEdicion ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default PacienteForm;