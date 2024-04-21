import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElem = document.getElementById("root");
if (!rootElem) throw new Error("Failed");

ReactDOM.createRoot(rootElem).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
