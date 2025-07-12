"use client";
import { useCitaMedica } from "@/hooks/useCitaMedica";
import CitaMedicaForm from "./CitaMedicaForm";

export default function CitaMedicaLista() {
  const { citas, loading, error, recargar } = useCitaMedica();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Listado de Citas Médicas</h2>
      <CitaMedicaForm onSuccess={recargar} />
      <ul>
        {citas.map((cita) => (
          <li key={cita.id}>
            {cita.fecha} - {cita.motivo} - {cita.paciente.nombre} - {cita.medico.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}
