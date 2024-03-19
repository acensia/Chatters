import React, { useState } from "react";
import "./BouncingLayout.css"; // Ensure the CSS file is correctly linked
import style from "styled-components";

const Circleimg = ({ img, name }) => {
  // const [isHovered, setHovered] = useState(false);
  // const [currName, setName] = useState(name);

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
      font-size:5vw;
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
  return (
    <Styled>
      <div className="text" style={{ width: "100%", height: "100%" }}>
        {name}
      </div>
    </Styled>
  );
};

const Circle = ({ img, name, delay, current, onClick }) => {
  const last = name === "Who else?";
  const moveType = () => {
    switch (name) {
      case "Harry Potter":
        return "moveRight";
      case "Ron Weasley":
        return "moveLeft";
      case "Hermione Granger":
        return "moveUp";
      default:
        return "moveUpMore";
    }
  };
  console.log(current);
  const Circlepop = style.div`
    ${current ? "transform:scale(1);" : "transform:scale(0);"}
    width: ${last ? "16vw" : "22vw"};
    height: ${last ? "16vw" : "22vw"};
    border-radius: 50%;
    background-color: #cccccc; /* Example color */
    margin-left: 2vw;
    margin-right: 2vw;
    margin-bottom: 2vw;
    background-size: cover; /* Ensures the image covers the entire circle */
    background-position: center 10%; /* Centers the image within the circle */
    background-repeat: no-repeat; /* Prevents the image from repeating */
    animation: ${
      current
        ? current === name // changed
          ? `${moveType()} 2s ease forwards`
          : "fade 0.5s forwards"
        : "pop 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards"
    };
    animation-delay:${current ? "0s" : delay};
  `;

  return (
    <Circlepop
      className={name === "Who else?" ? "last" : ""}
      onClick={() => {
        if (!current) onClick(name);
      }}
    >
      <Circleimg img={img} name={name} />
    </Circlepop>
  );
};

export default Circle;
