-- CreateTable
CREATE TABLE "CoAdmins" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "contact" TEXT,
    "user" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoAdmins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CoAdmins_user_key" ON "CoAdmins"("user");
