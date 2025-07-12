"use client";
import { useState } from "react";
import { Tutor } from "@/modelo/Tutor";
import { crearTutor } from "@/lib/api/tutor";

type Props = {
  onSuccess: () => void;
};

export default function TutorForm({ onSuccess }: Props) {
  const [form, setForm] = useState<Tutor>({
    nombre: "",
    dni: "",
    direccion: "",
    telefono: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearTutor(form);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} />
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
      <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} />
      <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
      <button type="submit">Guardar Tutor</button>
    </form>
  );
}
