import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductImage = ({ id, title, image, className }) => {
  const imageClasses = className ? 'object-contain  rounded-lg ' + className : 'object-contain  rounded-lg ';

  return (
    <>
      {
        id ?
          <Link to={`/product/${id}`}>
            <img src={image} alt={title} className={imageClasses} />
          </Link>
        :
        <img src={image} alt={title} className={imageClasses} />
      }
    </>
  );
};

ProductImage.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  className: PropTypes.string
};


export default ProductImage;