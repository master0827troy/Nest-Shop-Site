import PropTypes from "prop-types";

const ProductTotalReviews = ({ reviews }) => {
  return <span className="text-sm font-semibold">({reviews})</span>;
};

ProductTotalReviews.propTypes = {
  reviews: PropTypes.number.isRequired,
};

export default ProductTotalReviews;
