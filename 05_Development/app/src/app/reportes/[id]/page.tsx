import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUsuarioActual } from "@/lib/usuario";
import { puedeCambiarEstadoReporte } from "@/lib/permisos";
import { capitalizar, formatFecha } from "@/lib/format";
import { CambiarEstadoForm } from "./cambiar-estado-form";

const ORDEN_ESTADO_SELECCIONABLE = ["asignado", "en proceso", "resuelto"];

export default async function ReportePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const reporte = await prisma.reporte.findUnique({
    where: { id },
    include: {
      zona: true,
      prioridad: true,
      estado: true,
      reportadoPor: true,
      asignadoA: true,
    },
  });

  if (!reporte) {
    notFound();
  }

  const usuario = await getUsuarioActual();
  const puedeEditar = usuario
    ? puedeCambiarEstadoReporte(usuario, reporte)
    : false;

  const [estados, usuarios] = puedeEditar
    ? await Promise.all([
        prisma.estado.findMany(),
        prisma.usuario.findMany({ orderBy: { nombre: "asc" } }),
      ])
    : [[], []];

  const estadosSeleccionables = estados
    .filter((estado) => ORDEN_ESTADO_SELECCIONABLE.includes(estado.nombre))
    .sort(
      (a, b) =>
        ORDEN_ESTADO_SELECCIONABLE.indexOf(a.nombre) -
        ORDEN_ESTADO_SELECCIONABLE.indexOf(b.nombre),
    );

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 px-4 py-10 dark:bg-black sm:px-8">
      <div className="flex w-full max-w-2xl flex-col gap-6">
        <Link
          href="/"
          className="text-sm text-zinc-600 hover:underline dark:text-zinc-400"
        >
          ← Volver al listado
        </Link>

        <div className="flex flex-col gap-4 rounded-lg border border-black/[.08] bg-white p-6 dark:border-white/[.145] dark:bg-black">
          <h1 className="text-xl font-semibold text-black dark:text-zinc-50">
            {reporte.tituloDescripcion}
          </h1>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt className="text-zinc-500 dark:text-zinc-400">Zona</dt>
            <dd className="text-black dark:text-zinc-50">
              {reporte.zona.nombre}
            </dd>

            <dt className="text-zinc-500 dark:text-zinc-400">Prioridad</dt>
            <dd className="text-black dark:text-zinc-50">
              {capitalizar(reporte.prioridad.nombre)}
            </dd>

            <dt className="text-zinc-500 dark:text-zinc-400">Estado</dt>
            <dd className="text-black dark:text-zinc-50">
              {capitalizar(reporte.estado.nombre)}
            </dd>

            <dt className="text-zinc-500 dark:text-zinc-400">Fecha</dt>
            <dd className="text-black dark:text-zinc-50">
              {formatFecha(reporte.fechaCreacion)}
            </dd>

            <dt className="text-zinc-500 dark:text-zinc-400">
              Reportado por
            </dt>
            <dd className="text-black dark:text-zinc-50">
              {reporte.reportadoPor.nombre}
            </dd>

            <dt className="text-zinc-500 dark:text-zinc-400">Asignado a</dt>
            <dd className="text-black dark:text-zinc-50">
              {reporte.asignadoA?.nombre ?? "—"}
            </dd>

            {reporte.fechaResolucion && (
              <>
                <dt className="text-zinc-500 dark:text-zinc-400">
                  Fecha resolución
                </dt>
                <dd className="text-black dark:text-zinc-50">
                  {formatFecha(reporte.fechaResolucion)}
                </dd>
              </>
            )}
          </dl>
        </div>

        {puedeEditar ? (
          <CambiarEstadoForm
            reporteId={reporte.id}
            estados={estadosSeleccionables}
            usuarios={usuarios}
          />
        ) : (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No tienes permiso para cambiar el estado de este reporte.
          </p>
        )}
      </div>
    </div>
  );
}
