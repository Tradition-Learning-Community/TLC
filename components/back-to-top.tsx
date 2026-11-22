"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 240);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <button
      className={`back-top${visible ? " is-visible" : ""}`}
      type="button"
      aria-label="Retour en haut de page"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{ borderRadius: 9999 }}
    >
      <span
        className="back-top-icon"
        aria-hidden="true"
        style={{ borderRadius: "50%" }}
      >
        ↑
      </span>
      Haut de page
    </button>
  );
}
