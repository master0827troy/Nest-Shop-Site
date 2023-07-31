import { useSelector } from 'react-redux';
import Button from '../ui/Button';
import ScrollableDiv from '../ui/ScrollableDiv';
import CartItem from './CartItem';
import {RiShoppingCart2Line} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const Cart = (props) => {
  const cartTotalQuantity = useSelector(state => state.cart.totalQuantity);
  const cartTotalPrice = useSelector(state => state.cart.totalPrice);
  const cartItems = useSelector(state => state.cart.items);

  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/checkout');
    props.onClose();
  };

  return (
    <>
      <div className='flex flex-row items-center gap-2 mb-6 text-2xl font-semibold tracking-wide'>
        <RiShoppingCart2Line className='text-3xl' />
        Shopping Cart
        <span className='text-lg'>({cartTotalQuantity})</span>
      </div>
      {
        cartItems.length > 0 ?
          <>
            <ScrollableDiv className='max-h-96 mb-6'>
            {
              cartItems.map(cartItem =>
                <CartItem key={cartItem.id} cartItem={cartItem} />
              )
            }
            </ScrollableDiv>
            <div className="flex flex-row items-center justify-between gap-4">
              <span className='text-xl font-semibold tracking-wide'>Total: ${cartTotalPrice}</span>
              <Button text='Checkout' onClick={clickHandler} />
            </div>
          </>
        :
          <p>Your shopping cart is empty! Start adding items.</p>
      }
    </>
  );
};

export default Cart;