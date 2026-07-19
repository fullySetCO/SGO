export const ROLES_CON_PERMISO_TOTAL = ["jefe", "administrador"];

export function puedeCambiarEstadoReporte(
  usuario: { id: string; rol: string },
  reporte: { asignadoAId: string | null },
) {
  return (
    ROLES_CON_PERMISO_TOTAL.includes(usuario.rol) ||
    usuario.id === reporte.asignadoAId
  );
}

export function puedeComentarReporte(
  usuario: { id: string; rol: string },
  reporte: { reportadoPorId: string; asignadoAId: string | null },
) {
  return (
    ROLES_CON_PERMISO_TOTAL.includes(usuario.rol) ||
    usuario.id === reporte.reportadoPorId ||
    usuario.id === reporte.asignadoAId
  );
}
