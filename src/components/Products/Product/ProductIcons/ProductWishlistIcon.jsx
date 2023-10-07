import PropTypes from "prop-types";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import useProductActions from "../../../../hooks/useProductActions";

const ProductWishlistIcon = ({ id, callbackFunction }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } =
    useProductActions();

  const addToWishlistHandler = () => {
    addToWishlist(id);
    if (callbackFunction) {
      callbackFunction();
    }
  };

  const removeFromWishlistHandler = () => {
    removeFromWishlist(id);
    if (callbackFunction) {
      callbackFunction();
    }
  };

  return (
    <>
      {isInWishlist(id) ? (
        <RiHeart3Fill
          className="text-xl text-orange-500 cursor-pointer transition duration-700 hover:scale-125"
          onClick={removeFromWishlistHandler}
        />
      ) : (
        <RiHeart3Line
          className="text-xl cursor-pointer transition duration-700 hover:scale-125"
          onClick={addToWishlistHandler}
        />
      )}
    </>
  );
};

ProductWishlistIcon.propTypes = {
  id: PropTypes.string.isRequired,
  callbackFunction: PropTypes.func,
};

export default ProductWishlistIcon;
