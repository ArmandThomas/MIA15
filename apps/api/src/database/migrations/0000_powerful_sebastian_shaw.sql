CREATE TABLE `athletes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`url` varchar(256),
	`full_name` varchar(256) NOT NULL,
	`first_edition` bigint unsigned,
	`birth_year` smallint,
	`bio` text,
	CONSTRAINT `athletes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `countries` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`code` varchar(4),
	`code_iso` char(3) NOT NULL,
	CONSTRAINT `countries_id` PRIMARY KEY(`id`),
	CONSTRAINT `countries_name_unique` UNIQUE(`name`),
	CONSTRAINT `countries_code_iso_unique` UNIQUE(`code_iso`)
);
--> statement-breakpoint
CREATE TABLE `disciplines` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	CONSTRAINT `disciplines_id` PRIMARY KEY(`id`),
	CONSTRAINT `disciplines_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`id_discipline` bigint unsigned NOT NULL,
	`id_Host` bigint unsigned NOT NULL,
	`name` varchar(256) NOT NULL,
	`gender` enum('Men','Women','Mixed') NOT NULL,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `host_disciplines` (
	`id_discipline` bigint unsigned NOT NULL,
	`id_host` bigint unsigned NOT NULL,
	CONSTRAINT `host_disciplines_id_discipline_id_host_pk` PRIMARY KEY(`id_discipline`,`id_host`)
);
--> statement-breakpoint
CREATE TABLE `hosts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`slug` varchar(256) NOT NULL,
	`start_date` datetime,
	`end_date` datetime,
	`name` varchar(256) NOT NULL,
	`season` enum('Summer','Winter') NOT NULL,
	`year` smallint NOT NULL,
	`location` bigint unsigned NOT NULL,
	CONSTRAINT `hosts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `results` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`participant_type` enum('Athlete','GameTeam') NOT NULL,
	`value` varchar(256),
	`value_type` varchar(20),
	`is_equality` boolean NOT NULL,
	`position` smallint,
	`id_event` bigint unsigned NOT NULL,
	`id_country` bigint unsigned,
	`id_athlete` bigint unsigned,
	CONSTRAINT `results_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `athletes` ADD CONSTRAINT `athletes_first_edition_hosts_id_fk` FOREIGN KEY (`first_edition`) REFERENCES `hosts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `events` ADD CONSTRAINT `events_host_disciplines_fk` FOREIGN KEY (`id_discipline`,`id_Host`) REFERENCES `host_disciplines`(`id_discipline`,`id_host`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `host_disciplines` ADD CONSTRAINT `host_disciplines_id_discipline_disciplines_id_fk` FOREIGN KEY (`id_discipline`) REFERENCES `disciplines`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `host_disciplines` ADD CONSTRAINT `host_disciplines_id_host_hosts_id_fk` FOREIGN KEY (`id_host`) REFERENCES `hosts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hosts` ADD CONSTRAINT `hosts_location_countries_id_fk` FOREIGN KEY (`location`) REFERENCES `countries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `results` ADD CONSTRAINT `results_id_event_events_id_fk` FOREIGN KEY (`id_event`) REFERENCES `events`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `results` ADD CONSTRAINT `results_id_country_countries_id_fk` FOREIGN KEY (`id_country`) REFERENCES `countries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `results` ADD CONSTRAINT `results_id_athlete_athletes_id_fk` FOREIGN KEY (`id_athlete`) REFERENCES `athletes`(`id`) ON DELETE no action ON UPDATE no action;