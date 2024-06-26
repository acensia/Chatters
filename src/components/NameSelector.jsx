import React, { useState } from "react";
import "./anime.css"; // Adjust the path based on your file structure
import callapi from "./Callapi";

function NameSelector({ isVisible, onSubmit }) {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  // console.log(`Visible status is ${isVisible}`);
  // console.log(`Submitting status is ${isSubmitting}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    callapi({ text: inputValue }, "/check")
      .then((respond) => {
        const res = respond["checked"];
        if (res.includes("Error")) throw new Error(res);
        console.log(`Check Result : ${res}`);
        if (res !== "no") {
          setIsSubmitting(true); // Begin the fade-out effect
          const cleared = res.replace(/[^a-zA-Z0-9]/g, "");
          console.log(res);
          callapi({ text: res }, "/name").then((red) => {
            console.log("ID set is :" + red["session_id"]);
            onSubmit(res, red["session_id"]);
          });
          if (res !== inputValue) {
            setValidationMessage(`Correct name is ${res}`);
          } // Clear any previous validation messages
          setTimeout(() => {
            setIsSubmitting(false);
            setValidationMessage(""); // Clear any previous validation messages
          }, 1000); // Reset state after animation
        } else {
          setValidationMessage(`No \"${inputValue}\" in Harry Potter world`);
        }
      })
      .catch((err) => {
        console.log(err);
        setValidationMessage("Connection Error");
      });
  };

  return (
    <div
      className={`invisible ${isVisible ? "message-box" : ""} ${
        isSubmitting ? "hidden" : ""
      }`}
    >
      <div style={{ alignContent: "center" }}>
        <form onSubmit={handleSubmit}>
          Call whose name is&nbsp;
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: "10vw", backgroundColor: "transparent" }}
            required
          />
          {/* <button type="submit" style={{ margin: "1vh" }}>
            Submit
          </button> */}
          {validationMessage && (
            <p className="validation-message">{validationMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default NameSelector;
