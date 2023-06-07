const db = require('./queries/departmentQuery')
const consoleTable = require('console.table');
const inquirer = require('inquirer');

getRoles();
const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments', 
            'View all roles', 
            'View all employees', 
            'Add a department', 
            'Add a role', 
            'Add an employee', 
            'Update employee role',
            'Update employee manager',
            'View employees by manager',
            'View employees by department',
            'Delete department',
            'Delete role',
            'Delete employee',
            'View budget'
        ],
        name: 'options'
    },
    {
        type: 'input',
        name: 'name',
        message: 'Enter new department name',
        when: (response) => response.options === 'Add a department'
    },
    {
        type: 'input',
        name: 'title',
        message: 'enter role title',
        when: (response) => response.options === 'Add a role'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'enter role salary',
        when: (response) => response.options === 'Add a role'
    },
    {
        type: 'input',
        name: 'roleDepartment',
        message: 'enter the department name for this role',
        when: (response) => response.options === 'Add a role'
    },
    {
        type: 'input',
        name: 'roleName',
        message: 'enter name of the role',
        when: (response) => response.options === 'Add an employee'
    },
    {
        type: 'input',
        name: 'firstName',
        message: 'enter first name',
        when: (response) => response.options === 'Add an employee'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'enter last name',
        when: (response) => response.options === 'Add an employee'
    },
]

function getRoles() {
    db.query('SELECT title FROM role')
    .then(result => {
        let roles = [];
        result[0].forEach(role => roles.push(role.title))
        
        return roles;
    })
}



inquirer.prompt(questions)
.then(response => {
    let sql = null;
    console.log(response.name);
    switch (response.options) {
        case 'View all departments':
         sql = 'SELECT * FROM department'
         break;
        case 'View all roles': 
        sql = 'SELECT * FROM role INNER JOIN department ON role.department_id = department.id'
        break;
        case 'View all employees':
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
                LEFT JOIN department ON role.department_id = department.id;`
        break;
        case 'Add a department':
        sql = `INSERT INTO department(name) VALUES("${response.name}");`
        break;
        case 'Add a role':
        sql = `INSERT INTO role(title, salary) VALUES("${response.title}", ${response.salary})`
        break;
        case 'Add an employee': 
        sql = `SELECT id FROM role WHERE title = "${response.roleName}`;
            return db.query(sql)
                .then(result => {
                const roleId = result[0][0].id;
                sql = `INSERT INTO employee (role_id, manager_id, first_name, last_name) 
                       VALUES("${roleId}", "${response.manager}", "${response.firstName}", "${response.lastName})`
                return db.query(sql)
    }
)}
        return db.query(sql)
})
.then(result => {
    const table = result[0];
    console.table(table)
})

