import React from 'react'
import Promotion from './Promotion'

const promotions = (props) => {
  return (
    <div className={`grid lg:grid-cols-${props.promotions.length} gap-10 mb-10`}>
      {
        props.promotions.map(promotion =>
          <Promotion key={promotion.id} promotion={promotion} />
        )
      }
    </div>
  )
}

export default promotions