# DISEÑO: COMENTARIOS Y EVIDENCIA DEL REPORTE

**Versión:** 0.1
**Estado:** Diseño aprobado, listo para desarrollo
**Fase del roadmap:** Fase 5 — Desarrollo del MVP (cuarta iteración)

---

## Objetivo

Dar seguimiento estructurado a un Reporte (algo que hoy se pierde en WhatsApp), y permitir respaldo visual del problema y de la solución — resolviendo de forma más completa el gap #3 (trazabilidad de cierre).

## Comentarios

Entidad ya definida en `Entidades_Modulo_Mantenimiento_v0.1.md`: `id`, `reporte_asociado`, `autor`, `texto`, `fecha`.

**Quién puede comentar:** solo quien reportó el Reporte, el Usuario `asignado_a`, o Usuarios con `rol` = jefe o administrador. El resto puede ver los comentarios pero no agregar.

**Interfaz:** lista cronológica de comentarios dentro de la vista de detalle del Reporte, con un campo simple para agregar uno nuevo (autor y fecha se completan automático). Placeholder del campo: "Escribí una actualización sobre este reporte...".

## Evidencia

Entidad ya definida: `id`, `reporte_asociado`, `archivo`, `tipo` (evidencia_problema / evidencia_solucion), `fecha`, `subido_por`.

**Almacenamiento:** Supabase Storage (bucket dedicado para evidencias de reportes).

**Quién puede subir:**
- `evidencia_problema`: solo quien reportó el Reporte.
- `evidencia_solucion`: solo el Usuario `asignado_a`, o Usuarios con `rol` = jefe o administrador.

**Interfaz:** dentro de la vista de detalle del Reporte, sección de fotos separada en dos partes (problema / solución), con opción de subir una nueva imagen según el permiso del Usuario actual.

## Fuera de alcance (para iteraciones futuras)

- Edición o borrado de comentarios ya publicados.
- Múltiples archivos por evidencia en una sola subida (por ahora, una foto a la vez).
- Compresión/optimización automática de imágenes.
- Notificación al agregar un comentario o evidencia (se evalúa si conviene sumarlo al esquema de notificaciones ya existente en una iteración posterior).
