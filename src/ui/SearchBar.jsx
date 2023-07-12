import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = (props) => {
  const [isActive, setIsActive] = useState(null);
  
  let inputClasses = 'w-full text-black border-none outline-none py-1.5 pl-6 pr-0 rounded-md transition-all duration-700';

  if (props.className) {
    inputClasses += ' ' + props.className;
  }

  if (isActive) {
    inputClasses += ' ' + '!pl-0 !pr-6 !border-orange-600';
  }

  let iconClasses = 'absolute top-1/2 transition-all duration-700 -translate-y-1/2 right-full left-0';

  if (isActive) {
    iconClasses += ' left-[93%] right-0';
  } else if (isActive === false) {
    iconClasses += ' right-full left-0';
  }

  const [placeholder, setPlaceholder] = useState(props.placeholder);
  const [counter, setCounter] = useState(0)
  const [op, setOp] = useState(null)

  const editPlaceholder = (value) => {
    if(placeholder.length >= 0 || placeholder.length <= props.placeholder.length){
      setCounter(prevCounter => prevCounter + value);
      if(op === 'inc') {
        setPlaceholder(prevPlaceholder => 
          prevPlaceholder.substr(0, (prevPlaceholder.length - value))
        );
      } else if(op === 'dec') {
        setPlaceholder(prevPlaceholder => 
          prevPlaceholder + props.placeholder.substr(prevPlaceholder.length, 1)
        );
      }
    }
  }

  const focusHandler = () => {
    setIsActive(true)
    setOp('inc')
  };

  const blurHandler = () => {
    setIsActive(false)
    setOp('dec')
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      if (op === 'inc' && counter < props.placeholder.length) {
        editPlaceholder(1);
      } else if(op === 'dec' && counter > 0) {
        editPlaceholder(-1);
      }
      return;
    }, 60);

    return () => {
      clearTimeout(timer);
    };
  }), [op];

  return (
    <div className='relative  '>
      <input 
        type="text" 
        id="search" 
        placeholder={placeholder}
        className={inputClasses}
        onChange={(e) => props.onChange(e)}
        onFocus={focusHandler}
        onBlur={blurHandler}
      />
      <div className={iconClasses}>
        <FaSearch className={
          isActive ? 
          'cursor-pointer transition duration-700 text-orange-500 hover:scale-125'
          :
          'cursor-pointer transition duration-700 text-gray-500 hover:scale-125'
        }/>
      </div>
    </div>
  );
};
export default SearchBar;
