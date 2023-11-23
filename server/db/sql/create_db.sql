CREATE SCHEMA `projectdb` ;

CREATE TABLE `projectdb`.`movie` (
    `movie_id` INT NOT NULL,
    `title` VARCHAR(45) NULL,
    `duration` INT NULL,
    `year` INT NULL,
    `age_rating` VARCHAR(45) NULL,
    `rank` FLOAT NULL,
    `summary` MEDIUMTEXT NULL,
    `genre_id` INT NULL,
    `poster_id` VARCHAR(45) NULL,
    `trailer_id` VARCHAR(45) NULL,
    PRIMARY KEY (`movie_id`)
);

CREATE TABLE `projectdb`.`actor` (
    `actor_id` INT NOT NULL,
    `fname` VARCHAR(45) NULL,
    `lname` VARCHAR(45) NULL,
    PRIMARY KEY (`actor_id`)
);

CREATE TABLE `projectdb`.`users` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NULL,
    `password` VARCHAR(45) NULL,
    PRIMARY KEY (`user_id`)
);

CREATE TABLE `projectdb`.`genre` (
    `genre_id` INT NOT NULL,
    `genre_name` VARCHAR(45) NULL,
    PRIMARY KEY (`genre_id`)
);

CREATE TABLE `projectdb`.`ratings` (
    `rating_id` INT NOT NULL,
    `movie_id` INT NULL,
    `user_id` INT NULL,
    `review` INT NULL,
    PRIMARY KEY (`rating_id`)
);

CREATE TABLE `projectdb`.`cast` (
    `cast_id` INT NOT NULL,
    `movie_id` INT NOT NULL,
    `actor_id` INT NOT NULL,
    `role` VARCHAR(45) NULL,
    PRIMARY KEY (`cast_id`)
);

CREATE TABLE `projectdb`.`directors` (
    `director_id` INT NOT NULL,
    `fname` VARCHAR(45) NULL,
    `lname` VARCHAR(45) NULL,
    PRIMARY KEY (`director_id`)
);

CREATE TABLE `projectdb`.`direct` (
    `director_id` INT NOT NULL,
    `movie_id` INT NOT NULL
);

CREATE TABLE `projectdb`.`recents` (
    `user_id` INT NOT NULL,
    `movie_id` INT NOT NULL
);
