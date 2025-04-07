-- CreateTable
CREATE TABLE "Change" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Change_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserChange" ADD CONSTRAINT "UserChange_changeId_fkey" FOREIGN KEY ("changeId") REFERENCES "Change"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
