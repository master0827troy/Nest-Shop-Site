import PropTypes from 'prop-types';
import CartProduct from './Product/CartProduct';

const CheckoutProducts = ({ products }) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-10'>
      {
        products.length > 0 ?
          products.map(product =>
            <CartProduct key={product.id} product={product} />
          )
        :
          <p>Your shopping cart is empty! Start adding items.</p>
      }
    </div>
  );
};

CheckoutProducts.propTypes = {
  products: PropTypes.array.isRequired,
};

export default CheckoutProducts;