import PropTypes from 'prop-types';
import {RiShoppingCart2Line} from 'react-icons/ri';
import useProductActions from '../../../../hooks/useProductActions';
import Button from '../../../../ui/Button';

const AddToCartButton = ({ product }) => {
  const {
    isInCart,
    addToCart,
    removeFromCart,
  } = useProductActions();

  const addToCartHandler = () => {
    addToCart(product);
  };

  const removeFromCartHandler = () => {
    removeFromCart(product.id);
  };

  return (
    <Button text='Add to cart' className='text-lg w-60' bg={isInCart(product.id)} noBg={!isInCart(product.id)} onClick={!isInCart(product.id) ? addToCartHandler : removeFromCartHandler}>
      <RiShoppingCart2Line className='text-2xl' />
    </Button>
  );
};

AddToCartButton.propTypes = {
  product: PropTypes.object.isRequired,
};

export default AddToCartButton;