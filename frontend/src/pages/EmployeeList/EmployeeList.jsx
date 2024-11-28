import { useState, useEffect } from 'react';
import EmployeeCard from '../../Components/EmployeeCard/EmployeeCard';
import './EmployeeList.css';
import Filter from '../../Components/Filter/Filter';
import NewEmployee from '../../Components/NewEmployee/NewEmployee';
import { useNavigate } from 'react-router-dom';
import { getAllEmployees, employeeCount } from '../../utils/requests';
import { sortByName } from '../../utils/filterEmployees';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [sortedEmployees, setSortedEmployees] = useState([]);
    const [offset, setOffset] = useState(0);
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
        const getAll = async () => {
            try {
                const employeeCount = employeeCount();
                console.log(employeeCount);
                const response = await getAllEmployees();
                setEmployees(response.data);
                setSortedEmployees(sortByName(response.data));
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        getAll();
    }, [offset]);

    return (
        <section id='list'>
            {employees?.length < 1 ? (
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
                                        key={employee?.id}
                                        {...employee}
                                        initialRole={employee?.role}
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
