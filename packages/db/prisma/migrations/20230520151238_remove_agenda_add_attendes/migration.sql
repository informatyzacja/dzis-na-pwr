/*
  Warnings:

  - You are about to drop the `AgendaItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AgendaItem" DROP CONSTRAINT "AgendaItem_eventId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "numberOfAttendees" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "AgendaItem";
