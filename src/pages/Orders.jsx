import useGetFirestoreData from "../hooks/useGetFirestoreData";
import Button from "../ui/Button";
import {getAuth} from 'firebase/auth';
import Loading from '../ui/Loading';
import { Link } from "react-router-dom";

const Orders = () => {
  const auth = getAuth();
  const {data: orders, isLoading, error} = useGetFirestoreData('orders', null, {lhs: 'userId', op: '==', rhs: auth.currentUser.uid});
  const {data: products, isLoading:x, error:xx} = useGetFirestoreData('products');
  
  if (isLoading || x) {
    return <Loading />;
  }
  
  console.log(orders)
  console.log(products)

  const modifiedOrders = orders?.map(order => {
    let totalPrice = 0;
    let totalAmount = 0;
    let items = order.items.map(item => {
      const matchingProduct = products.find(product => product.id === item.id);
      totalPrice += matchingProduct?.price;
      totalAmount += parseInt(item.amount);
      return {
        productId: matchingProduct?.id,
        productTitle: matchingProduct?.title,
        productPrice: matchingProduct?.price,
        productImage: matchingProduct?.image,
        productAmount: item?.amount
      };
    })

    return { ...order, items, totalPrice, totalAmount}

  });

  return (
    <>
      {
        modifiedOrders?.map(order =>
          <div key={order.id} className='mb-10 p-5 bg-gray-100 shadow-lg'>
            <div className='mb-3 flex flex-row justify-between'>
              <div className='flex flex-col items-center'>
                <p className='text-xl font-semibold'>Order ID</p>
                <p className='text-base'>#{order.id}</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-xl font-semibold'>Placed On</p>
                <p>{order.timestamp.seconds}</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-xl font-semibold'>Shipped To</p>
                <p>22 zbi street, Cairo, Egypt, 11777</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-xl font-semibold'>Items</p>
                <p>{order.totalAmount}</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className='text-xl font-semibold'>Total</p>
                <p>${order.totalPrice}</p>
              </div>
            </div>
            <div className='mb-5 w-full border border-orange-600'></div>
            <div className='grid grid-cols-2 gap-8'>
              {
                order.items.map(item =>
                  <div key={item.id} className='flex flex-row items-start gap-10'>
                    <div className='flex flex-row gap-5'>
                      <Link to={`/product/${item.productId}`}>
                        <img src={item.productImage} alt={item.productTitle} className='w-36 h-36 object-cover border rounded-lg' />
                      </Link>
                      <div>
                        <Link to={`/product/${item.productId}`}>
                          <p className='mb-2 text-xl font-semibold tracking-wide'>{item.productTitle}</p>
                        </Link>
                        <p className='text-lg'>Amount: <span className='font-semibold'>{item.productAmount}</span></p>
                        <p className='mb-3 text-lg'>Price: <span className='font-semibold'>${item.productPrice}</span></p>
                        <Link to={`/product/${item.productId}`}>
                          <Button link text='Write a review' className='h-fit' />
                        </Link>
                      </div>
                    </div>
                  </div>  
                )
              }
            </div>
          </div>
        )
      }
    </>
  );
};

export default Orders;