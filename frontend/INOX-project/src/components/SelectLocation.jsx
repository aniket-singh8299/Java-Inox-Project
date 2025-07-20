import React, { useState, useContext, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { globalVar } from "../globalContext/GlobalContext";
import banglore from "../assests/banglore.jpg";
import delhi from "../assests/delhi.png";
import mumbai from "../assests/mumbai.jpg";
import hyderabad from "../assests/hyderabad.jpg";
import defaultimage from "../assests/defaultimage.jpg";
import toast, { Toaster } from "react-hot-toast";

const SelectLocation = () => {
  let [selectedCityHorizontal, setSelectedCityHorizontal] = useState(null);

  let selectCity = [
    { name: "Ahmedabad", image: hyderabad },
    { name: "Delhi-NCR", image: delhi },
    { name: "Mumbai-All", image: mumbai },
    { name: "Bengaluru", image: banglore },
    { name: "Mumbai-All", image: mumbai },
    { name: "Bengaluru", image: banglore },
  ];

  let selectcities = [
    "Ahmedabad",
    "Ajmer",
    "Amritsar",
    "Anand",
    "Armoor",
    "Aurangabad",
    "Bareilly",
    "Belagavi",
    "Belgaum",
    "Bengaluru",
    "Bharuch",
    "Bhilai",
    "Bhilwara",
    "Bhiwadi",
    "Bhopal",
    "Bhubaneswar",
    "Bilaspur",
    "Bokaro",
    "Burdwan",
    "Chandigarh",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Cuttack",
  ];

  let {
    location,
    setLocation,
    userLocation,
    setUserLocation,
    selectedCity,
    setSelectedCity,
  } = useContext(globalVar);

  const handleClose = (e) => {
    e.stopPropagation();
    setLocation(false);
  };

  useEffect(() => {
    if (selectedCityHorizontal) {
      const timer = setTimeout(() => {
        setLocation(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedCityHorizontal]);

  useEffect(() => {
    setSelectedCity(null);
  }, []);

  const handleCitySelectHorizontal = (city) => {
    setSelectedCityHorizontal(city);
    setUserLocation(city.name);
    toast.success(`City ${city.name} is selected!`, {
      position: "top-center",
      autoClose: 1500,
    });
  };

  return (
    <section className="selectLocation" onClick={handleClose}>
      <Toaster />
      <section
        className={"horizontalBar"}
        onClick={(ele) => {
          ele.stopPropagation();
          setLocation(true);
        }}>
        <div>
          <button className="btn" onClick={handleClose}>
            <ImCross />
          </button>
        </div>

        {selectedCityHorizontal ? (
          <div className="selectedCityHorizontalImage">
            <h3>{selectedCityHorizontal.name}</h3>
            <img
              src={selectedCityHorizontal.image || defaultimage}
              alt={selectedCityHorizontal.name}
            />
          </div>
        ) : (
          <>
            <div className="input-container">
              <h3>Select City</h3>
              <input
                type="text"
                placeholder="Search City"
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                }}
                value={selectedCity || ""}
              />
              {selectedCity && (
                <div className="searchedCityPanel">
                  {selectcities
                    .filter((city) =>
                      city.toLowerCase().includes(selectedCity.toLowerCase())
                    )
                    .map((cityName, index) => {
                      const foundCity = selectCity.find(
                        (city) => city.name === cityName
                      );
                      return (
                        <div
                          key={index}
                          className="searchedCityPanelItems"
                          onClick={() => {
                            if (foundCity) {
                              handleCitySelect(foundCity);
                            } else {
                              handleCitySelect({
                                name: cityName,
                                image: defaultimage,
                              });
                            }
                            setSelectedCity("");
                          }}>
                          {cityName}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            <div className="static-horizontal">
              <div className="city-grid">
                {selectCity.map((city, index) => (
                  <div
                    key={index}
                    className="city-tile"
                    onClick={() => handleCitySelectHorizontal(city)}>
                    <img
                      src={city.image}
                      alt={city.name}
                      className="locationImage"
                    />
                  </div>
                ))}
              </div>
              <div className="city-list">
                <h4>Other Cities</h4>
                <ul>
                  {selectcities.map((city, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        handleCitySelectHorizontal({
                          name: city,
                          image: defaultimage,
                        })
                      }>
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </section>
    </section>
  );
};

export default SelectLocation;
