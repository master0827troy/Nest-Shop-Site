import PropTypes from 'prop-types';
import CartProduct from './Product/CartProduct';

const CartProducts = ({ products }) => {  
  return (
    <>
      {
        products.map(product =>
          <CartProduct key={product.id} product={product} />
        )
      }
    </>
  );
};

CartProducts.propTypes = {
  products: PropTypes.array.isRequired,
};

export default CartProducts;