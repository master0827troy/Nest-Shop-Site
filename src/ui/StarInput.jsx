import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import './StarInput.css';

const StarInput = (props) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  return (
    <div className='star-input'>
      {
        [...Array(props.numberOfStars)].map((_, index) => {
          const currentRating = index + 1;
          return (
            <label key={currentRating}>
              <input className='hidden' type='radio' name='rating' value={currentRating} onClick={() => setRating(currentRating)} />
              <FaStar 
                className={currentRating <= (hover || rating) ? 'star filled' : 'star'}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })
      }
    </div>
  );
};

export default StarInput;