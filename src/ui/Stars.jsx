import { FaStar } from 'react-icons/fa6';
import './Stars.css';

const Stars = ({ max, numberOfStars }) => {
  const numberOfFullStars = Number.isInteger(numberOfStars)  ? Math.floor(numberOfStars) : 0;
  const numberOfEmptyStars = 
    numberOfStars && numberOfStars !== Math.floor(numberOfStars) ?
      max - numberOfFullStars - 1
    :
      max - numberOfFullStars;
    
  const fullStarsArray = new Array(numberOfFullStars).fill("").map((_, i) => i + 1);
  const emptyStarsArray = new Array(numberOfEmptyStars).fill("").map((_, i) => i + 1);

  const width = parseInt((numberOfStars % 1).toFixed(2).substring(2));

  return (
    <div className='stars'>
      {
        fullStarsArray?.map(star => <FaStar key={star} />)
      }

      {
        (!!(numberOfStars && numberOfStars % 1 !== 0)) && 
          <div className='relative'>
            <FaStar className='text-gray-400' />
            <span className='notFull' style={{ width: `${width}%` }}>
              <FaStar />
            </span>
          </div>  
      }

      {
        emptyStarsArray.map(emptyStar =>
          <FaStar key={emptyStar} className='text-gray-400' />
        )
      }
    </div>
  )
}

export default Stars