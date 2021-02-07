import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import "./style.scss";

export const NavBar = () => {
  const [show, setShow] = useState(false);

  const { user } = useSelector(selectUser);
  const history = useHistory();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);

  return (
    <div className={`nav ${show && " nav__black"}`}>
      <div className="nav__contents"></div>
      <img
        onClick={() => history.push("/")}
        className="nav__logo"
        src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
        alt="Netflix logo"
      />

      {user ? (
        <img
          onClick={() => history.push("/profile")}
          className="nav__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="Netflix Avatar"
        />
      ) : (
        <button
          className="loginScreen__button"
          onClick={() => history.push("/")}
        >
          Sing In
        </button>
      )}
    </div>
  );
};
