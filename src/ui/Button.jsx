import React from 'react'

import './Button.css';

const Button = (props) => {
  let buttonClasses = 'button';

  props.className ? buttonClasses += ' ' + props.className: buttonClasses;
  props.noBg ? buttonClasses += ' no-bg' : buttonClasses += ' bg';

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      {props.children}
      <span>{props.text}</span>
    </button>
  )
}

export default Button