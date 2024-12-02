import { useLocation, useNavigate } from 'react-router-dom';
import './Success.css';
import { useEffect } from 'react';

function Success() {
    const location = useLocation();
    const navigate = useNavigate();
    const { message, id } = location.state;

    useEffect(() => {
        setTimeout(() => navigate('/home/employees'), 3000);
    }, []);

    return (
        <section id='successPage'>
            <div className='statusContainer success'>
                <img
                    src={`${import.meta.env.VITE_REACT_URL}/success_Icon.svg`}
                    alt='Success Icon'
                />
                <div>
                    <h2>Success</h2>
                    <p>{message}</p>
                </div>
            </div>
        </section>
    );
}

export default Success;
