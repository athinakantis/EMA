import Select from '../CustomComponents/Select/Select';
import './Filter.css';

function Filter({ setFilter, setOffset, setFilterGroup, filterGroup }) {
    function handleFilterGroup(e) {
        const { value } = e.target;
        if (value !== 'Default') {
            setFilterGroup(value.toLowerCase());
        } else {
            setFilterGroup('Default');
            setFilter('Default');
        }
    }

    return (
        <div className='filterOptions'>
            <label htmlFor='filterGroup'>Filter by: </label>
            <select
                name='filterGroup'
                id='filterGroup'
                onChange={handleFilterGroup}
            >
                <option value='Default'>Name</option>
                <option value='Location'>Location</option>
                <option value='Department'>Department</option>
                <option value='Salary'>Salary</option>
            </select>
            {filterGroup !== 'Default' && (
                <Select
                    group={filterGroup}
                    setFilter={setFilter}
                    setOffset={setOffset}
                />
            )}
        </div>
    );
}

export default Filter;
