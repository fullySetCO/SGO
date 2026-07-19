import { prisma } from "@/lib/prisma";
import { ROLES_CON_PERMISO_TOTAL } from "@/lib/permisos";

export async function notificarJefatura(mensaje: string, reporteAsociadoId: string) {
  const jefes = await prisma.usuario.findMany({
    where: { rol: { in: ROLES_CON_PERMISO_TOTAL } },
  });

  if (jefes.length === 0) return;

  await prisma.notificacion.createMany({
    data: jefes.map((jefe) => ({
      mensaje,
      usuarioDestinoId: jefe.id,
      reporteAsociadoId,
    })),
  });
}

export async function notificarUsuario(
  usuarioDestinoId: string,
  mensaje: string,
  reporteAsociadoId: string,
) {
  await prisma.notificacion.create({
    data: { mensaje, usuarioDestinoId, reporteAsociadoId },
  });
}
