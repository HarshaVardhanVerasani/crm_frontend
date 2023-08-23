import React from "react";
import { useNavigate } from "react-router-dom";
import NOT_FOUND from "../../images/pageNotFound.jpg";

function PageNotFound() {
  const navigate = useNavigate();
  const handleRedirection = () => {
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
  };
  
  return (
    <section
      style={{
        backgroundColor: "#111A43",
        position: "relative",
        height: "100vh",
        width: "100%",
      }}
    >
      <section className="text-center">
        <div>
          <img
            src={NOT_FOUND}
            alt="page not found"
            width={800}
            className="img-fluid"
          />
        </div>
        <div>
          <button className="btn bg-white" onClick={handleRedirection}>
            Go Back
          </button>
        </div>
      </section>
    </section>
  );
}

export default PageNotFound;
