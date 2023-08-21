import PropTypes from 'prop-types';
import OrderProduct from './Product/OrderProduct';

const OrderProducts = ({ products }) => {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 gap-y-8 gap-x-10'>
      {
        products.map(product =>
          <OrderProduct key={product.productId} product={product} />
        )
      }
    </div>
  );
};

OrderProducts.propTypes = {
  products: PropTypes.array.isRequired,
};

export default OrderProducts;