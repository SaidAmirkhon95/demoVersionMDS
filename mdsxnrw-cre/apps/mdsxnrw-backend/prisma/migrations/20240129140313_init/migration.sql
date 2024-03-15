/*
  Warnings:

  - You are about to drop the column `duration` on the `Connector` table. All the data in the column will be lost.
  - You are about to drop the column `companyItExperts` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `companyItExperts` on the `User` table. All the data in the column will be lost.
  - Added the required column `companyItExpertsFrom` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyItExpertsTo` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyItExpertsFrom` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyItExpertsTo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DurationUnit" AS ENUM ('days', 'months');

-- AlterTable
ALTER TABLE "Connector" DROP COLUMN "duration",
ADD COLUMN     "durationFrom" INTEGER,
ADD COLUMN     "durationTo" INTEGER,
ADD COLUMN     "durationUnit" "DurationUnit";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "companyItExperts",
ADD COLUMN     "companyItExpertsFrom" INTEGER NOT NULL,
ADD COLUMN     "companyItExpertsTo" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "companyItExperts",
ADD COLUMN     "companyItExpertsFrom" INTEGER NOT NULL,
ADD COLUMN     "companyItExpertsTo" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "CompanyItExperts";

-- DropEnum
DROP TYPE "Duration";
