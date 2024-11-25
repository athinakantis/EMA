import { useParams, useNavigate } from 'react-router-dom';
import Button from '../Components/CustomComponents/Button/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './SinglePage.css';

function SinglePage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState();

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/employees`
                );
                const employees = response.data;
                const employee = employees.find((i) => i.id == +id);
                setEmployee(employee);
                console.log(employee);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchAPI();
    }, []);

    return (
        <div className='employeeCard inspect'>
            <h2>Single Page for</h2>
            <div className='frame'>
                <img
                    src={`https://robohash.org/${employee?.firstname}${employee?.lastname}.png?set=set5&size=175x175`}
                />
            </div>
            <p>Name: {employee?.firstname}</p>
            <p>Department: {employee?.department}</p>
            <p>Role: {employee?.role}</p>
            <Button text='Back to list' handleClick={() => navigate(-1)}>
                Back
            </Button>
        </div>
    );
}

export default SinglePage;
