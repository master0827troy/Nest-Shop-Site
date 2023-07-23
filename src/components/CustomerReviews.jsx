import Rating from './Rating'
import usePagination from '../hooks/usePagination'
import Pagination from '../ui/Pagination';

const CustomerReviews = (props) => {
  const [modifiedData, paginationOptions] = usePagination(props.customerReviews, 3);

  return (
    <div>
      <p className='text-2xl mb-8'>Customer reviews</p>
      {
        modifiedData.map(review => 
          <div key={review.id} className='mb-6'>
            <div className='flex flex-row items-center gap-2 mb-2'>
              <img src={review.userImage} alt="" className='w-6' />
              <p>{review.username}</p>
            </div>
            <Rating max={5} rating={review.rating} className='mb-3'>
              <p className='text-sm'>{review.date}</p>
            </Rating>
            <p className='max-w-2xl tracking-wider leading-7'>{review.text}</p>
          </div>
        )
      }

      <Pagination {...paginationOptions} />
    </div>
  )
}

export default CustomerReviews