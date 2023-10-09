import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

const Form = (props) => {
  const [mode, setMode] = useState("login");

  const switchForm = (form) => {
    setMode(form);
  };

  return (
    <>
      {mode === "login" ? (
        <LoginForm
          switchForm={switchForm}
          onClose={() => props.onClose(false)}
        />
      ) : mode === "signup" ? (
        <SignUpForm
          switchForm={switchForm}
          onClose={() => props.onClose(false)}
        />
      ) : (
        <ForgotPasswordForm
          switchForm={switchForm}
          onClose={() => props.onClose(false)}
        />
      )}
    </>
  );
};

export default Form;
