import PropTypes from "prop-types";
import ProductImage from "./ProductDetails/ProductImage";
import ProductBadge from "./ProductDetails/ProductBadge";
import ProductTitle from "./ProductDetails/ProductTitle";
import ProductRating from "./ProductDetails/ProductRating";
import ProductStock from "./ProductDetails/ProductStock";
import ProductPrice from "./ProductDetails/ProductPrice";
import ProductDecreaseIcon from "./ProductIcons/ProductDecreaseIcon";
import ProductQuantity from "./ProductDetails/ProductQuantity";
import ProductIncreaseIcon from "./ProductIcons/ProductIncreaseIcon";
import ProductDeleteIcon from "./ProductIcons/ProductDeleteIcon";
import ProductDiscount from './ProductDetails/ProductDiscount';

const CartProduct = ({ product }) => {
  return (
    <div className="mb-10 flex flex-col lg:grid lg:grid-cols-6 gap-3">
      <div className="relative grid col-span-3 md:col-span-2">
        <ProductImage
          id={product.id}
          title={product.title}
          image={product.image}
          className="w-full h-36"
        />
        {product.discount && <ProductDiscount discount={product.discount} />}
      </div>
      <div className="col-span-3 md:col-span-4 flex flex-col lg:grid lg:grid-cols-3">
        <div className="col-span-2 flex flex-col items-start gap-1">
          <ProductBadge rating={product.rating} />
          <ProductTitle id={product.id} title={product.title} />
          <ProductRating className="mb-1" max={5} rating={product.rating} />
          <ProductStock stock={product.stock} />
        </div>
        <div className="col-span-1 flex flex-row lg:flex-col justify-start items-center gap-2">
          <ProductPrice price={product.price} discount={product.discount} />
          <div className="mt-2 flex flex-row items-center gap-2 mb-3">
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
