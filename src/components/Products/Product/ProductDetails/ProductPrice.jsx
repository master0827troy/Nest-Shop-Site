import PropTypes from 'prop-types';

const ProductPrice = ({vertical, price, discount}) => {
  const newPrice = discount ? (price - ( price * discount / 100 )).toFixed(2) : price;
  const containerClasses = vertical ? 'flex flex-row items-center gap-2' : 'space-y-1 text-center';

  return (
    <div className={containerClasses}>
      <p className='text-lg font-bold'>${newPrice}</p>
      {
        newPrice !== price &&
        <p className='text-base line-through'>${price}</p>
      }
    </div>
  );
};

ProductPrice.propTypes = {
  vertical: PropTypes.bool,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number,
};


export default ProductPrice;