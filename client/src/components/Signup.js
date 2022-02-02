import React, { useState } from "react";
import signup from "../images/signup.svg";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch("/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });

    const data = await res.json();

    if (
      res.status === 422 ||
      res.status === 400 ||
      res.status === 401 ||
      !data
    ) {
      alert("Registration Failed");
      console.log("registration failed");
    } else {
      alert("Registration Successful");
      console.log("registration successful");

      navigate("/login");
    }
  };

  return (
    <section className="signup">
      <div className="container mt-5">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign up</h2>
            <form method="POST" className="register-form" id="register-form">
              <div className="form-group">
                <label for="name">
                  <i className="zmdi zmdi-account material-icons-name"></i>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  placeholder="Your Name"
                  onChange={handleInputs}
                  value={user.name}
                />
              </div>
              <div className="form-group">
                <label for="email">
                  <i className="zmdi zmdi-email material-icons-name"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  placeholder="Your Email"
                  onChange={handleInputs}
                  value={user.email}
                />
              </div>
              <div className="form-group">
                <label for="phone">
                  <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  placeholder="Your Phone"
                  onChange={handleInputs}
                  value={user.phone}
                />
              </div>
              <div className="form-group">
                <label for="work">
                  <i className="zmdi zmdi-slideshow material-icons-name"></i>
                </label>
                <input
                  type="text"
                  name="work"
                  id="work"
                  autoComplete="off"
                  placeholder="Your Profession"
                  onChange={handleInputs}
                  value={user.work}
                />
              </div>
              <div className="form-group">
                <label for="password">
                  <i className="zmdi zmdi-lock material-icons-name"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  placeholder="Your Password"
                  onChange={handleInputs}
                  value={user.password}
                />
              </div>
              <div className="form-group">
                <label for="cpassword">
                  <i className="zmdi zmdi-lock material-icons-name"></i>
                </label>
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  autoComplete="off"
                  placeholder="Confirm Your Password"
                  onChange={handleInputs}
                  value={user.cpassword}
                />
              </div>
              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  className="form-submit"
                  value="Signup"
                  onClick={PostData}
                />
              </div>
            </form>
          </div>
          <div className="signup-image">
            <figure>
              <img src={signup} alt="registration pic" />
            </figure>
            <Link className="signup-image-link" to="/login">
              I am already register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
