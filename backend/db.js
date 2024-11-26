const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const { createTable, addEmployees } = require('./employeeScript');

dotenv.config();

async function initializeDatabase() {
    try {
        // Step 1: Connect to the MySQL server (without selecting a database)
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        console.log('Checking if database exists...');

        // Step 2: Check if the database exists
        const [rows] = await connection.query(
            `SELECT SCHEMA_NAME 
             FROM INFORMATION_SCHEMA.SCHEMATA 
             WHERE SCHEMA_NAME = 'staffoverflow';`
        );

        if (rows.length === 0) {
            console.log('Database does not exist. Creating it now...');
            await connection.query(`CREATE DATABASE staffoverflow;`);
            await connection.query(`USE staffoverflow;`);
            // await connection.query(
            //     `create user staffadmin@localhost identified by unicorn;`
            // );
            // await connection.query(
            //     `grant all privileges on staffoverflow.* to staffadming@localhost;`
            // );
            console.log('Employees table created or verified.');
            await connection.query(createTable);
            console.log('Initial data inserted into employees table.');
            await connection.query(addEmployees);
            console.log('Database created successfully.');
            await connection.end();
        } else {
            console.log('Database already exists.');
        }
    } catch (error) {
        console.error('Error initializing the database:', error.message);
    }
}

// Call the initialization function on startup
initializeDatabase();
module.exports = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'staffoverflow',
});
