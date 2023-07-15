import { useState } from 'react'

import { IoCartOutline, IoCartSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Price from './Price';

const Product = (props) => {
  const [inCart, setInCart] = useState(false)

  const addToCartHandler = () => {
    setInCart(true);
  };

  const removeFromCartHandler = () => {
    setInCart(false);
  };

  const cartIconClasses = 'absolute z-30 top-2 right-4 text-3xl cursor-pointer transition duration-500 hover:scale-125 hover:text-orange-600';

  return (
    <div  className='relative'>
      <Link to='/product/1'>
        <div className="h-auto">
          <div className='h-56 mb-2 relative overflow-hidden border rounded-lg group'>
            <img src={props.image} alt="" 
            className='w-full h-full absolute right-0 z-20 object-fit group-hover:right-full transition-all duration-700' />
            <img src='https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2017/12/product-bag1-300x300.jpg' alt="" 
            className='w-full h-full object-fit z-10 absolute left-full group-hover:left-0 transition-all duration-700' />
          </div>
            <p className='mb-1 font-normal tracking-wide text-md'>Lorem ipsum dolor sit amet consectetur</p>
            <div className="flex flex-row justify-between">
            <Price newPrice={799} oldPrice={599} fontSizes={['text-xl', '']} />
            <Rating max={5} rating={4.5}>
              <span className='text-sm'>(645)</span>
            </Rating>
            </div>
        </div>
      </Link>
      {
        inCart ?
          <IoCartSharp className={cartIconClasses + ' text-orange-500'} onClick={removeFromCartHandler} />
        :
          <IoCartOutline className={cartIconClasses + 'text-slate-900'} onClick={addToCartHandler} />
      }
    </div>
  )
}

export default Product