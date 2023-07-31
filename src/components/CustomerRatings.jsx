import {FaStar} from 'react-icons/fa6';
import Stars from '../ui/Stars';
const CustomerRatings = () => {
  return (
    <div className='shadow-md w-fit h-fit p-5'>
      <div className="flex flex-col items-center gap-2 mb-3">
        <span className='text-xl'>
          <span className='font-semibold'>4.3</span>
          /5
        </span>
        <Stars max={5} numberOfStars={4.3} />
        <span>733 verified ratings</span>
      </div>
      <div className='flex flex-row items-center justify-start gap-2 h-fit mb-2'>
        <span className='w-3'>5</span>
        <FaStar className='text-orange-600' />
        <div className='w-44 h-4 bg-gray-300'></div>
        <span className='text-sm'>(54)</span>
      </div>
      <div className='flex flex-row items-center justify-start gap-2 h-fit mb-2'>
        <span className='w-3'>4</span>
        <FaStar className='text-orange-600' />
        <div className='w-44 h-4 bg-gray-300'></div>
        <span className='text-sm'>(54)</span>
      </div>
      <div className='flex flex-row items-center justify-start gap-2 h-fit mb-2'>
        <span className='w-3'>3</span>
        <FaStar className='text-orange-600' />
        <div className='w-44 h-4 bg-gray-300'></div>
        <span className='text-sm'>(54)</span>
      </div>
      <div className='flex flex-row items-center justify-start gap-2 h-fit mb-2'>
        <span className='w-3'>2</span>
        <FaStar className='text-orange-600' />
        <div className='w-44 h-4 bg-gray-300'></div>
        <span className='text-sm'>(54)</span>
      </div>
      <div className='flex flex-row items-center justify-start gap-2 h-fit'>
        <span className='w-3'>1</span>
        <FaStar className='text-orange-600' />
        <div className='w-44 h-4 bg-gray-300'></div>
        <span className='text-sm'>(54)</span>
      </div>
    </div>
  );
};

export default CustomerRatings;