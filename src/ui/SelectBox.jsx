import { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';

const SelectBox = (props) => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => {
    setIsOpen(prevState => !prevState);
  };

  const changeHandler = (item) => {
    props.onSelect(item);
    setIsOpen(false);
  };

  const divClasses = 'flex flex-row items-center justify-between gap-3 rounded-sm py-0.5 pl-5 pr-2 text-xl cursor-pointer overflow-hidden transition duration-700 hover:shadow-md hover:shadow-slate-200';
  const iconClasses = 'text-lg text-slate-900 transition duration-700';
  let ulClasses = 'absolute z-50 w-full bg-white mt-3 text-lg shadow-slate-100 opacity-0 transition duration-700';
  const liClasses = 'py-1 pl-5 text-slate-900 select-none transition-all duration-700';

  const [visibility, setVisibility] = useState('invisible')

  if (visibility == 'invisible') {
    ulClasses += ' invisible';
  }

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setVisibility('invisible');
      }, 700);
    
      return () => {
        clearTimeout(timeout);
      }
    } else {
      setVisibility('');
    }
  }, [isOpen])
  

  return (
    <div className='w-full relative tracking-wide'>
      <div className={isOpen ? divClasses + ' shadow-md shadow-slate-200' : divClasses} onClick={toggleHandler}>
        <span className='select-none'>{props.selected.text}</span>
        <IoIosArrowDown className={isOpen ? iconClasses + ' rotate-180' : iconClasses} />
      </div>

      <ul className={isOpen ? ulClasses + ' !shadow-md !shadow-slate-300 !opacity-100' : ulClasses}>
        {
          props.list.filter(listItem => listItem.id !== props.selected.id).map(listItem => 
            <li key={listItem.id} className={isOpen ? liClasses + ' opacity-100 cursor-pointer hover:bg-orange-500 hover:text-white' : liClasses} onClick={isOpen ? () => changeHandler(listItem) : () => {}}>{listItem.text}</li>
          )
        }
      </ul>
    </div>
  )
}

export default SelectBox