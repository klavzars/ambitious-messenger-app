-- CreateTable
CREATE TABLE "chat" (
    "chat_id" SERIAL NOT NULL,
    "chat_name" VARCHAR,
    "type" CHAR(1),

    CONSTRAINT "chat_pkey" PRIMARY KEY ("chat_id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "chat_id" INTEGER,
    "joined_date" TIMESTAMP(6),
    "left_datetime" TIMESTAMP(6),
    "username" VARCHAR,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "from" INTEGER,
    "message_text" TEXT,
    "sent" TIMESTAMP(6),
    "chat_id" INTEGER,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "userId" SERIAL NOT NULL,
    "username" VARCHAR,
    "email" VARCHAR,
    "password" VARCHAR,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chat"("chat_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chat"("chat_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_from_fkey" FOREIGN KEY ("from") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION;

