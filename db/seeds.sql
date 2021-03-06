
INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Accounting"),
       ("Human Resources"),
       ("Research");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 90000, 7),
       ("Sales Lead", 80000, 2),
       ("Sales Representative", 45000, 6),
       ("Accounting Manager", 85000, 2),
       ("HR Manager", 80000, 3),
       ("HR Representative", 35000, 3),
       ("Research Tech", 100000, 4),
       ("Research Developer", 85000, 8),
       ("Manager", 100, 1),
       ("Lead", 200, 2)
       ("Other/Not-Specified", 111, 111);

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