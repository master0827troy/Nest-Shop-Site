import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = (props) => {
  const [isActive, setIsActive] = useState(null);
  const [placeholder, setPlaceholder] = useState(props.placeholder);
  const [counter, setCounter] = useState(0)
  const [operation, setOperation] = useState(null)

  const editPlaceholder = (value) => {
    setCounter(prevCounter => prevCounter + value);
    if(operation === 'delete') {
      setPlaceholder(prevPlaceholder => 
        prevPlaceholder.substr(0, (prevPlaceholder.length - value))
      );
    } else if(operation === 'write') {
      setPlaceholder(prevPlaceholder => 
        prevPlaceholder + props.placeholder.substr(prevPlaceholder.length, 1)
      );
    }
  }

  const focusHandler = () => {
    setIsActive(true)
    setOperation('delete')
  };

  const blurHandler = () => {
    setIsActive(false)
    setOperation('write')
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (operation === 'delete' && counter < props.placeholder.length) {
        editPlaceholder(1);
      } else if(operation === 'write' && counter > 0) {
        editPlaceholder(-1);
      }
    }, 60);

    return () => {
      clearTimeout(timer);
    };
  }, [counter, editPlaceholder, operation, props.placeholder.length]);

  let containerClasses = 'search-bar-container';
  containerClasses += isActive ? ' active' : '';
  containerClasses += props.containerClass ? ' ' + props.containerClass : '';

  const inputClasses = props.inputClass ? 'search-bar' + ' ' + props.inputClass : 'search-bar';

  return (
    <form className={containerClasses}>
      <input 
        type="text" 
        id="search"
        placeholder={placeholder}
        className={inputClasses}
        value={props.value}
        onChange={(e) => props.onSearch(e)}
        onFocus={focusHandler}
        onBlur={blurHandler}
      />
      <div className='icon-container' onClick={props.onIconClick ? props.onIconClick : () => {}}>
        <FaSearch className='icon'/>
      </div>
    </form>
  );
};
export default SearchBar;