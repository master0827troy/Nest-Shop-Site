import PropTypes from "prop-types";

const ProductDescription = ({ description }) => {
  return (
    <p className="max-w-lg text-md tracking-wide leading-7">{description}</p>
  );
};

ProductDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export default ProductDescription;
