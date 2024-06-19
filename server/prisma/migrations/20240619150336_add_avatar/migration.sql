/*
  Warnings:

  - Made the column `avatar` on table `Doctor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avatar` on table `Patient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Doctor" ALTER COLUMN "avatar" SET NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "avatar" SET NOT NULL;
