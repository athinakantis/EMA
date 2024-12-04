import { useState, useEffect, useRef } from 'react';
import EmployeeCard from '../../Components/EmployeeCard/EmployeeCard';
import Filter from '../../Components/Filter/Filter';
import Button from '../../Components/CustomComponents/Button/Button';
import { useNavigate } from 'react-router-dom';
import { calcListPages } from '../../utils/calc';
import {
    getFilteredCount,
    getFilteredRange,
    getEmployeeCount,
    getEmployeeRange,
} from '../../utils/requests';
import './EmployeeList.css';
import { Link } from 'react-router-dom';

function EmployeeList() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const totalPages = useRef(0);
    const [filter, setFilter] = useState('Default');
    const [filterGroup, setFilterGroup] = useState('Default');
    const [teamLeads, setTeamLeads] = useState({});

    function handleNavigate(id) {
        navigate(`/home/employees/${id}`);
    }

    // Effect to fetch teamleads (2 default teamleads)
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/teamleads`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                data.map((department) => {
                    setTeamLeads((prev) => ({
                        ...prev,
                        [department.departmentId]: {
                            employeeId: department.employeeId,
                            employeeName: `${department.firstname} ${department.lastname}`,
                        },
                    }));
                });
            });
    }, []);

    useEffect(() => {
        console.log(teamLeads);
    }, [teamLeads]);

    // Effect to fetch employee data from backend
    useEffect(() => {
        const getEmployees = async () => {
            try {
                totalPages.current = calcListPages(await getEmployeeCount());
                setEmployees(await getEmployeeRange(offset));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        const getFilteredEmployees = async () => {
            try {
                totalPages.current = calcListPages(
                    await getFilteredCount(filterGroup, filter)
                );
                setEmployees(
                    await getFilteredRange(filterGroup, filter, offset)
                );
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        if (filter !== 'Default') {
            getFilteredEmployees();
        } else {
            getEmployees();
        }
    }, [offset, filter]);

    return (
        <section id='list'>
            {employees?.length < 1 ? (
                <div id='emptyList'>
                    <p>Employee list is currently empty!</p>
                    <Link to='/home/add'>Add employees</Link>
                </div>
            ) : (
                <>
                    <Filter
                        employees={employees}
                        setFilter={setFilter}
                        setOffset={setOffset}
                        setFilterGroup={setFilterGroup}
                        filterGroup={filterGroup}
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
                                            teamLeads={teamLeads}
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
