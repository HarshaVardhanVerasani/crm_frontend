import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogInPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

function Authenticate() {
  const [signUp, showSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    showSignUp(!signUp);
  };

  //when user is already logged in and if he try to go to login page by changing route url in browser this we don't allow
  useEffect(() => {
    switch (localStorage.getItem("userTypes")) {
      case "ADMIN":
        navigate("/admin");
        break;
      case "CUSTOMER":
        navigate("/customer");
        break;
      case "ENGINEER":
        navigate("/engineer");
        break;
      default:
        navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {signUp ? (
        <SignUpPage handleSignUp={handleSignUp} />
      ) : (
        <LogInPage handleSignUp={handleSignUp} />
      )}
    </>
  );
}

export default Authenticate;
