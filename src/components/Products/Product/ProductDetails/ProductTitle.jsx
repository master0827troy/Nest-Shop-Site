import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductTitle = ({ id, title }) => {
  return (
    <>
      {
        id ?
          <Link to={`/product/${id}`} className='block w-fit mx-auto'>
            <p className='max-w-xs w-fit mb-1 text-xl font-semibold tracking-wide'>{title.length > 30 ? title.substring(0, 62) + '...' : title}</p>
          </Link>
        :
          <p className='mb-1 text-xl font-semibold tracking-wide'>{title}</p>
      }
    </>
  );
};

ProductTitle.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ProductTitle;