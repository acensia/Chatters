// BouncingLayout.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./BouncingLayout.css"; // Ensure the CSS file is correctly linked
import harry from "../assets/HarryPotter.jpg";
import hermione from "../assets/HermioneGranger.jpg";
import ron from "../assets/RonWeasley.jpg";
import wand from "../assets/qwand.jpg";
import Circle from "./Circle";
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
  id: boolean | string;
}) => {
  // const [realName, setReal] = useState(clicked);
  // const onName = (text) => {
  //   setReal(text);
  // };
  console.log("Asker's name is " + props.clicked);
  return (
    <>
      <Circle
        profile_img={wand}
        name="Who else?"
        delay="1.6s"
        current={props.clicked}
        onClick={props.handleClicked}
      />
      <Chat curr={props.clicked} id={props.id} />
    </>
  );
};

const BouncingLayout = React.memo(() => {
  const [clicked, setClicked] = useState(false);
  const [id, setId] = useState(false);

  const handleClicked = // useCallback(
    (clickedone) => {
      // setClicked(true);
      console.log(clickedone);
      if (clickedone !== "Who else?") {
        setClicked(clickedone);
        callapi({ text: clickedone }, "/name")
          .then((res) => {
            setId(res["session_id"]);
          })
          .catch((error) => {
            console.error("Fetch error: ", error.message);
            // alert("Failed to reach the server. Please try again later.");
            setClicked(false);
          });
      } else {
        setClicked(clickedone);
      }

      return clicked;
    };
  //   ,
  //   [clicked]
  // );

  // useEffect(() => {
  //   if (name) {
  //     console.log("hhere??");
  //     setName(false);
  //   }
  // }, [name]);
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
      <Asker clicked={clicked} handleClicked={handleClicked} id={id} />
    </div>
  );
}, []);

export default BouncingLayout;