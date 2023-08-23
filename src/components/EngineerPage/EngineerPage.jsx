import React from "react";
import { BiMenu } from "react-icons/bi";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { getAllStatus } from "../../utils/common";
import Card from "../Card/Card";
import SideBar from "../SideBar/SideBar";
import "./EngineerPage.css";
import EngineerTable from "./Table";

function EngineerPage() {
  const userList = useSelector((data) => data.engineerSlice.data);
  const cardsStatus = getAllStatus(userList);
  
  //checks authenticated route or not
  useAuth();

  return (
    <section className="engineer-page">
      <SideBar />
      <header className="header p-3 d-flex justify-content-between align-items-center">
        <button
          className="btn btn-secondary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasEngineer"
          aria-controls="offcanvasExample"
        >
          <BiMenu size={"1.5rem"} />
        </button>
        <span className="badge text-bg-dark px-4 py-3 text-capitalize">
          {localStorage.getItem("name")} You're An{" "}
          {localStorage.getItem("userTypes")?.toLowerCase()}
        </span>
      </header>

      <main>
        <h2 className="text-capitalize text-center text-warning mb-2">
          Welcome 👋{localStorage.getItem("name")}
        </h2>
        <p className="text-center text-black text-opacity-50 text-capitalize">
          Take a quick look At Your dashboard Resolve issues of our customer
        </p>
        <section className="container mt-5">
          <Card cardsStatus={cardsStatus} />
        </section>
        <section className="engineerTable">
          <EngineerTable />
        </section>
      </main>
    </section>
  );
}

export default EngineerPage;
