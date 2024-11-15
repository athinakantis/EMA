import options from '../data/filters';
import filterEmployees from '../utils/filterEmployees';

function Select({ group, setSortedEmployees, employees }) {
    const { data } = options[group];

    function handleFilterChange(e) {
        const {value} = e.target 
        if (value !== 'Default') {
            setSortedEmployees(filterEmployees(employees, group, value));
        } else {
            setSortedEmployees(employees)
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
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default Select;
