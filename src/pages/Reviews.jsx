import Rating from "../components/Rating";
import { customerReviews } from "../data";
import {FaPen} from 'react-icons/fa';
import {FiTrash2} from 'react-icons/fi';

const Reviews = () => {
  return (
    <>
      <div className='p-5 bg-gray-100 shadow-lg'>
        <div className='w-fit mb-5'>
          <h3 className='pb-2 text-xl font-semibold tracking-wide'>Your Reviews</h3>
          <div className='w-1/2 border border-orange-600'></div>
        </div>
          {
            customerReviews.map(review => 
              <div key={review.id} className='mb-6'>
                <div className='flex flex-row gap-6'>
                  <img src='https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe1-300x300.jpg' alt='' className='w-36 h-36 object-cover border rounded-lg' />
                  <div>
                    <p className='mb-2 text-xl font-semibold tracking-wide'>Lorem ipsum dolor sit amet.</p>
                    <Rating max={5} rating={review.rating} className='mb-3 justify-center lg:justify-start'>
                      <p className='text-sm'>{review.date}</p>
                    </Rating>
                    <p className='max-w-3xl text-center lg:text-left tracking-wider leading-7'>{review.text}</p>
                  </div>
                  <FaPen className='text-lg cursor-pointer transition duration-300 hover:text-orange-600 hover:scale-125' />
                  <FiTrash2 className='text-lg cursor-pointer transition duration-300 hover:text-orange-600 hover:scale-125' />
                </div>
              </div>
            )
          }
      </div>
    </>
  );
};

export default Reviews;