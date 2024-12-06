/*
  Warnings:

  - A unique constraint covering the columns `[id_passport]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "id_passport" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_passport_key" ON "Users"("id_passport");
