import axios from 'axios';

/* GET */
export function getAllEmployees() {
    return axios.get(`${import.meta.env.VITE_API_URL}/employees`);
}

export function getEmployee(id) {
    return axios.get(`${import.meta.env.VITE_API_URL}/employee/${id}`);
}

export function getEmployeeCount() {
    return axios.get(`${import.meta.env.VITE_API_URL}/employeeCount`);
}

/* PUT */
export function updateEmployee(formData) {
    return axios.put(
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
