import React, { useState } from "react";
import "./anime.css"; // Adjust the path based on your file structure

function MessageBox({ isVisible, onSubmit }) {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Begin the fade-out effect
    onSubmit(inputValue); // Pass the input value to the parent component
    setTimeout(() => setIsSubmitting(false), 1000); // Reset state after animation
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
      </form>
    </div>
  );
}

export default MessageBox;
