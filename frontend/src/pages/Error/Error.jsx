import './Error.css';
import { Link } from 'react-router-dom';

function Error({ status = 404, message = 'Page not found' }) {

    return (
        <section id='errorPage'>
            <div
                id='errorContainer'
                className='statusContainer'
            >
                <img
                    src={`${
                        import.meta.env.VITE_REACT_URL
                    }/staffOverflow_logo.svg`}
                    alt='staffoverflow logo'
                    className='logo'
                />
                <h2>
                    {status} {message}
                </h2>
                <Link to='/'>Back home</Link>
            </div>
        </section>
    );
}

export default Error;
