import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';
import useGetFirestoreData from "../hooks/useGetFirestoreData";
import Loading from '../ui/Loading';
import ProfileProducts from '../components/Products/ProfileProducts';

const SavedItems = () => {
  const auth = getAuth();
  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError
  } = useGetFirestoreData('users', auth.currentUser.uid);

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError
  } = useGetFirestoreData('products');

  const [savedItems, setSavedItems] = useState([]);
  
  useEffect(() => {
    if (userData?.wishlistItems && products) {
      setSavedItems(userData.wishlistItems.map(item => {
        const matchingProduct = products.find(product => product.id === item);
        return { ...matchingProduct };
      }));
    }
  
    if ((userDataError || productsError) && (!userDataLoading && !productsLoading)) {
      toast.error('An error occurred!');
    }
  }, [products, productsError, productsLoading, userData?.wishlistItems, userDataError, userDataLoading])
  
  if ( userDataLoading || productsLoading) {
    return <Loading />;
  }

  return (
    <>
    <div className='p-5 bg-gray-100 shadow-lg'>
        <div className='w-fit mb-5'>
          <h3 className='pb-2 text-xl font-semibold tracking-wide'>Saved Items</h3>
          <div className='w-1/2 border border-orange-600'></div>
        </div>
        <ProfileProducts products={savedItems} />
      </div>
    </>
  );
};

export default SavedItems;