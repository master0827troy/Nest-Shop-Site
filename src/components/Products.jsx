import SingleProduct from './SingleProduct'
import Pagination from '../ui/Pagination';

const Products = (props) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {
        props.products.map(product => 
          <SingleProduct key={product.id} product={product} />  
        )
      }
      </div>
      {
        props.paginationOptions && <Pagination {...props.paginationOptions} />
      }
    </>
  )
}

export default Products