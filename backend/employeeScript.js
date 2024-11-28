const createdb = `create database if not exists staffoverflow;`;

const usedb = `use staffoverflow;`;

const createTable = `CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    employment_type VARCHAR(20) NOT NULL,
    role VARCHAR(30) NOT NULL,
    startdate DATE NOT NULL,
    department VARCHAR(30) NOT NULL,
    location VARCHAR(30) NOT NULL,
    salary DECIMAL(8, 2) NOT NULL, -- Allow higher salary values
    PRIMARY KEY (id)
);`;

// Note to self: if creating teamleads and department table,
// department of employees table has to be updated

// const createTeamLeadsTable = `CREATE TABLE IF NOT EXISTS teamleads(
//     departmentId varchar(30) NOT NULL,
//     employeeId integer not null,
//     primary key (departmentId, employeeId)
//     foreign key (departmentId) references department(id),
//     foreign key (employeeId) references employees(id)
// );`;

// `create table if not exists department(
//     id integer not null,
//     name varchar(30) not null
// );`;

const addEmployees = `INSERT INTO employees (firstname, lastname, employment_type, role, startdate, department, location, salary) VALUES
('Mia', 'Virtanen', 'Full-time', 'Developer', '2014-03-17', 'IT', 'Helsinki', 4580),
('Elias', 'Laine', 'Part-time', 'IT Support', '2016-07-22', 'IT', 'Pasila', 2170),
('Sofia', 'Niemi', 'Full-time', 'Marketing Lead', '2023-10-01', 'Marketing', 'Helsinki', 5200),
('Oliver', 'Mäkelä', 'Part-time', 'Accountant', '2017-05-10', 'Finance', 'Pasila', 2500),
('Aino', 'Koskinen', 'Full-time', 'System Admin', '2022-12-04', 'IT', 'Helsinki', 4000),
('Onni', 'Rantanen', 'Full-time', 'Financial Analyst', '2011-06-12', 'Finance', 'Pasila', 5420),
('Ella', 'Järvinen', 'Full-time', 'Marketing Analyst', '2018-09-05', 'Marketing', 'Helsinki', 4170),
('Eetu', 'Korhonen', 'Part-time', 'Administrative Asst.', '2024-04-12', 'Admin', 'Pasila', 2000),
('Aada', 'Lehtinen', 'Full-time', 'IT Manager', '2024-08-01', 'IT', 'Helsinki', 5830),
('Leo', 'Saarinen', 'Part-time', 'Finance Clerk', '2019-11-25', 'Finance', 'Pasila', 2330),
('Lilja', 'Heikkinen', 'Full-time', 'Digital Marketer', '2022-06-14', 'Marketing', 'Helsinki', 4200),
('Veeti', 'Mäntynen', 'Part-time', 'Payroll Assistant', '2024-09-03', 'Finance', 'Pasila', 2100),
('Helmi', 'Mustonen', 'Full-time', 'SysAdmin Lead', '2015-04-29', 'IT', 'Helsinki', 4750),
('Joona', 'Salminen', 'Full-time', 'Accountant', '2018-01-16', 'Finance', 'Pasila', 4500),
('Aino', 'Aalto', 'Part-time', 'Office Manager', '2023-02-28', 'Admin', 'Helsinki', 2300),
('Nooa', 'Hämäläinen', 'Full-time', 'Marketing Specialist', '2020-07-30', 'Marketing', 'Helsinki', 3900),
('Iida', 'Salo', 'Part-time', 'Junior IT Support', '2024-06-15', 'IT', 'Pasila', 1800),
('Akseli', 'Koivisto', 'Full-time', 'Admin Assistant', '2019-03-08', 'Admin', 'Pasila', 3000),
('Aliisa', 'Peltonen', 'Full-time', 'Financial Analyst', '2012-11-21', 'Finance', 'Helsinki', 5200),
('Luukas', 'Leinonen', 'Full-time', 'Data Scientist', '2023-11-19', 'IT', 'Pasila', 5500);
`;

const bigstring = `create database if not exists staffoverflow;use staffoverflow; CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    employment_type VARCHAR(20) NOT NULL,
    role VARCHAR(30) NOT NULL,
    startdate DATE NOT NULL,
    department VARCHAR(30) NOT NULL,
    location VARCHAR(30) NOT NULL,
    salary DECIMAL(8, 2) NOT NULL, -- Allow higher salary values
    PRIMARY KEY (id)
); INSERT INTO employees (firstname, lastname, employment_type, role, startdate, department, location, salary) VALUES
('Mia', 'Virtanen', 'Full-time', 'Developer', '2014-03-17', 'IT', 'Helsinki', 4580),
('Elias', 'Laine', 'Part-time', 'IT Support', '2016-07-22', 'IT', 'Pasila', 2170),
('Sofia', 'Niemi', 'Full-time', 'Marketing Lead', '2023-10-01', 'Marketing', 'Helsinki', 5200),
('Oliver', 'Mäkelä', 'Part-time', 'Accountant', '2017-05-10', 'Finance', 'Pasila', 2500),
('Aino', 'Koskinen', 'Full-time', 'System Admin', '2022-12-04', 'IT', 'Helsinki', 4000),
('Onni', 'Rantanen', 'Full-time', 'Financial Analyst', '2011-06-12', 'Finance', 'Pasila', 5420),
('Ella', 'Järvinen', 'Full-time', 'Marketing Analyst', '2018-09-05', 'Marketing', 'Helsinki', 4170),
('Eetu', 'Korhonen', 'Part-time', 'Administrative Asst.', '2024-04-12', 'Admin', 'Pasila', 2000),
('Aada', 'Lehtinen', 'Full-time', 'IT Manager', '2024-08-01', 'IT', 'Helsinki', 5830),
('Leo', 'Saarinen', 'Part-time', 'Finance Clerk', '2019-11-25', 'Finance', 'Pasila', 2330),
('Lilja', 'Heikkinen', 'Full-time', 'Digital Marketer', '2022-06-14', 'Marketing', 'Helsinki', 4200),
('Veeti', 'Mäntynen', 'Part-time', 'Payroll Assistant', '2024-09-03', 'Finance', 'Pasila', 2100),
('Helmi', 'Mustonen', 'Full-time', 'SysAdmin Lead', '2015-04-29', 'IT', 'Helsinki', 4750),
('Joona', 'Salminen', 'Full-time', 'Accountant', '2018-01-16', 'Finance', 'Pasila', 4500),
('Aino', 'Aalto', 'Part-time', 'Office Manager', '2023-02-28', 'Admin', 'Helsinki', 2300),
('Nooa', 'Hämäläinen', 'Full-time', 'Marketing Specialist', '2020-07-30', 'Marketing', 'Helsinki', 3900),
('Iida', 'Salo', 'Part-time', 'Junior IT Support', '2024-06-15', 'IT', 'Pasila', 1800),
('Akseli', 'Koivisto', 'Full-time', 'Admin Assistant', '2019-03-08', 'Admin', 'Pasila', 3000),
('Aliisa', 'Peltonen', 'Full-time', 'Financial Analyst', '2012-11-21', 'Finance', 'Helsinki', 5200),
('Luukas', 'Leinonen', 'Full-time', 'Data Scientist', '2023-11-19', 'IT', 'Pasila', 5500);
`;

module.exports = { createdb, usedb, createTable, addEmployees, bigstring };
