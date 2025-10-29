/*
  Warnings:

  - You are about to drop the column `ischatDelayed` on the `Stream` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "ischatDelayed",
ADD COLUMN     "isChatDelayed" BOOLEAN NOT NULL DEFAULT false;
