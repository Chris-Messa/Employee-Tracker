const db = require("../queries/departmentQuery");


const fetchData = async () =>  {
  let names = []
  let roles = []
  let departments = []
  let managers = []
    try {
      const result = await db.query(`SELECT CONCAT(first_name, ' ', last_name) AS name FROM employee`);
      names = result[0].map(name => name.name);
      roles = await db.query(`SELECT title FROM role`);
      roles = roles[0].map(role => role.title);
      departments = await db.query(`SELECT name FROM department`);
      departments = departments[0].map(department => department.name);
      managers = await db.query(`SELECT CONCAT(first_name, ' ', last_name) 
                                 AS name 
                                 FROM employee 
                                 WHERE id IN (SELECT manager_id FROM employee WHERE manager_id IS NOT NULL)`);  
    } catch (error) {
      console.error(error);
    }
    const questions = [
       {
         type: "list",
         message: "What would you like to do?",
         choices: [
           "View all departments",
           "View all roles",
           "View all employees",
           "Add a department",
           "Add a role",
           "Add an employee",
           "Update employee role",
           "Update employee manager",
           "View employees by manager",
           "View employees by department",
           "Delete department",
           "Delete role",
           "Delete employee",
           "View budget",
         ],
         name: "options",
       },
       {
         type: "input",
         name: "name",
         message: "Enter new department name",
         when: (response) => response.options === "Add a department",
       },
       {
         type: "input",
         name: "title",
         message: "enter role title",
         when: (response) => response.options === "Add a role",
       },
       {
         type: "input",
         name: "salary",
         message: "enter role salary",
         when: (response) => response.options === "Add a role",
       },
       {
         type: "input",
         name: "roleDepartment",
         message: "enter the department name for this role",
         when: (response) => response.options === "Add a role",
       },
       {
         type: "input",
         name: "roleName",
         message: "enter name of the role",
         when: (response) => response.options === "Add an employee",
       },
       {
         type: "input",
         name: "firstName",
         message: "enter first name",
         when: (response) => response.options === "Add an employee",
       },
       {
         type: "input",
         name: "lastName",
         message: "enter last name",
         when: (response) => response.options === "Add an employee",
       },
       {
           type: "list",
           name: "managerName",
           choices: ["Sleve McDichael", "Onson Sweemey", "Willie Dustice", "Dan McGillestan"],
           message: "Enter manager name for employee",
           when: (response) => response.options === "Add an employee"
       },
       {
         type: "list",
         name: "employeeToUpdate",
         choices: [...names],
         message: "Which employee would you like to update?",
         when: (response) => response.options === "Update employee role"
       },
       {
        type: "list",
        name: "newRole",
        choices: [...roles],
        message: "Which role would you like to update to?",
        when: (response) => response.options === "Update employee role"
       },
       {
        type: "list",
        name: "employeeToChangeManagement",
        choices: [...names],
        message: "Which employee's manager would you like to update?",
        when: (response) => response.options === "Update employee manager"
       },
       {
        type: "list",
        name: "managerName",
        choices: [...managers],
        message: "Who is the employee's new manager?",
        when: (response) => response.options === "Update employee manager"
       },
       {
        type: "list",
        name: "managerName",
        message: "Which manager's employees would you like to view?",
        choices: [...managers],  
        when: (response) => response.options === "View employees by manager"
      },
      {
        type: "list",
        name: "departmentName",
        message: "Which department's employees would you like to view?",
        choices: [...departments],
        when: (response) => response.options === "View employees by department"
      },
      {
        type: "list",
        name: "departmentName",
        message: "Which department would you like to delete?",
        choices: [...departments],
        when: (response) => response.options === "Delete department"
      },
      {
        type: "list",
        name: "roleTitle",
        message: "Which role would you like to delete?",
        choices: [...roles],
        when: (response) => response.options === "Delete role"
      },
      {
        type: "list",
        name: "employeeName",
        message: "Which employee would you like to delete?",
        choices: [...names],
        when: (response) => response.options === "Delete employee"
      },
      
     ];
 return questions;
}

  



  module.exports = fetchData;