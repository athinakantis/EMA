import { useState } from 'react';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import './EmployeeList.css';
import employees from '../../data/employees';
import Filter from '../../FilterEmployee/Filter';

function EmployeeList({ handleClick }) {
    const [teamLead, setTeamLead] = useState('');
    const [sortedEmployees, setSortedEmployees] = useState(
        employees.sort((a, b) => a.department.localeCompare(b.department))
    );

    return (
        <section id='employeeList'>
            <Filter
                employees={employees}
                setSortedEmployees={setSortedEmployees}
            />
            {sortedEmployees.map((employee) => {
                return (
                    <EmployeeCard
                        key={`employee-${employee.id}`}
                        {...employee}
                        teamLead={teamLead}
                        setTeamLead={setTeamLead}
                        handleClick={() => handleClick(employee.id)}
                    />
                );
            })}
        </section>
    );
}

export default EmployeeList;
