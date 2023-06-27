const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'T^d6B6+cFg!11#z5',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database')
);

// const queries = {
//     viewDepartments: 'SELECT * FROM department',
//     viewRoles: 'SELECT * FROM role',
//     viewEmployees: 'SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id;'
// }

const db = connection.promise();

module.exports = db;