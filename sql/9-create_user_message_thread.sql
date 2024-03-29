CREATE TABLE IF NOT EXISTS `user_message_thread` (
  `thread_id` BIGINT(20) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `thread_subject` TEXT NOT NULL,
  `date_created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`thread_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci