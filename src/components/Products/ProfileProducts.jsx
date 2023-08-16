import PropTypes from 'prop-types';
import ProfileProduct from './Product/ProfileProduct';

const ProfileProducts = ({ products }) => {
  return (
    <div className='grid lg:grid-cols-2 gap-y-8 gap-x-10'>
      {
        products.map(product =>
          <ProfileProduct key={product.id} product={product} />
        )
      }
    </div>
  );
};

ProfileProducts.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProfileProducts;