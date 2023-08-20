import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import useGetFirestoreData from "../hooks/useGetFirestoreData";
import Loading from '../ui/Loading';
import OrderProducts from '../components/Products/OrderProducts';
import { useEffect, useState } from 'react';

const Orders = () => {
  const auth = getAuth();
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError
  } = useGetFirestoreData('orders', null, {lhs: 'userId', op: '==', rhs: auth.currentUser.uid});

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError
  } = useGetFirestoreData('products');

  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    setUserOrders(orders?.map(order => {
      let totalPrice = 0;
      let totalAmount = 0;
      const items = order.items.map(item => {
        const matchingProduct = products?.find(product => product.id === item.id);
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
    }));

    if ((ordersError || productsError) && (!ordersLoading && !productsLoading)) {
      toast.error('An error occurred!');
    }
  }, [orders, ordersError, ordersLoading, products, productsError, productsLoading])
  
  if (ordersLoading || productsLoading) {
    return <Loading />;
  }

  return (
    <>
      {
        userOrders?.length > 0 ?
          userOrders?.map(order =>
            <div key={order.id} className='mb-10 p-5 bg-gray-100 shadow-lg'>
              <div className='mb-3 flex flex-row justify-between'>
                <div className='flex flex-col items-center'>
                  <p className='text-xl font-semibold'>Order ID</p>
                  <p>#{order.id}</p>
                </div>
                <div className='flex flex-col items-center'>
                  <p className='text-xl font-semibold'>Placed On</p>
                  <p>{order.timestamp.seconds}</p>
                </div>
                <div className='flex flex-col items-center'>
                  <p className='text-xl font-semibold'>Shipped To</p>
                  <p>{order.address.apartment} {order.address.street}, {order.address.city}, {order.address.country}, {order.address.postalNumber}</p>
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
                <OrderProducts products={order.items} />
              </div>
            </div>
          )
        :
          <p>You have no previously created orders!</p>
      }
    </>
  );
};

export default Orders;