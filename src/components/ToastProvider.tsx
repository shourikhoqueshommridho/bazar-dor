"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  const pathname = usePathname();

  useEffect(() => {
    console.log("TOAST PROVIDER PATH:", pathname);

    const message = sessionStorage.getItem(
      "bazardor-login-success"
    );

    console.log("PENDING TOAST:", message);

    if (pathname === "/" && message) {
      sessionStorage.removeItem("bazardor-login-success");

      // পেজ load হওয়ার পর success toast দেখাও
      setTimeout(() => {
        toast.success(message, {
          autoClose: 5000,
        });
      }, 300);
    }
  }, [pathname]);

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