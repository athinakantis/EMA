import { useState, useEffect, useRef } from 'react';
import EmployeeCard from '../../Components/EmployeeCard/EmployeeCard';
import Filter from '../../Components/Filter/Filter';
import Button from '../../Components/CustomComponents/Button/Button';
import NewEmployee from '../../Components/NewEmployee/NewEmployee';
import { useNavigate } from 'react-router-dom';
import { calcListPages } from '../../utils/calc';
import {
    getAllEmployees,
    getEmployeeCount,
    getEmployeeRange,
} from '../../utils/requests';
import './EmployeeList.css';

function EmployeeList() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [sortedEmployees, setSortedEmployees] = useState([]);
    const [offset, setOffset] = useState(0);
    const [page, setPage] = useState(1);
    const totalPages = useRef(0);

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
                totalPages.current = calcListPages(await getEmployeeCount());
                setEmployees(await getEmployeeRange(offset));
                setSortedEmployees(await getAllEmployees());
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
                    <div className='listContainer'>
                        <div id='employeeList'>
                            {Array.isArray(employees) &&
                                employees.map((employee) => {
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
                            <div className='newEmployeeCard addNew'>
                                <button onClick={() => navigate('/home/add')}>
                                    <img
                                        src={`${
                                            import.meta.env.VITE_REACT_URL
                                        }/add_icon.svg`}
                                        alt='Add employee Icon'
                                    />
                                </button>
                                <p>Add new employee</p>
                            </div>
                        </div>
                        <div className='pageNavigation'>
                            {page > 1 && (
                                <Button
                                    role='prevPage'
                                    text='Previous page'
                                    handleClick={() => {
                                        setPage((prev) => prev - 1);
                                        setOffset((prev) => prev - 8);
                                    }}
                                    img={`${
                                        import.meta.env.VITE_REACT_URL
                                    }/arrowBack.svg`}
                                />
                            )}
                            {page < totalPages.current && (
                                <Button
                                    role='nextPage'
                                    handleClick={() => {
                                        setPage((prev) => prev + 1);
                                        setOffset((prev) => prev + 8);
                                    }}
                                    img={`${
                                        import.meta.env.VITE_REACT_URL
                                    }/arrowNext.svg`}
                                    text='Next page'
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}

export default EmployeeList;
