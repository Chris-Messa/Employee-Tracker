const db = require("./queries/departmentQuery");
const consoleTable = require("console.table");
const inquirer = require("inquirer");
const fetchData = require("./utils/questions");
let isView = false;
fetchData().then(questions => {
inquirer
  .prompt(questions)
  .then((response) => {
    let sql = null;
    switch (response.options) {
      case "View all departments":
        sql = "SELECT * FROM department";
        isView = true;
        break;
      case "View all roles":
        sql =
          "SELECT * FROM role INNER JOIN department ON role.department_id = department.id";
        isView = true;
        break;
      case "View all employees":
        sql = `SELECT employee.id AS employee_id, 
                employee.first_name,
                employee.last_name,
                role.title AS title,
                department.name AS department_name,
                role.salary AS salary,
                CONCAT (manager.first_name, ' ', manager.last_name) AS manager
                FROM employee 
                INNER JOIN role ON employee.role_id = role.id 
                LEFT JOIN employee AS manager 
                ON employee.manager_id = manager.id
                LEFT JOIN department ON role.department_id = department.id;`;
        isView = true;
        break;
      case "Add a department":
        sql = `INSERT INTO department(name) VALUES("${response.name}");`;
        break;
      case "Add a role":
        const departmentQuery = `SELECT id AS departmentId FROM department WHERE name = "${response.roleDepartment}"`;

        return db.query(departmentQuery)
          .then((result) => {
            const departmentId = result[0][0].departmentId;
      
            sql = `INSERT INTO role(title, salary, department_id) VALUES("${response.title}", ${response.salary}, ${departmentId})`;
            return db.query(sql);
          })
          .then(() => {
            console.log("Role added successfully");
          })
          .catch((error) => {
            console.error("Error adding role:", error);
          });
      case "Add an employee":
        sql = `SELECT role.id AS roleId, (SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = "${response.managerName}") AS managerId
        FROM role
        WHERE role.title = "${response.roleName}";`;
        return db.query(sql)
        .then((result) => {
          const roleId = result[0][0].roleId;
          const managerId = result[0][0].managerId;
          sql = `INSERT INTO employee (role_id, manager_id, first_name, last_name) 
                       VALUES(${roleId}, ${managerId}, "${response.firstName}", "${response.lastName}")`;
          return db.query(sql);
        });
      case "Update employee role":
        sql = `UPDATE employee 
        SET role_id = (SELECT id FROM role WHERE title = "${response.newRole}") 
        WHERE CONCAT(first_name, ' ', last_name) = "${response.employeeToUpdate}";`;
        break;
      case "Update employee manager":
        sql = `UPDATE employee
        SET manager_id = (SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = "${response.newManager}")
        WHERE CONCAT(first_name, ' ', last_name) = "${response.employeeToUpdate}";`;
        break;
      case "View employees by manager":
        sql = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager,
        CONCAT(employee.first_name, ' ', employee.last_name) AS employee
        FROM employee
        INNER JOIN employee AS manager ON employee.manager_id = manager.id
        WHERE CONCAT(manager.first_name, ' ', manager.last_name) = "${response.managerName}";`;
        isView = true;
        break;
      case "View employees by department":
        sql = `SELECT department.name AS department, CONCAT(employee.first_name, ' ', employee.last_name) AS employee
        FROM employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON role.department_id = department.id
        WHERE department.name = "${response.departmentName}";`;
        isView = true;
        break;
      case "Delete department":
        sql = `DELETE FROM department 
               WHERE department.name = "${response.departmentName}"`
        break;
      case "Delete role":
        sql = `DELETE FROM role 
               WHERE role.title = "${response.roleTitle}"`
        break;
      case "Delete employee":
        sql = `DELETE FROM employee 
               WHERE CONCAT(first_name, ' ', last_name) = ?`;
               return db.query(sql, [response.employeeName]);
    }
    return db.query(sql);
  })
  .then((result) => {
    if (isView) {
      let table;
      table = result[0];
      console.table(table);
    }
    console.log("Task complete");
  });
});
