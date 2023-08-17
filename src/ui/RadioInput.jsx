import PropTypes from 'prop-types';
import './RadioInput.css';

const RadioInput = ({ list, active, setActive, name, className, children }) => {
  return (
    <div className={className ? className + ' radio-container' : 'radio-container'}>
      {
        list.map(item =>
          <div key={list.indexOf(item)} className='radio'>
            <div className='icon'>
              <span className={active === list.indexOf(item) ? 'text-orange-600' : 'text-black'} >
                {children}
              </span>
              <input type='radio' id={name + list.indexOf(item)} name={name} checked={active === list.indexOf(item)} onChange={() => setActive(list.indexOf(item))} />
            </div>
            <label
              htmlFor={name + list.indexOf(item)}
              onChange={() => setActive(list.indexOf(item))}
              className={active === list.indexOf(item) ? 'opacity-100' : 'opacity-70'}
            >
              {item.label}
            </label>
          </div>  
        )
      }
    </div>
  )
};

RadioInput.propTypes = {
  list: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired,
  setActive: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

export default RadioInput;