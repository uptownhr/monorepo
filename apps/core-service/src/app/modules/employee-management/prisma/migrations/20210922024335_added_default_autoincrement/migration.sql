-- AlterTable
CREATE SEQUENCE "employee_voices_feedback_id_seq";
ALTER TABLE "employee_voices_feedback" ALTER COLUMN "id" SET DEFAULT nextval('employee_voices_feedback_id_seq');
ALTER SEQUENCE "employee_voices_feedback_id_seq" OWNED BY "employee_voices_feedback"."id";
