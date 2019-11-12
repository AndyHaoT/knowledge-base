CREATE TABLE IF NOT EXISTS `user_message` (
  `message_id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `thread_id` BIGINT(20) UNSIGNED NOT NULL,
  `user_sender_id` MEDIUMINT(8) UNSIGNED NOT NULL,
  `user_receiver_id` MEDIUMINT(8) UNSIGNED NOT NULL,
  `message_content` LONGTEXT NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  INDEX `user_message_sender_FK_idx` (`user_sender_id` ASC) VISIBLE,
  INDEX `user_message_receiver_FK_idx` (`user_receiver_id` ASC) VISIBLE,
  INDEX `user_message_thread_id_FK_idx` (`thread_id` ASC) VISIBLE,
  CONSTRAINT `user_message_thread_id_FK`
    FOREIGN KEY (`thread_id`)
    REFERENCES `user_message_thread` (`thread_id`)
    ON DELETE CASCADE,
  CONSTRAINT `user_message_receiver_FK`
    FOREIGN KEY (`user_receiver_id`)
    REFERENCES `user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `user_message_sender_FK`
    FOREIGN KEY (`user_sender_id`)
    REFERENCES `user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci