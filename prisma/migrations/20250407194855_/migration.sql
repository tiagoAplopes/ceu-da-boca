-- CreateTable
CREATE TABLE "UserChange" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "changeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserChange_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserChange_userId_changeId_key" ON "UserChange"("userId", "changeId");

-- AddForeignKey
ALTER TABLE "UserChange" ADD CONSTRAINT "UserChange_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
