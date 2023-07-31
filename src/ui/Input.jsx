import { useRef, useState } from 'react';
import './Input.css';
import useEffectExceptFirstRender from '../hooks/useEffectExceptFirstRender';

const Input = (props) => {
  const [email, setEmail] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [containerClasses, setContainerClasses] = useState('input-container')

  const inputRef = useRef(null);

  useEffectExceptFirstRender(() => {
    setContainerClasses((isActive || email.length !== 0) ? 'input-container active' : 'input-container inactive');
  }, [isActive, email.length])

  const clickHandler = () => {
    setIsActive(true)
    inputRef.current.focus();
  };

  return (
    <div className={props.className ? containerClasses + ' ' + props.className : containerClasses}>
      <label className={props.bgColor ? props.bgColor : ''} htmlFor={props.id} onClick={clickHandler}>{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        ref={inputRef}
      />
      <div className={props.bgColor ? 'after ' + props.bgColor : 'after'} onClick={clickHandler}></div>
    </div>
  );
};

export default Input;