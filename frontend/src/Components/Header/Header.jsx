import './Header.css';
import { NavLink } from 'react-router-dom';

function Header() {
    function toggleMenu() {}
    return (
        <header>
            <NavLink to='/employees'>
                <img
                    src='../../src/assets/staffOverflow_logo.svg'
                    alt='Image of staffoverflow logo'
                />
            </NavLink>

            <nav>
                <ul>
                    <li>
                        <NavLink to='/home/employees'>Employees</NavLink>
                    </li>
                    <li>
                        <NavLink to='/home/add'>Add employee</NavLink>
                    </li>
                    <li>
                        <NavLink to='/'>Log out</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
