import PropTypes from 'prop-types';

const ProductQuantity = ({ quantity }) => {
  return (
    <p className='text-xl font-semibold'>{quantity}</p>
  );
};

ProductQuantity.propTypes = {
  quantity: PropTypes.number.isRequired,
};

export default ProductQuantity;