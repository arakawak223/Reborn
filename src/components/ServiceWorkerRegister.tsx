"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/Reborn/sw.js", { scope: "/Reborn/" })
        .catch((err) => console.warn("SW registration failed:", err));
    }
  }, []);

  return null;
}
