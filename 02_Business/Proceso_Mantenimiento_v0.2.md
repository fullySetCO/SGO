# PROCESO OPERATIVO: MANTENIMIENTO Y SERVICIOS GENERALES

**Versión:** 0.2
**Estado:** Levantamiento inicial — proceso actual (as-is), sin diseño de solución todavía

---

## 1. Contexto organizacional

Departamentos/áreas identificadas en el colegio:

- **Dirección/Gobierno:** Rectoría, Secretario general
- **Académico:** Coordinación primaria, preescolar, bachillerato · Docentes (primaria y bachillerato) · Asesores escolares
- **Administrativo/Soporte:** Administrativos, Contaduría, Compras, Talento humano, Secretaría
- **Operativo/Servicios:** Mantenimiento (electricista, plomero, obra civil, refrigeración), Servicios generales, Logística, Enfermería, TIC
- **Institucional:** Comunicaciones, Admisiones, Capellanía, Calidad
- **Externos:** Contratistas puntuales + servicios tercerizados recurrentes (cafetería, aseo de baños, equipos alquilados como fuentes de agua e impresoras)

## 2. Canales de reporte actuales

| Canal | Uso | Formalidad |
|---|---|---|
| WhatsApp grupal | Espacios comunes, salones, salones especializados (no oficinas). Mezclado con temas no relacionados a mantenimiento (académicos, etc.) | Informal — busca velocidad, no es el canal oficial |
| Mensaje privado/directo | A la persona encargada directamente; usado también por oficinas | Informal |
| Teléfono | Solo entre líderes/jefes | Informal |
| Correo electrónico | Necesidades de peso o problemas repetitivos; aplica a todas las áreas | **Formal** |

Miembros del grupo de WhatsApp: profesores, coordinadores, jefe de mantenimiento, rectora, trabajadores de mantenimiento, servicios generales.

## 3. Flujo actual (as-is)

```
1. REPORTE
   → Espacio común/salón: WhatsApp grupal
   → Oficina / caso urgente / repetitivo: mensaje directo, teléfono (jefes) o correo (formal)

2. RECEPCIÓN
   → El encargado ve el mensaje directamente, o
   → El jefe lo ve primero y, si el encargado no está pendiente del grupo,
     lo contacta por otro medio (privado o teléfono)
   → A veces el jefe reenvía el reporte a un grupo más específico (ej. mantenimiento) — no sistemático

3. ASIGNACIÓN
   → Implícita, por zona/especialidad ya asignada
     (electricista, plomero, obra civil, refrigeración, servicios generales)
   → Sin priorización formal: cada trabajador prioriza lo suyo según su propio criterio,
     sin un criterio único de urgencia

4. MATERIALES
   → Si falta un material/repuesto: trabajador avisa al jefe de mantenimiento
   → El jefe solicita por correo al departamento de compras, que gestiona la compra
   → No existe stock definido; se trabaja con sobrantes de trabajos anteriores

5. RESOLUCIÓN
   → La persona encargada va, resuelve, y normalmente no reporta nada
   → Excepción ocasional: se escribe "ya quedó" en WhatsApp

6. VISIBILIDAD / CIERRE
   → Rectora: se entera por correos puntuales o reportes de coordinación (reactivo)
   → Coordinaciones: solo de lo que "tiene peso" y se reporta con seriedad
   → Ninguna instancia tiene datos históricos consolidados (frecuencia, volumen, patrones)
```

## 4. Mantenimiento preventivo

No existe un plan de mantenimiento preventivo formal. Hay un intento reciente de planificación, pero sin seguimiento real. La operación es prácticamente 100% reactiva.

## 5. Servicios Generales — variaciones respecto a Mantenimiento

Servicios Generales comparte los mismos canales de reporte, el mismo grupo de WhatsApp y el mismo esquema general de zonas asignadas que Mantenimiento, con estas diferencias puntuales:

- **Rutinas fijas:** a diferencia de Mantenimiento (100% reactivo), Servicios Generales tiene rutinas de aseo asignadas por zona que se cumplen de forma regular, independientemente de que surjan reportes.
- **Trabajo adicional:** además de su rutina, atienden solicitudes reactivas (igual que Mantenimiento) y brindan apoyo en actividades puntuales del colegio (eventos, actividades especiales).
- **Materiales:** manejan insumos de aseo y de cafetería — una categoría de materiales distinta a la de Mantenimiento (repuestos, piezas eléctricas, etc.), aunque el mecanismo de solicitud a compras cuando falta algo es el mismo.

**Implicación para el diseño:** el módulo deberá distinguir entre **trabajo programado** (rutinas por zona) y **trabajo reactivo** (reportes/solicitudes), algo que no era evidente al levantar solo Mantenimiento, donde todo el trabajo es reactivo.

## 6. Problemas identificados (gaps)

1. **Sin canal único:** el reporte se dispersa entre 4 canales distintos según el caso, sin regla explícita y consistente de cuál usar.
2. **Sin priorización centralizada:** cada trabajador decide qué atender primero sin visibilidad del conjunto.
3. **Sin trazabilidad de cierre:** no hay forma sistemática de saber qué se resolvió, cuándo y quién lo hizo.
4. **Sin stock/inventario:** no hay visibilidad de materiales disponibles; se depende de sobrantes y de solicitudes reactivas a compras.
5. **Sin datos históricos:** ninguna instancia (rectora, coordinación) puede hoy sacar frecuencia o patrones de fallas para planificar preventivo.
6. **Sin mantenimiento preventivo real:** todo el esfuerzo actual es reactivo.

## 7. Notas para el diseño del módulo (a futuro, no ahora)

Estos gaps son la base directa de los requisitos que el módulo de Mantenimiento del SGO deberá resolver: canal único de reporte, asignación con prioridad visible, registro de cierre, control básico de inventario, historial para habilitar planificación preventiva, y soporte tanto para trabajo programado (rutinas) como reactivo (reportes).

## 8. Pendiente de levantar

- Otros procesos operativos fuera de mantenimiento y servicios generales, si se decide levantarlos antes de diseñar el módulo.
