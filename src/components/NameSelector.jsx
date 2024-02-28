import React, { useState } from "react";
import "./anime.css"; // Adjust the path based on your file structure
import callapi from "./Callapi";

function MessageBox({ isVisible, onSubmit }) {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  // Validate the input value before submitting
  const validateInput = async (value) => {
    const checked = callapi(value, "/check").then((res) => {
      console.log(`hi ${res}`);
      result = res === "yes";
    });
    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput(inputValue)) {
      setIsSubmitting(true); // Begin the fade-out effect
      callapi(inputValue, "/name");
      setTimeout(() => {
        setIsSubmitting(false);
        onSubmit(inputValue);
      }, 1000); // Reset state after animation
      setValidationMessage(""); // Clear any previous validation messages
    } else {
      // Update the state to show a validation message
      setValidationMessage('Input must include the letter "a".');
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`message-box ${isSubmitting ? "hidden" : ""}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
        {validationMessage && (
          <p className="validation-message">{validationMessage}</p>
        )}
      </form>
    </div>
  );
}

export default MessageBox;
