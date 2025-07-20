import axios from "axios";
import React, { useEffect, useState } from "react";

const AllBookings = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(tickets);
  // Fetch the tickets when the component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("auth"); // Get auth token from localStorage
      try {
        const response = await axios.get("http://localhost:8080/ticket/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTickets(response.data); // Store the fetched tickets
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Error fetching tickets");
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // If the data is still loading
  if (loading) {
    return <p>Loading tickets...</p>;
  }

  // If there was an error fetching the data
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="ticket-list-container">
      <h1>All Tickets</h1>
      <table>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Movie Name</th>
            <th>Theatre Name</th>
            <th>Show Timing</th>
            <th>Total Price</th>
            <th>Seats</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td data-label="Ticket ID">{ticket.id}</td>
              <td data-label="Movie Name">{ticket.movieName}</td>
              <td data-label="Theatre Name">{ticket.theatreName}</td>
              <td data-label="Show Timing">{ticket.showTiming || "N/A"}</td>
              <td data-label="Total Price">Rs {ticket.grandTotal}</td>
              <td data-label="Seats">
                {ticket.seatInfo.map((seat, index) => (
                  <span key={index} className="seat-info">
                    {seat.seatNumber}
                    {index < ticket.seatInfo.length - 1 ? ", " : ""}
                  </span>
                ))}
              </td>
              <td data-label="User" className="user-info">
                {ticket.user?.username || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AllBookings;
