import React from 'react'
import Stars from '../ui/stars'

const Rating = (props) => {
  let classes = 'flex flex-row items-center';

  props.className ? classes += ' ' + props.className: classes;
  props.rating % 1 !== 0 ? classes += ' gap-1' : classes += ' gap-2';

  return (
    <div className={classes}>
      <Stars max={props.max} numberOfStars={props.rating} />
      {props.children}
    </div>
  )
}

export default Rating