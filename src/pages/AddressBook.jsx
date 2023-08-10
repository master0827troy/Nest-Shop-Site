import {useState, useEffect} from 'react';
import {FaMapMarkerAlt, FaPen, FaPhoneAlt} from 'react-icons/fa';
import {FiTrash2} from 'react-icons/fi';
import {getAuth} from 'firebase/auth';
import useGetFirestoreData from '../hooks/useGetFirestoreData';
import Button from '../ui/Button';
import AddressForm from '../components/Forms/AddressForm';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '../firebase';
import PhoneForm from '../components/Forms/PhoneForm';
const AddressBook = () => {
  const auth = getAuth();

  //needs to get updated
  const {data, isLoading, error} = useGetFirestoreData('users', auth.currentUser.uid);
  const [addresses, setAddresses] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [addressForm, setAddressForm] = useState(false);
  const [phoneForm, setPhoneForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [editingPhone, setEditingPhone] = useState(null);

  useEffect(() => {
    if (data) {
      setAddresses(data.addresses);
      setPhoneNumbers(data.phoneNumbers);
    }
  }, [data])

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const deleteAddress = async (address) => {
    const newAddresses = addresses.filter(ele => addresses.indexOf(ele) !== addresses.indexOf(address));
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        addresses: newAddresses
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const deletePhone = async (phone) => {
    const newPhoneNumber = phoneNumbers.filter(ele => phoneNumbers.indexOf(ele) !== phoneNumbers.indexOf(phone));
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        phoneNumbers: newPhoneNumber
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className='flex flex-row gap-8'>
      <div className='h-fit p-5 w-3/5 bg-gray-100 shadow-lg'>
        <div className='w-fit mb-3'>
          <h3 className='pb-2 text-xl font-semibold tracking-wide'>Addresses</h3>
          <div className='w-1/2 border border-orange-600'></div>
        </div>
        <div className='mb-8 flex flex-col gap-4'>
          {
            addresses.map((address) => 
              editingAddress !== addresses.indexOf(address) ?
                <div key={addresses.indexOf(address)} className='flex flex-row items-center gap-2'>
                  <FaMapMarkerAlt className='text-lg text-orange-600' />
                  <p className='font-semibold mr-4'>{address.apartment} {address.street}, {address.city}, {address.country}, {address.postalNumber}</p>
                  <FaPen className='text-lg cursor-pointer transition duration-300 hover:text-orange-600 hover:scale-125' onClick={() => setEditingAddress(addresses.indexOf(address))} />
                  <FiTrash2 className='text-lg cursor-pointer transition duration-300 hover:text-orange-600 hover:scale-125' onClick={() => deleteAddress(address)} />
                </div>
              :
                <AddressForm key={addresses.indexOf(address)} show={editingAddress !== null} changeHandler={setEditingAddress} userId={auth.currentUser.uid} addresses={addresses} address={address} />
            )
          }
        </div>
        
        {
          addressForm && <AddressForm show={addressForm} changeHandler={setAddressForm} userId={auth.currentUser.uid} addresses={addresses} />
        }
        {
          !addressForm && editingAddress === null && <Button bg text='Add' className='h-fit' onClick={() => setAddressForm(true)} />
        }
      </div>
      <div className='h-fit p-5 w-2/5 bg-gray-100 shadow-lg'>
        <div className='w-fit mb-3'>
          <h3 className='pb-2 text-xl font-semibold tracking-wide'>Phone Numbers</h3>
          <div className='w-1/2 border border-orange-600'></div>
        </div>
        <div className='mb-8 flex flex-col gap-4'>
          {
            phoneNumbers.map((phoneNumber) =>
              <div key={phoneNumbers.indexOf(phoneNumber)} className='flex flex-row items-center gap-2'>
                <FaPhoneAlt className='text-lg text-orange-600' />
                <p className='font-semibold mr-4'>{phoneNumber}</p>
                <FaPen className='text-lg cursor-pointer transition duration-300 hover:text-orange-600 hover:scale-125' />
                <FiTrash2 className='text-lg cursor-pointer transition duration-300 hover:text-orange-600 hover:scale-125' onClick={() => deletePhone(phoneNumber)} />
              </div>
            )
          }
        </div>
        {
          phoneForm ?
            <PhoneForm show={phoneForm} changeHandler={setPhoneForm} userId={auth.currentUser.uid} phoneNumbers={phoneNumbers} />
          :
            <Button bg text='Add' className='h-fit' onClick={() => setPhoneForm(true)} />
        }
      </div>
    </div>
  );
};

export default AddressBook;