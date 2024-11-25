import './Button.css';

function Button({
    text,
    handleClick,
    type = 'button',
    role = 'primary',
    classes = 'default',
}) {
    return (
        <button
            className={classes}
            role={role}
            type={type}
            onClick={handleClick}
        >
            {text}
        </button>
    );
}

export default Button;
