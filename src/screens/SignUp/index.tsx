import React, { useState } from "react";
import { auth } from "../../firebase";
import "./style.scss";

interface IProp {
  email?: string;
}

export const SignUpScreen: React.FC<IProp> = ({ email: emailInput = "" }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(emailInput);
  const [error, setError] = useState("");

  const register = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setError("");
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        setError(error.message);
        setPassword("");
      });
  };

  const signUp = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setError("");
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="signupScreen">
      <form>
        <h1>SignUp</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
        />
        {error && <p className="signupScreen__error">{error}</p>}
        <button type="submit" onClick={signUp}>
          Sign In
        </button>
        <h4>
          <span className="signupScreen__gray">New to Netflix?</span>
          <span className="signupScreen_link" onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
};
