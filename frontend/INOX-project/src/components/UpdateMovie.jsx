import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { globalVar } from "../globalContext/GlobalContext";
import toast, { Toaster } from "react-hot-toast";

const UpdateMovie = () => {
  let {
    updateData,
    setUpdateData,
    updatemoviePanel,
    setUpdatemoviePanel,
    updateNotify,
    setupdateNotify,
    updateCount,
    setUpdateCount
  } = useContext(globalVar);

  let [updateMovie, setUpdateMovie] = useState({
    id: " ",
    moviename: " ",
    genre: " ",
    duration: " ",
    movieLanguage: " ",
    movieImage: " ",
  });
 console.log("updateData",updateData)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateMovie({ ...updateMovie, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setupdateNotify(true);
    setUpdatemoviePanel(false);
    console.log(updateMovie)
    setUpdateData({ comp: "movies", data: updateMovie });
  };
  useEffect(() => {
    const fetchMovie = async () => {
      let token = localStorage.getItem("auth");
      try {
        const response = await axios.get(
          `http://localhost:8080/movies/find/${updateData?.data?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the headers
            },
          }
        );
        setUpdateMovie(response.data);
        setUpdateCount(updateCount+1)
        console.log("Movie updated:", response.data);
      } catch (error) {
        console.error("There was an error updating the movie!", error);
      }
    };
    fetchMovie();
  }, []);
  return (
    <div className="update-movie" onClick={(e)=>{e.stopPropagation(),setUpdatemoviePanel(false)}}>
      
      <form className="update-movie__form" onSubmit={handleSubmit} onClick={(e)=>{e.stopPropagation(),setUpdatemoviePanel(true)}}>
        <label className="update-movie__label">Movie ID:</label>
        <input
          type="text"
          className="update-movie__input"
          value={updateMovie.id}
          readOnly
        />

        <label className="update-movie__label">Movie Name:</label>
        <input
          type="text"
          className="update-movie__input"
          name="moviename"
          value={updateMovie.moviename}
          onChange={handleChange}
        />

        <label className="update-movie__label">Genre:</label>
        <input
          type="text"
          className="update-movie__input"
          name="genre"
          value={updateMovie.genre}
          onChange={handleChange}
        />

        <label className="update-movie__label">Duration:</label>
        <input
          type="time"
          className="update-movie__input"
          name="duration"
          value={updateMovie.duration}
          onChange={handleChange}
        />

        <label className="update-movie__label">Language:</label>
        <input
          type="text"
          className="update-movie__input"
          name="movieLanguage"
          value={updateMovie.movieLanguage}
          onChange={handleChange}
        />

        <label className="update-movie__label">Movie Image:</label>
        <input
          type="text"
          className="update-movie__input"
          name="movieImage"
          value={updateMovie.movieImage}
          onChange={handleChange}
        />

        <button type="submit" className="update-movie__button">
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
