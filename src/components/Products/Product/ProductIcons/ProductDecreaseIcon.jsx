import PropTypes from "prop-types";
import { GoChevronLeft } from "react-icons/go";
import useProductActions from "../../../../hooks/useProductActions";

const ProductDecreaseIcon = ({ id }) => {
  const { decreaseItem } = useProductActions();

  const decreaseItemHandler = () => {
    decreaseItem(id);
  };

  return (
    <GoChevronLeft
      className="mx-auto text-xl font-semibold cursor-pointer transition duration-500 hover:text-orange-600 hover:scale-110"
      onClick={decreaseItemHandler}
    />
  );
};

ProductDecreaseIcon.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ProductDecreaseIcon;
