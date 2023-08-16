import PropTypes from 'prop-types';
import ProductImage from './ProductDetails/ProductImage';
import Badge from '../../../ui/Badge';
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
    <div className='flex flex-row gap-5 justify-between mb-10'>
      <div className='flex flex-row gap-5 justify-between'>
        <ProductImage id={product.id} title={product.title} image={product.image} className='w-36 h-36' />
        <div className='flex flex-col'>
          <Badge type='best' />
          <ProductTitle id={product.id} title={product.title} />
          <ProductRating className='mb-2' max={5} rating={product.rating} />
          <ProductStock stock={product.stock} />
        </div>
      </div>
      <div className='text-center'>
        <ProductPrice price={product.price} discount={product.discount} />
        <div className='mt-2 flex flex-row items-center justify-center gap-2 mb-3'>
          <ProductDecreaseIcon id={product.id} />
          <ProductQuantity quantity={product.quantity} />
          <ProductIncreaseIcon id={product.id} />
        </div>
        <ProductDeleteIcon id={product.id} />
      </div>
    </div>
  );
};

CartProduct.propTypes = {
  product: PropTypes.object.isRequired,
};


export default CartProduct;