"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  const onClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 100);
    }

    window.addEventListener("scroll", onScroll);

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <button
      onClick={onClick}
      className={
        "fixed bottom-0 right-0 mb-4 mr-4 p-2 rounded text-xs bg-secondary text-white " +
        (show ? "block" : "hidden")
      }
    >
      Back to top
    </button>
  );
}