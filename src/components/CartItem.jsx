import {FiTrash2} from 'react-icons/fi';
import Badge from '../ui/Badge';
import {GoChevronLeft, GoChevronRight} from 'react-icons/go';
import Rating from './Rating';
import { useDispatch } from 'react-redux';
import {cartActions} from '../store/cart-slice';
import PropTypes from 'prop-types';

const CartItem = (props) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart(props.cartItem));
  };

  const removeFromCartHandler = () => {
    dispatch(cartActions.removeItemFromCart(props.cartItem.id));
  };

  const imageClasses = props.imageSize ?  props.imageSize + ' object-cover border rounded-lg' : 'w-36 h-36 object-cover border rounded-lg';
  const titleClasses = props.titleFontSize ?  props.titleFontSize + ' mb-2 tracking-wide' : 'mb-2 text-lg tracking-wide';
  const newPriceClasses = props.priceFontSizes ?  props.priceFontSizes[0] + ' font-bold' : 'text-xl font-bold';
  const oldPriceClasses = props.priceFontSizes ?  props.priceFontSizes[1] + ' line-through' : 'text-lg line-through';
  const iconClasses = props.iconSize ?  props.iconSize + ' font-semibold transition duration-500 hover:text-orange-600 hover:scale-110' : 'text-xl font-semibold transition duration-500 hover:text-orange-600 hover:scale-110';

  return (
    <div className="flex flex-row gap-5 justify-between mb-10">
      <div className="flex flex-row gap-5 justify-between">
        <img src={props.cartItem.image} alt={props.cartItem.title} className={imageClasses} />
        <div>
          <Badge type='best' />
          <p className={titleClasses}>{props.cartItem.title}</p>
          <Rating className='mb-2' max={5} rating={props.cartItem.rating} />
          <div className="group flex flex-row items-center">
            <span className="inline-block w-2 h-2 bg-slate-900 rounded-full mr-2 group-hover:animate-ping"></span>
            <span>{props.cartItem.stock} units left in stock</span>
          </div>
        </div>
      </div>
        <div className='text-center'>
          <div className='mb-3 space-y-1'>
            <p className={newPriceClasses}>${props.cartItem.price}</p>
            <p className={oldPriceClasses}>$799</p>
          </div>
          <div className='flex flex-row items-center justify-center gap-2 mb-3'>
            <button>
              <GoChevronLeft className={iconClasses} onClick={removeFromCartHandler} />
            </button>
            <p className='text-xl font-semibold'>{props.cartItem.quantity}</p>
            <button>
              <GoChevronRight className={iconClasses} onClick={addToCartHandler} />
            </button>
          </div>
          <button onClick={removeFromCartHandler}>
            <FiTrash2 className={iconClasses} />
          </button>
        </div>
    </div>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
  imageSize: PropTypes.string,
  titleFontSize: PropTypes.string,
  priceFontSizes: PropTypes.string,
  iconSize: PropTypes.string,
};

export default CartItem;