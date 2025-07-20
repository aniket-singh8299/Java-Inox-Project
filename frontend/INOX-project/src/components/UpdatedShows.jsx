import React, { useState, useEffect, useContext } from "react";
import { globalVar } from "../globalContext/GlobalContext";

const UpdateShows = () => {
  let { setUpdateShowPanel } = useContext(globalVar);
  const [showDetails, setShowDetails] = useState({
    time: "",
    date: "",
    seat: "",
    theater: "",
    movie: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShowDetails({
      ...showDetails,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { time, date, seat, theater, movie } = showDetails;
    const newErrors = {};

    if (!time) newErrors.time = "Time is required";
    if (!date) newErrors.date = "Date is required";
    if (!seat) newErrors.seat = "Number of seats is required";
    if (!theater) newErrors.theater = "Theater name is required";
    if (!movie) newErrors.movie = "Movie name is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Updated Show Details:", showDetails);

      setErrors({});
      alert("Show updated successfully!");
    }
  };

  return (
    <section
      className="update-shows-main"
      onClick={(e) => {
        e.stopPropagation(), setUpdateShowPanel(false);
      }}>
      <div
        className="update-shows-container"
        onClick={(e) => {
          e.stopPropagation(), setUpdateShowPanel(true);
        }}>
        <h2>Update Show</h2>
        <form onSubmit={handleSubmit} className="update-show-form">
          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={showDetails.time}
              onChange={handleChange}
              className={errors.time ? "error" : ""}
            />
            {errors.time && <p className="error-message">{errors.time}</p>}
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={showDetails.date}
              onChange={handleChange}
              className={errors.date ? "error" : ""}
            />
            {errors.date && <p className="error-message">{errors.date}</p>}
          </div>

          <div className="form-group">
            <label>Seat</label>
            <input
              type="number"
              name="seat"
              value={showDetails.seat}
              onChange={handleChange}
              className={errors.seat ? "error" : ""}
            />
            {errors.seat && <p className="error-message">{errors.seat}</p>}
          </div>

          <div className="form-group">
            <label>Theater</label>
            <input
              type="text"
              name="theater"
              value={showDetails.theater}
              onChange={handleChange}
              className={errors.theater ? "error" : ""}
            />
            {errors.theater && (
              <p className="error-message">{errors.theater}</p>
            )}
          </div>

          <div className="form-group">
            <label>Movie</label>
            <input
              type="text"
              name="movie"
              value={showDetails.movie}
              onChange={handleChange}
              className={errors.movie ? "error" : ""}
            />
            {errors.movie && <p className="error-message">{errors.movie}</p>}
          </div>

          <button type="submit" className="submit-button">
            Update Show
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateShows;
