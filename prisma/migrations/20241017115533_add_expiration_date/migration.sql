/*
  Warnings:

  - Added the required column `expirationDate` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN "expirationDate" TIMESTAMP NOT NULL DEFAULT NOW(),
ALTER COLUMN "points" DROP DEFAULT;
