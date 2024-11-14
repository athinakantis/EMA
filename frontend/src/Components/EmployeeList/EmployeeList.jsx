import { useState, useEffect } from 'react';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import './EmployeeList.css';
import employees from '../../data/employees';
import Filter from '../Filter/Filter';
import axios from 'axios';

function EmployeeList() {
    const [sortedEmployees, setSortedEmployees] = useState(
        employees.sort((a, b) => a.department.localeCompare(b.department))
    );
    const [test, setTest] = useState([])

    const [teamLeads, setTeamLeads] = useState({
        IT: '',
        Marketing: '',
        Admin: '',
        Finance: '',
    });

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/employees`)
            .then((response) => {
                setTest(response.data);
                console.log(response.data);
            })
            .catch((error) => console.error('Error fetching data: ', error));
    });

    return (
        <>
            <div className='options'>
                <Filter
                    employees={employees}
                    setSortedEmployees={setSortedEmployees}
                />
            </div>
            <section id='employeeList'>
                {test.map((employee) => {
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
