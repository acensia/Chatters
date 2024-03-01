// BouncingLayout.jsx
import React, { useState } from "react";
import "./BouncingLayout.css"; // Ensure the CSS file is correctly linked
import harry from "../assets/harry.jpg";
import hermione from "../assets/hermione.jpg";
import ron from "../assets/ron.jpg";
import wand from "../assets/qwand.jpg";
import style from "styled-components";
import Circle from "./Circle";
import Chat from "./Chat";
import callapi from "./Callapi";

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

const BouncingLayout = ({ func, curr }) => {
  // const [clicked, setClicked] = useState(curr);
  const clicked = curr;
  const [target, setTarget] = useState("");

  const handleClicked = (clickedone) => {
    // setClicked(true);
    console.log(clickedone);
    if (clickedone !== "Who else?") {
      func(clickedone);
      setTarget(clickedone);
      callapi(clickedone, "/name")
        .then((msg) => {
          if (msg.includes("Error")) throw new Error(msg);
        })
        .catch((error) => {
          console.error("Fetch error: ", error.message);
          alert("Failed to reach the server. Please try again later.");
          func(false);
          setTarget("");
        });
    } else {
      func(clickedone);
      setTarget(clickedone);
    }

    return [clicked, target];
  };

  return (
    <div className={`container`}>
      <Title current={clicked} />
      <div className={`circles`} hidden={clicked}>
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
      <Chat curr={curr} clicked={target} onClick={handleClicked} />
    </div>
  );
};

export default BouncingLayout;
