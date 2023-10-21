/*
  Warnings:

  - You are about to drop the column `type` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `member` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "member" DROP CONSTRAINT "member_userId_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_from_fkey";

-- AlterTable
ALTER TABLE "chat" DROP COLUMN "type",
ADD COLUMN     "is_private" BOOLEAN;

-- AlterTable
ALTER TABLE "member" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER;

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "userId",
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("user_id");

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_from_fkey" FOREIGN KEY ("from") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
