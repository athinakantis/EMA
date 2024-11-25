import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/CustomComponents/Button/Button';

function Login({}) {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    function handleUser(e) {
        const { username, password } = e.target;
        setUser({ username: username, password: password });
    }

    return (
        <section id='logInPage'>
            <div id='loginContainer'>
                <h2>Log in</h2>
                <form>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            name='username'
                            id='username'
                            value='admin'
                            onChange={handleUser}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>

                        <input
                            type='password'
                            name='password'
                            id='password'
                            onChange={handleUser}
                        />
                    </div>
                </form>
                <Button
                    text='Login'
                    handleClick={() => navigate('/home/employees')}
                />
            </div>
        </section>
    );
}

export default Login;
