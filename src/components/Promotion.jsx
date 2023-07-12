import React from 'react'

import Button from '../ui/Button'

const Promotion = (props) => {
  return (
    <div className='xx h-auto' style={{backgroundImage: `url('${props.promotion.image}')`}}>
      <div className="w-full h-full flex flex-col pt-32 md:pt-24 lg:pt-56 gap-3 px-14 lg:px-10 xl:px-12 py-10 bg-[#00000073]">
        <h3 className='text-white text-2xl lg:text-xl xl:text-2xl font-semibold'>{props.promotion.title}</h3>
        <p className='mb-4 text-white text-lg lg:text-md leading-6'>{props.promotion.text}</p>
        <Button text='Shop now' className='text-white !border-orange-500 rounded-sm' noBg />
      </div>
    </div>
  )
}

export default Promotion