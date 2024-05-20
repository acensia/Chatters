// BouncingLayout.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./BouncingLayout.css"; // Ensure the CSS file is correctly linked
import harry from "../assets/HarryPotter.jpg";
import hermione from "../assets/HermioneGranger.jpg";
import ron from "../assets/RonWeasley.jpg";
import wand from "../assets/qwand.jpg";
import Circle, { Circle_input } from "./Circle";
import Chat from "./Chat";
import callapi from "./Callapi";

const Title = (props: { current: boolean | string }) => {
  const titleStyle: React.CSSProperties = {
    animation: props.current
      ? "fade 0.5s forwards"
      : "pop 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards",
    textAlign: "center",
    marginBottom: "10vh",
    fontFamily: '"Tangerine", cursive',
    fontSize: "10vw",
    animationDelay: props.current ? "0s" : "0.1s",
  };
  return <h1 style={titleStyle}>Polyjuice</h1>;
};

const Asker = (props: {
  clicked: boolean | string;
  handleClicked: Function;
}) => {
  // const [realName, setReal] = useState(clicked);
  // const onName = (text) => {
  //   setReal(text);
  // };
  console.log("Asker's name is " + props.clicked);
  return (
    <>
      <Circle_input
        profile_img={wand}
        name="Who else?"
        delay="1.6s"
        current={props.clicked}
        onClick={props.handleClicked}
      />
    </>
  );
};

const BouncingLayout = React.memo(() => {
  const [clicked, setClicked] = useState(false);
  const handleClicked = // useCallback(
    (clickedone: any) => {
      // setClicked(true);
      console.log(clickedone);
      setClicked(clickedone);

      // return clicked;
    };
  return (
    <div className="container">
      <Title current={clicked} />
      <div className={`circles`} hidden={clicked}>
        <Circle
          profile_img={harry}
          name="Harry Potter"
          delay="1.0s"
          current={clicked}
          onClick={handleClicked}
        />
        <Circle
          profile_img={hermione}
          name="Hermione Granger"
          delay="1.2s"
          current={clicked}
          onClick={handleClicked}
        />
        <Circle
          profile_img={ron}
          name="Ron Weasley"
          delay="1.4s"
          current={clicked}
          onClick={handleClicked}
        />
      </div>
      <Asker clicked={clicked} handleClicked={handleClicked} />
      <Chat curr={clicked} />
    </div>
  );
});

export default BouncingLayout;
