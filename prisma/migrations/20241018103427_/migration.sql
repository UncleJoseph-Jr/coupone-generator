-- AlterTable
ALTER TABLE "Coupon" ALTER COLUMN "expirationDate" DROP DEFAULT,
ALTER COLUMN "expirationDate" SET DATA TYPE TIMESTAMP(3);
