import { useState } from 'react';
import './EmployeeCard.css';
import Button from '../CustomComponents/Button/Button';
import { calcMonthsWorked, calcYearsWorked } from '../../utils/calcTimeWorked';
import { useNavigate } from 'react-router-dom';

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
        handleNavigate,
    } = props;

    const [role, setRole] = useState(initialRole);
    const [msg, setMsg] = useState('');

    const [person, setPerson] = useState({
        department: department,
        location: location,
        salary: salary,
    });
    const deptTeamLead = teamLeads[person.department];
    const navigate = useNavigate();

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
                `Error: ${teamLeader.firstname} ${teamLeader.lastname} is currently team leader`
            );
            setTimeout(() => setMsg(''), 3000);
        } else if (!deptTeamLead) {
            setMsg('');
            setTeamLeads({ ...teamLeads, [person.department]: id });
            setRole('Team Lead');
        }
    }

    return (
        <div className={`employeeCard ${person.department}`}>
            <div className='title'>
                <p className='emName'>
                    {firstname} {lastname}
                </p>
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
                        className='size-6'
                    >
                        <path
                            fillRule='evenodd'
                            d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                            clipRule='evenodd'
                        />
                    </svg>
                )}
            </div>
            <div className='emDetails'>
                <p>
                    Role <span>{role}</span>
                </p>
                <p>
                    Time employed{' '}
                    <span>
                        {yearsEmployed > 1
                            ? `${yearsEmployed} years`
                            : yearsEmployed === 1
                            ? `${yearsEmployed} year`
                            : `${monthsEmployed} months`}{' '}
                    </span>
                </p>
            </div>
            {msg && <p className='error'>{msg}</p>}
            <div className='emOptions'>
                <Button
                    role='secondary'
                    id='changeRole'
                    handleClick={handleRoleChange}
                    type='button'
                    text={role === initialRole ? 'Promote' : 'Demote'}
                />
                <Button
                    text='See more'
                    role='primary'
                    handleClick={() => handleNavigate(id)}
                />
                {yearsEmployed % 5 === 0 && yearsEmployed > 1 && (
                    <Button
                        text='Schedule recognition meeting'
                        className='schedule recognition'
                    />
                )}
                {monthsEmployed < 6 && (
                    <Button
                        text='Schedule probation review'
                        className='schedule probation'
                    />
                )}
            </div>
        </div>
    );
}

export default EmployeeCard;
