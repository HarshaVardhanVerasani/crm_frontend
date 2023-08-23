import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../apis/apis";
import "./styles.css";

function SignUpPage({ handleSignUp }) {
  const [formData, setData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
  });
  let IS_VALID_PASSWORD = false;

  const [showPassword, setShowPassword] = useState("password");

  const handleShowPassword = (e) => {
    if (e.target.checked) {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  const getFormData = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = () => {
    let lowerCaseLetter = 0;
    let upperCaseLetter = 0;
    let specialCharacter = 0;
    let number = 0;
    const specialCharacterArr = [
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "-",
      "+",
      "=",
      "[",
      "{",
      "]",
      "}",
      ":",
      ";",
      "<",
      ">",
    ];
    if (formData.password === "") {
      toast.info("Please Create Your Password", { position: "top-center" });
      return;
    }

    if (formData.password.length < 8) {
      toast.info("Password Must Be 8 Characters", { position: "top-center" });
      return;
    }

    //checking all conditions
    for (let el of formData.password) {
      if (isNaN(el) && (el.toLowerCase() === el.toUpperCase()) === false) {
        if (el === el.toLowerCase()) {
          lowerCaseLetter++;
        }
      }

      if (isNaN(el) && (el.toLowerCase() === el.toUpperCase()) === false) {
        if (el === el.toUpperCase()) {
          upperCaseLetter++;
        }
      }

      if (!isNaN(el)) {
        number++;
      }

      if (specialCharacterArr.includes(el)) {
        specialCharacter++;
      }
    }

    if (lowerCaseLetter === 0) {
      toast.warn("Password Must Contain Small Letter", {
        position: "top-center",
      });
      return;
    }
    if (upperCaseLetter === 0) {
      toast.warn("Password Must Contain Capital Letter", {
        position: "top-center",
      });
      return;
    }

    if (number === 0) {
      toast.warn("Password Must Contain Number", { position: "top-center" });
      return;
    }

    if (specialCharacter === 0) {
      toast.info("Password Must Contain Special Letter", {
        position: "top-center",
      });
      return;
    }
    //All checks are successfully completed then password is verified
    //now we are updating global constant IS_VALID_PASSWORD
    IS_VALID_PASSWORD = true;
  };

  const handleSignUpForm = async (e) => {
    e.preventDefault();
    if (formData.name.length < 4) {
      toast.info(
        "Please fill Out User Name & should Be More Than 4 Characters",
        {
          position: "top-center",
        }
      );
    } else if (formData.email.length === 0) {
      toast.info("Email Field Is Empty", {
        position: "top-center",
      });
    } else if (!IS_VALID_PASSWORD) {
      validatePassword();
    } else if (formData.userType === "") {
      toast.info("Please Provide User Type", {
        position: "top-center",
      });
    } else {
      try {
        const { data } = await axios.post(
          `${BASE_URL}/crm/api/v1/auth/signup`,
          {
            userId: formData.name,
            name: formData.name,
            email: formData.email,
            password: formData.password,
            userType: formData.userType,
          }
        );
        console.log(data);
        toast.success(
          "Account Creation Successful Please Login With Your Credentials",{
            position:"top-left"
          }
        );

        //going back to login page by executing below function
        handleSignUp();
      } catch (error) {
        toast(error.response.data.message);
      }
    }
  };

  return (
    <div className="signUp">
      <div className="signUpWrapper">
        <h4 className="text-center">Create Your Account</h4>
        <h6 className="text-center">To Continue Sign Up 💖</h6>
        <form action="true">
          <div className="mb-3 mt-4">
            <label htmlFor="user-name" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="user-name"
              name="name"
              value={formData.name}
              maxLength={20}
              required
              onChange={(e) => getFormData(e)}
            />

            <label htmlFor="user-email" className="form-label mt-3">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="user-email"
              name="email"
              value={formData.email}
              required
              onChange={(e) => getFormData(e)}
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
              name="password"
              required
              onChange={(e) => getFormData(e)}
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
            <select
              className="form-select mt-4"
              aria-label="role of person"
              required
              name="userType"
              onChange={(e) => getFormData(e)}
            >
              <option value="">Select Your Role</option>
              <option value="CUSTOMER">Customer</option>
              <option value="ADMIN">Admin</option>
              <option value="ENGINEER">Engineer</option>
            </select>
          </div>
          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={handleSignUpForm}
            >
              Sign Up
            </button>
          </div>
        </form>

        <div>
          <p className="mt-4">
            Already haven an account ?
            <span className="signUpLink" onClick={() => handleSignUp()}>
              {" "}
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
