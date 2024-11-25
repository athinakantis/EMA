import './Button.css';

function Button({
    text,
    handleClick,
    type = 'button',
    role = 'primary',
    classes = 'btn',
}) {
    return (
        <button
            className={`btn ${role}`}
            type={type}
            onClick={handleClick}
        >
            {text}
        </button>
    );
}

export default Button;
