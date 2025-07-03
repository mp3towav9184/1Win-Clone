/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `CoAdmins` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CoAdmins" ADD COLUMN     "uid" BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "CoAdmins_uid_key" ON "CoAdmins"("uid");
