import { FaMapMarkerAlt, FaPhoneAlt, FaAddressBook } from "react-icons/fa"; 
import Button from '../ui/Button';
import { useSelector } from 'react-redux';
import {RiShoppingCart2Line} from 'react-icons/ri';
import RadioInput from "../ui/RadioInput";
import { Link, useNavigate } from "react-router-dom";
import useProductActions from '../hooks/useProductActions';
import CartProduct from "../components/Products/Product/CartProduct";
import {useState, useEffect} from 'react';
import {getAuth} from 'firebase/auth';
import {toast} from 'react-toastify';
import useGetFirestoreData from '../hooks/useGetFirestoreData';
import Loading from '../ui/Loading';
import {addDoc, Timestamp, doc, collection, serverTimestamp} from 'firebase/firestore';
import { db } from "../firebase";

const Checkout = () => {
  const navigate = useNavigate();
  const { emptyCart } = useProductActions();

  const cartTotalQuantity = useSelector(state => state.cart.totalQuantity);
  const cartTotalPrice = useSelector(state => state.cart.totalPrice);
  const cartItems = useSelector(state => state.cart.items);

  const auth = getAuth();
  const userId = auth.currentUser.uid;

  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError
  } = useGetFirestoreData('users', userId);

  const [addressesList, setAddressesList] = useState([]);
  const [activeAddress, setActiveAddress] = useState(0);

  const [phoneNumbersList, setPhoneNumbersList] = useState([]);
  const [activePhoneNumber, setActivePhoneNumber] = useState(0);

  useEffect(() => {
    if (userData) {
      const addressList = [];
      for (const address of userData.addresses) {
        addressList.push({
          value: address,
          label: `${address.apartment} ${address.street}, ${address.city}, ${address.country}, ${address.postalNumber}`
        })
      }
      setAddressesList(addressList);

      const phoneList = [];
      for (const phoneNumber of userData.phoneNumbers) {
        phoneList.push({
          value: phoneNumber,
          label: phoneNumber
        })
      }
      setPhoneNumbersList(phoneList);
    }


    if (userDataError && !userDataLoading) {
      toast.error('An error occurred!');
    }
  }, [userData, userDataError, userDataLoading])
  
  if (userDataLoading) {
    return <Loading />;
  }

  const confirmOrder = async () => {
    try {
      const updatedItems = [];
      for (const item of cartItems) {
        updatedItems.push({ id: item.id, amount: item.quantity });
      }

      await addDoc(collection(db, 'orders'), {
        userId,
        items: updatedItems,
        address: addressesList[activeAddress].value,
        timestamp: serverTimestamp()
      });

      emptyCart();
      navigate('/profile/orders')
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className='mt-12'>
      <div className='flex flex-row justify-between gap-20'>
        <div className='grow'>
          <div className='flex flex-row items-center gap-2 mb-6 text-3xl font-semibold tracking-wide'>
            <RiShoppingCart2Line className='text-4xl' />
            Shopping Cart
            <span className='text-xl'>({cartTotalQuantity})</span>
          </div>

          <div className='grid grid-cols-2 gap-10'>
            {
              cartItems.length > 0 ?
                cartItems.map(cartItem =>
                  <CartProduct key={cartItem.id} product={cartItem} />
                )
              :
                <p>Your shopping cart is empty! Start adding items.</p>
            }
          </div>
        </div>
        <div className='w-80'>
          <h2 className='section-heading !mb-4'>Order Details</h2>
          <div className='mb-4 space-y-2 text-xl'>
            <div className="mb-4 pb-4 border-b">
              <RadioInput name='address' className='mb-5' list={addressesList} active={activeAddress} setActive={setActiveAddress}>
                <FaMapMarkerAlt />
              </RadioInput>
              <RadioInput name='phoneNumber' className='mb-5' list={phoneNumbersList} active={activePhoneNumber} setActive={setActivePhoneNumber}>
                <FaPhoneAlt />
              </RadioInput>

              <div className='flex flex-row items-center gap-2 text-orange-600 cursor-pointer transition duration-500 hover:text-orange-700'>
                <FaAddressBook />
                <Link to='/profile/address-book' className='text-base font-semibold'>Edit your addresses</Link>
              </div>
            </div>
            <p>Items: {cartTotalQuantity}</p>
            <p>Total: ${cartTotalPrice}</p>
          </div>
          <Button text='Confirm Order' className='text-lg !w-full mb-4' noBg onClick={confirmOrder} />
          <Button text='Empty Cart' className='text-lg !w-full' noBg onClick={() => emptyCart()} />
        </div>
      </div>
    </div>
  )
}

export default Checkout