"use client";
import { useState } from "react";
import { crearMedico } from "@/lib/api/medico";
import { Medico } from "@/modelo/Medico";

type Props = {
  onSuccess: () => void;
};

export default function MedicoForm({ onSuccess }: Props) {
  const [form, setForm] = useState<Medico>({
    nombre: "",
    dni: "",
    especialidad: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearMedico(form);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} />
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
      <input name="especialidad" placeholder="Especialidad" value={form.especialidad} onChange={handleChange} />
      <button type="submit">Guardar Médico</button>
    </form>
  );
}
