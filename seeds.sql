DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES department (id)
    ON DELETE CASCADE
);

CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id INT NULL,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id)
  REFERENCES role (id)
  ON DELETE CASCADE
);

CREATE TABLE manager (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)
  REFERENCES department (id)
  ON DELETE CASCADE
);

-- pre-made values for testing

INSERT INTO employee (first_name, last_name) VALUES ("Francisco", "Rones"), ("Juan", "Martinez"), ("Justin", "Ignacio"), ("Lance", "Narbaitz"), ("Aaron", "Kohgadai"), ("Gabe", "Quintana"), ("Rechie", "Magalued"), ("Brandon", "Phan"), ("Will", "Dempsey");
INSERT INTO manager (first_name, last_name) VALUES ("Srini", "Madineni"), ("Frank", "Woo"), ("Cynthia", "Lee"), ("Cory", "Swain"), ("Craig", "Gansheimer"), ("Jennifer", "Costantino");

INSERT INTO department (name) VALUES ("IT"),("Software Developer"),("Admin"),("Finance"),("Designer"), ("Architect");

INSERT INTO role (title, salary, department_id) VALUES ("IT Admin", 70000, 1),("IT Admin III", 80000, 1),("Lead Software Engineer", 120000, 2),("Executive Admin Support", 90000, 3),("Color Concept designer", 85000, 5), ("Principal Softweare Engineer", 150000, 2), ("Lead Architect", 100000, 6), ("Acountant", 80000, 4);