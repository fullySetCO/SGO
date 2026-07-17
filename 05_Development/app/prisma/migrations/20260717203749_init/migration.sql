-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "telefonoContacto" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "especialidadDelTrabajadorId" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EspecialidadArea" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "encargadoPrincipal" TEXT,

    CONSTRAINT "EspecialidadArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zona" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "especialidadResponsableZonaId" TEXT NOT NULL,

    CONSTRAINT "Zona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reporte" (
    "id" TEXT NOT NULL,
    "tituloDescripcion" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaResolucion" TIMESTAMP(3),
    "esRutina" BOOLEAN NOT NULL DEFAULT false,
    "zonaId" TEXT NOT NULL,
    "especialidadId" TEXT NOT NULL,
    "prioridadId" TEXT NOT NULL,
    "estadoId" TEXT NOT NULL,
    "reportadoPorId" TEXT NOT NULL,
    "asignadoAId" TEXT,
    "rutinaOrigenId" TEXT,

    CONSTRAINT "Reporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prioridad" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Prioridad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estado" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rutina" (
    "id" TEXT NOT NULL,
    "nombreTarea" TEXT NOT NULL,
    "frecuencia" TEXT NOT NULL,
    "ultimaEjecucion" TIMESTAMP(3),
    "proximaEjecucion" TIMESTAMP(3),
    "zonaId" TEXT NOT NULL,
    "especialidadId" TEXT NOT NULL,

    CONSTRAINT "Rutina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialInsumo" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "cantidadDisponible" INTEGER,
    "unidad" TEXT,

    CONSTRAINT "MaterialInsumo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolicitudCompra" (
    "id" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL,
    "materialId" TEXT NOT NULL,
    "solicitadoPorId" TEXT NOT NULL,
    "reporteAsociadoId" TEXT,

    CONSTRAINT "SolicitudCompra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reporteAsociadoId" TEXT NOT NULL,
    "autorId" TEXT NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evidencia" (
    "id" TEXT NOT NULL,
    "archivo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reporteAsociadoId" TEXT NOT NULL,
    "subidoPorId" TEXT NOT NULL,

    CONSTRAINT "Evidencia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_especialidadDelTrabajadorId_fkey" FOREIGN KEY ("especialidadDelTrabajadorId") REFERENCES "EspecialidadArea"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zona" ADD CONSTRAINT "Zona_especialidadResponsableZonaId_fkey" FOREIGN KEY ("especialidadResponsableZonaId") REFERENCES "EspecialidadArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_zonaId_fkey" FOREIGN KEY ("zonaId") REFERENCES "Zona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_especialidadId_fkey" FOREIGN KEY ("especialidadId") REFERENCES "EspecialidadArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_prioridadId_fkey" FOREIGN KEY ("prioridadId") REFERENCES "Prioridad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_reportadoPorId_fkey" FOREIGN KEY ("reportadoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_asignadoAId_fkey" FOREIGN KEY ("asignadoAId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_rutinaOrigenId_fkey" FOREIGN KEY ("rutinaOrigenId") REFERENCES "Rutina"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rutina" ADD CONSTRAINT "Rutina_zonaId_fkey" FOREIGN KEY ("zonaId") REFERENCES "Zona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rutina" ADD CONSTRAINT "Rutina_especialidadId_fkey" FOREIGN KEY ("especialidadId") REFERENCES "EspecialidadArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitudCompra" ADD CONSTRAINT "SolicitudCompra_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "MaterialInsumo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitudCompra" ADD CONSTRAINT "SolicitudCompra_solicitadoPorId_fkey" FOREIGN KEY ("solicitadoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitudCompra" ADD CONSTRAINT "SolicitudCompra_reporteAsociadoId_fkey" FOREIGN KEY ("reporteAsociadoId") REFERENCES "Reporte"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_reporteAsociadoId_fkey" FOREIGN KEY ("reporteAsociadoId") REFERENCES "Reporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidencia" ADD CONSTRAINT "Evidencia_reporteAsociadoId_fkey" FOREIGN KEY ("reporteAsociadoId") REFERENCES "Reporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidencia" ADD CONSTRAINT "Evidencia_subidoPorId_fkey" FOREIGN KEY ("subidoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
