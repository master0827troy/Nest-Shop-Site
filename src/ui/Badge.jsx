import { FaStar } from 'react-icons/fa6';
import './Badge.css';

const Badge = (props) => {
  let badgeClasses = 'badge';

  badgeClasses += props.type === 'best' ? ' best' : '';
  badgeClasses += props.type === 'new' ? ' new' : '';

  return (
    <div className={badgeClasses}>
      <FaStar className='badge-icon' />
      <span className='badge-text'>best seller</span>
    </div>
  )
};

export default Badge;