export function calcYearsWorked(date) {
    const currentDate = new Date();
    const startDate = new Date(date);
    return currentDate.getFullYear() - startDate.getFullYear();
}

export function calcMonthsWorked(date) {
    const currentDate = new Date();
    const startDate = new Date(date);
    return currentDate.getMonth() - startDate.getMonth();
}