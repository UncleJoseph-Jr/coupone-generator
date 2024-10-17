/*
  Warnings:

  - You are about to drop the column `discount` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `remaining` on the `Coupon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "discount",
DROP COLUMN "remaining",
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0;
