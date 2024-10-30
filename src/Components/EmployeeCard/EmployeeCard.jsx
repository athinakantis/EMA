import { useState } from 'react';
import './EmployeeCard.css';

function EmployeeCard(props) {
  const [role, setRole] = useState(props.initialRole);

  function changeRole() {
    role === props.initialRole ? setRole('CEO') : setRole(props.initialRole);
  }

  return (
    <div className='employeeCard'>
      <p className='emName'>{props.fullName}</p>
      <div className='frame'></div>
      <div className='emDetails'>
        <p>Role: {role}</p>
        <p>Department: {props.department}</p>
        <p>Salary: ${props.salary}</p>
        <p>Location: {props.location}</p>
      </div>
      <button 
      onClick={changeRole} 
      type='button'
      className={role === props.initialRole ? 'yay' : 'aww'}
      >
        {role === props.initialRole ? 'Promote' : 'Demote'}
      </button>
    </div>
  );
}

export default EmployeeCard;
