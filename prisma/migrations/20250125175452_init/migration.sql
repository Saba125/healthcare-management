/*
  Warnings:

  - Added the required column `codeExpirationDate` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verificationCode` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "codeExpirationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verificationCode" TEXT NOT NULL;
