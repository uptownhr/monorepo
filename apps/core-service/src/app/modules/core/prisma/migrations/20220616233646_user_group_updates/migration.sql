/*
  Warnings:

  - Added the required column `name` to the `core_user_group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "core_user_group" ADD COLUMN     "name" VARCHAR NOT NULL,
ADD COLUMN     "ownerId" CHAR(32) DEFAULT NULL;
