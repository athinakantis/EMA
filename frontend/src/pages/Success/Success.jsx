import { useLocation } from "react-router-dom";
import './Success.css'

function Success() {
    const location = useLocation()
    const {status, message} = location.state

    return (
        <section id='successPage'>
            <div className='statusContainer success'>
                <img src={`${import.meta.env.VITE_REACT_URL}/success_Icon.svg`} alt="Success Icon" />
                <div>

                <h2>Success</h2>
                <p>{message}</p>
                </div>
            </div>
        </section>
    );
}

export default Success;
