import { useState } from 'react';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import './EmployeeList.css';
import employees from '../../data/employees';

function EmployeeList({ handleClick }) {
    const [teamLead, setTeamLead] = useState('');

    return (
        <section id='employeeList'>
            {employees.map((employee) => {
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
