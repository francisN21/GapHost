DROP DATABASE IF EXISTS tftInvite_db;

CREATE DATABASE tftInvite_db;

USE tftInvite_db;

CREATE TABLE Users (
	user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id),
	UNIQUE KEY email (email),
	UNIQUE KEY username (username)
);

CREATE TABLE Posts (
	post_id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
    caption VARCHAR(255) NOT NULL,
    PRIMARY KEY (post_id),
    FOREIGN KEY (`user_id`) REFERENCES Users (`user_id`)
);

CREATE TABLE invite (
  invite_id int NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(255) NULL,
  current_contribution INT,
  goal INT DEFAULT 0,
  address VARCHAR(255) NULL,
  target_date DATE NULL,
  attribute1 VARCHAR(255) NULL,
  attribute2 VARCHAR(255) NULL,
  attribute3 VARCHAR(255) NULL,
  date_created DATE NOT NULL,
  date_updated DATE,
  PRIMARY KEY (invite_id),
  FOREIGN KEY (`user_id`) REFERENCES Users (`user_id`),
  FOREIGN KEY (`current_contribution`) REFERENCES current_contribution (`contribution_money`)
);

CREATE TABLE current_contribution (
	contribution_id int NOT NULL AUTO_INCREMENT,
	invite_id INT NOT NULL,
    contribution_money INT DEFAULT 0,
    date_updated DATE,
    PRIMARY KEY (contribution_id),
    FOREIGN KEY (`invite_id`) REFERENCES invite (`invite_id`)
);