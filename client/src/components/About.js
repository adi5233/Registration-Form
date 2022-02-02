import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adityapic from "../images/aditya.jpg";
import aboutpic from "../images/aboutpic.png";

const About = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const callAboutPage = async () => {
    try {
      const res = await fetch("/api/v1//about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      // console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="container emp-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <figure>
                  <img
                    src={userData.name === "Aditya1" ? adityapic : aboutpic}
                    alt="mohitpic"
                    id="mohitpic"
                  />
                </figure>
              </div>
            </div>

            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6>Web Developer</h6>

                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="false"
                    >
                      About
                    </a>
                  </li>
                </ul>

                {/* right side data toggle */}
                <div className="col-md-8 pl-5 about-info">
                  <div className="tab-content profile-tab" id="myTabContent">
                    <div
                      className="tab-pane fade active show"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <label>User ID</label>
                        </div>
                        <div className="col-md-6">
                          <p>{userData._id}</p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Name</label>
                        </div>
                        <div className="col-md-6">
                          <p>{userData.name}</p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Email</label>
                        </div>
                        <div className="col-md-6">
                          <p>{userData.email}</p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Phone</label>
                        </div>
                        <div className="col-md-6">
                          <p>{userData.phone}</p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Profession</label>
                        </div>
                        <div className="col-md-6">
                          <p>{userData.work}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
