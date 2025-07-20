import React, { useContext, useEffect, useState } from "react";
import { IoGiftSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { globalVar } from "../globalContext/GlobalContext";
import PaymentSuccess from "./PaymentSuccess";
import axios from "axios";

const Payment = () => {
  let auth = localStorage.getItem("auth");
  const decodedToken = auth && jwtDecode(auth);
  let userDetails = decodedToken?.sub;
  let { setPaymentSuccessfullPanel, paymentSuccessfullPanel } =
    useContext(globalVar);
  const { state } = useLocation();
  const { movieName, theaterName, showTime, seatInfo, grandTotal } = state;

  const handlePaymentSuccess = () => {
    const ticketData = {
      movieName,
      theatreName: theaterName,
      showTiming: showTime, // Ensure this includes a valid Show object
      seatInfo, // Ensure this includes the list of seats
      grandTotal,
    };
    console.log(ticketData);
    console.log(state);
    axios
      .post("http://localhost:8080/ticket/save", ticketData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      })
      .then((response) => {
        console.log("Ticket created successfully:", response.data);
        setPaymentSuccessfullPanel(true); // Show success panel
      })
      .catch((error) => {
        console.error("Error creating ticket:", error);
      });
  };

  return (
    <section className="paymentPage">
      {paymentSuccessfullPanel && (
        <PaymentSuccess
          ticket={{
            movieName,
            theatreName: theaterName,
            showTiming: `${showTime}`,
            seatInfo,
            grandTotal,
            userDetails,
          }}
        />
      )}
      <div className="paymentmain">
        <div className="pay1">
          <div className="pays1">
            <h1>Movie Name: {movieName}</h1>
            <p>Theatre Name: {theaterName}</p>
          </div>
          <div className="pays2">
            <h1>
              Seat Info: {seatInfo.map((seat) => seat.seatNumber).join(", ")}
            </h1>
          </div>
        </div>

        <div className="pay2">
          <div className="pays3">
            <p>Sub-total</p>
            <p className="greys">Internet Handling fees</p>
            <p>Show Timing: {showTime}</p>
            <p>Integrated GST(IGST) @ 18%</p>
          </div>
          <div className="pays4">
            <p>Rs {grandTotal}</p>
            <p className="greys">Rs 70.80</p>
            <p>Rs 60.00</p>
          </div>
        </div>

        <div className="pay3">
          <div className="pays5">
            <p>Unlock Offers or Promocodes</p>
          </div>
          <div className="pays6">
            <div className="gift">
              <IoGiftSharp />
            </div>
          </div>
        </div>

        <div className="pay6" onClick={handlePaymentSuccess}>
          <p>Pay Rs {parseFloat(grandTotal) + 70.8 + 60}</p>
        </div>
      </div>
    </section>
  );
};

export default Payment;
