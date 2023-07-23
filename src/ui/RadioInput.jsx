import './RadioInput.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

const RadioInput = (props) => {
  const [active, setActive] = useState(props.list[0].id)

  return (
    <div className={props.className ? props.className + ' radio-container' : 'radio-container'}>
      {
        props.list.map(item =>
          <div key={item.id} className='radio'>
            <div className='icon'>
              <span className={active === item.id ? 'text-orange-600' : 'text-black'} >
                {props.children}
              </span>
              <input type='radio' id={props.name + item.id} name={props.name} checked={active === item.id} onChange={() => setActive(item.id)} />
            </div>
            <label htmlFor={props.name + item.id} onChange={() => setActive(item.id)} className={active === item.id ? 'opacity-100' : 'opacity-70'}>{item.value}</label>
          </div>  
        )
      }
    </div>
  )
};

RadioInput.propTypes = {
  list: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

export default RadioInput;