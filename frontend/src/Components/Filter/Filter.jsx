import { useState } from 'react';
import Select from '../CustomComponents/Select/Select';
import './Filter.css';

function Filter({ employees, setSortedEmployees }) {
    const [filterGroup, setFilterGroup] = useState('');

    function handleFilterGroup(e) {
        const { value } = e.target;
        if (value !== 'Default') {
            setFilterGroup(value.toLowerCase());
        } else {
            setFilterGroup('');
            setSortedEmployees(
                employees.sort((a, b) => a.firstname.localeCompare(b.firstname))
            );
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
                <option value='Default'>Name</option>
                <option value='Location'>Location</option>
                <option value='Department'>Department</option>
                <option value='Salary'>Salary</option>
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
