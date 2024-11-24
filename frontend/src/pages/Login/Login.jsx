import { Link } from 'react-router-dom';
import './Login.css';
import { useState } from 'react';

function Login({}) {
    const [user, setUser] = useState({});

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
                <Link to='/employees'>Log in</Link>
            </div>
        </section>
    );
}

export default Login;
