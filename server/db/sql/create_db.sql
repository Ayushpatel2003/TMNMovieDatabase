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
    PRIMARY KEY (`movie_id`)
);

CREATE TABLE `projectdb`.`actor` (
    `actor_id` INT NOT NULL,
    `fname` VARCHAR(45) NULL,
    `lname` VARCHAR(45) NULL,
    PRIMARY KEY (`actor_id`)
);

CREATE TABLE `projectdb`.`users` (
    `user_id` INT NOT NULL,
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
    INDEX `actor_id_idx` (`actor_id` ASC) VISIBLE,
    INDEX `movie_id_idx` (`movie_id` ASC) VISIBLE,
    PRIMARY KEY (`cast_id`),
    FOREIGN KEY (`movie_id`)
    REFERENCES `projectdb`.`movie` (`movie_id`),
    FOREIGN KEY (`actor_id`)
    REFERENCES `projectdb`.`actor` (`actor_id`)
);

CREATE TABLE `projectdb`.`directors` (
    `director_id` INT NOT NULL,
    `fname` VARCHAR(45) NULL,
    `lname` VARCHAR(45) NULL,
    PRIMARY KEY (`director_id`)
);

CREATE TABLE `projectdb`.`direct` (
    `director_id` INT NOT NULL,
    `movie_id` INT NOT NULL,
    INDEX `director_id_idx` (`director_id` ASC) VISIBLE,
    INDEX `movie_id_idx` (`movie_id` ASC) VISIBLE,
    FOREIGN KEY (`director_id`)
    REFERENCES `projectdb`.`directors` (`director_id`),
    FOREIGN KEY (`movie_id`)
    REFERENCES `projectdb`.`movie` (`movie_id`)
);
