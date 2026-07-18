"use client";

import { useActionState, useState } from "react";
import { cambiarEstado, type CambiarEstadoState } from "../actions";
import { capitalizar } from "@/lib/format";

type Estado = { id: string; nombre: string };
type Usuario = { id: string; nombre: string };

const initialState: CambiarEstadoState = undefined;

export function CambiarEstadoForm({
  reporteId,
  estados,
  usuarios,
}: {
  reporteId: string;
  estados: Estado[];
  usuarios: Usuario[];
}) {
  const [state, formAction, pending] = useActionState(
    cambiarEstado,
    initialState,
  );
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");

  const requiereAsignado =
    estados.find((estado) => estado.id === estadoSeleccionado)?.nombre ===
    "asignado";

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 rounded-lg border border-black/[.08] bg-white p-6 dark:border-white/[.145] dark:bg-black"
    >
      <input type="hidden" name="reporteId" value={reporteId} />

      <h2 className="text-lg font-semibold text-black dark:text-zinc-50">
        Cambiar estado
      </h2>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="estadoId"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Nuevo estado
        </label>
        <select
          id="estadoId"
          name="estadoId"
          required
          value={estadoSeleccionado}
          onChange={(event) => setEstadoSeleccionado(event.target.value)}
          className="rounded-md border border-black/[.08] bg-transparent px-3 py-2 text-black outline-none focus:border-zinc-950 dark:border-white/[.145] dark:text-zinc-50 dark:focus:border-zinc-50"
        >
          <option value="" disabled>
            Selecciona un estado
          </option>
          {estados.map((estado) => (
            <option key={estado.id} value={estado.id}>
              {capitalizar(estado.nombre)}
            </option>
          ))}
        </select>
      </div>

      {requiereAsignado && (
        <div className="flex flex-col gap-1">
          <label
            htmlFor="asignadoAId"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Asignar a
          </label>
          <select
            id="asignadoAId"
            name="asignadoAId"
            required
            defaultValue=""
            className="rounded-md border border-black/[.08] bg-transparent px-3 py-2 text-black outline-none focus:border-zinc-950 dark:border-white/[.145] dark:text-zinc-50 dark:focus:border-zinc-50"
          >
            <option value="" disabled>
              Selecciona un usuario
            </option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombre}
              </option>
            ))}
          </select>
        </div>
      )}

      {state?.error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex h-11 items-center justify-center rounded-full bg-foreground px-5 font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-60 dark:hover:bg-[#ccc]"
      >
        {pending ? "Guardando..." : "Actualizar estado"}
      </button>
    </form>
  );
}
