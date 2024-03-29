CREATE TABLE IF NOT EXISTS `user_auth` (
  `auth_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` MEDIUMINT(8) UNSIGNED NOT NULL,
  `auth_type` VARCHAR(64) NOT NULL,
  `auth_key` VARCHAR(128) NOT NULL,
  `auth_token` VARCHAR(1024) NULL DEFAULT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`auth_id`),
  UNIQUE INDEX `auth_id_UNIQUE` (`auth_id` ASC) INVISIBLE,
  UNIQUE INDEX `type_key_UNIQUE` (`auth_type` ASC, `auth_key` ASC) INVISIBLE,
  INDEX `user_id_FK_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_auth_user_id_FK`
    FOREIGN KEY (`user_id`)
    REFERENCES `knowledge_base`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci