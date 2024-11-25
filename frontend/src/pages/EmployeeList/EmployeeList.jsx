import { useState, useEffect } from 'react';
import EmployeeCard from '../../Components/EmployeeCard/EmployeeCard';
import './EmployeeList.css';
import Filter from '../../Components/Filter/Filter';
import NewEmployee from '../../Components/NewEmployee/NewEmployee';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [sortedEmployees, setSortedEmployees] = useState([]);
    const navigate = useNavigate();

    function handleNavigate(id) {
        navigate(`/home/employees/${id}`);
    }

    const [teamLeads, setTeamLeads] = useState({
        IT: '',
        Marketing: '',
        Admin: '',
        Finance: '',
    });

    // Effect to fetch employee data from backend
    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/employees`
                );
                setEmployees(response.data);
                setSortedEmployees(
                    response.data.sort((a, b) =>
                        a.firstname.localeCompare(b.firstname)
                    )
                );
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchAPI();
    }, []);

    return (
        <section id='list'>
            {employees.length < 1 ? (
                <div>
                    <p>There doesn't seem to be any employees currently!</p>
                </div>
            ) : (
                <>
                    <Filter
                        employees={employees}
                        setSortedEmployees={setSortedEmployees}
                    />
                    <div id='employeeList'>
                        {Array.isArray(sortedEmployees) &&
                            sortedEmployees.map((employee) => {
                                return (
                                    <EmployeeCard
                                        key={`employee-${employee.id}`}
                                        {...employee}
                                        initialRole={employee.role}
                                        setTeamLeads={setTeamLeads}
                                        teamLeads={teamLeads}
                                        employees={employees}
                                        handleNavigate={handleNavigate}
                                    />
                                );
                            })}
                        <NewEmployee />
                    </div>
                </>
            )}
        </section>
    );
}

export default EmployeeList;
