import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { autoLogin } from './store/AuthSlice';

import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RootLayout from './pages/RootLayout'
import ProfileLayout from './pages/ProfileLayout';
import ErrorPage from './pages/Error';

import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import AccountInfo from './pages/AccountInfo';
import AddressBook from './pages/AddressBook';
import Orders from './pages/Orders';
import SavedItems from './pages/SavedItems';
import RecentlyViewed from './pages/RecentlyViewed';
import Reviews from './pages/Reviews';
import Loading from './ui/Loading';

const App = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(autoLogin());
      }
      setIsLoading(false)
    });
  }, [auth, dispatch])
  

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/checkout' element={isAuthenticated ? <Checkout /> : <Navigate to='/' />} />
          <Route path='/category/:id' element={<Category />} />
          <Route path='/profile' element={isAuthenticated ? <ProfileLayout /> : <Navigate to='/' />}>
            <Route path='/profile' element={<AccountInfo />} />
            <Route path='address-book' element={<AddressBook />} />
            <Route path='orders' element={<Orders />} />
            <Route path='saved-items' element={<SavedItems />} />
            <Route path='recently-viewed' element={<RecentlyViewed />} />
            <Route path='reviews' element={<Reviews />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        progressStyle={{ backgroundColor: '#ea580c' }}
      />
    </>
  );
};
  
  export default App;