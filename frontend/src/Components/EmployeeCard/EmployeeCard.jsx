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
            const teamLeader = employees.find((e) => e.id == deptTeamLead);
            setMsg(
                `Error: ${
                    teamLeader.firstname + ' ' + teamLeader.lastname
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
                        viewBox='0 0 24 24'
                        fill='#f48023'
                        class='size-6'
                    >
                        <path
                            fill-rule='evenodd'
                            d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                            clip-rule='evenodd'
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
