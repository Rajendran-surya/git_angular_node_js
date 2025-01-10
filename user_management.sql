-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for user_management
CREATE DATABASE IF NOT EXISTS `user_management` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `user_management`;

-- Dumping data for table user_management.courses: ~3 rows (approximately)
INSERT INTO `courses` (`id`, `class`, `subject`, `board`, `latitude`, `longitude`, `created_by`) VALUES
	(1, 'd', 'wd', 'sd', 1, 2, '2025-01-10 12:29:49'),
	(2, '12 th', 'Maths', 'state board', 3, 3, '2025-01-10 12:29:53'),
	(4, 'AD', 'SD', 'ASD', 0, 0, '2025-01-10 14:08:57');

-- Dumping data for table user_management.users: ~3 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `password`, `profile_image`, `latitude`, `longitude`, `token`) VALUES
	(13, 'surya', 'senthamilansurya@gmail.com', '$2b$10$GxWSv.o7eVth1.zOfrgua.3b79YjTLv5MJspQp/ALMs2KGY4arRzu', 'uploads\\1736505447150-Rithi.png', 3, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJpYXQiOjE3MzY1MDMwNTcsImV4cCI6MTczNjUwNjY1N30.cEJ9fRLeiCBdi6Yem9s7CO7UbFJu16gIcpxyzq3JLxE'),
	(14, 'ad', 'senthamilansurya@gmail.com', '$2b$10$WLrBAfIc0qE6WW.N9l8equCSUNGycU2CwjObsCHrCYSCEJ8idPqUm', 'uploads\\1736502905104-download (2).png', 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlbnRoYW1pbGFuc3VyeWFAZ21haWwuY29tIiwiaWF0IjoxNzM2NTAyODU1LCJleHAiOjE3MzY1MDY0NTV9.hG3WAgxcC1qPFvuhaD-1msb7g4-Dqojvm-kBPWSbThU'),
	(15, 'd', 'senthamilansurya@gmail.com', '$2b$10$NIBiIhYPMs53iW6H..mSN.4dTsGcBF2aIcmRQsTtYI0J2zzaSXUIy', 'uploads\\1736502905104-download (2).png', 2, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlbnRoYW1pbGFuc3VyeWFAZ21haWwuY29tIiwiaWF0IjoxNzM2NTAyOTA1LCJleHAiOjE3MzY1MDY1MDV9._uRLG0L-NWuCXE7F56_96ZmMAIFzaPkIsEI3aMim1_U');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
