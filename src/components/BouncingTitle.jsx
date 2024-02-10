// BouncingLayout.jsx
import React, { useState } from "react";
import "./BouncingLayout.css"; // Ensure the CSS file is correctly linked
import harry from "../assets/harry.jpg";
import hermione from "../assets/hermione.jpg";
import ron from "../assets/ron.jpg";
import wand from "../assets/qwand.jpg";
import style from "styled-components";

const Profile = ({ img, name }) => {
  // const [isHovered, setHovered] = useState(false);

  const Styled = style.div`
    position:relative;
    transition: transform 0.4s ease;
    background-image: url(${img});
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-size: cover;
    background-position: center 10%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
   

    // Whitening effect
    ::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0); // No effect initially
      transition: background 0.3s ease; // Smooth transition for the whitening effect
      z-index: 0;
    }

    // Text styles
  .text {
    display:flex;
    position: absolute;
    opacity: 0;
    transition: opacity 0.3s ease; // Smooth transition for text appearance
    color: #000; // Adjust text color as needed
    z-index: 1;
    align-items: center;
    justify-content:center;
    text-align: center;
    width:100%;
    font-size:7vh;
    font-family: "Tangerine", cursive;
    z-index:1;
  }

    &:hover{
      transform: scale(1.2);

      .text{
        opacity:1;
        background:rgba(255, 255, 255, 0.5);
      }
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
  return (
    <Styled>
      <div className="text" style={{ width: "100%", height: "100%" }}>
        {name}
      </div>
    </Styled>
  );
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
          <Profile img={harry} name="Harry Potter " />
        </div>{" "}
        {/* <Profile delay="1.0" img={harry} /> */}
        <div
          className="circle pop"
          style={{
            animationDelay: "1.2s",
          }}
        >
          <Profile img={hermione} name="Hermione Granger" />
        </div>
        <div className="circle pop" style={{ animationDelay: "1.4s" }}>
          <Profile img={ron} name="Ron Weasley" />
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
