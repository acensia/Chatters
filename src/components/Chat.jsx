import "./anime.css";

import React, { useEffect, useState } from "react";
import "./ChatBox.css"; // Make sure to create a corresponding CSS file
import OpenAI from "openai";
import callapi from "./Callapi";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const addMessage = (text) => {
    const newMessage = { id: Date.now(), text: "", fullText: text, typed: 0 };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    typeMessage(newMessage.id, text);
  };

  const typeMessage = (id, fullText) => {
    let typed = 0;
    const interval = setInterval(() => {
      if (typed < fullText.length) {
        typed++;
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === id
              ? { ...msg, text: fullText.substr(0, typed), typed }
              : msg
          )
        );
      } else {
        clearInterval(interval);
      }
    }, 50); // Adjust typing speed here
    callapi();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addMessage(input);
      setInput("");
    }
  };

  return (
    <div className="chat-box letters">
      <div className="chat-log">
        {messages.map((message) => (
          <div key={message.id} className="message">
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

const Chat = (curr) => {
  const chatStyle = {
    position: "absolute",
    opacity: 0,
    animation: curr ? "chatAppear 1s forwards" : "",
    color: curr ? "blue" : "",
    animationDelay: "2s",
  };

  return (
    <>
      <div style={chatStyle}>
        <ChatBox />
      </div>
    </>
  );
};

export default Chat;
