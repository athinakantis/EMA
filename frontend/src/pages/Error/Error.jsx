import statuscodes from '../../data/statuscodes';
import './Error.css';
import { Link } from 'react-router-dom';

function Error({ status = 404 }) {
    const error = statuscodes.find((i) => i.status === status);

    return (
        <section id='errorPage'>
            <div id='errorContainer'>
                <img
                    src={`${
                        import.meta.env.VITE_REACT_URL
                    }/staffOverflow_logo.svg`}
                    alt='staffoverflow logo'
                    className='logo'
                />
                <h2>
                    {status} {error.message}
                </h2>
                <Link to='/'>Back home</Link>
            </div>
        </section>
    );
}

export default Error;
