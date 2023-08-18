import { FaStar } from 'react-icons/fa6';
import './Badge.css';

const Badge = (props) => {
  let badgeClasses = 'badge';

  console.log(props)

  badgeClasses += props.type === 'top' ? ' top' : '';
  badgeClasses += props.type === 'new' ? ' new' : '';

  return (
    <div className={badgeClasses}>
      <FaStar className='badge-icon' />
      <span className='badge-text'>Top Rated</span>
    </div>
  )
};

export default Badge;