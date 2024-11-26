import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/CustomComponents/Button/Button';

function Login({}) {
    const [user, setUser] = useState({
        username: 'admin',
        password: 'unicorn',
    });
    const navigate = useNavigate();

    function handleUser(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    function handleNavigate() {
        localStorage.setItem('username', user.username);
        navigate('/home');
    }

    return (
        <section id='logInPage'>
                <img src={`${import.meta.env.VITE_REACT_URL}/staffOverflow_logo.svg`} alt="Staffoverflow Logo" />
            <div id='loginContainer'>
                <h2>Log in</h2>
                <form>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            name='username'
                            id='username'
                            value={user.username}
                            onChange={handleUser}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>

                        <input
                            type='password'
                            name='password'
                            id='password'
                            value={user.password}
                            onChange={handleUser}
                        />
                    </div>
                </form>
                <Button
                    text='Login'
                    handleClick={handleNavigate}
                />
            </div>
        </section>
    );
}

export default Login;
