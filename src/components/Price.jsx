import React from 'react';

const Price = (props) => {
  return (
    <div className={props.className ? 'flex flex-row items-end gap-3 ' + props.className : 'flex flex-row items-end gap-3'}>
      <p className={`${props.fontSizes[0]} font-bold`}>{`$${props.newPrice}`}</p>
      {
        props.oldPrice && <p className={`${props.fontSizes[1]} line-through text-gray-500`}>{`$${props.oldPrice}`}</p>
      }
    </div>
  );
};

export default Price;