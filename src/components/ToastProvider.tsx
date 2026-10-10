"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={6000}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
      limit={3}
    />
  );
}