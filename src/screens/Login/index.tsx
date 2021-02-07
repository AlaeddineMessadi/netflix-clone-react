import React, { useRef, useState } from "react";
import { NavBar } from "../../Nav";
import { SignUpScreen } from "../SignUp";
import classNames from "classnames";

import "./style.scss";

export const LoginScreen = () => {
  const [SignIn, setSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isNotValid, setIsNotValid] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleGetStarted = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const isInputValid = emailRef.current?.checkValidity();
    console.log(isInputValid);
    if (isInputValid) {
      setSignIn(true);
    } else {
      setIsNotValid(true);
    }
  };
  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <NavBar />
        <div className="loginScreen__gradient"></div>
        <div className="loginScreen_body">
          {SignIn ? (
            <SignUpScreen email={email} />
          ) : (
            <>
              <h1>Unlimited films, TV programes and more.</h1>
              <h2>Watch anywhere. Cancel at any time.</h2>
              <h3>
                Ready to watch? Enter your email to create or restart your
                membership.
              </h3>
              <div className="loginScreen__input">
                <form ref={formRef}>
                  <input
                    type="email"
                    placeholder="Email Address"
                    ref={emailRef}
                    onChange={(e) => setEmail(e.target.value)}
                    className={classNames({ error: isNotValid })}
                  />
                  <button
                    className="loginScree__getStarted"
                    onClick={handleGetStarted}
                  >
                    GET STARTED
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
