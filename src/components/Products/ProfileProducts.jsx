import PropTypes from 'prop-types';
import ProfileProduct from './Product/ProfileProduct';
import Pagination from '../../ui/Pagination';

const ProfileProducts = ({ products, paginationOptions }) => {
  console.log(products)

  console.log(products)
  return (
    <>
      <div className='grid lg:grid-cols-2 gap-y-8 gap-x-10'>
        {
          products.map(product =>
            <ProfileProduct key={product.id} product={product} />
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
};

export default ProfileProducts;