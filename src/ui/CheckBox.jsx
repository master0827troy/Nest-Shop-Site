import { FiCheck } from 'react-icons/fi';

import './Checkbox.css';

const CheckBox = (props) => {
  const toggleHandler = () => {
    props.onToggle();
  };

  return (
    <div className='checkbox' onClick={toggleHandler}>
      <div className={props.isChecked ? 'icon-container checked' : 'icon-container'}>
        <FiCheck className='icon' />
      </div>
      <span className='text whitespace-nowrap'>{props.text}</span>
    </div>
  )
}

export default CheckBox