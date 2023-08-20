import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {doc, updateDoc} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {db} from '../firebase';
import CustomerReviews from '../components/CustomerReviews';
import ReviewForm from '../components/Forms/ReviewForm';
import CustomerRatings from '../components/CustomerRatings';
import useGetFirestoreData from '../hooks/useGetFirestoreData';
import ProductStock from '../components/Products/Product/ProductDetails/ProductStock';
import ProductTitle from '../components/Products/Product/ProductDetails/ProductTitle';
import ProductTotalReviews from '../components/Products/Product/ProductDetails/ProductTotalReviews';
import ProductImage from '../components/Products/Product/ProductDetails/ProductImage';
import ProductImageSlider from '../components/Products/Product/ProductDetails/ProductImageSlider';
import AddToCartButton from '../components/Products/Product/ProductButtons/AddToCartButton';
import SaveToWishlistButton from '../components/Products/Product/ProductButtons/SaveToWishlistButton';
import ProductDescription from '../components/Products/Product/ProductDetails/ProductDescription';
import Heading from '../components/Heading';
import ProductPrice from '../components/Products/Product/ProductDetails/ProductPrice';
import RelatedProducts from '../components/Products/RelatedProducts';
import ProductRating from '../components/Products/Product/ProductDetails/ProductRating';
import Loading from '../ui/Loading';
import {toast} from 'react-toastify';
import ProductBadge from '../components/Products/Product/ProductDetails/ProductBadge';

const Product = () => {
  const { id } = useParams();
  const auth = getAuth();
  
  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
  const userId = auth.currentUser?.uid;

  
  const {
    data: product,
    isLoading: productLoading,
    error: productError
  } = useGetFirestoreData('products', id)
  
  const {
    data: reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
    reFetchData: reFetchReviews
  } = useGetFirestoreData('reviews');

  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError
  } = useGetFirestoreData('users', userId);

  const {
    data: relatedProducts,
    isLoading: relatedProductsLoading,
    error: relatedProductsError
  } = useGetFirestoreData('products', null, null, null, null, 4)
  
  const [productData, setProductData] = useState();
  const [productReviews, setProductReviews] = useState([]);
  const [rProducts, setRProducts] = useState([]);
  const [reviewForm, setReviewForm] = useState(false);

  useEffect(() => {
    if (userData?.recentlyViewed) {
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

      addProductToRecentlyViewed();
    }
  }, [id, userData?.recentlyViewed, userId])
  

useEffect(() => {
  if (product) {
    setProductData(product);
  }
}, [product])

useEffect(() => {
  if (reviews) {
    const productReviews = [];
    for (const review of reviews) {
      if (review.productId === id) {
        productReviews.push(review);
      }
    }

    setProductReviews(productReviews)
    setReviewForm(isAuthenticated && !(reviews?.find(review => review?.userId === userId && review?.productId === id)))
  }
}, [id, isAuthenticated, reviews, userId])


  useEffect(() => {
    if (relatedProducts && reviews) {
      const updatedProducts = relatedProducts.map(product => {
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

      setRProducts(updatedProducts)
    }
  }, [id, relatedProducts, reviews])
  
  useEffect(() => {
    if (productError || reviewsError || userDataError || relatedProductsError && 
      (!productLoading && !reviewsLoading && userDataLoading && relatedProductsLoading)) {
      toast.error('An error occurred!');
    }
  }, [productError, productLoading, relatedProductsError, relatedProductsLoading, reviewsError, reviewsLoading, userDataError, userDataLoading])
  
  let productRating = 0;
  const totalReviews = productReviews.length;
  
  if (totalReviews) {
    for (const review of productReviews) {
      productRating = (productRating + review.rating);
    }
    productRating = (productRating / totalReviews);
  }
  
  const ratings = [];
  for (let i = 5; i >= 1; i--) {
    const ratingCount = productReviews?.reduce(function(acc, obj) {
      return acc + (obj.rating === i ? 1 : 0);
    }, 0);
    
    ratings.push({ value: i, rating: ratingCount });
  }
  
  if (!productData || productLoading || reviewsLoading || userDataLoading || relatedProductsLoading) return <Loading />;

  console.log(reviews)
  console.log(productReviews)
  return (
    <div className='my-12'>
      <div className="flex flex-col xl:flex-row justify-between gap-12 lg:gap-14">
        <div className='grow'>
          <div className="mb-12 flex flex-col md:flex-row gap-8">
            <div className='md:w-80 h-full space-y-4'>
              {
                productData.images ?
                  <ProductImageSlider images={productData.images} />
                :
                  <ProductImage title={productData.title} image={productData.image} className='w-full h-full' />
              }
            </div>
            <div className='max-w-2xl flex flex-col gap-4'>
              <ProductBadge rating={productRating} />
              <ProductTitle title={productData.title} />
              <div className='flex flex-row gap-2'>
                <ProductRating max={5} rating={productRating} />
                <ProductTotalReviews reviews={totalReviews} />
              </div>
              <ProductPrice vertical price={productData.price} discount={productData.discount} />
              <ProductStock stock={productData.stock} />
              <ProductDescription description={productData.description} />
              <div className="flex flex-col lg:flex-row gap-3">
                <SaveToWishlistButton id={id} />
                <AddToCartButton product={{id, ...productData}} />
              </div>
            </div>
          </div>
          <div>
            <Heading heading='Customer reviews' className='text-center lg:text-left mb-10' />
            <div className='flex flex-col lg:flex-row items-center lg:items-start gap-12'>
              <CustomerRatings productRating={productRating} productReviews={totalReviews} ratings={ratings} />
              <div className='grow'>
                <CustomerReviews customerReviews={productReviews} />
                {
                  reviewForm &&
                  <>
                    <Heading heading='Leave a review' className='mb-5' />
                    <ReviewForm show={reviewForm} changeHandler={setReviewForm} callbackFunction={reFetchReviews} userId={userId} productId={id} />
                  </>
                }
              </div>
            </div>
          </div>
        </div>
        <RelatedProducts products={rProducts} />
      </div>
    </div>
  )
}

export default Product