import axios from "axios";
import React, { useContext, useState } from "react";
import { globalVar } from "../globalContext/GlobalContext";
import toast from "react-hot-toast";

const Addmovie = () => {
  let { moviePanel, setMoviePanel,updateCount,setUpdateCount} = useContext(globalVar);
  const [formData, setFormData] = useState({
    moviename: "",
    genre: "",
    duration: "",
    language: "",
    movieImage: "",
  });

  // console.log(formData.duration);

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent form submission
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/movies/save",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`, 
          },
        }
      );

      toast.success("movie added successfully");
      setShowModal(false);
      setUpdateCount(updateCount+1)
      setMoviePanel(!moviePanel);

    } catch (error) {
      console.error("Error saving movie details:", error);
    }
  };

  return (
    <div
      className="main-body"
      onClick={(e) => {
        e.stopPropagation(), setMoviePanel(false);
      }}>
      <section className="center-section">
        <div className="form-container">
          <h2>Movie Details</h2>
          <form
            onClick={(e) => {
              e.stopPropagation(), setMoviePanel(true);
            }}>
            <div className="form-group">
              <label htmlFor="movieName">Movie Name:</label>
              <input
                type="text"
                id="movieName"
                name="moviename"
                value={formData.moviename}
                onChange={handleChange}
                placeholder="Enter movie name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="genre">Genre:</label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="Enter genre"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration:</label>
              <input
                type="time"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Enter duration"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="movieLanguage">Language:</label>
              <input
                type="text"
                id="movieLanguage"
                name="movieLanguage"
                value={formData.movieLanguage}
                onChange={handleChange}
                placeholder="Enter language"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="movieImage">Movie Image URL:</label>
              <input
                id="movieImage"
                name="movieImage"
                type="text"
                value={formData.movieImage}
                onChange={handleChange}
                placeholder="Enter image URL"
                required
              />
            </div>
            <div class="form-actions">
              <button type="submit" class="update-btn" onClick={handleUpdate}>
                Add Movie
              </button>
            </div>
          </form>
        </div>
      </section>

      {showModal && (
        <div
          className="modal"
          onClick={(e) => {
            e.stopPropagation(), setShowModal(false);
          }}>
          <div className="modal-content">
            <h3>Confirm Movie Details</h3>
            <p>
              <strong>Movie Name:</strong> {formData.moviename}
            </p>
            <p>
              <strong>Genre:</strong> {formData.genre}
            </p>
            <p>
              <strong>Duration:</strong> {formData.duration}
            </p>
            <p>
              <strong>Language:</strong> {formData.movieLanguage}
            </p>
            <p>
              <strong>Movie Image URL:</strong> {formData.movieImage}
            </p>

            <div className="modal-actions">
              <button className="close" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Addmovie;
