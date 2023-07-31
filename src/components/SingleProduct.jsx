import { useState } from 'react'
import Price from './Price';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/cart-slice';
import Stars from '../ui/stars';
import { RiShoppingCart2Line, RiShoppingCart2Fill, RiHeart3Line, RiHeart3Fill } from 'react-icons/ri';
import PropTypes from 'prop-types';

const Product = (props) => {
  
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items)
  
  const [saved, setSaved] = useState(cartItems.find(item => item.id === props.product.id))

  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart(props.product));
  };

  const removeFromCartHandler = () => {
    dispatch(cartActions.removeItemFromCart(props.product.id));
  };

  const saveHandler = () => {
    setSaved(true);
  };
  
  const unsaveHandler = () => {
    setSaved(false);
  };

  return (
    <div className='relative max-w-full'>
        <div className="h-auto">
          <div className='mb-2 pb-3 relative overflow-hidden  rounded-lg text-center shadow-lg text-gray-900 group'>
            <img src={props.product.image} alt="" 
            className='w-full h-56 mb-2 object-fit group-hover:right-full transition-all duration-700' />
            <div className='flex flex-row items-center justify-between mx-10 mb-2'>
              {
                saved ?
                  <RiHeart3Fill className='text-xl text-orange-500 cursor-pointer transition duration-700 hover:scale-125' onClick={unsaveHandler} />
                :
                  <RiHeart3Line className='text-xl cursor-pointer transition duration-700 hover:scale-125' onClick={saveHandler} />
              }
              <Price newPrice={props.product.price} oldPrice={props.product.oldPrice} fontSizes={['text-xl', '']} />
              {
                cartItems.find(item => item.id === props.product.id) ?
                  <RiShoppingCart2Fill className='text-xl text-orange-500 cursor-pointer transition duration-700 hover:scale-125' onClick={removeFromCartHandler} />
                :
                  <RiShoppingCart2Line className='text-xl cursor-pointer transition duration-700 hover:scale-125' onClick={addToCartHandler} />
              }
            </div>
            <p className='mb-1 font-bold tracking-wide text-md'>{props.product.title}</p>
            <div className="w-fit mx-auto">
              <Stars max={5} numberOfStars={props.product.rating} />
            </div>
            <span className='text-sm font-semibold'>({props.product.reviews})</span>
          </div>
            <div className="flex flex-row justify-between">
            </div>
        </div>
    </div>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product