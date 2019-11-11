CREATE TABLE IF NOT EXISTS `post` (
  `post_id` BIGINT UNSIGNED NOT NULL,
  `post_subject` VARCHAR(32) NOT NULL,
  `post_content` LONGTEXT NOT NULL,
  `post_topic_code` INT(10) UNSIGNED NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`),
  INDEX `post_post_subject_BTREE` (`post_subject` ASC) INVISIBLE,
  CONSTRAINT `post_post_topic_code_FK`
    FOREIGN KEY (`post_topic_code`)
    REFERENCES `post_topic` (`post_topic_code`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;