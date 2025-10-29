/*
  Warnings:

  - You are about to drop the column `ingress` on the `Stream` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Stream_ingress_idx";

-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "ingress",
ADD COLUMN     "ingressId" TEXT;

-- CreateIndex
CREATE INDEX "Stream_ingressId_idx" ON "Stream"("ingressId");
