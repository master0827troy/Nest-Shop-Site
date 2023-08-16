import PropTypes from 'prop-types';
import {RiHeart3Line, RiHeart3Fill} from 'react-icons/ri';
import useProductActions from '../../../../hooks/useProductActions';

const ProductWishlistIcon = ({ id }) => {
  const {
    isInWishlist,
    addToWishlist,
    removeFromWishlist
  } = useProductActions();

  const addToWishlistHandler = () => {
    addToWishlist(id)
  };

  const removeFromWishlistHandler = () => {
    removeFromWishlist(id)
  };

  return (
    <>
      {
        isInWishlist(id) ?
          <RiHeart3Fill className='text-2xl text-orange-500 cursor-pointer transition duration-700 hover:scale-125' onClick={removeFromWishlistHandler} />
        :
          <RiHeart3Line className='text-2xl cursor-pointer transition duration-700 hover:scale-125' onClick={addToWishlistHandler} />
      }
    </>
  );
};

ProductWishlistIcon.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ProductWishlistIcon;