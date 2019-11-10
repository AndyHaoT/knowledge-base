CREATE TABLE IF NOT EXISTS `user_like` (
  `user_id` MEDIUMINT(8) UNSIGNED NOT NULL,
  `user_liked_id` MEDIUMINT(8) UNSIGNED NOT NULL,
  `date_created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `user_liked_id`),
  INDEX `user_like_user_liked_id_FK_idx` (`user_liked_id` ASC) VISIBLE,
  CONSTRAINT `user_like_user_id_FK`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `user_like_user_liked_id_FK`
    FOREIGN KEY (`user_liked_id`)
    REFERENCES `user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci