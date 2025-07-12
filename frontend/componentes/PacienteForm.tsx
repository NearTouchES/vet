"use client";
import { useState } from "react";
import { Paciente } from "@/modelo/Paciente";
import { crearPaciente } from "@/lib/api/paciente";

type Props = {
  onSuccess: () => void;
};

export default function PacienteForm({ onSuccess }: Props) {
  const [form, setForm] = useState<Partial<Paciente>>({
    nombre: "",
    especie: "",
    raza: "",
    edad: 0,
    estado: "",
    tutor: { id: 1 } as any,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearPaciente(form as Paciente);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
      <input name="especie" placeholder="Especie" value={form.especie} onChange={handleChange} />
      <input name="raza" placeholder="Raza" value={form.raza} onChange={handleChange} />
      <input name="edad" type="number" placeholder="Edad" value={form.edad} onChange={handleChange} />
      <input name="estado" placeholder="Estado" value={form.estado} onChange={handleChange} />
      <button type="submit">Guardar Paciente</button>
    </form>
  );
}
