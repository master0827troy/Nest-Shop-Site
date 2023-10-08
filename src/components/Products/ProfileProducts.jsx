import PropTypes from 'prop-types';
import ProfileProduct from './Product/ProfileProduct';
import Pagination from '../../ui/Pagination';

const ProfileProducts = ({ products, paginationOptions, callbackFunction }) => {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-8 gap-x-10'>
        {
          products.map(product =>
            <ProfileProduct key={product.id} product={product} callbackFunction={callbackFunction} />
          )
        }
      </div>
      {
        paginationOptions && <Pagination {...paginationOptions} />
      }
    </>
  );
};

ProfileProducts.propTypes = {
  products: PropTypes.array.isRequired,
  paginationOptions: PropTypes.object,
  callbackFunction: PropTypes.func,
};

export default ProfileProducts;