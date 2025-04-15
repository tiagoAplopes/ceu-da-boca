-- CreateTable
CREATE TABLE "UserSpecialty" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "specialtyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSpecialty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSpecialty_userId_specialtyId_key" ON "UserSpecialty"("userId", "specialtyId");

-- AddForeignKey
ALTER TABLE "UserSpecialty" ADD CONSTRAINT "UserSpecialty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
