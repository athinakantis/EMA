import { useState } from 'react';
import './EmployeeCard.css';

function EmployeeCard(props) {
  const [role, setRole] = useState(props.role);
  const [msg, setMsg] = useState('');
  const currentDate = new Date();
  const startDate = new Date(props.startDate);

  let yearsEmployed = currentDate.getFullYear() - startDate.getFullYear();
  let monthsEmployed, milestone;
  if (yearsEmployed === 0) {
    monthsEmployed = currentDate.getMonth() - startDate.getMonth();
  }

  if (yearsEmployed % 5 === 0 && yearsEmployed !== 0) {
    milestone = true;
  }

  function changeRole() {
    if (role === 'Team Lead') {
      props.setTeamLead('')
      setRole(props.role)
    } else if (props.teamLead && role !== 'Team Lead') {
      setMsg(`${props.teamLead} is currently team leader`);
    } else if (!props.teamLead && role !== 'Team Lead') {
      props.setTeamLead(`${props.firstName} ${props.lastName}`);
      setRole('Team Lead')
    }
  }

  return (
    <div className='employeeCard'>
      <p className='emName'>
        {props.firstName} {props.lastName}
      </p>
      <div className='frame'>
        {role === 'Team Lead' && (
          <svg
            className='star'
            xmlns='http://www.w3.org/2000/svg'
            height='32px'
            viewBox='0 -960 960 960'
            width='32px'
            fill='#000'
          >
            <path d='m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z' />
          </svg>
        )}
      </div>
      <div className='emDetails'>
        <p>{role}</p>
        <p>Department: {props.department}</p>
        <p>Salary: ${props.salary}</p>
        <p>Location: {props.location}</p>
        <p>
          Employed for{' '}
          {yearsEmployed > 1
            ? `${yearsEmployed} years`
            : yearsEmployed === 1
            ? `${yearsEmployed} year`
            : yearsEmployed < 1 && `${monthsEmployed} months`}
        </p>
      </div>
      {msg && <p>{msg}</p>}
      {milestone && <button>Schedule recognition meeting</button>}
      {monthsEmployed < 6 && <button>Schedule probation review</button>}
      <button
        id='changeRole'
        onClick={changeRole}
        type='button'
        className={role === props.role ? 'yay' : 'aww'}
      >
        {role === props.role ? 'Promote' : 'Demote'}
      </button>
    </div>
  );
}

export default EmployeeCard;
