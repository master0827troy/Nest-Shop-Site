import { useEffect, useState } from "react";
import { getAuth, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import Button from "../ui/Button";
import Input from "../ui/Input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import useGetFirestoreData from '../hooks/useGetFirestoreData';

const AccountInfo = () => {
  const auth = getAuth();
  const {data, isLoading, error} = useGetFirestoreData('users', auth.currentUser.uid);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  
  useEffect(() => {
    if (data) {
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setPhone(data.phone);
    }
  }, [data])
  
  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  const submitHandler = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: firstName
      });

      await updateEmail(auth.currentUser, email)

      // update name in the firestore

      const docRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(docRef, {
        firstName,
        lastName,
        email,
        phone
      });
    } catch (error) {
      console.log(error)
    }
  }

  const changePasswordHandler = () => {
    if (newPassword1 === newPassword2) {
      updatePassword(auth.currentUser, newPassword1).then(() => {
        console.log('Password Changed')
      }).catch((error) => {
        console.log(error)
      });
    }
  };

  return (
    <>
      <div className='mb-10 p-5 bg-gray-100 shadow-lg'>
        <div className='w-fit mb-3'>
          <h3 className='pb-2 text-xl font-semibold tracking-wide'>Account Info</h3>
          <div className='w-1/2 border border-orange-600'></div>
        </div>
        <div className='mb-8 flex flex-row gap-10'>
          <Input label='First Name' bgColor='!bg-gray-100' value={firstName} setValue={setFirstName} />
          <Input label='Last Name' bgColor='!bg-gray-100' value={lastName} setValue={setLastName} />
          <Input label='Email Address' bgColor='!bg-gray-100' value={email} setValue={setEmail} />
        </div>
        <div className='mb-8 flex flex-row items-end gap-10'>
          <Input label='Phone Number' bgColor='!bg-gray-100' value={phone} setValue={setPhone} />
          <Button bg text='Save' className='h-fit' onClick={submitHandler} />
        </div>
      </div>
      <div className='p-5 bg-gray-100 shadow-lg'>
        <div className='w-fit mb-3'>
          <h3 className='pb-2 text-xl font-semibold tracking-wide'>Change Password</h3>
          <div className='w-1/2 border border-orange-600'></div>
        </div>
        <div className='mb-8 flex flex-row items-end gap-10'>
          <Input label='New Password' bgColor='!bg-gray-100' value={newPassword1} setValue={setNewPassword1} />
          <Input label='Repeat New Password' bgColor='!bg-gray-100' value={newPassword2} setValue={setNewPassword2} />
          <Button bg text='Save' className='h-fit' onClick={changePasswordHandler} />
        </div>
      </div>
    </>
  );
};

export default AccountInfo;