-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "authUserId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_authUserId_key" ON "Usuario"("authUserId");
