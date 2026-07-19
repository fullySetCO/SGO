"use client";

import { useActionState } from "react";
import { agregarComentario, type AgregarComentarioState } from "../actions";

const initialState: AgregarComentarioState = undefined;

export function ComentarioForm({ reporteId }: { reporteId: string }) {
  const [state, formAction, pending] = useActionState(
    agregarComentario,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="reporteId" value={reporteId} />
      <textarea
        name="texto"
        required
        rows={2}
        placeholder="Escribí una actualización sobre este reporte..."
        className="rounded-md border border-black/[.08] bg-transparent px-3 py-2 text-sm text-black outline-none focus:border-zinc-950 dark:border-white/[.145] dark:text-zinc-50 dark:focus:border-zinc-50"
      />

      {state?.error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-60 dark:hover:bg-[#ccc]"
      >
        {pending ? "Enviando..." : "Comentar"}
      </button>
    </form>
  );
}
