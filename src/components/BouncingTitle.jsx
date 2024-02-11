// BouncingLayout.jsx
import React, { useState } from "react";
import "./BouncingLayout.css"; // Ensure the CSS file is correctly linked
import harry from "../assets/harry.jpg";
import hermione from "../assets/hermione.jpg";
import ron from "../assets/ron.jpg";
import wand from "../assets/qwand.jpg";
import style from "styled-components";
import Circle from "./Circle";

const Title = ({ current }) => {
  const titleStyle = {
    animation: current
      ? "fade 0.5s forwards"
      : "pop 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards",
    textAlign: "center",
    marginBottom: "10vh",
    fontFamily: '"Tangerine", cursive',
    fontSize: "10vw",
    animationDelay: current ? "0s" : "0.1s",
  };
  return <h1 style={titleStyle}>Polyjuice</h1>;
};

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

const BouncingLayout = () => {
  const [clicked, setClicked] = useState(false);
  const [target, setTarget] = useState("");

  const handleClicked = (clickedone) => {
    setClicked(true);
    setTarget(clickedone);
    console.log(clickedone);
    return [clicked, target];
  };

  return (
    <div className="container">
      <Title current={clicked} />
      {/* <h1
        className={"title pop" + (clicked ? "" : "fade")}
        style={{ animationDelay: "0.1s" }}
      >
        Polyjuice
      </h1> */}
      <div className="circles">
        <Circle
          img={harry}
          name="Harry Potter"
          delay="1.0s"
          current={clicked}
          clickedID={target}
          onClick={handleClicked}
        />
        <Circle
          img={hermione}
          name="Hermione Granger"
          delay="1.2s"
          current={clicked}
          clickedID={target}
          onClick={handleClicked}
        />
        <Circle
          img={ron}
          name="Ron Weasley"
          delay="1.4s"
          current={clicked}
          clickedID={target}
          onClick={handleClicked}
        />
      </div>
      <Circle
        img={wand}
        name="Who else?"
        delay="1.6s"
        current={clicked}
        clickedID={target}
        onClick={handleClicked}
      />
    </div>
  );
};

export default BouncingLayout;
