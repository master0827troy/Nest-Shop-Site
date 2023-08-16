import { Link } from 'react-router-dom';
import CategoryProducts from '../components/Products/CategoryProducts';
import Promotions from '../components/Promotions';
import {brands, promotionsList1, topCategories} from '../data';
import Slider from 'react-slick';
import useGetFirestoreData from '../hooks/useGetFirestoreData';
import Loading from '../ui/Loading';
import { useEffect, useState } from 'react';

const Home = () =>{
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
  };

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError
  } = useGetFirestoreData('products');

  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    if (products) {
      setAllProducts(products)
    }
  }, [products])
  

  if (productsLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className='my-12'>
        <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6'>
          {
            topCategories.map(category => 
              <Link key={category.id} to={`/category/${category.path}`}>
                <div className='relative rounded-xl overflow-hidden'>
                  <img src={category.image} alt="" className='w-full transition duration-500 hover:scale-125' />
                  <p className='absolute to top-6 left-1/2 -translate-x-1/2 text-3xl capitalize font-semibold text-white'>{category.text}</p>
                </div>
              </Link>
            )
          }
        </div>
      </div>

            <Promotions promotions={promotionsList1} />
      <div className='mb-12'>
        <div className='-mx-1'>
          <Slider {...settings}>
            {
              brands.map((brand, index) => 
                <Link key={brand.id} to='/'>
                  <div className='rounded-xl overflow-hidden'>
                    <img src={brand.image} alt="" className='w-full' />
                  </div>
                </Link>
              )
            }
          </Slider>
        </div>
      </div>


      <div>
        <h2 className='section-heading'>Todays Best Deals For You!</h2>
        <CategoryProducts products={allProducts} />
      </div>
    </>
  );
};

export default Home