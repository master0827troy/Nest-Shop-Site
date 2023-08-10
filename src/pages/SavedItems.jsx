import { getAuth } from "firebase/auth";
import useGetFirestoreData from "../hooks/useGetFirestoreData";
import Loading from '../ui/Loading';
import {Link} from 'react-router-dom';
import Rating from '../components/Rating';
import Badge from "../ui/Badge";

const SavedItems = () => {
  const auth = getAuth();
  const {data: userData, isLoading, error} = useGetFirestoreData('users', auth.currentUser.uid);
  const {data: products, isLoading:x, error:xx} = useGetFirestoreData('products');

  if (!userData || !products || isLoading || x) {
    return <Loading />;
  }

  const savedItems = [];
  if (userData?.savedItems) {
    savedItems.push(...userData.savedItems.map(item => {
      const matchingProduct = products.find(product => product.id === item);
      return { ...matchingProduct };
    }));
  }

  console.log(savedItems)
  return (
    <>
    <div className='p-5 bg-gray-100 shadow-lg'>
        <div className='w-fit mb-5'>
          <h3 className='pb-2 text-xl font-semibold tracking-wide'>Saved Items</h3>
          <div className='w-1/2 border border-orange-600'></div>
        </div>
        <div className='grid grid-cols-2 gap-8'>
          {
            savedItems.map(item =>
              <div key={item.id} className='flex flex-row items-start gap-10'>
                <div className='flex flex-row gap-5'>
                  <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.title} className='w-36 h-36 object-cover border rounded-lg' />
                  </Link>
                  <div>
                    <Badge type='best' />
                    <Link to={`/product/${item.productId}`}>
                      <p className='mb-2 text-xl font-semibold tracking-wide'>{item.title }</p>
                    </Link>
                    <Rating max={5} rating={item.rating} className='mb-2' />
                    <p className='mb-3 text-lg'>Price: <span className='font-semibold'>${item.price}</span></p>
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

export default SavedItems;