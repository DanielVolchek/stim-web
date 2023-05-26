/*
  Warnings:

  - You are about to drop the column `rentedByID` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `rentedOn` on the `Item` table. All the data in the column will be lost.
  - Added the required column `purchaseLink` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_rentedByID_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "rentedByID",
DROP COLUMN "rentedOn",
ADD COLUMN     "purchaseLink" TEXT NOT NULL,
ADD COLUMN     "userID" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "passwordHash" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RentEvent" (
    "id" SERIAL NOT NULL,
    "itemID" INTEGER NOT NULL,
    "rentedByID" INTEGER NOT NULL,
    "rentedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RentEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RentEvent_itemID_key" ON "RentEvent"("itemID");

-- CreateIndex
CREATE UNIQUE INDEX "RentEvent_rentedByID_key" ON "RentEvent"("rentedByID");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentEvent" ADD CONSTRAINT "RentEvent_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "Item"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentEvent" ADD CONSTRAINT "RentEvent_rentedByID_fkey" FOREIGN KEY ("rentedByID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
