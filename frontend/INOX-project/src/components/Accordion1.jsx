import React, { useContext, useState } from "react";
import { RiWheelchairFill } from "react-icons/ri";
import { MdOutlineDirections } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { globalVar } from "../globalContext/GlobalContext";
import { useNavigate } from "react-router-dom";

const Accordion1 = ({ data, filterData }) => {
  let navigate = useNavigate();
  let { setUpdateShowPanel, setDeleteData, setIsModalOpen, inoxLoginType } =
    useContext(globalVar);
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  let handleDeleteShow = (data) => {
    setIsModalOpen(true);
    setDeleteData({
      comp: "",
      data: data,
    });
  };

  let handleBooking = (ele) => {
    navigate("/selectseats", { state: ele });
  };

  return (
    <>
      {data.movies.map((movie) => {
        return (
          <section className="show-timings-container" key={movie.moviename}>
            <div className="accordion-header" onClick={toggleAccordion}>
              <div className="inoxhead">
                <h2 className="inoxh2">{data?.name}</h2>
                <p className="inoxp">{data?.address}</p>
              </div>
              <div className="accordionicons">
                <p>20.1km away</p>
                <div>
                  <RiWheelchairFill />
                </div>
                <div>
                  <MdOutlineDirections />
                </div>
                <div>
                  <FaRegHeart />
                </div>
                <span>{isOpen ? "-" : "+"}</span>
              </div>
            </div>

            {isOpen && (
              <div className="downaccordion">
                <div className="accordion-content">
                  <h3>{movie.moviename.toUpperCase()}</h3>

                  <div className="timings-row">
                    {filterData?.timing ? ( // Safely check if filterData and timing exist
                      <div
                        className="time-box"
                        onClick={() => {
                          handleBooking({
                            ele: filterData.timing,
                            movieName: filterData?.moviename?.toUpperCase(),
                            theaterName: data.name,
                          });
                        }}
                      >
                        {filterData.timing}
                      </div>
                    ) : (
                      movie?.shows?.map((ele, index) => {
                        return (
                          <div
                            className="time-box"
                            onClick={() => {
                              handleBooking({
                                ele,
                                movieName: movie.moviename.toUpperCase(),
                                theaterName: data.name,
                              });
                            }}
                            key={index}
                          >
                            {ele.time}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        );
      })}
    </>
  );
};

export default Accordion1;
