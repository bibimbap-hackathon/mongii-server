
DROP TABLE IF EXISTS `node`;
CREATE TABLE `node` (
	`node_id`	int	primary key auto_increment,
	`ip`	varchar(100)	NOT NULL,
	`name`	varchar(255)	NOT NULL,
	`info`	varchar(255)	NOT NULL,
    `created_date`	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_date`	datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `edge`;
CREATE TABLE `edge` (
	`edge_id`	int	primary key auto_increment,
	`node_id`	int	NOT NULL,
	`ip`	varchar(100)	NOT NULL,
	`name`	varchar(255)	NOT NULL,
	`info`	varchar(255)	NOT NULL,
	`password`	varchar(255)	NOT NULL,
    `created_date`	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_date`	datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `module`;
CREATE TABLE `module` (
	`module_id`	int	primary key auto_increment,
	`edge_id`	int	NOT NULL,
	`ip`	varchar(100)	NOT NULL,
	`name`	varchar(255)	NOT NULL,
	`info`	varchar(255)	NOT NULL,
	`priority`	int	NOT NULL,
	`created_date`	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_date`	datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `script`;
CREATE TABLE `script` (
	`script_id`	int	primary key auto_increment,
	`module_id`	int	NOT NULL,
	`name`	varchar(255)	NOT NULL,
	`src`	varchar(300)	NOT NULL,
	`env`	varchar(300)	NOT NULL,
	`created_date`	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_date`	datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `edge` ADD CONSTRAINT `FK_node_TO_edge_1` FOREIGN KEY (
	`node_id`
)
REFERENCES `node` (
	`node_id`
);

ALTER TABLE `module` ADD CONSTRAINT `FK_edge_TO_module_1` FOREIGN KEY (
	`edge_id`
)
REFERENCES `edge` (
	`edge_id`
);

ALTER TABLE `script` ADD CONSTRAINT `FK_module_TO_script_1` FOREIGN KEY (
	`module_id`
)
REFERENCES `module` (
	`module_id`
);
