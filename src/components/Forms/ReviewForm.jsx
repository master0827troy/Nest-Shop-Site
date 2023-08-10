import Button from '../../ui/Button';
import {useState} from 'react';
import {doc, updateDoc, addDoc, collection, serverTimestamp} from 'firebase/firestore';
import {db} from '../../firebase';
import StarInput from '../../ui/StarInput';

const ReviewForm = (props) => {
  const [text, setReview] = useState(props.review?.reviewText || '')
  const [rating, setRating] = useState(props.review?.reviewRating || 0)

  const editReviewHandler = async () => {
    const review = props.review;

    await updateDoc(doc(db, 'reviews', review.reviewId), {
      text, rating
    });
    
    props.changeHandler(null);
  };

  const submitReviewHandler = async () => {
    await addDoc(collection(db, 'reviews'), {
      productId: props.productId,
      userId: props.userId,
      rating,
      text,
      timestamp: serverTimestamp()
    });
  };

  return (
    <>
      <textarea className='w-full py-1 px-2 border min-h-[5rem] max-h-40 mb-4 outline-none transition duration-500 focus:border-orange-600' value={text} onChange={(e) => setReview(e.target.value)} />
      <div className="flex flex-row items-start justify-between">
        <StarInput numberOfStars={5} rating={rating} setRating={setRating} />
        <div className='flex flex-row gap-5'>
          {
            props.review && <Button bg text='Cancel' onClick={() => props.changeHandler(null)} />
          }
          <Button bg text='Submit' onClick={props.review ? editReviewHandler : submitReviewHandler} />
        </div>
      </div>
    </>
  );
};


export default ReviewForm;