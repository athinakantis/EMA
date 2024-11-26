import { useLocation, useNavigate } from 'react-router-dom';
import './Menu.css';
import Button from '../../Components/CustomComponents/Button/Button';
import { useState } from 'react';

function Menu() {
    const location = useLocation();
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const navigate = useNavigate();

    return (
        <section id='menuPage'>
            <div className='welcomePrompt'>
                <h2>Welcome @{username}!</h2>
                <p>What do you want to do?</p>
            </div>
            <div className='suggestions'>
                <Button
                    role='suggestion'
                    text='Remove an employee'
                    handleClick={() => navigate('/home/employees')}
                />
                <Button
                    role='suggestion'
                    text='View employees'
                    handleClick={() => navigate('/home/employees')}
                />
                <Button
                    role='suggestion'
                    text='Add employee'
                    handleClick={() => navigate('/home/add')}
                />
            </div>
        </section>
    );
}

export default Menu;
