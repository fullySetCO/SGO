import { prisma } from "@/lib/prisma";
import { NuevoReporteForm } from "./nuevo-reporte-form";

const ORDEN_PRIORIDAD = ["crítica", "alta", "media", "baja"];

export default async function NuevoReportePage() {
  const [zonas, prioridades] = await Promise.all([
    prisma.zona.findMany({ orderBy: { nombre: "asc" } }),
    prisma.prioridad.findMany(),
  ]);

  const prioridadesOrdenadas = [...prioridades].sort(
    (a, b) => ORDEN_PRIORIDAD.indexOf(a.nombre) - ORDEN_PRIORIDAD.indexOf(b.nombre),
  );

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <NuevoReporteForm zonas={zonas} prioridades={prioridadesOrdenadas} />
    </div>
  );
}
