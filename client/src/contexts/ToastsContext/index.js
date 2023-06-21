import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type) => {
    const newToast = { message, type };
    setToasts((prevToasts) => [...prevToasts, newToast]);
    showToast(message, type);
  };

  const showToast = (message, type) => {
    switch (type) {
      case "success":
        toast.success(message, {
          hideProgressBar: true,
          autoClose: 3000,
        });
        break;
      case "error":
        toast.error(message, {
          hideProgressBar: true,
          autoClose: 3000,
        });
        break;
      default:
        break;
    }
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
