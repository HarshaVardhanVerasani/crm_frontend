import axios from "axios";
import React, { useEffect } from "react";
import { BiMenu } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BASE_URL, GET_CUSTOMER_ALL_TICKETS } from "../../apis/apis";
import useAuth from "../../hooks/useAuth";
import { loadCustomerData } from "../../redux/customerSlice";
import { getAllStatus } from "../../utils/common";
import Card from "../Card/Card";
import SideBar from "../SideBar/SideBar";
import CustomerModal from "./CustomerModal";
import "./CustomerPage.css";
import CustomerTable from "./CustomerTable";

function CustomerPage() {
  const ticketList = useSelector((store) => store.customerSlice.data);
  const cardsStatus = getAllStatus(ticketList);
  const dispatch = useDispatch();

  //checks authenticated route or not
  useAuth();

  const fetchingCustomerAllTickets = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}${GET_CUSTOMER_ALL_TICKETS}`
      );

      // sending all customer tickets to redux store so we can access globally
      dispatch(loadCustomerData(data));
    } catch (error) {
      toast.warn(
         error.response.data.message
      );
      console.log(error);
    }
  };

  //For initial rendering  when component is mounted
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      fetchingCustomerAllTickets();
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <SideBar />
      <header className="header p-3 d-flex justify-content-between align-items-center">
        <button
          className="btn btn-secondary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasCustomer"
          aria-controls="offcanvasExample"
        >
          <BiMenu size={"1.5rem"} />
        </button>
        <span className="badge text-bg-info px-4 py-3 text-capitalize">
          {localStorage.getItem("name")} You're An{" "}
          {localStorage.getItem("userTypes")?.toLowerCase()}
        </span>
      </header>
      <main className="mb-5">
        <h2 className="text-capitalize text-center text-warning mb-2">
          Welcome 👋{localStorage.getItem("name")}
        </h2>
        <p className="text-center text-black text-opacity-50 text-capitalize">
          Take a quick look At Your dashboard
        </p>
      </main>
      <section className="d-flex justify-content-center align-items-center flex-sm-row flex-column gap-2">
        <p className="text- m-0 text-center text-sm-start text-capitalize">
          Please Rise Your Concerns If You See Any bug in the application or any
          functionalities broken :
        </p>
        <CustomerModal
          fetchingCustomerAllTickets={fetchingCustomerAllTickets}
        />
      </section>
      <section className="container mt-5">
        <Card cardsStatus={cardsStatus} />
      </section>

      <section className="customer-table">
        <CustomerTable
          fetchingCustomerAllTickets={fetchingCustomerAllTickets}
        />
      </section>
    </div>
  );
}

export default CustomerPage;
