import { CitaMedica } from "@/modelo/CitaMedica";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/citamedica";

export const listarCitas = async (): Promise<CitaMedica[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener las citas");
  return res.json();
};

export const obtenerCita = async (id: number): Promise<CitaMedica> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener la cita");
  return res.json();
};

export const crearCita = async (cita: CitaMedica): Promise<CitaMedica> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cita),
  });
  if (!res.ok) throw new Error("Error al crear la cita");
  return res.json();
};

export const actualizarCita = async (id: number, cita: CitaMedica): Promise<CitaMedica> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cita),
  });
  if (!res.ok) throw new Error("Error al actualizar la cita");
  return res.json();
};

export const eliminarCita = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar la cita");
};
