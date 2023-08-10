import React from 'react';
import Button from '../ui/Button';
import './Promotions.css';

const promotions = (props) => {
  return (
    <div className='promotions'>
      {
        props.promotions.map(promotion =>
          <div key={promotion.id} className={promotion.imageClasses ? 'promotion ' + promotion.imageClasses : 'promotion'} style={{backgroundImage: `url('${promotion.image}')`}}>
            <div className='promotion-content'>
              <h3 className='promotion-title'>{promotion.title}</h3>
              <p className='promotion-text'>{promotion.text}</p>
              <Button text='Shop now' className='text-white !border-orange-600 rounded-sm' noBg />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default promotions