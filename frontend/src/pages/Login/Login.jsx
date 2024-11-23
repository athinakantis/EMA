import { Link } from 'react-router-dom';
import './Login.css';

function Login({}) {
  return (
    <div id='logInPage'>
      <button className='logInBtn'>
        <Link to='/employees'>Log in</Link>
      </button>
    </div>
  );
}

export default Login;
