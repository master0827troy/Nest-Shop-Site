import PropTypes from 'prop-types';
import ProductImage from './ProductDetails/ProductImage';
import ProductBadge from './ProductDetails/ProductBadge';
import ProductTitle from './ProductDetails/ProductTitle';
import ProductRating from './ProductDetails/ProductRating';
import ProductStock from './ProductDetails/ProductStock';
import ProductPrice from './ProductDetails/ProductPrice';
import ProductDecreaseIcon from './ProductIcons/ProductDecreaseIcon';
import ProductQuantity from './ProductDetails/ProductQuantity';
import ProductIncreaseIcon from './ProductIcons/ProductIncreaseIcon';
import ProductDeleteIcon from './ProductIcons/ProductDeleteIcon';

const CartProduct = ({ product }) => {
  return (
    <div className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-5 items-center md:items-start justify-between mb-10'>
      <div className='grid col-span-3 md:col-span-2'>
        <ProductImage id={product.id} title={product.title} image={product.image} className='w-full md:w-36 h-36' />
      </div>
      <div className='col-span-3'>
        <div className='flex flex-col items-center md:items-start'>
          <ProductBadge rating={product.rating} />
          <ProductTitle id={product.id} title={product.title} />
          <ProductRating className='mb-2' max={5} rating={product.rating} />
          <ProductStock stock={product.stock} />
        </div>
      </div>
      <div className='col-span-3 lg:col-span-1 text-center'>
        <div className='flex flex-row lg:flex-col justify-center md:justify-start items-center gap-2'>
          <ProductPrice price={product.price} discount={product.discount} />
          <div className='mt-2 flex flex-row items-center gap-2 mb-3'>
            <ProductDecreaseIcon id={product.id} />
            <ProductQuantity quantity={product.quantity} />
            <ProductIncreaseIcon id={product.id} />
          </div>
          <ProductDeleteIcon id={product.id} />
        </div>
      </div>
    </div>
  );
};

CartProduct.propTypes = {
  product: PropTypes.object.isRequired,
};


export default CartProduct;