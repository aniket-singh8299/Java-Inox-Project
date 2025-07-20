import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SeatLayout = () => {
  let navigate = useNavigate();
  let { state } = useLocation(); // 'state' is passed as props, containing seat array with different prices
  console.log(state);
  let seatSeq = "A";
  let [selectedSeats, setSelectedSeats] = useState([]);
  let [showPayment, setShowPayment] = useState(false);

  let spaces = [1, 2, 3];

  let bookedTicket = () => {
    navigate("/payment", {
      state: {
        movieName: state?.movieName,
        theaterName: state?.theaterName,
        showTime: state?.ele?.time,
        seatInfo: selectedSeats,
        grandTotal: subtotal,
      },
    });
  };

  // Function to handle seat selection and deselection
  let SeatStatus = (e, seat) => {
    if (!seat.booked && !selectedSeats.includes(seat)) {
      e.target.style.backgroundColor = "#003688";
      e.target.style.color = "white";
      setSelectedSeats((prevSeats) => [...prevSeats, seat]); // Add full seat object to selectedSeats
      setShowPayment(true);
    } else if (selectedSeats.includes(seat)) {
      e.target.style.backgroundColor = "lightgray";
      e.target.style.color = "black";
      setSelectedSeats(
        (prevSeats) =>
          prevSeats.filter(
            (selectedSeat) => selectedSeat.seatNumber !== seat.seatNumber
          ) // Remove the seat
      );

      if (selectedSeats.length === 1) {
        setShowPayment(false); // Hide payment section if no seats are selected
      }
    }
  };

  // Calculate subtotal by summing the price of all selected seats
  const subtotal = selectedSeats.reduce((total, seat) => total + seat.price, 0);
  const grandTotal = subtotal; // In case you want to apply additional fees/taxes, modify grandTotal accordingly

  return (
    <section className="main1">
      <section className="main">
        <nav className="navseat">
          <div className="nav2">
            <span className="SeatLayoutNavEle">← BACK</span>
            <span className="SeatLayoutNavEle">SELECT SEAT</span>
            <span className="SeatLayoutNavEle">CHOOSE CINEMA</span>
            <span className="SeatLayoutNavEle">GRAB FOOD</span>
            <span className="SeatLayoutNavEle">PAYMENT</span>
          </div>
        </nav>

        <section className="seat">
          <div className="seat-content">
            <div className="line"></div>
            <div className="seat-screen">SCREEN</div>
            <div className="seat-legend">
              <span className="small1">
                <div className="small availableSeat"></div>
                <div className="SeatSelectionType">Available</div>
              </span>
              <span className="small1">
                <div className="small selectedSeat"></div>
                <div className="SeatSelectionType">Selected</div>
              </span>
              <span className="small1">
                <div className="small occupiedSeat"></div>
                <div className="SeatSelectionType">Occupied</div>
              </span>
            </div>
          </div>

          <section className="car1">
            {state?.ele?.seat?.map((seat, index) => {
              return (
                <>
                  {seat.seatNumber?.slice(0, 1) !== seatSeq &&
                    ((seatSeq = seat.seatNumber.slice(0, 1)),
                    (
                      <>
                        <br key={index} />
                        <br key={index + 1} />
                      </>
                    ))}

                  <span
                    className={`seats ${seat.booked ? "bookedSeat" : ""}`}
                    disabled={seat.booked}
                    onClick={(e) => {
                      SeatStatus(e, seat); // Pass the full seat object
                    }}
                    key={index + 2}
                  >
                    {seat.seatNumber}
                  </span>
                  {(seat.seatNumber.slice(1) == 4 ||
                    seat.seatNumber.slice(1) == 14) &&
                    spaces.map((space, i) => (
                      <span className="space" key={i + 1}>
                        space
                      </span>
                    ))}
                </>
              );
            })}
          </section>
        </section>
      </section>

      {showPayment && (
        <section className="carpayment">
          <div className="image-pic">
            <h1>Booking Summary</h1>
          </div>
          <div className="image-pic2">
            <div>SEAT INFO</div>
            <div>{selectedSeats.map((seat) => seat.seatNumber).join(", ")}</div>
            <div className="r1">R1</div>
          </div>
          <div className="image-pic3">
            <div>
              <h1>Tickets</h1>
            </div>
            <div>
              <h1>
                {selectedSeats.length} x ₹
                {selectedSeats.map((seat) => seat.price).join(", ")}
              </h1>
            </div>
          </div>
          <div className="image-pic4">
            <div>
              <h1>PAYMENT DETAILS</h1>
            </div>
            <div>
              <h1>Sub Total: ₹{subtotal}</h1>
            </div>
            <div>
              <select name="" id="" className="t1">
                <option value="">TAXES & FEES</option>
                <option value="">5%</option>
                <option value="">10%</option>
              </select>
            </div>
          </div>
          <div className="image-pic5">
            <div>
              <h1>Grand Total: ₹{grandTotal}</h1>
            </div>
            <div>
              <button className="button-grand" onClick={bookedTicket}>
                Proceed
              </button>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default SeatLayout;
