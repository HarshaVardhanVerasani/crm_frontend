import React from "react";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { BsFillPatchCheckFill, BsFillPenFill } from "react-icons/bs";
import { ImBlocked } from "react-icons/im";
import "./Card.css";

function Card({cardsStatus}) {
  const { OPEN, CLOSED, BLOCKED, IN_PROGRESS } = cardsStatus

  return (
    <div className="row justify-content-center">
      <div className="ticket-status-card col-5 col-lg-2 m-1 mx-lg-3 p-3 text-center rounded-4 text-white bg-info bg-gradient">
        <div>
          <h4 className="m-0">
            <BsFillPenFill />
            <span className="ms-2 fw-bold">Open</span>
          </h4>
          <p className="fs-3 m-0 mt-3 fw-bold">{OPEN}</p>
        </div>
      </div>

      <div className="ticket-status-card col-5 col-lg-2 m-1 mx-lg-3 p-3 text-center rounded-4 text-white bg-warning bg-gradient">
        <div>
          <h4 className="m-0">
            <AiTwotoneThunderbolt />
            <span className="ms-2 fw-bold">In Progress</span>
          </h4>
          <p className="fs-3 m-0 mt-3 fw-bold">{IN_PROGRESS}</p>
        </div>
      </div>

      <div className="ticket-status-card col-5 col-lg-2 m-1 mx-lg-3 p-3 text-center rounded-4 text-white bg-success bg-gradient">
        <div>
          <h4 className="m-0">
            <BsFillPatchCheckFill />
            <span className="ms-2 fw-bold">Closed</span>
          </h4>
          <p className="fs-3 m-0 mt-3 fw-bold">{CLOSED}</p>
        </div>
      </div>

      <div className="ticket-status-card col-5 col-lg-2 m-1 mx-lg-3 p-3 text-center rounded-4 text-white bg-danger bg-gradient">
        <div>
          <h4 className="m-0">
            <ImBlocked />
            <span className="ms-2 fw-bold">Blocked</span>
          </h4>
          <p className="fs-3 m-0 mt-3 fw-bold">{BLOCKED}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
