-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `role` ENUM('PLAYER', 'HOST', 'ADMIN') NOT NULL DEFAULT 'PLAYER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Game` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `logoUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Tournament` (
    `id` VARCHAR(191) NOT NULL,
    `hostId` VARCHAR(191) NOT NULL,
    `gameId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `mode` ENUM('SOLO', 'DUO', 'SQUAD') NOT NULL,
    `prizeMoney` INTEGER NOT NULL DEFAULT 0,
    `regOpensAt` DATETIME(3) NOT NULL,
    `regClosesAt` DATETIME(3) NOT NULL,
    `matchAt` DATETIME(3) NOT NULL,
    `hasFee` BOOLEAN NOT NULL DEFAULT FALSE,
    `fee` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('DRAFT', 'OPEN', 'RUNNING', 'FINISHED') NOT NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Registration` (
    `id` VARCHAR(191) NOT NULL,
    `tournamentId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `gameUid` VARCHAR(191) NOT NULL,
    `teamName` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Result` (
    `id` VARCHAR(191) NOT NULL,
    `tournamentId` VARCHAR(191) NOT NULL,
    `championUserId` VARCHAR(191) NOT NULL,
    `runnerUpUserId` VARCHAR(191) NOT NULL,
    `secondRunnerUpUserId` VARCHAR(191) NOT NULL,
    `killsJson` JSON NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Indexes
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
CREATE UNIQUE INDEX `Game_name_key` ON `Game`(`name`);
CREATE UNIQUE INDEX `Game_slug_key` ON `Game`(`slug`);
CREATE INDEX `Tournament_gameId_idx` ON `Tournament`(`gameId`);
CREATE INDEX `Tournament_status_idx` ON `Tournament`(`status`);
CREATE INDEX `Tournament_prizeMoney_idx` ON `Tournament`(`prizeMoney`);
CREATE INDEX `Tournament_mode_idx` ON `Tournament`(`mode`);
CREATE INDEX `Tournament_name_idx` ON `Tournament`(`name`);
CREATE UNIQUE INDEX `Registration_tournamentId_gameUid_key` ON `Registration`(`tournamentId`, `gameUid`);
CREATE INDEX `Registration_userId_idx` ON `Registration`(`userId`);
CREATE UNIQUE INDEX `Result_tournamentId_key` ON `Result`(`tournamentId`);

-- Foreign keys
ALTER TABLE `Tournament`
  ADD CONSTRAINT `Tournament_hostId_fkey`
  FOREIGN KEY (`hostId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Tournament`
  ADD CONSTRAINT `Tournament_gameId_fkey`
  FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Registration`
  ADD CONSTRAINT `Registration_tournamentId_fkey`
  FOREIGN KEY (`tournamentId`) REFERENCES `Tournament`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `Registration`
  ADD CONSTRAINT `Registration_userId_fkey`
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Result`
  ADD CONSTRAINT `Result_tournamentId_fkey`
  FOREIGN KEY (`tournamentId`) REFERENCES `Tournament`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
