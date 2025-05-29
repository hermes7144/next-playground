import axios from 'axios';
import { useEffect, useRef } from "react";

export function useSessionPing(pingInterval = 5 * 1000) {
  const lastActivity = useRef(Date.now());

  useEffect(() => {
    const updateActivity = () => {
      lastActivity.current = Date.now();
    };

    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("scroll", updateActivity);

    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastActivity.current < pingInterval) {
        axios.post("/api/session/refresh").catch(() => {
          // 실패 시 처리 (옵션)
        });
      }
    }, pingInterval);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("scroll", updateActivity);
    };
  }, [pingInterval]);
}
