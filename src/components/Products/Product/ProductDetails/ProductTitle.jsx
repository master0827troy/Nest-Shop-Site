import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductTitle = ({ id, title }) => {
  return (
    <>
      {id ? (
        <Link to={`/product/${id}`}>
          <p className="max-w-xs text-base text-gray-700 font-semibold leading-5 tracking-tight">
            {title.length > 30 ? title.substring(0, 62) + "..." : title}
          </p>
        </Link>
      ) : (
        <p className="text-base text-gray-700 font-semibold leading-5 tracking-tight">
          {title}
        </p>
      )}
    </>
  );
};

ProductTitle.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default ProductTitle;
