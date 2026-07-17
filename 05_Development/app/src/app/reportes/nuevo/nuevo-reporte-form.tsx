"use client";

import { useActionState } from "react";
import { crearReporte, type CrearReporteState } from "../actions";
import { capitalizar } from "@/lib/format";

type Zona = { id: string; nombre: string };
type Prioridad = { id: string; nombre: string };

const initialState: CrearReporteState = undefined;

export function NuevoReporteForm({
  zonas,
  prioridades,
}: {
  zonas: Zona[];
  prioridades: Prioridad[];
}) {
  const [state, formAction, pending] = useActionState(
    crearReporte,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="flex w-full max-w-md flex-col gap-4 rounded-lg border border-black/[.08] bg-white p-8 dark:border-white/[.145] dark:bg-black"
    >
      <h1 className="text-xl font-semibold text-black dark:text-zinc-50">
        Nuevo Reporte
      </h1>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="zonaId"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Zona
        </label>
        <select
          id="zonaId"
          name="zonaId"
          required
          defaultValue=""
          className="rounded-md border border-black/[.08] bg-transparent px-3 py-2 text-black outline-none focus:border-zinc-950 dark:border-white/[.145] dark:text-zinc-50 dark:focus:border-zinc-50"
        >
          <option value="" disabled>
            Selecciona una zona
          </option>
          {zonas.map((zona) => (
            <option key={zona.id} value={zona.id}>
              {zona.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="tituloDescripcion"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Descripción del problema
        </label>
        <textarea
          id="tituloDescripcion"
          name="tituloDescripcion"
          required
          rows={4}
          className="rounded-md border border-black/[.08] bg-transparent px-3 py-2 text-black outline-none focus:border-zinc-950 dark:border-white/[.145] dark:text-zinc-50 dark:focus:border-zinc-50"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="prioridadId"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Prioridad
        </label>
        <select
          id="prioridadId"
          name="prioridadId"
          required
          defaultValue=""
          className="rounded-md border border-black/[.08] bg-transparent px-3 py-2 text-black outline-none focus:border-zinc-950 dark:border-white/[.145] dark:text-zinc-50 dark:focus:border-zinc-50"
        >
          <option value="" disabled>
            Selecciona una prioridad
          </option>
          {prioridades.map((prioridad) => (
            <option key={prioridad.id} value={prioridad.id}>
              {capitalizar(prioridad.nombre)}
            </option>
          ))}
        </select>
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 flex h-11 items-center justify-center rounded-full bg-foreground px-5 font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-60 dark:hover:bg-[#ccc]"
      >
        {pending ? "Guardando..." : "Crear Reporte"}
      </button>
    </form>
  );
}
