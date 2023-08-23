import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../apis/apis";
import "./styles.css";
function LoginPage({ handleSignUp }) {
  const [formData, setData] = useState({
    userId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState("password");
  const navigate = useNavigate();

  const handleShowPassword = (e) => {
    if (e.target.checked) {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${BASE_URL}/crm/api/v1/auth/signin`,
        formData
      );
        console.log(data)
      // //if any unexpected error happens
      toast.warn(data.message);

      //saving info of user in browser memory
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("email", data.email);
      localStorage.setItem("name", data.name);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userStatus", data.userStatus);
      localStorage.setItem("userTypes", data.userTypes);

      //then redirecting user to their window based on type
      if (data.userTypes === "ADMIN") {
        navigate("/admin");
      } else if (data.userTypes === "ENGINEER") {
        navigate("/engineer");
      } else if (data.userTypes === "CUSTOMER") {
        navigate("/customer");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="loginPage">
      <div className="login-wrapper">
        <h4 className="text-center mb-3">Login</h4>
        <h6 className="text-center">Welcome👋</h6>
        <form action="">
          <div className="mb-3 mt-5">
            <label htmlFor="user-name" className="form-label">
              User ID
            </label>
            <input
              type="text"
              className="form-control"
              id="user-name"
              value={formData.userId}
              onChange={(e) => setData({ ...formData, userId: e.target.value })}
              required
            />
            <label htmlFor="password" className="form-label mt-3">
              Password
            </label>
            <input
              type={showPassword}
              id="password"
              className="form-control"
              aria-describedby="passwordHelpBlock"
              value={formData.password}
              onChange={(e) =>
                setData({ ...formData, password: e.target.value })
              }
              required
            />
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="showPassword"
                onClick={handleShowPassword}
              />
              <label className="form-check-label" htmlFor="showPassword">
                Show Password
              </label>
            </div>
          </div>
          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={handleLogIn}
            >
              Log In
            </button>
          </div>
        </form>

        <div>
          <p className="mt-4">
            Don't haven account ?
            <span className="signUpLink" onClick={() => handleSignUp()}>
              {" "}
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
