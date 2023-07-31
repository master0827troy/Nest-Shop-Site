import { FaMapMarkerAlt, FaPhoneAlt, FaAddressBook } from "react-icons/fa"; 
import Button from '../ui/Button';
import CartItem from '../components/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import {RiShoppingCart2Line} from 'react-icons/ri';
import RadioInput from "../ui/RadioInput";
import { Link } from "react-router-dom";
import {cartActions} from '../store/cart-slice';

const Checkout = () => {
  const cartTotalQuantity = useSelector(state => state.cart.totalQuantity);
  const cartTotalPrice = useSelector(state => state.cart.totalPrice);
  const cartItems = useSelector(state => state.cart.items);

  const dispatch = useDispatch();

  const emptyCartHandler = () => {
    dispatch(cartActions.emptyCart());
  };

  const addressList = [
    { id: 1, value: '22 zbi street, Cairo, Egypt' },
    { id: 2, value: '22 zbi street, Cairo, Egypt' },
    { id: 3, value: '22 zbi street, Cairo, Egypt' },
  ];

  const phoneList = [
    { id: 1, value: '01029746152' },
    { id: 2, value: '01284625172' },
    { id: 3, value: '01038472648' },
  ];

  return (
    <div className='mt-12'>
      <div className='flex flex-row justify-between gap-20'>
        <div className='grow'>
          <div className='flex flex-row items-center gap-2 mb-6 text-3xl font-semibold tracking-wide'>
            <RiShoppingCart2Line className='text-4xl' />
            Shopping Cart
            <span className='text-xl'>({cartTotalQuantity})</span>
          </div>

          {
            cartItems.length > 0 ?
              cartItems.map(cartItem =>
                <CartItem key={cartItem.id} cartItem={cartItem} imageSize='w-44 h-44' titleFontSize='text-xl' priceFontSizes={['text-2xl', 'text-xl']} iconSize='text-xl' />
              )
            :
              <p>Your shopping cart is empty! Start adding items.</p>
          }
        </div>
        <div className='w-80'>
          <h2 className='section-heading !mb-4'>Order Details</h2>
          <div className='mb-4 space-y-2 text-xl'>
            <div className="mb-4 pb-4 border-b">
              <RadioInput name='address' list={addressList} className='mb-5'>
                <FaMapMarkerAlt/>
              </RadioInput>
              <RadioInput name='phone' list={phoneList} className='mb-5'>
                <FaPhoneAlt />
              </RadioInput>
              <div className='flex flex-row items-center gap-2 text-orange-600 cursor-pointer transition duration-500 hover:text-orange-700'>
                <FaAddressBook />
                <Link to='' className='text-base font-semibold'>Edit your addresses</Link>
              </div>
            </div>
            <p>Items: {cartTotalQuantity}</p>
            <p>Total: ${cartTotalPrice}</p>
          </div>
          <Button text='Confirm Order' className='text-lg !w-full mb-4' noBg />
          <Button text='Empty Cart' className='text-lg !w-full' noBg onClick={emptyCartHandler} />
        </div>
      </div>
    </div>
  )
}

export default Checkout