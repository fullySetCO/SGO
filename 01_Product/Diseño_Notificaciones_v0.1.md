# DISEÑO: NOTIFICACIONES DENTRO DE LA APP

**Versión:** 0.1
**Estado:** Diseño aprobado, listo para desarrollo
**Fase del roadmap:** Fase 5 — Desarrollo del MVP (tercera iteración)

---

## Objetivo

Hacer llegar el Reporte al asignado o al jefe (parte del flujo de asignación descrito por el Product Owner), sin depender de un canal externo (correo/WhatsApp) todavía, para reforzar el uso de la app.

## Nueva entidad: Notificación

- `id`
- `usuario_destino` (a quién le llega)
- `mensaje` (texto corto, ej: "Se te asignó el reporte: Fuga de agua en Salón 301")
- `reporte_asociado`
- `leida` (sí/no)
- `fecha_creacion`

## Disparadores (cuándo se crea una notificación)

1. **Al crear un Reporte nuevo**: se crea una notificación para cada Usuario con `rol` = jefe o administrador.
2. **Al asignar un Reporte** (cuando se completa `asignado_a`): se crea una notificación para ese Usuario (el trabajador asignado).
3. **Al marcar un Reporte como "resuelto"**: se crea una notificación para cada Usuario con `rol` = jefe o administrador.

## Interfaz

- Un ícono de campana (o similar) visible en toda la app, con un contador de notificaciones no leídas.
- Al hacer click, se despliega una lista simple: mensaje, fecha, y link al Reporte asociado.
- Al abrir/ver una notificación, se marca como `leida`.

## Fuera de alcance (para iteraciones futuras)

- Notificaciones por correo electrónico o push (fuera del navegador).
- Notificaciones en tiempo real (esta versión puede actualizarse al recargar o cada cierto tiempo, no necesita ser instantánea).
- Preferencias de notificación por usuario (silenciar, elegir canal, etc.).
