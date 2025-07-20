import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import movie1 from "../assests/movie1.avif";
import movie2 from "../assests/movie2.avif";
import movie3 from "../assests/movie3.avif";
import movie4 from "../assests/movie4.avif";
import movie5 from "../assests/movie5.jpg";
import movie6 from "../assests/movie6.jpg";
import { globalVar } from "../globalContext/GlobalContext";
import axios from "axios";

const Cinemas = () => {
  let {
    addthatrePanel,
    setAddTheatrePanel,
    updateTheaterId,
    setIsModalOpen,
    deleteData,
    setDeleteData,
    deleteCount,
    updateCount,
  } = useContext(globalVar);
  let [alltheateres, setAllTheatres] = useState([]);
  let [allImages, setAllImages] = useState([]);

  const movies = [
    { title: "Movie 1", posterUrl: movie1 },
    { title: "Movie 2", posterUrl: movie2 },
    { title: "Movie 3", posterUrl: movie3 },
    { title: "Movie 4", posterUrl: movie4 },
    { title: "Movie 5", posterUrl: movie5 },
    { title: "Movie 6", posterUrl: movie6 },
  ];

  let data1 = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  let fetchCinemas = async () => {
    let { data } = await axios.get("http://localhost:8080/open/cinemas/alls");
    console.log(data);
    data.map((ele) => {
      fetchCinemaImage(ele.id);
    });
    setAllTheatres(data);
  };
  let fetchCinemaImage = async (id) => {
    let { image } = await axios.get(
      `http://localhost:8080/open/location/${id}`
    );
    console.log(image);
    setAllImages([...allImages, image]);
  };
  console.log(allImages);

  let deleteTheaterId = (data) => {
    setIsModalOpen(true);
    setDeleteData({
      comp: "theater",
      data: data,
    });
  };

  useEffect(() => {
    console.log("data");
    fetchCinemas();
  }, [deleteCount, updateCount]);
  return (
    <div className="cinema-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search for cinema"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <button
          className="addtheater"
          onClick={() => {
            setAddTheatrePanel(true);
          }}>
          Add Theater
        </button>
      </div>
      <div className="cinema-cards-display">
        {alltheateres?.map((data) => {
          return (
            <div className="cinema-item" key={data.id}>
              <div>
                <h2 className="cinema-name">{data.name}</h2>
                <p className="cinema-address">{data.address}</p>
                {/* <p className="cinema-address">{data?.show}</p> */}
                <div className="buttons-update-delete">
                  <button
                    className="addupdate"
                    onClick={() => {
                      updateTheaterId(data);
                    }}>
                    Update
                  </button>
                  <button
                    className="adddelete"
                    onClick={() => {
                      deleteTheaterId(data);
                    }}>
                    Delete
                  </button>
                </div>
              </div>
              <div className="cinema-movie-items">
                <h2>Now Showing</h2>
                <div className="movie-list">
                  {movies.map((movie, index) => (
                    <div key={index} className="movie-item">
                      <img src={movie.posterUrl} alt={movie.title} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cinemas;
