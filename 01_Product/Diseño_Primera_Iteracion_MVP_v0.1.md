# DISEÑO: PRIMERA ITERACIÓN DEL MVP

**Versión:** 0.1
**Estado:** Diseño aprobado, listo para desarrollo
**Fase del roadmap:** Fase 5 — Desarrollo del MVP

---

## Objetivo de esta iteración

Construir el flujo mínimo funcional que resuelve el problema central identificado en `Proceso_Mantenimiento_v0.2.md`: hoy un reporte se pierde en WhatsApp sin registro ni trazabilidad. Esta iteración prueba que un Usuario puede autenticarse, crear un Reporte, y verlo listado con su estado.

## Alcance

### 1. Autenticación
- Login con usuario/contraseña, usando **Supabase Auth**.
- Conectado a la tabla `Usuario` ya existente en la base de datos.
- Sin registro público abierto en esta iteración — los usuarios se cargan manualmente (por el Product Owner o vía Supabase) hasta que se decida un flujo de alta.

### 2. Crear Reporte
Formulario con:
- Zona (selector, de las Zonas ya cargadas)
- Descripción del problema
- Prioridad (selector: crítica, alta, media, baja)
- `reportado_por` se completa automáticamente con el Usuario autenticado — no es un campo del formulario.
- `especialidad`, `estado` (inicial: "recibido") y `fecha_creacion` se completan automáticamente al guardar.

### 3. Listar Reportes
- Vista simple con: descripción, zona, prioridad, estado, fecha, reportado por.
- Sin filtros ni ordenamiento avanzado en esta primera iteración.

## Fuera de alcance (para iteraciones futuras)

- Comentarios y Evidencia en el Reporte.
- Cambio de estado del Reporte (asignar, marcar en proceso, resolver).
- Rutinas, Materiales, Solicitudes de compra.
- Registro público de usuarios / recuperación de contraseña.
- Roles y permisos diferenciados (por ahora, cualquier Usuario autenticado puede crear y ver todos los Reportes).

## Justificación del alcance reducido

Se prioriza validar el flujo central (reportar → ver registrado) antes de sumar complejidad. Cada punto de "fuera de alcance" se aborda en iteraciones posteriores, una vez validado que esto funciona.
