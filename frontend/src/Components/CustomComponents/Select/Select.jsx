import { filterEmployees, filterSalary } from '../../../utils/filterEmployees';
import options from '../../../data/filters';
import './Select.css';

function Select({ group, setSortedEmployees, employees }) {
    const { data } = options[group];

    function handleFilterChange(e) {
        const { value } = e.target;
        if (value === 'Default') {
            setSortedEmployees(employees);
        } else if (group === 'salary') {
            setSortedEmployees(filterSalary(employees, value));
        } else {
            setSortedEmployees(filterEmployees(employees, group, value));
        }
    }

    return (
        <select
            onChange={(e) => handleFilterChange(e)}
            name='emFilter'
            id='emFilter'
        >
            <option value='Default'></option>
            {data.map((option, index) => (
                <option
                    key={index}
                    value={option}
                >
                    {option}
                </option>
            ))}
        </select>
    );
}

export default Select;
