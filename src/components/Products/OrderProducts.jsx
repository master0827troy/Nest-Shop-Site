import PropTypes from 'prop-types';
import OrderProduct from './Product/OrderProduct';

const OrderProducts = ({ products }) => {
  return (
    <>
      {
        products.map(product =>
          <OrderProduct key={product.productId} product={product} />
        )
      }
    </>
  );
};

OrderProducts.propTypes = {
  products: PropTypes.array.isRequired,
};

export default OrderProducts;