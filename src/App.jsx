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
import Profile from "./pages/Profile";

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
      { path: 'orders', element: <Orders />},
      { path: 'order/:id', element: <Order />},
      { path: 'profile', element: <Profile />}
    ]
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
    );
  };
  
  export default App;
  