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
      props.setTeamLead('');
      setRole(props.role);
    } else if (props.teamLead && role !== 'Team Lead') {
      setMsg(`Error: ${props.teamLead} is currently team leader`);
      setTimeout(() => setMsg(''), 3000);
    } else if (!props.teamLead && role !== 'Team Lead') {
      props.setTeamLead(`${props.firstName} ${props.lastName}`);
      setRole('Team Lead');
    }
  }

  return (
    <div className='employeeCard'>
      <div className='title'>
        <p className='emName'>
          {props.firstName} {props.lastName}
        </p>
        <button
          id='changeRole'
          onClick={changeRole}
          type='button'
          className={role === props.role ? 'yay' : 'aww'}
        >
          {role === props.role ? 'Promote' : 'Demote'}
        </button>
      </div>
      <div className='frame'>
        {role === 'Team Lead' && (
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
        <p>{role}</p>
        <p>Department: {props.department}</p>
        <p>Salary: ${props.salary}</p>
        <p>Location: {props.location}</p>
        <p>
          Employed for 
          {yearsEmployed > 1
            ? ` ${yearsEmployed} years`
            : yearsEmployed === 1
            ? ` ${yearsEmployed} year`
            : yearsEmployed < 1 && ` ${monthsEmployed} months`}
        </p>
      </div>
      {msg && <p className='error'>{msg}</p>}
      {milestone && <button>Schedule recognition meeting</button>}
      {monthsEmployed < 6 && <button>Schedule probation review</button>}
    </div>
  );
}

export default EmployeeCard;
