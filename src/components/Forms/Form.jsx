import { useState } from "react";
import LoginForm from "./LoginForm";
import SingUpForm from "./SingUpForm";

const Form = () => {
  const [mode, setMode] = useState('login')

  const switchForm = (form) => {
    setMode(form);
  };

  return (
    <>
      {
        mode === 'login' ?
          <LoginForm switchForm={switchForm} />
        :
          <SingUpForm switchForm={switchForm} />
      }
    </>
  );
};

export default Form;