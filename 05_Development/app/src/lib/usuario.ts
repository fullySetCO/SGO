import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function getUsuarioActual() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return prisma.usuario.findFirst({ where: { authUserId: user.id } });
}
