import "./anime.css";

import React, { useEffect, useState } from "react";
import "./ChatBox.css"; // Make sure to create a corresponding CSS file
import OpenAI from "openai";
import callapi from "./Callapi";
import MessageBox from "./NameSelector";

const ChatBox = ({ name }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const addMessage = (text, role) => {
    const newMessage = {
      id: Date.now(),
      text: "",
      fullText: text,
      typed: 0,
      role: role,
    };
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
    }, 20); // Adjust typing speed here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addMessage(input, 1);
      setInput("");
      callapi(input, "/polyjuice").then((text) => {
        addMessage(text, 0);
      });
      console.log("Here");
    }
  };

  return (
    <div style={{ fontFamily: "cursive", color: "black" }}>
      {name}
      <div className="chat-box letters">
        <div className="chat-log">
          {messages.map((message) => (
            <div
              key={message.id}
              className={message.role === 1 ? "message" : "message-bot"}
            >
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
    </div>
  );
};

const Chat = ({ curr, clicked }) => {
  if (!curr) return <></>;
  const [name, setName] = useState(clicked);
  const [ask, setAsk] = useState(name === "Who else?");
  const chatStyle = {
    position: "absolute",
    opacity: 0,
    animation: curr ? `chatAppear 1s forwards` : "",
    color: curr ? "blue" : "",
    animationDelay: `2s`,
  };
  const onInput = (text) => {
    setName(text);
    setAsk(text === "Who else?");
  };
  return (
    <>
      {!ask ? (
        <div style={chatStyle}>
          <ChatBox name={name} />
        </div>
      ) : (
        <></>
      )}
      <div style={chatStyle}>
        <MessageBox isVisible={ask} onSubmit={onInput} />
      </div>
    </>
  );
};

export default Chat;
