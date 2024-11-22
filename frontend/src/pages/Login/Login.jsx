import { Link } from 'react-router-dom';
import './Login.css';

function Login({}) {
  return (
    <>
      <button className='logInBtn'>
        <Link to='/employees'>Log in</Link>
      </button>
    </>
  );
}

export default Login;
