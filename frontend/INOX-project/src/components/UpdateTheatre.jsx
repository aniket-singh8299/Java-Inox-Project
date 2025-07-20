import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { globalVar } from "../globalContext/GlobalContext";

const UpdateTheatre = () => {
  // Create state for theatre details including the id
  let {
    UpdateTheater,
    setUpdateTheater,
    updateNotify,
    setupdateNotify,
    theaterId,
    setTheaterId,
    updateTheaterIdData,
    setUpdateData,
    updateCount
  } = useContext(globalVar);
  const [theatre, setTheatre] = useState({
    id: "",
    name: "",
    address: "",
  });

  // Handle input change for all fields (id, name, address)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTheatre({
      ...theatre,
      [name]: value,
    });
  };

  let fetchTheater = async () => {
    const response = await axios.get(
      `http://localhost:8080/theater/${theaterId}`,
      {
        headers: {
          Authorization: ` Bearer ${localStorage.getItem("auth")}`,
        },
      }
    );
    setTheatre(response.data);
  };
  // Handle form submission to update the theatre details
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data")
    setupdateNotify(true);
    setUpdateTheater(false);
    console.log(theatre)
    setUpdateData({ comp: "theater", data: theatre });
  };

  // Handle form reset
  const handleReset = () => {
    setTheatre({ id: "", name: "", address: "" });
  };

  useEffect(() => {
    fetchTheater();
  }, []);
  return (
    <div className="theatre-main-container">
      <section className="theatre-form-section">
        <div className="theatre-form-container">
          <h2>Update Theatre Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="theatre-form-group">
              <label htmlFor="theatreId">Theatre ID:</label>
              <input
                type="text"
                id="id"
                name="id"
                value={theatre.id}
                onChange={handleChange}
                placeholder="Enter theatre ID"
                required
              />
            </div>

            <div className="theatre-form-group">
              <label htmlFor="theatreName">Theatre Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={theatre.name}
                onChange={handleChange}
                placeholder="Enter theatre name"
                required
              />
            </div>

            <div className="theatre-form-group">
              <label htmlFor="theatreAddress">Theatre Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={theatre.address}
                onChange={handleChange}
                placeholder="Enter theatre address"
                required
              />
            </div>

            <div className="theatre-form-actions">
              <button type="submit" className="theatre-update-btn">
                Update
              </button>
              <button
                type="button"
                className="theatre-delete-btn"
                onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UpdateTheatre;
