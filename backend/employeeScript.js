const createdb = `create database if not exists staffoverflow;`;

const usedb = `use staffoverflow;`;

const createDepartmentTable = `create table if not exists department(
    departmentId integer not null auto_increment,
    departmentName varchar(30) not null,
    primary key (departmentId)
);`;

const addToDepartmentTable = `insert into department (departmentName) values ('IT'), ('Marketing'), ('Finance'), ('Admin');`;

const createEmployeeTable = `create table if not exists employees (
    id INT AUTO_INCREMENT,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    employment_type VARCHAR(20) NOT NULL,
    role VARCHAR(30) NOT NULL,
    startdate DATE NOT NULL,
    departmentId integer not null,
    location VARCHAR(30) NOT NULL,
    salary decimal(6,2) NOT NULL,
    PRIMARY KEY (id),
    foreign key (departmentId) references department(departmentId)
);`;

const createTeamLeadsTable = `CREATE TABLE IF NOT EXISTS teamleads(
    departmentId integer NOT NULL,
    employeeId integer not null,
    primary key (departmentId, employeeId),
    foreign key (departmentId) references department(departmentId),
    foreign key (employeeId) references employees(id)
);`;

const addEmployees = `insert into employees (firstname, lastname, employment_type, role, startdate, departmentId, location, salary) VALUES
('Mia', 'Virtanen', 'Full-time', 'Developer', '2014-03-17', 1, 'Helsinki', 4580),
('Elias', 'Laine', 'Part-time', 'IT Support', '2016-07-22', 1, 'Pasila', 2170),
('Sofia', 'Niemi', 'Full-time', 'Marketing Lead', '2023-10-01', 2, 'Helsinki', 5200),
('Oliver', 'Mäkelä', 'Part-time', 'Accountant', '2017-05-10', 3, 'Pasila', 2500),
('Aino', 'Koskinen', 'Full-time', 'System Admin', '2022-12-04', 1, 'Helsinki', 4000),
('Onni', 'Rantanen', 'Full-time', 'Financial Analyst', '2011-06-12', 3, 'Pasila', 5420),
('Ella', 'Järvinen', 'Full-time', 'Marketing Analyst', '2018-09-05', 2, 'Helsinki', 4170),
('Eetu', 'Korhonen', 'Part-time', 'Administrative Asst.', '2024-04-12', 4, 'Pasila', 2000),
('Aada', 'Lehtinen', 'Full-time', 'IT Manager', '2024-08-01', 1, 'Helsinki', 5830),
('Leo', 'Saarinen', 'Part-time', 'Finance Clerk', '2019-11-25', 3, 'Pasila', 2330),
('Lilja', 'Heikkinen', 'Full-time', 'Digital Marketer', '2022-06-14', 2, 'Helsinki', 4200),
('Veeti', 'Mäntynen', 'Part-time', 'Payroll Assistant', '2024-09-03', 3, 'Pasila', 2100),
('Helmi', 'Mustonen', 'Full-time', 'SysAdmin Lead', '2015-04-29', 1, 'Helsinki', 4750),
('Joona', 'Salminen', 'Full-time', 'Accountant', '2018-01-16', 3, 'Pasila', 4500),
('Aino', 'Aalto', 'Part-time', 'Office Manager', '2023-02-28', 4, 'Helsinki', 2300),
('Nooa', 'Hämäläinen', 'Full-time', 'Marketing Specialist', '2020-07-30', 2, 'Helsinki', 3900),
('Iida', 'Salo', 'Part-time', 'Junior IT Support', '2024-06-15', 1, 'Pasila', 1800),
('Akseli', 'Koivisto', 'Full-time', 'Admin Assistant', '2019-03-08', 4, 'Pasila', 3000),
('Aliisa', 'Peltonen', 'Full-time', 'Financial Analyst', '2012-11-21', 3, 'Helsinki', 5200),
('Luukas', 'Leinonen', 'Full-time', 'Data Scientist', '2023-11-19', 1, 'Pasila', 5500);
`;

const addTeamLeads = `insert into teamleads values (1, 5), (2, 7)`;

module.exports = {
    createdb,
    usedb,
    createEmployeeTable,
    createTeamLeadsTable,
    createDepartmentTable,
    addEmployees,
    addToDepartmentTable,
    addTeamLeads,
};
