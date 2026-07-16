# Convenciones del proyecto SGO — leer antes de trabajar

Este archivo aplica a **cualquier sesión** de Claude Code que trabaje en este repo, sin importar el momento en que se abra.

## Flujo de Git obligatorio

- **Nunca** hacer push directo a `main`, ni abrir un PR que apunte directo a `main` desde una rama de trabajo.
- El flujo correcto es siempre: rama de trabajo → PR a `develop` → (revisión del Product Owner) → PR de `develop` a `main`.
- Si la sesión trabaja en una rama propia (ej. `claude/algo-xyz`), el PR de esa rama debe apuntar a `develop`, nunca a `main`.
- `main` está protegida (restrict deletions, block force pushes, PR requerido). No intentar saltarse esto.

## Estructura de carpetas

```
00_Project_Foundation/   → Manual Maestro, fundación del proyecto
01_Product/
02_Business/             → Procesos operativos levantados (as-is)
03_Architecture/         → Diseño de entidades, modelo de datos, arquitectura técnica
04_UX_UI/
05_Development/
06_Database/
07_Testing/
08_Deployment/
09_Decisions/
```

Cada documento nuevo va en la carpeta que corresponda a su naturaleza (proceso de negocio → 02, diseño técnico → 03, etc.). Si hay duda, preguntar al Product Owner antes de ubicarlo.

## Convenciones de commits

- Mensajes claros y en español, formato: `Área: qué se hizo` (ej: "Arquitectura: primer diseño de entidades del módulo de Mantenimiento").
- No mezclar cambios de distintas áreas en un mismo commit si se puede evitar.

## Reglas del proyecto (heredadas del Manual Maestro)

- No configurar herramientas ni crear elementos (labels, campos, carpetas) que no se necesiten todavía. Ejemplo: no crear labels `module:` para módulos que aún no fueron diseñados.
- No desarrollar ninguna funcionalidad sin diseño previo documentado.
- El MVP es single-tenant (un solo colegio). Multiempresa es visión futura, no requisito actual.
- Toda decisión importante debe quedar documentada (ver `09_Decisions/` y el Manual Maestro).

## Roles del proyecto

- **Product Owner** (usuario humano): visión, validación, decisiones finales.
- **Claude Chat**: análisis funcional, arquitectura conceptual, documentación — genera los documentos que luego se suben al repo.
- **Claude Code**: implementación y manejo de Git/GitHub — ejecuta lo que Claude Chat y el Product Owner ya definieron y documentaron.

Si algo en una tarea pedida contradice estas convenciones, avisar al Product Owner antes de proceder en vez de improvisar una solución distinta.
