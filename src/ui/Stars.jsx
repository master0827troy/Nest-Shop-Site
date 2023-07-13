import React from 'react'

import { FaStar, FaStarHalf } from 'react-icons/fa6';

import './Stars.css';

const Stars = (props) => {
  const numberOfFullStars = Math.floor(props.numberOfStars);

  const fullStarsArray = new Array(numberOfFullStars).fill("").map((_, i) => i + 1);

  return (
    <div className='stars'>
      {
        fullStarsArray.map(star => <FaStar key={star} />)
      }

      {
        props.numberOfStars % 1 !== 0 && <FaStarHalf />
      }
    </div>
  )
}

export default Stars