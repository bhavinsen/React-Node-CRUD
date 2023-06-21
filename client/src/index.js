import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "./contexts/GlobalContext";
import { ToastProvider } from "./contexts/ToastsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <GlobalProvider>
        <ToastContainer />
        <App />
      </GlobalProvider>
    </ToastProvider>
  </React.StrictMode>
);
