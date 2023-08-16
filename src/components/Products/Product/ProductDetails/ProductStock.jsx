import PropTypes from 'prop-types';

const ProductStock = ({ stock }) => {
  return (
    <div className="group flex flex-row items-center">
      <span className="inline-block w-2 h-2 bg-slate-900 rounded-full mr-2 group-hover:animate-ping"></span>
      <span>{stock} units left in stock</span>
    </div>
  );
};

ProductStock.propTypes = {
  stock: PropTypes.number.isRequired,
};

export default ProductStock;