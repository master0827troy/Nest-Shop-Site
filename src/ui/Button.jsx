import './Button.css';

const Button = (props) => {
  let buttonClasses = 'button';

  buttonClasses += props.className ? ' ' + props.className: '';
  buttonClasses += props.noBg ? ' no-bg' : ' bg';

  return (
    <button className={buttonClasses} onClick={props.onClick} type={props.type ? props.type : 'button'}>
      {props.children}
      <span>{props.text}</span>
    </button>
  );
};

export default Button;