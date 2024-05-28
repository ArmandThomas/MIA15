CREATE TABLE `countries` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`code` varchar(4),
	`code_iso` char(3) NOT NULL,
	`phone_code` varchar(4) NOT NULL,
	CONSTRAINT `countries_id` PRIMARY KEY(`id`),
	CONSTRAINT `countries_name_unique` UNIQUE(`name`),
	CONSTRAINT `countries_code_unique` UNIQUE(`code`),
	CONSTRAINT `countries_code_iso_unique` UNIQUE(`code_iso`),
	CONSTRAINT `countries_phone_code_unique` UNIQUE(`phone_code`)
);
