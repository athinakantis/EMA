import { useState } from 'react';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import './EmployeeList.css';
import employees from '../../data/employees';
import Filter from '../Filter/Filter';

function EmployeeList() {
    const [sortedEmployees, setSortedEmployees] = useState(
        employees.sort((a, b) => a.department.localeCompare(b.department))
    );
    const [teamLeads, setTeamLeads] = useState({
        IT: '',
        Marketing: '',
        Admin: '',
        Finance: ''
    })

    return (
        <>
            <div className='options'>
                <Filter
                    employees={employees}
                    setSortedEmployees={setSortedEmployees}
                />
            </div>
            <section id='employeeList'>
                {sortedEmployees.map((employee) => {
                    return (
                        <EmployeeCard
                            key={`employee-${employee.id}`}
                            {...employee}
                            setTeamLeads={setTeamLeads}
                            teamLeads={teamLeads}
                            employees={sortedEmployees}
                        />
                    );
                })}
            </section>
        </>
    );
}

export default EmployeeList;
