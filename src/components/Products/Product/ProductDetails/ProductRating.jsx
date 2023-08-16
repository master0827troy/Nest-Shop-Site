import PropTypes from 'prop-types';
import Stars from '../../../../ui/Stars'

const ProductRating = ({ max, rating, className }) => {
  let classes = 'flex flex-row items-center';

  if (className) {
    classes += ' ' + className;
  }

  return (
    <div className={classes}>
      <Stars max={max} numberOfStars={rating} />
    </div>
  )
}

ProductRating.propTypes = {
  max: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default ProductRating