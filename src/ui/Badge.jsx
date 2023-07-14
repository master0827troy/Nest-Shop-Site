import React from 'react';
import { FaStar } from 'react-icons/fa6';
import './Badge.css';

const Badge = (props) => {
  let badgeClasses = 'badge';

  props.type === 'best' ? badgeClasses += ' best' : '';
  props.type === 'new' ? badgeClasses += ' new' : '';

  return (
    <div className={badgeClasses}>
      <FaStar className='badge-icon' />
      <span className='badge-text'>best seller</span>
    </div>
  )
};

export default Badge;