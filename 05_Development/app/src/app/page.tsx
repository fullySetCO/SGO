import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { capitalizar, formatFecha } from "@/lib/format";
import { logout } from "./actions";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const reportes = await prisma.reporte.findMany({
    include: {
      zona: true,
      prioridad: true,
      estado: true,
      reportadoPor: true,
    },
    orderBy: { fechaCreacion: "desc" },
  });

  return (
    <div className="flex flex-1 flex-col gap-6 bg-zinc-50 px-4 py-10 dark:bg-black sm:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
              Reportes
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {user?.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/reportes/nuevo"
              className="flex h-11 items-center justify-center rounded-full bg-foreground px-5 font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
            >
              Nuevo Reporte
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="flex h-11 items-center justify-center rounded-full border border-black/[.08] px-5 font-medium transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </header>

        {reportes.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">
            Todavía no hay reportes registrados.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-black/[.08] dark:border-white/[.145]">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Descripción</th>
                  <th className="px-4 py-3 font-medium">Zona</th>
                  <th className="px-4 py-3 font-medium">Prioridad</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium">Fecha</th>
                  <th className="px-4 py-3 font-medium">Reportado por</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[.08] bg-white dark:divide-white/[.145] dark:bg-black">
                {reportes.map((reporte) => (
                  <tr key={reporte.id}>
                    <td className="px-4 py-3 text-black dark:text-zinc-50">
                      {reporte.tituloDescripcion}
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      {reporte.zona.nombre}
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      {capitalizar(reporte.prioridad.nombre)}
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      {capitalizar(reporte.estado.nombre)}
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      {formatFecha(reporte.fechaCreacion)}
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      {reporte.reportadoPor.nombre}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
