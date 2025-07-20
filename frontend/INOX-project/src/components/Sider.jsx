import React, { useContext, useState, useEffect } from "react";
import { globalVar } from "../globalContext/GlobalContext";
import { ImCross } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import banglore from "../assests/banglore.jpg";
import delhi from "../assests/delhi.png";
import mumbai from "../assests/mumbai.jpg";
import hyderabad from "../assests/hyderabad.jpg";
import defaultimage from "../assests/defaultimage.jpg";

const Sider = () => {
  let [searchedCity, setSEarchedCity] = useState("");

  let staticCity = [
    { name: "Ahmedabad", image: hyderabad },
    { name: "Delhi-NCR", image: delhi },
    { name: "Mumbai-All", image: mumbai },
    { name: "Bengaluru", image: banglore },
  ];

  let cities = [
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
    siderVisible,
    setSiderVisible,
    userLocation,
    setUserLocation,
    selectedCity,
    setSelectedCity,
  } = useContext(globalVar);

  let handleClose = (e) => {
    e.stopPropagation();
    setSiderVisible(false);
  };

  useEffect(() => {
    if (selectedCity) {
      const timer = setTimeout(() => {
        setSiderVisible(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedCity]);

  useEffect(() => {
    setSelectedCity(null);
  }, []);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setUserLocation(city.name);
    toast.success(`City ${city.name} is selected!`, {
      position: "top-center",
      autoClose: 2000,
    });
  };
  console.log(searchedCity);
  return (
    <section className="sideBar" onClick={handleClose}>
      <ToastContainer />
      <div
        className="city-sidebar"
        onClick={(e) => {
          e.stopPropagation();
          setSiderVisible(true);
        }}>
        <div>
          <button className="btn" onClick={handleClose}>
            <ImCross />
          </button>
        </div>

        {selectedCity ? (
          <div className="selectedCityImage">
            <h3>{selectedCity.name}</h3>
            <img
              src={selectedCity.image ? selectedCity.image : defaultimage}
              alt={selectedCity.name}
            />
          </div>
        ) : (
          <>
            <div className="selectcity">
              <h3>Select City</h3>
              <br />
              <input
                type="text"
                placeholder="Select City"
                onChange={(e) => {
                  setSEarchedCity(e.target.value);
                }}
                value={searchedCity}
              />
              {searchedCity && (
                <div className="SearchedCityPanel">
                  {cities
                    .filter((city) =>
                      city.toLowerCase().includes(searchedCity.toLowerCase())
                    )
                    .map((cityName, index) => {
                      const foundCity = staticCity.find(
                        (city) => city.name === cityName
                      );

                      return (
                        <div
                          key={index}
                          className="SearchedCityPanelItems"
                          onClick={() => {
                            if (foundCity) {
                              handleCitySelect(foundCity);
                            } else {
                              handleCitySelect({
                                name: cityName,
                                image: defaultimage,
                              });
                            }
                            setSEarchedCity("");
                          }}>
                          {cityName}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {searchedCity == "" && (
              <>
                <div className="static">
                  <div className="city-grid">
                    {staticCity.map((city, index) => (
                      <div
                        key={index}
                        className="city-tile"
                        onClick={() => handleCitySelect(city)}>
                        <img src={city.image} alt={city.name} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="cityLines">
                  <p></p>
                  <h4>Other Cities</h4>
                  <p></p>
                </div>
                <ul>
                  {cities.map((city, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        const foundCity = staticCity.find(
                          (cityObj) => cityObj.name === city
                        );

                        if (foundCity) {
                          handleCitySelect(foundCity);
                        } else {
                          handleCitySelect({ name: city, image: defaultimage });
                        }
                      }}>
                      {city}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Sider;
