import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../images/signin.svg";
import { UserContext } from "../App";

const Login = () => {
  const { dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      alert("Login Successful");
      console.log("Login Successful");
      navigate("/");
    }
  };

  return (
    <section className="sign-in">
      <div className="container mt-5">
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              <img src={loginImg} alt="Login pic" />
            </figure>
            <Link className="signup-image-link" to="/signup">
              Create an Account
            </Link>
          </div>
          <div className="signin-form">
            <h2 className="form-title">Signin</h2>
            <form method="POST" className="register-form" id="register-form">
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email material-icons-name"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  placeholder="Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock material-icons-name"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  placeholder="Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  className="form-submit"
                  value="Signin"
                  onClick={loginUser}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
