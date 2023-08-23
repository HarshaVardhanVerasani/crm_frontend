import React from "react";
import { RiLogoutBoxFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import "./SideBar.css";
function SideBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* admin starts*/}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasAdmin"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <div>
            <h5 className="offcanvas-title" id="adminOffCanvas">
              CRM APPLICATION
            </h5>
            <small>A CRM App For All Your Needs</small>
          </div>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="text-end text-uppercase">
          <h6 className="badge bg-success me-3 ">Admin</h6>
        </div>
        <div className="offcanvas-body">
          <div className="sidebar">
            <div className="sidebar-wrapper">
              <ul className="nav flex-column gap-3">
                <li className="nav-item" onClick={handleLogout}>
                  <Link className="d-flex align-items-center gap-3 fs-5">
                    <RiLogoutBoxFill size={"1.5rem"} /> Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* admin ends */}

      {/* customer starts */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasCustomer"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <div>
            <h5 className="offcanvas-title" id="customerOffCanvas">
              CRM APPLICATION
            </h5>
            <small>A CRM App For All Your Needs</small>
          </div>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="text-end text-uppercase">
          <h6 className="badge bg-info me-3 ">Customer</h6>
        </div>
        <div className="offcanvas-body">
          <div className="sidebar">
            <div className="sidebar-wrapper">
              <ul className="nav flex-column gap-3">
                <li className="nav-item" onClick={handleLogout}>
                  <Link className="d-flex align-items-center gap-3 fs-5">
                    <RiLogoutBoxFill size={"1.5rem"} /> Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* customer ends */}

      {/* engineer starts */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasEngineer"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <div>
            <h5 className="offcanvas-title" id="engineerOffCanvas">
              CRM APPLICATION
            </h5>
            <small>A CRM App For All Your Needs</small>
          </div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="text-end text-uppercase">
          <h6 className="badge bg-warning  me-3">Engineer</h6>
        </div>
        <div className="offcanvas-body">
          <div className="sidebar">
            <div className="sidebar-wrapper">
              <ul className="nav flex-column gap-3">
                <li className="nav-item" onClick={handleLogout}>
                  <Link className="d-flex align-items-center gap-3 fs-5">
                    <RiLogoutBoxFill size={"1.5rem"} /> Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* engineer ends */}
    </>
  );
}

export default SideBar;
