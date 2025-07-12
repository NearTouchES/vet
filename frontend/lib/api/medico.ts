import { Medico } from "@/modelo/Medico";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/medico";

export const listarMedicos = async (): Promise<Medico[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al listar médicos");
  return res.json();
};

export const obtenerMedico = async (id: number): Promise<Medico> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener médico");
  return res.json();
};

export const crearMedico = async (medico: Medico): Promise<Medico> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(medico),
  });
  if (!res.ok) throw new Error("Error al crear médico");
  return res.json();
};

export const actualizarMedico = async (id: number, medico: Medico): Promise<Medico> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(medico),
  });
  if (!res.ok) throw new Error("Error al actualizar médico");
  return res.json();
};

export const eliminarMedico = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar médico");
};
