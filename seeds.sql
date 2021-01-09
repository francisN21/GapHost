DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

-- pre-made values for testing

INSERT INTO employee (first_name, last_name, role_id) VALUES ("Francisco", "Rones", 1), ("Juan", "Martinez", 2), ("Justin", "Ignacio", 3), ("Lance", "Narbaitz", 4), ("Aaron", "Kohgadai", 5), ("Gabe", "Quintana", 6), ("Rechie", "Magalued", 7), ("Brandon", "Phan", 8), ("Will", "Dempsey", 9);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Srini", "Madineni", 10), ("Frank", "Woo", 11), ("Cynthia", "Lee", 12), ("Cory", "Swain", 13), ("Craig", "Gansheimer", 14), ("Jennifer", "Costantino", 15);

INSERT INTO department (name) VALUES ("IT"),("Software Engineer"),("Admin"),("Production Strategy"),("Designer");

INSERT INTO role (title, salary, department_id) VALUES ("IT Admin", 70000, 1),("IT Admin III", 80000, 1),("Lead Software Engineer", 120000, 2),("Executive Admin Support", 90000, 3),("Color Concept Manager", 85000, 4), ("Principal Softweare Engineer", 150000, 2);