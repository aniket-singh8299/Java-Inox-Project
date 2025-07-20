import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { globalVar } from "../globalContext/GlobalContext";
import { toast } from "react-toastify";
import { Toaster } from "react-hot-toast";

const AddShows = () => {
  let { setAddShowPanel, updateCount, setUpdateCount } = useContext(globalVar);
  const [showDetails, setShowDetails] = useState({
    time: "",
    date: "",
    theater: null,
    movie: null,
  });

  const [theaters, setTheaters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showIdToDelete, setShowIdToDelete] = useState("");

  const token = localStorage.getItem("auth");

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axios.get("http://localhost:8080/theater/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTheaters(response.data);
      } catch (error) {
        console.error("Error fetching theaters:", error);
        setApiError("Failed to fetch theaters. Please try again later.");
      }
    };

    const fetchMovies = async () => {
      console.log(token);
      try {
        const response = await axios.get("http://localhost:8080/movies/all", {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        });

        setMovies(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setApiError("Failed to fetch movies. Please try again later.");
      }
    };

    fetchTheaters();
    fetchMovies();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "theater" || name === "movie") {
      setShowDetails({
        ...showDetails,
        [name]: { id: value },
      });
    } else {
      setShowDetails({
        ...showDetails,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    const { time, date, theater, movie } = showDetails;
    const newErrors = {};

    if (!time) newErrors.time = "Time is required";
    if (!date) newErrors.date = "Date is required";
    if (!theater) newErrors.theater = "Theater selection is required";
    if (!movie) newErrors.movie = "Movie selection is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/theater/all",
          showDetails,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth")}`,
            },
          }
        ); // Replace with your API endpoint
        // const data = await response.json();
        setTheaters(response.data); // Assuming data is an array of theaters
      } catch (error) {
        console.error("Error fetching theaters:", error);
      }
    };
    fetchTheaters();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:8080/movies/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        }); // Replace with your API endpoint
        setMovies(response.data); // Assuming response.data is an array of movies
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   console.log(localStorage.getItem("auth"))
    //   const response = await axios.post("http://localhost:8080/show/save",showDetails,
    //     {
    //       headers: {
    //         Authorization:`Bearer ${localStorage.getItem("auth")}`
    //       }
    //     }
    //   );
    //   console.log(response)
    // }
    // catch (error) {
    //   console.log("error" + error);
    // }
    if (validateForm()) {
      setApiError("");
      setSuccessMessage("");

      const payload = {
        time: showDetails.time,
        date: showDetails.date,
        theater: { id: showDetails.theater.id },
        movie: { id: showDetails.movie.id },
      };

      try {
        const response = await axios.post(
          `http://localhost:8080/show/save/${showDetails.theater.id}/${showDetails.movie.id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: ` Bearer ${token}`,
            },
          }
        );

        console.log("API response:", response.data);
        toast.success("Show Added Successfully");
        setUpdateCount(updateCount + 1);
        setShowDetails({
          time: "",
          date: "",
          theater: null,
          movie: null,
        });
        setAddShowPanel(false);
        setErrors({});
        // setSuccessMessage("Show added successfully!");
      } catch (error) {
        console.error("Error saving the show:", error);

        if (error.response) {
          setApiError(
            `Failed to save the show: ${
              error.response.data.message || "Server Error"
            }`
          );
        } else if (error.request) {
          setApiError("No response from the server. Please try again later.");
        } else {
          setApiError("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  const handleDelete = async () => {
    if (!showIdToDelete) {
      setApiError("Please enter a valid show ID to delete.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8080/show/delete/${showIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Delete response:", response.data);
      setSuccessMessage("Show deleted successfully!");
      setShowIdToDelete(""); // Clear the show ID input after deletion
    } catch (error) {
      console.error("Error deleting the show:", error);
      if (error.response) {
        setApiError(
          `Failed to delete the show: ${
            error.response.data.message || "Server Error"
          }`
        );
      } else if (error.request) {
        setApiError("No response from the server. Please try again later.");
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    }
  };
  return (
    <section
      className="add-show-main"
      onClick={(e) => {
        e.stopPropagation(), setAddShowPanel(false);
      }}
    >
      <Toaster />
      <div
        className="add-shows-container"
        onClick={(e) => {
          e.stopPropagation(), setAddShowPanel(true);
        }}
      >
        <h2>Add New Show</h2>
        <form onSubmit={handleSubmit} className="add-show-form">
          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={showDetails.time}
              onChange={handleChange}
              className={errors.time ? "error" : ""}
              required
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
              required
            />
            {errors.date && <p className="error-message">{errors.date}</p>}
          </div>

          <div className="form-group">
            <label>Theater</label>
            <select
              name="theater"
              value={showDetails.theater ? showDetails.theater.id : ""}
              onChange={handleChange}
              className={errors.theater ? "error" : ""}
              required
            >
              <option value="">Select Theater</option>
              {theaters.map((theater) => (
                <option key={theater.id} value={theater.id}>
                  {theater.name}
                </option>
              ))}
            </select>
            {errors.theater && (
              <p className="error-message">{errors.theater}</p>
            )}
          </div>

          <div className="form-group">
            <label>Movie</label>
            <select
              name="movie"
              value={showDetails.movie ? showDetails.movie.id : ""}
              onChange={handleChange}
              className={errors.movie ? "error" : ""}
              required
            >
              <option value="">Select Movie</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.moviename}
                </option>
              ))}
            </select>
            {errors.movie && <p className="error-message">{errors.movie}</p>}
          </div>

          <button type="submit" className="submit-button">
            Add Show
          </button>

          {apiError && <p className="error-message">{apiError}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </form>
        {/* <div className="delete-show">
          <h2>Delete Show</h2>
          <input
            type="text"
            placeholder="Enter Show ID"
            value={showIdToDelete}
            onChange={(e) => setShowIdToDelete(e.target.value)}
          />
          <button onClick={handleDelete} className="delete-button">
            Delete Show
          </button>
          {apiError && <p className="error-message">{apiError}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div> */}
      </div>
    </section>
  );
};

export default AddShows;
