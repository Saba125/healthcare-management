/*
  Warnings:

  - You are about to drop the column `prescrpitions` on the `prescriptions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "prescriptions" DROP COLUMN "prescrpitions",
ADD COLUMN     "prescriptions" TEXT[];
