import PropTypes from "prop-types";
import ProductImage from "./ProductDetails/ProductImage";
import ProductBadge from "./ProductDetails/ProductBadge";
import ProductTitle from "./ProductDetails/ProductTitle";
import ProductRating from "./ProductDetails/ProductRating";
import ProductStock from "./ProductDetails/ProductStock";
import ProductPrice from "./ProductDetails/ProductPrice";
import ProductCartIcon from "./ProductIcons/ProductCartIcon";
import ProductWishlistIcon from "./ProductIcons/ProductWishlistIcon";
import ProductDiscount from "./ProductDetails/ProductDiscount";

const ProfileProduct = ({ product, callbackFunction }) => {
  return (
    <div className="relative flex flex-col sm:flex-row gap-3 lg:gap-5">
      <ProductImage
        id={product.id}
        title={product.title}
        image={product.image}
        className="w-52 h-36"
      />
      <div className="w-full flex flex-col md:flex-row justify-between gap-3 lg:gap-5">
        <div className="flex flex-col gap-1">
          <ProductBadge rating={product.rating} textStyle="!text-xs" />
          <ProductTitle id={product.id} title={product.title} />
          <ProductRating max={5} rating={product.rating} className="mb-1" />
          <ProductStock stock={product.stock} />
        </div>
        <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2">
          <ProductPrice price={product.price} discount={product.discount} />
          <ProductWishlistIcon
            id={product.id}
            callbackFunction={callbackFunction}
          />
          <ProductCartIcon product={product} />
        </div>
      </div>
      {product.discount && <ProductDiscount discount={product.discount} />}
    </div>
  );
};

ProfileProduct.propTypes = {
  product: PropTypes.object.isRequired,
  callbackFunction: PropTypes.func,
};

export default ProfileProduct;
