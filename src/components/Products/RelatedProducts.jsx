import PropTypes from 'prop-types';
import SingleProduct from './Product/CategoryProduct';
import Heading from '../Heading';

const RelatedProducts = ({ products }) => {
  return (
    <div className='flex flex-col'>
      <Heading heading='Similar Products' className='mb-8' />
      <div className='w-full xl:w-64 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:flex xl:flex-col gap-8'>
        {
          products.map(product =>
            <SingleProduct key={product.id} product={product} />
          )
        }
      </div>
    </div>
  );
};

RelatedProducts.propTypes = {
  products: PropTypes.array.isRequired,
};

export default RelatedProducts;