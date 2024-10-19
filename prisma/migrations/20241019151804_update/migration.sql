/*
  Warnings:

  - You are about to drop the column `phone_number` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "phone_number",
ADD COLUMN     "phone" INTEGER,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;
