"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export type CrearReporteState = { error: string } | undefined;

export async function crearReporte(
  _prevState: CrearReporteState,
  formData: FormData,
): Promise<CrearReporteState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const usuario = await prisma.usuario.findFirst({
    where: { authUserId: user.id },
  });

  if (!usuario) {
    return {
      error:
        "Tu cuenta no está vinculada a un Usuario del sistema. Contacta al administrador.",
    };
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

  await prisma.reporte.create({
    data: {
      tituloDescripcion,
      zonaId: zona.id,
      especialidadId: zona.especialidadResponsableZonaId,
      prioridadId,
      estadoId: estadoRecibido.id,
      reportadoPorId: usuario.id,
    },
  });

  redirect("/");
}
