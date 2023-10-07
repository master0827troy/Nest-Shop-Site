import { RiShoppingCart2Line, RiShoppingCart2Fill } from "react-icons/ri";
import useProductActions from "../../../../hooks/useProductActions";
import PropTypes from "prop-types";

const ProductCartIcon = ({ product }) => {
  const { isInCart, addToCart, removeFromCart } = useProductActions();

  const addToCartHandler = () => {
    addToCart(product);
  };

  const removeFromCartHandler = () => {
    removeFromCart(product.id);
  };

  return (
    <>
      {isInCart(product.id) ? (
        <RiShoppingCart2Fill
          className="text-xl text-orange-500 cursor-pointer transition duration-700 hover:scale-125"
          onClick={removeFromCartHandler}
        />
      ) : (
        <RiShoppingCart2Line
          className="text-xl cursor-pointer transition duration-700 hover:scale-125"
          onClick={addToCartHandler}
        />
      )}
    </>
  );
};

ProductCartIcon.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCartIcon;
