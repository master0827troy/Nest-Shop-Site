import {IoCartOutline} from 'react-icons/io5';
import { useSelector } from 'react-redux';
const CartIcon = () => {
  const cartTotalQuantity = useSelector(state => state.cart.totalQuantity);

  return (
    <div className='relative'>
      <IoCartOutline />
      <div className='w-auto h-5 px-[7px] flex flex-row items-center absolute -top-2 -right-2 text-center text-xs font-semibold text-white bg-orange-600 rounded-full'>
        {cartTotalQuantity}
      </div>
    </div>
  );
};

export default CartIcon;