/*
  Warnings:

  - Made the column `createdAt` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "codeExpirationDate" DROP NOT NULL;
