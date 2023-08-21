import PropTypes from 'prop-types';
import ProductImage from './ProductDetails/ProductImage';
import ProductBadge from './ProductDetails/ProductBadge';
import ProductTitle from './ProductDetails/ProductTitle';
import ProductRating from './ProductDetails/ProductRating';
import ProductStock from './ProductDetails/ProductStock';
import ProductPrice from './ProductDetails/ProductPrice';
import ProductCartIcon from './ProductIcons/ProductCartIcon';
import ProductWishlistIcon from './ProductIcons/ProductWishlistIcon';

const ProfileProduct = ({ product, callbackFunction }) => {
  return (
    <div className='flex flex-col sm:flex-row gap-5'>
      <ProductImage id={product.id} title={product.title} image={product.image} className='w-52 h-36' />
      <div className='w-full flex flex-col md:flex-row justify-between gap-10'>
        <div>
          <ProductBadge rating={product.rating} />
          <ProductTitle id={product.id} title={product.title} />
          <ProductRating max={5} rating={product.rating} className='mb-2' />
          <ProductStock stock={product.stock} />
        </div>
        <div className='flex flex-row md:flex-col items-center gap-4 md:gap-2'>
          <ProductPrice price={product.price} discount={product.discount} />
          <ProductWishlistIcon id={product.id} callbackFunction={callbackFunction} />
          <ProductCartIcon product={product} />
        </div>
      </div>
    </div>
  );
};

ProfileProduct.propTypes = {
  product: PropTypes.object.isRequired,
  callbackFunction: PropTypes.func,
};

export default ProfileProduct;