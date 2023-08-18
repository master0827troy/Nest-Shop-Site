import { Link } from 'react-router-dom';
import CategoryProducts from '../components/Products/CategoryProducts';
import Promotions from '../components/Promotions';
import {brands, promotionsList1, topCategories} from '../data';
import Slider from 'react-slick';
import useGetFirestoreData from '../hooks/useGetFirestoreData';
import Loading from '../ui/Loading';
import { useEffect, useState } from 'react';
import {toast} from 'react-toastify';

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
  } = useGetFirestoreData('products', null, null, null, null, 8);

  const {
    data: reviews,
    isLoading: reviewsLoading,
    error: reviewsError
  } = useGetFirestoreData('reviews');

  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    if (products && reviews) {
      const updatedProducts = products.map(product => {
        let productRating = 0;
        let productReviews = 0;
        for (const review of reviews) {
          if (review.productId === product.id) {
            productRating += review.rating;
            productReviews += 1;
          }
        }

        return {
          ...product,
          rating: productRating ? productRating / productReviews : 0,
          reviews: productReviews
        };
      })

      setAllProducts(updatedProducts)
    }

    if (productsError || reviewsError && (!reviewsLoading && !productsLoading)) {
      toast.error('An error occurred!');
    }
  }, [products, productsError, productsLoading, reviews, reviewsError, reviewsLoading])

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
              brands.map(brand => 
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

      <div className='mb-12'>
        <h2 className='section-heading'>Todays Best Deals For You!</h2>
        {
          (productsLoading || reviewsLoading) ? <Loading /> : <CategoryProducts products={allProducts} />
        }
      </div>
    </>
  );
};

export default Home