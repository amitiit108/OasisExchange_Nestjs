-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "crypto_name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "transaction_type" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
