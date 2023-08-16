import PropTypes from 'prop-types';
import ProductImage from './ProductDetails/ProductImage';
import ProductWishlistIcon from './ProductIcons/ProductWishlistIcon';
import ProductPrice from './ProductDetails/ProductPrice';
import ProductCartIcon from './ProductIcons/ProductCartIcon';
import ProductTitle from './ProductDetails/ProductTitle';
import ProductRating from './ProductDetails/ProductRating';
import ProductTotalReviews from './ProductDetails/ProductTotalReviews';

const CategoryProduct = ({ product }) => {
  return (
    <div className='relative max-w-full'>
        <div className="h-auto">
          <div className='mb-2 pb-3 relative overflow-hidden  rounded-lg text-center shadow-lg text-gray-900 group'>
            <ProductImage id={product.id} title={product.title} image={product.image} className='w-full h-56 mb-2' />
            <div className='flex flex-row items-center justify-between mx-10 mb-2'>
              <ProductWishlistIcon id={product.id} />
              <ProductPrice price={product.price} discount={product.discount} />
              <ProductCartIcon product={product} />
            </div>
            <ProductTitle id={product.id} title={product.title} />
            <ProductRating max={5} rating={product.rating} className='w-fit mx-auto mb-2' />
            <ProductTotalReviews reviews={product.reviews} />
          </div>
        </div>
    </div>
  )
}

CategoryProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export default CategoryProduct