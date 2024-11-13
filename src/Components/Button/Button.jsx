import './Button.css'

function Button({ text, handleClick, type = 'button', role = 'primary' }) {
    return <button  role={role} type={type} onClick={handleClick}>{text}</button>;
}

export default Button;
