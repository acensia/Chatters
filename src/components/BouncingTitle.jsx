// BouncingLayout.jsx
import React, { useState } from "react";
import "./BouncingLayout.css"; // Ensure the CSS file is correctly linked
import harry from "../assets/harry.jpg";
import hermione from "../assets/hermione.jpg";
import ron from "../assets/ron.jpg";
import wand from "../assets/qwand.jpg";
import style from "styled-components";

const Profile = ({ img }) => {
  // const [isHovered, setHovered] = useState(false);

  const Styled = style.div`
    transition: transform 0.4s ease;
    background-image: url(${img});
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-size: cover;
    background-position: center 10%;
    background-repeat: no-repeat;
    &:hover{
      transform: scale(1.2);
    }
  `;

  // const style = {
  //   transition: `transform 0.5 ease`,
  //   // transform: isHovered ? "scale(1.2)" : "scale(1)",
  //   backgroundImage: `url(${img})`,
  //   width: "200px",
  //   height: "200px",
  //   borderRadius: "50%",
  //   backgroundSize: "cover" /* Ensures the image covers the entire circle */,
  //   backgroundPosition: "center 10%" /* Centers the image within the circle */,
  //   backgroundRepeat: "no-repeat" /* Prevents the image from repeating */,
  // };
  return <Styled />;
};

const BouncingLayout = () => {
  return (
    <div className="container">
      <h1 className="title pop" style={{ animationDelay: "0.1s" }}>
        Polyjuice
      </h1>
      <div className="circles">
        <div
          className="circle pop"
          style={{
            animationDelay: "1.0s",
          }}
        >
          <Profile img={harry} />
        </div>{" "}
        {/* <Profile delay="1.0" img={harry} /> */}
        <div
          className="circle pop"
          style={{
            animationDelay: "1.2s",
          }}
        >
          <Profile img={hermione} />
        </div>
        <div className="circle pop" style={{ animationDelay: "1.4s" }}>
          <Profile img={ron} />
        </div>
      </div>
      <div
        className="circle pop last"
        style={{
          animationDelay: "1.6s",
          marginTop: "20px",
        }}
      >
        <Profile img={wand} />
      </div>
    </div>
  );
};

export default BouncingLayout;
