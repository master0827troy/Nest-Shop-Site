import PropTypes from "prop-types";
import { RiHeart3Line } from "react-icons/ri";
import useProductActions from "../../../../hooks/useProductActions";
import Button from "../../../../ui/Button";

const SaveToWishlistButton = ({ id }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } =
    useProductActions();

  const addToWishlistHandler = () => {
    addToWishlist(id);
  };

  const removeFromWishlistHandler = () => {
    removeFromWishlist(id);
  };

  return (
    <Button
      text="Save for later"
      className="text-lg w-60"
      bg={isInWishlist(id)}
      noBg={!isInWishlist(id)}
      onClick={
        !isInWishlist(id) ? addToWishlistHandler : removeFromWishlistHandler
      }
    >
      <RiHeart3Line className="text-2xl" />
    </Button>
  );
};

SaveToWishlistButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SaveToWishlistButton;
