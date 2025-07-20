// PaymentSuccess.jsx
import React, { useContext } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai"; // For checkmark icon
import { globalVar } from "../globalContext/GlobalContext";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = ({ ticket }) => {
  let date = new Date().getDate();
  console.log(ticket);
  let navigate = useNavigate();
  let { setPaymentSuccessfullPanel, paymentSuccessfullPanel } =
    useContext(globalVar);

  let handleClose = (e) => {
    e.stopPropagation(), navigate("/");
    setPaymentSuccessfullPanel(false);
  };
  return (
    <div className="payment-success-container" onClick={handleClose}>
      <div className="success-icon">
        <AiOutlineCheckCircle size={60} color="#4CAF50" />
      </div>
      <h1 className="success-title">Payment Successful!</h1>
      <p className="success-message">
        Thank you for your payment. Your transaction has been completed.
      </p>
      <p>Click on this QR to download</p>
      <a
        href={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${date}/ ${ticket.showTiming}/${ticket.seatInfo}/ ${ticket.movieName}/ ${ticket.theatreName}`}
        download="ticket-qr-code.png"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${date}/ ${ticket.showTiming}/${ticket.seatInfo}/ ${ticket.movieName}/ ${ticket.theatreName}`}
          alt="QR Code"
        />
      </a>

      <button className="success-button" onClick={handleClose}>
        Close
      </button>
    </div>
  );
};

export default PaymentSuccess;
