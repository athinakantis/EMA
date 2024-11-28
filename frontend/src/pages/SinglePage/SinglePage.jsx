import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../Components/CustomComponents/Button/Button';
import { updateFormCheck, validateUpdateEmp } from '../../utils/validateInput';
import { useState, useEffect } from 'react';
import Spinner from '../../Components/Spinner/Spinner';
import './SinglePage.css';
import {
    getEmployee,
    updateEmployee,
    deleteEmployee,
} from '../../utils/requests';

function SinglePage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    const [remove, setRemove] = useState(false);
    const [verifyRemove, setVerifyRemove] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState({});

    // Delete employee
    useEffect(() => {
        const removeEmployee = async () => {
            try {
                if (verifyRemove) {
                    const response = await deleteEmployee(id);
                    navigate('/home/success', {
                        state: response.data,
                    });
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
                const employeeData = await getEmployee(id);
                setEmployee(employeeData);
                setFormData({
                    department: employeeData.department,
                    location: employeeData.location,
                    salary: employeeData.salary,
                    id: id,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchAPI();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
            if (updateFormCheck(formData, employee)) {
                return setEdit((prev) => !prev);
            }
            validateUpdateEmp({ ...formData });
            const response = updateEmployee(formData);
            navigate(`/home/success`, { state: response.data });
        } catch (err) {
            console.error(err);
            setMsg(err.message);
        }
    }

    if (loading) {
        return <Spinner />;
    }

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
                Back to list
            </button>
            <div id='employeeContainer'>
                <div className='employeeCard inspect'>
                    <div className='title'>
                        <h2>
                            {employee?.firstname} {employee?.lastname}
                        </h2>
                        {edit ? (
                            <Button
                                role='save'
                                handleClick={handleUpdateEmployee}
                                img={`${
                                    import.meta.env.VITE_REACT_URL
                                }/save_Icon.svg`}
                            />
                        ) : (
                            <Button
                                role='edit'
                                handleClick={() => setEdit((prev) => !prev)}
                                img={`${
                                    import.meta.env.VITE_REACT_URL
                                }/edit.svg`}
                                imgAlt='Edit'
                            />
                        )}
                    </div>
                    <div className='frame'>
                        <img
                            src={`https://robohash.org/${employee?.firstname}${employee?.lastname}.png?set=set5&size=175x175`}
                        />
                    </div>

                    {!remove ? (
                        <Button
                            text='Remove'
                            role='removeEmp'
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

                <div className='emDetails'>
                    <p>
                        Role <span>{employee?.role}</span>
                    </p>
                    <p>
                        Employment Type <span>{employee?.employment_type}</span>
                    </p>

                    <p>
                        Department
                        {renderInput('department', formData?.department)}
                    </p>
                    <p>
                        Location {renderInput('location', formData?.location)}
                    </p>
                    <p>Salary {renderInput('salary', formData?.salary)}</p>
                </div>

                {msg && <p className='error'>{msg}</p>}
            </div>
        </section>
    );
}

export default SinglePage;
