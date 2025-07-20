import React from "react";
import img1 from "../Assets/img1.avif";
import img2 from "../Assets/img2.avif";
import img3 from "../Assets/img3.jpg";
import img4 from "../Assets/img4.webp";
import img5 from "../Assets/img5.png";
import img6 from "../Assets/img6.png";

const Corousel1 = () => {
  let data = [img1, img2, img3, img4, img5, img6];
  return (
    <section className="corousel1">
      {data.map((ele, i) => {
        return (
          <div className="cards">
            <img src={ele} alt="" />
          </div>
        );
      })}
    </section>
  );
};

export default Corousel1;
