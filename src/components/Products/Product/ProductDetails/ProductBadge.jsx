import { FaStar } from "react-icons/fa6";
import PropTypes from "prop-types";
import Badge from "../../../../ui/Badge";

const ProductBadge = ({ rating, containerStyle, iconStyle, textStyle }) => {
  return (
    <>
      {rating >= 3.5 && (
        <Badge
          text="Top rated"
          icon={FaStar}
          containerStyle={containerStyle}
          iconStyle={iconStyle}
          textStyle={textStyle}
        />
      )}
    </>
  );
};

ProductBadge.propTypes = {
  rating: PropTypes.number.isRequired,
  containerStyle: PropTypes.string,
  iconStyle: PropTypes.string,
  textStyle: PropTypes.string,
};

export default ProductBadge;
