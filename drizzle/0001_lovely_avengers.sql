CREATE TABLE `cxsmoContentEntries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contentKey` varchar(120) NOT NULL,
	`payload` text NOT NULL,
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`updatedByUserId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cxsmoContentEntries_id` PRIMARY KEY(`id`),
	CONSTRAINT `cxsmoContentEntries_contentKey_unique` UNIQUE(`contentKey`)
);
--> statement-breakpoint
CREATE TABLE `cxsmoMediaAssets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(180) NOT NULL,
	`alt` text NOT NULL,
	`url` text NOT NULL,
	`storageKey` varchar(280),
	`mimeType` varchar(80) NOT NULL,
	`createdByUserId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `cxsmoMediaAssets_id` PRIMARY KEY(`id`)
);
