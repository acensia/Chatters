import React, { useState } from "react";
import "./anime.css"; // Adjust the path based on your file structure
import callapi from "./Callapi";

function MessageBox({ isVisible, onSubmit }) {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  // // Validate the input value before submitting
  // const validateInput = async (value) => {
  //   const checked = callapi(value, "/check").then((res) => {
  //     console.log(`hi ${res}`);
  //     result = res === "yes";
  //   });
  //   return result;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    callapi(inputValue, "/check")
      .then((res) => {
        if (res.includes("Error")) throw new Error(res);
        console.log(`Check Result : ${res}`);
        if (res !== "no") {
          setIsSubmitting(true); // Begin the fade-out effect
          console.log(res);
          callapi(res, "/name");
          if (res !== inputValue) {
            setValidationMessage(`Correct name is ${res}`);
          } // Clear any previous validation messages
          setTimeout(() => {
            setIsSubmitting(false);
            setValidationMessage(""); // Clear any previous validation messages
          }, 1000); // Reset state after animation
          onSubmit(res);
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

export default MessageBox;
