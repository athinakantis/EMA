const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const {
    createDepartmentTable,
    createEmployeeTable,
    addEmployees,
    createTeamLeadsTable,
    addToDepartmentTable,
    addTeamLeads,
} = require('./employeeScript');

dotenv.config();

async function initializeDatabase() {
    try {
        // Create connection to the database
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        // Seeing if database already exists
        const [rows] = await connection.query(
            `SELECT SCHEMA_NAME 
             FROM INFORMATION_SCHEMA.SCHEMATA 
             WHERE SCHEMA_NAME = 'staffoverflow';`
        );

        // If not, create db + tables
        if (rows.length === 0) {
            await connection.query(`CREATE DATABASE staffoverflow;`);
            await connection.query(`USE staffoverflow;`);
            await connection.query(createDepartmentTable);
            await connection.query(addToDepartmentTable);
            await connection.query(createEmployeeTable);
            await connection.query(addEmployees);
            await connection.query(createTeamLeadsTable);
            await connection.query(addTeamLeads);
            await connection.end();
        } else {
            console.log('Database already exists.');
        }
    } catch (error) {
        console.error('Error initializing the database:', error.message);
    }
}

initializeDatabase();
module.exports = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'staffoverflow',
});
