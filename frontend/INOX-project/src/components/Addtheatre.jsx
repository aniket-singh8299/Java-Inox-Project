import React, { useContext, useState } from "react";
import axios from "axios";
import { globalVar } from "../globalContext/GlobalContext";
import toast from "react-hot-toast";

const Addtheatre = () => {
  // Create state for theatre name and address
  let { addthatrePanel, setAddTheatrePanel,updateCount,setUpdateCount } = useContext(globalVar);
  const [theatre, setTheatre] = useState({
    name: "",
    address: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTheatre({
      ...theatre,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post(
        "http://localhost:8080/theater/save",
        theatre,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        }
      );
      console.log("Theater added successfully:", response.data);
      toast.success("Theater Added Successfully")
      setUpdateCount(updateCount+1)
      setAddTheatrePanel(false);
      // Optionally clear form fields after successful submission
      setTheatre({ name: "", address: "" });
      
    } catch (error) {
      console.error("Error adding theatre:", error);
    }
  };

  // Handle form reset
  const handleReset = () => {
    setTheatre({ name: "", address: "" });
  };

  return (
    <div
      className="theatre-main-container"
      onClick={(e) => {
        e.stopPropagation(), setAddTheatrePanel(false);
      }}>
      <section
        className="theatre-form-section"
        onClick={(e) => {
          e.stopPropagation(), setAddTheatrePanel(true);
        }}>
        <div className="theatre-form-container">
          <h2>Theatre Details</h2>
          <form onSubmit={handleSubmit}>
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
                Submit
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

export default Addtheatre;
