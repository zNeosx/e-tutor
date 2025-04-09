-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "description" TEXT,
ADD COLUMN     "requirements" TEXT[],
ADD COLUMN     "targetAudience" TEXT[],
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "trailer" TEXT,
ADD COLUMN     "whatYouWillLearn" TEXT[];
