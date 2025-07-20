import React from "react";
import Barcode from "react-barcode";

const MovieTicket = () => {
  return (
    <article className="MovieTicketPanel">
    <section className="ticket-outer">
      <div className="ticket-container-number">
        <div className="ticket-number">
          <p>NO. 00000000</p>
        </div>
        <div className="ticket-number">
          <p>MOVIE TICKET</p>
        </div>
      </div>
      <div className="ticket">
        <div className="ticket-left">
          <div className="theater-info">
            <div className="icon">🎟️</div>
            <div className="theater-details">
              <div>THEATER: 1</div>
              <div>SEAT: 10/11</div> <br />
              <div>DATE: 2025/02/23</div>
            </div>
          </div>
        </div>
        <div className="ticket-right">
          <div className="movie-name">
            <h4>MOVIE NAME</h4>
            <span>NO.00000000</span>
            <div className="theater-details-right">
              <span>THEATER: 1</span>
              <span> SEAT: 10/11</span>
              <br />
              <span>DATE: 2025/02/23</span>
            </div>
          </div>

          <div className="barcode-class">
            <Barcode value={"ticketNumber"} className="barcode" />
          </div>
        </div>
      </div>
    </section>
    </article>
  );
};

export default MovieTicket;
