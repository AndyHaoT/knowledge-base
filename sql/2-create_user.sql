CREATE TABLE IF NOT EXISTS `user` (
  `user_id` MEDIUMINT(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(128) NOT NULL,
  `user_email` VARCHAR(64) NOT NULL,
  `account_status` VARCHAR(32) NOT NULL DEFAULT 'INACTIVE',
  `account_type` VARCHAR(64) NOT NULL DEFAULT 'NORMAL',
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC) VISIBLE,
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci