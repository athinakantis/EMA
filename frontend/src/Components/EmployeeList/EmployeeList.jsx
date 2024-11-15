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
    
    const [testData, setTestData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [teamLeads, setTeamLeads] = useState({
        IT: '',
        Marketing: '',
        Admin: '',
        Finance: '',
    });

    useEffect(() => {
        // axios
        //     .get(`${import.meta.env.REACT_APP_API_URL}/api/employees`)
        //     .then((response) => {
        //         setTestData(response.data);
        //         console.log(response);
        //     })
        //     .catch((error) => console.error('Error fetching data: ', error));
        const fetchAPI = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/employees`);
            setTestData(response.data); // Set the fetched data
            setIsLoading(false); // Set loading to false
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    fetchAPI(); // Call the async function

        
    }, []);

    console.log(testData)

    return (
        <>
            <div className='options'>
                <Filter
                    employees={employees}
                    setSortedEmployees={setSortedEmployees}
                />
            </div>
            <section id='employeeList'>
                {Array.isArray(testData) && testData.map((employee) => {
                    return (
                        <EmployeeCard
                            key={`employee-${employee.id}`}
                            {...employee}
                            initialRole={employee.role}
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
