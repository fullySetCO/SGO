# MANUAL MAESTRO DEL PROYECTO SGO

**Versión:** 0.2
**Estado:** Fundación del proyecto — configuración base completada, primer proceso operativo en levantamiento

---

## 1. Descripción general

SGO (Sistema de Gestión Operativa) es una plataforma web modular, configurable, segura y escalable, cuyo objetivo es centralizar la operación de una organización en un único ecosistema.

La idea original era un gestor de tareas + mantenimiento + solicitudes. El concepto evolucionó: el proyecto no debe limitarse a gestionar tareas, sino integrar múltiples procesos operativos que hoy viven dispersos en WhatsApp, correo, papel, llamadas y Excel.

## 2. Problema que resuelve

La información operativa está dispersa entre canales informales (WhatsApp, llamadas, papel) y un canal formal poco usado (correo). Esto genera pérdida de información, baja trazabilidad, duplicidad, seguimiento deficiente y nula capacidad de planificación basada en datos.

## 3. Visión

Crear un ecosistema único donde toda la operación de una organización pueda administrarse desde un mismo sistema, adaptable a cualquier sector. El desarrollo arranca con un colegio, pero la arquitectura debe permitir atender cualquier organización.

**Nota sobre alcance:** la visión a largo plazo incluye un modelo SaaS multiempresa. Esto **no** es una decisión de arquitectura para el MVP (ver sección 10 — Scope del MVP).

## 4. Misión

Digitalizar, organizar y automatizar los procesos operativos diarios, pasando de una operación reactiva y sin datos a una operación planificada y medible.

## 5. Filosofía y principios

**Filosofía:** el sistema se adapta a la organización, no la organización al sistema. Todo proceso operativo debe poder registrarse, medirse, controlarse y automatizarse. La documentación tiene el mismo nivel de importancia que el desarrollo. Ningún módulo se desarrolla sin diseño previo.

**Principios:** Modular · Configurable · Robusto · Seguro · Escalable · Flexible · Automatizable · Auditable · Intuitivo.

## 6. Caso de estudio

Colegio, aprovechando el conocimiento del Product Owner en mantenimiento. Primer proceso levantado: gestión de mantenimiento (ver documento separado `Proceso_Mantenimiento_v0.1.md`).

## 7. Roles

Tras la salida de ChatGPT del proyecto, los roles quedan redistribuidos así:

- **Product Owner** (Usuario): visión del negocio, validación de procesos, priorización, conocimiento operativo.
- **Analista-Arquitecto** (Claude Chat): análisis funcional, arquitectura conceptual, documentación, coherencia del proyecto. Absorbe lo que antes cubría el rol de "Arquitecto del Producto".
- **Desarrollador** (Claude Code): implementación, generación de código, apoyo técnico.

## 8. Metodología

Idea → Análisis → Diseño → Validación → Documentación → Desarrollo → Pruebas → Liberación.

Reglas:
- No desarrollar sin diseñar.
- Toda decisión importante se documenta.
- Cada sesión termina con un entregable (documento, decisión, configuración o funcionalidad).
- No configurar herramientas que aún no se necesiten.
- Usar funciones nativas de GitHub siempre que aporten valor.

## 9. Estructura del proyecto

```
SGO/
00_Project_Foundation/
01_Product/
02_Business/
03_Architecture/
04_UX_UI/
05_Development/
06_Database/
07_Testing/
08_Deployment/
09_Decisions/
```

## 10. Scope del MVP

**Decisión clave:** el MVP se construye **single-tenant** (un solo colegio). El multiempresa queda como visión futura, no como requisito de diseño actual — evita sobre-ingeniería antes de tener un solo módulo funcionando.

Primer módulo a diseñar: **Mantenimiento**, basado en el proceso real levantado con el Product Owner.

## 11. GitHub y estándares — estado verificado

| Área | Estado |
|---|---|
| Branch protection (`main`) | ✅ Restrict deletions, block force pushes, PR requerido |
| Labels `type:` | ✅ epic, feature, task, improvement, research |
| Labels `priority:` | ✅ critical, high, medium, low |
| Labels estándar | ✅ bug, documentation, question (sin tocar) |
| Labels `module:` | Pendiente — se crean cuando exista un módulo diseñado |
| Project → Priority | ✅ Critical/High/Medium/Low |
| Project → Module | ✅ Recortado a solo `Maintenance` |
| Project → Status | ✅ Default de GitHub (Backlog/Ready/In progress/In review/Done) |
| Project → Sprint/Version/Estimated Hours | Vacíos, sin sobre-configurar |
| Manage access | ✅ Privado, solo Product Owner como Admin |
| Wiki / Milestones | No configurado (correcto, sin necesidad real aún) |

## 12. Decisiones

- **DEC-001:** SGO será modular, configurable, seguro y escalable. Multiempresa es visión futura, no requisito del MVP.
- **DEC-002:** Primer caso de estudio: colegio. Primer proceso: mantenimiento.
- **DEC-003:** GitHub es la fuente central del proyecto (código, documentación, gestión).
- **DEC-004:** Configuración nativa y mínima de GitHub; no configurar pensando en el futuro.
- **DEC-005:** Tipos de trabajo: epic, feature, task, improvement, research, bug.
- **DEC-006:** MVP single-tenant; arquitectura preparada para escalar a multiempresa después, sin construirlo ya.
- **DEC-007:** Labels y campos de `module:` se crean únicamente cuando el módulo correspondiente ya fue diseñado.

## 13. Roadmap

Fase 0: Configuración del ecosistema (GitHub) — **completada**.
Fase 1: Levantamiento de procesos reales — **en curso** (mantenimiento).
Fase 2: Modelado del negocio (entidades, módulos).
Fase 3: Arquitectura técnica y stack.
Fase 4: Base de datos.
Fase 5: Desarrollo del MVP (módulo Mantenimiento).
Fase 6: Pruebas.
Fase 7: Despliegue.

## 14. Próximos pasos

- Completar el levantamiento del proceso de mantenimiento (ver documento separado).
- Levantar procesos de otras áreas si aportan valor al diseño del módulo inicial.
- Definir entidades y modelo de datos del módulo de Mantenimiento.
- Definir arquitectura técnica y stack, basados en el proceso real (no antes).
