/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `from` on table `message` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_from_fkey";

-- AlterTable
ALTER TABLE "message" ALTER COLUMN "from" SET NOT NULL,
ALTER COLUMN "from" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_from_fkey" FOREIGN KEY ("from") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION;
