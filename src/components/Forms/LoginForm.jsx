import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import {useDispatch} from 'react-redux';
import {authActions} from '../../store/AuthSlice';

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        dispatch(authActions.login())
        props.onClose();
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center text-center">
      <div className='w-fit'>
        <h2 className="my-6 text-3xl font-extrabold text-gray-900">Log In</h2>
        <form onSubmit={submitHandler}>
          <Input type='email' id='email-address' label='Email address' className='mb-4' value={email} setValue={setEmail} />
          <Input type='password' id='password' label='Password' className='mb-8' value={password} setValue={setPassword} />
          <Button bg text='Log In' type='submit' className='w-full mb-4' />
          <p className='text-sm text-gray-500'>
            <span className='mr-1'>Don't have an account?</span>
            <a className='text-orange-600 font-semibold cursor-pointer transition duration-700 hover:text-orange-700' onClick={() => props.switchForm('signup')}>Sign Up</a>
          </p>
          <a className='text-sm text-orange-600 font-semibold cursor-pointer transition duration-700 hover:text-orange-700' onClick={() => props.switchForm('forgot')}>Forgot Password</a>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;