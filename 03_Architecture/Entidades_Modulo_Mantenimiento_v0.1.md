# DISEÑO DE ENTIDADES: MÓDULO DE MANTENIMIENTO

**Versión:** 0.1
**Estado:** Primera propuesta de entidades, basada en `Proceso_Mantenimiento_v0.2.md`
**Scope del módulo:** Mantenimiento + Servicios Generales + TIC, unificados bajo un mismo proceso de gestión de solicitudes/incidencias, diferenciados por especialidad y por tipo de trabajo (programado o reactivo).

---

## 1. Entidades

### Usuario
Cualquier persona del sistema con un rol.
- `id`
- `nombre`
- `rol` (docente, jefe, trabajador, rectora, coordinador, etc.)
- `especialidad` (si aplica)
- `telefono_contacto`
- `activo` (sí/no)

### Especialidad/Área
Eléctrico, plomería, obra civil, refrigeración, aseo, TIC.
- `id`
- `nombre`
- `encargado(s)_principal(es)`

### Zona
Espacio físico con una especialidad responsable por defecto.
- `id`
- `nombre` (ej: "Salón 301", "Oficina Rectoría")
- `tipo` (salón, oficina, común, especializado)
- `especialidad_responsable_default`

### Reporte/Solicitud
La incidencia reportada, entidad central del módulo.
- `id`
- `titulo_descripcion`
- `zona`
- `especialidad`
- `reportado_por`
- `fecha_creacion`
- `prioridad`
- `estado`
- `asignado_a`
- `fecha_resolucion`
- `es_rutina` (sí/no — si viene de una Rutina programada)

### Prioridad
Catálogo simple.
- `id`
- `nombre` (crítica, alta, media, baja)

### Estado
Catálogo simple.
- `id`
- `nombre` (recibido, asignado, en proceso, resuelto)

### Rutina
Tarea programada y recurrente por zona (aseo diario, revisión periódica).
- `id`
- `nombre_tarea`
- `zona`
- `especialidad`
- `frecuencia` (diaria, semanal, etc.)
- `ultima_ejecucion`
- `proxima_ejecucion`

### Material/Insumo
- `id`
- `nombre`
- `categoria` (repuesto, insumo de aseo, insumo de cafetería)
- `cantidad_disponible` (si algún día hay stock)
- `unidad`

### Solicitud de compra
Cuando falta un material y se pide a compras.
- `id`
- `material`
- `cantidad`
- `solicitado_por`
- `fecha`
- `estado` (pendiente, comprado)
- `reporte_asociado` (opcional)

### Comentario
Historial de seguimiento de un Reporte o Rutina — resuelve el gap de trazabilidad de cierre.
- `id`
- `reporte_asociado`
- `autor`
- `texto`
- `fecha`

### Evidencia
Archivo adjunto (foto u otro) asociado a un Reporte.
- `id`
- `reporte_asociado`
- `archivo`
- `tipo` (evidencia_problema / evidencia_solucion)
- `fecha`
- `subido_por`

## 2. Notas de scope

- El módulo unifica Mantenimiento (100% reactivo), Servicios Generales (rutinas + reactivo) y TIC (reactivo), bajo el mismo esquema de Reporte/Solicitud, diferenciados por `especialidad`.
- `Rutina` es la entidad que distingue trabajo programado de trabajo reactivo — necesaria porque Servicios Generales opera con rutinas fijas, a diferencia de Mantenimiento.
- Pendiente para una siguiente iteración: relaciones formales entre entidades (modelo entidad-relación), definición de claves foráneas, y validación de si `Material/Insumo` necesita distinguir entre insumos de mantenimiento, aseo y cafetería como sub-categorías separadas o alcanza con el campo `categoria`.

## 3. Pendiente

- Modelo entidad-relación (diagrama).
- Definir reglas de negocio (ej: quién puede cambiar el estado de un Reporte, si una Rutina genera un Reporte automáticamente si no se cumple).
- Validar este diseño con el proceso de otros departamentos si se levantan más adelante.
