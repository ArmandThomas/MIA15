CREATE TABLE `athletes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`full_name` varchar(256) NOT NULL,
	`first_edition` bigint unsigned NOT NULL,
	`birth_year` smallint NOT NULL,
	`bio` text,
	`id_country` bigint unsigned NOT NULL,
	CONSTRAINT `athletes_id` PRIMARY KEY(`id`)
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
CREATE TABLE `results` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`value` varchar(256) NOT NULL,
	`value_type` enum('Type1','Type2') NOT NULL,
	`rank` smallint NOT NULL,
	`id_Event` bigint unsigned NOT NULL,
	CONSTRAINT `results_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `host_disciplines` (
	`id_discipline` bigint unsigned NOT NULL,
	`id_host` bigint unsigned NOT NULL,
	CONSTRAINT `host_disciplines_id_discipline_id_host_pk` PRIMARY KEY(`id_discipline`,`id_host`)
);
--> statement-breakpoint
CREATE TABLE `team_results` (
	`id_country` bigint unsigned NOT NULL,
	`id_result` bigint unsigned NOT NULL,
	CONSTRAINT `team_results_id_country_id_result_pk` PRIMARY KEY(`id_country`,`id_result`)
);
--> statement-breakpoint
CREATE TABLE `hosts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`slug` varchar(256) NOT NULL,
	`start_date` date,
	`end_date` date,
	`name` varchar(256) NOT NULL,
	`season` enum('Summer','Winter') NOT NULL,
	`year` smallint NOT NULL,
	`location` bigint unsigned NOT NULL,
	CONSTRAINT `hosts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `athlete_results` (
	`id_athlete` bigint unsigned NOT NULL,
	`id_result` bigint unsigned NOT NULL,
	CONSTRAINT `athlete_results_id_athlete_id_result_pk` PRIMARY KEY(`id_athlete`,`id_result`)
);
--> statement-breakpoint
ALTER TABLE `athletes` ADD CONSTRAINT `athletes_first_edition_hosts_id_fk` FOREIGN KEY (`first_edition`) REFERENCES `hosts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `athletes` ADD CONSTRAINT `athletes_id_country_countries_id_fk` FOREIGN KEY (`id_country`) REFERENCES `countries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `events` ADD CONSTRAINT `events_id_discipline_disciplines_id_fk` FOREIGN KEY (`id_discipline`) REFERENCES `disciplines`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `events` ADD CONSTRAINT `events_id_Host_hosts_id_fk` FOREIGN KEY (`id_Host`) REFERENCES `hosts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `results` ADD CONSTRAINT `results_id_Event_events_id_fk` FOREIGN KEY (`id_Event`) REFERENCES `events`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `host_disciplines` ADD CONSTRAINT `host_disciplines_id_discipline_disciplines_id_fk` FOREIGN KEY (`id_discipline`) REFERENCES `disciplines`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `host_disciplines` ADD CONSTRAINT `host_disciplines_id_host_hosts_id_fk` FOREIGN KEY (`id_host`) REFERENCES `hosts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `team_results` ADD CONSTRAINT `team_results_id_country_countries_id_fk` FOREIGN KEY (`id_country`) REFERENCES `countries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `team_results` ADD CONSTRAINT `team_results_id_result_results_id_fk` FOREIGN KEY (`id_result`) REFERENCES `results`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hosts` ADD CONSTRAINT `hosts_location_countries_id_fk` FOREIGN KEY (`location`) REFERENCES `countries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `athlete_results` ADD CONSTRAINT `athlete_results_id_athlete_athletes_id_fk` FOREIGN KEY (`id_athlete`) REFERENCES `athletes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `athlete_results` ADD CONSTRAINT `athlete_results_id_result_results_id_fk` FOREIGN KEY (`id_result`) REFERENCES `results`(`id`) ON DELETE no action ON UPDATE no action;