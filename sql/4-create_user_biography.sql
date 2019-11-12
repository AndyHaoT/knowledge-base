CREATE TABLE IF NOT EXISTS `user_biography` (
  `user_id` MEDIUMINT(8) UNSIGNED NOT NULL,
  `user_firstname` VARCHAR(64) NOT NULL,
  `user_lastname` VARCHAR(64) NOT NULL,
  `user_gender` CHAR(6) NULL DEFAULT NULL,
  `user_avatar_path` VARCHAR(1024) NULL DEFAULT NULL,
  `user_birthday` DATE NULL DEFAULT NULL,
  `user_bio` TEXT NULL DEFAULT NULL,
  `user_country_code` CHAR(2) NULL DEFAULT NULL,
  `date_created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  INDEX `user_primary_info_user_lastname_BTREE` (`user_lastname` ASC) INVISIBLE,
  INDEX `user_primary_info_user_firstname_BTREE` (`user_firstname` ASC) VISIBLE,
  CONSTRAINT `user_user_biography_user_id_FK`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci