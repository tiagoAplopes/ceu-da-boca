/*
  Warnings:

  - You are about to drop the `Change` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserChange" DROP CONSTRAINT "UserChange_changeId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "Change";
