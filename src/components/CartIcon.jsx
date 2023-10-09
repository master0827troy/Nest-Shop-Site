import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const CartIcon = () => {
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <div className="relative">
      <IoCartOutline />
      {isAuthenticated && (
        <div className="w-auto h-4 lg:h-5 px-1.5 lg:px-[7px] flex flex-row items-center absolute -top-2 -right-2 text-center text-[0.5rem] lg:text-xs font-semibold text-white bg-orange-600 rounded-full select-none">
          {cartTotalQuantity}
        </div>
      )}
    </div>
  );
};

export default CartIcon;
