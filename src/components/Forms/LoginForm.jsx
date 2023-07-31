import { useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="flex items-center justify-center text-center">
      <div className='w-fit'>
        <h2 className="my-6 text-3xl font-extrabold text-gray-900">Log In</h2>
        <form onSubmit={handleSubmit}>
          <Input type='email' id='email-address' label='Email address' className='mb-4' />
          <Input type='password' id='password' label='Password' className='mb-8' />
          <Button text='Log In' type='submit' className='w-full mb-4' />
          <p className='text-sm text-gray-500'>
            <span className='mr-1'>Don't have an account?</span>
            <a className='text-orange-600 font-semibold cursor-pointer transition duration-700 hover:text-orange-700' onClick={() => props.switchForm('signup')}>Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;