import {FaStar} from 'react-icons/fa6';
import Stars from '../ui/Stars';

const CustomerRatings = (props) => {
  return (
    <div className='shadow-md w-fit h-fit p-5'>
      <div className="flex flex-col items-center gap-2 mb-3">
        <span className='text-xl'>
          <span className='font-semibold'>{props.productRating}</span>
          /5
        </span>
        <Stars max={5} numberOfStars={props.productRating} />
        <span>{props.productReviews} verified ratings</span>
      </div>
      {
        props.ratings.map(rating =>
          <div key={rating.value} className='flex flex-row items-center justify-start gap-2 h-fit'>
            <span className='w-3'>{rating.value}</span>
            <FaStar className='text-orange-600' />
            <div className='w-44 h-4 relative bg-gray-300'>
              <div className='absolute h-full z-10 bg-orange-600' style={{ width: `${(rating.rating / props.productReviews) * 100}%` }}></div>
            </div>
            <span className='text-sm'>({rating.rating})</span>
          </div>  
        )
      }
    </div>
  );
};

export default CustomerRatings;