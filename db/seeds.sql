INSERT INTO department (name)
VALUES ("Management"), 
("Developers"), 
("QA"), 
("Human Resources");

INSERT INTO role (department_id, title, salary)
VALUES (001, "CEO", 1000000),
(001, "Project Manager", 150000),
(001, "Managing Assistant", 80000),
(002, "Junior Developer", 75000),
(002, "Senior Developer", 120000),
(003, "UI/UX Tester", 70000),
(003, "Test Writer", 60000),
(004, "HR Director", 90000),
(004, "Recruiter", 65000);

INSERT INTO employee (role_id, manager_id, first_name, last_name)
VALUES (001, NULL, "Sleve", "McDichael"),
(002, 001, "Onson", "Sweemey"),
(003, 001, "Willie", "Dustice"),
(004, 003, "Todd", "Bonzalez"),
(004, 003, "Karl", "Dandleton"),
(004, 003, "Bobson", "Dugnutt"),
(005, 003, "Janet", "Smitinski"),
(005, 003, "Tina", "Michandale"),
(006, 002, "Denise", "Watergown"),
(006, 002, "Ashley", "Misingspoon"),
(007, 002, "Ed", "Scootleman"),
(008, 002, "Dan", "McGillestan"),
(009, 012, "Jacob", "Danielkev"),
(009, 012, "Prudence", "Texatruc"),
(009, 012, "Wally", "Mozambrendt");