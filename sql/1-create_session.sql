CREATE TABLE IF NOT EXISTS `session` (
  `session_id` VARCHAR(128) NOT NULL,
  `expires` TIMESTAMP NOT NULL,
  `data` TEXT,
  PRIMARY KEY (`session_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci