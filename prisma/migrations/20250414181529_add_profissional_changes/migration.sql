-- CreateTable
CREATE TABLE "profissional_changes" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "changeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profissional_changes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "profissional_changes" ADD CONSTRAINT "profissional_changes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
