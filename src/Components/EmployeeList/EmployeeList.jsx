import { useState } from 'react';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import './EmployeeList.css';

function EmployeeList() {
  const [teamLead, setTeamLead] = useState('');
  const employees = [
    {
      id: 0,
      firstName: 'John',
      lastName: 'Doe',
      initialRole: 'Senior Developer',
      department: 'IT',
      salary: 3000,
      startDate: '2022-01-20',
      employmentType: 'Full-time',
      location: 'Helsinki',
    },
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      initialRole: 'Accountant',
      department: 'finance',
      salary: 3500,
      startDate: '2016-03-30',
      employmentType: 'Full-time',
      location: 'Pasila',
    },
    {
      id: 2,
      firstName: 'Jim',
      lastName: 'Bean',
      initialRole: 'Junior Developer',
      department: 'IT',
      salary: 2300,
      startDate: '2024-07-30',
      employmentType: 'Full-time',
      location: 'Helsinki',
    },
    {
      id: 3,
      firstName: 'Henry',
      lastName: 'Clyde',
      initialRole: 'Manager',
      department: 'admin',
      salary: 3500,
      startDate: '2014-08-24',
      employmentType: 'Full-time',
      location: 'Helsinki',
    },
    {
      id: 4,
      firstName: 'Alice',
      lastName: 'Jones',
      initialRole: 'Accountant',
      department: 'finance',
      salary: 2800,
      startDate: '2022-01-30',
      employmentType: 'Part-time',
      location: 'Pasila',
    },
    {
      id: 5,
      firstName: 'Olivia',
      lastName: 'Williams',
      initialRole: 'Manager',
      department: 'admin',
      salary: 3000,
      startDate: '2019-04-12',
      employmentType: 'Full-time',
      location: 'Pasila',
    },
    {
      id: 6,
      firstName: 'Isabella',
      lastName: 'Lopez',
      initialRole: 'Junior Developer',
      department: 'IT',
      salary: 2500,
      startDate: '2023-09-22',
      employmentType: 'Part-time',
      location: 'Pasila',
    },
    {
      id: 7,
      firstName: 'Noah',
      lastName: 'Andersson',
      initialRole: 'Project manager',
      department: 'IT',
      salary: 4000,
      startDate: '2014-09-28',
      employmentType: 'Full-time',
      location: 'Helsinki',
    },
    {
      id: 8,
      firstName: 'Mia',
      lastName: 'Johnson',
      initialRole: 'Marketing manager',
      department: 'marketing',
      salary: 4000,
      startDate: '2018-02-01',
      employmentType: 'Full-time',
      location: 'Pasila',
    },
    {
      id: 9,
      firstName: 'Emma',
      lastName: 'Brown',
      initialRole: 'Front-end developer',
      department: 'IT',
      salary: 3000,
      startDate: '2021-02-30',
      employmentType: 'Full-time',
      location: 'Helsinki',
    },
  ];

  return (
    <section id='employeeList'>
      {employees.map((employee) => {
        return (
          <EmployeeCard
            key={`employee-${employee.id}`}
            {...employee}
            teamLead={teamLead}
            setTeamLead={setTeamLead}
          />
        );
      })}
    </section>
  );
}

export default EmployeeList;
