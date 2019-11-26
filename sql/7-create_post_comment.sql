CREATE TABLE IF NOT EXISTS `post_comment` (
  `post_comment_id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `post_id` BIGINT(20) UNSIGNED NOT NULL,
  `user_id` MEDIUMINT(8) UNSIGNED NOT NULL,
  `post_comment_content` TEXT NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_comment_id`),
  INDEX `post_comment_user_id_FK_idx` (`user_id` ASC) VISIBLE,
  INDEX `post_comment_post_id_FK` (`post_id` ASC) VISIBLE,
  CONSTRAINT `post_comment_post_id_FK`
    FOREIGN KEY (`post_id`)
    REFERENCES `post` (`post_id`)
    ON DELETE CASCADE,
  CONSTRAINT `post_comment_user_id_FK`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci