-- CreateEnum
CREATE TYPE "WorkerRolePaytype" AS ENUM ('Hourly', 'Salary', 'Contractor');

-- AlterTable
ALTER TABLE "worker_role" ADD COLUMN     "pay_type" "WorkerRolePaytype" NOT NULL DEFAULT 'Hourly';
ALTER TABLE "worker_role" ALTER COLUMN "pay_type" DROP DEFAULT;
