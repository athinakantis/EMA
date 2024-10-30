import EmployeeCard from '../EmployeeCard/EmployeeCard';
import './EmployeeList.css';

function EmployeeList() {
  const employees = [
    {
      fullName: 'John Doe',
      role: 'Senior Developer',
      department: 'IT',
      salary: 3000,
      location: 'Helsinki'
    },
    {
      fullName: 'Jane Doe',
      role: 'Accountant',
      department: 'finance',
      salary: 3500,
      location: 'Bahamas'
    },
  ];

  return (
    <section id='employeeList'>
      {employees.map((employee, index) => {
        return (
          <EmployeeCard
            fullName={employee.fullName}
            initialRole={employee.role}
            department={employee.department}
            salary={employee.salary}
            location={employee.location}
            key={`employee-${index}`}
          />
        );
      })}
    </section>
  );
}

export default EmployeeList;
