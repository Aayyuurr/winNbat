-- CreateEnum
CREATE TYPE "status" AS ENUM ('pending', 'accepted', 'refused', 'canceled', 'finished');

-- CreateEnum
CREATE TYPE "role" AS ENUM ('admin', 'voyager', 'renter');

-- CreateEnum
CREATE TYPE "langue" AS ENUM ('ar', 'en', 'fr', 'computer');

-- CreateEnum
CREATE TYPE "theme" AS ENUM ('light', 'dark', 'computer');

-- CreateTable
CREATE TABLE "auth_user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verified_email" BOOLEAN NOT NULL DEFAULT false,
    "birthdate" TIMESTAMP(3),
    "logo" TEXT NOT NULL DEFAULT '/ProfilePicture/default.png',

    CONSTRAINT "auth_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "more_info" (
    "id" TEXT NOT NULL,
    "phone_number" TEXT,
    "wilaya" TEXT,
    "commune" TEXT,
    "address" TEXT,
    "role" "role" NOT NULL DEFAULT 'voyager',
    "theme" "theme" NOT NULL DEFAULT 'computer',
    "langue" "langue" NOT NULL DEFAULT 'computer',

    CONSTRAINT "more_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation" (
    "id" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT 'pending',
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "renter_id" TEXT NOT NULL,
    "apartment_id" TEXT NOT NULL,
    "prix" INTEGER NOT NULL,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apartment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "wilaya" TEXT NOT NULL,
    "commune" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "rooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "beds" INTEGER NOT NULL,
    "images" TEXT[],
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "apartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liked" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "apartment_id" TEXT NOT NULL,

    CONSTRAINT "liked_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "apartment_id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorit" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "apartment_id" TEXT NOT NULL,

    CONSTRAINT "favorit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "active_expires" BIGINT NOT NULL,
    "idle_expires" BIGINT NOT NULL,

    CONSTRAINT "auth_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_key" (
    "id" TEXT NOT NULL,
    "hashed_password" TEXT,
    "user_id" TEXT NOT NULL,
    "primary_key" BOOLEAN NOT NULL,
    "expires" BIGINT,

    CONSTRAINT "auth_key_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_id_key" ON "auth_user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_username_key" ON "auth_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_email_key" ON "auth_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "more_info_id_key" ON "more_info"("id");

-- CreateIndex
CREATE UNIQUE INDEX "more_info_phone_number_key" ON "more_info"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "reservation_id_key" ON "reservation"("id");

-- CreateIndex
CREATE INDEX "reservation_renter_id_idx" ON "reservation"("renter_id");

-- CreateIndex
CREATE INDEX "reservation_apartment_id_idx" ON "reservation"("apartment_id");

-- CreateIndex
CREATE UNIQUE INDEX "apartment_id_key" ON "apartment"("id");

-- CreateIndex
CREATE INDEX "apartment_owner_id_idx" ON "apartment"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "liked_id_key" ON "liked"("id");

-- CreateIndex
CREATE INDEX "liked_user_id_idx" ON "liked"("user_id");

-- CreateIndex
CREATE INDEX "liked_apartment_id_idx" ON "liked"("apartment_id");

-- CreateIndex
CREATE UNIQUE INDEX "comment_id_key" ON "comment"("id");

-- CreateIndex
CREATE INDEX "comment_user_id_idx" ON "comment"("user_id");

-- CreateIndex
CREATE INDEX "comment_apartment_id_idx" ON "comment"("apartment_id");

-- CreateIndex
CREATE UNIQUE INDEX "favorit_id_key" ON "favorit"("id");

-- CreateIndex
CREATE INDEX "favorit_user_id_idx" ON "favorit"("user_id");

-- CreateIndex
CREATE INDEX "favorit_apartment_id_idx" ON "favorit"("apartment_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_session_id_key" ON "auth_session"("id");

-- CreateIndex
CREATE INDEX "auth_session_user_id_idx" ON "auth_session"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_key_id_key" ON "auth_key"("id");

-- CreateIndex
CREATE INDEX "auth_key_user_id_idx" ON "auth_key"("user_id");

-- AddForeignKey
ALTER TABLE "more_info" ADD CONSTRAINT "more_info_id_fkey" FOREIGN KEY ("id") REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "more_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartment" ADD CONSTRAINT "apartment_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "more_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liked" ADD CONSTRAINT "liked_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "more_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liked" ADD CONSTRAINT "liked_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "more_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorit" ADD CONSTRAINT "favorit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "more_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorit" ADD CONSTRAINT "favorit_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_session" ADD CONSTRAINT "auth_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_key" ADD CONSTRAINT "auth_key_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
