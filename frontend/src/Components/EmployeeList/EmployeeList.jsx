import { useState, useEffect } from 'react';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import './EmployeeList.css';
import Filter from '../Filter/Filter';
import NewEmployee from '../NewEmployee/NewEmployee';
import axios from 'axios';

function EmployeeList() {
    const [employees, setEmployees] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [teamLeads, setTeamLeads] = useState({
        IT: '',
        Marketing: '',
        Admin: '',
        Finance: '',
    });

    useEffect(() => {
        const fetchAPI = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/employees`);
            setEmployees(response.data); // Set the fetched data
            setIsLoading(false); // Set loading to false
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    fetchAPI(); // Call the async function

        
    }, []);

    return (
        <>
            <div className='options'>
            </div>
            <section id='employeeList'>
                {Array.isArray(employees) && employees.map((employee) => {
                    return (
                        <EmployeeCard
                            key={`employee-${employee.id}`}
                            {...employee}
                            initialRole={employee.role}
                            setTeamLeads={setTeamLeads}
                            teamLeads={teamLeads}
                            employees={employees}
                        />
                    );
                })}
                <NewEmployee />
            </section>
        </>
    );
}

export default EmployeeList;
