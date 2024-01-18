import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Register.css";
import { useRef } from "react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";

const Login = (props) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { authUser, setAuthUser } = useContext(GlobalContext);

  const navigate = useNavigate();

  const onButtonClick = async () => {
    console.log(emailRef.current.value, passwordRef.current.value);

    let { data } = await axios.post(
      "http://localhost:8000/api/v1/users/login",
      {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
      {
        // passing withCredentials so we can save access information in return from the backend server to our browser cookies
        withCredentials: true,
      }
    );

    if (data.success) {
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(data.data.refreshToken)
      );
      localStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.accessToken)
      );
      setAuthUser({
        fullName: data.data.user.fullName,
        email: data.data.user.email,
        username: data.data.user.username,
        role: data.data.user.role,
        languagePref: data.data.user.languagePref || "english",
      });
      navigate("/profile");
    } else {
      console.log(data.message);
    }

    // Authentication calls will be made here...
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <form>
        <div className={"inputContainer"}>
          <input
            ref={emailRef}
            type="email"
            // value={email}
            placeholder="Enter your email here"
            // onChange={ev => setEmail(ev.target.value)}
            className={"inputBox"}
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            type="text"
            ref={passwordRef}
            // value={password}
            placeholder="Enter your password here"
            // onChange={ev => setPassword(ev.target.value)}
            className={"inputBox"}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
          <button onClick={onButtonClick} type="button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
