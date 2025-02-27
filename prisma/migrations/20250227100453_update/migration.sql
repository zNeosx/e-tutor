-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_languageId_fkey";

-- DropIndex
DROP INDEX "courses_user_id_key";

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "advance_information_completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "basic_information_completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "curriculum_completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "CourseStatus" NOT NULL DEFAULT 'DRAFT',
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "subtitle" DROP NOT NULL,
ALTER COLUMN "categoryId" DROP NOT NULL,
ALTER COLUMN "topic" DROP NOT NULL,
ALTER COLUMN "languageId" DROP NOT NULL,
ALTER COLUMN "level" DROP NOT NULL,
ALTER COLUMN "duration" DROP NOT NULL,
ALTER COLUMN "durationUnit" DROP NOT NULL,
ALTER COLUMN "thumbnail" DROP NOT NULL,
ALTER COLUMN "trailer" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "welcomeMessage" DROP NOT NULL,
ALTER COLUMN "congratulationsMessage" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
