# DISEÑO: CAMBIO DE ESTADO DEL REPORTE

**Versión:** 0.1
**Estado:** Diseño aprobado, listo para desarrollo
**Fase del roadmap:** Fase 5 — Desarrollo del MVP (segunda iteración)

---

## Objetivo

Permitir cerrar el ciclo de un Reporte: hoy se puede crear y listar, pero no queda ninguna forma de reflejar que alguien lo tomó, lo está resolviendo, o ya lo resolvió. Esta funcionalidad ataca directamente el gap #3 identificado en `Proceso_Mantenimiento_v0.2.md` (sin trazabilidad de cierre).

## Reglas de permisos

Pueden cambiar el estado de un Reporte:
- Usuarios con `rol` = jefe o administrador (sin restricción de cuál Reporte).
- El Usuario que sea `asignado_a` del Reporte en cuestión (solo ese Reporte).

Cualquier otro Usuario autenticado puede **ver** el Reporte y su estado, pero no modificarlo.

## Comportamiento

- Al cambiar el estado a **"asignado"**, la pantalla debe permitir elegir simultáneamente el Usuario en `asignado_a` (mismo paso, no dos acciones separadas).
- Para los demás estados (en proceso, resuelto), no se pide `asignado_a` de nuevo — ya quedó fijado al asignar.
- Si se marca como **"resuelto"**, se completa `fecha_resolucion` automáticamente.

## Fuera de alcance (para iteraciones futuras)

- Notificaciones al cambiar de estado — **próxima iteración después de esta**: notificación dentro de la misma app cuando a alguien se le asigna un Reporte (antes que correo, para reforzar el uso de la app en vez de canales externos).
- Historial de cambios de estado (quién cambió qué y cuándo, más allá del estado actual).
- Reversar un estado (ej. de "resuelto" volver a "en proceso").
- **Asignación inteligente asistida por IA**: sugerir automáticamente a quién asignar un Reporte analizando el texto de la descripción (útil cuando la Zona no deja clara la especialidad). Se construye sobre el flujo manual ya diseñado — la IA sugiere, la persona (jefe/administrador) sigue aprobando o corrigiendo la asignación. No reemplaza el control humano.
