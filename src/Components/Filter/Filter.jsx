import { useState } from 'react';
import Select from '../CustomComponents/Select/Select';
import './Filter.css'

function Filter({ employees, setSortedEmployees }) {
    const [filterGroup, setFilterGroup] = useState('');

    function handleFilterGroup(e) {
        if (e.target.value !== 'Default') {
            setFilterGroup(e.target.value);
        } else {
            setFilterGroup('');
            setSortedEmployees(employees.sort((a, b) => a.department.localeCompare(b.department)))
        }
    }

    return (
        <div className='filterOptions'>
            <label htmlFor='filterGroup'>Filter by: </label>
            <select
                name='filterGroup'
                id='filterGroup'
                onChange={(e) => handleFilterGroup(e)}
            >
                <option value='Default'>---</option>
                <option value='location'>Location</option>
                <option value='department'>Department</option>
                <option value='salary'>Salary</option>
            </select>
            {filterGroup && (
                <Select
                    group={filterGroup}
                    setSortedEmployees={setSortedEmployees}
                    employees={employees}
                />
            )}
        </div>
    );
}

export default Filter;
