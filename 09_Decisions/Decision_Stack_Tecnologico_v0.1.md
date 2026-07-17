# DECISIÓN DE ARQUITECTURA: STACK TECNOLÓGICO DEL MVP

**Versión:** 0.1
**Estado:** Decidido — listo para iniciar Fase 3 (Arquitectura técnica) del roadmap

---

## Contexto

Con el modelado del negocio (procesos + entidades + modelo entidad-relación) completado para el módulo de Mantenimiento, se definió el stack tecnológico para el MVP. El Product Owner tiene poca experiencia técnica, por lo que se priorizó simplicidad, mantenibilidad y una curva de aprendizaje suave sobre flexibilidad máxima.

## Stack decidido

| Pieza | Tecnología | Motivo |
|---|---|---|
| Frontend + Backend | **Next.js** | Un solo framework para ambas capas, mismo lenguaje (JavaScript/TypeScript), menos piezas que coordinar. Ampliamente soportado por Claude Code. |
| Base de datos | **PostgreSQL** (vía Supabase) | Robusta, gratuita, la más usada en el mundo para este tipo de proyectos. |
| ORM / capa de acceso a datos | **Prisma** | Evita escribir SQL a mano; capa de traducción entre el código y la base de datos. |
| Hosting de la aplicación | **Vercel** | Plan gratuito suficiente para el MVP de un solo colegio; integración directa con Next.js. |
| Proveedor de base de datos | **Supabase** | PostgreSQL gestionado + panel visual para ver datos sin escribir código, útil dado el nivel de experiencia técnica del Product Owner. |

## Decisiones descartadas (y por qué)

- **Frontend y backend separados** (dos proyectos distintos): descartado por mayor complejidad de mantenimiento con poca experiencia técnica del Product Owner.
- **Netlify** como hosting: considerado, técnicamente equivalente a Vercel para este caso, pero se optó por Vercel al ser la empresa creadora de Next.js.
- **Railway** como proveedor de base de datos: considerado, pero el plan gratuito es más limitado en tiempo de uso que el de Supabase.

## Notas

- Ni Vercel ni Netlify alojan bases de datos — son plataformas de aplicación únicamente. La base de datos siempre requiere un proveedor separado (en este caso, Supabase).
- Esta decisión aplica al MVP (single-tenant, ver Manual Maestro sección 10). No se descarta revisar el stack si el proyecto escala a multiempresa en el futuro, pero no se sobre-diseña para ese escenario ahora.

## Próximo paso

Con el stack definido, corresponde iniciar la configuración técnica del proyecto (estructura de carpetas de código, conexión a Supabase, primer esquema de Prisma basado en `Modelo_Entidad_Relacion_v0.1.md`) dentro de `05_Development/` y `06_Database/`.
