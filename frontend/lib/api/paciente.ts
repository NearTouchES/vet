import { Paciente } from "@/modelo/Paciente";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/paciente";

export const listarPacientes = async (): Promise<Paciente[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al listar pacientes");
  return res.json();
};

export const obtenerPaciente = async (id: number): Promise<Paciente> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener paciente");
  return res.json();
};

export const crearPaciente = async (paciente: Paciente): Promise<Paciente> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paciente),
  });
  if (!res.ok) throw new Error("Error al crear paciente");
  return res.json();
};

export const actualizarPaciente = async (id: number, paciente: Paciente): Promise<Paciente> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paciente),
  });
  if (!res.ok) throw new Error("Error al actualizar paciente");
  return res.json();
};

export const eliminarPaciente = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar paciente");
};
