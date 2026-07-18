import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function vincularUsuario({
  email,
  nombre,
  rol,
  especialidadId,
  requerido,
}: {
  email: string;
  nombre: string;
  rol: string;
  especialidadId: string;
  requerido: boolean;
}) {
  const authUsers = await prisma.$queryRaw<
    { id: string }[]
  >`SELECT id FROM auth.users WHERE email = ${email}`;
  const authUser = authUsers[0];

  if (!authUser) {
    if (requerido) {
      throw new Error(
        `No se encontró en Supabase Auth el usuario '${email}'. Créalo en el dashboard (Authentication → Users) antes de correr el seed.`,
      );
    }
    console.warn(
      `Aviso: no se encontró en Supabase Auth el usuario '${email}'; se omite su vínculo.`,
    );
    return null;
  }

  let usuario = await prisma.usuario.findFirst({
    where: { authUserId: authUser.id },
  });
  if (!usuario) {
    usuario = await prisma.usuario.create({
      data: {
        nombre,
        rol,
        authUserId: authUser.id,
        especialidadDelTrabajadorId: especialidadId,
      },
    });
  }
  return usuario;
}

async function main() {
  let especialidad = await prisma.especialidadArea.findFirst({
    where: { nombre: "Mantenimiento General" },
  });
  if (!especialidad) {
    especialidad = await prisma.especialidadArea.create({
      data: { nombre: "Mantenimiento General" },
    });
  }

  let zona = await prisma.zona.findFirst({
    where: { nombre: "Edificio Principal" },
  });
  if (!zona) {
    zona = await prisma.zona.create({
      data: {
        nombre: "Edificio Principal",
        tipo: "Aula",
        especialidadResponsableZonaId: especialidad.id,
      },
    });
  }

  const nombresEstado = ["recibido", "asignado", "en proceso", "resuelto"];
  for (const nombre of nombresEstado) {
    const existente = await prisma.estado.findFirst({ where: { nombre } });
    if (!existente) {
      await prisma.estado.create({ data: { nombre } });
    }
  }

  const nombresPrioridad = ["crítica", "alta", "media", "baja"];
  for (const nombre of nombresPrioridad) {
    const existente = await prisma.prioridad.findFirst({ where: { nombre } });
    if (!existente) {
      await prisma.prioridad.create({ data: { nombre } });
    }
  }

  const usuarioTecnico = await vincularUsuario({
    email: "prueba@prueba.com",
    nombre: "Usuario de Prueba",
    rol: "tecnico",
    especialidadId: especialidad.id,
    requerido: true,
  });

  const usuarioJefe = await vincularUsuario({
    email: "jefe@jefe.com",
    nombre: "Jefe de Prueba",
    rol: "jefe",
    especialidadId: especialidad.id,
    requerido: false,
  });

  console.log("Seed completo:", {
    especialidad: especialidad.nombre,
    zona: zona.nombre,
    estados: nombresEstado,
    usuarioTecnico: usuarioTecnico?.nombre,
    usuarioJefe: usuarioJefe?.nombre ?? "(no vinculado)",
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
