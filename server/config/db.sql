DROP DATABASE IF EXISTS `diary`;
CREATE DATABASE `diary`;
USE `diary`;

CREATE TABLE `users`(
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(50) NOT NULL,
	`email` VARCHAR(50) NOT NULL,
	`password` VARCHAR(50) NOT NULL
);

CREATE TABLE `messages`(
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`title` VARCHAR(50) NOT NULL,
	`body` VARCHAR(200) NOT NULL,
	`date` TIMESTAMP,
	`user_id` int,
	FOREIGN KEY (user_id) REFERENCES users(id)
);