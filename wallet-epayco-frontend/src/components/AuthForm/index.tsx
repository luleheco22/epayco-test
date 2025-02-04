import React from "react";
import { Button } from "@heroui/button";

import FormLogin from "./form-login";
import RegisterForm from "./form-register";

const AuthForm: React.FC = () => {
  const [signUpMode, setSignUpMode] = React.useState(false);

  const handleSignUpClick = () => {
    setSignUpMode(true);
  };

  const handleSignInClick = () => {
    setSignUpMode(false);
  };

  return (
    <div className={`container-auth ${signUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container-auth">
        <div className="signin-signup">
          {signUpMode ? <RegisterForm /> : <FormLogin />}
        </div>
      </div>

      <div className="panels-container-auth">
        {/* Left Panel */}
        <div className="panel left-panel">
          <div className="content">
            <h3 className="mb-2">Are you new?</h3>
            <Button
              // auto
              className="text-white bg-green-300 hover:bg-green-400 focus:ring-4 focus:ring-blue-300 font-large rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              onClick={handleSignUpClick}
            >
              Register
            </Button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="panel right-panel">
          <div className="content">
            <h3>Do you already have an account?</h3>
            <p>Login to access your wallet</p>
            <Button
              // auto
              className="text-white bg-green-300 hover:bg-green-400 focus:ring-4 focus:ring-blue-300 font-large rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              onClick={handleSignInClick}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
