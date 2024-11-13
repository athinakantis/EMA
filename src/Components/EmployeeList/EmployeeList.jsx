import { useState } from 'react';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import './EmployeeList.css';
import employees from '../../data/employees';
import Filter from '../Filter/Filter';

function EmployeeList({ handleClick }) {
    const [sortedEmployees, setSortedEmployees] = useState(
        employees.sort((a, b) => a.department.localeCompare(b.department))
    );
    const [dept, setDept] = useState({
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
                            setDept={setDept}
                            dept={dept}
                        />
                    );
                })}
            </section>
        </>
    );
}

export default EmployeeList;
