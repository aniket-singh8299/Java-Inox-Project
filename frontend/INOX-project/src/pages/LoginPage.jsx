import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { globalVar } from "../globalContext/GlobalContext";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const LoginPage = () => {
  let navigate = useNavigate();
  let {
    loginPanel,
    setLoginPanel,
    loginTypes,
    loginType,
    setLoginType,
    inoxLoginType,
    setInoxLoginType,
    signupPanel,
    setSignupPanel,
  } = useContext(globalVar);
  console.log(loginTypes);
  // Default user state with email and password
  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  let handleChange = (e) => {
    let { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle form submission
  let handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await axios.post(
        `http://localhost:8080/auth/login?email=${user.email}&password=${user.password}`
      );
      console.log("User authenticated:", response.data);
      let token = response.data.token;
      toast.success("Login Succesfully");
      setLoginPanel(false);
      //toast && toast.success("Login Succesfully");
      localStorage.setItem("auth", token);
      // let token = response.data.token;
      console.log("Token:", token);

      let decode = jwtDecode(localStorage.getItem("auth"));
      console.log(decode);
      setInoxLoginType(decode.role);
    } catch (error) {
      console.error("There was an error authenticating the user!", error);
    }
  };
  const handleSignUpClick = (e) => {
    e.stopPropagation();
    setSignupPanel(true);
    setLoginPanel(false);
  };

  return (
    <section
      className="mainCont"
      onClick={(e) => {
        e.stopPropagation();
        setLoginPanel(!loginPanel);
      }}>
      <section className="headlogin">
        <div className="mainadminbtn">
          {loginTypes?.map((ele) => (
            <button
              key={ele.loginVal}
              onClick={(e) => (e.stopPropagation(), setLoginType(ele.loginVal))}
              className="adminbtns">
              {ele.loginName}
            </button>
          ))}
        </div>
        <form
          className="login-form"
          onSubmit={handleSubmit}
          onClick={(e) => {
            e.stopPropagation();
            setLoginPanel(true);
          }}>
          <h1 className="login-title">Login as {loginType}</h1>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <button className="login-button">Login</button>
        </form>
        <button className="signupbtn" onClick={handleSignUpClick}>
          Click to Signup
        </button>
      </section>
    </section>
  );
};

export default LoginPage;
