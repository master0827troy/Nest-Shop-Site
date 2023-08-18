import PropTypes from 'prop-types';
import ProductImage from './ProductDetails/ProductImage';
import ProductBadge from './ProductDetails/ProductBadge';
import ProductTitle from './ProductDetails/ProductTitle';
import ProductRating from './ProductDetails/ProductRating';
import ProductStock from './ProductDetails/ProductStock';
import ProductPrice from './ProductDetails/ProductPrice';
import ProductCartIcon from './ProductIcons/ProductCartIcon';
import ProductWishlistIcon from './ProductIcons/ProductWishlistIcon';

const ProfileProduct = ({ product }) => {
  return (
    <div className='flex flex-row gap-5'>
      <ProductImage id={product.id} title={product.title} image={product.image} className='w-52 h-36' />
      <div className='w-full flex flex-row justify-between gap-10'>
        <div>
          <ProductBadge />
          <ProductTitle id={product.id} title={product.title} />
          <ProductRating max={5} rating={product.rating} className='mb-2' />
          <ProductStock stock={product.stock} />
        </div>
        <div className='flex flex-col items-center gap-2'>
          <ProductPrice price={product.price} discount={product.discount} />
          <ProductWishlistIcon id={product.id} />
          <ProductCartIcon product={product} />
        </div>
      </div>
    </div>
  );
};

ProfileProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProfileProduct;