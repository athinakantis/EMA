import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../Components/CustomComponents/Button/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './SinglePage.css';

function SinglePage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState();
    const [remove, setRemove] = useState(false);
    const [verifyRemove, setVerifyRemove] = useState(false);

    function handleRemove() {
        setVerifyRemove(true);
    }

    useEffect(() => {
        const removeEmployee = async () => {
            try {
                if (verifyRemove) {
                    const response = await axios.delete(
                        `${import.meta.env.VITE_API_URL}/employee/${id}`
                    );
                }
            } catch (err) {
                console.error(err);
            }
        };

        removeEmployee();
    }, [verifyRemove]);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/employee/${id}`
                );
                setEmployee(response.data[0]);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchAPI();
    }, []);

    return (
        <section id='inspectEmployee'>
            <button
                className='btn return'
                onClick={() => navigate(-1)}
            >
                <img
                    src={`${import.meta.env.VITE_REACT_URL}/returnIcon.svg`}
                    alt='Return icon'
                />
                Back to overview
            </button>
            <div className='employeeCard inspect'>
                <h2>
                    {employee?.firstname} {employee?.lastname}
                </h2>
                <div className='frame'>
                    <img
                        src={`https://robohash.org/${employee?.firstname}${employee?.lastname}.png?set=set5&size=175x175`}
                    />
                </div>
                <div className='emDetails'>
                    <p>
                        Role <span>{employee?.role}</span>
                    </p>

                    <p>
                        Employment type <span>{employee?.employment_type}</span>
                    </p>

                    <p>
                        Department <span>{employee?.department}</span>
                    </p>
                    <p>
                        Location <span>{employee?.location}</span>
                    </p>
                    <p>
                        Salary{' '}
                        <span className='salary'>{employee?.salary}</span>
                    </p>
                </div>

                {!remove ? (
                    <Button
                        text='Remove'
                        handleClick={() => setRemove(true)}
                    />
                ) : (
                    <div className='removeContainer'>
                        <p className='removeWarning'>
                            Are you sure you want to remove{' '}
                            {employee?.firstname} {employee?.lastname}? This
                            action is irreversible!
                        </p>

                        <div className='warningContainer'>
                            <Button
                                role='warningReturn'
                                text='No, go back ✘'
                                handleClick={() => setRemove(false)}
                            />
                            <Button
                                role='confirm'
                                text='Yes, remove ✔'
                                handleClick={() => handleRemove(id)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default SinglePage;
