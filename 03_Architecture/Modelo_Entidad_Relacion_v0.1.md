# MODELO ENTIDAD-RELACIÓN: MÓDULO DE MANTENIMIENTO

**Versión:** 0.1
**Estado:** Primera propuesta de relaciones, basada en `Entidades_Modulo_Mantenimiento_v0.1.md`

---

## 1. Ajustes de nomenclatura respecto a v0.1

Para evitar confusión entre dos usos distintos de la palabra "especialidad", ambos apuntando al mismo catálogo Especialidad/Área:

| Entidad | Atributo (v0.1) | Atributo (v0.1 corregido) |
|---|---|---|
| Usuario | `especialidad` | `especialidad_del_trabajador` |
| Zona | `especialidad_responsable_default` | `especialidad_responsable_zona` |

## 2. Relaciones entre entidades

- **Usuario** puede tener una **Especialidad/Área** (`especialidad_del_trabajador`) si es trabajador de mantenimiento, servicios generales o TIC. No todo Usuario tiene especialidad (ej: docentes, rectora).
- **Zona** tiene una **Especialidad/Área** responsable por defecto (`especialidad_responsable_zona`) — determina a qué especialidad se asigna un reporte de ese lugar salvo indicación distinta.
- **Reporte/Solicitud**:
  - pertenece a una **Zona**
  - tiene una **Especialidad/Área**
  - tiene una **Prioridad**
  - tiene un **Estado**
  - fue creado por un **Usuario** (`reportado_por`) — puede ser cualquier rol: docente, coordinador, rectora, trabajador de servicios generales, etc. Sin restricción de quién puede reportar.
  - puede estar asignado a otro **Usuario** (`asignado_a`)
- **Rutina**:
  - pertenece a una **Zona**
  - tiene una **Especialidad/Área**
  - si no se cumple o requiere seguimiento, puede generar un **Reporte** (de ahí el campo `es_rutina` en Reporte)
- **Comentario**:
  - pertenece siempre a un **Reporte**
  - tiene un **Usuario** como autor
- **Evidencia**:
  - pertenece siempre a un **Reporte**
  - tiene un **Usuario** que la subió
- **Solicitud de compra**:
  - siempre asociada a un **Material/Insumo**
  - pedida por un **Usuario**
  - puede estar asociada a un **Reporte** (opcional — no toda solicitud de compra viene de un reporte puntual)

## 3. Diagrama simplificado (texto)

```
Usuario ──┬── especialidad_del_trabajador ──> Especialidad/Área
          ├── reporta ──────────────────────> Reporte/Solicitud
          ├── es asignado a ────────────────> Reporte/Solicitud
          ├── autor de ─────────────────────> Comentario
          ├── sube ──────────────────────────> Evidencia
          └── solicita ─────────────────────> Solicitud de compra

Zona ──┬── especialidad_responsable_zona ──> Especialidad/Área
       ├── ubicación de ───────────────────> Reporte/Solicitud
       └── ubicación de ───────────────────> Rutina

Reporte/Solicitud ──┬── tiene ──> Prioridad
                     ├── tiene ──> Estado
                     ├── tiene ──> Comentario(s)
                     ├── tiene ──> Evidencia(s)
                     └── puede originar/estar asociado a ──> Solicitud de compra

Rutina ── puede generar ──> Reporte/Solicitud (es_rutina = sí)

Solicitud de compra ── referencia ──> Material/Insumo
```

## 4. Notas

- El **Reporte/Solicitud** es la entidad central: casi todas las demás se conectan a través de él, directa o indirectamente.
- Este modelo es conceptual, no una implementación de base de datos todavía (sin definición de claves foráneas técnicas, tipos de dato exactos, ni motor de base de datos). Eso corresponde a una fase posterior (Fase 4 del roadmap — Base de datos), una vez definida la arquitectura técnica.

## 5. Pendiente

- Definir reglas de negocio sobre las relaciones (ej: ¿puede un Reporte no tener Zona? ¿Una Rutina puede generar más de un Reporte?).
- Trasladar este modelo conceptual a un modelo entidad-relación técnico cuando se defina el motor de base de datos.
