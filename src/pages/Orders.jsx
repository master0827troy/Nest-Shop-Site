import Rating from "../components/Rating";
import Button from "../ui/Button";

const Orders = () => {
  return (
    <>
      <div className='mb-10 p-5 bg-gray-100 shadow-lg'>
        <div className='mb-3 flex flex-row justify-between'>
          <div className='flex flex-col items-center'>
            <p className='text-xl font-semibold'>Order ID</p>
            <p className='text-base'>#384679127</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-xl font-semibold'>Placed On</p>
            <p>5 November 2022</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-xl font-semibold'>Shipped To</p>
            <p>22 zbi street, Cairo, Egypt, 11777</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-xl font-semibold'>Items</p>
            <p>3</p>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-xl font-semibold'>Total</p>
            <p>$600</p>
          </div>
        </div>
        <div className='mb-5 w-full border border-orange-600'></div>
        <div className='grid grid-cols-2 gap-8'>
          <div className='flex flex-row items-start gap-10'>
            <div className='flex flex-row gap-5'>
              <img src='https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe1-300x300.jpg' alt='' className='w-36 h-36 object-cover border rounded-lg' />
              <div>
                <p className='mb-2 text-xl font-semibold tracking-wide'>Lorem ipsum dolor sit amet.</p>
                <p className='text-lg'>Items: <span className='font-semibold'>1</span></p>
                <p className='mb-3 text-lg'>Price: <span className='font-semibold'>$100</span></p>
                <Button link text='Write a review' className='h-fit' />
              </div>
            </div>
          </div>
          <div className='flex flex-row items-start gap-10'>
            <div className='flex flex-row gap-5'>
              <img src='https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe1-300x300.jpg' alt='' className='w-36 h-36 object-cover border rounded-lg' />
              <div>
                <p className='mb-2 text-xl font-semibold tracking-wide'>Lorem ipsum dolor sit amet.</p>
                <p className='text-lg'>Items: <span className='font-semibold'>1</span></p>
                <p className='mb-3 text-lg'>Price: <span className='font-semibold'>$100</span></p>
                <Button link text='Write a review' className='h-fit' />
              </div>
            </div>
          </div>
          <div className='flex flex-row items-start gap-10'>
            <div className='flex flex-row gap-5'>
              <img src='https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/sports-shoe1-300x300.jpg' alt='' className='w-36 h-36 object-cover border rounded-lg' />
              <div>
                <p className='mb-2 text-xl font-semibold tracking-wide'>Lorem ipsum dolor sit amet.</p>
                <p className='text-lg'>Items: <span className='font-semibold'>1</span></p>
                <p className='mb-3 text-lg'>Price: <span className='font-semibold'>$100</span></p>
                <Button link text='Write a review' className='h-fit' />
              </div>
            </div>
          </div>
    
        </div>
      </div>
    </>
  );
};

export default Orders;