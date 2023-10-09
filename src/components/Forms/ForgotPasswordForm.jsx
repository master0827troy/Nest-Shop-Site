import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const ForgotPasswordForm = (props) => {
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      props.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center text-center">
      <div className="w-fit">
        <h2 className="my-6 text-3xl font-extrabold text-gray-900">
          Forgot Password
        </h2>
        <form onSubmit={submitHandler}>
          <Input
            type="email"
            id="email-address"
            label="Email address"
            className="mb-8"
            value={email}
            setValue={setEmail}
          />
          <Button bg text="Reset" type="submit" className="w-full mb-4" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="mr-1">Already have an account?</span>
            <a
              className="text-orange-600 font-semibold cursor-pointer transition duration-700 hover:text-orange-700"
              onClick={() => props.switchForm("login")}
            >
              Log In
            </a>
          </p>
          <p className="text-sm text-gray-500">
            <span className="mr-1">Don't have an account?</span>
            <a
              className="text-orange-600 font-semibold cursor-pointer transition duration-700 hover:text-orange-700"
              onClick={() => props.switchForm("signup")}
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
