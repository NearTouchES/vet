import { Tutor } from "@/modelo/Tutor";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/tutor";

export const listarTutores = async (): Promise<Tutor[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al listar tutores");
  return res.json();
};

export const obtenerTutor = async (id: number): Promise<Tutor> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener tutor");
  return res.json();
};

export const crearTutor = async (tutor: Tutor): Promise<Tutor> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tutor),
  });
  if (!res.ok) throw new Error("Error al crear tutor");
  return res.json();
};

export const actualizarTutor = async (id: number, tutor: Tutor): Promise<Tutor> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tutor),
  });
  if (!res.ok) throw new Error("Error al actualizar tutor");
  return res.json();
};

export const eliminarTutor = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar tutor");
};
