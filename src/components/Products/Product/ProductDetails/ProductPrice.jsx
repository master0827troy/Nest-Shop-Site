import PropTypes from "prop-types";

const ProductPrice = ({ vertical, price, discount }) => {
  const floatPrice = price.toFixed(2);
  const newPrice = discount
    ? (floatPrice - (floatPrice * discount) / 100).toFixed(2)
    : floatPrice;

  const containerClasses = vertical
    ? "flex flex-row items-center gap-2"
    : "space-y-1 text-center";

  return (
    <div className={containerClasses}>
      <p className="text-lg font-bold">${newPrice}</p>
      {newPrice !== floatPrice && (
        <p className="text-base line-through">${floatPrice}</p>
      )}
    </div>
  );
};

ProductPrice.propTypes = {
  vertical: PropTypes.bool,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number,
};

export default ProductPrice;
