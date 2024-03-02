-- CreateTable
CREATE TABLE "User" (
    "sno" SERIAL NOT NULL,
    "customer_name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "phone" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("sno")
);
