import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../../firebase';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const SignUpForm = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      updateProfile(auth.currentUser,{
        displayName: firstName
      });
      const user = userCredential.user;
      const data = {
        firstName,
        lastName,
        email,
        phone,
        addresses: [],
        phoneNumbers: [],
        cartItems: [],
        wishlistItems: [],
        recentlyViewed: [],
        timestamp: serverTimestamp()
      };
      await setDoc(doc(db, 'users', user.uid), data);
      props.onClose();
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div className="flex items-center justify-center text-center">
      <div className='w-fit'>
        <h2 className="my-6 text-3xl font-extrabold text-gray-900">Sign Up</h2>
        <form onSubmit={submitHandler}>
          <Input type='name' id='first-name' label='First Name' className='mb-4' value={firstName} setValue={setFirstName} />
          <Input type='name' id='last-name' label='Last Name' className='mb-4' value={lastName} setValue={setLastName} />
          <Input type='email' id='email-address' label='Email Address' className='mb-4' value={email} setValue={setEmail} />
          <Input type='text' id='phone' label='Phone Number' className='mb-4' value={phone} setValue={setPhone} />
          <Input type='password' id='password' label='Password' className='mb-8' value={password} setValue={setPassword} />
          <Button bg text='Sign Up' type='submit' className='w-full mb-4' />
          <p className='text-sm text-gray-500'>
            <span className='mr-1'>Already have an account?</span>
            <a className='text-orange-600 font-semibold cursor-pointer transition duration-700 hover:text-orange-700' onClick={() => props.switchForm('login')}>Log In</a>
          </p>
          <a className='text-sm text-orange-600 font-semibold cursor-pointer transition duration-700 hover:text-orange-700' onClick={() => props.switchForm('forgot')}>Forgot Password</a>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;