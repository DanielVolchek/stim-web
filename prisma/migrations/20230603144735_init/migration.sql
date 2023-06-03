/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_userID_fkey";

-- DropForeignKey
ALTER TABLE "RentEvent" DROP CONSTRAINT "RentEvent_rentedByID_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userID_fkey";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "userID" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "RentEvent" ALTER COLUMN "rentedByID" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "userID" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentEvent" ADD CONSTRAINT "RentEvent_rentedByID_fkey" FOREIGN KEY ("rentedByID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
