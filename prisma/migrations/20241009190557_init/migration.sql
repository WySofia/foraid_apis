-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasenia_hash" TEXT NOT NULL,
    "cargo" TEXT,
    "rango" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "TipoCaso" (
    "id_tipo_caso" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "TipoCaso_pkey" PRIMARY KEY ("id_tipo_caso")
);

-- CreateTable
CREATE TABLE "MetodoCreacion" (
    "id_metodo_creacion" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "MetodoCreacion_pkey" PRIMARY KEY ("id_metodo_creacion")
);

-- CreateTable
CREATE TABLE "Casos" (
    "id_caso" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "id_tipo_caso" INTEGER NOT NULL,
    "calle_principal" TEXT,
    "calle_secundaria" TEXT,
    "provincia" TEXT,
    "canton" TEXT,

    CONSTRAINT "Casos_pkey" PRIMARY KEY ("id_caso")
);

-- CreateTable
CREATE TABLE "Identikits" (
    "id_identikit" SERIAL NOT NULL,
    "id_caso" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL,
    "id_metodo_creacion" INTEGER NOT NULL,
    "imagen" TEXT,

    CONSTRAINT "Identikits_pkey" PRIMARY KEY ("id_identikit")
);

-- CreateTable
CREATE TABLE "Caracteristicas" (
    "id_caracteristica" SERIAL NOT NULL,
    "id_identikit" INTEGER NOT NULL,
    "nombre_caracteristica" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Caracteristicas_pkey" PRIMARY KEY ("id_caracteristica")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "TipoCaso_nombre_key" ON "TipoCaso"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "MetodoCreacion_nombre_key" ON "MetodoCreacion"("nombre");

-- AddForeignKey
ALTER TABLE "Casos" ADD CONSTRAINT "Casos_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Casos" ADD CONSTRAINT "Casos_id_tipo_caso_fkey" FOREIGN KEY ("id_tipo_caso") REFERENCES "TipoCaso"("id_tipo_caso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Identikits" ADD CONSTRAINT "Identikits_id_caso_fkey" FOREIGN KEY ("id_caso") REFERENCES "Casos"("id_caso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Identikits" ADD CONSTRAINT "Identikits_id_metodo_creacion_fkey" FOREIGN KEY ("id_metodo_creacion") REFERENCES "MetodoCreacion"("id_metodo_creacion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Caracteristicas" ADD CONSTRAINT "Caracteristicas_id_identikit_fkey" FOREIGN KEY ("id_identikit") REFERENCES "Identikits"("id_identikit") ON DELETE RESTRICT ON UPDATE CASCADE;
