"use client";

import { useState } from "react";
import Link from "next/link";
import { marcarNotificacionLeida } from "@/app/notificaciones/actions";
import { formatFecha } from "@/lib/format";

type Notificacion = {
  id: string;
  mensaje: string;
  leida: boolean;
  fechaCreacion: Date;
  reporteAsociadoId: string;
};

export function NotificacionesBell({
  notificaciones: notificacionesIniciales,
}: {
  notificaciones: Notificacion[];
}) {
  const [notificaciones, setNotificaciones] = useState(notificacionesIniciales);
  const [abierto, setAbierto] = useState(false);

  const noLeidas = notificaciones.filter((n) => !n.leida).length;

  function handleClickNotificacion(id: string) {
    setNotificaciones((actuales) =>
      actuales.map((n) => (n.id === id ? { ...n, leida: true } : n)),
    );
    setAbierto(false);
    marcarNotificacionLeida(id);
  }

  return (
    <div className="fixed right-4 top-4 z-50">
      <button
        type="button"
        onClick={() => setAbierto((valor) => !valor)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-black/[.08] bg-white text-lg dark:border-white/[.145] dark:bg-black"
        aria-label="Notificaciones"
      >
        🔔
        {noLeidas > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-medium text-white">
            {noLeidas}
          </span>
        )}
      </button>

      {abierto && (
        <div className="absolute right-0 mt-2 w-80 rounded-lg border border-black/[.08] bg-white shadow-lg dark:border-white/[.145] dark:bg-black">
          {notificaciones.length === 0 ? (
            <p className="p-4 text-sm text-zinc-500 dark:text-zinc-400">
              No tienes notificaciones.
            </p>
          ) : (
            <ul className="max-h-96 divide-y divide-black/[.08] overflow-y-auto dark:divide-white/[.145]">
              {notificaciones.map((notificacion) => (
                <li key={notificacion.id}>
                  <Link
                    href={`/reportes/${notificacion.reporteAsociadoId}`}
                    prefetch={false}
                    onClick={() => handleClickNotificacion(notificacion.id)}
                    className="flex flex-col gap-1 px-4 py-3 text-sm hover:bg-black/[.04] dark:hover:bg-white/[.06]"
                  >
                    <span
                      className={
                        notificacion.leida
                          ? "text-zinc-500 dark:text-zinc-400"
                          : "font-medium text-black dark:text-zinc-50"
                      }
                    >
                      {!notificacion.leida && (
                        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-600 align-middle" />
                      )}
                      {notificacion.mensaje}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {formatFecha(notificacion.fechaCreacion)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
