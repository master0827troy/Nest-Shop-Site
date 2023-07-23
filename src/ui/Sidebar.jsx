import {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { RiCloseLine } from 'react-icons/ri';
import Backdrop from './Backdrop';
import './Sidebar.css';

const Sidebar = (props) => {
  const [sidebarClasses, setSidebarClasses] = useState('sidebar sidebar-hidden')
  const [backdropClasses, setBackdropClasses] = useState('backdrop backdrop-hidden')

  const closeSidebar = () => {
    setSidebarClasses('sidebar sidebar-hidden')
    setBackdropClasses('backdrop backdrop-hidden')

    /*
    * This setTimeout will delay the execution of the props.onClose() function by 0.7s
    * Which is the same time that is used in the Sidebar.css file to transition the opening and closing of the sidebar
    ! Make sure both have the same value
    ! And this will ensure that the Sidebar will get unmounted once the transition is done
    */
    setTimeout(() => props.onClose(), 700)
  };

  useEffect(() => {
    if (props.isOpen) {
      setSidebarClasses('sidebar sidebar-visible')
      setBackdropClasses('backdrop backdrop-visible')
    } else {
      setSidebarClasses('sidebar sidebar-hidden')
      setBackdropClasses('backdrop backdrop-hidden')
    }
  }, [props.isOpen])

  if (!props.isOpen) return;

  return (
    ReactDOM.createPortal(
      <>
        <Backdrop backdropClasses={backdropClasses} onClose={closeSidebar} />
        <div className={sidebarClasses}>
          <RiCloseLine className='sidebar-close-icon' onClick={closeSidebar} />
          {props.children}
        </div>
      </>,
      document.getElementById('portal')
    )
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Sidebar;