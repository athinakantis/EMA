import axios from 'axios';

/* GET */
export async function getAllEmployees() {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/employees`
    );
    return response.data;
}

export async function getEmployeeRange(offset) {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/employees/range/${offset}`
    );
    return response.data;
}

export async function getEmployee(id) {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/employee/${id}`
    );
    return response.data[0];
}

export async function getEmployeeCount() {
    const employeeCount = await axios.get(
        `${import.meta.env.VITE_API_URL}/employeeCount`
    );
    return employeeCount.data;
}

export async function getFilteredCount(filter, value) {
    const employeeCount = await axios.get(
        `${import.meta.env.VITE_API_URL}/employeeCount/${filter}/${value}`
    );
    return employeeCount.data;
}

export async function getFilteredRange(filter, value, offset) {
    const employeeCount = await axios.get(
        `${import.meta.env.VITE_API_URL}/employees/${filter}/${value}/${offset}`
    );
    return employeeCount.data;
}

/* PATCH */
export function updateEmployee(formData) {
    return axios.patch(
        `${import.meta.env.VITE_API_URL}/employee/${formData.id}`,
        {
            data: {
                department: formData.department,
                location: formData.location,
                salary: formData.salary,
                id: formData.id,
            },
        }
    );
}

/* POST */
export function addNewEmployee(formData) {
    return axios.post(`${import.meta.env.VITE_API_URL}/add`, formData);
}

/* DELETE */
export function deleteEmployee(id) {
    return axios.delete(`${import.meta.env.VITE_API_URL}/employee/${id}`);
}
