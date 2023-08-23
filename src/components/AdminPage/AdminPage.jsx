import React from "react";
import { BiMenu } from "react-icons/bi";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { getAllStatus } from "../../utils/common";
import Card from "../Card/Card";
import SideBar from "../SideBar/SideBar";
import "./AdminPage.css";
import AdminTable from "./Table";

function AdminPage() {
  const allTicket = useSelector((store) => store.adminSlice.allTickets);
  const cardsStatus = getAllStatus(allTicket);

  //checks authenticated route or not
  useAuth();

  return (
    <section className="admin-page">
      <SideBar />
      <section className="mb-3 px-3 pt-3 mb-sm-0 d-flex align-items-center justify-content-between">
        <button
          className="btn btn-secondary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasAdmin"
          aria-controls="offcanvasExample"
        >
          <BiMenu size={"1.5rem"} />
        </button>
        <span className="badge text-bg-dark px-4 py-3 text-capitalize">
          {localStorage.getItem("name")} You're An{" "}
          {localStorage.getItem("userTypes")?.toLowerCase()}
        </span>
      </section>

      <main>
        <h2 className="text-capitalize text-center text-warning mb-2">
          Welcome 👋{localStorage.getItem("name")}
        </h2>
        <p className="text-center text-black text-opacity-50">
          Take A Quick Look At Your Dashboard
        </p>
        <section className="container mt-5">
          <Card cardsStatus={cardsStatus} />
        </section>
        <section className="adminTable">
          <AdminTable />
        </section>
      </main>
    </section>
  );
}

export default AdminPage;
