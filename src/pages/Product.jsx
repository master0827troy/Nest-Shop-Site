import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import {RiHeart3Line, RiShoppingCart2Line} from 'react-icons/ri';
import SingleProduct from '../components/SingleProduct';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import CustomerReviews from '../components/CustomerReviews';
import Rating from '../components/Rating';
import { products } from '../data';
import Price from '../components/Price';
import ReviewForm from '../components/Forms/ReviewForm';
import CustomerRatings from '../components/CustomerRatings';
import useGetFirestoreData from '../hooks/useGetFirestoreData';
import { useNavigate, useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getAuth} from 'firebase/auth';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '../firebase';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  
  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
  const userId = auth.currentUser?.uid;
  
  const {
    data,
    isLoading,
    error
  } = useGetFirestoreData('products', id)

  const {
    data: reviews,
    isLoading: reviewsLoading,
    error: reviewsError
  } = useGetFirestoreData('reviews', null, {lhs: 'productId', op: '==', rhs: id});

  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError
  } = useGetFirestoreData('users', userId);

  const [productData, setProductData] = useState({});
  
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  useEffect(() => {
    const addProductToRecentlyViewed = async () => {
      let updatedRecentlyViewed = userData.recentlyViewed.includes(id) ?
          [id, ...userData.recentlyViewed.filter(item => item !== id)]
        :
          [id, ...userData.recentlyViewed];
      
      if (updatedRecentlyViewed.length > 8) {
        updatedRecentlyViewed = updatedRecentlyViewed.slice(0, 8);
      }

      await updateDoc(doc(db, 'users', userId), {
        recentlyViewed: updatedRecentlyViewed
      });
    }
    
    if (data && userData) {
      setProductData(data);
      addProductToRecentlyViewed();
    }
  }, [data, id, userData, userId])
  
  if (isLoading || !reviews) return <h3>Loading...</h3>;
  if (error) navigate('/');

  let productRating = 0;
  const totalReviews = reviews.length;
  const currentUserReview = reviews.find(review => review?.userId === userId);

  if (totalReviews) {
    for (const review of reviews) {
      productRating += review.rating;
    }
    productRating /= totalReviews;
  }
  
  const ratings = [];
  for (let i = 5; i >= 1; i--) {
    const ratingCount = reviews.reduce(function(acc, obj) {
      return acc + (obj.rating === i ? 1 : 0);
    }, 0);

    ratings.push({ value: i, rating: ratingCount });
  }

  const images = [
    'https://f.nooncdn.com/p/v1686663857/N41247610A_1.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829013/N41247610A_2.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829014/N41247610A_3.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829014/N41247610A_4.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829014/N41247610A_5.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829014/N41247610A_7.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829014/N41247610A_8.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829014/N41247610A_9.jpg?format=avif&width=240',
    'https://f.nooncdn.com/p/v1667829014/N41247610A_10.jpg?format=avif&width=240'
  ];

  const firstSliderSettings = {
    infinite: true,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    asNavFor: nav2
  };

  const secondSliderSettings = {
    slidesToShow: 4,
    swipeToSlide: true,
    focusOnSelect: true,
    asNavFor: nav1
  };

  return (
    <div className='my-12'>
      <div className="flex flex-col xl:flex-row justify-between gap-12 lg:gap-14">
        <div className='grow'>
          <div className="mb-12 flex flex-col md:flex-row gap-8">
            <div className='md:w-80 h-full space-y-4'>
              <Slider {...firstSliderSettings} ref={(slider1) => setNav1(slider1)}>
                {
                  images.map((image, index) => 
                    <img key={index} src={image} alt='' className='w-full h-full object-cover border rounded-lg cursor-pointer' />
                  )
                }
              </Slider>
              <Slider {...secondSliderSettings} ref={(slider2) => setNav2(slider2)} >
                {
                  images.map((image, index) =>
                    <div key={index}>
                        <img src={image} alt='' className='w-16 h-16 object-cover border border-slate-200 rounded-lg cursor-pointer transition duration-500 hover:border-slate-400' />
                    </div>
                  )
                }
              </Slider>
            </div>
            <div>
              <Badge type='best' />
              <p className='max-w-2xl mb-4 text-xl font-semibold tracking-wide'>{productData.title}</p>
              <Rating max={5} rating={productRating}>
                <span className='text-sm'>({totalReviews})</span>
              </Rating>
              <Price className='my-5' newPrice={399} oldPrice={599} fontSizes={['text-2xl', 'text-lg']} />
              <div className="group mb-4 flex flex-row items-center">
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-0.5 mr-2 group-hover:animate-ping"></span>
                <span>{productData.stock} units left in stock</span>
              </div>
              <p className='max-w-lg mb-6 text-md tracking-wide leading-7'>{productData.description}</p>
              <div className="flex flex-col lg:flex-row gap-3">
                <Button text='Save for later' className='text-lg w-60' noBg>
                  <RiHeart3Line className='text-2xl' />
                </Button>
                <Button text='Add to cart' className='text-lg w-60' noBg>
                  <RiShoppingCart2Line className='text-2xl' />
                </Button>
              </div>
            </div>
          </div>
          <div>
            <p className='text-2xl text-center lg:text-left font-semibold mb-10'>Customer reviews</p>
            <div className='flex flex-col lg:flex-row items-center lg:items-start gap-12'>
              <CustomerRatings productRating={productRating} productReviews={totalReviews} ratings={ratings} />
              <div className='grow'>
                <CustomerReviews customerReviews={reviews} />
                {
                  isAuthenticated && !currentUserReview &&
                  <>
                    <p className='text-2xl font-semibold mb-5'>Leave a review</p>
                    <ReviewForm userId={userId} productId={id} />
                  </>
                }
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className='text-2xl font-semibold mb-8'>Similar Products</p>
          <div className='w-full xl:w-64 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:flex xl:flex-col gap-8'>
            <SingleProduct product={products[0]} />
            <SingleProduct product={products[1]} />
            <SingleProduct product={products[6]} />
            <SingleProduct product={products[4]} />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Product