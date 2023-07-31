import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import RootLayout from './pages/RootLayout'
import ErrorPage from "./pages/Error";

import Home from './pages/Home';
import WhatsNew from "./pages/WhatsNew";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Order from "./pages/Order";
import ProfileLayout from "./pages/ProfileLayout";
import AccountInfo from "./pages/AccountInfo";
import AddressBook from "./pages/AddressBook";
import SavedItems from "./pages/SavedItems";
import Reviews from "./pages/Reviews";
import Vouchers from "./pages/Vouchers";
import RecentlyViewed from "./pages/RecentlyViewed";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />},
      { path: 'whats-new', element: <WhatsNew />},
      { path: 'category/:name', element: <Category />},
      { path: 'product/:id', element: <Product />},
      { path: 'checkout', element: <Checkout />},
      { path: 'order/:id', element: <Order />},
      { 
        path: 'profile',
        element: <ProfileLayout />,
        children: [
          { index: true, element: <AccountInfo /> },
          { path: 'address-book', element: <AddressBook />},
          { path: 'orders', element: <Orders />},
          { path: 'saved-items', element: <SavedItems />},
          { path: 'recently-viewed', element: <RecentlyViewed />},
          { path: 'reviews', element: <Reviews />},
          { path: 'vouchers', element: <Vouchers />},
        ]
      }
    ]
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
    );
  };
  
  export default App;
  