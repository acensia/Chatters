import "./anime.css";

import React, { useEffect, useState, useRef } from "react";
import "./ChatBox.css"; // Make sure to create a corresponding CSS file
import callapi from "./Callapi";
import MessageBox from "./NameSelector";

const ChatBox = ({ name, id }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const containerRef = useRef(null);
  console.log("Your current id is " + id);
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
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth", // Optional: for smooth scrolling
      });
    }
  }, [messages]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addMessage(input, 1);
      setInput("");
      callapi({ message: input, id: id }, "/polyjuice").then((json) => {
        addMessage(json["message"], 0);
      });
    }
  };

  return (
    <div style={{ fontFamily: "cursive", color: "black" }}>
      <div
        style={{
          position: "relative",
          textAlign: "center",
          marginTop: "50vh",
          marginBottom: "0vh",
          fontSize: "5vh",
          zIndex: 3,
        }}
      >
        {name.split("&")[0]}
      </div>
      <div className="chat-box letters">
        <div className="chat-log" ref={containerRef}>
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

const Chat = ({ curr, changeName, id }) => {
  if (!curr) return <></>;
  const [name, setName] = useState(curr);
  const [ask, setAsk] = useState(name === "Who else?");
  const [id_, setID] = useState(id);
  const chatStyle = {
    position: "absolute",
    opacity: 0,
    animation: curr ? `chatAppear 1s forwards` : "",
    // color: curr ? "blue" : "",
    animationDelay: `2s`,
  };
  useEffect(() => {
    setID(id);
  });
  const onInput = (text, ids) => {
    setName(text);
    setAsk(text === "Who else?");
    setID(ids);
  };
  return (
    <>
      {!ask ? (
        <div style={chatStyle}>
          <ChatBox name={name} id={id_} />
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
