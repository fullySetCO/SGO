"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getUsuarioActual } from "@/lib/usuario";

export async function marcarNotificacionLeida(notificacionId: string) {
  const usuario = await getUsuarioActual();
  if (!usuario) return;

  const notificacion = await prisma.notificacion.findUnique({
    where: { id: notificacionId },
  });

  if (!notificacion || notificacion.usuarioDestinoId !== usuario.id) {
    return;
  }

  if (notificacion.leida) return;

  await prisma.notificacion.update({
    where: { id: notificacionId },
    data: { leida: true },
  });

  revalidatePath("/", "layout");
}
