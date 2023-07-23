import {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { RiCloseLine } from 'react-icons/ri';
import Backdrop from './Backdrop';
import './Modal.css';

const Modal = (props) => {
  const [modalClasses, setModalClasses] = useState('modal modal-hidden')
  const [backdropClasses, setBackdropClasses] = useState('backdrop backdrop-hidden')

  const closeModal = () => {
    setModalClasses('modal modal-hidden')
    setBackdropClasses('backdrop backdrop-hidden')

    /*
    * This setTimeout will delay the execution of the props.onClose() function by 0.7s
    * Which is the same time that is used in the Modal.css file to transition the opening and closing of the modal
    ! Make sure both have the same value
    ! And this will ensure that the Modal will get unmounted once the transition is done
    */
    setTimeout(() => props.onClose(), 700)
  };

  useEffect(() => {
    if (props.isOpen) {
      setModalClasses('modal modal-visible')
      setBackdropClasses('backdrop backdrop-visible')
    } else {
      setModalClasses('modal modal-hidden')
      setBackdropClasses('backdrop backdrop-hidden')
    }
  }, [props.isOpen])

  if (!props.isOpen) return;

  return (
    ReactDOM.createPortal(
      <>
        <Backdrop backdropClasses={backdropClasses} onClose={closeModal} />
        <div className={modalClasses}>
          <RiCloseLine className='modal-close-icon' onClick={closeModal} />
          {props.children}
        </div>
      </>,
      document.getElementById('portal')
    )
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;