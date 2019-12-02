ALTER TABLE `post_comment` 
ADD INDEX `post_comment_post_id_FK` (`post_id` ASC) VISIBLE,
ADD CONSTRAINT `post_comment_post_id_FK`
  FOREIGN KEY (`post_id`)
  REFERENCES `post` (`post_id`)
  ON DELETE CASCADE
  ON UPDATE RESTRICT;