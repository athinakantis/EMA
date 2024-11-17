import { useState } from 'react';
import './EmployeeCard.css';
import Button from '../CustomComponents/Button/Button';
import { calcMonthsWorked, calcYearsWorked } from '../../utils/calcTimeWorked';

function EmployeeCard(props) {
    const {
        id,
        initialRole,
        firstname,
        lastname,
        employment_type,
        department,
        salary,
        startdate,
        location,
        teamLeads,
        setTeamLeads,
        employees,
    } = props;

    const [role, setRole] = useState(initialRole);
    const [msg, setMsg] = useState('');
    const [edit, setEdit] = useState(false);
    const [person, setPerson] = useState({
        department: department,
        location: location,
        salary: salary,
    });
    const deptTeamLead = teamLeads[person.department];

    let monthsEmployed;
    let yearsEmployed = calcYearsWorked(startdate);
    if (yearsEmployed < 1) {
        monthsEmployed = calcMonthsWorked(startdate);
    }

    function handleRoleChange() {
        if (deptTeamLead === id) {
            setTeamLeads({ ...teamLeads, [person.department]: '' });
            setRole(initialRole);
        } else if (deptTeamLead && deptTeamLead !== id) {
            setMsg(
                `Error: ${
                    employees.find((e) => e.id === deptTeamLead).firstName
                } is currently team leader`
            );
            setTimeout(() => setMsg(''), 3000);
        } else if (!deptTeamLead) {
            setMsg('');
            setTeamLeads({ ...teamLeads, [person.department]: id });
            setRole('Team Lead');
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setPerson((prev) => ({ ...prev, [name]: value }));
    }

    function renderInput(field, value) {
        return edit ? (
            <>
                <input
                    type='text'
                    name={field}
                    value={value}
                    onChange={(e) => handleChange(e)}
                />
            </>
        ) : (
            <span>{field === 'salary' ? `€${value}` : `${value}`}</span>
        );
    }

    return (
        <div className={`employeeCard ${person.department}`}>
            <div className='title'>
                <p className='emName'>
                    {firstname} {lastname}
                </p>
                <Button
                    role='secondary'
                    text={edit ? 'Save' : 'Edit'}
                    handleClick={() => setEdit((prev) => !prev)}
                />
            </div>
            <div className='frame'>
                <img
                    src={`https://robohash.org/${firstname}${lastname}.png?set=set5&size=175x175`}
                />
                {deptTeamLead === id && (
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='size-6'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                        />
                    </svg>
                )}
            </div>
            <div className='emDetails'>
                <p>
                    Role <span>{role}</span>
                </p>

                <p>
                    Employment type <span>{employment_type}</span>
                </p>

                <p>Department {renderInput('department', person.department)}</p>
                <p>Location {renderInput('location', person.location)}</p>
                <p>Salary {renderInput('salary', person.salary)}</p>

                <p>
                    Time employed
                    <span>
                        {yearsEmployed > 1
                            ? ` ${yearsEmployed} years`
                            : yearsEmployed === 1
                            ? ` ${yearsEmployed} year`
                            : yearsEmployed < 1 && ` ${monthsEmployed} months`}
                    </span>
                </p>
            </div>
            {msg && <p className='error'>{msg}</p>}
            <Button
                role='secondary'
                id='changeRole'
                handleClick={handleRoleChange}
                type='button'
                text={role === initialRole ? 'Promote' : 'Demote'}
                classes={role !== initialRole ? 'demote' : undefined}
            />
            {yearsEmployed % 5 === 0 && yearsEmployed > 1 && (
                <button className='schedule'>
                    Schedule recognition meeting
                </button>
            )}
            {monthsEmployed < 6 && (
                <button className='schedule'>Schedule probation review</button>
            )}
        </div>
    );
}

export default EmployeeCard;