/*
  Warnings:

  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cro" TEXT,
ADD COLUMN     "croState" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'patient';

-- Remove the default after adding it
ALTER TABLE "User" ALTER COLUMN "type" DROP DEFAULT;
