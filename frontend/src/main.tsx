//import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// This finds the <div id="root"></div> in your index.html
const rootElement = document.getElementById("root");

// Ensure the root element exists before trying to render
if (rootElement) {
  // Note: React.StrictMode is no longer needed here as it's part of the modern setup
  ReactDOM.createRoot(rootElement).render(<App />);
} else {
  console.error("Failed to find the root element");
}
