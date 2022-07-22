-- Active: 1658475986199@@localhost@3306@company_db
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

-- Department
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,

  PRIMARY KEY (id),
  UNIQUE KEY (department_name)
);

-- name, salary, department
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) 
    REFERENCES department(id)
);


-- first name, last name, role, manager
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT REFERENCES employee(id),

  PRIMARY KEY (id),
  FOREIGN KEY (role_id) 
    REFERENCES role(id)
);


-- Mock Data
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Smith", 1, NULL),
       ("Sally", "Suede", 2, 1),
       ("Bobby", "Ross", 3, 1),
       ("Ricardo", "Sanchez", 4, NULL),
       ("Barbara", "James", 5, 4),
       ("Meghan", "Desmond", 6, 4),
       ("Seth", "Green", 7, NULL),
       ("Sarah", "Heid", 8, 7),
       ("Billy", "Roberts", 9, 7),
       ("Max", "Pauley", 10, NULL),
       ("Dave", "Hicks", 11, 10),
       ("Wesley", "David", 12, 10);