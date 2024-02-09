// BouncingLayout.jsx
import React from "react";
import "./BouncingLayout.css"; // Ensure the CSS file is correctly linked
import harry from "../assets/harry.jpg";
import hermione from "../assets/hermione.jpg";
import ron from "../assets/ron.jpg";
import wand from "../assets/qwand.jpg";

const BouncingLayout = () => {
  return (
    <div className="container">
      <h1 className="title pop" style={{ animationDelay: "0.1s" }}>
        Polyjuice
      </h1>
      <div className="circles">
        <div
          className="circle pop"
          style={{ animationDelay: "0.3s", backgroundImage: `url(${harry})` }}
        ></div>
        <div
          className="circle pop"
          style={{
            animationDelay: "0.5s",
            backgroundImage: `url(${hermione})`,
          }}
        ></div>
        <div
          className="circle pop"
          style={{ animationDelay: "0.7s", backgroundImage: `url(${ron})` }}
        ></div>
      </div>
      <div
        className="circle pop last"
        style={{
          animationDelay: "0.9s",
          marginTop: "20px",
          backgroundImage: `url(${wand})`,
        }}
      ></div>
    </div>
  );
};

export default BouncingLayout;
