import Rating from './Rating'
import usePagination from '../hooks/usePagination'
import Pagination from '../ui/Pagination';

const CustomerReviews = (props) => {
  const [modifiedData, paginationOptions] = usePagination(props.customerReviews, 3, null, null, null, null, '!justify-center lg:justify-start');

  return (
    <div className='mb-12'>
      {
        modifiedData.map(review => 
          <div key={review.id} className='mb-6'>
            <div className='flex flex-row items-center justify-center lg:justify-start gap-2 mb-2'>
              <img src={review.userImage} alt="" className='w-6' />
              <p>{review.username}</p>
            </div>
            <Rating max={5} rating={review.rating} className='mb-3 justify-center lg:justify-start'>
              <p className='text-sm'>{review.date}</p>
            </Rating>
            <p className='max-w-2xl text-center lg:text-left tracking-wider leading-7'>{review.text}</p>
          </div>
        )
      }

      <Pagination {...paginationOptions} />
    </div>
  )
}

export default CustomerReviews