function filterEmployees(employees, filterGroup, filter) {
    console.log(filterGroup, filter)
    return employees.filter(employee => employee[filterGroup] === filter)
}

export default filterEmployees