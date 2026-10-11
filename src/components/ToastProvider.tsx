
"use client";

import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  useEffect(() => {
    const showPendingToast = () => {
      const message = sessionStorage.getItem(
        "bazardor-login-success"
      );

      if (!message) return;

      sessionStorage.removeItem("bazardor-login-success");

      toast.success(message, {
        autoClose: 5000,
        position: "top-right",
      });
    };

    showPendingToast();
  }, []);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="light"
    />
  );
}
