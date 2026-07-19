"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getUsuarioActual } from "@/lib/usuario";
import { puedeCambiarEstadoReporte } from "@/lib/permisos";
import { notificarJefatura, notificarUsuario } from "@/lib/notificaciones";

export type CrearReporteState = { error: string } | undefined;

export async function crearReporte(
  _prevState: CrearReporteState,
  formData: FormData,
): Promise<CrearReporteState> {
  const usuario = await getUsuarioActual();

  if (!usuario) {
    redirect("/login");
  }

  const zonaId = formData.get("zonaId") as string;
  const prioridadId = formData.get("prioridadId") as string;
  const tituloDescripcion = (formData.get("tituloDescripcion") as string)?.trim();

  if (!zonaId || !prioridadId || !tituloDescripcion) {
    return { error: "Completa todos los campos." };
  }

  const zona = await prisma.zona.findUnique({ where: { id: zonaId } });
  if (!zona) {
    return { error: "La zona seleccionada no es válida." };
  }

  const estadoRecibido = await prisma.estado.findFirst({
    where: { nombre: "recibido" },
  });
  if (!estadoRecibido) {
    return {
      error:
        "No existe el estado inicial 'recibido' en la base de datos. Contacta al administrador.",
    };
  }

  const reporte = await prisma.reporte.create({
    data: {
      tituloDescripcion,
      zonaId: zona.id,
      especialidadId: zona.especialidadResponsableZonaId,
      prioridadId,
      estadoId: estadoRecibido.id,
      reportadoPorId: usuario.id,
    },
  });

  await notificarJefatura(
    `Nuevo reporte: ${reporte.tituloDescripcion}`,
    reporte.id,
  );

  redirect("/");
}

export type CambiarEstadoState = { error: string } | undefined;

export async function cambiarEstado(
  _prevState: CambiarEstadoState,
  formData: FormData,
): Promise<CambiarEstadoState> {
  const usuario = await getUsuarioActual();

  if (!usuario) {
    redirect("/login");
  }

  const reporteId = formData.get("reporteId") as string;
  const nuevoEstadoId = formData.get("estadoId") as string;
  const asignadoAId = formData.get("asignadoAId") as string | null;

  const reporte = await prisma.reporte.findUnique({ where: { id: reporteId } });
  if (!reporte) {
    return { error: "El reporte no existe." };
  }

  if (!puedeCambiarEstadoReporte(usuario, reporte)) {
    return {
      error: "No tienes permiso para cambiar el estado de este reporte.",
    };
  }

  const nuevoEstado = await prisma.estado.findUnique({
    where: { id: nuevoEstadoId },
  });
  if (!nuevoEstado) {
    return { error: "El estado seleccionado no es válido." };
  }

  if (nuevoEstado.nombre === "asignado" && !asignadoAId) {
    return { error: "Selecciona un usuario para asignar el reporte." };
  }

  await prisma.reporte.update({
    where: { id: reporte.id },
    data: {
      estadoId: nuevoEstado.id,
      ...(nuevoEstado.nombre === "asignado" ? { asignadoAId } : {}),
      ...(nuevoEstado.nombre === "resuelto"
        ? { fechaResolucion: new Date() }
        : {}),
    },
  });

  if (nuevoEstado.nombre === "asignado" && asignadoAId) {
    await notificarUsuario(
      asignadoAId,
      `Se te asignó el reporte: ${reporte.tituloDescripcion}`,
      reporte.id,
    );
  }

  if (nuevoEstado.nombre === "resuelto") {
    await notificarJefatura(
      `Reporte resuelto: ${reporte.tituloDescripcion}`,
      reporte.id,
    );
  }

  revalidatePath(`/reportes/${reporte.id}`);
  revalidatePath("/");
}
