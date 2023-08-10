import { getAuth } from "firebase/auth";
import useGetFirestoreData from "../hooks/useGetFirestoreData";
import Loading from '../ui/Loading';
import {Link} from 'react-router-dom';
import Rating from '../components/Rating';
import Badge from "../ui/Badge";

const RecentlyViewed = () => {
  const auth = getAuth();
  const {data: userData, isLoading, error} = useGetFirestoreData('users', auth.currentUser.uid);
  const {data: products, isLoading:x, error:xx} = useGetFirestoreData('products');

  if (!userData || !products || isLoading || x) {
    return <Loading />;
  }

  const recentlyViewed = [];
  if (userData?.recentlyViewed) {
    recentlyViewed.push(...userData.recentlyViewed.map(item => {
      const matchingProduct = products.find(product => product.id === item);
      return { ...matchingProduct };
    }));
  }

  console.log(recentlyViewed)
  return (
    <>
    <div className='p-5 bg-gray-100 shadow-lg'>
        <div className='w-fit mb-5'>
          <h3 className='pb-2 text-xl font-semibold tracking-wide'>Recently Viewed</h3>
          <div className='w-1/2 border border-orange-600'></div>
        </div>
        <div className='grid grid-cols-2 gap-8'>
          {
            recentlyViewed.map(item =>
              <div key={item.id} className='flex flex-row gap-5'>
                  <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.title} className='w-52 h-36 object-fill border rounded-lg' />
                  </Link>
                  <div className='w-full flex flex-row gap-10'>
                    <div>
                      <Badge type='best' />
                      <Link to={`/product/${item.productId}`}>
                        <p className='mb-2 text-xl font-semibold tracking-wide'>{item.title }</p>
                      </Link>
                      <Rating max={5} rating={item.rating} className='mb-2' />
                      <div className="group flex flex-row items-center">
                        <span className="inline-block w-2 h-2 bg-slate-900 rounded-full mr-2 group-hover:animate-ping"></span>
                        <span>{item.stock} units left in stock</span>
                      </div>
                    </div>
                    <div className='mb-3 space-y-1 text-center'>
                      <p className='text-xl font-bold'>${item.price}</p>
                      <p className='text-lg line-through'>$799</p>
                    </div>
                  </div>
              </div>  
            )
          }
        </div>
      </div>
    </>
  );
};

export default RecentlyViewed;