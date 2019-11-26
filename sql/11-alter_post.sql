ALTER TABLE `post` 
ADD COLUMN `user_id` MEDIUMINT UNSIGNED NOT NULL AFTER `post_id`,
ADD INDEX `post_user_id_FK_idx` (`user_id` ASC) VISIBLE,
ADD CONSTRAINT `post_user_id_FK`
  FOREIGN KEY (`user_id`)
  REFERENCES `user` (`user_id`)
  ON DELETE CASCADE
  ON UPDATE RESTRICT;