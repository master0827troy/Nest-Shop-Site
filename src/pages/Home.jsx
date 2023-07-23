import { Link } from 'react-router-dom';
import Products from '../components/Products';
import Promotions from '../components/Promotions';
import {brands, promotionsList1, topCategories, products} from '../data';

const Home = () =>{
  return (
    <>
      <div className='my-12'>
        <h2 className='section-heading'>shop from our top categories</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6'>
          {
            topCategories.map(category => 
              <Link key={category.id} to='/category/x'>
                <div className='relative rounded-xl overflow-hidden'>
                  <img src={category.image} alt="" className='w-full transition duration-500 hover:scale-125' />
                  <p className='absolute to top-6 left-1/2 -translate-x-1/2 text-3xl capitalize font-semibold text-white'>{category.text}</p>
                </div>
              </Link>
            )
          }
        </div>
      </div>

      <div className='mb-12'>
        <h2 className='section-heading'>choose from our top brands</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {
            brands.map(brand =>
              <Link key={brand.id} to='/'>
                <div className='rounded-xl overflow-hidden'>
                  <img src={brand.image} alt="" className='w-full' />
                </div>
              </Link>
            )
          }
        </div>
      </div>

      <Promotions promotions={promotionsList1} />

      <div>
        <h2 className='section-heading'>Todays Best Deals For You!</h2>
        <Products products={products} />
      </div>
    </>
  );
};

export default Home