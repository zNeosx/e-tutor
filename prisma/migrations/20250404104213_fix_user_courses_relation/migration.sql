/*
  Warnings:

  - You are about to drop the `user_courses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_courses" DROP CONSTRAINT "user_courses_courseId_fkey";

-- DropForeignKey
ALTER TABLE "user_courses" DROP CONSTRAINT "user_courses_userId_fkey";

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "user_courses";

-- DropEnum
DROP TYPE "EnrollmentStatus";

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
