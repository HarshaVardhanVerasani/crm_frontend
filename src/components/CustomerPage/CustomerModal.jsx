import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL, CREATE_TICKET } from "../../apis/apis";

function CustomerModal({ fetchingCustomerAllTickets }) {
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
  });

  //filling state data variable
  const handleTicketFormData = (e) => {
    let copy = { ...ticket };
    copy[e.target.name] = e.target.value;
    setTicket(copy);
  };

  // async function for creating ticket
  const creatingTicketInBackend = async () => {
    try {
      await axios.post(`${BASE_URL}${CREATE_TICKET}`, ticket);

      //once ticket is created then i wipe out state so that every time the modal will be fresh for next use.
      setTicket({ ...ticket, title: "", description: "" });

      //Once ticket is created in database then we call get all tickets api again for getting newly  updated tickets data.
      fetchingCustomerAllTickets();
      //success message
      toast.success("Request Send");
    } catch (error) {
      console.log(error);
      toast.warn(
         error.response.data.message
      );
    }
  };

  // For Closing Modal after Send button clicked i'm using useRef to point out the html close button  element
  const closeButton = useRef();

  // Handle Form Data Making Sure All Fields Are Filled correctly
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (ticket.title === "") {
      toast.warn("Please Fill out Title Field");
      return;
    } else if (ticket.description === "") {
      toast.warn("Please Fill Out Description Field");
      return;
    }
    // if above checks are passed then only we call create ticket function
    creatingTicketInBackend();

    //Then dismissing the modal from the window
    closeButton.current.click();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-dark"
        data-bs-toggle="modal"
        data-bs-target="#customerModal"
      >
        Rise Ticket 🎫
      </button>

      <div
        className="modal fade"
        id="customerModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="customerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-6" id="customerModalLabel">
                Please Mention Your Issue In The below Fields
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title of the issue"
                  className="form-control text-capitalize mb-3"
                  value={ticket.title}
                  onChange={handleTicketFormData}
                />
                <textarea
                  className="form-control text-capitalize"
                  id="description"
                  name="description"
                  placeholder="Description"
                  rows="3"
                  value={ticket.description}
                  onChange={handleTicketFormData}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={closeButton}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={handleFormSubmit}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerModal;
