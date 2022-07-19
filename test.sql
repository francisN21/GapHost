DROP DATABASE IF EXISTS tftInvite_db;

CREATE DATABASE tftInvite_db;

USE tftInvite_db;

CREATE TABLE Users (
	user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) NULL,
    -- email VARCHAR(255) NOT NULL,
    -- password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
    birth_date VARCHAR(255) NULL,
    address VARCHAR(255) NULL,
    gender ENUM('M', 'F', 'other'),
    PRIMARY KEY (user_id)
	-- ,UNIQUE KEY email (email),
	-- UNIQUE KEY username (username)
);

CREATE TABLE Posts (
	post_id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
    caption VARCHAR(255) NOT NULL,
    PRIMARY KEY (post_id),
    FOREIGN KEY (`user_id`) REFERENCES Users (`user_id`)
);

CREATE TABLE Friends (
	user_id INT NOT NULL,
    friend_id INT NOT NULL,
    PRIMARY KEY (friend_id, user_id),
    UNIQUE INDEX (friend_id, user_id),
    FOREIGN KEY (`user_id`) REFERENCES Users (`user_id`),
    FOREIGN KEY (`friend_id`) REFERENCES Users (`user_id`)
);




CREATE TABLE invite (
  invite_id int NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  isFriend_true INT NULL,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(255) NULL,
  goal INT DEFAULT 0,
  address VARCHAR(255) NULL,
  target_date DATE NULL,
  attribute1 VARCHAR(255) NULL,
  attribute2 VARCHAR(255) NULL,
  attribute3 VARCHAR(255) NULL,
  date_created VARCHAR(255) NOT NULL,
  date_updated DATE,
  PRIMARY KEY (invite_id),
  FOREIGN KEY (`user_id`) REFERENCES Users (`user_id`),
  FOREIGN KEY (`isFriend_true`) REFERENCES Friends (`user_id`)
);

CREATE TABLE contribution (
	contribution_id int NOT NULL AUTO_INCREMENT,
	invite_id INT NOT NULL,
    bank INT DEFAULT 0,
    date_updated DATE,
    PRIMARY KEY (contribution_id),
    FOREIGN KEY (`invite_id`) REFERENCES invite (`invite_id`)
);

CREATE TABLE participants (
	participant_id int NOT NULL AUTO_INCREMENT,
	invite_id INT NOT NULL,
    friend_id INT NOT NULL,
    bank INT DEFAULT 0,
    date_added DATE NOT NULL,
    PRIMARY KEY (participant_id),
    FOREIGN KEY (`invite_id`) REFERENCES invite (`invite_id`),
    FOREIGN KEY (`friend_id`) REFERENCES Friends (`user_id`)
);

-- pre-made values for testing

INSERT INTO Users (first_name, last_name, gender)
VALUES
("Francisco", "Rones", 'M'),
("Charmaine", "Rones", 'F'),
("Pafau", "Lorenzo", 'F'),
("Rajee", "Sabra", 'M'),
("Jenna", "Sabra", 'F'),
("Chinky", "Rones", 'F'),
("Carlos", "Lorenzo", 'F'),
("Angelie", "Lorenzo", 'F'),
("Ninna", "Rones", 'F'),
("Nica", "Rones", 'F'),
("Juliana", "Arcilla", 'F'),
("Carlos", "Lorenzo", 'M')
;

Select * FROM Users;
Select * FROM Friends;

INSERT INTO invite (user_id, title, date_created) VALUES (1, "MAR10", 'timestamp()');

INSERT INTO Friends (user_id, friend_id) VALUES (1, 2), (1, 3), (1, 4), (1, 5);
INSERT INTO Friends (user_id, friend_id) VALUES (2, 1), (2, 3), (2, 4), (2, 5);

Select Users.first_name AS Users, Friends.friend_id AS Friend FROM Users INNER JOIN Friends ON Users.user_id = Friends.user_id;