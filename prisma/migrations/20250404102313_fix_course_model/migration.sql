/*
  Warnings:

  - Made the column `title` on table `courses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subtitle` on table `courses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `courses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `topic` on table `courses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `languageId` on table `courses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `level` on table `courses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `courses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `durationUnit` on table `courses` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_languageId_fkey";

-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "subtitle" SET NOT NULL,
ALTER COLUMN "categoryId" SET NOT NULL,
ALTER COLUMN "topic" SET NOT NULL,
ALTER COLUMN "languageId" SET NOT NULL,
ALTER COLUMN "level" SET NOT NULL,
ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "durationUnit" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
