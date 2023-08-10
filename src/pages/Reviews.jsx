import Rating from "../components/Rating";
import {FaPen} from 'react-icons/fa';
import {FiTrash2} from 'react-icons/fi';
import useGetFirestoreData from "../hooks/useGetFirestoreData";
import {getAuth} from 'firebase/auth';
import {doc, deleteDoc} from 'firebase/firestore';
import {db} from '../firebase';
import {useState} from 'react';
import ReviewForm from "../components/Forms/ReviewForm";
import Loading from "../ui/Loading";
import { Link } from "react-router-dom";

const Reviews = () => {
  const [editingReview, setEditingReview] = useState(null);

  const auth = getAuth();
  const {data: reviews, isLoading, error} = useGetFirestoreData('reviews', null, {lhs: 'userId', op: '==', rhs: auth.currentUser.uid});
  const {data: products, isLoading:x, error:xx} = useGetFirestoreData('products');
  
  if (isLoading || x) {
    return <Loading />;
  }
  
  let combinedArray = [];
  if (reviews && products) {
    combinedArray = reviews.map(review => {
      const matchingProduct = products.find(product => product.id === review.productId);
      return {
        reviewId: review.id,
        reviewText: review.text,
        reviewRating: review.rating,
        productId: matchingProduct.id,
        productImage: matchingProduct.image,
        productTitle: matchingProduct.title
      };
    });
  }

  const deleteReviewHandler = async (review) => {
    const ref = doc(db, 'reviews', review.reviewId);
    try {
      await deleteDoc(ref);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className='p-5 bg-gray-100 shadow-lg'>
        <div className='w-fit mb-5'>
          <h3 className='pb-2 text-xl font-semibold tracking-wide'>Your Reviews</h3>
          <div className='w-1/2 border border-orange-600'></div>
        </div>
          {
            combinedArray.map(review => 
              editingReview !== combinedArray.indexOf(review) ?
                <div key={review.productId} className='mb-6'>
                  <div className='flex flex-row gap-6'>
                    <Link to={`/product/${review.productId}`}>
                      <img src={review.productImage} alt='' className='w-36 h-36 object-cover border rounded-lg' />
                    </Link>
                    <div>
                      <Link to={`/product/${review.productId}`}>
                        <p className='mb-2 text-xl font-semibold tracking-wide'>{review.productTitle}</p>
                      </Link>
                      <Rating max={5} rating={review.reviewRating} className='mb-3 justify-center lg:justify-start'>
                        <p className='text-sm'>{review.date}</p>
                      </Rating>
                      <p className='max-w-3xl text-center lg:text-left tracking-wider leading-7'>{review.reviewText}</p>
                    </div>
                    <FaPen className='text-lg cursor-pointer transition duration-300 hover:text-orange-600 hover:scale-125' onClick={() => setEditingReview(combinedArray.indexOf(review))}  />
                    <FiTrash2 className='text-lg cursor-pointer transition duration-300 hover:text-orange-600 hover:scale-125' onClick={() => deleteReviewHandler(review)} />
                  </div>
                </div>
              :
                <div  key={review.productId} className="mb-6">
                  <ReviewForm reviews={reviews} review={review} changeHandler={setEditingReview} />
                </div>
            )
          }
      </div>
    </>
  );
};

export default Reviews;