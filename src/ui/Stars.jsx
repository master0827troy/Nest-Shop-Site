import React from 'react'

import { FaStar } from 'react-icons/fa6';

import './Stars.css';

const Stars = (props) => {
  const numberOfFullStars = Math.floor(props.numberOfStars);
  const numberOfEmptyStars = props.max - numberOfFullStars - 1;

  const fullStarsArray = new Array(numberOfFullStars).fill("").map((_, i) => i + 1);
  const emptyStarsArray = new Array(numberOfEmptyStars).fill("").map((_, i) => i + 1);

  const width = parseInt((props.numberOfStars % 1).toFixed(2).substring(2));

  return (
    <div className='stars'>
      {
        fullStarsArray.map(star => <FaStar key={star} />)
      }

      {
        props.numberOfStars % 1 !== 0 && 
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