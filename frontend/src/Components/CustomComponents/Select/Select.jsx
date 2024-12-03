import options from '../../../data/filters';
import './Select.css';

function Select({ group, setFilter, setOffset }) {
    const { data } = options[group];

    function handleFilterChange(e) {
        const { value } = e.target;
        setFilter(value);
        setOffset(0);
    }

    return (
        <select
            onChange={handleFilterChange}
            name='emFilter'
            id='emFilter'
        >
            <option value='Default'></option>
            {data.map((option) => (
                <option
                    key={option.id}
                    value={option}
                >
                    {option}
                </option>
            ))}
        </select>
    );
}

export default Select;
