import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TEST_AUTH_EMAIL = "prueba@prueba.com";

async function main() {
  const authUsers = await prisma.$queryRaw<
    { id: string }[]
  >`SELECT id FROM auth.users WHERE email = ${TEST_AUTH_EMAIL}`;
  const authUser = authUsers[0];

  if (!authUser) {
    throw new Error(
      `No se encontró en Supabase Auth el usuario '${TEST_AUTH_EMAIL}'. Créalo en el dashboard (Authentication → Users) antes de correr el seed.`,
    );
  }

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

  let estadoRecibido = await prisma.estado.findFirst({
    where: { nombre: "recibido" },
  });
  if (!estadoRecibido) {
    estadoRecibido = await prisma.estado.create({
      data: { nombre: "recibido" },
    });
  }

  const nombresPrioridad = ["crítica", "alta", "media", "baja"];
  for (const nombre of nombresPrioridad) {
    const existente = await prisma.prioridad.findFirst({ where: { nombre } });
    if (!existente) {
      await prisma.prioridad.create({ data: { nombre } });
    }
  }

  let usuario = await prisma.usuario.findFirst({
    where: { authUserId: authUser.id },
  });
  if (!usuario) {
    usuario = await prisma.usuario.create({
      data: {
        nombre: "Usuario de Prueba",
        rol: "tecnico",
        authUserId: authUser.id,
        especialidadDelTrabajadorId: especialidad.id,
      },
    });
  }

  console.log("Seed completo:", {
    especialidad: especialidad.nombre,
    zona: zona.nombre,
    estado: estadoRecibido.nombre,
    usuario: usuario.nombre,
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
