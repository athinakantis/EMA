import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../Components/CustomComponents/Button/Button';
import { validateUpdateEmp } from '../../utils/validateInput';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './SinglePage.css';

function SinglePage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    const [remove, setRemove] = useState(false);
    const [verifyRemove, setVerifyRemove] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');

    // Delete employee
    useEffect(() => {
        const removeEmployee = async () => {
            try {
                if (verifyRemove) {
                    const response = await axios.delete(
                        `${import.meta.env.VITE_API_URL}/employee/${id}`
                    );
                    navigate('/home/success', { state: response });
                }
            } catch (err) {
                console.error(err);
            }
        };

        removeEmployee();
    }, [verifyRemove]);

    // Get employee
    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/employee/${id}`
                );
                setEmployee(response.data[0]);
                console.log(response.data[0]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchAPI();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    }

    function renderInput(field, value) {
        return edit ? (
            <>
                <input
                    type='text'
                    name={field}
                    value={value}
                    onChange={handleChange}
                />
            </>
        ) : (
            <span className={field}>{value}</span>
        );
    }

    function handleRemove() {
        setVerifyRemove(true);
    }

    async function handleUpdateEmployee() {
        try {
            await validateUpdateEmp({ ...employee });
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/employee/${id}`,
                {
                    data: {
                        department: employee.department,
                        location: employee.location,
                        salary: employee.salary,
                        id: id,
                    },
                }
            );
            navigate(`/home/success`, { state: response.data });
        } catch (err) {
            console.error(err);
            setMsg(err.message);
        }
    }

    if (loading) {
        return (
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='1em'
                height='1em'
                viewBox='0 0 24 24'
            >
                <path
                    fill='currentColor'
                    d='M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z'
                >
                    <animateTransform
                        attributeName='transform'
                        dur='0.75s'
                        repeatCount='indefinite'
                        type='rotate'
                        values='0 12 12;360 12 12'
                    />
                </path>
            </svg>
        );
    }

    return (
        <section id='inspectEmployee'>
            <button className='btn return' onClick={() => navigate(-1)}>
                <img
                    src={`${import.meta.env.VITE_REACT_URL}/returnIcon.svg`}
                    alt='Return icon'
                />
                Back to list
            </button>
            <div className='employeeCard inspect'>
                <div className='title'>
                    <h2>
                        {employee?.firstname} {employee?.lastname}
                    </h2>
                    <Button
                        role='secondary edit'
                        handleClick={
                            edit
                                ? handleUpdateEmployee
                                : () => setEdit((prev) => !prev)
                        }
                        img={`${import.meta.env.VITE_REACT_URL}/edit.svg`}
                        imgAlt='Edit'
                    />
                </div>
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
                        Department
                        {renderInput('department', employee?.department)}
                    </p>
                    <p>
                        Location {renderInput('location', employee?.location)}
                    </p>
                    <p>Salary {renderInput('salary', employee?.salary)}</p>
                </div>

                {msg && <p className='error'>{msg}</p>}

                {!remove ? (
                    <Button text='Remove' handleClick={() => setRemove(true)} />
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
