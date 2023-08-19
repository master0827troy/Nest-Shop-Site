import PropTypes from 'prop-types';
import Badge from "../../../../ui/Badge";

const ProductBadge = ({ rating }) => {
  return (
    <>
      {
        rating >= 3.5 &&
        <Badge type='top' />
      }
    </>
  );
};

ProductBadge.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default ProductBadge;