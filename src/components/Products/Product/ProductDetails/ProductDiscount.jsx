import PropTypes from "prop-types";

const ProductDiscount = ({ discount }) => {
  return (
    <div className="absolute top-6 left-6 px-3 py-0.5 bg-orange-600 bg-opacity-90 text-sm text-white font-semibold tracking-tight rounded-md">
      {discount}% off
    </div>
  );
};

ProductDiscount.propTypes = {
  discount: PropTypes.number.isRequired,
};

export default ProductDiscount;
