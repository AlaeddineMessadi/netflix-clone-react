import React, { useState } from "react";
import SignUpScreen from "../SignUp";

import "./style.scss";

export const LoginScreen = () => {
  const [SignIn, setSignIn] = useState(false);
  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img
          className="loginScreen__logo"
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
        <button className="loginScreen__button" onClick={() => setSignIn(true)}>
          Sing In
        </button>

        <div className="loginScreen__gradient"></div>
        <div className="loginScreen_body">
          {SignIn ? (
            <SignUpScreen />
          ) : (
            <>
              <h1>Unlimited films, TV programes and more.</h1>
              <h2>Watch anywhere. Cancel at any time.</h2>
              <h3>
                Ready to watch? Enter your email to create or restart your
                membership.
              </h3>
              <div className="loginScreen__input">
                <form>
                  <input type="text" placeholder="Email Address" />
                  <button
                    className="loginScree__getStarted"
                    onClick={() => setSignIn(true)}
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
