import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "../../../../ui/Button";

const WriteReviewButton = ({ id }) => {
  return (
    <Link to={`/product/${id}`}>
      <Button link text="Write a review" className="h-fit" />
    </Link>
  );
};

WriteReviewButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default WriteReviewButton;
