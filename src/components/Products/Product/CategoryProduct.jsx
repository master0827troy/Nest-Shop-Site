import PropTypes from "prop-types";
import ProductImage from "./ProductDetails/ProductImage";
import ProductWishlistIcon from "./ProductIcons/ProductWishlistIcon";
import ProductPrice from "./ProductDetails/ProductPrice";
import ProductCartIcon from "./ProductIcons/ProductCartIcon";
import ProductTitle from "./ProductDetails/ProductTitle";
import ProductRating from "./ProductDetails/ProductRating";
import ProductTotalReviews from "./ProductDetails/ProductTotalReviews";
import ProductDiscount from "./ProductDetails/ProductDiscount";
import ProductBadge from "./ProductDetails/ProductBadge";

const CategoryProduct = ({ product }) => {
  return (
    <div className="relative max-w-full mb-2 pb-3 overflow-hidden rounded-lg shadow-lg text-gray-900 group">
      <ProductImage
        id={product.id}
        title={product.title}
        image={product.image}
        className="h-48 w-full"
      />
      <div className="px-4 py-2 flex flex-row justify-between gap-1">
        <div className="flex flex-col gap-1">
          <ProductBadge rating={product.rating} textStyle="!text-xs" />
          <div className="flex flex-row gap-2">
            <ProductRating max={5} rating={product.rating} />
            <ProductTotalReviews reviews={product.reviews} />
          </div>

          <ProductPrice
            price={product.price}
            discount={product.discount}
            vertical={true}
          />
          <ProductTitle id={product.id} title={product.title} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <ProductWishlistIcon id={product.id} />
          <ProductCartIcon product={product} />
        </div>
      </div>
      {product.discount && <ProductDiscount discount={product.discount} />}
    </div>
  );
};

CategoryProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export default CategoryProduct;
