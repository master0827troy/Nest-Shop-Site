import PropTypes from 'prop-types';
import CategoryProduct from './Product/CategoryProduct'
import Pagination from '../../ui/Pagination';

const CategoryProducts = ({ products, paginationOptions }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {
        products.map(product => 
          <CategoryProduct key={product.id} product={product} />  
        )
      }
      </div>
      {
        paginationOptions && <Pagination {...paginationOptions} />
      }
    </>
  )
}

CategoryProducts.propTypes = {
  products: PropTypes.array.isRequired,
  paginationOptions: PropTypes.object,
};

export default CategoryProducts