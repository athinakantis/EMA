import './Header.css';
import '../../assets/Logo.svg';
import { Link } from 'react-router-dom';

function Header() {
    function toggleMenu() {}
    return (
        <header>
            <Link to='/employees'>
                <img
                    src='../../src/assets/staffOverflow_logo.svg'
                    alt='Image of staffoverflow logo'
                />
            </Link>

            <nav>
                <ul>
                    <li>
                        <Link to='/employees'>Employees</Link>
                    </li>
                    <li>
                        <Link to='/new'>Add employee</Link>
                    </li>
                    <li>
                        <Link to='/'>Log out</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
