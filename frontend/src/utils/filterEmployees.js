export function filterEmployees(employees, filterGroup, filter) {
    return employees.filter((employee) => employee[filterGroup] === filter);
}

export function filterSalary(employees, order) {
    return order.startsWith('Asc')
        ? employees.toSorted((a, b) => a.salary - b.salary)
        : employees.toSorted((a, b) => a.salary - b.salary).reverse();
}
