-- CreateTable
CREATE TABLE "User" (
    "ID" SERIAL NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Item" (
    "ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "rentedByID" INTEGER,
    "rentedOn" TIMESTAMP(3),

    CONSTRAINT "Item_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Image" (
    "ID" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "itemID" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Image_itemID_key" ON "Image"("itemID");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_rentedByID_fkey" FOREIGN KEY ("rentedByID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "Item"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
